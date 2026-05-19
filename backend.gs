/**
 * FreshBus Audit - MASTER BACKEND (Uploads Enabled, High Speed, Advanced UI)
 */

const ROOT_FOLDER = 'FreshBus_Audit_Media';
const SHEET_ID = "1W42G9wS4D8rNd75zTtSO29B8hS1C3T3N-3u0FqFFuHg";

function doGet() {
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('FreshBus - Flying Audit Form')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu('✅ Audit Admin')
    .addItem('Validate Selected Row', 'validateRow')
    .addToUi();
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const pendingSheet = ss.getSheetByName('Pending_Audits') || ss.insertSheet('Pending_Audits');
    
    const res = payload.responses || {};
    const auditID = `${res.pnr || 'UN'}_${(res.service_route || 'Route').replace(/\\s/g, '_')}`;

    // --- ENFORCE BACKEND LOGIC: 3-Star = N/A for descriptions ---
    for (let key in payload.headerMap) {
      if (key.endsWith('_desc')) {
        const baseKey = key.replace('_desc', '');
        if (res[baseKey] == "3") {
          res[key] = "N/A"; // Force N/A for 3 stars
        }
      }
    }

    // 1. SAVE UPLOADED FILES TO DRIVE
    const fileUrls = {};
    const root = getOrCreateFolder(ROOT_FOLDER);
    const auditFolder = getOrCreateSubFolder(root, auditID);

    if (payload.files) {
      for (let fieldId in payload.files) {
        const sectionName = payload.sectionMap[fieldId] || "General Uploads";
        const folder = getOrCreateSubFolder(auditFolder, sectionName);
        const files = payload.files[fieldId];
        const urls = [];
        files.forEach(f => {
          const blob = Utilities.newBlob(Utilities.base64Decode(f.base64), f.type, f.name);
          const file = folder.createFile(blob);
          urls.push(file.getUrl());
        });
        fileUrls[fieldId] = urls.join('\\n');
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
    
    // Create Advanced Header if empty
    if (pendingSheet.getLastColumn() === 0) {
      const ids = Object.keys(fullData);
      pendingSheet.appendRow(ids);
      pendingSheet.appendRow(ids.map(id => payload.headerMap[id] || id));
      
      pendingSheet.hideRows(1);
      
      // Professional Formatting
      const headerRange = pendingSheet.getRange(2, 1, 1, ids.length);
      headerRange.setBackground('#0045AD') // FreshBus Blue
                 .setFontColor('#FFFFFF')
                 .setFontWeight('bold')
                 .setWrap(true)
                 .setVerticalAlignment('middle')
                 .setHorizontalAlignment('center');
      
      pendingSheet.setRowHeight(2, 60); // Taller row for complete header visibility
      pendingSheet.setFrozenRows(2);
      pendingSheet.setFrozenColumns(5); // Freeze key info columns
      
      // Auto-resize standard columns, set wider widths for descriptions
      for (let i = 1; i <= ids.length; i++) {
        if (ids[i-1].endsWith('_desc') || ids[i-1].startsWith('s13_')) {
          pendingSheet.setColumnWidth(i, 300);
        } else {
          pendingSheet.setColumnWidth(i, 150);
        }
      }
    }
    
    const headers = pendingSheet.getRange(1, 1, 1, pendingSheet.getLastColumn()).getValues()[0];
    const newRow = headers.map(id => fullData[id] !== undefined ? fullData[id] : "");
    pendingSheet.appendRow(newRow);
    
    // Add alternating row colors (Zebra stripes) for premium look
    const lastRow = pendingSheet.getLastRow();
    const lastCol = pendingSheet.getLastColumn();
    if (lastRow > 2) {
      const rowRange = pendingSheet.getRange(lastRow, 1, 1, lastCol);
      rowRange.setWrap(true).setVerticalAlignment('top');
      if (lastRow % 2 === 0) {
        rowRange.setBackground('#F8F9FA'); // Light gray for even rows
      } else {
        rowRange.setBackground('#FFFFFF'); // White for odd rows
      }
    }

    return ContentService.createTextOutput("Success");
  } catch (err) {
    Logger.log("ERROR: " + err.toString());
    return ContentService.createTextOutput("Error: " + err.toString());
  }
}

function validateRow() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const pendingSheet = ss.getSheetByName('Pending_Audits');
  const finalSheet = ss.getSheetByName('Final_Report') || ss.insertSheet('Final_Report');
  const activeRow = pendingSheet.getActiveRange().getRow();
  
  if (activeRow < 3) return;
  
  const rowData = pendingSheet.getRange(activeRow, 1, 1, pendingSheet.getLastColumn()).getValues()[0];
  rowData[0] = 'VALIDATED'; // Update Status
  
  if (finalSheet.getLastColumn() === 0) {
    const ids = pendingSheet.getRange(1, 1, 1, pendingSheet.getLastColumn()).getValues()[0];
    const labels = pendingSheet.getRange(2, 1, 1, pendingSheet.getLastColumn()).getValues()[0];
    
    finalSheet.appendRow(ids);
    finalSheet.appendRow(labels);
    finalSheet.hideRows(1);
    
    const headerRange = finalSheet.getRange(2, 1, 1, ids.length);
    headerRange.setBackground('#2E7D32') // Success Green
               .setFontColor('#FFFFFF')
               .setFontWeight('bold')
               .setWrap(true)
               .setVerticalAlignment('middle')
               .setHorizontalAlignment('center');
               
    finalSheet.setRowHeight(2, 60);
    finalSheet.setFrozenRows(2);
    finalSheet.setFrozenColumns(5);
    
    for (let i = 1; i <= ids.length; i++) {
        finalSheet.setColumnWidth(i, pendingSheet.getColumnWidth(i));
    }
  }
  
  finalSheet.appendRow(rowData);
  pendingSheet.deleteRow(activeRow);
  
  // Re-apply banding to Final Sheet
  const lastRow = finalSheet.getLastRow();
  const rowRange = finalSheet.getRange(lastRow, 1, 1, finalSheet.getLastColumn());
  rowRange.setWrap(true).setVerticalAlignment('top');
  rowRange.setBackground(lastRow % 2 === 0 ? '#F8F9FA' : '#FFFFFF');
  
  SpreadsheetApp.getUi().alert('✅ Audit Promoted to Final Report successfully!');
}

function getOrCreateFolder(n) { const f = DriveApp.getFoldersByName(n); return f.hasNext() ? f.next() : DriveApp.createFolder(n); }
function getOrCreateSubFolder(p, n) { const f = p.getFoldersByName(n); return f.hasNext() ? f.next() : p.createFolder(n); }
