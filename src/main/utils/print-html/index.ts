export const printHtml = (body: string): void => {
  const width = 1000;
  const height = 700;

  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;
  const printWindow = window.open(
    '',
    '',
    `width=${width},height=${height},left=${left},top=${top}`
  );

  if (printWindow) {
    printWindow.document.write(body);

    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  }
};
