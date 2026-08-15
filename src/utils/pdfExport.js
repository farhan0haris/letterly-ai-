import { jsPDF } from 'jspdf';

export const exportToPDF = (content, companyName = '', position = '', template = 'modern') => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 25;
  const maxWidth = pageWidth - 2 * margin;
  let yPos = margin;

  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Apply template styles
  if (template === 'modern') {
    doc.setFillColor(10, 65, 116);
    doc.rect(0, 0, pageWidth, 8, 'F');
    yPos += 10;
  } else if (template === 'minimalist') {
    doc.setDrawColor(229, 231, 235);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;
  }

  const baseFont = template === 'classic' ? 'times' : 'helvetica';

  // Date
  doc.setFont(baseFont, 'normal');
  doc.setFontSize(11);
  doc.setTextColor(107, 114, 128);
  if (template === 'classic') doc.setTextColor(0, 0, 0);
  doc.text(date, margin, yPos);
  yPos += 8;

  // Company name
  if (companyName) {
    doc.setFont(baseFont, 'bold');
    doc.setFontSize(12);
    doc.setTextColor(17, 24, 39);
    doc.text(companyName, margin, yPos);
    yPos += 6;
  }

  // Position
  if (position) {
    doc.setFont(baseFont, 'italic');
    doc.setFontSize(11);
    doc.setTextColor(107, 114, 128);
    if (template === 'classic') doc.setTextColor(0, 0, 0);
    doc.text(`Re: ${position}`, margin, yPos);
    yPos += 6;
  }

  yPos += 8;

  // Cover letter content
  doc.setFont(baseFont, 'normal');
  doc.setFontSize(11);
  doc.setTextColor(17, 24, 39);
  if (template === 'classic') doc.setTextColor(0, 0, 0);

  const lines = doc.splitTextToSize(content, maxWidth);
  const lineHeight = 6;

  for (let i = 0; i < lines.length; i++) {
    if (yPos + lineHeight > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
      if (template === 'modern') {
        doc.setFillColor(37, 99, 235);
        doc.rect(0, 0, pageWidth, 8, 'F');
        yPos += 10;
      }
    }
    doc.text(lines[i], margin, yPos);
    yPos += lineHeight;
  }

  const filename = companyName
    ? `Cover_Letter_${companyName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
    : 'Cover_Letter.pdf';

  doc.save(filename);
};
