'use client';

import { useState } from 'react';
import { Calendar, MapPin, User, ArrowRight, Search, Clock } from 'lucide-react';

export default function Hero() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Easy Discovery",
      description: "Find events by category, location, date, or search for your favorite artists and venues."
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Instant Booking",
      description: "Book tickets instantly with our secure payment system. Get e-tickets delivered to your email."
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Local & Global",
      description: "Discover events in your city or explore experiences while traveling around the world."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Our customer support team is always here to help you with any questions or concerns."
    }
  ];

  const events = [
    {
      id: 1,
      title: "Summer Music Festival 2024",
      shortDesc: "3-day outdoor music festival featuring top artists",
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
      price: "$55",
      date: "December 5, 2024",
      location: "Comedy Club, Austin",
      image: "😂",
      category: "Entertainment"
    }
  ];

  const stats = [
    { number: "500+", label: "Events Monthly" },
    { number: "100K+", label: "Happy Customers" },
    { number: "50+", label: "Cities Worldwide" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-pink-50 to-purple-200">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Discover Amazing <span className="text-indigo-600">Events</span> Near You
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Book tickets for concerts, conferences, sports events, and more. Your next unforgettable experience is just a click away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all hover:shadow-xl font-semibold text-center flex items-center justify-center space-x-2">
                  <span>Explore Events</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all font-semibold text-center">
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-indigo-400 to-purple-400 rounded-2xl transform rotate-3"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-lg">
                      <Calendar className="w-8 h-8 text-indigo-600" />
                      <div>
                        <p className="font-semibold text-gray-900">500+ Events</p>
                        <p className="text-sm text-gray-600">This Month</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                      <MapPin className="w-8 h-8 text-purple-600" />
                      <div>
                        <p className="font-semibold text-gray-900">50+ Cities</p>
                        <p className="text-sm text-gray-600">Worldwide</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                      <User className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-900">100K+ Users</p>
                        <p className="text-sm text-gray-600">Happy Customers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose TicketHub?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make event discovery and ticket booking seamless and enjoyable
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-6 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-all hover:shadow-lg cursor-pointer">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Events Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Events</h2>
            <p className="text-xl text-gray-600">Browse and book tickets for upcoming events</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.slice(0, 6).map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="h-48 bg-linear-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
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
                  <button className="block w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-center">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-semibold inline-block">
              View All Events
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <p className="text-5xl font-bold text-white mb-2">{stat.number}</p>
                <p className="text-indigo-200 text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-indigo-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600">123 Event Street, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Calendar className="w-6 h-6 text-indigo-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">support@tickethub.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-indigo-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Hours</p>
                    <p className="text-gray-600">Mon-Fri: 9AM - 6PM EST</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-semibold"
                >
                  Send Message
                </button>
                {submitted && (
                  <p className="text-green-600 text-center font-medium">Message sent successfully!</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}