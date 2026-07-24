import { jsPDF } from 'jspdf';

export const exportToPDF = (content, companyName = '', position = '') => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 25;
  const maxWidth = pageWidth - 2 * margin;
  let yPos = margin;

  // Date
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(107, 114, 128);
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  doc.text(date, margin, yPos);
  yPos += 8;

  // Company name if provided
  if (companyName) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(17, 24, 39);
    doc.text(companyName, margin, yPos);
    yPos += 6;
  }

  // Position if provided
  if (position) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(11);
    doc.setTextColor(107, 114, 128);
    doc.text(`Re: ${position}`, margin, yPos);
    yPos += 6;
  }

  yPos += 8;

  // Cover letter content
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(17, 24, 39);

  const lines = doc.splitTextToSize(content, maxWidth);
  const lineHeight = 6;

  for (let i = 0; i < lines.length; i++) {
    if (yPos + lineHeight > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      yPos = margin;
    }
    doc.text(lines[i], margin, yPos);
    yPos += lineHeight;
  }

  // Generate filename
  const filename = companyName
    ? `Cover_Letter_${companyName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
    : 'Cover_Letter.pdf';

  doc.save(filename);
};
