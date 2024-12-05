"use strict";
const express = require("express");
const app = express();

const path = require("path");
const fs = require("fs").promises;
const uploadPath = "/files/";

const libre = require("libreoffice-convert");
libre.convertAsync = require("util").promisify(libre.convert);

async function main(inputfile) {
  const ext = ".pdf";
  const inputPath = path.join(__dirname, `/files/test/${inputfile}`);
  const outputPath = path.join(__dirname, `/files/test/example${ext}`);

  const docxBuf = await fs.readFile(inputPath);

  let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);
  await fs.writeFile(outputPath, pdfBuf);
}

app.get("/convert", (req, res) => {
  let inputfile = req.query.inputfile;
  console.log(inputfile);
  main(inputfile)
    .then(() => {
      console.log("Conversion complete");
      res.send("Conversion complete");
    })
    .catch(function (err) {
      console.log(`Error converting file: ${err}`);
      res.send("Failed to convert file");
    });
});

app.listen(8080, () => {
  console.log("App is running on the port 8080");
});
