import React, { useCallback, useMemo } from "react";
import { useDropzone, DropzoneRootProps } from "react-dropzone";
import "../../../../styles/css/UploadFile.css";
import { uniqueId } from "lodash";
import filesize from "filesize";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#000",
  outline: "none",
  transition: "border .24s ease-in-out",
  with: 100,
  height: 100
};

const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};

interface Props {
  setFiles: React.Dispatch<any>;
  files: any;
}

export const UploadFile: React.FC<Props> = ({ setFiles, files }) => {
  const onDrop = useCallback(acceptedFiles => {}, []);

  const onDropAccepted = (file: any) => {
    const uploadedFiles = file.map((file: any) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }));

    setFiles(files.concat(uploadedFiles));
  };

  const maxSize = 1048576;

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
    acceptedFiles,
    rejectedFiles,
    isDragAccept
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    minSize: 0,
    maxSize,
    multiple: true,
    onDropAccepted
  });

  const style: DropzoneRootProps | undefined = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragAccept, isDragActive, isDragReject]
  );

  const isFileTooLarge =
    rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

  return (
    <div className="container-fluid text-center mt-5 ">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />

        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {!isDragActive && "Click here or drop a image to upload!"}
          {isDragActive && !isDragReject && "Drop it like it's hot!"}
          {isDragReject && "File type not accepted,sorry!"}
          {isFileTooLarge && (
            <div className="text-danger mt-2">File is to large.</div>
          )}
        </div>
      </div>

      <ul className="container-preview">
        {!!files.length &&
          files.map((file: any) => (
            <li key={file.id}>
              <div className="file-info">
                <img className="preview" src={file.preview} alt="preview" />
                <div className="preview-body">
                  <strong>{file.name}</strong>
                  <span className="file-size">
                    {file.readableSize}
                    {!!file.url && (
                      <button className="delete-button" onClick={() => {}}>
                        Excluir
                      </button>
                    )}
                  </span>
                </div>
              </div>
              <div></div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UploadFile;
