/**
 * FreshBus Audit - MASTER BACKEND & BULK VALIDATION
 */

const ROOT_FOLDER = 'FreshBus_Audit_Media';
const SHEET_ID = "1IK7xEPOVJqZ7C6o5OLzNCzmikReQ9nXricotb7JE18M";

// -------------------------------------------------------------
// CONFIGURATION
// -------------------------------------------------------------
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // Get from aistudio.google.com
const LOGO_DRIVE_ID = "16Cn2l_koZXUCgdYMO2vLeucRgePpb-7w"; // The FreshBus Logo Drive ID

// -------------------------------------------------------------
// GAP STATEMENTS MAPPING (For Ratings <= 3)
// -------------------------------------------------------------
const NEGATIVE_STATEMENTS_MAP = {
  // Section 2: Staff Behaviour & Professionalism
  "s2_q1": "Unprofessional pre-journey communication",
  "s2_u1": "Uniform non-compliance",
  "s2_u3": "Poor grooming standards",
  "s2_c1": "Tobacco/Gum consumption by staff",
  "s2_q16": "Rude language or arguments with passengers",
  "s2_q11": "Unprofessional staff behaviour",
  "s2_q15": "Inadequate assistance to special-needs passengers",
  "s2_f1": "Motion sickness guidance not provided",
  "s2_q17": "Stop announcements missing or unclear",
  "s2_q18": "Inadequate passenger headcount during re-boarding",

  // Section 3: Pickup Responsibilities
  "s3_p1": "Pickup Delay",
  "s8_q2": "Luggage Tagging Non-Compliance",
  "s3_p2": "Staff Not Present at Boarding",
  "s3_p3": "Ticket Verification Failure",
  "s3_p6": "Improper Luggage Handling",
  "s3_p8": "No Assistance with Overhead Luggage",
  "s3_p7": "Seat Conflict Mishandled",

  // Section 4: Bus Cleanliness & Maintenance
  "s4_q1": "Bus exterior dirty or poorly maintained",
  "s4_q2": "Entry steps dirty or unsafe",
  "s4_m1": "Floor mat missing, dirty, or damaged",
  "s4_q5": "Seat/Berth surface dirty or dusty",
  "s4_q6": "Stains or spill marks on seat/berth",
  "s4_q6_a": "Trash found on seat/berth",
  "s4_c1": "Seat cushioning uncomfortable",
  "s4_c2": "Poor backrest support",
  "s4_c3": "Insufficient leg space",
  "s4_c4": "Reclining mechanism not working properly",
  "s4_sa1": "Floor dirty or littered",
  "s4_sa2": "Aisle obstructed",
  "s4_sa3": "Under-seat area dirty",
  "s4_sa4": "Armrests or handles dirty",
  "s4_q17": "Windows dirty or smudged",
  "s4_w1": "Curtains dirty or damaged",
  "s4_w2": "Curtain hooks broken or not functioning",
  "s4_b1": "Bottle holder damaged or not functional",
  "s4_b2": "Magazine holder damaged or not functional",
  "s4_b3": "Sleeper luggage compartment dirty, damaged, or broken",
  "s4_q21": "Air conditioning not working properly",
  "s4_av1": "Cabin temperature uncomfortable",
  "s4_v1": "Loose or damaged AC fittings observed",
  "s4_q25": "Bad odour inside the bus",
  "s4_o1": "Excessive air freshener smell",
  "s4_u1": "USB port not working",
  "s4_u2": "Type-C charging port not working",
  "s4_uf1": "Reading light not functioning",
  "s4_nr2": "Excessive cabin noise",
  "s4_nr4": "Rough or uncomfortable ride",
  "s4_sleeper_clean": "Blankets, bedsheets, or pillows dirty, damaged, or poorly maintained",

  // Section 5: Driving & Technical Safety
  "s5_m1": "Vehicle Vibration Issue",
  "s5_m2": "Engine Noise Detected",
  "s5_m3": "Smoke/Burning Smell Detected",
  "s5_m4": "Unstable Vehicle Performance",
  "s5_m5": "Vehicle Breakdown/Technical Fault",
  "s5_sv_fire": "Fire Extinguisher Missing",
  "s5_sv_hammer": "Emergency Hammer Missing",
  "s5_sv_firstaid": "First Aid Kit Unavailable",
  "s5_fit1": "Suspected Staff Intoxication (Critical)",
  "s5_fit2": "Alcohol Smell Detected (Critical)",
  "s5_fit3": "Abnormal Staff Behaviour (Critical)",
  "s5_fit4": "Impaired Communication by Staff (Critical)",

  // Section 7: Announcements
  "s7_q1": "Welcome Announcement Missing",
  "s7_q3": "Route/Delay Announcement Missing",
  "s7_q5": "Drop-off Announcement Missing",
  "s7_q6": "Unclear Announcements",
  "s7_q8": "Unprofessional Announcement Tone",
  "s7_q9": "Poor Announcement Quality",
  "s7_q10": "Feedback Request Not Made",

  // Section 8: Pilferage Check (If Yes is selected)
  "s8_q1": "Unauthorized Passenger (Critical)",
  "s8_q3": "Cash Collected Without Receipt (Critical)",
  "s8_q4": "Extra Money Demanded (Critical)",
  "s8_q5": "Off-System Payment Requested (Critical)",
  "s8_q6": "Fare-Inclusive Service Charged (Critical)",
  "s8_q7": "Unexplained Cash Collection (Critical)",
  "s8_q8": "Discreet Cash Acceptance (Critical)",
  "s8_q9": "Direct Cash Boarding (Critical)",
  "s8_q10": "Unethical Cash Handling (Critical)",

  // Section 9: Delay Adherence
  "s9_q1": "Late Departure",
  "s9_q2": "Delay Poorly Managed",
  "s9_q5": "Delay Reason Not Communicated",
  "s9_q6": "No Delay Updates",
  "s9_q6b": "No Passenger Reassurance",
  "s9_q7": "Operational Delay",
  "s9_q8": "Unnecessary Stops",
  "s9_q9": "Poor Delay Handling",
  "s9_q10": "Poor Schedule Management",

  // Section 10: Safety & Security
  "s10_q4": "Passenger Felt Unsafe",
  "s10_q5": "ID Verification Failure",
  "s10_q7": "Harassment Reported",
  "s10_q8": "Passenger Altercation",
  "s10_q11": "Poor Incident Response (Critical)",

  // Section 11: Drop Responsibilities
  "s11_d1": "Delayed Drop Arrival",
  "s11_d3": "Poor Deboarding Management",
  "s11_d4": "Luggage Return Issue"
};

function doGet(e) {
  return ContentService.createTextOutput("FreshBus Audit Web App Backend is Live!");
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu('✅ Audit Admin')
    .addItem('Validate Selected Entry & Copy to Final Report', 'validateSelectedEntry')
    // .addItem('📊 Generate Audit Presentation Deck (Final Report)', 'generateAuditPresentation') // DISABLED
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
        const folder = getOrCreateSubFolder(auditFolder, "final_observation");
        const files = payload.files[fieldId];
        const urls = [];
        files.forEach(f => {
          try {
            const blob = Utilities.newBlob(Utilities.base64Decode(f.base64), f.type, f.name);
            const file = folder.createFile(blob);
            urls.push(file.getUrl());
          } catch (fileErr) {
            Logger.log("Failed to save file: " + f.name + ", error: " + fileErr);
          }
        });
        if (urls.length > 0) {
          const fileString = urls.join('\n');
          fileUrls[fieldId] = fileString;
          if (payload.headerMap && payload.headerMap[fieldId]) {
            fileUrls[payload.headerMap[fieldId]] = fileString;
          }
        }
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

  // Sync missing headers to Final_Report if needed
  const finalLastCol = finalSheet.getLastColumn();
  if (lastCol > finalLastCol && finalLastCol > 0) {
    const missingCount = lastCol - finalLastCol;
    
    // Ensure Final_Report has enough physical columns before getting range
    if (finalSheet.getMaxColumns() < lastCol) {
      finalSheet.insertColumnsAfter(finalSheet.getMaxColumns(), lastCol - finalSheet.getMaxColumns());
    }
    
    const missingIds = sheet.getRange(1, finalLastCol + 1, 1, missingCount).getValues()[0];
    const missingLabels = sheet.getRange(2, finalLastCol + 1, 1, missingCount).getValues()[0];
    
    finalSheet.getRange(1, finalLastCol + 1, 1, missingCount).setValues([missingIds]);
    finalSheet.getRange(2, finalLastCol + 1, 1, missingCount).setValues([missingLabels]);
  }

  const rowData = sheet.getRange(row, 1, 1, lastCol).getValues()[0];

  if (rowData[0] === 'VALIDATED') {
    SpreadsheetApp.getUi().alert('This audit entry is ALREADY validated.');
    return;
  }

  // Update status to VALIDATED
  rowData[0] = 'VALIDATED';
  sheet.getRange(row, 1).setValue('VALIDATED');
  
  // Append to Final_Report explicitly at the actual last row
  const targetRow = finalSheet.getLastRow() + 1;
  
  if (finalSheet.getMaxColumns() < rowData.length) {
    finalSheet.insertColumnsAfter(finalSheet.getMaxColumns(), rowData.length - finalSheet.getMaxColumns());
  }
  
  finalSheet.getRange(targetRow, 1, 1, rowData.length).setValues([rowData]);

  SpreadsheetApp.getUi().alert(`✅ Audit Entry (Row ${row}) successfully validated and copied to Final Report (Row ${targetRow})!`);
}

/**
 * Generates an executive-ready presentation deck for the currently selected audit row.
 */
function generateAuditPresentation() {
  SpreadsheetApp.getUi().alert('PPT Generation is currently disabled. Focus is on form filling and accurate response fetching.');
  return;
  
  const ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getActiveSheet();

  const range = sheet.getActiveRange();
  const row = range ? range.getRow() : 0;
  
  if (row < 3) {
    SpreadsheetApp.getUi().alert('Please click on a valid validated audit entry row (row 3 or below) in Final_Report tab to generate a presentation.');
    return;
  }

  const lastCol = sheet.getLastColumn();
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  
  // SELF-HEALING: If Final_Report is missing header text for some columns, pull it from Pending_Audits
  const pendingSheet = ss.getSheetByName('Pending_Audits');
  if (pendingSheet) {
    const pLastCol = pendingSheet.getLastColumn();
    if (pLastCol > 0) {
      const pHeaders = pendingSheet.getRange(1, 1, 1, pLastCol).getValues()[0];
      const pLabels = pendingSheet.getRange(2, 1, 1, pLastCol).getValues()[0];
      
      let needsUpdate = false;
      for (let i = 0; i < headers.length; i++) {
        if (!headers[i] && i < pHeaders.length && pHeaders[i]) {
          headers[i] = pHeaders[i];
          sheet.getRange(1, i + 1).setValue(pHeaders[i]);
          sheet.getRange(2, i + 1).setValue(pLabels[i]);
          needsUpdate = true;
        }
      }
      if (needsUpdate) {
        Logger.log("Self-healed missing headers in Final_Report");
      }
    }
  }

  const rowData = sheet.getRange(row, 1, 1, lastCol).getValues()[0];
  
  // Map row into key-value & label objects
  const audit = {};
  const labelMap = {};
  const labels = sheet.getRange(2, 1, 1, lastCol).getValues()[0];
  for (let i = 0; i < headers.length; i++) {
    audit[headers[i]] = rowData[i];
    labelMap[headers[i]] = labels[i] || headers[i];
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
  // SLIDE 1: COVER
  // -------------------------------------------------------------
  coverSlide.getBackground().setSolidFill('#FFFFFF');
  
  // FreshBus Logo (top-right corner)
  // FreshBus Logo (top-right)
  try {
    const logoFile = DriveApp.getFileById(LOGO_DRIVE_ID);
    const logoImg = coverSlide.insertImage(logoFile.getBlob());
    logoImg.setLeft(530).setTop(20).setWidth(170).setHeight(55);
  } catch (logoErr) {
    Logger.log('Logo embed skipped: ' + logoErr);
    // Add fallback text if logo fails to load so it's not totally blank
    const fallbackBox = coverSlide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 530, 20, 170, 55);
    fallbackBox.getText().setText("FreshBus").getTextStyle().setFontFamily("Roboto").setFontSize(24).setBold(true).setForegroundColor("#0045AD");
    fallbackBox.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
  }

  // Cover Title (Middle-center)
  const titleBox = coverSlide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 50, 110, 620, 100);
  const titleTxt = titleBox.getText();
  titleTxt.setText(`Audit Journey\nCoverage: ${route}\nPNR: ${pnr}`);
  titleTxt.getTextStyle().setFontFamily("Roboto").setFontSize(28).setBold(true).setForegroundColor("#000000");
  titleTxt.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);

  // Bus Image Placeholder (bottom center)
  try {
    const busFile = DriveApp.getFileById('1QboGa9YN4eWMn75KmyWKE5misCfhrF6Y'); 
    const busImg = coverSlide.insertImage(busFile.getBlob());
    busImg.setLeft(120).setTop(220).setWidth(480).setHeight(170);
  } catch (busErr) {
    Logger.log('Bus image embed skipped: ' + busErr);
  }

  // -------------------------------------------------------------
  // SLIDES: DETAILED SECTION-BY-SECTION (1 SLIDE PER SECTION)
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
    { id: 11, name: "Drop Responsibilities" },
    { id: 13, name: "Final Observations" }
  ];

  sectionsList.forEach(sec => {
    const secSlide = pres.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    secSlide.getBackground().setSolidFill("#F8FAFC");

    const header = secSlide.insertShape(SlidesApp.ShapeType.RECTANGLE, 0, 0, 720, 50);
    header.getFill().setSolidFill("#0F172A");
    
    let headerText = `Section ${sec.id}: ${sec.name}`;
    if (sec.id === 11) {
      headerText += ` | DBG: ${audit['s11_media'] ? audit['s11_media'].substring(0, 30) : 'EMPTY'}`;
    }
    
    header.getText().setText(headerText).getTextStyle().setFontFamily("Roboto").setFontSize(18).setBold(true).setForegroundColor("#FFFFFF");

    // -------------------------------------------------------------
    // LOGIC: Skip Section 8 if "No" to the first question
    if (sec.id === 8 && audit['s8_q1'] === 'No') {
      return; 
    }

    let issues = [];
    for (let k in audit) {
      if (k.startsWith(`s${sec.id}_`) && !k.endsWith('_desc') && !k.endsWith('_media') && !k.endsWith('_good') && !k.endsWith('_wrong')) {
        const val = audit[k];
        if (!val || val === "N/A" || val === "") continue;

        let isIssue = false;
        let labelsToPush = [];

        // 1. Special Fields
        if (k === 's8_amount') {
           isIssue = true;
           labelsToPush.push("Approximate amount involved (\u20B9) - " + val);
        }
        else if (k === 's8_staff') {
           isIssue = true;
           labelsToPush.push("Staff member(s) involved - " + val);
        }
        else if (k === 's9_total_delay') {
           isIssue = true;
           labelsToPush.push("Total Delay (Minutes) - " + val);
        }
        // 2. Checkboxes (Array)
        else if (Array.isArray(val) && val.length > 0 && val[0] !== "None" && val[0] !== "N/A") {
           isIssue = true;
           val.forEach(item => labelsToPush.push(item));
        }
        // 3. Radios (Yes answers mapped)
        else if (val === "Yes" && NEGATIVE_STATEMENTS_MAP[k]) {
           isIssue = true;
           labelsToPush.push(NEGATIVE_STATEMENTS_MAP[k]);
        }
        // 4. Ratings (<= 3) - Only if it's a numeric string that isn't a special field
        else if (!isNaN(parseInt(val)) && parseInt(val) <= 3) {
           isIssue = true;
           labelsToPush.push(NEGATIVE_STATEMENTS_MAP[k] || (labelMap[k] || k).replace(/\[.*?\]\s*/g, '').trim());
        }

        if (isIssue) {
          labelsToPush.forEach(lbl => {
            issues.push({
              label: lbl,
              desc: audit[`${k}_desc`] && audit[`${k}_desc`] !== "N/A" ? audit[`${k}_desc`] : ""
            });
          });
        }
      }
    }

    const mediaVal = audit[`s${sec.id}_media`];
    let mediaUrls = [];
    if (mediaVal) {
      const urls = mediaVal.split('\n');
      urls.forEach(u => {
        u = u.trim();
        if (u.startsWith('http')) mediaUrls.push(u);
      });
    }

    const totalCells = Math.min(Math.max(issues.length, mediaUrls.length), 10);

    if (totalCells === 0) {
      const contentBox = secSlide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 30, 70, 660, 300);
      let debugText = "• No major issues reported (All ratings > 3 stars).";
      if (sec.id === 11) {
         debugText += `\n\n[DEBUG S11]: mediaVal is '${mediaVal || "UNDEFINED"}'`;
      }
      contentBox.getText().setText(debugText).getTextStyle().setFontFamily("Roboto").setFontSize(14).setForegroundColor("#334155");
    } else {
      const cols = totalCells <= 5 ? totalCells : Math.ceil(totalCells / 2);
      const rows = totalCells <= 5 ? 1 : 2;
      const startX = 20;
      const startY = 60;
      const spacing = 10;
      const availWidth = 720 - (startX * 2); // 680
      const availHeight = 405 - startY - 15; // 330
      
      const cellWidth = (availWidth - (spacing * (cols - 1))) / cols;
      const cellHeight = (availHeight - (spacing * (rows - 1))) / rows;

      for (let i = 0; i < totalCells; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const x = startX + (col * (cellWidth + spacing));
        const y = startY + (row * (cellHeight + spacing));

        const issue = issues[i];
        const url = mediaUrls[i];

        let currentY = y;
        
        if (issue) {
          const titleBox = secSlide.insertShape(SlidesApp.ShapeType.TEXT_BOX, x, currentY, cellWidth, 25);
          titleBox.getText().setText(`Issue ${i+1}: ${issue.label}`).getTextStyle().setFontFamily("Roboto").setFontSize(totalCells > 5 ? 8 : 10).setBold(true).setForegroundColor("#000000");
          currentY += 25;

          if (issue.desc) {
            const descBox = secSlide.insertShape(SlidesApp.ShapeType.TEXT_BOX, x, currentY, cellWidth, 30);
            descBox.getText().setText(`Desc: ${issue.desc}`).getTextStyle().setFontFamily("Roboto").setFontSize(totalCells > 5 ? 7 : 9).setForegroundColor("#334155");
            currentY += 30;
          }
        } // Removed "Extra Media" else block

        if (url) {
          const mediaHeight = Math.max(10, (y + cellHeight) - currentY);
          try {
            let fileId = null;
            const dMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
            const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
            if (dMatch) fileId = dMatch[1];
            else if (idMatch) fileId = idMatch[1];

            if (fileId) {
              const file = DriveApp.getFileById(fileId);
              const mime = file.getMimeType();

              if (mime.startsWith('image/')) {
                const img = secSlide.insertImage(file.getBlob());
                img.setLeft(x).setTop(currentY).setWidth(cellWidth).setHeight(mediaHeight);
              } else {
                const vBox = secSlide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, x, currentY, cellWidth, mediaHeight);
                vBox.getFill().setSolidFill("#1E293B");
                const vTxt = vBox.getText();
                vTxt.setText(`🎬\nMedia ${i + 1}`);
                vTxt.getTextStyle().setFontFamily("Roboto").setFontSize(8).setForegroundColor("#38BDF8").setBold(true);
                vTxt.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
                vBox.setLinkUrl(url);
              }
            }
          } catch (err) {
            Logger.log("Media embed error for " + url + ": " + err);
            const fBox = secSlide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, x, currentY, cellWidth, mediaHeight);
            fBox.getFill().setSolidFill("#1E293B");
            const fTxt = fBox.getText();
            fTxt.setText(`📎\nAttachment ${i + 1}`);
            fTxt.getTextStyle().setFontFamily("Roboto").setFontSize(8).setForegroundColor("#38BDF8").setBold(true);
            fTxt.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
            fBox.setLinkUrl(url);
          }
        }
      }
    }
    
    addLogoWatermark(secSlide);
  });

  // -------------------------------------------------------------
  // SLIDE: PASSENGER FEEDBACKS (Section 12)
  // -------------------------------------------------------------
  const passIds = [];
  for (let k in audit) {
    if (k.startsWith('p_name_')) {
      passIds.push(k.replace('p_name_', ''));
    }
  }

  if (passIds.length > 0) {
    const passSlide = pres.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    passSlide.getBackground().setSolidFill("#F8FAFC");
    
    const passHeader = passSlide.insertShape(SlidesApp.ShapeType.RECTANGLE, 0, 0, 720, 50);
    passHeader.getFill().setSolidFill("#0F172A");
    passHeader.getText().setText("Passenger Feedbacks").getTextStyle().setFontFamily("Roboto").setFontSize(18).setBold(true).setForegroundColor("#FFFFFF");

    let passText = "";

    passIds.forEach(id => {
      const pName = audit[`p_name_${id}`];
      if (pName && pName !== 'N/A') {
        passText += `Passenger Name - ${pName}\n`;
        passText += `Seat Type - ${audit[`p_seatType_${id}`] || 'N/A'}\n`;
        passText += `Seat No. - ${audit[`p_seatNo_${id}`] || 'N/A'}\n`;
        const goodF = audit[`p_good_${id}`] || 'None';
        const badF = audit[`p_wrong_${id}`] || 'None';
        passText += `Positive Feedback(s)\n• ${goodF}\n`;
        passText += `Negative Feedback(s)\n• ${badF}\n\n`;
      }
    });

    if (passText) {
       passBox.getText().setText(passText).getTextStyle().setFontFamily("Roboto").setFontSize(11).setForegroundColor("#334155");
    }
    
    addLogoWatermark(passSlide);
  }



  // -------------------------------------------------------------
  // FINAL SLIDE: OVERALL AUDIT SUMMARY
  // -------------------------------------------------------------
  const summarySlide = pres.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  summarySlide.getBackground().setSolidFill("#FFFFFF");
  
  const sHeaderBox = summarySlide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 0, 10, 720, 50);
  const sHeaderTxt = sHeaderBox.getText();
  sHeaderTxt.setText("Overall Audit Summary");
  sHeaderTxt.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
  sHeaderTxt.getTextStyle().setFontFamily("Roboto").setFontSize(28).setBold(true).setForegroundColor("#4285F4"); // Blue

  let positiveNotes = [];
  let gapNotes = [];
  
  // 1 bullet point for each section (2 to 11, and 13)
  const summarySections = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13];
  summarySections.forEach(sid => {
    const pVal = audit[`s${sid}_good`];
    const gVal = audit[`s${sid}_wrong`];
    if (pVal && pVal !== 'N/A' && pVal.trim() !== '') {
      positiveNotes.push(pVal);
    }
    if (gVal && gVal !== 'N/A' && gVal.trim() !== '') {
      gapNotes.push(gVal);
    }
  });

  const posTitleBox = summarySlide.insertShape(SlidesApp.ShapeType.RECTANGLE, 70, 70, 260, 35);
  posTitleBox.getFill().setTransparent();
  posTitleBox.getBorder().getLineFill().setSolidFill("#FACC15");
  posTitleBox.getBorder().setWeight(2);
  posTitleBox.getText().setText("What Went Good").getTextStyle().setFontFamily("Roboto").setFontSize(16).setBold(true).setForegroundColor("#000000");
  posTitleBox.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);

  const posBox = summarySlide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 30, 110, 320, 240);
  posBox.getText().setText(positiveNotes.length > 0 ? "• " + positiveNotes.slice(0, 8).join("\n• ") : "• Service met all standards cleanly.");
  posBox.getText().getTextStyle().setFontFamily("Roboto").setFontSize(10).setForegroundColor("#333333");

  const gapTitleBox = summarySlide.insertShape(SlidesApp.ShapeType.RECTANGLE, 390, 70, 260, 35);
  gapTitleBox.getFill().setTransparent();
  gapTitleBox.getBorder().getLineFill().setSolidFill("#FACC15");
  gapTitleBox.getBorder().setWeight(2);
  gapTitleBox.getText().setText("What Went Wrong").getTextStyle().setFontFamily("Roboto").setFontSize(16).setBold(true).setForegroundColor("#000000");
  gapTitleBox.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);

  const gapBox = summarySlide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 370, 110, 320, 240);
  gapBox.getText().setText(gapNotes.length > 0 ? "• " + gapNotes.slice(0, 8).join("\n• ") : "• No critical gaps reported.");
  gapBox.getText().getTextStyle().setFontFamily("Roboto").setFontSize(10).setForegroundColor("#333333");

  addLogoWatermark(summarySlide);

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

// -------------------------------------------------------------
// LOGO WATERMARK HELPER
// -------------------------------------------------------------
function addLogoWatermark(slide) {
  try {
    const logoFile = DriveApp.getFileById(LOGO_DRIVE_ID);
    const logoImg = slide.insertImage(logoFile.getBlob());
    logoImg.setLeft(580).setTop(360).setWidth(120).setHeight(35); // Small size, bottom right
  } catch (e) {
    // Silently fail if logo cannot be loaded
  }
}

// -------------------------------------------------------------
// GEMINI API HELPER
// -------------------------------------------------------------
function callGemini(prompt) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") {
    return "LLM API Key missing. Please set GEMINI_API_KEY.";
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  const payload = {
    "contents": [{"parts": [{"text": prompt}]}],
    "generationConfig": {
      "temperature": 0.3
    }
  };
  const options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };
  
  try {
    const res = UrlFetchApp.fetch(url, options);
    const json = JSON.parse(res.getContentText());
    if (json.candidates && json.candidates.length > 0) {
      return json.candidates[0].content.parts[0].text.trim();
    }
    return "Could not generate summary.";
  } catch (e) {
    Logger.log("Gemini Error: " + e);
    return "Error calling LLM: " + e.message;
  }
}
