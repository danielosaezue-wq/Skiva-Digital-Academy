import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import emailjs from '@emailjs/browser';
import { HelpCircle, Calendar } from 'lucide-react';

// Updated expertise areas to match BookTraining courses - Added Digital Marketing
const expertiseAreas = [
  'Cybersecurity', 'UI/UX Design', 'Full Stack Development', 'Video Editing', 'Data Analysis',
  'Front-End Development', 'Back-End Development', 'Mobile App Development', 'Python Programming', '3D Modelling', 'Social Media Marketing',
  'ICT Fundamentals', 'Website Design', 'Character Animations', 'Photo Editing / Retouching',
  'Book Publishing', 'Search Engine Optimization (SEO)', 'Graphic Design', 'Digital Marketing',
  'Internet of Things (Fundamentals)', 'Data Science', 'CompTIA Network+ (N+)'
].sort();

const BecomeAnInstructor = () => {
  const { toast } = useToast();
  const [hasTaughtBefore, setHasTaughtBefore] = useState('no');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const [otherExpertise, setOtherExpertise] = useState('');

  const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleExpertiseChange = (area) => {
    setSelectedExpertise(prev => 
      prev.includes(area) ? prev.filter(item => item !== area) : [...prev, area]
    );
  };

  const handleOtherExpertiseChange = (e) => {
    const value = e.target.value;
    // Basic validation - remove any HTML tags and limit to 150 characters
    const sanitizedValue = value.replace(/<[^>]*>/g, '').slice(0, 150);
    setOtherExpertise(sanitizedValue);
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    const schedule = formData.getAll('schedule');
    const trainingMode = formData.getAll('trainingMode');

    // Combine selected expertise with custom expertise
    const finalExpertise = [
      ...selectedExpertise,
      ...(otherExpertise.trim() ? [otherExpertise] : [])
    ].join(', ') || 'Not specified';

    // Ensure all fields have values, even if empty
    const submissionData = {
      fullName: data.fullName || '',
      email: data.email || '',
      phone: data.phone || '',
      location: data.location || '',
      languages: data.languages || '',
      experience: data.experience || '',
      hasTaught: data.hasTaught || 'no',
      teachingExperience: data.teachingExperience || 'Not provided',
      portfolio_link: data.portfolio_link || 'Not provided',
      hasLaptop: data.hasLaptop || 'yes',
      hasInternet: data.hasInternet || 'yes',
      hoursPerWeek: data.hoursPerWeek || '',
      whyTeach: data.whyTeach || 'Not provided',
      expertise: finalExpertise,
      custom_expertise: otherExpertise.trim() || 'None',
      custom_expertise_exists: !!otherExpertise.trim(),
      schedule: schedule.join(', ') || 'Not specified',
      trainingMode: trainingMode.join(', ') || 'Not specified',
      form_type: 'Become an Instructor Application',
      current_date: getCurrentDate()
    };

    // Portfolio link and whyTeach are optional, so no validation needed for them
    if (!submissionData.fullName || !submissionData.email || !submissionData.phone || finalExpertise === 'Not specified') {
        toast({
            variant: "destructive",
            title: "Incomplete Form",
            description: "Please fill out all required fields, including your area of expertise.",
        });
        setIsSubmitting(false);
        return;
    }

    try {
      // Initialize EmailJS
      emailjs.init('XO3x8E4Ry_8SzuR8N');

      const EMAILJS_SERVICE_ID = 'service_mw1a8qa';
      const EMAILJS_TEMPLATE_ID = 'template_4x534yq';
      const EMAILJS_PUBLIC_KEY = 'XO3x8E4Ry_8SzuR8N';

      console.log('Sending email with data:', submissionData);

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        submissionData,
        EMAILJS_PUBLIC_KEY
      );

      console.log('EmailJS result:', result);
      
      if (result.status === 200) {
        const whatsappMessage = `Hello Skiva Digital Academy 👋

I've just submitted my Instructor application. Below is a copy of my details for your review:

👤 *Name:* ${submissionData.fullName}
📧 *Email:* ${submissionData.email}
📱 *Phone:* ${submissionData.phone}
📍 *Location:* ${submissionData.location}
🗣️ *Languages:* ${submissionData.languages}
🛠️ *Expertise:* ${submissionData.expertise}
⏳ *Experience:* ${submissionData.experience} years
🎓 *Taught Before:* ${submissionData.hasTaught}
💻 *Has Laptop:* ${submissionData.hasLaptop}
🌐 *Has Internet:* ${submissionData.hasInternet}
⏰ *Hours/Week:* ${submissionData.hoursPerWeek}
📅 *Schedule:* ${submissionData.schedule}
💡 *Training Mode:* ${submissionData.trainingMode}
${submissionData.portfolio_link && submissionData.portfolio_link !== 'Not provided' ? `🔗 *Portfolio:* ${submissionData.portfolio_link}` : ''}
${submissionData.whyTeach && submissionData.whyTeach !== 'Not provided' ? `💭 *Teaching Motivation:* ${submissionData.whyTeach}` : ''}
${submissionData.custom_expertise && submissionData.custom_expertise !== 'None' ? `✨ *Custom Expertise:* ${submissionData.custom_expertise}` : ''}

I've also consented to the stated terms. Kindly review my application.`;

        const whatsappUrl = `https://wa.me/2347025753414?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');

        toast({
          title: "Application Received! 👍",
          description: "Thank you for your interest! We'll review your application and contact you within 3 business days.",
          duration: 8000,
          className: 'bg-green-100 border-green-400 text-green-700'
        });

        setSelectedExpertise([]);
        setOtherExpertise('');
        form.reset();
      } else {
        throw new Error(`EmailJS returned status: ${result.status}`);
      }

    } catch (error) {
      console.error('Detailed submission error:', error);
      
      // More specific error messages
      let errorMessage = "Something went wrong. Please try again or contact us directly.";
      
      if (error.text) {
        errorMessage = `Email service error: ${error.text}`;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Become an Instructor - Skiva Digital Academy</title>
        <meta name="description" content="Join the team of expert instructors at Skiva Digital Academy. Apply to teach and shape the next generation of tech talent in Nigeria." />
        <link rel="canonical" href="https://www.skivadigitalacademy.com/become-an-instructor" />
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
              Become an Instructor
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Join our team of experts and help shape the next generation of tech talent.
            </motion.p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-card p-8 md:p-12 rounded-2xl shadow-lg"
            >
              <form onSubmit={handleSubmit} className="grid gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold font-heading text-xl text-primary">Personal Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input 
                        id="fullName" 
                        name="fullName" 
                        type="text" 
                        placeholder="e.g., Ada Lovelace" 
                        required 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="you@example.com" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        placeholder="+234..." 
                        required 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location">Current Location *</Label>
                      <Input 
                        id="location" 
                        name="location" 
                        type="text" 
                        placeholder="City, State, Country" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="languages">Preferred Language(s) *</Label>
                    <Input 
                      id="languages" 
                      name="languages" 
                      type="text" 
                      placeholder="e.g., English, Yoruba" 
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold font-heading text-xl text-primary">Professional Background</h3>
                  <div className="grid gap-2">
                    <Label>Area of Expertise (Select all that apply) *</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border rounded-md">
                      {expertiseAreas.map(area => (
                        <div key={area} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`expertise-${area}`} 
                            checked={selectedExpertise.includes(area)} 
                            onCheckedChange={() => handleExpertiseChange(area)} 
                          />
                          <Label htmlFor={`expertise-${area}`} className="text-sm font-normal cursor-pointer">
                            {area}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Custom Expertise Input Field */}
                  <div className="space-y-2">
                    <label htmlFor="otherExpertise" className="flex items-center space-x-2 text-gray-700 font-medium">
                      <HelpCircle className="h-4 w-4 text-primary" />
                      <span>Other Expertise (if not listed)</span>
                    </label>
                    <Input
                      id="otherExpertise"
                      name="otherExpertise"
                      type="text"
                      value={otherExpertise}
                      onChange={handleOtherExpertiseChange}
                      placeholder="Enter any other skills or expertise you have"
                      maxLength={150}
                      className="w-full"
                    />
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Please describe any additional expertise you have</span>
                      <span>{otherExpertise.length}/150</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="experience">Years of Experience *</Label>
                      <Input 
                        id="experience" 
                        name="experience" 
                        type="number" 
                        min="0" 
                        placeholder="e.g., 5" 
                        required 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Have You Taught Before? *</Label>
                      <RadioGroup 
                        name="hasTaught" 
                        defaultValue="no" 
                        onValueChange={setHasTaughtBefore} 
                        className="flex space-x-4 pt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="taught-yes" />
                          <Label htmlFor="taught-yes" className="cursor-pointer">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="taught-no" />
                          <Label htmlFor="taught-no" className="cursor-pointer">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  <AnimatePresence>
                    {hasTaughtBefore === 'yes' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        exit={{ opacity: 0, height: 0 }} 
                        className="grid gap-2 overflow-hidden"
                      >
                        <Label htmlFor="teachingExperience">Briefly Describe Your Teaching Experience</Label>
                        <Textarea 
                          id="teachingExperience" 
                          name="teachingExperience" 
                          placeholder="e.g., Mentored junior developers, conducted workshops..." 
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="grid gap-2">
                    <Label htmlFor="portfolio_link">Portfolio Link (Optional)</Label>
                    <Input 
                      id="portfolio_link" 
                      name="portfolio_link" 
                      type="url" 
                      placeholder="https://yourportfolio.com or Behance/Dribbble link" 
                      className="h-10 px-3" 
                    />
                    <p className="text-sm text-muted-foreground">Share your portfolio if available, but it's not required to submit your application.</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold font-heading text-xl text-primary">Technical Setup</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Laptop/Computer for Teaching? *</Label>
                      <RadioGroup name="hasLaptop" defaultValue="yes" className="flex space-x-4 pt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="laptop-yes" />
                          <Label htmlFor="laptop-yes" className="cursor-pointer">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="laptop-no" />
                          <Label htmlFor="laptop-no" className="cursor-pointer">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="grid gap-2">
                      <Label>Stable Internet Access? *</Label>
                      <RadioGroup name="hasInternet" defaultValue="yes" className="flex space-x-4 pt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="internet-yes" />
                          <Label htmlFor="internet-yes" className="cursor-pointer">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="internet-no" />
                          <Label htmlFor="internet-no" className="cursor-pointer">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Preferred Training Mode *</Label>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mode-online" name="trainingMode" value="Online" />
                        <Label htmlFor="mode-online" className="cursor-pointer">Online</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mode-onsite" name="trainingMode" value="Onsite" />
                        <Label htmlFor="mode-onsite" className="cursor-pointer">Onsite</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold font-heading text-xl text-primary">Availability & Preferences</h3>
                  <div className="grid gap-2">
                    <Label htmlFor="hoursPerWeek">Hours Per Week (Dedication) *</Label>
                    <Input 
                      id="hoursPerWeek" 
                      name="hoursPerWeek" 
                      type="number" 
                      min="1" 
                      placeholder="e.g., 10" 
                      required 
                    />
                  </div>
                  
                  {/* Updated Preferred Schedule Section - Matches Book Training Page */}
                  <div>
                    <Label className="flex items-center space-x-2 text-gray-700 font-medium mb-4">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>Preferred Teaching Schedule *</span>
                    </Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {allDays.map(day => (
                        <div key={day} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                          <Checkbox 
                            id={`schedule-${day.toLowerCase()}`} 
                            name="schedule"
                            value={day}
                          />
                          <Label htmlFor={`schedule-${day.toLowerCase()}`} className="text-sm font-medium cursor-pointer">
                            {day}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold font-heading text-xl text-primary">Additional Info</h3>
                  <div className="grid gap-2">
                    <Label htmlFor="whyTeach">Why do you want to teach at Skiva Digital Academy? (Optional)</Label>
                    <Textarea 
                      id="whyTeach" 
                      name="whyTeach" 
                      placeholder="Share your motivation, what inspires you to teach, or any other relevant information..." 
                    />
                    <p className="text-sm text-muted-foreground">This helps us understand your teaching philosophy and motivation.</p>
                  </div>
                </div>

                {/* Updated Confirmation Section with Improved Line Height */}
                <div className="items-top flex space-x-2">
                  <Checkbox id="consent" name="consent" required />
                  <div className="grid gap-1.5 leading-none">
                    <label 
                      htmlFor="consent" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      style={{ lineHeight: '1.5' }}
                    >
                      I confirm the information provided is accurate
                    </label>
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    type="submit" 
                    variant="accent" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="min-w-[200px]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      'Submit Application'
                    )}
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

export default BecomeAnInstructor;