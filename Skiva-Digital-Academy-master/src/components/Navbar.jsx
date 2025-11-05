import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Mentorship', path: '/mentorship' },
    { name: 'Contact', path: '/contact' }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isHome = location.pathname === '/';
  const navTextColor = isScrolled || !isHome ? 'text-primary' : 'text-white';
  const navHoverColor = isScrolled || !isHome ? 'hover:text-accent' : 'hover:text-yellow-300';
  const activeLinkColor = isScrolled || !isHome ? 'text-primary' : 'text-white';
  const logoUrl = isScrolled || !isHome 
    ? 'https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/49e60bbd8ca690e162188560bc90f599.png' 
    : 'https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/71943397a9d660482eaee272e28e3f9f.png';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || !isHome ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logoUrl} alt="Skiva Digital Academy Logo" className="h-10 w-auto" />
            <span className={`text-xl font-bold font-heading transition-colors ${navTextColor}`}>Skiva Digital Academy</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative text-sm font-medium transition-colors ${navHoverColor} ${
                  location.pathname === item.path ? activeLinkColor : navTextColor
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-accent"
                    layoutId="underline"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Link to="/book-training">
              <Button variant="accent">
                Book a Training
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${navTextColor} hover:text-primary`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors hover:text-accent-foreground hover:bg-secondary ${
                    location.pathname === item.path ? 'text-primary bg-secondary' : 'text-gray-700'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/book-training" onClick={() => setIsOpen(false)} className="block px-3 py-2">
                <Button variant="accent" className="w-full">
                  Book a Training
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;