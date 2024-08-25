// src/components/FileUpload.js

import React from 'react';

const FileUpload = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileUpload(file);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
