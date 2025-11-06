import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section className="py-16 sm:py-24 bg-teal-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Start Your Journey Today
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join hundreds of students who have accelerated their careers with our practical, market-driven training programs at Skiva Digital Academy.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
              <a href="/courses">Explore Courses</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-100 hover:text-teal-700">
              <a href="/contact">Get In Touch</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;