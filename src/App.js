import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import GazeVisualisation from './components/GazeVisualisation';
import { parseCSV } from './utils/parseCSV';

const App = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (file) => {
    parseCSV(file, setData);
  };

  return (
    <div>
      <h1>Gaze Data Visualization</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <GazeVisualisation data={data} />
    </div>
  );
};

export default App;

