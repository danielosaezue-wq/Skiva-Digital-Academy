import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HeroImage = () => {
  return (
    <div className="relative text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          alt="Modern tech training environment"
         src="https://images.unsplash.com/photo-1521939708078-d6498bb62747" />
        <div className="absolute inset-0 bg-teal-800/70"></div>
      </div>
      
      <div className="relative container mx-auto px-4 pt-32 pb-24 md:pt-48 md:pb-40 text-center">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
        >
          Skill Up. Stay Relevant. Build Your Future.
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-teal-100"
        >
          Learn in-demand digital and tech skills with flexible training, mentorship, and real-world projects.
        </motion.p>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Button asChild size="lg" variant="accent" className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 w-full sm:w-auto">
            <a href="/courses">Explore Courses</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
            <a href="/book-training">Book a Training</a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroImage;