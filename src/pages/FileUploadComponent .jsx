import React, { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";

const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [responseFiles, setResponseFiles] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    setUploadStatus("uploading");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "http://manavmandal.pythonanywhere.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload successful:", response.data);
      setUploadStatus("success");
      setResponseFiles(response.data.files || []);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("failed");
    }
  };

  const deleteFile = () => {
    setSelectedFile(null);
    setUploadStatus("idle");
    setResponseFiles([]);
  };

  const handleSplitAndDownload = async () => {
    try {
      const response = await axios.post(
        "http://manavmandal.pythonanywhere.com/split",
        { file: selectedFile },
        {
          responseType: "blob",
        }
      );

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.setAttribute("download", "split_files.zip");
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error("Split and download failed:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <div className="row">
          <h1 className="mb-5">Upload Files</h1>
          <div className="col-md-6">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="form-control mb-3"
            />
            {selectedFile && (
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{selectedFile.name}</h5>
                  {uploadStatus === "idle" && (
                    <>
                      <button
                        className="btn btn-danger me-2"
                        onClick={deleteFile}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={handleUpload}
                        disabled={uploadStatus === "uploading"}
                      >
                        {uploadStatus === "uploading"
                          ? "Uploading..."
                          : "Upload"}
                      </button>
                    </>
                  )}
                  {uploadStatus === "success" && (
                    <span className="text-success">Upload Successful!</span>
                  )}
                  {uploadStatus === "failed" && (
                    <span className="text-danger">Upload Failed!</span>
                  )}
                </div>
              </div>
            )}
            {responseFiles.length > 0 && (
              <div className="mt-3">
                <h2>Response Files:</h2>
                <ul className="list-group">
                  {responseFiles.map((file, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {file.name}
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          const downloadLink = document.createElement("a");
                          downloadLink.href = file.url;
                          downloadLink.setAttribute("download", file.name);
                          document.body.appendChild(downloadLink);
                          downloadLink.click();
                          document.body.removeChild(downloadLink);
                        }}
                      >
                        Download
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {uploadStatus === "success" && (
            <div className="col-md-6">
              <button
                className="btn btn-success"
                onClick={handleSplitAndDownload}
              >
                Split & Download
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FileUploadComponent;
