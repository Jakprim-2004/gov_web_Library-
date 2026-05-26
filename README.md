# คู่มือ E-Service × IAM-GOV — ทำตามได้เลย

> อ่านครั้งเดียว ทำตามลำดับ — ครอบคลุมตั้งแต่ติดตั้ง library จนถึง Residence API และ Claim Flow

---

## ก่อนเริ่ม — สิ่งที่ต้องมี

| สิ่งที่ต้องมี | รายละเอียด |
|---|---|
| Node.js | >= 18 |
| React | >= 18 |
| Backend (NestJS) | มี endpoint `/auth/sso-callback` |
| IAM-GOV credentials | service code + API key (ลงทะเบียนที่ [govcenter.co](https://govcenter.co)) |

---

## ขั้นตอนที่ 1 — ติดตั้ง Library

```bash
npm install gov-sso-login
```

แก้ไข `next.config.ts` เพิ่ม `transpilePackages`:

```typescript
const nextConfig = {
  transpilePackages: ['gov-sso-login'],
};
export default nextConfig;
```

---

## ขั้นตอนที่ 2 — ตั้งค่า Environment Variables

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=https://api.your-domain.com
NEXT_PUBLIC_IAM_GOV_FRONTEND_URL=https://auth.govcenter.co
NEXT_PUBLIC_E_SERVICE_CODE=your-service-code
NEXT_PUBLIC_FRONTEND_URL=https://your-domain.com
```

### Backend (`.env`)

```env
IAM_API_URL=https://api-auth.govcenter.co
E_SERVICE_CODE=your-service-code
E_SERVICE_API_KEY=your-api-key        # ← ห้ามใส่ฝั่ง frontend เด็ดขาด
```

> **กฎเหล็ก:** `E_SERVICE_API_KEY` อยู่บน backend เท่านั้น ห้ามใส่ใน `NEXT_PUBLIC_*` หรือ `VITE_*`

---

## ขั้นตอนที่ 3 — สร้าง SSO Config (Frontend)

สร้างไฟล์ `lib/sso-config.ts`:

```typescript
import type { GovSsoConfig } from 'gov-sso-login';

export const ssoConfig: GovSsoConfig = {
  iamAuthUrl: process.env.NEXT_PUBLIC_IAM_GOV_FRONTEND_URL || 'https://auth.govcenter.co',
  serviceCode: process.env.NEXT_PUBLIC_E_SERVICE_CODE || 'your-service-code',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/auth/callback`,
};
```

---

## ขั้นตอนที่ 4 — Wrap App ด้วย Provider

`app/layout.tsx`:

```tsx
import { GovSsoProvider } from 'gov-sso-login';
import { ssoConfig } from '@/lib/sso-config';

export default function RootLayout({ children }) {
  return (
    <GovSsoProvider config={ssoConfig} theme={{ primaryColor: '#1E7D55' }}>
      {children}
    </GovSsoProvider>
  );
}
```

> หลังจาก wrap แล้ว component ข้างในไม่ต้องส่ง `config` ซ้ำ

---

## ขั้นตอนที่ 5 — หน้า Login

### วิธี A: ใช้ Component สำเร็จรูป

```tsx
// app/login/page.tsx
import { SsoLoginButton } from 'gov-sso-login';

export default function LoginPage() {
  return <SsoLoginButton label="เข้าสู่ระบบด้วย Gov Center" />;
}
```

### วิธี B: ปรับ UI เอง

```tsx
import { useGovSso } from 'gov-sso-login';

export default function LoginPage() {
  const { login } = useGovSso();
  return <button onClick={login} className="my-btn">เข้าสู่ระบบ</button>;
}
```

---

## ขั้นตอนที่ 6 — หน้า Callback (Frontend)

```tsx
// app/auth/callback/page.tsx
'use client';

import { SsoCallbackHandler } from 'gov-sso-login';
import { useRouter } from 'next/navigation';

export default function CallbackPage() {
  const router = useRouter();
  return (
    <SsoCallbackHandler
      onSuccess={async (result) => {
        const role = result.user?.role;
        router.push(role === 'ADMIN' ? '/admin/dashboard' : '/home');
      }}
      onError={(err) => {
        console.error(err);
        router.push('/login');
      }}
    />
  );
}
```

> Library จัดการ CSRF state, retry (2 ครั้ง), และ error handling ให้อัตโนมัติ

---

## ขั้นตอนที่ 7 — Backend: รับ SSO Callback

Backend ต้องมี `POST /auth/sso-callback` ที่:
1. รับ `{ code }` จาก frontend
2. ส่ง code ไป IAM-GOV เพื่อ verify
3. Upsert user และ residence snapshot ลงฐานข้อมูล
4. สร้าง JWT session คืนกลับ

```typescript
// auth.controller.ts
@Post('sso-callback')
async ssoCallback(@Body() body: { code: string }, @Res({ passthrough: true }) res: Response) {
  const user = await this.authService.handleSsoCallback(body.code);
  return this.authService.login(user, res);
}

// auth.service.ts
async handleSsoCallback(code: string) {
  const trimmedCode = code.trim(); // ← trim เสมอ
  const response = await fetch(`${process.env.IAM_API_URL}/e-services/sso/verify-code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.E_SERVICE_API_KEY,
    },
    body: JSON.stringify({ code: trimmedCode }),
  });

  if (!response.ok) throw new Error(`IAM verify failed: ${response.status}`);
  const data = await response.json();

  await this.upsertIamUser(data.user);
  for (const item of data.residences ?? []) {
    await this.upsertResidenceSnapshot(item.addressSnapshot);
    await this.upsertUserResidenceLink({
      iamUserId: data.user.id,
      iamResidenceId: item.addressSnapshot.residenceId,
      iamMembershipId: item.membershipId,
      memberRole: item.role,
      memberStatus: item.status,
      verifiedAt: item.verifiedAt,
    });
  }

  return this.upsertUser(data.user);
}
```

---

## ขั้นตอนที่ 8 — ตรวจสอบข้อมูล Residence หลัง Login

ข้อมูลบ้านของ user จะมาพร้อม verify-code response ในฟิลด์ `residences`

```typescript
// ตรวจ status ก่อนใช้งานในธุรกรรมจริง
const canUseForOfficialTransaction =
  item.status === 'VERIFIED' && item.residence.status === 'VERIFIED';

const isPending =
  item.status === 'PENDING' || item.residence.status === 'PENDING_REVIEW';
```

ต้องตรวจ **ทั้งสองค่า** แยกกัน — membership status และ residence status

### Scopes ที่ต้องขอไว้

| Scope | เปิดใช้ |
|---|---|
| `residence:read` | รับ `residences` ใน verify-code + อ่านรายละเอียดบ้าน |
| `residence:members:read` | ดูสมาชิกในบ้าน |
| `residence:claim:create` | ยื่นเพิ่มบ้านใหม่ + upload เอกสาร |
| `residence:claim:read` | ติดตามสถานะคำขอ |

---

## ขั้นตอนที่ 9 — โครงสร้าง DB ที่ต้องมี

### iam_users

```sql
create table iam_users (
  iam_user_id   text primary key,
  email         text,
  name          text,
  avatar_url    text,
  system_role   text,
  last_sso_at   timestamptz not null default now(),
  raw_profile   jsonb
);
```

### iam_residence_snapshots

```sql
create table iam_residence_snapshots (
  iam_residence_id    text primary key,
  residence_code      text,
  formatted_address   text,
  house_no text, moo text, soi text, road text, postal_code text,
  village_name text, building_name text, floor text, room_no text,
  province_id int,    province_name_th text,
  district_id int,    district_name_th text,
  subdistrict_id int, subdistrict_name_th text,
  municipality_id text, municipality_name text,
  latitude double precision, longitude double precision,
  location_accuracy text,
  residence_status  text,
  approved_at       timestamptz,
  raw_snapshot      jsonb,
  synced_at         timestamptz not null default now()
);
```

### iam_user_residences

```sql
create table iam_user_residences (
  iam_user_id       text not null,
  iam_residence_id  text not null,
  iam_membership_id text not null,
  member_role       text,
  member_status     text,
  verified_at       timestamptz,
  synced_at         timestamptz not null default now(),
  primary key (iam_user_id, iam_residence_id)
);
```

---

## ขั้นตอนที่ 10 — Residence Search & Select UI

ถ้า e-service ต้องให้ user เลือกบ้านใน UI ของตัวเอง ให้ทำ proxy endpoint ฝั่ง backend ก่อน แล้ว frontend เรียกผ่าน backend เท่านั้น

### Proxy Endpoints (NestJS → IAM-GOV)

```typescript
@Injectable()
export class IamGovResidenceClient {
  private readonly apiUrl = this.config.getOrThrow<string>('IAM_API_URL');
  private readonly apiKey = this.config.getOrThrow<string>('E_SERVICE_API_KEY');

  constructor(private readonly config: ConfigService) {}

  async searchResidences(params: Record<string, string>) {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${this.apiUrl}/e-services/residences/search?${qs}`, {
      headers: { 'x-api-key': this.apiKey },
    });
    if (!res.ok) throw new Error(`IAM search failed: ${res.status}`);
    return res.json();
  }
}

@Controller('api/residences')
export class ResidenceProxyController {
  constructor(private readonly iamResidence: IamGovResidenceClient) {}

  @Get('search')
  search(@Query() query: SearchResidenceDto) {
    return this.iamResidence.searchResidences(query);
  }
}
```

### Endpoint ที่ต้องทำ

| E-Service Backend | IAM-GOV Endpoint | Scope ที่ต้องการ |
|---|---|---|
| `GET /api/residences/search` | `GET /e-services/residences/search` | — |
| `GET /api/residences/:id` | `GET /e-services/residences/:id` | `residence:read` |
| `GET /api/residences/:id/members` | `GET /e-services/residences/:id/members` | `residence:members:read` |
| `POST /api/residence-claims` | `POST /e-services/residence-claims` | `residence:claim:create` |
| `POST /api/residence-claims/:id/evidence` | `POST /e-services/residence-claims/:id/evidence` | `residence:claim:create` |
| `GET /api/residence-claims/:id` | `GET /e-services/residence-claims/:id` | `residence:claim:read` |

### Search Query Parameters

| Query | ความหมาย |
|---|---|
| `q` | คำค้น เช่น บ้านเลขที่, ถนน, รหัสไปรษณีย์ |
| `municipalityId` | จำกัดเทศบาล |
| `provinceId / districtId / subdistrictId` | จำกัดพื้นที่ |
| `lat / lng / radiusMeters` | ค้นหาจากพิกัด |
| `limit` | จำนวนผลลัพธ์ |

Best practice:
- ใช้ debounce **300–500ms** ระหว่าง user พิมพ์
- อย่า search ถ้าคำน้อยกว่า **3 ตัวอักษร** (ยกเว้นมี lat/lng)
- ถ้า user ปักหมุด map ให้ search ด้วย lat/lng ก่อน แล้วค่อยสร้าง claim ถ้าไม่เจอ

### State Machine สำหรับ UI

```
Searching → (พบบ้าน) → SelectedResidence → [จบ]
Searching → (ไม่พบ) → DraftClaim → ClaimSubmitted → WaitingReview
                                                      ↓
                                         Approved / Merged → SelectedResidence
                                         Rejected → DraftClaim (แก้ไขและยื่นใหม่)
```

```typescript
// TypeScript state type
type ResidencePickerState =
  | { step: 'searching' }
  | { step: 'selected'; residenceId: string }
  | { step: 'claim-draft' }
  | { step: 'claim-submitted'; claimId: string };
```

---

## ขั้นตอนที่ 11 — Claim Flow (เมื่อ User ไม่พบบ้าน)

เลือกได้สองแนวทาง:

### แนวทาง A: Central Flow (ให้ IAM-GOV สร้าง UI ให้)

1. Backend สร้าง Intent:

```http
POST {IAM_API_URL}/e-services/residence-claim-intents
Content-Type: application/json
x-api-key: <E_SERVICE_API_KEY>

{
  "expectedIamUserId": "iam-user-id",
  "returnUrl": "https://my-service.govcenter.co/residence/callback",
  "state": "signed-random-state",
  "externalRequestId": "my-service-request-0001"
}
```

2. Frontend redirect user ไปที่ `launchUrl` จาก response
3. IAM-GOV redirect กลับมาพร้อม `?code=<resultCode>&state=<state>`
4. Backend verify `state` ก่อน แล้ว verify `resultCode`:

```http
POST {IAM_API_URL}/e-services/residence-claim-results/verify
x-api-key: <E_SERVICE_API_KEY>

{ "resultCode": "one-time-result-code" }
```

### แนวทาง B: Direct UI Flow (สร้าง UI เอง)

**1. Submit Claim:**

```http
POST /e-services/residence-claims
x-api-key: <e-service-api-key>
Content-Type: application/json

{
  "externalRequestId": "my-service-req-001",
  "submittedByUserId": "iam-user-id-from-sso",
  "municipalityId": "municipality-id",
  "houseNo": "99/1",
  "moo": "4",
  "provinceId": 46,
  "districtId": 4601,
  "subdistrictId": 460101,
  "latitude": 16.4321,
  "longitude": 103.5012,
  "locationAccuracy": "EXACT"
}
```

> `submittedByUserId` ต้องมาจาก session — ห้ามรับจาก browser

**2. Upload Evidence** (หลังได้ `claimId`):

```http
POST /e-services/residence-claims/:claimId/evidence
x-api-key: <e-service-api-key>
Content-Type: multipart/form-data

file: <PDF/JPEG/PNG/WEBP, max 10MB>
```

**3. Poll สถานะ:**

```http
GET /e-services/residence-claims/:claimId
x-api-key: <e-service-api-key>
```

### Claim Status → UI Text

| Status | แสดงผล |
|---|---|
| `SUBMITTED` | รอเจ้าหน้าที่ตรวจสอบ |
| `DUPLICATE_CANDIDATE` | พบข้อมูลใกล้เคียง รอตรวจสอบ |
| `NEEDS_REVIEW` | ต้องตรวจสอบเพิ่มเติม |
| `APPROVED` | อนุมัติแล้ว ✓ |
| `MERGED` | รวมกับบ้านที่มีอยู่แล้ว |
| `REJECTED` | ไม่อนุมัติ (แสดง `reviewNote`) |

> เมื่อ `APPROVED` หรือ `MERGED` ให้บันทึก `matchedResidenceId` เป็น residence ของ user

---

## SSO Flow ภาพรวม

```
[Frontend]          [IAM-GOV]           [Backend]
    │                   │                   │
    │─── 1. redirect ──▶│                   │
    │    + state param  │                   │
    │                   │ 2. user login     │
    │◀── 3. ?code=XX ───│                   │
    │    &state=YY      │                   │
    │                   │                   │
    │─── 4. POST {code} ────────────────────▶│
    │    (verify state ✅)                   │
    │                                        │─── 5. POST verify-code ──▶ IAM-GOV
    │                                        │◀── 6. user + residences ───
    │                                        │─── 7. upsert DB
    │◀── 8. JWT session + user ─────────────│
    │                                        │
✅ Login สำเร็จ → redirect ตาม role
```

---

## Security Checklist

### ✅ ต้องทำ

- เก็บ `E_SERVICE_API_KEY` บน backend เท่านั้น
- Trim SSO code ก่อนส่งเสมอ
- Verify code ครั้งเดียว (one-time use)
- สร้าง e-service session เองหลัง verify สำเร็จ — ไม่ใช้ IAM refresh token
- ตรวจทั้ง membership status และ residence status ก่อนทำธุรกรรม
- Verify `state` ใน central claim callback ทุกครั้ง
- Search ซ้ำก่อน submit claim เพื่อป้องกันข้อมูลซ้ำ
- Log IAM user id, claim id, request id — ห้าม log secret

### ❌ ห้ามทำ

- ห้ามใส่ `x-api-key` ใน `NEXT_PUBLIC_*` / `VITE_*`
- ห้ามให้ browser เรียก IAM-GOV endpoints โดยตรง
- ห้าม assume `residences.length > 0`
- ห้ามใช้ status `PENDING` เป็นการยืนยันเจ้าของบ้าน
- ห้ามเก็บ IAM payload ทั้งก้อนใน browser cookie
- ห้ามให้ e-service สร้าง canonical residence โดยตรง — ต้องสร้างเป็น claim

---

## Theming (ปรับสีได้ 3 วิธี)

**วิธี 1: ผ่าน Provider** (ทั่วทั้ง app)

```tsx
<GovSsoProvider config={ssoConfig} theme={{
  primaryColor: '#0066CC',
  primaryHoverColor: '#004C99',
  errorColor: '#dc2626',
  textColor: '#111827',
  backgroundColor: '#f9fafb',
}}>
```

**วิธี 2: ผ่าน Props** (เฉพาะ component นั้น)

```tsx
<SsoLoginButton theme={{ primaryColor: '#7C3AED' }} />
```

**วิธี 3: className** (CSS เอง)

```tsx
<SsoLoginButton className="my-custom-btn" />
```

| Property | Default | คำอธิบาย |
|---|---|---|
| `primaryColor` | `#1E7D55` | สีหลัก (ปุ่ม, loading, success) |
| `primaryHoverColor` | `#256B48` | สี hover ของปุ่ม |
| `errorColor` | `#ef4444` | สี error |
| `textColor` | `#1e293b` | สีข้อความหลัก |
| `borderRadius` | `0.5rem` | ขอบมน |

---

## Error Handling

```typescript
import { GovSsoError } from 'gov-sso-login';

try {
  const result = await client.handleCallback(code);
} catch (err) {
  if (err instanceof GovSsoError) {
    console.log(err.code);       // 'NETWORK_ERROR' | 'SERVER_ERROR' | ...
    console.log(err.statusCode); // 500, 503, etc.
    console.log(err.message);    // ข้อความภาษาไทย
  }
}
```

| Error Code | เกิดเมื่อ |
|---|---|
| `NETWORK_ERROR` | เชื่อมต่อ server ไม่ได้ |
| `SERVER_ERROR` | Server ตอบ 500/502/503/504 |
| `INVALID_RESPONSE` | Server ตอบ JSON ไม่ถูกต้อง |
| `BROWSER_ONLY` | เรียกใน server-side context |
| `UNKNOWN_ERROR` | Error ที่ไม่ทราบสาเหตุ |

> Library มี auto-retry 2 ครั้งสำหรับ 5xx errors (exponential backoff 1s → 2s) — ไม่ต้อง config เพิ่ม

---

## Error Reference (IAM-GOV)

| Error | สาเหตุ | วิธีแก้ |
|---|---|---|
| `403 Invalid SSO code` | หา code ไม่เจอ | ตรวจ env, trim code, generate ใหม่ |
| `403 SSO code does not belong to this service` | API key เป็นของ service อื่น | ตรวจ `E_SERVICE_CODE` ตรงกับ `API_KEY` ไหม |
| `403 SSO code has already been used` | ใช้ code ซ้ำ | Generate code ใหม่ทุกครั้ง |
| `residences: []` | ไม่มี scope / ไม่มี linked residence | ตรวจ scope และ membership ใน IAM-GOV |
| `serviceAccess: []` | ไม่มี e_service_access row | IAM-GOV Admin → Manage E-Services → Assign |

---

## Troubleshooting (Library)

| ปัญหา | สาเหตุ | แก้ไข |
|---|---|---|
| `Module not found: gov-sso-login` | ยังไม่ได้ติดตั้ง | `npm install gov-sso-login` |
| SSO redirect แล้วไม่กลับมา | `callbackUrl` ไม่ตรง | ตรวจ `NEXT_PUBLIC_FRONTEND_URL` |
| Build error ใน Next.js | ไม่ได้ transpile | เพิ่ม `transpilePackages` ใน `next.config.ts` |
| "การตรวจสอบความปลอดภัยล้มเหลว" | CSRF state ไม่ตรง | ลอง login ใหม่ (อาจใช้ link เก่า) |
| `useGovSso: ต้องส่ง config` | ไม่มี Provider | Wrap ด้วย `<GovSsoProvider>` |
| Cookie ไม่ถูก set | domain ไม่ตรง | ตรวจ `FRONTEND_URL` ใน backend `.env` |

---

## Implementation Checklist (ทำตามลำดับ)

- [ ] ติดตั้ง `gov-sso-login` และตั้งค่า `next.config.ts`
- [ ] เพิ่ม env vars: frontend (4 ตัว) + backend (3 ตัว)
- [ ] สร้าง `lib/sso-config.ts`
- [ ] Wrap app ด้วย `GovSsoProvider` ใน `layout.tsx`
- [ ] สร้างหน้า login พร้อม `SsoLoginButton` หรือ `useGovSso`
- [ ] สร้างหน้า `/auth/callback` พร้อม `SsoCallbackHandler` หรือ `useGovSsoCallback`
- [ ] Implement `POST /auth/sso-callback` บน NestJS backend
- [ ] Implement `upsertIamUser`, `upsertResidenceSnapshot`, `upsertUserResidenceLink`
- [ ] สร้าง DB tables: `iam_users`, `iam_residence_snapshots`, `iam_user_residences`
- [ ] (ถ้าต้องการ) ทำ proxy endpoints สำหรับ Residence Search/Read
- [ ] (ถ้าต้องการ) ทำ UI แจ้งเพิ่มบ้าน + Claim API + upload evidence
- [ ] เขียน test: missing code, invalid code, empty residences, pending, verified, no API key leak
- [ ] Manual test ตาม script ด้านล่าง

---

## Manual Test Script

```http
# 1. Generate SSO code (ใช้ IAM access token)
POST {IAM_API_URL}/e-services/sso/generate-code
Authorization: Bearer <IAM_ACCESS_TOKEN>
Content-Type: application/json

{ "eServiceCode": "your-service-code" }

# 2. Verify code (จาก backend เท่านั้น)
POST {IAM_API_URL}/e-services/sso/verify-code
Content-Type: application/json
x-api-key: <E_SERVICE_API_KEY>

{ "code": "<code-from-step-1>" }

# ตรวจ response:
# ✅ user.id มีค่า
# ✅ user.memberships เป็น array
# ✅ residences เป็น array (ถ้า user มี linked residence จะมี addressSnapshot)

# 3. Verify code เดิมซ้ำ → ต้องได้ error
# ✅ "SSO code has already been used"
```
