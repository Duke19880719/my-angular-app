Angular 在 IIS 架站心得

在將 Angular 應用部署到 IIS（Internet Information Services）伺服器時，需要正確配置構建命令、IIS 設定以及相關檔案（如 web.config）。以下是我在部署過程中的心得與步驟，包含關鍵配置、注意事項及問題排查建議。

1. 構建 Angular 專案
為了將 Angular 專案部署到 IIS，首先需要使用 Angular CLI 構建生產環境的靜態檔案。以下是我的構建命令：
bashng build -c production --output-path C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app\browser --base-href /

命令說明：

-c production：指定生產環境配置，啟用優化（如 AOT 編譯、程式碼最小化、Tree-shaking 等）。這取代了舊版的 --prod 旗標（Angular 15 及以上已棄用）。
--output-path C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app\browser：指定構建輸出路徑，靜態檔案（index.html、JavaScript、CSS 等）將生成在 C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app\browser。
--base-href /：設置應用基礎路徑為根路徑 (/)，表示應用將部署在 http://your-domain/（例如 http://localhost:666/）。這確保 Angular 的路由和資源載入正確解析。
補充說明：

如果應用部署在子路徑（例如 http://localhost:666/my-angular-app/），應設置 --base-href /my-angular-app/。
執行構建後，檢查 index.html 中的 <base href="/"> 是否與 --base-href 一致。



注意事項：

確保輸出路徑的父資料夾（C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app）存在，否則需手動建立。
如果專案使用 Angular Universal（伺服器端渲染），輸出會包含 browser 和 server 資料夾，客戶端檔案位於 browser 資料夾。


2. 配置 IIS
在 IIS 中部署 Angular 應用需要正確設置網站或應用程式的物理路徑、虛擬路徑及權限。
IIS 配置步驟：

設置網站或應用程式：

開啟 IIS 管理員（執行 inetmgr）。
獨立網站：

右鍵「網站」 > 「新增網站」。
網站名稱：例如 my-angular-app。
物理路徑：C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app\browser。
繫結：設置為 http://localhost:666（或你的主機名稱和埠）。


子應用程式（如果部署在子路徑）：

右鍵「Default Web Site」 > 「新增應用程式」。
別名：my-angular-app（使應用在 http://localhost:666/my-angular-app/ 運行）。
物理路徑：C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app\browser。


補充說明：物理路徑必須指向包含 index.html 的資料夾（在此為 browser 資料夾）。若無 browser 資料夾（非 Universal 專案），則指向 C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app。


應用程式集區：

選擇網站的應用程式集區（預設為 DefaultAppPool）。
設置為「無受控碼」（No Managed Code），因為 Angular 是靜態檔案應用，無需 .NET 執行環境。
補充說明：這可減少不必要的 .NET 處理，提升性能。


設置權限：

右鍵 C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app\browser > 「屬性」 > 「安全性」。
確保 IIS_IUSRS 帳戶有「讀取和執行」權限。
補充說明：由於你的資料夾位於桌面，可能需額外授予「Everyone」或你的使用者帳戶權限，特別是在非標準路徑（如非 C:\inetpub\wwwroot）時。


確認 URL Rewrite 模組：

IIS 必須安裝 URL Rewrite 模組，以支援 Angular 的 HTML5 路由（無 # 的 URL）。
檢查方法：在 IIS 管理員中選擇網站，確認是否有「URL Rewrite」圖示。
若未安裝，從 微軟官網 下載並安裝。




3. 建立 web.config
為了讓 Angular 的單頁應用（SPA）路由正常工作，需在 IIS 中配置 URL 重寫規則，確保所有非檔案或非目錄的請求都重定向到 index.html。
建立方式：

開啟 Windows 記事本。
貼上以下內容（你的原始 web.config 已優化）：
xml<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="Angular Routes" stopProcessing="true">
                    <match url=".*" />
                    <conditions logicalGrouping="MatchAll">
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                        <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
                    </conditions>
                    <action type="Rewrite" url="/index.html" />
                </rule>
            </rules>
        </rewrite>
        <staticContent>
            <!-- MIME 類型根據需要添加，預設情況下 .js 和 .css 已由 IIS 支援 -->
            <mimeMap fileExtension=".woff" mimeType="application/font-woff" />
            <mimeMap fileExtension=".woff2" mimeType="application/font-woff2" />
        </staticContent>
    </system.webServer>
</configuration>

儲存檔案：

檔案名稱："web.config"（使用雙引號避免儲存為 .txt）。
儲存類型：選擇「所有檔案 (.)」。
編碼：選擇「UTF-8」。
儲存位置：C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app\browser（與 index.html 同層）。



web.config 說明：

<rewrite>：確保 Angular 的 HTML5 路由正常工作，將非檔案、非目錄的請求重定向到 /index.html。
<action type="Rewrite" url="/index.html" />：與 <base href="/"> 一致，表示應用部署在根路徑 (http://localhost:666/)。

補充說明：若應用部署在子路徑（例如 /my-angular-app/），則改為 <action type="Rewrite" url="/my-angular-app/index.html" />。


<staticContent>：

你的原始配置已註解掉 .js 和 .css 的 MIME 類型，這是正確的，因為 IIS 預設支援 application/javascript 和 text/css。
僅保留 .woff 和 .woff2 的 MIME 類型，支援字型檔案。
補充說明：若遇到 MIME 類型衝突（如之前的 500.19 錯誤），可添加 <remove fileExtension=".woff" /> 和 <remove fileExtension=".woff2" /> 清除預設定義。




4. 測試與問題排查
部署完成後，進行以下測試：

訪問網站：

訪問 http://localhost:666/（若 <base href="/">）。
或 http://localhost:666/my-angular-app/（若 <base href="/my-angular-app/">）。
測試子路由（例如 /about），確保不報 404 錯誤。


檢查資源載入：

開啟瀏覽器開發者工具（F12） > 「網路」標籤。
確認資源（如 polyfills-xxx.js、main-xxx.js、styles-xxx.css）是否從正確路徑載入（例如 http://localhost:666/polyfills-xxx.js）。


常見問題與解決方案：

資源 404 錯誤：

確認 C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app\browser 包含所有資源檔案。
檢查 <base href> 是否與 IIS 虛擬路徑一致。
測試直接訪問資源（例如 http://localhost:666/polyfills-xxx.js）。


子路由 404 錯誤：

確認 IIS 已安裝 URL Rewrite 模組。
檢查 web.config 的 <action> URL 是否正確。


權限問題（403 錯誤）：

確保 IIS_IUSRS 對 browser 資料夾有讀取權限。


MIME 類型衝突（500.19 錯誤）：

若再次出現，移除衝突的 <mimeMap> 或添加 <remove> 標籤。






5. 重點整理

構建命令：使用 ng build -c production --output-path [路徑] --base-href / 產生靜態檔案，--output-path 指定輸出位置，--base-href 需與 IIS 虛擬路徑一致。
IIS 配置：

物理路徑指向 browser 資料夾（若使用 Angular Universal）。
應用程式集區設為「無受控碼」。
確保 IIS_IUSRS 有讀取權限。
安裝 URL Rewrite 模組以支援 Angular 路由。


web.config：

放置在與 index.html 同層（browser 資料夾）。
配置 URL 重寫規則，確保子路由正確導向 index.html。
謹慎添加 MIME 類型，避免與 IIS 全局配置衝突。


靈活部署：輸出路徑不限於 C:\inetpub\wwwroot，可使用任意位置（如桌面），只要 IIS 能存取。


6. 補充說明

關於 browser 資料夾：

如果你的專案使用 Angular Universal，browser 資料夾是正常的，包含客戶端渲染檔案。
若不需要伺服器端渲染，可調整構建命令，輸出到 C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app（無 browser 資料夾）：
bashng build -c production --output-path C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app --base-href /

相應更新 IIS 物理路徑和 web.config。


為什麼選擇根路徑 (/)？：

你的 --base-href / 和 <action type="Rewrite" url="/index.html" /> 表示應用部署在根路徑（http://localhost:666/）。
若需部署在子路徑（如 /my-angular-app/），需同步更新構建命令、<base href> 和 web.config。