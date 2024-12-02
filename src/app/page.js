"use client";
import { useRef, useState } from "react";
import FileCard from "./FileCard";
import {
  SUPPORTED_FILE_FORMATS,
  SUPPORTED_FILE_CONVERSION_FORMATS,
} from "./util/fileUtil";

const ACTIVE_STEPS = {
  SELECT_FILE_FORMAT: 1,
  UPLOAD_FILES: 2,
};

export default function Home() {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [actualFormat, setActualFormat] = useState("docx");
  const [requiredFormat, setRequiredFormat] = useState("pdf");
  const [activeStep, setActiveStep] = useState(ACTIVE_STEPS.SELECT_FILE_FORMAT);

  const handleChangeInput = (event) => {
    let files = event.target.files;

    var allFiles = [];
    for (var i = 0; i < files.length; i++) {
      let file = files[i];
      const MAX_FILE_SIZE_LIMIT = 10 * 1000 * 1000; // 10MB = 10 * 1000 * 1000 bytes

      if (file.size > MAX_FILE_SIZE_LIMIT) {
        alert(`File ${file.name} exceeds the maximum size of 10MB.`);
        continue;
      }

      const fileType = file.name.split(".")[1];
      if (!SUPPORTED_FILE_FORMATS.includes(fileType)) {
        alert(`File ${file.name} is not supported for conversion`);
        continue;
      }

      if (fileType !== requiredFormat) {
        alert(`File ${file.name} is not in ${requiredFormat} format`);
        continue;
      }

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: file.size,
          base64: reader.result,
          file: file,
        };

        allFiles.push(fileInfo);
      };
    }

    setTimeout(() => {
      setFiles((prevFiles) => [...(prevFiles || []), ...allFiles]);
    }, 100);
  };

  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (filename) => {
    const updatedFiles = files?.filter((file) => file.name !== filename);
    setFiles(updatedFiles);
  };

  const handleActiveStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className="contentWrapper">
      <main className="modalWrapper">
        {/* Header Section */}
        {activeStep === ACTIVE_STEPS.SELECT_FILE_FORMAT ? (
          <>
            <div className="modalHeaderWrapper">
              <div className="modalHeaderLeftSide">
                <div className="modalHeaderIcon"></div>
                <div className="modalHeaderHeadingFlexbox">
                  <div className="modalHeaderHeading">
                    Select File Conversion Format
                  </div>
                  <div className="modalHeaderSubheading">
                    Select the current file format and the format you wish to
                    convert to. This tool supports various formats including
                    PDF, DOCX, JPG, PNG, and TXT. Ensure you choose the correct
                    formats for a successful conversion.
                  </div>
                </div>
              </div>
            </div>

            <div className="horizontalDivider"></div>

            {/* File Conversion Format Section */}
            <section className="fileFormatConversionSection">
              <div className="actualFormatWrapper">
                <div className="actualFormatWrapperText">Actual Format</div>
                <div className="actualFormatWrapperDropdown">
                  <select
                    value={actualFormat}
                    onChange={(e) => setActualFormat(e.target.value)}>
                    {Object.keys(SUPPORTED_FILE_CONVERSION_FORMATS).map(
                      (format) => (
                        <option key={format} value={format}>
                          {format}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              <div className="actualFormatWrapper">
                <div className="actualFormatWrapperText">Required Format</div>
                <div className="actualFormatWrapperDropdown">
                  <select
                    value={requiredFormat}
                    onChange={(e) => setRequiredFormat(e.target.value)}>
                    {SUPPORTED_FILE_CONVERSION_FORMATS[actualFormat].map(
                      (option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            </section>

            <section
              className="uploadFilesButtonWrapper"
              onClick={() => handleActiveStepChange(ACTIVE_STEPS.UPLOAD_FILES)}>
              <button className="uploadFilesButton">Upload Files</button>
            </section>
          </>
        ) : activeStep === ACTIVE_STEPS.UPLOAD_FILES ? (
          <>
            {/* Header Section */}
            <div className="modalHeaderWrapper">
              <div className="modalHeaderLeftSide">
                <div className="modalHeaderHeadingFlexbox">
                  <div className="modalHeaderHeading">Upload Files</div>
                  <div className="modalHeaderSubheading">
                    Convert {actualFormat} to {requiredFormat}
                  </div>
                </div>
              </div>
            </div>

            <div className="horizontalDivider"></div>

            {/* File Upload Section */}
            <div
              className="uploadFileSectionWrapper"
              onClick={handleButtonClick}>
              <div
                className="uploadFileSection"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  const droppedFiles = Array.from(e.dataTransfer.files);
                  handleChangeInput({ target: { files: droppedFiles } });
                }}>
                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  className="uploadFileInput"
                  type="file"
                  accept={`.${requiredFormat}`}
                  multiple
                  onChange={(event) => handleChangeInput(event)}
                  style={{ display: "none" }}
                />

                <div className="inputFilesTextWrapper">
                  <div className="inputFilesHeading">
                    Drag and drop files or click to select files to upload.
                  </div>
                  <div className="inputFilesSubheading">
                    Select files up to 10MB
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Files */}
            {files?.length ? (
              <div className="fileCardSectionWrapper">
                {files.map((file) => (
                  <FileCard
                    key={file.name}
                    file={file}
                    removeFile={removeFile}
                  />
                ))}
              </div>
            ) : null}

            {/* Convert File  */}
            <section className="convertbuttonWrapper">
              <button
                className="uploadFilesButton"
                onClick={() => {
                  setFiles([]);
                  handleActiveStepChange(ACTIVE_STEPS.SELECT_FILE_FORMAT);
                }}>
                Go Back
              </button>
              <button className="uploadFilesButton">Convert</button>
            </section>
          </>
        ) : null}
      </main>
    </div>
  );
}
