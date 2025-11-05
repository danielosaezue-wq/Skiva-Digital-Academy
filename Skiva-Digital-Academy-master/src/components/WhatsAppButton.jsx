import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  const phoneNumber = '2347025753414';
  const message = "Hello Skiva Digital Academy 👋, I'd love to know more about your programs and how to get started.";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const iconUrl = "https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/8773120a59e3b2763e95d489299c0cee.png";

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl z-50 group"
      initial={{ scale: 0, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping group-hover:animate-none"></div>
      <img src={iconUrl} alt="WhatsApp Icon" className="w-full h-full object-cover" />
    </motion.a>
  );
};

export default WhatsAppButton;