'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, User, Plus, Settings, LogOut, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              🎫 TicketHub
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
              Events
            </Link>
            <Link href="/#about" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
              About
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">{session.user.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                      <p className="text-xs text-gray-500">{session.user.email}</p>
                    </div>
                    <Link href="/add" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                      <Plus className="w-4 h-4" />
                      <span>Add Event</span>
                    </Link>
                    <Link href="/manage" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                      <Settings className="w-4 h-4" />
                      <span>Manage Events</span>
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                  Login
                </Link>
                <Link href="/register" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all hover:shadow-lg font-medium">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-700 hover:text-indigo-600 font-medium">
                Home
              </Link>
              <Link href="/events" className="text-gray-700 hover:text-indigo-600 font-medium">
                Events
              </Link>
              <Link href="/#about" className="text-gray-700 hover:text-indigo-600 font-medium">
                About
              </Link>
              <Link href="/#contact" className="text-gray-700 hover:text-indigo-600 font-medium">
                Contact
              </Link>
              {session ? (
                <>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-900 mb-2">{session.user.name}</p>
                    <Link href="/add" className="block text-gray-700 hover:text-indigo-600 mb-2">
                      Add Event
                    </Link>
                    <Link href="/manage" className="block text-gray-700 hover:text-indigo-600 mb-2">
                      Manage Events
                    </Link>
                    <button onClick={() => signOut()} className="text-red-600">
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-700 font-medium">
                    Login
                  </Link>
                  <Link href="/register" className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-center">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}