"use client";


import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [files, setFiles] = useState(null);

    const handleFileChange = (event) => {
        setFiles(event.target.files);
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        try {
            await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Files uploaded successfully');
        } catch (error) {
            console.error('Error uploading files:', error);
            alert('Error uploading files');
        }
    };

    const handleAskQuestion = async () => {
        try {
            const result = await axios.post('/ask', { question });
            setResponse(result.data.response);
        } catch (error) {
            console.error('Error asking question:', error);
            alert('Error asking question');
        }
    };

    return (
      <div className="min-h-screen bg-gray-100 p-6">
          <h1 className="text-8xl font-bold mb-6 text-center">CHAT WITH MULTIPLE PDF</h1>
          <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md ">
              <input 
                  type="file" 
                  multiple 
                  onChange={handleFileChange} 
                  className="w-full mb-4 p-2 border rounded-md"
              />
              <button 
                  onClick={handleFileUpload}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
              >
                  Submit & Process
              </button>

              <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a Question from the PDF Files"
                  className="w-full mb-4 p-2 border rounded-md"
              />
              <button
                  onClick={handleAskQuestion}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-md mb-4"
              >
                  Ask
              </button>

              {response && 
                  <div className="mt-4 p-4 bg-gray-100 rounded-md">
                      <strong>AI:</strong> {response}
                  </div>
              }
          </div>
      </div>
  );
};

export default Home;
