# gov-web-library — รวม README ทั้งหมด

> เอกสารนี้คือคู่มือฉบับรวมของ `gov-sso-login`, `gov-layout` และ `gov-token-css`
> 
> ถ้าต้องการอ่านง่ายขึ้น ให้ดูตามลำดับนี้:
> 1. ติดตั้งแพ็กเกจก่อน
> 2. ดูตัวอย่างใช้งานแบบสั้น
> 3. ค่อยอ่าน props / types แบบละเอียด

---

## วิธีติดตั้งไลบรารี่

<!--
ส่วนนี้อธิบายเฉพาะการเอาไลบรารีไปใช้ในโปรเจกต์จริง
ถ้าไม่ได้สนใจหน้า demo สามารถข้ามส่วน README / /guide ได้เลย
-->

### 1) ติดตั้งแพ็กเกจ

```bash
npm install gov-token-css gov-layout gov-sso-login
```

ถ้าเป็น monorepo หรือใช้แพ็กเกจในเครื่องเดียวกัน อาจต้องใช้ path แบบ local ตามโครงสร้างโปรเจกต์ของคุณ

### 2) ตั้งค่า `app/globals.css`

ถ้าใช้ `gov-token-css` ให้ import token stylesheet ก่อน

```css
@import "gov-token-css";
```

> ถ้าโปรเจกต์ของคุณใช้ไฟล์ CSS กลางคนละชื่อ ให้ใส่ตรงไฟล์ global ที่ถูกใช้จริง

### 3) ตั้งค่า `app/providers.tsx`

ถ้าใช้ setting/theme หรือ SSO ควรครอบ provider ไว้ที่ระดับบนสุดของแอป

```tsx
'use client';

import { SettingsProvider } from 'gov-layout';
import { GovSsoProvider } from 'gov-sso-login';

const ssoConfig = {
  iamAuthUrl: 'https://auth.govcenter.co',
  serviceCode: 'my-service-code',
  apiBaseUrl: 'https://api.example.com',
  callbackUrl: 'https://example.com/auth/callback',
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GovSsoProvider config={ssoConfig}>
      <SettingsProvider>{children}</SettingsProvider>
    </GovSsoProvider>
  );
}
```

### 4) ตั้งค่า `app/layout.tsx`

ครอบ `Providers` ไว้ใน layout หลักเพื่อให้ใช้ได้ทุกหน้า

```tsx
import Providers from './providers';

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### 5) ใช้คอมโพเนนต์ในหน้าใช้งานจริง

- `gov-layout` → `StaffSidebar`, `UserHeader`, `UserSidebar`, `SettingsPanel`
- `gov-sso-login` → `SsoLoginButton`, `SsoCallbackHandler`, `useGovSso`
- `gov-token-css` → class token สำหรับสี, spacing, typography

ตัวอย่างสั้น:

```tsx
import { SsoLoginButton } from 'gov-sso-login';

export default function LoginPage() {
  return <SsoLoginButton label="เข้าสู่ระบบด้วย Gov Center" />;
}
```

### 6) หน้า `/guide` เป็นแค่ตัวอย่าง demo

ส่วน README ในหน้าเว็บมีไว้เพื่อดูตัวอย่างเอกสาร ไม่จำเป็นสำหรับการติดตั้งไลบรารี่จริง

---

## Installation

```bash
npm install gov-sso-login gov-layout gov-token-css
```

```css
/* ใน globals.css */
@import "gov-token-css";
```

---

## Table of Contents

<!--
สารบัญนี้ช่วยให้ข้ามไปอ่านหัวข้อที่ต้องการได้เร็ว
ถ้าอ่านครั้งแรก แนะนำเริ่มจาก Installation → Quick Start → Components
-->

- [gov-sso-login](#gov-sso-login)
  - [Quick Start](#quick-start)
  - [GovSsoProvider (แนะนำ)](#govssoprovider-แนะนำ)
  - [Login Button](#login-button)
  - [Callback Handler](#callback-handler)
  - [Hooks](#hooks)
  - [Core Client (Non-React)](#core-client-non-react)
  - [Custom Theming](#custom-theming)
  - [Error Handling](#error-handling)
  - [Backend Setup (NestJS)](#backend-setup-nestjs)
- [Residence API Integration](#residence-api-integration)
  - [ภาพรวม](#ภาพรวม)
  - [API Endpoints](#api-endpoints)
  - [Residence Claim Flow](#residence-claim-flow)
  - [Frontend (NextJS)](#frontend-nextjs)
  - [Backend (NestJS)](#backend-nestjs)
  - [Claim Status](#claim-status)
  - [Best Practices](#best-practices)
- [API Reference](#api-reference)
- [gov-layout](#gov-layout)
  - [Icons](#icons-ไอคอน-built-in)
  - [StaffSidebar](#1-staffsidebar-เจ้าหน้าที่)
  - [UserHeader](#2-userheader-ผู้ใช้ทั่วไป)
  - [UserSidebar](#3-usersidebar-ผู้ใช้ทั่วไป)
  - [SettingsPanel](#4-settingspanel-ตั้งค่าระบบ)
  - [Types](#types)
  - [Layout Examples](#layout-examples)

---

# gov-sso-login

IAM-GOV SSO Login library สำหรับ React/Next.js applications พร้อม Residence API Integration

## Quick Start

<!--
Quick Start = ตัวอย่างใช้งานสั้นที่สุด
ถ้าไม่อยากอ่านยาว ให้เริ่มจาก section นี้ก่อน
-->

### 1. Config

<!--
ขั้นตอนแรกคือกำหนดค่าพื้นฐานของ SSO
โดยเฉพาะ `callbackUrl` และ `apiBaseUrl` ต้องตรงกับ backend จริง
-->

```typescript
import type { GovSsoConfig } from 'gov-sso-login';

const ssoConfig: GovSsoConfig = {
  iamAuthUrl: 'https://auth.govcenter.co',
  serviceCode: 'my-service-code',
  apiBaseUrl: 'https://api.example.com',
  callbackUrl: 'https://example.com/auth/callback',
};
```

### 2. Login Button

<!-- ปุ่มนี้ใช้พาผู้ใช้ไปหน้า login ของ IAM-GOV -->

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

### 3. Callback Handler

<!--
ส่วนนี้ทำงานหลังผู้ใช้ login สำเร็จ
หน้าที่ของมันคือรับ callback code แล้วส่งต่อให้ระบบของเรา
-->

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

## GovSsoProvider (แนะนำ)

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

## Login Button

```tsx
// ถ้ามี Provider → ไม่ต้องส่ง config
<SsoLoginButton label="เข้าสู่ระบบด้วย Gov Center" />

// ปรับสีเฉพาะปุ่มนี้
<SsoLoginButton theme={{ primaryColor: '#0066CC', primaryHoverColor: '#004C99' }} />

// ใช้ className เอง
<SsoLoginButton className="my-custom-btn" />
```

---

## Callback Handler

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

## Hooks

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

## Core Client (Non-React)

```typescript
import { GovSsoClient } from 'gov-sso-login';

const client = new GovSsoClient(ssoConfig);

const url = client.getLoginUrl();
const result = await client.handleCallback(code);
```

---

## Custom Theming

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

## Error Handling

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

## Backend Setup (NestJS)

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

# Residence API Integration

<!--
section นี้อธิบาย flow สำหรับค้นหาบ้าน / ยื่นคำขอ / ดูสถานะ
ถ้าไม่ได้ใช้ residence flow สามารถข้ามได้
-->

## ภาพรวม

E-service สามารถทำ flow ครบผ่าน `x-api-key` ได้: search/read residence, submit residence claim, upload evidence, list evidence และ read claim status

> **สำคัญ:** e-service frontend ต้องเรียก backend ของตัวเองก่อนเสมอ ห้ามถือ `x-api-key` ใน browser

```
User → E-Service Frontend → E-Service Backend → (x-api-key) → IAM-GOV API → Residence Registry
```

### Required Scopes

| Use case | Required scopes |
|---|---|
| ค้นหาบ้าน | `residence:search` |
| อ่านรายละเอียดบ้าน | `residence:read` |
| ดูสมาชิกบ้าน | `residence:members:read` |
| ยื่นเพิ่มบ้าน + upload เอกสาร | `residence:claim:create` |
| ดูสถานะคำขอ + list evidence | `residence:claim:read` |

---

## API Endpoints

### Search Residence

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

### Read Residence Detail

```http
GET /e-services/residences/:id
x-api-key: <e-service-api-key>
```

> ต้องมี scope `residence:read` — ไม่ควรดึง detail ทุกครั้งตอน typing search ให้ใช้ search endpoint ก่อน

### Read Verified Residence Members

```http
GET /e-services/residences/:id/members
x-api-key: <e-service-api-key>
```

> ต้องมี scope `residence:members:read` — คืนเฉพาะ member ที่ `VERIFIED` ใช้เฉพาะ service ที่ต้องรู้ว่าใครอยู่บ้าน

---

## Residence Claim Flow

เมื่อ user ไม่พบบ้านในระบบ:

### 1. Submit Residence Claim

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

### 2. Upload Claim Evidence

```http
POST /e-services/residence-claims/:claimId/evidence
x-api-key: <e-service-api-key>
Content-Type: multipart/form-data
```

| Field | Required | Description |
|---|:---:|---|
| `file` | ✅ | PDF, JPEG, PNG, WEBP, max 10MB |

> Upload ได้เฉพาะ claim ที่ตัวเองสร้าง และ claim ต้องอยู่ใน status `SUBMITTED`, `DUPLICATE_CANDIDATE`, หรือ `NEEDS_REVIEW`

### 3. Get Claim Status

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

### 4. List Claim Evidence

```http
GET /e-services/residence-claims/:claimId/evidence
x-api-key: <e-service-api-key>
```

---

## Claim Status

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

## Frontend (NextJS)

### ResidenceSearchBox

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

### File Upload

```tsx
<input
  type="file"
  accept=".pdf,image/jpeg,image/png,image/webp"
  // จำกัด 10MB ก่อน upload
/>
```

Upload หลังได้ `claimId` เท่านั้น และแสดงรายการไฟล์ที่ upload สำเร็จ

---

## Backend (NestJS)

### IamGovResidenceClient

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

### Proxy Endpoints

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

### Claim Tracking Table (แนะนำ)

| Field | ความหมาย |
|---|---|
| `iamClaimId` | claim id จาก IAM-GOV |
| `iamUserId` | user id จาก SSO |
| `externalRequestId` | id ธุรกรรมของ e-service |
| `statusSnapshot` | status ล่าสุดที่ดึงจาก IAM-GOV |
| `selectedResidenceId` | residence id หลัง approved/merged |

---

## Best Practices

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

# API Reference

## `GovSsoConfig`

| Property | Type | Required | Description |
|---|---|:---:|---|
| `iamAuthUrl` | `string` | ✅ | IAM-GOV auth frontend URL |
| `serviceCode` | `string` | ✅ | Service code registered with IAM-GOV |
| `apiBaseUrl` | `string` | ✅ | Backend API URL |
| `callbackUrl` | `string` | ✅ | Frontend callback URL |
| `ssoCallbackPath` | `string` | ❌ | Backend callback path (default: `/auth/sso-callback`) |

## Exports

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

# gov-layout

<!--
ส่วนนี้คือ component สำหรับจัดหน้าจอ เช่น sidebar, header และ settings
เหมาะกับการดู props ทีละกลุ่ม ไม่ต้องไล่อ่านทั้งไฟล์แบบติดกัน
-->

Government Layout Components สำหรับเว็บแอปพลิเคชันภาครัฐ

> ใช้คู่กับ `gov-token-css` เพื่อให้สีตรงตาม Design System

## Components ทั้งหมด

| Component | ใช้สำหรับ | import |
|-----------|----------|--------|
| `StaffSidebar` | Sidebar เจ้าหน้าที่ | `import { StaffSidebar } from 'gov-layout'` |
| `UserHeader` | Header ผู้ใช้ทั่วไป | `import { UserHeader } from 'gov-layout'` |
| `UserSidebar` | Sidebar ผู้ใช้ (slide-in) | `import { UserSidebar } from 'gov-layout'` |
| `SettingsPanel` | หน้าตั้งค่า (font + theme) | `import { SettingsPanel } from 'gov-layout'` |
| `SettingsProvider` | Context wrapper | `import { SettingsProvider } from 'gov-layout'` |
| `useSettings` | Hook อ่าน/เปลี่ยนค่า | `import { useSettings } from 'gov-layout'` |
| `Icons` | ไอคอน built-in 33 ตัว | `import { Icons } from 'gov-layout'` |

---

## Icons (ไอคอน built-in)

import ครั้งเดียว ใช้ได้ทุกไอคอน — ไม่ต้องสร้าง SVG เอง

### วิธีใช้งาน

```tsx
import { Icons } from 'gov-layout';

// ใช้ตรงๆ
<Icons.Folder />
<Icons.User />
<Icons.Gear />

// ปรับขนาด (default = 20)
<Icons.Home size={24} />

// ใส่ใน MenuItem
const menuItems: MenuItem[] = [
  { id: 'services', title: 'งานบริการ', icon: <Icons.Folder />, path: '/services' },
  { id: 'users', title: 'จัดการผู้ใช้', icon: <Icons.User />, path: '/users' },
  { id: 'reports', title: 'รายงาน', icon: <Icons.BarChart />, path: '/reports' },
];
```

### ไอคอนทั้งหมด

| ชื่อ | Component | ใช้สำหรับ |
|------|-----------|----------|
| 🏠 | `Icons.Home` | หน้าแรก / Dashboard |
| 🔍 | `Icons.Search` | ค้นหา |
| 🔔 | `Icons.Bell` | แจ้งเตือน |
| 📁 | `Icons.Folder` | งานบริการ / หมวดหมู่ |
| 📋 | `Icons.Clipboard` | แบบฟอร์ม / คำร้อง |
| 📄 | `Icons.FileText` | รายงาน / เอกสาร |
| 📅 | `Icons.Calendar` | ตารางงาน / นัดหมาย |
| 👤 | `Icons.User` | ข้อมูลผู้ใช้ |
| 👥 | `Icons.Users` | จัดการสมาชิก |
| ⚙️ | `Icons.Gear` | ตั้งค่าระบบ |
| 🔧 | `Icons.Wrench` | ซ่อมบำรุง |
| 🛡️ | `Icons.Shield` | สิทธิ์การใช้งาน |
| ❓ | `Icons.HelpCircle` | ช่วยเหลือ |
| 📊 | `Icons.BarChart` | สถิติ / รายงาน |
| 🕐 | `Icons.History` | ประวัติการใช้งาน |
| 💾 | `Icons.Database` | สำรองข้อมูล |
|  | `Icons.Building` | หน่วยงาน / องค์กร |
| 📍 | `Icons.MapPin` | สถานที่ |
| 📞 | `Icons.Phone` | ติดต่อ |
| ✉️ | `Icons.Mail` | อีเมล / ข้อความ |
| ✅ | `Icons.CheckCircle` | สำเร็จ / อนุมัติ |
| ⚠️ | `Icons.AlertTriangle` | คำเตือน |
| ❌ | `Icons.XCircle` | ปฏิเสธ / ข้อผิดพลาด |
| ➕ | `Icons.PlusCircle` | เพิ่มรายการ |
| 🚪 | `Icons.LogOut` | ออกจากระบบ |
| ⬇️ | `Icons.Download` | ดาวน์โหลด |
| ⬆️ | `Icons.Upload` | อัปโหลด |
| 🖨️ | `Icons.Printer` | พิมพ์เอกสาร |
| ⭐ | `Icons.Star` | รายการโปรด |
| ❤️ | `Icons.Heart` | ถูกใจ |
| 👁️ | `Icons.Eye` | ดูรายละเอียด |
| ✏️ | `Icons.Edit` | แก้ไข |
| 🗑️ | `Icons.Trash` | ลบ |

### IconProps

| Prop | Type | Default | คำอธิบาย |
|------|------|---------|----------|
| `size` | `number?` | `20` | ขนาด (width & height) |
| `className` | `string?` | - | CSS class |
| `style` | `CSSProperties?` | - | inline style |

>  ถ้าต้องการ import ทีละตัวก็ได้: `import { FolderIcon, UserIcon } from 'gov-layout'`

---

## 1. StaffSidebar (เจ้าหน้าที่)

Sidebar ฝั่งซ้ายแบบ fixed — รองรับพับ/กาง (collapsible)

### ตัวอย่างใช้งาน

```tsx
import { StaffSidebar } from 'gov-layout';
import type { MenuItem } from 'gov-layout';

// ไม่ต้องระบุ icon — sidebar จับคู่ไอคอนให้อัตโนมัติจาก id
const menuItems: MenuItem[] = [
  {
    id: 'services',       // → 📁 FolderIcon
    title: 'งานบริการ',
    children: [
      { id: 'water', title: 'ประปา', path: '/services/water' },
      { id: 'tax', title: 'ภาษี', path: '/services/tax' },
    ],
    dividerAfter: true,
  },
  { id: 'users', title: 'จัดการผู้ใช้', path: '/users' },       // → 👥 UsersIcon
  { id: 'reports', title: 'รายงาน', path: '/reports' },          // → 📊 BarChartIcon
  { id: 'roles', title: 'สิทธิ์การใช้งาน', path: '/roles' },     // → 🛡️ ShieldIcon
  { id: 'logs', title: 'ประวัติ', path: '/logs' },                // → 🕐 HistoryIcon
  { id: 'backup', title: 'สำรองข้อมูล', path: '/backup' },       // → 💾 DatabaseIcon
];

<StaffSidebar
  orgLogo="/logo.png"
  orgName="เทศบาลตำบล Biza"
  orgSubtitle="จังหวัดราชบุรี"
  menuItems={menuItems}
  user={{ firstName: 'สมชาย', lastName: 'ใจดี' }}
  roleLabel="เจ้าหน้าที่"
  currentPath="/services/water"
  onNavigate={(path) => router.push(path)}
  onLogout={() => signOut()}
  onProfile={() => router.push('/profile')}
  collapsible
/>
```

> ** Auto-Icon:** ไม่ต้อง import ไอคอน — sidebar จับคู่จาก `id` อัตโนมัติ
> ถ้าอยากกำหนดเอง ก็ส่ง `icon` prop ได้ตามปกติ: `icon: <Icons.Folder />`

### Default Bottom Menu

ไม่ต้องตั้งค่าเอง — มี **ตั้งค่าระบบ** + **ช่วยเหลือ** อยู่ด้านล่างอัตโนมัติ

```
งานบริการ ▽
  ประปา / ภาษี / ทะเบียน
──────────────
จัดการผู้ใช้
รายงาน
ตั้งค่าระบบ    ← default (ไม่ต้องส่ง)
ช่วยเหลือ     ← default (ไม่ต้องส่ง)
      ↕ spacer
โปรไฟล์ + ออกจากระบบ
```

```tsx
// override bottom menu
<StaffSidebar
  bottomMenuItems={[
    { id: 'settings', title: 'ตั้งค่า', icon: <Icons.Gear />, path: '/settings' },
  ]}
  ...
/>

// ไม่อยากมี bottom menu
<StaffSidebar bottomMenuItems={[]} ... />
```

### Props ทั้งหมด

| Prop | Type | Default | คำอธิบาย |
|------|------|---------|----------|
| `orgLogo` | `string?` | - | URL รูปตราองค์กร |
| `orgName` | `string` | **required** | ชื่อองค์กร |
| `orgSubtitle` | `string?` | - | ชื่อรอง เช่น จังหวัด |
| `menuItems` | `MenuItem[]` | **required** | เมนูหลัก |
| `bottomMenuItems` | `MenuItem[]?` | ตั้งค่าระบบ + ช่วยเหลือ | เมนูด้านล่าง |
| `user` | `User \| null` | **required** | ข้อมูลผู้ใช้ |
| `roleLabel` | `string` | **required** | ป้ายตำแหน่ง เช่น "เจ้าหน้าที่" |
| `onNavigate` | `(path) => void` | **required** | callback เมื่อคลิกเมนู |
| `onLogout` | `() => void` | **required** | callback ออกจากระบบ |
| `onProfile` | `() => void?` | - | callback เมื่อกดโปรไฟล์ผู้ใช้ |
| `currentPath` | `string?` | - | path ปัจจุบัน (highlight active) |
| `width` | `string?` | `'280px'` | ความกว้าง sidebar |
| `collapsible` | `boolean?` | `false` | เปิดโหมดพับ/กาง |
| `isOpen` | `boolean?` | - | controlled open/close |
| `onToggle` | `() => void?` | - | callback เมื่อกดพับ/กาง |

### Features

- ✅ Dropdown submenu (พับ/กางอัตโนมัติ)
- ✅ Auto-expand เมื่อ child active
- ✅ Active item highlight
- ✅ Collapsible — พับเป็น icon-only 64px, กางเป็น 280px
- ✅ Tooltip เมื่อพับ
- ✅ Default ตั้งค่าระบบ + ช่วยเหลือ (override ได้)
- ✅ โปรไฟล์ + ออกจากระบบ ล่างสุดเสมอ
- ✅ `dividerAfter` เส้นคั่นระหว่างกลุ่ม
- ✅ ใช้ Standard Avatar Placeholder กรณีที่ไม่มีรูปโปรไฟล์หรือโหลดรูปไม่สำเร็จ (v1.3.2+) 🆕

---

## 2. UserHeader (ผู้ใช้ทั่วไป)

Header ด้านบนพร้อม notification bell

```tsx
import { UserHeader } from 'gov-layout';

<UserHeader
  user={{
    firstName: 'ชนธัญ',
    pictureUrl: '/avatar.jpg',
    subtitle: 'ผู้สูงอายุ',        // แสดงใต้ข้อความทักทาย (optional)
  }}
  notifications={[
    {
      id: 1,
      title: 'คำร้องใหม่รอตรวจสอบ',
      description: 'มีคำร้องใหม่เข้ามา กรุณาตรวจสอบ',
      date: '2 ชม. ที่แล้ว',
      type: 'warning',
      isRead: false,
      category: 'action',           // ← แสดงในแท็บ "ต้องดำเนินการ"
    },
    {
      id: 2,
      title: 'คำร้องได้รับการอนุมัติ',
      description: 'คำร้องหมายเลข #1234 อนุมัติสำเร็จ',
      date: '5 ชม. ที่แล้ว',
      type: 'success',
      isRead: true,
      category: 'general',          // ← แสดงในแท็บ "แจ้งเตือนทั่วไป"
    },
  ]}
  onToggleSidebar={() => setOpen(true)}
  onMarkAllRead={() => markAllRead()}
  onViewAll={() => router.push('/notifications')}
  onNotificationClick={(notif) => router.push(`/notifications/${notif.id}`)}
  onProfile={() => router.push('/profile')}
/>
```

### Props

| Prop | Type | Default | คำอธิบาย |
|------|------|---------|----------|
| `user.firstName` | `string?` | - | ชื่อ |
| `user.lastName` | `string?` | - | นามสกุล |
| `user.pictureUrl` | `string?` | - | URL รูปโปรไฟล์ |
| `user.subtitle` | `string?` | - | ข้อความใต้ชื่อ เช่น "ผู้สูงอายุ" |
| `notifications` | `NotificationItem[]?` | `[]` | รายการแจ้งเตือน |
| `onToggleSidebar` | `() => void?` | - | callback เปิด sidebar |
| `onMarkAllRead` | `() => void?` | - | callback อ่านทั้งหมดแล้ว |
| `onViewAll` | `() => void?` | - | callback ดูทั้งหมด |
| `onNotificationClick` | `(notification) => void?` | - | callback เมื่อกดแจ้งเตือนแต่ละรายการ |
| `onProfile` | `() => void?` | - | callback เมื่อกดโปรไฟล์ |
| `notificationBell` | `ReactNode?` | - | custom bell icon |
| `className` | `string?` | - | className เพิ่มเติม |

### 🔔 Notification Filter Tabs (v1.2.25+)

Dropdown แจ้งเตือนมีแท็บกรอง 3 หมวด พร้อม badge ตัวเลข:

| แท็บ | กรองจาก `category` | ตัวอย่างใช้งาน |
|------|-------------------|----------------|
| **ทั้งหมด** | แสดงทุกรายการ | ดูภาพรวม |
| **ต้องดำเนินการ** | `'action'` | คำร้องใหม่รอตรวจสอบ, ต้องอัปโหลดเอกสาร, มีคิวใหม่ |
| **แจ้งเตือนทั่วไป** | `'general'` หรือไม่ระบุ | อนุมัติสำเร็จ, จองสำเร็จ, ยกเลิกแล้ว |

>  ถ้าไม่ส่ง `category` จะถูกจัดเป็น **แจ้งเตือนทั่วไป** อัตโนมัติ (backward compatible)

### Features

- ✅ Notification bell พร้อม badge (99+ เมื่อเกิน)
- ✅ ไม่มีแจ้งเตือน → ไม่แสดง badge
- ✅ Notification dropdown แบบ scroll
- ✅ **Filter tabs**: ทั้งหมด / ต้องดำเนินการ / แจ้งเตือนทั่วไป 🆕
- ✅ **Badge ตัวเลข** แต่ละแท็บ 🆕
- ✅ **Category badge** "ต้องดำเนินการ" ติดแต่ละรายการ 🆕
- ✅ **Empty state แยกตาม filter** 🆕
- ✅ กดแจ้งเตือนแต่ละรายการ → `onNotificationClick`
- ✅ Subtitle ใต้ข้อความทักทาย (เช่น "ผู้สูงอายุ")
- ✅ ปุ่มเปิด sidebar (☰)
- ✅ กดโปรไฟล์ผู้ใช้ (avatar + ชื่อ) → `onProfile`
- ✅ รองรับ Dark Mode

---

## 3. UserSidebar (ผู้ใช้ทั่วไป)

Sidebar ฝั่งขวาแบบ slide-in + overlay

```tsx
import { UserSidebar } from 'gov-layout';

<UserSidebar
  isOpen={isSidebarOpen}
  onClose={() => setIsSidebarOpen(false)}
  user={{ firstName: 'สมหญิง', lastName: 'ใจดี', pictureUrl: '/avatar.jpg' }}
  roleLabel="ผู้สูงอายุ"
  menuItems={[
    { id: 'profile', title: 'ข้อมูลส่วนตัว', path: '/profile' },
    { id: 'services', title: 'บริการหลัก', path: '/services' },
    { id: 'settings', title: 'ตั้งค่าระบบ', path: '/settings' },
  ]}
  onNavigate={(path) => router.push(path)}
  onLogout={() => signOut()}
  onProfile={() => router.push('/profile')}
/>
```

> **หมายเหตุ:** `roleLabel` แต่ละระบบส่งค่าเองได้ เช่น "ผู้สูงอายุ", "ผู้ใช้ปกติ", "อาสาสมัคร"

---

## 4. SettingsPanel (ตั้งค่าระบบ) 🆕

ปรับขนาดตัวอักษร (5 ระดับ) + โหมดสว่าง/มืด — ค่าจำใน localStorage

### ขั้นตอนที่ 1: ครอบ SettingsProvider

```tsx
// app/providers.tsx ← ต้องเป็น 'use client'
'use client';
import { SettingsProvider } from 'gov-layout';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SettingsProvider>{children}</SettingsProvider>;
}
```

```tsx
// app/layout.tsx
import Providers from './providers';

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### ขั้นตอนที่ 2: วาง SettingsPanel

```tsx
import { SettingsPanel } from 'gov-layout';

// ผู้ใช้ทั่วไป → ทั้ง font + theme
<SettingsPanel />

// เจ้าหน้าที่ → แค่ปรับขนาดฟอนต์
<SettingsPanel showTheme={false} />
```

| Prop | Type | Default | คำอธิบาย |
|------|------|---------|----------|
| `showTheme` | `boolean?` | `true` | แสดงตัวเลือกโหมดสว่าง/มืด |
| `className` | `string?` | - | className เพิ่มเติม |

### ขั้นตอนที่ 3: ใช้ useSettings() hook (ถ้าต้องการ)

```tsx
import { useSettings } from 'gov-layout';

function MyComponent() {
  const { theme, toggleTheme, fontSize, setFontSize, fontSizeOption } = useSettings();

  return (
    <div>
      <p>ธีม: {theme}</p>
      <p>ฟอนต์: {fontSize} (×{fontSizeOption.scale})</p>
      <button onClick={toggleTheme}>สลับธีม</button>
      <button onClick={() => setFontSize('large')}>ฟอนต์ใหญ่</button>
    </div>
  );
}
```

### ขนาดตัวอักษร (5 ระดับ)

| ค่า | Label | Scale | ผลลัพธ์ |
|-----|-------|-------|---------|
| `xsmall` | เล็กมาก | ×0.8 | ย่อทุกอย่าง 80% |
| `small` | เล็ก | ×0.9 | ย่อเล็กน้อย |
| `medium` | กลาง | ×1.0 | ค่าเริ่มต้น |
| `large` | ใหญ่ | ×1.2 | ขยาย 120% |
| `xlarge` | ใหญ่มาก | ×1.4 | ขยาย 140% |

### หลักการทำงาน

- **Theme** — เพิ่ม/ลบ class `dark` บน `<html>` ➜ ใช้ CSS `html.dark` จัดสี
- **Font size** — ปรับ `body.style.zoom` + CSS variables ตาม scale
- **Persistence** — เก็บใน localStorage (`app-theme`, `app-font-size`)

### Dark mode CSS ที่ต้องเพิ่ม

```css
/* globals.css — เพิ่มสำหรับ dark mode */
html.dark body          { background-color: #0f172a; color: #f1f5f9; }
html.dark aside         { background-color: #1e293b !important; }
html.dark header        { background-color: #1e293b !important; }
html.dark h1,
html.dark h2,
html.dark h3            { color: #f1f5f9 !important; }
html.dark p             { color: #94a3b8 !important; }
```

---

## Types

```ts
// เมนู
interface MenuItem {
  id: string;
  title: string;
  path?: string;           // path สำหรับ navigate
  icon?: React.ReactNode;  // icon component
  children?: MenuItem[];   // submenu → แสดงเป็น dropdown
  dividerAfter?: boolean;  // เส้นคั่นด้านล่าง
}

// ผู้ใช้
interface User {
  id?: string | number;
  firstName?: string;
  lastName?: string;
  pictureUrl?: string;
  role?: string;
}

// การแจ้งเตือน
type NotificationCategory = 'action' | 'general';

interface NotificationItem {
  id: string | number;
  title: string;
  description: string;
  date: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'reminder';
  isRead: boolean;
  category?: NotificationCategory;  // 🆕 หมวดหมู่: 'action' | 'general'
}

// ตั้งค่า
type Theme = 'light' | 'dark';
type FontSizeKey = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
```

---

## Layout Examples

### Staff Layout (เจ้าหน้าที่)

```tsx
'use client';
import { StaffSidebar, SettingsPanel } from 'gov-layout';

export default function AdminLayout({ children }) {
  const [currentPath, setCurrentPath] = useState('/');

  return (
    <div style={{ display: 'flex' }}>
      <StaffSidebar
        orgLogo="/logo.png"
        orgName="เทศบาลตำบล Biza"
        orgSubtitle="จังหวัดราชบุรี"
        menuItems={menuItems}
        user={user}
        roleLabel="เจ้าหน้าที่"
        currentPath={currentPath}
        onNavigate={(path) => setCurrentPath(path)}
        onLogout={() => signOut()}
        onProfile={() => setCurrentPath('/profile')}
        collapsible
      />
      <main style={{ marginLeft: 280, flex: 1, padding: 32 }}>
        {currentPath === '/settings' ? (
          <SettingsPanel showTheme={false} />
        ) : (
          children
        )}
      </main>
    </div>
  );
}
```

### User Layout (ผู้ใช้ทั่วไป)

```tsx
'use client';
import { UserHeader, UserSidebar, SettingsPanel } from 'gov-layout';

export default function UserLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');

  return (
    <>
      <UserHeader
        user={{ ...user, subtitle: 'ผู้สูงอายุ' }}
        notifications={notifications}
        onToggleSidebar={() => setOpen(true)}
        onNotificationClick={(notif) => setCurrentPath(`/notifications/${notif.id}`)}
        onProfile={() => setCurrentPath('/profile')}
      />
      <UserSidebar
        isOpen={open}
        onClose={() => setOpen(false)}
        user={user}
        roleLabel="ผู้ใช้ทั่วไป"
        menuItems={menuItems}
        onNavigate={(path) => setCurrentPath(path)}
        onLogout={() => signOut()}
        onProfile={() => setCurrentPath('/profile')}
      />
      <main style={{ padding: 32 }}>
        {currentPath === '/settings' ? (
          <SettingsPanel showTheme={true} />
        ) : (
          children
        )}
      </main>
    </>
  );
}
```

---

## Sub-Components

ใช้แยกกันได้ถ้าต้องการ customize เฉพาะส่วน

```tsx
import {
  SidebarHeader,      // logo + ชื่อองค์กร
  SidebarMenu,        // เมนู dropdown
  SidebarUserProfile, // avatar + logout
  ThemeSettings,      // UI เลือก theme อย่างเดียว
  FontSizeSettings,   // UI เลือก font size อย่างเดียว
} from 'gov-layout';
```

---

## Styling

<!--
สรุปท้ายส่วน: components ใช้ inline styles เป็นหลัก
ถ้าจะปรับหน้าตาให้เหมือนระบบจริง ให้ดู CSS variables ของ token package ประกอบ
-->

- Components ใช้ **inline styles** + CSS variables จาก `gov-token-css`
- ถ้าไม่ได้ import `gov-token-css` จะใช้สี **fallback** อัตโนมัติ
- Dark mode ต้องเพิ่ม CSS เอง (ดู section Dark mode CSS ด้านบน)
- Font size ใช้ `body.style.zoom` → scale ทุกอย่างรวมถึง inline `px`

---

