'use client';

import { useState, FormEvent } from 'react';

interface ProductPriceInfo {
  title: string;
  price_str?: string;
  price_float?: number;
  link?: string;
  source?: string;
  quality_score?: number; // 0-1 hypothetical score
  // Add other relevant fields from your Python script output
}

interface PriceComparisonResponse {
  query: string;
  ranked_products: ProductPriceInfo[];
  deals?: any[]; // Or a more specific type for deals
}

export default function PriceCheckerPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PriceComparisonResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/proxy/price-compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to fetch price comparisons');
      }
      const data = await response.json();
      setResults(data as PriceComparisonResponse);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching price comparisons:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Price Checker</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 bg-white p-8 rounded-lg shadow-md mb-8">
        <div>
          <label htmlFor="query" className="block text-sm font-medium text-gray-700">Enter product name or keywords *</label>
          <input
            type="text"
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
            placeholder="e.g., 'white nike sneakers size 8', 'summer dress floral'"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
        >
          {isLoading ? 'Checking Prices...' : 'Find Best Prices'}
        </button>
        {error && <p className="mt-3 text-sm text-red-600 p-3 bg-red-100 rounded-md">Error: {error}</p>}
      </form>

      {results && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Price Comparison for: <span className="font-normal">{results.query}</span></h2>
          {results.ranked_products && results.ranked_products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality (Score)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {results.ranked_products.map((product, index) => (
                    <tr key={index} className={`${index < 3 ? 'bg-green-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" title={product.title}>{product.title.substring(0,50)}{product.title.length > 50 ? '...' : ''}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.price_str || (product.price_float ? `$${product.price_float.toFixed(2)}` : 'N/A')}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.source || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quality_score !== undefined ? product.quality_score.toFixed(2) : 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {product.link ? <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">View Item &rarr;</a> : 'No link'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {results.ranked_products.length > 3 && <p className="text-xs mt-2 text-gray-500">Showing top {results.ranked_products.length} results based on price and quality score.</p>}
              {results.ranked_products.length <= 3 && <p className="text-xs mt-2 text-gray-500">Top {results.ranked_products.length} result(s) shown.</p>}
            </div>
          ) : (
            <p>No products found for this query.</p>
          )}
          {/* Placeholder for deals if you choose to display them */}
          {/* {results.deals && results.deals.length > 0 && ... } */}
        </div>
      )}
    </div>
  );
} 