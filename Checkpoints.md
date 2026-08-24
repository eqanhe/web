# 🔖 安和國小 EQ 志工官方網站 - Checkpoints 版本歷程記錄表

本檔案記錄「安和國小 EQ 志工官方網站」之所有快照檢查點（Checkpoints）、功能迭代、重大架構決策與規則異動歷程。

---

## 📌 Checkpoint 快照紀錄總覽

### 🏆 [v2.00] 【穩定版 Stable】 - 安和國小 EQ 志工官方網站 全功能成熟穩定里程碑
- **快照時間**：2026-08-24
- **Git 標籤**：`v2.00`
- **主要倉庫**：https://github.com/eqanhe/web.git
- **線上網址**：https://eqanhe.github.io/web/
- **核心功能成熟度與里程碑成果**：
  1. **全站安和專屬在地化與暖白象牙風格 (Warm Cream & Ivory Theme)**：
     - 採用溫潤護眼暖白色調（`#FAF8F5` / `#F3EFEA`）、暖金琥珀色（`#D97706`）與深焙暖炭棕黑（`#231F1D`），視覺高雅溫馨。
     - 整合安和國小官方資訊與芯福里情緒教育協會雙機構連結。
  2. **原生二選一動態報名表單與雙向保證金聯動**：
     - 輕度學習（擔任志工）與認真學習（擔任志工+線上學習）單選互斥切換，動態展開詳細費用與退費機制說明。
     - 極簡提交成功狀態切換，無任何冗餘外跳。
  3. **正式整合 Google 雲端硬碟試算表與 0 廣告 Gmail 官方通知**：
     - 直連正式 Google Apps Script Web App 端點（`https://script.google.com/macros/s/AKfycbzkVuWjDWV0m2FKI8kugiFTvTx0pAVisMv710IA_d90IQ-ipY22DzFayLMKtj4FIe1DlA/exec`）。
     - 自動入庫 Google 試算表 `202609安和EQ芯志工報名表單`。
     - 透過 Google 官方 Gmail 伺服器發送 480px 精緻繁體中文通知信件至 `eq.anhe@gmail.com`。
  4. **LINE 諮詢全面直連群組與極速逃脫機制**：
     - CTA 諮詢卡片與右下角懸浮按鈕直跳 `https://line.me/ti/g/CSZd4uc4K-`。
     - 內建 `openExternalBrowser=1` LINE 內嵌瀏覽器極速外跳與導引彈窗。
  5. **全站防快取標籤（`?v=2.00`）與 100% 雙目錄同步**：
     - 專案根目錄與 `web/` 目錄已完成 100% 同步發布。

---

### 🌟 [v1.04] - 正式整合上線 Google Apps Script Web App 網址，實現試算表自動寫入與 Email 直發
- **快照時間**：2026-08-24
- **Git 標籤**：`v1.04`
- **主要倉庫**：https://github.com/eqanhe/web.git
- **線上網址**：https://eqanhe.github.io/web/
- **核心更新內容**：
  1. **正式綁定 Google Apps Script Web App Endpoint**：
     - Web App URL: `https://script.google.com/macros/s/AKfycbzkVuWjDWV0m2FKI8kugiFTvTx0pAVisMv710IA_d90IQ-ipY22DzFayLMKtj4FIe1DlA/exec`
     - 報名資料送出時直送該端點，自動入庫 `202609安和EQ芯志工報名表單` 試算表。
     - Google 官方 Gmail 同步發送 0 廣告精緻通知信至 `eq.anhe@gmail.com`。
  2. **靜態快取破除更新**：
     - CSS 與 JS 靜態資源引用標籤版本升級為 `?v=1.04`。
  3. **100% 雙目錄同步**：
     - 根目錄與 `web/` 目錄已完成 100% 同步。

---

### 🌟 [v1.03] - 升級 Google Apps Script 試算表自動入庫與 eq.anhe@gmail.com 官方直發系統
- **快照時間**：2026-08-24
- **Git 標籤**：`v1.03`
- **主要倉庫**：https://github.com/eqanhe/web.git
- **線上網址**：https://eqanhe.github.io/web/
- **核心更新內容**：
  1. **Google 雲端硬碟試算表入庫對接 (`202609安和EQ芯志工報名表單`)**：
     - 目標資料夾：`https://drive.google.com/drive/folders/1C7r_vO6zPRu8SsVN2HrISaTwLU5Bd1Vn?usp=sharing`
     - 升級 `google_apps_script_notification.js`：包含 `doPost`、`setupSheetHeaders`、`sendEmailNotification`，自動建立表頭並寫入報名資料（報名時間、家長姓名、手機號碼、LINE ID、參與方案、處理狀態）。
  2. **官方 0 廣告 Email 專屬通知 (`eq.anhe@gmail.com`)**：
     - 自動寄送繁體中文 480px 精緻信件，信件主旨：`【安和 EQ 志工官網】新報名通知：[姓名]（[手機]）`。
  3. **前端 main.js 提交架構雙軌升級**：
     - 支援 Web App URL 直連與 Google Form / FormSubmit 雙備援。
  4. **100% 雙目錄同步**：
     - 根目錄與 `web/` 目錄已完成 100% 同步。

---

### 🌟 [v1.02] - CTA 與底端列文案精準統一為「加 Line 諮詢」並直接超連結
- **快照時間**：2026-08-24
- **Git 標籤**：`v1.02`
- **主要倉庫**：https://github.com/eqanhe/web.git
- **線上網址**：https://eqanhe.github.io/web/
- **核心更新內容**：
  1. **CTA 區塊「懂孩子」結尾卡片**：
     - 文案改為 **`加 Line 諮詢`**。
     - 取消點擊複製機制，改為直接超連結至 `https://line.me/ti/g/CSZd4uc4K-`。
  2. **底端懸浮列**：
     - 文案改為 **`加 Line 諮詢`**。
     - 取消複製與 Toast 提示，改為直接超連結至 `https://line.me/ti/g/CSZd4uc4K-`。
  3. **靜態資源防快取標籤更新**：
     - 靜態標籤進位至 `?v=1.02`。
  4. **100% 雙目錄同步**：
     - 專案根目錄與 `web/` 目錄已完成 100% 同步。

---

### 🌟 [v1.01] - 更新招募諮詢 LINE 連結為專屬群組網址 (https://line.me/ti/g/CSZd4uc4K-)
- **快照時間**：2026-08-24
- **Git 標籤**：`v1.01`
- **主要倉庫**：https://github.com/eqanhe/web.git
- **線上網址**：https://eqanhe.github.io/web/
- **核心更新內容**：
  1. **LINE 諮詢全面改為直跳群組網址**：
     - CTA 諮詢卡片更新為「💬 招募諮詢 LINE 群組：點擊直接加入」，點擊直跳 `https://line.me/ti/g/CSZd4uc4K-`。
     - 右下角懸浮按鈕更新為「加 Line 群組諮詢」，點擊直跳 `https://line.me/ti/g/CSZd4uc4K-`。
     - 移除複製個人 ID 機制，改為 100% 直覺一鍵入群。
  2. **靜態資源快取破除更新**：
     - CSS/JS 標籤版本進位至 `?v=1.01`。
  3. **100% 雙目錄同步**：
     - 已將最新變更同步至 `web/` 目錄。

---

### 🚀 [v1.00] 【正式里程碑初版】 - 安和國小 EQ 志工官方網站 暖白風格初版建置完成
- **快照時間**：2026-08-24
- **Git 標籤**：`v1.00`
- **主要倉庫**：https://github.com/eqanhe/web.git
- **線上網址**：https://eqanhe.github.io/web/
- **核心更新內容**：
  1. **全站文字與單位名稱全面在地化 (安和專屬)**：
     - 將所有「樂利」相關文字全面替換為「安和」（含標頭 Logo、Hero Slogan、頁尾學校官方連結、Meta 標籤、結構化資料 Schema JSON-LD）。
     - 頁尾更新為「新北市安和國小官網」（`https://www.anhoes.ntpc.edu.tw/`）與「芯福里情緒教育推廣協會」。
  2. **全新「暖白象牙溫潤」視覺風格 (Warm Cream / Ivory White)**：
     - 告別純黑深色底與刺眼過亮白底，採用護眼舒適、溫馨親和的象牙燕麥暖白色系（`#FAF8F5` / `#F3EFEA`）。
     - 搭配暖金琥珀色（`#D97706`）與舒心翡翠綠（`#059669`），字體採用深焙暖炭棕黑（`#231F1D`），視覺溫潤柔和、質感高級。
  3. **雙軌 Email 即時通知系統升級**：
     - 表單提交目標通知信箱全面設定為 **`eq.anhe@gmail.com`**。
     - 信件主旨統一規範為：`【安和 EQ 志工官網】新報名通知：[姓名]（[手機]）`。
     - 提供專屬 Google Apps Script 官方直發腳本（`google_apps_script_notification.js`），實現 0 廣告、精緻表格即時通知。
  4. **全套 LINE 逃脫與零快取機制 (Line Escape & Cache Busting)**：
     - HTML `<head>` 頂部注入 `openExternalBrowser=1` 極速逃脫腳本與 HTTP 防快取標頭。
     - 內建符合暖白主題的全平台跳轉導引彈窗（`#lineGuideModal`）。
     - 全站靜態資源附帶版本標籤破除快取（`?v=1.00`）。
  5. **100% 雙目錄同步與 Git 獨立倉庫綁定**：
     - 專案根目錄與 `web/` 目錄 100% 同步。
     - 建立獨立 Git 倉庫並配置遠端倉庫 `https://github.com/eqanhe/web.git`。
