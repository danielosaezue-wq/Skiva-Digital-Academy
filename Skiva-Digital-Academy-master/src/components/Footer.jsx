import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Linkedin, Instagram } from 'lucide-react';
import PolicyModal from '@/components/PolicyModal';
import { faqContent, privacyPolicyContent, termsOfServiceContent } from '@/lib/legalContent';

const TikTokIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12.52.02C13.83 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.65 4.32 1.71v3.43c-2.05-.17-4.03-.98-5.36-2.35-1.45-1.5-2.1-3.47-1.96-5.46H12.52z" />
    <path d="M12.52 0v14.58c0 2.53-1.82 4.6-4.12 4.92-2.29.32-4.48-.83-5.64-2.87-1.17-2.05-.8-4.64.8-6.22 1.57-1.57 3.94-2.02 5.96-1.22v3.32c-1.03.21-1.97.69-2.66 1.4-1.03 1.03-1.37 2.67-.8 4.03.57 1.36 1.94 2.2 3.46 2.03 1.53-.17 2.75-1.39 2.92-2.92.17-1.53-.48-2.99-1.68-3.93-.22-.17-.44-.34-.67-.5v-3.3c.22.17.44.33.66.51z" />
  </svg>
);

const Footer = () => {
  const logoUrl = "https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/71943397a9d660482eaee272e28e3f9f.png";

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <img src={logoUrl} alt="Skiva Digital Academy Logo" className="h-10 w-auto" />
              <span className="text-xl font-bold text-white font-heading">Skiva Digital Academy</span>
            </div>
            <p className="text-gray-200 text-sm">
              Equipping individuals with practical, market-ready skills to thrive in the global digital economy.
            </p>
            <div className="pt-4">
              <p className="text-lg font-semibold text-white mb-3 block font-heading">Contact</p>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-accent" />
                  <a href="mailto:info@skivadigitalacademy.com" className="text-gray-200 text-sm hover:text-accent">info@skivadigitalacademy.com</a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-accent" />
                  <a href="tel:+2347025753414" className="text-gray-200 text-sm hover:text-accent">+234 702 575 3414</a>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div>
              <p className="text-lg font-semibold text-white mb-4 block font-heading">Company</p>
              <div className="space-y-3">
                <Link to="/about" className="block text-gray-200 hover:text-accent transition-colors">About Us</Link>
                <Link to="/blog" className="block text-gray-200 hover:text-accent transition-colors">Blog</Link>
                <PolicyModal triggerText="FAQ" title="Frequently Asked Questions" content={faqContent} />
                <Link to="/contact" className="block text-gray-200 hover:text-accent transition-colors">Contact Us</Link>
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold text-white mb-4 block font-heading">Programs</p>
              <div className="space-y-3">
                <Link to="/courses" className="block text-gray-200 hover:text-accent transition-colors">All Courses</Link>
                <Link to="/mentorship" className="block text-gray-200 hover:text-accent transition-colors">Mentorship</Link>
                <Link to="/book-training" className="block text-gray-200 hover:text-accent transition-colors">Book a Training</Link>
                <Link to="/become-an-instructor" className="block text-gray-200 hover:text-accent transition-colors">Become an Instructor</Link>
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold text-white mb-4 block font-heading">Legal</p>
              <div className="space-y-3">
                <PolicyModal triggerText="Terms of Service" title="Terms of Service" content={termsOfServiceContent} />
                <PolicyModal triggerText="Privacy Policy" title="Privacy Policy" content={privacyPolicyContent} />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-teal-600 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm mb-4 sm:mb-0">
            © {new Date().getFullYear()} Skiva Digital Academy. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-300 hover:text-accent transition-colors"><Linkedin className="h-5 w-5" /></a>
            <a href="#" className="text-gray-300 hover:text-accent transition-colors"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="text-gray-300 hover:text-accent transition-colors"><TikTokIcon className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;