/**
 * =========================================================================
 * 安和國小 EQ 志工官網 - 官方專屬 Google 試算表寫入 & Email 通知系統
 * =========================================================================
 * 試算表名稱：202609安和EQ芯志工報名表單
 * 雲端硬碟資料夾：https://drive.google.com/drive/folders/1C7r_vO6zPRu8SsVN2HrISaTwLU5Bd1Vn?usp=sharing
 * 通知信箱：eq.anhe@gmail.com
 * 
 * 特點：
 * 1. 【自動寫入試算表】：官網送出後自動入庫「202609安和EQ芯志工報名表單」。
 * 2. 【0 廣告官方 Email 通知】：自動發送 480px 精緻繁體中文通知信至 eq.anhe@gmail.com。
 * 3. 【雙模式支援】：
 *     - 模式 A（推薦）：作為獨立「網頁應用程式 (Web App)」，官網直連入庫發信。
 *     - 模式 B：作為 Google 表單連動的「提交觸發條件 (onFormSubmit)」。
 *
 * =========================================================================
 * 【3 分鐘設定步驟】：
 * 1. 請前往您的 Google 雲端硬碟資料夾：
 *    https://drive.google.com/drive/folders/1C7r_vO6zPRu8SsVN2HrISaTwLU5Bd1Vn?usp=sharing
 * 2. 點擊「+ 新增」->「Google 試算表」，將試算表檔名命名為：
 *    202609安和EQ芯志工報名表單
 * 3. 點擊頂部選單「擴充功能」->「Apps Script」。
 * 4. 將原本編輯器內的程式碼全部清空，貼上下方全部內容。
 * 5. 點擊上方的「💾 儲存」圖示。
 * 6. （可選）點擊上方函式選單選擇「setupSheetHeaders」，點「執行」，即可一鍵自動美化試算表表頭！
 * 7. 點擊右上角藍色「部署」按鈕 ->「新增部署」：
 *    - 種類選取：⚙️「網路應用程式 (Web App)」
 *    - 說明：安和EQ報名後端
 *    - 執行身分：我 (您的 Google 帳號)
 *    - 誰可以存取：所有人 (Anyone)  <-- 重要！這樣官網訪客才能送出
 *    - 點擊「部署」，並點選「授予存取權」完成授權。
 * 8. 複製產生的「網頁應用程式網址 (Web App URL)」並提供給我們或貼至官網 js/main.js 即可！
 * =========================================================================
 */

// 設定收件人信箱
var RECIPIENT_EMAIL = "eq.anhe@gmail.com";

/**
 * 網頁應用程式接收 POST 請求（官網直連模式）
 */
function doPost(e) {
  try {
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    var now = new Date();
    var timestamp = data.timestamp || Utilities.formatDate(now, "Asia/Taipei", "yyyy/MM/dd HH:mm:ss");
    var name = data.name || data['新夥伴姓名'] || data['entry.602205738'] || "未提供";
    var phone = data.phone || data['新夥伴手機'] || data['entry.1903577013'] || "未提供";
    var lineId = data.line || data.lineId || data['新夥伴Line ID'] || data['entry.1179144741'] || "（未提供）";
    var plan = data.plan || data.options || data['新夥伴參與項目'] || data['entry.1902119823'] || "方法一:輕度學習(擔任志工)";

    if (Array.isArray(plan)) {
      plan = plan.join('、');
    }

    // 1. 寫入 Google 試算表
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 若試算表為空，自動建立表頭
    if (sheet.getLastRow() === 0) {
      setupSheetHeaders();
    }

    sheet.appendRow([timestamp, name, phone, lineId, plan, "已登記"]);

    // 2. 發送通知 Email 至 eq.anhe@gmail.com
    sendEmailNotification(name, phone, lineId, plan, timestamp);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "報名成功！資料已寫入試算表並發送通知信件"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("doPost Error: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 網頁應用程式 GET 檢驗
 */
function doGet(e) {
  return ContentService.createTextOutput("【安和國小 EQ 志工報名系統】Google Apps Script 後端服務正常運作中！");
}

/**
 * Google 表單提交觸發（表單觸發模式）
 */
function onFormSubmit(e) {
  var values = e ? e.values : [];
  var timestamp = values[0] || Utilities.formatDate(new Date(), "Asia/Taipei", "yyyy/MM/dd HH:mm:ss");
  var name = values[1] || "未提供";
  var phone = values[2] || "未提供";
  var lineId = values[3] || "（未提供）";
  var plan = values[4] || "擔任志工";

  sendEmailNotification(name, phone, lineId, plan, timestamp);
}

/**
 * 發送官方 0 廣告精緻 HTML 格式通知郵件
 */
function sendEmailNotification(name, phone, lineId, plan, timestamp) {
  var subject = "【安和 EQ 志工官網】新報名通知：" + name + "（" + phone + "）";

  var htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #fed7aa; border-radius: 16px; background-color: #FAF8F5; color: #231F1D; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.08);">
      <div style="text-align: center; padding-bottom: 16px; border-bottom: 2px solid #d97706;">
        <span style="font-size: 28px;">🌟</span>
        <h2 style="margin: 8px 0 0 0; font-size: 20px; color: #d97706; font-weight: 700;">安和 EQ 芯志工 - 新報名通知</h2>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #8C827A;">202609 安和 EQ 芯志工招募計畫</p>
      </div>
      
      <div style="margin-top: 20px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 8px; font-weight: bold; color: #78350f; width: 120px;">家長姓名</td>
            <td style="padding: 12px 8px; color: #1e293b; font-weight: 600; font-size: 16px;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 8px; font-weight: bold; color: #78350f;">家長手機</td>
            <td style="padding: 12px 8px; color: #1e293b; font-weight: 600;"><a href="tel:${phone}" style="color: #d97706; text-decoration: none;">${phone}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 8px; font-weight: bold; color: #78350f;">LINE ID</td>
            <td style="padding: 12px 8px; color: #1e293b; font-weight: 600;">${lineId}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 8px; font-weight: bold; color: #78350f;">報名方案</td>
            <td style="padding: 12px 8px; color: #059669; font-weight: 700;">${plan}</td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; font-weight: bold; color: #78350f;">報名時間</td>
            <td style="padding: 12px 8px; color: #64748b; font-size: 14px;">${timestamp}</td>
          </tr>
        </table>
      </div>

      <div style="margin-top: 24px; padding-top: 14px; border-top: 1px dashed #cbd5e1; font-size: 12px; color: #94a3b8; text-align: center;">
        此信件由 <strong>安和國小 EQ 志工官方網站</strong> 自動發送<br>
        資料已即時寫入雲端硬碟試算表「202609安和EQ芯志工報名表單」
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: RECIPIENT_EMAIL,
    subject: subject,
    htmlBody: htmlBody
  });
}

/**
 * 一鍵自動建立並美化試算表表頭
 */
function setupSheetHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var headers = [
    ["報名時間", "家長姓名", "手機號碼", "LINE ID", "參與方案", "處理狀態"]
  ];
  
  sheet.getRange(1, 1, 1, 6).setValues(headers);
  
  // 樣式美化：琥珀橘底、白字、置中加粗
  var headerRange = sheet.getRange(1, 1, 1, 6);
  headerRange.setBackground("#D97706");
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 36);
  
  // 設定適當欄寬
  sheet.setColumnWidth(1, 170); // 報名時間
  sheet.setColumnWidth(2, 110); // 家長姓名
  sheet.setColumnWidth(3, 130); // 手機號碼
  sheet.setColumnWidth(4, 130); // LINE ID
  sheet.setColumnWidth(5, 260); // 參與方案
  sheet.setColumnWidth(6, 100); // 處理狀態
}
