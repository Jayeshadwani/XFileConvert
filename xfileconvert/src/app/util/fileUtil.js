const CSV = require("../static/images/icons/fileIcons/csv-file.png");
const DOCX = require("../static/images/icons/fileIcons/docx-file.png");
const ODT = require("../static/images/icons/fileIcons/odt.png");
const PDF = require("../static/images/icons/fileIcons/pdf.png");
const PPTX = require("../static/images/icons/fileIcons/pptx-file.png");
const SVG = require("../static/images/icons/fileIcons/svg.png");
const XLSX = require("../static/images/icons/fileIcons/xlsx.png");
const FILE = require("../static/images/icons/fileIcons/file.png");

const getFileIcon = (type) => {
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

const getFileSize = (size) => {
  if (size >= Number(1000 * 1000)) {
    return `${Number(size / Number(1000 * 1000)).toFixed(2)} MB`;
  } else if (size >= 1000) {
    return `${Number(size / 1000).toFixed(2)} KB`;
  }
  return `${size} Bytes`;
};

const SUPPORTED_FILE_FORMATS = [
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

const SUPPORTED_FILE_CONVERSION_FORMATS = {
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

module.exports = {
  getFileIcon,
  getFileSize,
  SUPPORTED_FILE_FORMATS,
  SUPPORTED_FILE_CONVERSION_FORMATS,
};
