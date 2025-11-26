'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Calendar, MapPin, Filter } from 'lucide-react';
import { eventsAPI } from '@/lib/api';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = ['All', 'Music', 'Conference', 'Food', 'Sports', 'Art', 'Entertainment'];

  // Fetch events from backend
  useEffect(() => {
    fetchEvents();
  }, [selectedCategory, searchTerm]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError('');
      
      const data = await eventsAPI.getAll({
        category: selectedCategory,
        search: searchTerm
      });

      setEvents(data.events || []);
    } catch (err) {
      setError(err.message || 'Failed to load events');
      console.error('Fetch events error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Discover Events
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore amazing events happening around you. Book your tickets now!
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="mb-10 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search events by name, location, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 text-lg shadow-sm hover:shadow-md transition-all bg-white"
            />
          </div>

          {/* Category Filter */}
          <div className="bg-white rounded-2xl shadow-md p-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Filter className="w-5 h-5 text-indigo-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Filter by Category</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                    (category === 'All' && selectedCategory === '') || selectedCategory === category
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-5 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-700 shadow-sm">
            <p className="font-medium">⚠️ {error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
            <p className="mt-6 text-gray-600 text-lg font-medium">Loading amazing events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No events found</h3>
            <p className="text-gray-600 text-lg mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-semibold"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6 text-center">
              <p className="text-gray-600 text-lg">
                Found <span className="font-bold text-indigo-600">{events.length}</span> amazing {events.length === 1 ? 'event' : 'events'}
              </p>
            </div>

            {/* Events Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div key={event._id} className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3">
                  {/* Event Image */}
                  <div className="h-56 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center overflow-hidden relative">
                    {event.image && event.image.startsWith('http') ? (
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-8xl" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji"' }}>
                        {event.image || '🎫'}
                      </span>
                    )}
                    <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
                      <span className="text-xl font-bold text-indigo-600">{event.price}</span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold uppercase tracking-wide">
                        {event.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                      {event.shortDesc}
                    </p>
                    
                    <div className="space-y-2.5 mb-5">
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-indigo-500" />
                        <span className="font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-indigo-500" />
                        <span className="font-medium line-clamp-1">{event.location}</span>
                      </div>
                    </div>
                    
                    <Link 
                      href={`/events/${event._id}`} 
                      className="block w-full px-5 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold text-center shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}