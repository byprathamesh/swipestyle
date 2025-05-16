import React, { useState } from 'react';

const ImageScanner = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [detectedItems, setDetectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setDetectedItems([]);
    setError(null);
  };

  const handleScanImage = async () => {
    if (!selectedFile) {
      setError('Please select an image file first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setDetectedItems([]);

    const formData = new FormData();
    formData.append('image_file', selectedFile);
    // It's highly recommended to use environment variables for API keys.
    const ximilarApiToken = process.env.NEXT_PUBLIC_XIMILAR_API_TOKEN;

    if (!ximilarApiToken || ximilarApiToken === 'YOUR_XIMILAR_API_TOKEN') {
      setError('Ximilar API token is not configured. Please set NEXT_PUBLIC_XIMILAR_API_TOKEN.');
      setIsLoading(false);
      return;
    }

    try {
      // USER ACTION REQUIRED:
      // 1. VERIFY this endpoint. Your original prompt mentioned 'https://fashion.ximilar.com/recognize'.
      //    This example uses '/v2/detect' which is common for object detection.
      //    The correct endpoint depends on the specific Ximilar Fashion API product you are using for recognition.
      // 2. VERIFY the Authorization header format (e.g., 'Token YOUR_TOKEN' or 'Bearer YOUR_TOKEN').
      const response = await fetch('https://fashion.ximilar.com/recognize/v2/detect', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${ximilarApiToken}`,
          // 'Content-Type': 'multipart/form-data' // Usually set automatically by browser for FormData
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `API request failed with status ${response.status}`);
      }

      const data = await response.json();
      // USER ACTION REQUIRED:
      // The following parsing logic is a BEST GUESS based on common Ximilar API structures.
      // You MUST verify the actual JSON response structure from the Ximilar API endpoint you are using
      // and update the parsing logic below accordingly. Log the 'data' object to see its structure.
      // console.log('Ximilar API Response Data:', JSON.stringify(data, null, 2));

      if (data && data.records && data.records[0] && data.records[0]._tags_map_full) {
        // This structure is often seen for fashion tagging where an image has overall tags.
        const tags = data.records[0]._tags_map_full;
        const items = Object.entries(tags).map(([name, confidence]) => ({
          name,
          confidence: parseFloat(confidence).toFixed(2),
        }));
        setDetectedItems(items);
      } else if (data && data._objects && data._objects.length > 0) {
        // This structure is common if the API detects multiple objects with bounding boxes.
        const items = data._objects.map(obj => ({
          name: obj.name, // Or obj.label, obj.class_name, etc.
          confidence: parseFloat(obj.confidence).toFixed(2),
          // bound_box: obj.bound_box // If you need the bounding box
        }));
        setDetectedItems(items);
      } else {
        // Fallback or if the structure is different for the "recognize" endpoint
        setError('Could not parse detected items from API response. Please check the Ximilar API documentation and response structure.');
        console.warn('Unexpected Ximilar API response structure:', data);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Image Scanner</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleScanImage} disabled={isLoading}>
        {isLoading ? 'Scanning...' : 'Scan Image'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {isLoading && <p>Loading...</p>}

      {detectedItems.length > 0 && (
        <div>
          <h3>Detected Items:</h3>
          <ul>
            {detectedItems.map((item, index) => (
              <li key={index}>
                {item.name}: {item.confidence * 100}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageScanner; 