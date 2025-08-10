const PDFdocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

exports.generatePDF = (userId, report) => {
  const reportsDir = path.join(__dirname, '../reports');
  fs.mkdirSync(reportsDir, { recursive: true });
  const filePath = path.join(reportsDir, `${userId}.pdf`);
  const doc = new PDFdocument();
  doc.pipe(fs.createWriteStream(filePath));
  doc.fontSize(25).text(report, 100, 100);
  doc.end();
};
