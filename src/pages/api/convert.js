import path from "path";
import fs from "fs/promises";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

function getConvertedFileDetails(file, base64String, conversionType) {
  return {
    originalName: file.name,
    convertedName: file.name.replace(/\.[^/.]+$/, `.${conversionType}`),
    convertedBase64: base64String,
  };
}

export default async function handler(req, res) {
  try {
    const { files, conversionType } = req.body;
    const convertedFiles = [];
    const iterableFilesArray = Array.from(files);
    const requiredFileFormat = conversionType;

    for (const file of iterableFilesArray) {
      const { base64, name } = file;
      const actualFileFormat = name.split(".")[1];
      const base64String = base64?.split("base64,")[1];

      // Define file paths
      const uniqueId = Date.now();
      const inputFilePath = path.resolve(
        `temp-${uniqueId}.${actualFileFormat}`
      );
      const outputFilePath = path.resolve(
        `temp-${uniqueId}.${requiredFileFormat}`
      );
      const outputDir = path.dirname(outputFilePath);

      try {
        // Ensure the output directory exists
        await fs.mkdir(outputDir, { recursive: true });

        // Save input file content
        console.log("Saving input file:", inputFilePath);
        await fs.writeFile(inputFilePath, Buffer.from(base64String, "base64"));
        await fs.access(inputFilePath);

        // Convert File Format using LibreOffice
        console.log("Converting file:", inputFilePath);
        const { stdout, stderr } = await execPromise(
          `libreoffice --headless --convert-to ${requiredFileFormat} "${inputFilePath}" --outdir "${outputDir}"`
        );
        console.log("LibreOffice stdout:", stdout);
        if (stderr) console.error("LibreOffice stderr:", stderr);

        // Validate output file
        console.log("Validating output file:", outputFilePath);
        await fs.access(outputFilePath);

        // Read converted file and encode to base64
        const convertedFileBuffer = await fs.readFile(outputFilePath);
        const convertedFileBase64 = convertedFileBuffer.toString("base64");
        const convertedFile = getConvertedFileDetails(
          file,
          convertedFileBase64,
          conversionType
        );

        convertedFiles.push(convertedFile);
      } catch (conversionError) {
        console.error("Error during file conversion:", conversionError);
        throw conversionError;
      } finally {
        // Cleanup temporary files
        try {
          console.log(
            "Cleaning up temporary files:",
            inputFilePath,
            outputFilePath
          );
          await fs.unlink(inputFilePath).catch((error) => console.error(error));
          await fs
            .unlink(outputFilePath)
            .catch((error) => console.error(error));
        } catch (cleanupError) {
          console.error("Error during cleanup:", cleanupError);
        }
      }
    }

    res.status(200).json(convertedFiles);
  } catch (error) {
    console.error("Handler error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
