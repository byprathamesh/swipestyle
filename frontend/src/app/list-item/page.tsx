'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // Corrected import for App Router

// Assuming you have a way to get the current user's ID, e.g., from a context or session
const getCurrentUserId = () => 'user123'; // Placeholder

export default function ListItemPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('tops');
  const [size, setSize] = useState('');
  const [brand, setBrand] = useState('');
  const [condition, setCondition] = useState<'new' | 'like-new' | 'good' | 'fair' | 'used'>('good');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!imageFile) {
      setError('Please upload an image for the item.');
      setIsLoading(false);
      return;
    }

    // Placeholder for image upload logic (e.g., to Supabase Storage, Cloudinary, etc.)
    // This should return a public URL for the image.
    const imageUrl = `/placeholder-uploads/${imageFile.name}`; // Replace with actual upload
    console.log('Simulating image upload to:', imageUrl);

    const newItem = {
      userId: getCurrentUserId(),
      title,
      description,
      category,
      size,
      brand,
      condition,
      imageUrl,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      availability: 'available',
    };

    try {
      // Replace with actual API call to your backend
      const response = await fetch('/api/proxy/items', { // Use proxy
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to list item');
      }

      console.log('Item listed successfully:', await response.json());
      router.push('/'); // Redirect to homepage or user's items page
    } catch (err: any) {
      setError(err.message);
      console.error('Failed to list item:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">List an Item for Swap</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description *</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category *</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="tops">Tops</option>
            <option value="bottoms">Bottoms</option>
            <option value="dresses">Dresses</option>
            <option value="outerwear">Outerwear</option>
            <option value="accessories">Accessories</option>
            <option value="shoes">Shoes</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700">Size</label>
          <input
            type="text"
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="e.g., M, UK 12, US 8"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condition *</label>
          <select
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value as any)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="new">New (with tags)</option>
            <option value="like-new">Like New (worn once or twice)</option>
            <option value="good">Good (gentle use)</option>
            <option value="fair">Fair (visible wear)</option>
            <option value="used">Used (noticeable flaws, described)</option>
          </select>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image *</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {imageFile && <p className="text-xs text-gray-500 mt-1">Selected: {imageFile.name}</p>}
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., vintage, summer, cotton"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {error && <p className="text-sm text-red-600">Error: {error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
        >
          {isLoading ? 'Listing Item...' : 'List Item for Swap'}
        </button>
      </form>
    </div>
  );
} 