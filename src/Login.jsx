  // const downloadPDF = () => {
  //   // const input = pdfRef.current;
  //   // html2canvas(input).then((canvas) => {
  //   //   const imgData = canvas.toDataURL('image/png');
  //   //   const pdf = new jsPDF('p', 'mm', 'a4', true);
  //   //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   //   const pdfHeight = pdf.internal.pageSize.getHeight();
  //   //   const imgWidth = canvas.width;
  //   //   const imgHeight = canvas.height;
  //   //   const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  //   //   const imgX = 10;
  //   //   const imgY = 7;

  //   //   // pdf.setDrawColor(0); // Set the color to black
  //   //   // pdf.setLineWidth(1); // Set the line width (adjust as needed)
  //   //   // pdf.rect(5, 5, pdfWidth - 10, pdfHeight - 10); // Draw the rectangle (x, y, width, height)
  //   //   // pdf.stroke(); // Render the rectangle
  //   //   pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
  
  //   //   // Set the file name with tripName
  //   //   pdf.save(`Payment Bill for Trip - ${tripName}.pdf`);
  
  //   //   // Add a black border around the page
      
  //   // });
  //   console.log(paymentArray);
  // };