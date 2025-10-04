# 財務管理系統 Angular 專案

## 專案簡介

本專案為使用 Angular 20.x + TypeScript 開發的財務管理系統，具備登入、儀表板、記錄管理、導覽列等功能，並整合 API 與響應式設計，適合桌機與手機瀏覽。

---

## 技術選型

- **Angular 20.x**：SPA 前端框架
- **TypeScript**：型別安全開發
- **RxJS**：非同步資料流（HTTP 請求）
- **Angular Router**：頁面導向與路由管理
- **Reactive Forms**：表單驗證
- **CSS/SCSS**：自訂樣式
- **Chart.js / ng2-charts / ngx-gauge**：資料視覺化
- **Signal API**：狀態管理（Angular 20 新功能）

---

## 專案架構

```
src/
│
├── index.html                // 入口 HTML
├── main.ts                   // Angular 啟動檔
├── styles.css                // 全域樣式
│
└── app/
    ├── app.ts                // 根元件
    ├── app.html              // 根元件模板
    ├── app.css               // 根元件樣式
    ├── app.routes.ts         // 路由設定
    ├── app.config.ts         // Angular 設定
    ├── app.spec.ts           // 根元件測試
    │
    ├── login-component/      // 登入元件
    │   ├── login-component.ts
    │   ├── login-component.html
    │   ├── login-component.css
    │   ├── login-component.spec.ts
    │
    ├── dashboard-component/  // 儀表板元件
    │   ├── dashboard-component.ts
    │   ├── dashboard-component.html
    │   ├── dashboard-component.css
    │   ├── dashboard-component.spec.ts
    │
    ├── record-add/           // 新增記錄元件
    │   ├── record-add.ts
    │   ├── record-add.html
    │   ├── record-add.css
    │   ├── record-add.spec.ts
    │
    ├── record-edit/          // 編輯記錄元件
    │   ├── record-edit.ts
    │   ├── record-edit.html
    │   ├── record-edit.css
    │   ├── record-edit.spec.ts
    │
    ├── record-list/          // 記錄列表元件
    │   ├── record-list.ts
    │   ├── record-list.html
    │   ├── record-list.css
    │   ├── record-list.spec.ts
    │
    ├── navigation/           // 導覽列元件
    │   ├── navigation.ts
    │   ├── navigation.html
    │   ├── navigation.css
    │   ├── navigation.spec.ts
    │
    ├── service/              // 服務層
    │   ├── login-sevice.ts
    │   ├── login-sevice.spec.ts
    │
    └── model/                // 資料模型
        └── record.dto.ts
```

---

## 各元件詳細功能與技術說明

### LoginComponent（登入元件）
- **技術**：Angular Component、Reactive Forms、Signal API、CSS樣式、路由跳轉、RxJS（HttpClient）。
- **功能**：
  - 使用者輸入帳號密碼，表單驗證。
  - 呼叫 `LoginService` 進行 API 登入，成功後導向 dashboard。
  - 使用 Signal API 管理登入狀態（如顯示使用者名稱）。
  - 單元測試：`login-component.spec.ts`。

### DashboardComponent（儀表板元件）
- **技術**：Angular Component、資料視覺化（Chart.js、ng2-charts、ngx-gauge）、API 整合、響應式設計。
- **功能**：
  - 顯示財務資料、收支圖表、趨勢分析。
  - 可能有統計卡片、圖表、儀表板元件。
  - 單元測試：`dashboard-component.spec.ts`。

### RecordAdd / RecordEdit / RecordList（記錄管理元件）
- **技術**：Angular Component、Reactive Forms、API 整合、路由參數、資料模型（DTO）。
- **功能**：
  - `RecordAdd`：新增財務記錄，表單驗證，送出 API。
  - `RecordEdit`：編輯財務記錄，根據路由參數取得記錄 ID，表單驗證。
  - `RecordList`：列表顯示所有記錄，支援重新解析（`runGuardsAndResolvers: 'always'`），可整合分頁、搜尋等功能。
  - 單元測試：各自有 spec.ts。

### Navigation（導覽列元件）
- **技術**：Angular Component、RouterLink、CSS/SCSS 響應式設計。
- **功能**：
  - 提供頁面切換（如登入、儀表板、記錄管理）。
  - 支援手機與桌機版面。
  - 單元測試：`navigation.spec.ts`。

### Service（服務層）
- **技術**：Angular Service、HttpClient、RxJS、Signal API。
- **功能**：
  - `login-sevice.ts`：負責登入 API 呼叫、狀態管理、路由跳轉。
  - 其他服務可擴充（如記錄 CRUD）。
  - 單元測試：`login-sevice.spec.ts`。

### Model（資料模型）
- **技術**：TypeScript Interface/Class。
- **功能**：
  - `record.dto.ts`：定義財務記錄資料結構，統一資料型別。

---

## 全域功能與設計

- **路由管理**：`app.routes.ts` 設定所有頁面路徑，預設導向登入或 dashboard。
- **全域樣式**：`styles.css` 控管背景漸層、主題色彩。
- **元件化設計**：每個功能獨立元件，易於維護與擴充。
- **單元測試**：每個元件與服務皆有對應的 spec 測試檔案。
- **響應式設計**：支援桌機與手機瀏覽。

# 財務管理系統 Angular + ASP.NET Core 專案

## 專案簡介

本專案為使用 Angular 20.x + TypeScript 前端與 ASP.NET Core Web API 後端的財務管理系統，具備登入、儀表板、記錄管理、導覽列等功能，並整合 API 與響應式設計，適合桌機與手機瀏覽。

---

## 前端技術選型

- **Angular 20.x**：SPA 前端框架
- **TypeScript**：型別安全開發
- **RxJS**：非同步資料流（HTTP 請求）
- **Angular Router**：頁面導向與路由管理
- **Reactive Forms**：表單驗證
- **CSS/SCSS**：自訂樣式
- **Chart.js / ng2-charts / ngx-gauge**：資料視覺化
- **Signal API**：狀態管理（Angular 20 新功能）

---

## 前端專案架構

```
src/
│
├── index.html                // 入口 HTML
├── main.ts                   // Angular 啟動檔
├── styles.css                // 全域樣式
│
└── app/
    ├── app.ts                // 根元件
    ├── app.html              // 根元件模板
    ├── app.css               // 根元件樣式
    ├── app.routes.ts         // 路由設定
    ├── app.config.ts         // Angular 設定
    ├── app.spec.ts           // 根元件測試
    │
    ├── login-component/      // 登入元件
    │   ├── login-component.ts
    │   ├── login-component.html
    │   ├── login-component.css
    │   ├── login-component.spec.ts
    │
    ├── dashboard-component/  // 儀表板元件
    │   ├── dashboard-component.ts
    │   ├── dashboard-component.html
    │   ├── dashboard-component.css
    │   ├── dashboard-component.spec.ts
    │
    ├── record-add/           // 新增記錄元件
    │   ├── record-add.ts
    │   ├── record-add.html
    │   ├── record-add.css
    │   ├── record-add.spec.ts
    │
    ├── record-edit/          // 編輯記錄元件
    │   ├── record-edit.ts
    │   ├── record-edit.html
    │   ├── record-edit.css
    │   ├── record-edit.spec.ts
    │
    ├── record-list/          // 記錄列表元件
    │   ├── record-list.ts
    │   ├── record-list.html
    │   ├── record-list.css
    │   ├── record-list.spec.ts
    │
    ├── navigation/           // 導覽列元件
    │   ├── navigation.ts
    │   ├── navigation.html
    │   ├── navigation.css
    │   ├── navigation.spec.ts
    │
    ├── service/              // 服務層
    │   ├── login-sevice.ts
    │   ├── login-sevice.spec.ts
    │
    └── model/                // 資料模型
        └── record.dto.ts
```

---

## 各元件詳細功能與技術說明

### LoginComponent（登入元件）
- 使用 Reactive Forms 驗證帳號密碼
- 呼叫 LoginService 進行 API 登入，成功後導向 dashboard
- 使用 Signal API 管理登入狀態
- 單元測試：`login-component.spec.ts`

### DashboardComponent（儀表板元件）
- 顯示財務資料、收支圖表、趨勢分析
- 整合 Chart.js、ng2-charts、ngx-gauge
- 響應式設計
- 單元測試：`dashboard-component.spec.ts`

### RecordAdd / RecordEdit / RecordList（記錄管理元件）
- 新增、編輯、列表顯示財務記錄
- 表單驗證、API 整合、路由參數、資料模型（DTO）
- 單元測試：各自有 spec.ts

### Navigation（導覽列元件）
- 提供頁面切換（如登入、儀表板、記錄管理）
- 使用 RouterLink
- 響應式設計
- 單元測試：`navigation.spec.ts`

### Service（服務層）
- 負責登入 API 呼叫、狀態管理、路由跳轉
- 使用 RxJS 處理 HTTP 回應
- 使用 Signal API 管理登入狀態
- 單元測試：`login-sevice.spec.ts`

### Model（資料模型）
- 定義財務記錄資料結構（DTO）

---

## 全域功能與設計

- 路由管理：`app.routes.ts` 設定所有頁面路徑，預設導向登入或 dashboard
- 全域樣式：`styles.css` 控管背景漸層、主題色彩
- 元件化設計：每個功能獨立元件，易於維護與擴充
- 單元測試：每個元件與服務皆有對應的 spec 測試檔案
- 響應式設計：支援桌機與手機瀏覽

---

## 專案流程簡述

1. 使用者進入 `/login`，看到登入表單。
2. 登入成功後，導向 `/dashboard`，顯示財務資料與圖表。
3. 可透過導覽列切換至新增、編輯、列表等記錄管理頁面。
4. 所有資料操作皆透過 Service 與 API 溝通，並用 RxJS 處理非同步回應。
5. 狀態（如登入使用者）用 Signal API 管理，元件間可共用。

---

## 補充說明

> 本專案已移除星空動畫，專注於財務管理功能與資料視覺化。

---

## 後端 ASP.NET Core API 功能說明

- **技術**：ASP.NET Core、Session、Newtonsoft.Json
- **路徑**：`AngularApiController`（`/AngularApi`）

### 主要 API 功能

- **Session 模擬資料庫**：所有記錄資料皆存於 Session，無需實體資料庫。
- **Login**：`POST /AngularApi/Login`，帳號密碼驗證（預設 test/test）。
- **RecordAdd**：`POST /AngularApi/RecordAdd`，新增財務記錄。
- **Get_Records**：`GET /AngularApi/Get_Records`，取得所有記錄（包含 mock 與使用者 session）。
- **Update_Record**：`POST /AngularApi/Update_Record`，更新指定記錄。
- **Remove_record**：`POST /AngularApi/Remove_record`，刪除指定記錄。

### 資料模型

- **RecordDto**：財務記錄資料結構（id, userId, date, type, amount, categoryId, description, paymentMethod）
- **Login_Model**：登入資料結構（username, password）

### 設計重點

- 首次啟動自動初始化 mock 資料至 Session。
- 所有 CRUD 操作皆以 Session 為資料來源，模擬資料庫行為。
- 支援多使用者資料隔離（Session Key 依 userId 區分）。
- 回應皆為 JSON 格式，方便前端整合。

---

## 啟動方式

1. 前端：  
   - 安裝依賴：`npm install`
   - 啟動開發伺服器：`ng serve`
   - 於瀏覽器開啟 `http://localhost:4200`

2. 後端：  
   - 使用 Visual Studio 或 CLI 執行 ASP.NET Core 專案
   - 預設 API 路徑：`http://localhost:7276/AngularApi`

---

