# 🔖 安和國小 EQ 志工官方網站 - Checkpoints 版本歷程記錄表

本檔案記錄「安和國小 EQ 志工官方網站」之所有快照檢查點（Checkpoints）、功能迭代、重大架構決策與規則異動歷程。

---

## 📌 Checkpoint 快照紀錄總覽

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
