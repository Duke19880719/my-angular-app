Angular 在 IIS 架站心得
在將 Angular 應用部署到 IIS（Internet Information Services）伺服器時，需正確配置構建命令、IIS 設定和 web.config 檔案。以下是我在部署過程中的心得，涵蓋關鍵步驟、常見問題（如雙重 browser 資料夾）及解決方案，旨在幫助開發者順利完成部署。
1. 構建 Angular 專案
為生成生產環境的靜態檔案，使用以下 Angular CLI 命令：
ng build -c production --output-path "C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app" --base-href /

命令說明：

-c production：啟用生產環境配置（AOT 編譯、程式碼最小化、Tree-shaking 等），取代舊版的 --prod（Angular 15+ 已棄用）。
--output-path "C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app"：
指定輸出基底目錄，CLI 會自動在其中生成 browser（客戶端檔案）和 server（伺服器端渲染檔案，若啟用 SSR）子資料夾。
重要：不要指定 .../my-angular-app\browser，否則 CLI 會在 browser 下再生成一個 browser 子資料夾（例如 .../my-angular-app\browser\browser），導致檔案結構混亂和 404 錯誤。
使用雙引號避免 Windows 路徑解析問題。


--base-href /：設置應用基礎路徑為根路徑 (http://localhost:666/)，確保路由和資源正確解析。
子路徑部署：若應用部署在子路徑（如 http://localhost:666/my-angular-app/），使用：ng build -c production --output-path "C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app" --base-href /my-angular-app/



注意事項：

輸出結構：
執行後，靜態檔案（如 index.html、JS、CSS）生成在 C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app\browser。
若啟用 SSR，另有 server 資料夾。


檢查 index.html：確認 <base href="/">（或 /my-angular-app/）與 --base-href 一致。
避免雙重 browser：
若誤用 --output-path "C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app\browser"，會導致檔案輸出到 .../browser\browser，IIS 找不到檔案。
修正：始終指定父目錄（.../my-angular-app）。


確保父資料夾存在：CLI 會自動建立 my-angular-app 和 browser，但 TEST_ANGULAR 需預先存在。

2. 配置 IIS
在 IIS 中部署 Angular 應用需要正確設置網站或應用程式的物理路徑、虛擬路徑及權限。
步驟：

新增網站或應用程式：

開啟 IIS 管理員（執行 inetmgr）。
獨立網站：
右鍵「網站」 > 「新增網站」。
網站名稱：my-angular-app。
物理路徑：C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app\browser。
繫結：http://localhost:666（或自訂主機名稱和埠）。


子應用程式（若部署在子路徑）：
右鍵「Default Web Site」 > 「新增應用程式」。
別名：my-angular-app（使應用在 http://localhost:666/my-angular-app/ 運行）。
物理路徑：C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app\browser.




應用程式集區：

選擇網站的應用程式集區（預設為 DefaultAppPool）。
設置為「無受控碼」（No Managed Code），因為 Angular 是靜態檔案應用，無需 .NET 執行環境。


設置權限：

右鍵 C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app\browser > 「屬性」 > 「安全性」。
授予 IIS_IUSRS「讀取和執行」權限。
補充：桌面路徑可能需額外授予「Everyone」權限（測試用），因為非標準路徑（如非 C:\inetpub\wwwroot）可能有權限限制。


安裝 URL Rewrite 模組：

確保 IIS 已安裝 URL Rewrite 模組，以支援 Angular 的 HTML5 路由（無 # 的 URL）。
檢查方法：在 IIS 管理員中選擇網站，確認是否有「URL Rewrite」圖示。
若未安裝，從 微軟官網 下載並安裝。



注意事項：

物理路徑必須指向包含 index.html 的資料夾（通常為 browser，若使用 Angular Universal）。
若無 browser 資料夾（非 Universal 專案），指向 C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app。

3. 建立 web.config
為支援 Angular 的單頁應用（SPA）路由，需配置 URL 重寫規則，將非檔案、非目錄的請求重定向到 index.html。
內容：
<?xml version="1.0" encoding="UTF-8"?>
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
            <remove fileExtension=".woff" />
            <remove fileExtension=".woff2" />
            <mimeMap fileExtension=".woff" mimeType="application/font-woff" />
            <mimeMap fileExtension=".woff2" mimeType="application/font-woff2" />
        </staticContent>
    </system.webServer>
</configuration>

建立方式：

開啟 Windows 記事本，貼上以上內容。
儲存為 "web.config"（雙引號避免 .txt 副檔名）。
儲存類型：「所有檔案 (.)」。
編碼：UTF-8。
放置在 C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app\browser（與 index.html 同層）。

說明：

<rewrite>：將非檔案、非目錄的請求（如子路由 /about）重定向到 /index.html，支援 Angular 的 HTML5 路由。
<action type="Rewrite" url="/index.html" />：與 <base href="/"> 一致，適用根路徑部署。若部署在子路徑（如 /my-angular-app/），改為：<action type="Rewrite" url="/my-angular-app/index.html" />


<staticContent>：
僅定義 .woff 和 .woff2 的 MIME 類型（字型檔案）。
使用 <remove> 避免與 IIS 全局配置衝突（如 500.19 錯誤）。
.js（application/javascript）和 .css（text/css）由 IIS 預設支持，無需定義。



4. 測試與問題排查
測試：

訪問 http://localhost:666/（根路徑部署）。
或 http://localhost:666/my-angular-app/（子路徑部署）。
測試子路由（如 /about），確保不報 404 錯誤。
開啟瀏覽器開發者工具（F12） > 「網路」，確認資源（如 polyfills-[hash].js）從 http://localhost:666/[檔案名] 載入。

常見問題與解決：

雙重 browser 資料夾：
原因：誤用 --output-path .../browser，導致 CLI 在 browser 下生成另一個 browser。
解決：使用 --output-path "C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app"，讓 CLI 自動生成 .../my-angular-app\browser。
替代方案：修改 angular.json 的 outputPath："outputPath": {
  "base": "C:/Users/阿瑋/Desktop/TEST_ANGULAR/my-angular-app",
  "browser": "."  // 直接輸出到基底目錄
}




資源 404 錯誤：
確認 .../my-angular-app\browser 包含 index.html、JS、CSS。
檢查 <base href> 和 IIS 虛擬路徑一致。
測試直接訪問資源（如 http://localhost:666/polyfills-[hash].js）。


子路由 404 錯誤：
確認 URL Rewrite 模組已安裝。
檢查 web.config 的 <action> URL。


權限問題（403 錯誤）：
確保 IIS_IUSRS 對 .../my-angular-app\browser 有讀取權限。


MIME 衝突（500.19 錯誤）：
使用 <remove> 清除衝突的 MIME 類型。



5. 關於 browser 資料夾

原因：Angular 17+ 的 @angular/build:application builder 預設生成 browser 子資料夾，特別在啟用 SSR（Angular Universal）時。
確認是否需要 SSR：
檢查 package.json 的 scripts（如 build:ssr 或 ng run my-angular-app:server）。
若無需 SSR，可修改 angular.json 的 outputPath.browser 為 "."，直接輸出到基底目錄：ng build -c production --output-path "C:\Users\阿瑋\Desktop\TEST_ANGULAR\my-angular-app" --base-href /


更新 IIS 物理路徑為 .../my-angular-app。




建議：保留 browser 資料夾（使用 --output-path .../my-angular-app），因為這是 CLI 標準行為，簡單且一致。

6. 最佳實務

避免桌面路徑：建議使用非桌面路徑（如 D:\web\my-angular-app），減少權限問題。
檢查日誌：查看 C:\inetpub\logs\LogFiles 的 IIS 日誌，排查錯誤。
子路徑部署：若使用子路徑，同步更新 --base-href、<base href> 和 web.config。
備份配置：保存 angular.json 和 web.config 的版本，避免誤改。
測試資源：用 F12 檢查資源載入路徑，確保無 404。

7. 結語
正確設置 --output-path 和 IIS 配置是部署成功的關鍵。希望這份心得能幫助其他開發者避免類似問題，順利在 IIS 上部署 Angular 應用！