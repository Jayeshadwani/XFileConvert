import CSV from "../static/images/icons/fileIcons/csv-file.png";
import DOCX from "../static/images/icons/fileIcons/docx-file.png";
import ODT from "../static/images/icons/fileIcons/odt.png";
import PDF from "../static/images/icons/fileIcons/pdf.png";
import PPTX from "../static/images/icons/fileIcons/pptx-file.png";
import SVG from "../static/images/icons/fileIcons/svg.png";
import XLSX from "../static/images/icons/fileIcons/xlsx.png";
import FILE from "../static/images/icons/fileIcons/file.png";

export const getFileIcon = (type) => {
  const fileIcons = {
    docx: DOCX,
    pdf: PDF,
    odt: ODT,
    xlsx: XLSX,
    pptx: PPTX,
    csv: CSV,
    svg: SVG,
    odg: FILE,
    default: FILE,
  };

  return fileIcons[type] || fileIcons.default;
};

export const getFileSize = (size) => {
  if (size >= Number(1000 * 1000)) {
    return `${Number(size / Number(1000 * 1000)).toFixed(2)} MB`;
  } else if (size >= 1000) {
    return `${Number(size / 1000).toFixed(2)} KB`;
  }
  return `${size} Bytes`;
};

export const SUPPORTED_FILE_FORMATS = [
  "pdf",
  "csv",
  "docx",
  "doc",
  "odt",
  "xlsx",
  "pptx",
  "svg",
  "odg",
];

export const SUPPORTED_FILE_CONVERSION_FORMATS = {
  pdf: ["pdf", "docx", "doc", "odt", "xlsx", "pptx", "svg", "odg"],
  csv: ["csv", "xlsx", "odt", "docx", "pptx", "pdf"],
  docx: ["docx", "pdf", "odt", "csv", "xlsx", "pptx", "odg"],
  doc: ["doc", "pdf", "docx", "odt", "csv", "xlsx", "pptx", "odg"],
  odt: ["odt", "pdf", "docx", "doc", "csv", "xlsx", "pptx", "svg", "odg"],
  xlsx: ["xlsx", "pdf", "csv", "docx", "doc", "pptx", "odg"],
  pptx: ["pptx", "pdf", "docx", "doc", "odt", "csv", "xlsx", "odg", "svg"],
  svg: ["svg", "pdf", "odg", "pptx", "docx", "doc", "xlsx", "odt"],
  odg: ["odg", "pdf", "docx", "doc", "odt", "pptx", "svg", "xlsx"],
};
