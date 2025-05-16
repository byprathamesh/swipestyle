import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient'; // Corrected path assuming lib is at src/lib

const SegmindTryOnComponent = ({ userId, productImageUrl, productId }) => {
  const [selectedAvatar, setSelectedAvatar] = useState('avatar1');
  const [tryOnPreviewUrl, setTryOnPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const avatars = [
    { id: 'avatar1', name: 'Avatar 1', imageUrl: '/assets/avatars/avatar1.png' },
    { id: 'avatar2', name: 'Avatar 2', imageUrl: '/assets/avatars/avatar2.png' },
    { id: 'avatar3', name: 'Avatar 3', imageUrl: '/assets/avatars/avatar3.png' },
  ];

  const fetchTryOnImage = async (avatarIdForApi, garmentImageUrlForApi) => {
    setIsLoading(true);
    setError(null);
    setTryOnPreviewUrl(null);

    // USER ACTION REQUIRED:
    // 1. Ensure NEXT_PUBLIC_SEGMIND_API_KEY is set in your environment variables.
    // 2. VERIFY the segmindApiUrl is correct for the Try-On Diffusion API you are using.
    // 3. VERIFY the Authorization header format (e.g., 'Bearer YOUR_TOKEN' or 'x-api-key: YOUR_TOKEN').
    // 4. VERIFY the exact JSON body structure Segmind API expects (e.g., field names for model/avatar image, garment image, garment type, etc.).
    const segmindApiKey = process.env.NEXT_PUBLIC_SEGMIND_API_KEY;
    const segmindApiUrl = 'https://api.segmind.com/v1/tryondiffusion'; // Verify this endpoint!

    if (!segmindApiKey || segmindApiKey === 'YOUR_SEGMIND_API_KEY') {
      setError('Segmind API key is not configured. Please set NEXT_PUBLIC_SEGMIND_API_KEY.');
      setIsLoading(false);
      return null;
    }

    // Example model_image_url - you might get this from a selected avatar object more dynamically
    const currentAvatar = avatars.find(a => a.id === avatarIdForApi);
    if (!currentAvatar) {
        setError(`Avatar with id ${avatarIdForApi} not found.`);
        setIsLoading(false);
        return null;
    }
    const modelImageUrlForApi = currentAvatar.imageUrl; // This assumes imageUrl is a public URL Segmind can access

    try {
      const response = await fetch(segmindApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${segmindApiKey}`, // Verify: Could be 'x-api-key': segmindApiKey
        },
        body: JSON.stringify({
          // USER ACTION REQUIRED: Confirm these field names with Segmind documentation
          model_image_url: modelImageUrlForApi, 
          garment_image_url: garmentImageUrlForApi,
          // Add other parameters as required by Segmind API (e.g., garment_type: "dress", etc.)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => response.text()); // Try to parse JSON, fallback to text
        console.error('Segmind API Raw Error Response:', errorData);
        throw new Error( (typeof errorData === 'string' ? errorData : errorData.message) || `Segmind API request failed: ${response.status}`);
      }

      const result = await response.json();
      // USER ACTION REQUIRED: Confirm the key for the output image URL (e.g., result.image_url, result.output_url, etc.)
      if (result && result.image_url) { 
        setTryOnPreviewUrl(result.image_url);
        return result.image_url;
      } else {
        throw new Error('Invalid response structure from Segmind API');
      }
    } catch (err) {
      console.error('Segmind API error:', err);
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryOn = async () => {
    if (!productImageUrl || !productId) {
      setError('Product image URL or Product ID is missing for try-on.');
      return;
    }

    // USER ACTION REQUIRED:
    // The following Supabase caching logic is a template.
    // 1. Ensure your Supabase client (`supabase`) is correctly initialized and imported.
    // 2. VERIFY that `productId` prop corresponds to the correct primary key or unique identifier in your 'products' table (e.g., 'id' or 'ximilar_id').
    // 3. Test the JSONB update logic thoroughly.
    // 4. Uncomment the blocks below to enable caching.

    // if (!supabase) {
    //   console.warn('Supabase client not initialized. Skipping cache. Ensure supabaseClient.js is configured.');
    //   // Call API without caching if Supabase isn't available
    //   await fetchTryOnImage(selectedAvatar, productImageUrl);
    //   return;
    // }

    try {
      // // 1. Check Supabase cache first
      // console.log(`Attempting to fetch product with ID: ${productId} for cache lookup.`);
      // const { data: productData, error: fetchError } = await supabase
      //   .from('products') // Make sure 'products' is your table name
      //   .select('try_on_cache')
      //   .eq('id', productId) // IMPORTANT: Use 'id' if productId is the integer PK, or 'ximilar_id' if that's what you pass
      //   .single();

      // if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116: row not found, which is fine for caching (means cache miss)
      //   console.error('Supabase cache read error:', fetchError);
      //   // Potentially throw fetchError or just proceed to API call
      // }

      // let currentProductCache = null;
      // if (productData && productData.try_on_cache) {
      //    currentProductCache = productData.try_on_cache;
      //    if (currentProductCache[selectedAvatar]) {
      //      const cachedResult = currentProductCache[selectedAvatar];
      //      // Optional: Add cache expiry logic here if needed
      //      // const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes
      //      // if (new Date() - new Date(cachedResult.cachedAt) < CACHE_DURATION_MS) {
      //        console.log('Using cached try-on image from Supabase for avatar:', selectedAvatar);
      //        setTryOnPreviewUrl(cachedResult.tryOnImageUrl);
      //        return;
      //      // }
      //    }
      // }

      // 2. If not in cache or cache expired, call API
      console.log(`Fetching new try-on image for product ${productId} and avatar ${selectedAvatar}`);
      const newTryOnUrl = await fetchTryOnImage(selectedAvatar, productImageUrl);

      // // 3. Cache the new result in Supabase
      // if (newTryOnUrl && supabase) {
      //   const newCacheEntry = {
      //       tryOnImageUrl: newTryOnUrl,
      //       cachedAt: new Date().toISOString(),
      //       avatarUsed: selectedAvatar
      //   };
      //   
      //   const updatedCacheForAvatar = { ...currentProductCache, [selectedAvatar]: newCacheEntry };

      //   const { error: updateError } = await supabase
      //     .from('products')
      //     .update({ try_on_cache: updatedCacheForAvatar, last_updated: new Date().toISOString() })
      //     .eq('id', productId); // IMPORTANT: Use 'id' or 'ximilar_id' as appropriate

      //   if (updateError) {
      //     console.error('Supabase cache write error:', updateError);
      //     // Potentially throw updateError or just log it
      //   }
      //   console.log('Cached new try-on image to Supabase.');
      // }
    } catch (err) {
      console.error('Error during try-on process or Supabase caching:', err);
      setError('Failed to perform try-on or cache result. ' + (err.message || err.details || 'Unknown error'));
    }
  };

  return (
    <div>
      <h4>Virtual Try-On</h4>
      <div>
        <h5>Select Avatar:</h5>
        {avatars.map(avatar => (
          <button
            key={avatar.id}
            onClick={() => setSelectedAvatar(avatar.id)}
            style={{
                border: selectedAvatar === avatar.id ? '2px solid blue' : '1px solid grey',
                padding: '5px', margin: '5px'
            }}
          >
            <img src={avatar.imageUrl} alt={avatar.name} style={{ width: '50px', height: 'auto' }} />
            <p>{avatar.name}</p>
          </button>
        ))}
      </div>
      <button onClick={handleTryOn} disabled={isLoading || !productImageUrl}>
        {isLoading ? 'Generating Preview...' : 'Try On This Item'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {isLoading && (
        <div>
          <p>Loading preview...</p>
          <div style={{ width: '200px', height: '300px', backgroundColor: '#e0e0e0', margin: '10px 0' }}></div>
        </div>
      )}
      {tryOnPreviewUrl && !isLoading && (
        <div>
          <h5>Try-On Preview:</h5>
          <img src={tryOnPreviewUrl} alt="Try-on preview" style={{ maxWidth: '300px', maxHeight: '450px', border: '1px solid #ccc' }} />
        </div>
      )}
    </div>
  );
};

export default SegmindTryOnComponent; 