'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface UserPreferences {
  gender?: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say' | string;
  age?: number | string;
  height?: number | string; // cm
  weight?: number | string; // kg
  budget?: 'low' | 'medium' | 'high' | 'flexible' | string;
  // Add other preferences like style preferences, favorite brands etc. later
}

// Placeholder for actual user ID management
const getCurrentUserId = () => 'user123';

export default function PreferencesPage() {
  const router = useRouter();
  const [preferences, setPreferences] = useState<UserPreferences>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreferences = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/proxy/preferences?userId=${getCurrentUserId()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch preferences');
        }
        const data = await response.json();
        setPreferences(data.preferences || {}); // Assuming backend returns { preferences: { ... } }
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching preferences:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPreferences();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let processedValue: any = value;
    if (type === 'number') {
      processedValue = value === '' ? '' : parseFloat(value);
    }
    setPreferences(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const response = await fetch('/api/proxy/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: getCurrentUserId(), preferences }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save preferences');
      }
      setSuccessMessage('Preferences saved successfully!');
      // Optionally, refetch preferences or update state from response
      // const data = await response.json();
      // setPreferences(data.preferences || {});
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.message);
      console.error('Error saving preferences:', err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto p-4 text-center">Loading preferences...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Preferences</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        {error && <p className="text-sm text-red-600 p-3 bg-red-100 rounded-md">Error: {error}</p>}
        {successMessage && <p className="text-sm text-green-600 p-3 bg-green-100 rounded-md">{successMessage}</p>}

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            id="gender"
            value={preferences.gender || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="non-binary">Non-binary</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            id="age"
            value={preferences.age || ''}
            onChange={handleChange}
            min="13"
            placeholder="e.g., 25"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height (cm)</label>
          <input
            type="number"
            name="height"
            id="height"
            value={preferences.height || ''}
            onChange={handleChange}
            placeholder="e.g., 170"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            id="weight"
            value={preferences.weight || ''}
            onChange={handleChange}
            placeholder="e.g., 65"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget Preference</label>
          <select
            name="budget"
            id="budget"
            value={preferences.budget || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Budget</option>
            <option value="low">Low (budget-friendly)</option>
            <option value="medium">Medium (average prices)</option>
            <option value="high">High (premium/designer)</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
        >
          {isSaving ? 'Saving...' : 'Save Preferences'}
        </button>
      </form>
      <div className="mt-6 text-center">
        <button onClick={() => router.back()} className="text-indigo-600 hover:text-indigo-800">
          &larr; Go Back
        </button>
      </div>
    </div>
  );
} 