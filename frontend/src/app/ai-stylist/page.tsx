'use client';

import { useState, FormEvent } from 'react';

interface AiSuggestion {
  source: string;
  prompt: string;
  base_image_url?: string;
  output_url: string;
  message: string;
}

export default function AiStylistPage() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // For user-uploaded image or URL
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [suggestions, setSuggestions] = useState<AiSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0])); // Preview
    } else {
      setImageFile(null);
      setImageUrl('');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuggestions([]);

    let finalImageUrl = imageUrl;
    // If a file is selected, ideally upload it first and get a URL
    // For this example, we'll assume the backend can handle a placeholder or the python script can take a local path if that's how it's set up
    // In a real app, you'd upload imageFile to a service (e.g., Supabase storage, S3) and get back a URL to pass to the AI.
    if (imageFile) {
      // finalImageUrl = await uploadImageAndGetURL(imageFile); // Placeholder for actual upload function
      console.log("Image file selected, but using direct URL or placeholder for AI backend call for now.");
      // For the placeholder script that doesn't actually use the image data, a data URL or local path might be faked
      // but for real AI APIs, a public URL is usually needed.
      // For now, if a URL was also typed, it will be used. Otherwise, this part needs proper image upload.
    }

    try {
      const response = await fetch('/api/proxy/ai/generate-outfit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, image_url: finalImageUrl || undefined }), // Pass image_url if provided
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to get AI suggestions');
      }
      const data = await response.json();
      setSuggestions(data as AiSuggestion[]);
    } catch (err: any) {
      setError(err.message);
      console.error("Error getting AI suggestions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">AI Outfit Stylist</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 bg-white p-8 rounded-lg shadow-md">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">Describe your desired outfit or style *</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            rows={3}
            placeholder="e.g., 'A casual summer outfit for a picnic', 'Help me style these red boots'"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Reference Image URL (Optional - for virtual try-on or style matching)</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => {setImageUrl(e.target.value); setImageFile(null);}}
            placeholder="https://example.com/image.jpg (or upload below)"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700">Or Upload Reference Image (Optional)</label>
          <input
            type="file"
            id="imageFile"
            accept="image/*"
            onChange={handleImageFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {imageUrl && imageFile && <img src={imageUrl} alt="Preview" className="mt-2 max-h-48 rounded" />}
        </div>

        {error && <p className="text-sm text-red-600 p-3 bg-red-100 rounded-md">Error: {error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
        >
          {isLoading ? 'Getting Suggestions...' : 'Get AI Outfit Suggestions'}
        </button>
      </form>

      {suggestions.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Suggestions:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.map((sug, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <img 
                    src={sug.output_url.startsWith('http') ? sug.output_url : `http://localhost:3000${sug.output_url}`} 
                    alt={`AI Suggestion ${index + 1}`} 
                    className="w-full h-64 object-cover rounded-md mb-3"
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300x300.png?text=Image+Not+Found'; }} // Fallback image
                />
                <h3 className="text-lg font-semibold">{sug.source} Suggestion</h3>
                <p className="text-sm text-gray-600">{sug.message}</p>
                {sug.base_image_url && <p className="text-xs text-gray-500 mt-1">Based on: {sug.base_image_url}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 