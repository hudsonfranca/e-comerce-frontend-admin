import React, { useCallback, useMemo, useEffect, useState } from "react";
import { useDropzone, DropzoneRootProps } from "react-dropzone";
import "../../../../styles/css/UploadFile.css";
import { uniqueId } from "lodash";
import filesize from "filesize";
import api from "../../../../services/Api";

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
  updateId?: number | null;
}

export const UploadFile: React.FC<Props> = ({ setFiles, files, updateId }) => {
  const onDrop = useCallback(acceptedFiles => {}, []);

  const onDropAccepted = (file: any) => {
    const uploadedFiles = file.map((file: any) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file)
    }));

    setFiles(files.concat(uploadedFiles));
  };

  const [imagesDB, setImagesDB] = useState<{ id: number; url: string }[]>([]);

  useEffect(() => {
    if (updateId) {
      const loadImagesFromDB = async () => {
        try {
          const { data } = await api.get(`/api/products/${updateId}`);
          setImagesDB(data.Images);
        } catch (err) {
          console.log(err);
        }
      };
      loadImagesFromDB();
    }
  }, []);

  const maxSize = 1048576;

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
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

  async function handleDeleteFromDB(id: number) {
    try {
      await api.delete(`/api/images/${id}`).then(async () => {
        const { data } = await api.get(`/api/products/${updateId}`);
        setImagesDB(data.Images);
      });
    } catch (err) {
      console.log(err);
    }
  }

  function handleDelete(id: number) {
    setFiles(files.filter((file: any) => file.id !== id));
  }

  return (
    <div className="container-fluid text-center mt-5 ">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />

        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {!isDragActive && "Click here or drop a image to upload!"}
          {isDragActive && !isDragReject && "OK"}
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

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(file.id)}
                    >
                      Excluir
                    </button>
                  </span>
                </div>
              </div>
              <div></div>
            </li>
          ))}

        {!!imagesDB.length &&
          imagesDB.map(({ id, url }) => {
            const fileName = url.substring(28);
            return (
              <li key={id}>
                <div className="file-info">
                  <img className="preview" src={url} alt="preview" />
                  <div className="preview-body">
                    <strong>{fileName}</strong>
                    <span className="file-size">
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteFromDB(id)}
                      >
                        Excluir
                      </button>
                    </span>
                  </div>
                </div>
                <div></div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default UploadFile;
