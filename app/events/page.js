'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Calendar, MapPin } from 'lucide-react';

const allEvents = [
  {
    id: 1,
    title: "Summer Music Festival 2024",
    shortDesc: "3-day outdoor music festival featuring top artists",
    fullDesc: "Join us for an unforgettable 3-day music festival featuring performances from over 50 artists across multiple stages. Experience diverse genres from rock to electronic, enjoy food from local vendors, and camp under the stars with thousands of music lovers.",
    price: "$199",
    date: "July 15-17, 2024",
    location: "Central Park, NYC",
    image: "🎵",
    category: "Music"
  },
  {
    id: 2,
    title: "Tech Conference 2024",
    shortDesc: "Annual technology and innovation summit",
    fullDesc: "Connect with industry leaders, attend workshops on cutting-edge technologies, and discover the latest innovations shaping our future. Network with 5000+ attendees, participate in hackathons, and gain insights from keynote speakers from Fortune 500 companies.",
    price: "$299",
    date: "August 5-7, 2024",
    location: "Convention Center, SF",
    image: "💻",
    category: "Conference"
  },
  {
    id: 3,
    title: "Food & Wine Expo",
    shortDesc: "Gourmet food tasting and wine pairing event",
    fullDesc: "Indulge in exquisite culinary experiences with renowned chefs, sommelier-guided wine tastings, live cooking demonstrations, and exclusive meet-and-greets with celebrity chefs. Discover new flavors and culinary trends in this premium food celebration.",
    price: "$89",
    date: "September 12, 2024",
    location: "Grand Hotel, Chicago",
    image: "🍷",
    category: "Food"
  },
  {
    id: 4,
    title: "Marathon Championship",
    shortDesc: "International marathon race with prizes",
    fullDesc: "Challenge yourself in this internationally recognized marathon featuring professional and amateur categories. Run through scenic city routes, compete for prizes totaling $100,000, and join a community of passionate runners from around the globe.",
    price: "$45",
    date: "October 1, 2024",
    location: "Downtown, Boston",
    image: "🏃",
    category: "Sports"
  },
  {
    id: 5,
    title: "Art Gallery Exhibition",
    shortDesc: "Contemporary art showcase by emerging artists",
    fullDesc: "Immerse yourself in contemporary art with works from 30+ emerging artists. This curated exhibition features paintings, sculptures, digital art, and interactive installations. Meet the artists, attend guided tours, and purchase unique pieces directly from creators.",
    price: "$25",
    date: "November 10-20, 2024",
    location: "Modern Art Museum, LA",
    image: "🎨",
    category: "Art"
  },
  {
    id: 6,
    title: "Comedy Night Special",
    shortDesc: "Stand-up comedy show with top comedians",
    fullDesc: "Laugh the night away with performances from award-winning comedians. This special show features 5 comedians performing their best material in an intimate venue. Includes VIP meet-and-greet options and exclusive backstage access packages.",
    price: "$55",
    date: "December 5, 2024",
    location: "Comedy Club, Austin",
    image: "😂",
    category: "Entertainment"
  }
];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Music', 'Conference', 'Food', 'Sports', 'Art', 'Entertainment'];

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-pink-50 to-purple-200 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Events</h1>
          <p className="text-xl text-gray-600">Discover and book tickets for amazing events</p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-900"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  (category === 'All' && selectedCategory === '') || selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No events found matching your search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                  <span className="text-7xl">{event.image}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs font-medium">
                      {event.category}
                    </span>
                    <span className="text-xl font-bold text-indigo-600">{event.price}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.shortDesc}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <Link href={`/events/${event.id}`} className="block w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-center">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}