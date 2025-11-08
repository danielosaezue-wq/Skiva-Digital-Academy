import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { User, Mail, Book, Users, Calendar, MessageSquare, Phone, MapPin, BarChart, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import emailjs from '@emailjs/browser';

const coursesData = {
  'Cyber Security': { basePrice: 150000 },
  'Full Stack Development': { basePrice: 200000 },
  'UI/UX Design': { basePrice: 120000 },
  'Video Editing Basics': { basePrice: 100000 },
  'Artificial Intelligence': { basePrice: 180000 },
  'Data Analysis': { basePrice: 130000 },
  'Data Science': { basePrice: 120000 },
  'Flyer/Poster/Brochure Design': { basePrice: 90000 },
  'Search Engine Optimization (SEO)': { basePrice: 110000 },
  'Book Publishing': { basePrice: 140000 },
  'Photo Editing / Retouching': { basePrice: 95000 },
  'Graphic / Brand Identity Design': { basePrice: 90000, customPrices: { 'Online (Group)': 90000, 'Online (One-on-one)': 120000, 'Physical (One-on-one)': 180000 } },
  'Character Animations': { basePrice: 130000 },
  'Social Media Marketing': { basePrice: 110000 },
  'Website Design': { basePrice: 150000 },
  'Mobile App Development': { basePrice: 180000 },
  'Python Programming': { basePrice: 140000 },
  'Internet of Things (Fundamentals)': { basePrice: 160000 },
  'ICT Fundamentals': { basePrice: 70000 },
  'Front-End Development': { basePrice: 120000 },
  'Back-End Development': { basePrice: 120000 },
  '3D Modelling': { basePrice: 120000 },
};

const allCourses = Object.keys(coursesData);

const BookTraining = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', location: '', ageRange: '', skillLevel: '',
    courseInterest: '', trainingMode: 'Online (Group)', preferredTime: '', preferredSchedule: [], message: '', promoCode: ''
  });
  
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const weekends = ['Saturday', 'Sunday'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (day) => {
    setFormData(prev => {
      const schedule = prev.preferredSchedule.includes(day)
        ? prev.preferredSchedule.filter(d => d !== day)
        : [...prev.preferredSchedule, day];
      return { ...prev, preferredSchedule: schedule };
    });
  };

  const getPriceForMode = (courseName, mode) => {
    const course = coursesData[courseName];
    if (!course) return 0;

    if (course.customPrices && course.customPrices[mode]) {
      return course.customPrices[mode];
    }

    if (mode === 'Online (One-on-one)') return course.basePrice * 1.4;
    if (mode === 'Physical (One-on-one)') return course.basePrice * 2;
    return course.basePrice; // Default is 'Online (Group)'
  };
  
  // Calculate original price for the selected course and mode
  const originalPrice = getPriceForMode(formData.courseInterest, formData.trainingMode);
  
  // Calculate discount and final price
  const discount = isPromoApplied ? originalPrice * 0.3 : 0;
  const calculatedPrice = originalPrice - discount;

  const handlePromoCodeApply = () => {
    if (formData.promoCode.trim() === 'sda_101125') {
      setIsPromoApplied(true);
      toast({
        title: "🎉 Promo Code Applied!",
        description: "30% discount has been applied to your training fee!",
        className: 'bg-green-100 border-green-400 text-green-700'
      });
    } else if (formData.promoCode.trim()) {
      toast({
        variant: "destructive",
        title: "Invalid Promo Code",
        description: "The promo code you entered is not valid.",
      });
    }
  };

  const handlePromoCodeChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, promoCode: value }));
    
    // Remove discount if promo code is cleared
    if (!value.trim() && isPromoApplied) {
      setIsPromoApplied(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.courseInterest) {
      toast({ variant: "destructive", title: "Missing Information", description: "Please fill in all required fields." });
      return;
    }
    setIsSubmitting(true);
    try {
      const weekdays_selected = formData.preferredSchedule.filter(day => weekdays.includes(day)).join(', ') || 'N/A';
      const weekends_selected = formData.preferredSchedule.filter(day => weekends.includes(day)).join(', ') || 'N/A';

      // Consistent EmailJS template data matching the template structure
      const submissionData = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        course_name: formData.courseInterest,
        training_type: formData.trainingMode,
        sponsor: 'Self', // Default for BookTraining form
        preferred_time: formData.preferredTime,
        weekdays_selected,
        weekends_selected,
        age_range: formData.ageRange,
        skill_level: formData.skillLevel,
        course_price: `₦${calculatedPrice.toLocaleString()}`,
        original_price: isPromoApplied ? `₦${originalPrice.toLocaleString()}` : `₦${originalPrice.toLocaleString()}`,
        discount_applied: isPromoApplied ? '30%' : '0%',
        promo_code_used: isPromoApplied ? formData.promoCode : 'None',
        additional_message: formData.message || 'No additional message',
        form_type: 'Book Training',
        submission_date: new Date().toLocaleString()
      };

      const EMAILJS_SERVICE_ID = 'service_mw1a8qa';
      const EMAILJS_TEMPLATE_ID = 'template_cxtz3cs'; // Same template as CourseDetail
      const EMAILJS_PUBLIC_KEY = 'XO3x8E4Ry_8SzuR8N';
      
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, submissionData, EMAILJS_PUBLIC_KEY);
      
      // Consistent WhatsApp message format
      const whatsappMessage = `Hello Skiva Digital Academy! 👋

I would like to book a training:

📚 *Course:* ${formData.courseInterest}
👤 *Full Name:* ${formData.fullName}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone}
📍 *Location:* ${formData.location}
👥 *Age Range:* ${formData.ageRange}
📊 *Skill Level:* ${formData.skillLevel}
💻 *Training Mode:* ${formData.trainingMode}
⏰ *Preferred Time:* ${formData.preferredTime}
📅 *Schedule:* ${formData.preferredSchedule.join(', ') || 'Not specified'}
💰 *Price:* ₦${calculatedPrice.toLocaleString()}${isPromoApplied ? ` (Original: ₦${originalPrice.toLocaleString()}, 30% OFF!)` : ''}
${isPromoApplied ? `🎟️ *Promo Code Used:* ${formData.promoCode}` : ''}
💬 *Message:* ${formData.message || 'No additional message'}

Please contact me with available dates and payment details.`;

      const whatsappUrl = `https://wa.me/2347025753414?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
      
      toast({ 
        title: "Booking Submitted Successfully! 👍", 
        description: "We've received your request and will contact you within 24 hours.",
        duration: 8000,
        className: 'bg-green-100 border-green-400 text-green-700'
      });
      
      setFormData({ fullName: '', email: '', phone: '', location: '', ageRange: '', skillLevel: '', courseInterest: '', trainingMode: 'Online (Group)', preferredTime: '', preferredSchedule: [], message: '', promoCode: '' });
      setIsPromoApplied(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({ variant: "destructive", title: "Submission Error", description: "There was an error. Please try again or contact us directly.", duration: 6000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Book a Training - Skiva Digital Academy</title>
        <meta name="description" content="Reserve your spot for a training session at Skiva Digital Academy. Fill out the form to get started on your learning journey." />
        <meta name="keywords" content="book training, tech courses, digital skills, Nigeria, Skiva Digital Academy" />
      </Helmet>
      <div className="bg-white text-foreground">
        <section className="py-20 bg-gray-50 pt-32 sm:pt-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl md:text-5xl font-bold text-primary mb-4">Reserve Your Spot Today.</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-lg text-gray-600 max-w-2xl mx-auto">Fill out the form below to book your training. Our team will contact you to confirm the details.</motion.p>
          </div>
        </section>
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label htmlFor="fullName" className="flex items-center space-x-2 text-gray-700 font-medium mb-2"><User className="h-5 w-5 text-primary" /><span>Full Name</span></label><Input id="fullName" name="fullName" type="text" value={formData.fullName} onChange={handleInputChange} placeholder="John Doe" required /></div>
                  <div><label htmlFor="email" className="flex items-center space-x-2 text-gray-700 font-medium mb-2"><Mail className="h-5 w-5 text-primary" /><span>Email Address</span></label><Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" required /></div>
                  <div><label htmlFor="phone" className="flex items-center space-x-2 text-gray-700 font-medium mb-2"><Phone className="h-5 w-5 text-primary" /><span>WhatsApp Phone Number</span></label><Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+1234567890" required /></div>
                  <div><label htmlFor="location" className="flex items-center space-x-2 text-gray-700 font-medium mb-2"><MapPin className="h-5 w-5 text-primary" /><span>Present Location (Country/State)</span></label><Input id="location" name="location" type="text" value={formData.location} onChange={handleInputChange} placeholder="Nigeria/Lagos" required /></div>
                  <div><label htmlFor="ageRange" className="flex items-center space-x-2 text-gray-700 font-medium mb-2"><Users className="h-5 w-5 text-primary" /><span>Age Range</span></label><select id="ageRange" name="ageRange" value={formData.ageRange} onChange={handleInputChange} required className="form-control"><option value="" disabled>Select your age range</option><option value="12-30">12–30</option><option value="31-49">31–49</option><option value="50+">50+</option></select></div>
                  <div><label htmlFor="skillLevel" className="flex items-center space-x-2 text-gray-700 font-medium mb-2"><BarChart className="h-5 w-5 text-primary" /><span>Skill Level</span></label><select id="skillLevel" name="skillLevel" value={formData.skillLevel} onChange={handleInputChange} required className="form-control"><option value="" disabled>Select your skill level</option><option value="Beginner">Beginner</option><option value="Intermediate">Intermediate</option><option value="Advanced">Advanced</option></select></div>
                </div>
                <div><label htmlFor="courseInterest" className="flex items-center space-x-2 text-gray-700 font-medium mb-2"><Book className="h-5 w-5 text-primary" /><span>Course of Interest</span></label><select id="courseInterest" name="courseInterest" value={formData.courseInterest} onChange={handleInputChange} required className="form-control"><option value="" disabled>Select a course</option>{allCourses.map(course => <option key={course} value={course}>{course}</option>)}</select></div>
                <div className="space-y-4">
                  <label className="flex items-center space-x-2 text-gray-700 font-medium"><Users className="h-5 w-5 text-primary" /><span>Training Mode</span></label>
                  <div className="space-y-2">
                    {['Online (Group)', 'Online (One-on-one)', 'Physical (One-on-one)'].map(mode => {
                      const modeOriginalPrice = getPriceForMode(formData.courseInterest, mode);
                      const modeDiscount = isPromoApplied ? modeOriginalPrice * 0.3 : 0;
                      const modeFinalPrice = modeOriginalPrice - modeDiscount;
                      
                      return (
                        <label key={mode} className="flex items-center justify-between p-3 border rounded-lg cursor-pointer has-[:checked]:bg-secondary has-[:checked]:border-primary">
                          <div className="flex items-center space-x-3">
                            <input 
                              type="radio" 
                              name="trainingMode" 
                              value={mode} 
                              checked={formData.trainingMode === mode} 
                              onChange={handleInputChange} 
                              className="form-radio text-primary focus:ring-primary" 
                            />
                            <span className="text-gray-700 font-medium">{mode}</span>
                          </div>
                          <div className="text-right">
                            {formData.courseInterest && (
                              <>
                                {isPromoApplied ? (
                                  <>
                                    <span className="text-green-600 font-semibold">₦{modeFinalPrice.toLocaleString()}</span>
                                    <span className="block text-sm text-gray-500 line-through">₦{modeOriginalPrice.toLocaleString()}</span>
                                  </>
                                ) : (
                                  <span className="text-primary font-semibold">₦{modeOriginalPrice.toLocaleString()}</span>
                                )}
                              </>
                            )}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div><label className="flex items-center space-x-2 text-gray-700 font-medium mb-2"><Clock className="h-5 w-5 text-primary" /><span>Preferred Time</span></label><select id="preferredTime" name="preferredTime" value={formData.preferredTime} onChange={handleInputChange} required className="form-control"><option value="" disabled>Select a time</option><option value="Morning">Morning</option><option value="Afternoon">Afternoon</option><option value="Evening">Evening</option></select></div>
                <div>
                  <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2"><Calendar className="h-5 w-5 text-primary" /><span>Preferred Schedule</span></label>
                  <div><p className="text-sm font-medium text-gray-600 mb-2">Weekdays</p><div className="flex flex-wrap gap-x-6 gap-y-2">{weekdays.map(day => (<div key={day} className="flex items-center space-x-2"><Checkbox id={`schedule-${day.toLowerCase()}`} checked={formData.preferredSchedule.includes(day)} onCheckedChange={() => handleCheckboxChange(day)} /><Label htmlFor={`schedule-${day.toLowerCase()}`}>{day}</Label></div>))}</div></div>
                  <div className="mt-4"><p className="text-sm font-medium text-gray-600 mb-2">Weekends</p><div className="flex flex-wrap gap-x-6 gap-y-2">{weekends.map(day => (<div key={day} className="flex items-center space-x-2"><Checkbox id={`schedule-${day.toLowerCase()}`} checked={formData.preferredSchedule.includes(day)} onCheckedChange={() => handleCheckboxChange(day)} /><Label htmlFor={`schedule-${day.toLowerCase()}`}>{day}</Label></div>))}</div></div>
                </div>
                <div><label htmlFor="message" className="flex items-center space-x-2 text-gray-700 font-medium mb-2"><MessageSquare className="h-5 w-5 text-primary" /><span>Additional Message</span></label><Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Any specific questions or requirements?" rows={4} className="long-message" /></div>
                
                {/* Promo Code Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Tag className="h-5 w-5 text-primary" />
                    <label htmlFor="promoCode" className="text-gray-700 font-medium">Promo Code (Optional)</label>
                  </div>
                  <div className={`p-4 rounded-lg border-2 ${isPromoApplied ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1">
                        <Input
                          id="promoCode"
                          name="promoCode"
                          type="text"
                          value={formData.promoCode}
                          onChange={handlePromoCodeChange}
                          placeholder="Enter promo code"
                          className={`h-12 text-center font-medium ${isPromoApplied ? 'border-green-300 bg-white' : 'border-yellow-300'}`}
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={handlePromoCodeApply}
                        disabled={!formData.promoCode.trim() || isPromoApplied}
                        className={`h-12 ${isPromoApplied ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-600 hover:bg-yellow-700'} text-white font-semibold`}
                      >
                        {isPromoApplied ? '✓ Applied' : 'Apply Code'}
                      </Button>
                    </div>
                    {isPromoApplied && (
                      <div className="mt-3 p-3 bg-green-100 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-green-800 font-semibold">🎉 30% Discount Applied!</span>
                          <span className="text-green-800 font-bold">
                            You save: ₦{discount.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-green-700 text-sm mt-1">
                          Your training fee has been reduced from ₦{originalPrice.toLocaleString()} to ₦{calculatedPrice.toLocaleString()}
                        </p>
                      </div>
                    )}
                    {!isPromoApplied && formData.promoCode && (
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        Enter your discount code to receive 30% off your training fee!
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting} 
                    className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : `Book Training - ₦${calculatedPrice.toLocaleString()}`}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BookTraining;