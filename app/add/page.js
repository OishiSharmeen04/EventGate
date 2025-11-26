'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { eventsAPI } from '@/lib/api';

export default function AddEventPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    shortDesc: '',
    fullDesc: '',
    price: '',
    date: '',
    location: '',
    category: '',
    image: ''
  });
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await eventsAPI.create(formData);

      if (data.success) {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          setFormData({
            title: '',
            shortDesc: '',
            fullDesc: '',
            price: '',
            date: '',
            location: '',
            category: '',
            image: ''
          });
        }, 2000);
      }
    } catch (err) {
      setError(err.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
      {showToast && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          ✓ Event added successfully!
        </div>
      )}
      <div className="max-w-3xl mx-auto pt-8">
        <Link href="/" className="mb-6 text-gray-600 hover:text-gray-900 flex items-center space-x-2">
          <span>← Back to Home</span>
        </Link>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Add New Event</h2>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="Summer Music Festival 2024"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Short Description *</label>
              <input
                type="text"
                required
                value={formData.shortDesc}
                onChange={(e) => setFormData({...formData, shortDesc: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="Brief description (1-2 lines)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Description *</label>
              <textarea
                rows="5"
                required
                value={formData.fullDesc}
                onChange={(e) => setFormData({...formData, fullDesc: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                placeholder="Detailed event description..."
              ></textarea>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                <input
                  type="text"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  placeholder="$99"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                <input
                  type="text"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  placeholder="July 15-17, 2024"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  placeholder="Central Park, NYC"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                >
                  <option value="">Select category</option>
                  <option value="Music">Music</option>
                  <option value="Conference">Conference</option>
                  <option value="Sports">Sports</option>
                  <option value="Food">Food</option>
                  <option value="Art">Art</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image Emoji (Optional)</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="🎵"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding Event...' : 'Add Event'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}