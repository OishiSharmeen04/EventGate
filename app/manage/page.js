'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Eye, Trash2, Plus } from 'lucide-react';
import { eventsAPI } from '@/lib/api';

export default function ManageEventsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (session) {
      fetchUserEvents();
    }
  }, [session]);

  const fetchUserEvents = async () => {
    try {
      setLoading(true);
      const data = await eventsAPI.getUserEvents();
      setEvents(data.events || []);
    } catch (err) {
      setError(err.message || 'Failed to load events');
      console.error('Fetch user events error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="mt-6 text-gray-600 text-lg font-medium">Loading your events...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      await eventsAPI.delete(id);
      setEvents(events.filter(e => e._id !== id));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      alert(err.message || 'Failed to delete event');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 pt-20 pb-12 px-4">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center space-x-3 animate-slide-in">
          <span className="text-2xl">✓</span>
          <span className="font-semibold">Event deleted successfully!</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto pt-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors mb-6 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">My Events</h1>
              <p className="text-gray-600 text-lg">Manage all your created events</p>
            </div>
            <Link
              href="/add"
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Event</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {error && (
            <div className="m-6 p-5 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-700">
              <p className="font-medium">⚠️ {error}</p>
            </div>
          )}

          {events.length === 0 ? (
            <div className="text-center py-20 px-6">
              <div className="text-8xl mb-6">📅</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No events yet</h3>
              <p className="text-gray-600 text-lg mb-8">Start by creating your first event</p>
              <Link 
                href="/add" 
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                <span>Create Your First Event</span>
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Event</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {events.map((event) => (
                      <tr key={event._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-4">
                            {/* Image/Emoji */}
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center overflow-hidden flex-shrink-0">
                              {event.image && event.image.startsWith('http') ? (
                                <img 
                                  src={event.image} 
                                  alt={event.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-3xl" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji"' }}>
                                  {event.image || '🎫'}
                                </span>
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-lg">{event.title}</p>
                              <p className="text-sm text-gray-500">{event.location}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold uppercase tracking-wide">
                            {event.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-900 font-bold text-lg">{event.price}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-600 font-medium">{event.date}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <Link 
                              href={`/events/${event._id}`}
                              className="inline-flex items-center space-x-1 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-medium"
                            >
                              <Eye className="w-4 h-4" />
                              <span>View</span>
                            </Link>
                            <button
                              onClick={() => handleDelete(event._id)}
                              className="inline-flex items-center space-x-1 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden p-4 space-y-4">
                {events.map((event) => (
                  <div key={event._id} className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-indigo-300 transition-all">
                    <div className="flex">
                      {/* Image */}
                      <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {event.image && event.image.startsWith('http') ? (
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-4xl" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji"' }}>
                            {event.image || '🎫'}
                          </span>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-gray-900 text-lg line-clamp-1">{event.title}</h3>
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold ml-2">
                            {event.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{event.location}</p>
                        <p className="text-sm text-gray-600 mb-3">{event.date}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-indigo-600">{event.price}</span>
                          <div className="flex space-x-2">
                            <Link 
                              href={`/events/${event._id}`}
                              className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(event._id)}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Stats */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-t border-gray-200">
                <p className="text-center text-gray-700 font-medium">
                  Total Events: <span className="font-bold text-indigo-600">{events.length}</span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}