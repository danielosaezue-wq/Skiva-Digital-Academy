import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, Globe, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all fields.",
      });
      return;
    }

    try {
      // This is a client-side simulation. In a real application, this logic would be on a secure backend server.
      // The form data would be sent to an API endpoint which then uses nodemailer with SMTP credentials.
      console.log("Contact Form Data to be sent to info@skivadigitalacademy.com:", formData);
      
      toast({
        title: "Message Sent! 👍",
        description: "Thanks for reaching out. We'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  const contactDetails = [
    { icon: <Mail className="h-6 w-6 text-primary" />, value: 'info@skivadigitalacademy.com', href: 'mailto:info@skivadigitalacademy.com' },
    { icon: <Phone className="h-6 w-6 text-primary" />, value: '+234 702 575 3414', href: 'tel:+2347025753414' },
    { icon: <Globe className="h-6 w-6 text-primary" />, value: 'www.skivadigitalacademy.com', href: 'http://www.skivadigitalacademy.com' },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - Skiva Digital Academy</title>
        <meta name="description" content="Get in touch with Skiva Digital Academy. We're here to answer your questions about our courses, mentorship, and training programs in Nigeria." />
        <link rel="canonical" href="https://www.skivadigitalacademy.com/contact" />
      </Helmet>

      <div className="bg-background text-foreground pt-20">
        <section className="py-20 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold font-heading text-primary mb-4"
            >
              Get In Touch.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              We’re here to answer your questions and help you get started on your learning journey.
            </motion.p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-card p-8 md:p-12 rounded-2xl shadow-lg"
              >
                <h2 className="text-2xl font-bold font-heading text-foreground mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="flex items-center space-x-2 text-foreground font-medium mb-2">
                      <User className="h-5 w-5 text-primary" />
                      <span>Full Name</span>
                    </label>
                    <Input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} placeholder="Your Name" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="flex items-center space-x-2 text-foreground font-medium mb-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <span>Email</span>
                    </label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Your Email" required />
                  </div>
                  <div>
                    <label htmlFor="message" className="flex items-center space-x-2 text-foreground font-medium mb-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <span>Message</span>
                    </label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="How can we help you?" required rows={5} className="long-message" />
                  </div>
                  <Button type="submit" size="lg" variant="accent" className="w-full rounded-full">
                    Send Message
                  </Button>
                </form>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8 flex flex-col justify-center"
              >
                <h2 className="text-2xl font-bold font-heading text-foreground mb-6">Contact Details</h2>
                <div className="space-y-6">
                  {contactDetails.map((detail, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      {detail.icon}
                      <a href={detail.href} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                        {detail.value}
                      </a>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;