'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, MapPin, ArrowLeft, Clock, Users, Tag, Share2, Heart } from 'lucide-react';
import { eventsAPI } from '@/lib/api';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchEvent();
    }
  }, [params.id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const data = await eventsAPI.getById(params.id);
      setEvent(data.event);
    } catch (err) {
      setError(err.message || 'Failed to load event');
      console.error('Fetch event error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.shortDesc,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="mt-6 text-gray-600 text-lg font-medium">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center pt-20">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-md">
          <div className="text-7xl mb-6">😕</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h2>
          <p className="text-gray-600 mb-8 text-lg">{error || 'This event does not exist or has been removed'}</p>
          <button
            onClick={() => router.push('/events')}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Browse All Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/events')}
          className="mb-8 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-indigo-300 transition-all flex items-center space-x-2 font-medium text-gray-700 shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Events</span>
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Hero Image Section */}
          <div className="relative h-96 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
            {event.image && event.image.startsWith('http') ? (
              <>
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </>
            ) : (
              <span className="text-9xl z-10" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji"' }}>
                {event.image || '🎫'}
              </span>
            )}
            
            {/* Action Buttons on Image */}
            <div className="absolute top-6 right-6 flex space-x-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg"
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg"
              >
                <Share2 className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <span className="px-5 py-2 bg-white/90 backdrop-blur-sm text-indigo-700 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                {event.category}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-10 lg:p-12">
            {/* Title & Quick Info */}
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {event.title}
              </h1>
              
              {/* Key Details Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4 p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                  <div className="p-3 bg-indigo-100 rounded-xl">
                    <Calendar className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Date & Time</p>
                    <p className="text-lg font-bold text-gray-900">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Location</p>
                    <p className="text-lg font-bold text-gray-900">{event.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full mr-3"></span>
                About This Event
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                {event.fullDesc}
              </p>
            </div>

            {/* Additional Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl text-center border border-blue-100">
                <Users className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                <p className="text-sm text-gray-600 font-medium mb-1">Hosted By</p>
                <p className="font-bold text-gray-900">{event.userId?.name || 'Event Organizer'}</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl text-center border border-purple-100">
                <Tag className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <p className="text-sm text-gray-600 font-medium mb-1">Category</p>
                <p className="font-bold text-gray-900">{event.category}</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl text-center border border-green-100">
                <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <p className="text-sm text-gray-600 font-medium mb-1">Duration</p>
                <p className="font-bold text-gray-900">Full Day Event</p>
              </div>
            </div>

            {/* Booking Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                <div className="text-white">
                  <p className="text-sm font-medium mb-2 text-indigo-100">Ticket Price</p>
                  <p className="text-5xl font-bold">{event.price}</p>
                  <p className="text-sm text-indigo-100 mt-2">per person</p>
                </div>
                
                <button className="px-12 py-5 bg-white text-indigo-600 rounded-xl hover:bg-gray-50 transition-all hover:shadow-2xl font-bold text-lg transform hover:scale-105">
                  Book Your Ticket Now
                </button>
              </div>
            </div>

            {/* Security Note */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                🔒 Secure payment • 100% refund if event is cancelled • Instant e-ticket delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}