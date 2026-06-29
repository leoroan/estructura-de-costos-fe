/**
 * exportUtils.js — utilidades de exportación (PDF, CSV).
 * Usa jsPDF + jspdf-autotable.
 */

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Exporta un array de objetos a PDF con tabla.
 * @param {object[]} rows      - datos
 * @param {string[]} columns   - claves a incluir
 * @param {string[]} headers   - encabezados de columna
 * @param {string}   filename  - nombre del archivo sin extensión
 * @param {string}   title     - título del documento
 */
export function exportToPDF({ rows, columns, headers, filename = "reporte", title = "Reporte" }) {
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text(title, 14, 20);
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generado: ${new Date().toLocaleString("es-AR")}`, 14, 28);

  autoTable(doc, {
    startY: 34,
    head: [headers],
    body: rows.map((row) => columns.map((col) => row[col] ?? "—")),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [13, 110, 253] },
  });

  doc.save(`${filename}.pdf`);
}

/**
 * Exporta datos a CSV y descarga el archivo.
 */
export function exportToCSV({ rows, columns, headers, filename = "reporte" }) {
  const csvLines = [
    headers.join(","),
    ...rows.map((row) =>
      columns.map((col) => `"${String(row[col] ?? "").replace(/"/g, '""')}"`).join(",")
    ),
  ];
  const blob = new Blob([csvLines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
