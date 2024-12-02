import React from "react";
import { getFileIcon, getFileSize } from "./util/fileUtil";
import Image from "next/image";
import deleteFile from "./static/images/icons/fileIcons/delete-file.svg";

export default function FileCard(props) {
  const { file, removeFile } = props;
  const { name, size } = file || {};
  const fileType = name?.split(".")[1];
  const icon = getFileIcon(fileType);
  const fileSize = getFileSize(size);

  return (
    <div className="fileCardWrapper">
      <div className="fileCardWrapperContent">
        <div className="fileCardWrapperLeftSide">
          <div className="fileCardWrapperLeftSideExtensionIcon">
            <Image src={icon} width={50} height={50} alt={"extension-icon"} />
          </div>
        </div>
        <div className="fileCardWrapperRightSide">
          <div className="fileCardWrapperRightSideFileName">{name}</div>
          <div className="fileCardWrapperRightSideFileDetails">{fileSize}</div>
        </div>
        <div className="removeFileIcon" onClick={() => removeFile(name)}>
          <Image
            src={deleteFile}
            width={20}
            height={20}
            alt={"extension-icon"}
          />
        </div>
      </div>
    </div>
  );
}
