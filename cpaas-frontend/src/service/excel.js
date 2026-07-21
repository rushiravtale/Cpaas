import * as XLSX from "xlsx";

/**
 * Export data to Excel file and trigger download
 * @param {Array} data - Array of objects to export
 * @param {String} filename - Name of the file (without extension)
 */
export const exportToExcel = (data, filename = "export") => {
  try {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Set column widths
    const columnWidths = [
      { wch: 20 }, // Name
      { wch: 15 }, // Army Number
      { wch: 10 }, // Rank
      { wch: 15 }, // Trade
      { wch: 12 }, // Squad Number
      { wch: 20 }, // Civil Education
      { wch: 25 }, // Any Other Qualification
      { wch: 20 }, // Father Name
      { wch: 15 }, // Contact Number
      { wch: 30 }, // Address
      { wch: 20 }, // Course Name
      { wch: 10 }, // Grade
    ];
    worksheet["!cols"] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Agniveers");

    // Generate file name with timestamp
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "_");
    const fullFilename = `${filename}_${timestamp}.xlsx`;

    // Write file and trigger download
    XLSX.writeFile(workbook, fullFilename);
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    throw error;
  }
};

/**
 * Read Excel file and return parsed data
 * @param {File} file - File object from input
 * @returns {Promise<Array>} Promise that resolves to array of row objects
 */
export const readExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet, { raw: false });
        resolve(rows);
      } catch (error) {
        reject(new Error("Invalid Excel file format"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };

    reader.readAsArrayBuffer(file);
  });
};
