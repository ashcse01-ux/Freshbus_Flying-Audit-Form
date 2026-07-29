/**
 * FreshBus Audit - MASTER BACKEND & BULK VALIDATION
 */

const ROOT_FOLDER = 'FreshBus_Audit_Media';
const SHEET_ID = "1IK7xEPOVJqZ7C6o5OLzNCzmikReQ9nXricotb7JE18M";

function doGet(e) {
  return ContentService.createTextOutput("FreshBus Audit Web App Backend is Live!");
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu('✅ Audit Admin')
    .addItem('Validate Selected Entry & Copy to Final Report', 'validateSelectedEntry')
    .addItem('📊 Generate Audit Presentation Deck (Final Report)', 'generateAuditPresentation')
    .addToUi();
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const pendingSheet = ss.getSheetByName('Pending_Audits') || ss.insertSheet('Pending_Audits');
    
    const res = payload.responses || {};
    const auditID = `${res.pnr || 'UN'}_${(res.service_route || 'Route').replace(/\s/g, '_')}`;

    // 1. SAVE UPLOADED FILES TO DRIVE
    const fileUrls = {};
    const root = getOrCreateFolder(ROOT_FOLDER);
    const auditFolder = getOrCreateSubFolder(root, auditID);

    if (payload.files) {
      for (let fieldId in payload.files) {
        const sectionName = payload.sectionMap ? payload.sectionMap[fieldId] : "General Uploads";
        const folder = getOrCreateSubFolder(auditFolder, sectionName);
        const files = payload.files[fieldId];
        const urls = [];
        files.forEach(f => {
          const blob = Utilities.newBlob(Utilities.base64Decode(f.base64), f.type, f.name);
          const file = folder.createFile(blob);
          urls.push(file.getUrl());
        });
        fileUrls[fieldId] = urls.join('\n');
      }
    }

    // 2. SAVE DATA TO SHEET
    const fullData = { 
      'Status': 'PENDING', 
      'Timestamp': new Date().toLocaleString(), 
      'PNR': res.pnr, 
      'Route': res.service_route, 
      'Audit_ID': auditID, 
      ...res, 
      ...fileUrls 
    };
    
    // Create Header if sheet is empty
    if (pendingSheet.getLastColumn() === 0) {
      const ids = Object.keys(fullData);
      pendingSheet.appendRow(ids);
      if (payload.headerMap) {
        pendingSheet.appendRow(ids.map(id => payload.headerMap[id] || id));
      } else {
        pendingSheet.appendRow(ids);
      }
      
      pendingSheet.hideRows(1);
      
      const headerRange = pendingSheet.getRange(2, 1, 1, ids.length);
      headerRange.setBackground('#0045AD')
                 .setFontColor('#FFFFFF')
                 .setFontWeight('bold')
                 .setWrap(true)
                 .setVerticalAlignment('middle')
                 .setHorizontalAlignment('center');
      
      pendingSheet.setRowHeight(2, 60);
      pendingSheet.setFrozenRows(2);
      pendingSheet.setFrozenColumns(5);
    }
    
    const headers = pendingSheet.getRange(1, 1, 1, pendingSheet.getLastColumn()).getValues()[0];
    const newRow = headers.map(id => fullData[id] !== undefined ? fullData[id] : "");
    pendingSheet.appendRow(newRow);
    
    return ContentService.createTextOutput("Success");
  } catch (err) {
    Logger.log("ERROR: " + err.toString());
    return ContentService.createTextOutput("Error: " + err.toString());
  }
}

/**
 * Validates and copies only the currently selected row entry to Final_Report tab,
 * updating its status in Pending_Audits to 'VALIDATED' (without deleting the row).
 */
function validateSelectedEntry() {
  const ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getActiveSheet();
  
  if (!sheet || sheet.getName() !== 'Pending_Audits') {
    SpreadsheetApp.getUi().alert('Please make sure you are viewing the "Pending_Audits" tab and click on an audit row to validate.');
    return;
  }

  const range = sheet.getActiveRange();
  const row = range ? range.getRow() : 0;
  
  if (row < 3) {
    SpreadsheetApp.getUi().alert('Please click on a valid audit entry row (row 3 or below) in Pending_Audits tab to validate.');
    return;
  }

  const finalSheet = ss.getSheetByName('Final_Report') || ss.insertSheet('Final_Report');
  
  // Set up Final_Report headers if empty
  if (finalSheet.getLastColumn() === 0) {
    const ids = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const labels = sheet.getRange(2, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    finalSheet.appendRow(ids);
    finalSheet.appendRow(labels);
    finalSheet.hideRows(1);
    
    const headerRange = finalSheet.getRange(2, 1, 1, ids.length);
    headerRange.setBackground('#2E7D32') // Success Green Header
               .setFontColor('#FFFFFF')
               .setFontWeight('bold')
               .setWrap(true)
               .setVerticalAlignment('middle')
               .setHorizontalAlignment('center');
               
    finalSheet.setRowHeight(2, 60);
    finalSheet.setFrozenRows(2);
    finalSheet.setFrozenColumns(5);
    
    for (let i = 1; i <= ids.length; i++) {
      finalSheet.setColumnWidth(i, sheet.getColumnWidth(i));
    }
  }

  const lastCol = sheet.getLastColumn();
  const rowData = sheet.getRange(row, 1, 1, lastCol).getValues()[0];

  if (rowData[0] === 'VALIDATED') {
    SpreadsheetApp.getUi().alert('This audit entry is ALREADY validated.');
    return;
  }

  // Update status to VALIDATED
  rowData[0] = 'VALIDATED';
  sheet.getRange(row, 1).setValue('VALIDATED');
  
  // Append to Final_Report
  finalSheet.appendRow(rowData);

  SpreadsheetApp.getUi().alert(`✅ Audit Entry (Row ${row}) successfully validated and copied to Final Report!`);
}

/**
 * Generates an executive-ready presentation deck for the currently selected audit row.
 */
function generateAuditPresentation() {
  const ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getActiveSheet();
  
  if (!sheet || sheet.getName() !== 'Final_Report') {
    SpreadsheetApp.getUi().alert('⚠️ Presentation Decks can ONLY be generated from validated entries in the "Final_Report" tab.\n\nPlease validate the entry first and switch to the "Final_Report" sheet.');
    return;
  }

  const range = sheet.getActiveRange();
  const row = range ? range.getRow() : 0;
  
  if (row < 3) {
    SpreadsheetApp.getUi().alert('Please click on a valid validated audit entry row (row 3 or below) in Final_Report tab to generate a presentation.');
    return;
  }

  const keys = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const labels = sheet.getRange(2, 1, 1, sheet.getLastColumn()).getValues()[0];
  const rowData = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  // Map row into key-value & label objects
  const audit = {};
  const labelMap = {};
  for (let i = 0; i < keys.length; i++) {
    audit[keys[i]] = rowData[i];
    labelMap[keys[i]] = labels[i] || keys[i];
  }

  const pnr = audit.pnr || audit.PNR || 'Audit';
  const route = audit.service_route || audit.Route || 'Route';
  const date = audit.Timestamp || new Date().toLocaleDateString();
  const headcount = audit.headcount || 'N/A';
  
  // Create Presentation
  const deckTitle = `FreshBus Flying Audit Report - PNR ${pnr} (${route})`;
  const pres = SlidesApp.create(deckTitle);
  const slides = pres.getSlides();
  let coverSlide = slides[0];

  // Remove default Google Slides template placeholders ("Click to add title" / "Click to add subtitle")
  coverSlide.getPageElements().forEach(el => el.remove());

  // -------------------------------------------------------------
  // SLIDE 1: COVER & EXECUTIVE DASHBOARD
  // -------------------------------------------------------------
  coverSlide.getBackground().setSolidFill('#0B192C'); // Dark Executive Navy
  
  // FreshBus Logo (top-left corner)
  try {
    // Correct file ID parsed from user's URL:
    // https://drive.google.com/file/d/1xptDoxHrnDgzzqtEt4-AdD7neovxgREX/view?usp=drive_link
    const logoFile = DriveApp.getFileById('1xptDoxHrnDgzzqtEt4-AdD7neovxgREX');
    const logoImg = coverSlide.insertImage(logoFile.getBlob());
    logoImg.setLeft(30).setTop(30).setWidth(80).setHeight(80);
  } catch (logoErr) {
    Logger.log('Logo embed skipped: ' + logoErr);
  }

  // Top Header Banner
  const titleBox = coverSlide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, 120, 30, 570, 100);
  titleBox.getFill().setSolidFill('#0045AD'); // Fresh Blue
  const titleTxt = titleBox.getText();
  titleTxt.setText("🚌 FRESHBUS FLYING AUDIT\nEXECUTIVE REPORT");
  titleTxt.getTextStyle().setFontFamily("Roboto").setFontSize(22).setBold(true).setForegroundColor("#FFFFFF");
  
  // Metadata Card Left
  const metaBox = coverSlide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, 30, 150, 420, 210);
  metaBox.getFill().setSolidFill("#1E293B");
  const metaTxt = metaBox.getText();
  metaTxt.setText(`📋 TRIP & SERVICE METADATA\n\n• PNR Number: ${pnr}\n• Service Route: ${route}\n• Audit Date & Time: ${date}\n• Total Passengers: ${headcount}`);
  metaTxt.getTextStyle().setFontFamily("Roboto").setFontSize(14).setForegroundColor("#F8FAFC");
  metaTxt.getParagraphs()[0].getRange().getTextStyle().setFontSize(16).setBold(true).setForegroundColor("#38BDF8");

  // Overall Score & Status Card Right
  const scoreBox = coverSlide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, 470, 150, 220, 210);
  scoreBox.getFill().setSolidFill("#059669"); // Emerald Green
  const scoreTxt = scoreBox.getText();
  scoreTxt.setText("AUDIT STATUS\n\n✅ VALIDATED\n\n⭐ EXECUTIVE GRADE");
  scoreTxt.getTextStyle().setFontFamily("Roboto").setFontSize(16).setBold(true).setForegroundColor("#FFFFFF");

  // -------------------------------------------------------------
  // SLIDE 2: EXECUTIVE SUMMARY OF HIGHLIGHTS & GAPS
  // -------------------------------------------------------------
  const slide2 = pres.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  slide2.getBackground().setSolidFill("#F8FAFC");
  
  const s2Header = slide2.insertShape(SlidesApp.ShapeType.RECTANGLE, 0, 0, 720, 50);
  s2Header.getFill().setSolidFill("#0045AD");
  s2Header.getText().setText("✨ Key Audit Highlights & Actionable Gaps").getTextStyle().setFontFamily("Roboto").setFontSize(18).setBold(true).setForegroundColor("#FFFFFF");

  let positiveNotes = [];
  let gapNotes = [];
  for (let k in audit) {
    if (k.endsWith('_good') && audit[k] && audit[k] !== 'N/A') positiveNotes.push(audit[k]);
    if (k.endsWith('_wrong') && audit[k] && audit[k] !== 'N/A') gapNotes.push(audit[k]);
  }

  // Positive Highlights Box
  const posBox = slide2.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, 30, 65, 320, 300);
  posBox.getFill().setSolidFill("#F0FDF4");
  posBox.getText().setText("💚 POSITIVE HIGHLIGHTS:\n\n" + (positiveNotes.length > 0 ? "• " + positiveNotes.slice(0, 5).join("\n• ") : "• Service met all standards cleanly.")).getTextStyle().setFontFamily("Roboto").setFontSize(12).setForegroundColor("#14532D");

  // Gaps & Improvements Box
  const gapBox = slide2.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, 370, 65, 320, 300);
  gapBox.getFill().setSolidFill("#FEF2F2");
  gapBox.getText().setText("⚠️ AREAS FOR IMPROVEMENT:\n\n" + (gapNotes.length > 0 ? "• " + gapNotes.slice(0, 5).join("\n• ") : "• No critical gaps reported.")).getTextStyle().setFontFamily("Roboto").setFontSize(12).setForegroundColor("#7F1D1D");

  // -------------------------------------------------------------
  // SLIDES 3-6: DETAILED SECTION-BY-SECTION CARD BREAKDOWN
  // -------------------------------------------------------------
  const sectionsList = [
    { id: 2, name: "Staff Behaviour & Professionalism" },
    { id: 3, name: "Pickup Responsibilities" },
    { id: 4, name: "Bus Cleanliness & Maintenance" },
    { id: 5, name: "Driving & Technical Safety" },
    { id: 6, name: "Food & Pitstop Audit" },
    { id: 7, name: "Announcements" },
    { id: 8, name: "Pilferage Check" },
    { id: 9, name: "Delay Adherence" },
    { id: 10, name: "Safety & Security" },
    { id: 11, name: "Drop Responsibilities" }
  ];

  // Group sections 3 per slide
  for (let i = 0; i < sectionsList.length; i += 3) {
    const chunk = sectionsList.slice(i, i + 3);
    const secSlide = pres.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    secSlide.getBackground().setSolidFill("#F1F5F9");

    const header = secSlide.insertShape(SlidesApp.ShapeType.RECTANGLE, 0, 0, 720, 45);
    header.getFill().setSolidFill("#0F172A");
    header.getText().setText(`📊 Detailed Audit Findings (Part ${Math.floor(i/3)+1})`).getTextStyle().setFontFamily("Roboto").setFontSize(16).setBold(true).setForegroundColor("#FFFFFF");

    let cardY = 55;
    chunk.forEach(sec => {
      const card = secSlide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, 30, cardY, 660, 95);
      card.getFill().setSolidFill("#FFFFFF");

      const goodVal = audit[`s${sec.id}_good`] || "Satisfactory";
      const wrongVal = audit[`s${sec.id}_wrong`] || "No issues reported";

      const cardTxt = card.getText();
      cardTxt.setText(`SECTION ${sec.id}: ${sec.name.toUpperCase()}\n• Positive: ${goodVal}\n• Gap/Feedback: ${wrongVal}`);
      cardTxt.getTextStyle().setFontFamily("Roboto").setFontSize(11).setForegroundColor("#334155");
      cardTxt.getParagraphs()[0].getRange().getTextStyle().setFontSize(13).setBold(true).setForegroundColor("#0045AD");

      cardY += 105;
    });
  }

  // -------------------------------------------------------------
  // SLIDE 7+: MEDIA & VISUAL EVIDENCE GALLERY
  // -------------------------------------------------------------
  const mediaItems = [];
  for (let k in audit) {
    const val = audit[k];
    if (!val) continue;
    const valStr = String(val);
    // Match _media fields OR any cell that contains a Google Drive file URL
    if (k.endsWith('_media') || valStr.includes('drive.google.com/file/d/')) {
      const urls = valStr.split('\n');
      urls.forEach(u => {
        u = u.trim();
        if (u.startsWith('http')) {
          mediaItems.push({ field: k, url: u });
        }
      });
    }
  }

  if (mediaItems.length > 0) {
    // Break media items into slides of 4 items each
    for (let m = 0; m < mediaItems.length; m += 4) {
      const mediaChunk = mediaItems.slice(m, m + 4);
      const mediaSlide = pres.appendSlide(SlidesApp.PredefinedLayout.BLANK);
      mediaSlide.getBackground().setSolidFill("#0F172A");

      const mHeader = mediaSlide.insertShape(SlidesApp.ShapeType.RECTANGLE, 0, 0, 720, 45);
      mHeader.getFill().setSolidFill("#0045AD");
      mHeader.getText().setText(`📸 Audit Media Evidence Gallery (Page ${Math.floor(m/4)+1})`).getTextStyle().setFontFamily("Roboto").setFontSize(16).setBold(true).setForegroundColor("#FFFFFF");

      let x = 30, y = 60, col = 0;
      mediaChunk.forEach((item, idx) => {
        try {
          // Extract Google Drive file ID from URLs like:
          // https://drive.google.com/file/d/FILE_ID/view
          // https://drive.google.com/open?id=FILE_ID
          let fileId = null;
          const dMatch = item.url.match(/\/d\/([a-zA-Z0-9_-]+)/);
          const idMatch = item.url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
          if (dMatch) fileId = dMatch[1];
          else if (idMatch) fileId = idMatch[1];

          if (fileId) {
            const file = DriveApp.getFileById(fileId);
            const mime = file.getMimeType();

            if (mime.startsWith('image/')) {
              // Embed actual photo image
              const img = mediaSlide.insertImage(file.getBlob());
              img.setLeft(x).setTop(y).setWidth(320).setHeight(170);
            } else {
              // Video / Audio preview card with hyperlink
              const vBox = mediaSlide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, x, y, 320, 170);
              vBox.getFill().setSolidFill("#1E293B");
              const vTxt = vBox.getText();
              vTxt.setText(`🎬 VIDEO / AUDIO EVIDENCE\n\nAttachment ${m + idx + 1}\nType: ${mime}\n\n👉 Click to Play in Google Drive`);
              vTxt.getTextStyle().setFontFamily("Roboto").setFontSize(12).setForegroundColor("#E2E8F0");
              vTxt.getParagraphs()[0].getRange().getTextStyle().setBold(true).setForegroundColor("#38BDF8");
              vBox.setLinkUrl(item.url);
            }
          }
        } catch (err) {
          Logger.log("Media embed error for " + item.url + ": " + err);
          // Fallback card if Drive file access restriction occurs
          const fBox = mediaSlide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, x, y, 320, 170);
          fBox.getFill().setSolidFill("#1E293B");
          const fTxt = fBox.getText();
          fTxt.setText(`📎 AUDIT ATTACHMENT ${m + idx + 1}\n\n👉 Click to open file in Drive`);
          fTxt.getTextStyle().setFontFamily("Roboto").setFontSize(12).setForegroundColor("#38BDF8");
          fBox.setLinkUrl(item.url);
        }

        col++;
        if (col % 2 === 0) { x = 30; y += 185; } else { x = 370; }
      });
    }
  }

  // Finalize
  pres.saveAndClose();
  const presUrl = pres.getUrl();
  
  // Render a clean modal window with clickable hyperlink
  const htmlOutput = HtmlService
    .createHtmlOutput(`
      <div style="font-family: Arial, sans-serif; padding: 15px; text-align: center;">
        <h3 style="color: #2E7D32; margin-top: 0;">✅ Complete Audit Presentation Deck Generated!</h3>
        <p style="font-size: 14px; color: #555;">Your executive presentation is ready for access.</p>
        <a href="${presUrl}" target="_blank" style="display: inline-block; background-color: #0045AD; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px;">👉 Open Presentation Deck</a>
      </div>
    `)
    .setWidth(450)
    .setHeight(180);
    
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Audit Presentation Complete');
}

function getOrCreateFolder(n) { const f = DriveApp.getFoldersByName(n); return f.hasNext() ? f.next() : DriveApp.createFolder(n); }
function getOrCreateSubFolder(p, n) { const f = p.getFoldersByName(n); return f.hasNext() ? f.next() : p.createFolder(n); }


