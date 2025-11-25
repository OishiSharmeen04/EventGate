'use client';

import { useParams, useRouter } from 'next/navigation';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';

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

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const event = allEvents.find(e => e.id === parseInt(params.id));

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
          <button
            onClick={() => router.push('/events')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => router.push('/events')}
          className="mb-6 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events</span>
        </button>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-64 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
            <span className="text-9xl">{event.image}</span>
          </div>
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{event.location}</span>
              </div>
              <div className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">
                {event.category}
              </div>
            </div>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">{event.fullDesc}</p>
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-500 mb-1">Starting from</p>
                <p className="text-3xl font-bold text-indigo-600">{event.price}</p>
              </div>
              <button className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all hover:shadow-lg font-semibold">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}