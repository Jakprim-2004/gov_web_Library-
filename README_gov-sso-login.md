# gov-sso-login

IAM-GOV SSO Login library สำหรับ React/Next.js applications พร้อม Residence API Integration

## Installation

```bash
npm install gov-sso-login
```

---

## Table of Contents

- [SSO Login](#SSO-Login)
  - [Quick Start](#Quick-Start)
  - [GovSsoProvider (แนะนำ)](#GovSsoProvider-(แนะนำ))
  - [Login Button](#Login-Button)
  - [Callback Handler](#Callback-Handler)
  - [Hooks](#Hooks)
  - [Core Client (Non-React)](#Core-Client-(Non-React))
  - [Custom Theming](#Custom-Theming)
  - [Error Handling](#Error-Handling)
  - [Backend Setup (NestJS)](#Backend-Setup-(NestJS))
- [Residence API Integration](#Residence-API-Integration)
  - [ภาพรวม](#ภาพรวม)
  - [API Endpoints](#API-Endpoints)
  - [Residence Claim Flow](#Residence-Claim-Flow)
  - [Frontend (NextJS)](#Frontend-(NextJS))
  - [Backend (NestJS)](#Backend-(NestJS))
  - [Claim Status](#Claim-Status)
  - [Best Practices](#Best-Practices)
- [API Reference](#API-Reference)

---

## SSO-Login

### Quick-Start

#### 1. Config

```typescript
import type { GovSsoConfig } from 'gov-sso-login';

const ssoConfig: GovSsoConfig = {
  iamAuthUrl: 'https://auth.govcenter.co',
  serviceCode: 'my-service-code',
  apiBaseUrl: 'https://api.example.com',
  callbackUrl: 'https://example.com/auth/callback',
};
```

#### 2. Login Button

```tsx
import { SsoLoginButton } from 'gov-sso-login';

export default function LoginPage() {
  return (
    <SsoLoginButton
      config={ssoConfig}
      label="เข้าสู่ระบบด้วย Gov Center"
    />
  );
}
```

#### 3. Callback Handler

```tsx
import { SsoCallbackHandler } from 'gov-sso-login';

export default function CallbackPage() {
  return (
    <SsoCallbackHandler
      config={ssoConfig}
      onSuccess={(result) => {
        console.log('Login success:', result.user);
        window.location.href = '/dashboard';
      }}
      onError={(err) => {
        console.error('Login failed:', err.message);
        window.location.href = '/login';
      }}
    />
  );
}
```

---

### GovSsoProvider-(แนะนำ)

Wrap app ด้วย `GovSsoProvider` เพียงครั้งเดียว แล้วใช้ hooks/components ได้ทุกที่โดยไม่ต้องส่ง config ซ้ำ:

```tsx
// app/layout.tsx
import { GovSsoProvider } from 'gov-sso-login';
import { ssoConfig } from '@/lib/sso-config';

export default function RootLayout({ children }) {
  return (
    <GovSsoProvider
      config={ssoConfig}
      theme={{ primaryColor: '#1E7D55' }}
    >
      {children}
    </GovSsoProvider>
  );
}
```

---

### Login-Button

```tsx
// ถ้ามี Provider → ไม่ต้องส่ง config
<SsoLoginButton label="เข้าสู่ระบบด้วย Gov Center" />

// ปรับสีเฉพาะปุ่มนี้
<SsoLoginButton theme={{ primaryColor: '#0066CC', primaryHoverColor: '#004C99' }} />

// ใช้ className เอง
<SsoLoginButton className="my-custom-btn" />
```

---

### Callback-Handler

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
        if (role === 'ADMIN') router.push('/admin/dashboard');
        else router.push('/home');
      }}
      onError={(err) => {
        alert(err.message);
        router.push('/login');
      }}
    />
  );
}
```

---

### Hooks

```tsx
import { useGovSso, useGovSsoCallback } from 'gov-sso-login';

// Login hook
function LoginPage() {
  const { login } = useGovSso(); // ถ้ามี Provider ไม่ต้องส่ง config
  return <button onClick={login}>Login</button>;
}

// Callback hook
function CallbackPage() {
  const { status, user, error, message } = useGovSsoCallback({
    onSuccess: (result) => {
      console.log('Login OK:', result.user);
      window.location.href = '/dashboard';
    },
    onError: (err) => {
      console.error(err);
      setTimeout(() => (window.location.href = '/login'), 3000);
    },
  });

  return (
    <div>
      {status === 'loading' && <p>⏳ {message}</p>}
      {status === 'success' && <p>✅ ยินดีต้อนรับ {user?.firstName}</p>}
      {status === 'error' && <p>❌ {message}</p>}
    </div>
  );
}
```

---

### Core-Client-(Non-React)

```typescript
import { GovSsoClient } from 'gov-sso-login';

const client = new GovSsoClient(ssoConfig);

const url = client.getLoginUrl();
const result = await client.handleCallback(code);
```

---

### Custom-Theming

ปรับสีได้ 3 วิธี:

```tsx
// วิธี 1: ผ่าน Provider (ใช้ทั่วทั้ง app)
<GovSsoProvider config={ssoConfig} theme={{
  primaryColor: '#0066CC',
  primaryHoverColor: '#004C99',
  errorColor: '#dc2626',
  textColor: '#111827',
  backgroundColor: '#f9fafb',
}}>

// วิธี 2: ผ่าน Props (เฉพาะ component นั้น)
<SsoLoginButton theme={{ primaryColor: '#7C3AED' }} />

// วิธี 3: ใช้ className (CSS เอง)
<SsoLoginButton className="my-btn" />
```

| Property | Default | คำอธิบาย |
|---|---|---|
| `primaryColor` | `#1E7D55` | สีหลัก (ปุ่ม, loading, success) |
| `primaryHoverColor` | `#256B48` | สี hover ของปุ่ม |
| `errorColor` | `#ef4444` | สี error |
| `textColor` | `#1e293b` | สีข้อความหลัก |
| `secondaryTextColor` | `#64748b` | สีข้อความรอง |
| `backgroundColor` | `#f8fafc` | สีพื้นหลัง |
| `cardBackgroundColor` | `#ffffff` | สีพื้นหลังการ์ด |
| `borderRadius` | `0.5rem` | ขอบมน |

---

### Error-Handling

```typescript
import { GovSsoError, GovSsoClient } from 'gov-sso-login';

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

| Code | คำอธิบาย |
|---|---|
| `NETWORK_ERROR` | เชื่อมต่อ server ไม่ได้ (offline, DNS fail) |
| `SERVER_ERROR` | Server ตอบ 500/502/503/504 |
| `INVALID_RESPONSE` | Server ตอบ JSON ไม่ถูกต้อง |
| `BROWSER_ONLY` | เรียก function ที่ต้องใช้ใน browser เท่านั้น |
| `UNKNOWN_ERROR` | Error ที่ไม่ทราบสาเหตุ |

Library มี auto-retry สำหรับ server errors: retry 2 ครั้ง (รวม 3 ครั้ง) ด้วย exponential backoff (1s → 2s) สำหรับ HTTP 500/502/503/504 และ network error โดยไม่ retry 400/401/403

---

### Backend-Setup-(NestJS)

Backend ต้องมี endpoint `POST /auth/sso-callback` ที่รับ `{ code }` จาก frontend แล้วส่งต่อไป IAM-GOV:

```typescript
// auth.controller.ts
@Post('sso-callback')
async ssoCallback(
  @Body() body: { code: string },
  @Res({ passthrough: true }) res: Response,
) {
  const user = await this.authService.handleSsoCallback(body.code);
  return this.authService.login(user, res);
}

// auth.service.ts
async handleSsoCallback(code: string) {
  const response = await fetch(`${IAM_GOV_API_URL}/e-services/sso/verify-code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': E_SERVICE_API_KEY,
    },
    body: JSON.stringify({ code }),
  });
  const data = await response.json();
  return this.upsertUser(data.user);
}
```

---

## Residence-API-Integration

### ภาพรวม

E-service สามารถทำ flow ครบผ่าน `x-api-key` ได้: search/read residence, submit residence claim, upload evidence, list evidence และ read claim status

> **สำคัญ:** e-service frontend ต้องเรียก backend ของตัวเองก่อนเสมอ ห้ามถือ `x-api-key` ใน browser

```
User → E-Service Frontend → E-Service Backend → (x-api-key) → IAM-GOV API → Residence Registry
```

#### Required Scopes

| Use case | Required scopes |
|---|---|
| ค้นหาบ้าน | `residence:search` |
| อ่านรายละเอียดบ้าน | `residence:read` |
| ดูสมาชิกบ้าน | `residence:members:read` |
| ยื่นเพิ่มบ้าน + upload เอกสาร | `residence:claim:create` |
| ดูสถานะคำขอ + list evidence | `residence:claim:read` |

---

### API-Endpoints

#### Search Residence

```http
GET /e-services/residences/search?q=99/1&limit=20
x-api-key: <e-service-api-key>
```

| Query | ความหมาย |
|---|---|
| `q` | คำค้น เช่น บ้านเลขที่, หมู่บ้าน, อาคาร, ถนน, รหัสไปรษณีย์ |
| `municipalityId` | จำกัดเทศบาล |
| `provinceId` / `districtId` / `subdistrictId` | จำกัดพื้นที่ |
| `lat` / `lng` / `radiusMeters` | ค้นหาจากพิกัด |
| `limit` | จำนวนผลลัพธ์ |

```json
// Response
[
  {
    "id": "cmp121bzi000iualqo8dwdj1r",
    "residenceCode": "500100-000001",
    "title": "บ้านเลขที่ 99/** บ้านหลักเมือง เทศบาลหลักเมือง",
    "maskedAddress": "บ้านเลขที่ 99/** หมู่ 4 ต.หลักเมือง อ.เมือง จ.กาฬสินธุ์",
    "latitude": 16.432,
    "longitude": 103.501,
    "locationAccuracy": "EXACT",
    "municipality": { "id": "municipality-id", "name": "หลักเมือง" }
  }
]
```

#### Read Residence Detail

```http
GET /e-services/residences/:id
x-api-key: <e-service-api-key>
```

> ต้องมี scope `residence:read` — ไม่ควรดึง detail ทุกครั้งตอน typing search ให้ใช้ search endpoint ก่อน

#### Read Verified Residence Members

```http
GET /e-services/residences/:id/members
x-api-key: <e-service-api-key>
```

> ต้องมี scope `residence:members:read` — คืนเฉพาะ member ที่ `VERIFIED` ใช้เฉพาะ service ที่ต้องรู้ว่าใครอยู่บ้าน

---

### Residence-Claim-Flow

เมื่อ user ไม่พบบ้านในระบบ:

#### 1. Submit Residence Claim

```http
POST /e-services/residence-claims
x-api-key: <e-service-api-key>
Content-Type: application/json
```

```json
// Request
{
  "externalRequestId": "pickup-request-20260514-0001",
  "submittedByUserId": "iam-user-id-from-sso-verify",
  "municipalityId": "municipality-id",
  "houseNo": "99/1",
  "moo": "4",
  "villageName": "บ้านหลักเมือง",
  "provinceId": 46,
  "districtId": 4601,
  "subdistrictId": 460101,
  "postalCode": "46000",
  "latitude": 16.4321,
  "longitude": 103.5012,
  "locationAccuracy": "EXACT"
}
```

```json
// Response
{
  "id": "claim-id",
  "status": "SUBMITTED",
  "type": "CREATE_RESIDENCE",
  "municipalityId": "municipality-id",
  "submittedByUserId": "iam-user-id-from-sso-verify",
  "submittedByServiceId": "e-service-id",
  "matchedResidenceId": null,
  "createdAt": "2026-05-14T09:00:00.000Z"
}
```

#### 2. Upload Claim Evidence

```http
POST /e-services/residence-claims/:claimId/evidence
x-api-key: <e-service-api-key>
Content-Type: multipart/form-data
```

| Field | Required | Description |
|---|:---:|---|
| `file` | ✅ | PDF, JPEG, PNG, WEBP, max 10MB |

> Upload ได้เฉพาะ claim ที่ตัวเองสร้าง และ claim ต้องอยู่ใน status `SUBMITTED`, `DUPLICATE_CANDIDATE`, หรือ `NEEDS_REVIEW`

#### 3. Get Claim Status

```http
GET /e-services/residence-claims/:claimId
x-api-key: <e-service-api-key>
```

```json
// Response
{
  "id": "claim-id",
  "status": "SUBMITTED",
  "matchedResidenceId": null,
  "reviewNote": null,
  "reviewedAt": null,
  "createdAt": "2026-05-14T09:00:00.000Z",
  "updatedAt": "2026-05-14T09:00:00.000Z"
}
```

#### 4. List Claim Evidence

```http
GET /e-services/residence-claims/:claimId/evidence
x-api-key: <e-service-api-key>
```

---

### Claim-Status

| IAM Status | UI Text |
|---|---|
| `SUBMITTED` | รอเจ้าหน้าที่ตรวจสอบ |
| `DUPLICATE_CANDIDATE` | พบข้อมูลใกล้เคียง รอตรวจสอบความซ้ำ |
| `NEEDS_REVIEW` | ต้องตรวจสอบเพิ่มเติม |
| `APPROVED` | อนุมัติแล้ว |
| `MERGED` | รวมกับบ้านที่มีอยู่แล้ว |
| `REJECTED` | ไม่อนุมัติ |

เมื่อ admin approve: `matchedResidenceId` จะมีค่า ให้ e-service บันทึก `matchedResidenceId` เป็น `selectedResidenceId` ในระบบตัวเอง

---

### Frontend-(NextJS)

#### ResidenceSearchBox

- ใช้ debounce 300–500ms ก่อนยิง search
- search ผ่าน e-service backend เช่น `/api/residences/search`
- อย่า search ถ้าคำค้นสั้นกว่า 3 ตัวอักษร (ยกเว้นมี lat/lng)
- เมื่อ user เลือกบ้าน ให้บันทึก `residenceId` กับ transaction ของ e-service
- ถ้าไม่เจอ ให้เปิด form "แจ้งเพิ่มบ้าน"

```ts
// State ที่แนะนำ
type ResidencePickerState =
  | { step: 'searching' }
  | { step: 'selected'; residenceId: string }
  | { step: 'claim-draft' }
  | { step: 'claim-submitted'; claimId: string };
```

#### File Upload

```tsx
<input
  type="file"
  accept=".pdf,image/jpeg,image/png,image/webp"
  // จำกัด 10MB ก่อน upload
/>
```

Upload หลังได้ `claimId` เท่านั้น และแสดงรายการไฟล์ที่ upload สำเร็จ

---

### Backend-(NestJS)

#### IamGovResidenceClient

```ts
@Injectable()
export class IamGovResidenceClient {
  private readonly apiUrl = this.config.getOrThrow<string>('IAM_API_URL');
  private readonly apiKey = this.config.getOrThrow<string>('IAM_API_KEY');

  constructor(private readonly config: ConfigService) {}

  async searchResidences(params: Record<string, unknown>) {
    const response = await fetch(
      `${this.apiUrl}/e-services/residences/search?${new URLSearchParams(params as Record<string, string>)}`,
      { headers: { 'x-api-key': this.apiKey } },
    );
    if (!response.ok) throw new Error(`IAM search failed: ${response.status}`);
    return response.json();
  }
}
```

#### Proxy Endpoints

| E-Service Backend | IAM-GOV Endpoint |
|---|---|
| `GET /api/residences/search` | `GET /e-services/residences/search` |
| `GET /api/residences/:id` | `GET /e-services/residences/:id` |
| `POST /api/residence-claims` | `POST /e-services/residence-claims` |
| `POST /api/residence-claims/:id/evidence` | `POST /e-services/residence-claims/:id/evidence` |
| `GET /api/residence-claims/:id` | `GET /e-services/residence-claims/:id` |

```ts
@Controller('api/residences')
export class ResidenceProxyController {
  constructor(private readonly iamResidence: IamGovResidenceClient) {}

  @Get('search')
  search(@Query() query: SearchResidenceDto) {
    return this.iamResidence.searchResidences(query);
  }
}
```

> ใส่ auth guard ของ e-service ก่อนให้ user เรียก proxy และ map user id จาก session/SSO เป็น `submittedByUserId` ห้ามรับจาก browser ตรงๆ

#### Claim Tracking Table (แนะนำ)

| Field | ความหมาย |
|---|---|
| `iamClaimId` | claim id จาก IAM-GOV |
| `iamUserId` | user id จาก SSO |
| `externalRequestId` | id ธุรกรรมของ e-service |
| `statusSnapshot` | status ล่าสุดที่ดึงจาก IAM-GOV |
| `selectedResidenceId` | residence id หลัง approved/merged |

---

### Best-Practices

- อย่าให้ frontend ถือ `x-api-key` เด็ดขาด
- ใช้ debounce 300–500ms ตอน search
- ถ้า user ปักหมุด map ให้ search ด้วย `lat/lng/radiusMeters` ก่อนสร้างบ้านใหม่
- ก่อน submit claim ให้ backend search ซ้ำอีกครั้งด้วย address + coordinates เพื่อกันข้อมูลซ้ำ
- ส่ง `externalRequestId` เพื่อ trace กลับไปหา record ฝั่ง e-service ได้
- เก็บ `claimId` ใน database ของ e-service เพื่อแสดงสถานะย้อนหลัง
- upload เอกสารหลังสร้าง claim สำเร็จเท่านั้น
- อย่าให้ e-service สร้าง canonical residence โดยตรง ให้สร้างเป็น claim แล้วรอ admin ตรวจ
- validate mime type และ file size ซ้ำที่ backend เสมอ
- log `claimId`, `residenceId`, `externalRequestId` เพื่อ trace incident

---

## API-Reference

### `GovSsoConfig`

| Property | Type | Required | Description |
|---|---|:---:|---|
| `iamAuthUrl` | `string` | ✅ | IAM-GOV auth frontend URL |
| `serviceCode` | `string` | ✅ | Service code registered with IAM-GOV |
| `apiBaseUrl` | `string` | ✅ | Backend API URL |
| `callbackUrl` | `string` | ✅ | Frontend callback URL |
| `ssoCallbackPath` | `string` | ❌ | Backend callback path (default: `/auth/sso-callback`) |

### Exports

| Export | Description |
|---|---|
| `GovSsoClient` | Core client class |
| `useGovSso(config?)` | Hook สำหรับ login initiation |
| `useGovSsoCallback(options?)` | Hook สำหรับ callback handling |
| `SsoLoginButton` | Ready-made login button component |
| `SsoCallbackHandler` | Ready-made callback page component |
| `GovSsoProvider` | Context provider |
| `GovSsoError` | Error class พร้อม error codes |

---

## License

MIT
