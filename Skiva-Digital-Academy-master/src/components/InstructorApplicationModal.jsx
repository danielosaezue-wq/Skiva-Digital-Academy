import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const InstructorApplicationModal = () => {
  const { toast } = useToast();
  const [hasTaughtBefore, setHasTaughtBefore] = useState('no');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const expertiseAreas = [
    'Cyber Security', 'UI/UX Design', 'Full Stack Development', 'Video Editing', 'Data Analysis',
    'Front-End Development', 'Back-End Development', 'Mobile App Development', 'Python Programming',
    'Flyer / Poster Design', 'Content Creation', '3D Modelling', 'Social Media Marketing',
    'Computer Appreciation'
  ];

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const weekends = ['Saturday', 'Sunday'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Client-side validation
    if (!data.fullName || !data.email || !data.phone || !data.location || !data.languages || !data.expertise || !data.experience || !data.hasTaught || !data.hasLaptop || !data.hasInternet || !data.hoursPerWeek || !data.consent) {
        toast({
            variant: "destructive",
            title: "Incomplete Form",
            description: "Please fill out all required fields.",
        });
        setIsSubmitting(false);
        return;
    }

    try {
      // This is a client-side simulation. In a real application, this logic would be on a secure backend server.
      // The form data would be sent to an API endpoint which then uses nodemailer with SMTP credentials.
      console.log("Instructor Application Data to be sent to info@skivadigitalacademy.com:", data);
      
      toast({
        title: "Application Submitted! 🎉",
        description: "Thank you for applying. Our team will review your application and get back to you shortly.",
      });
      setOpen(false);
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-gray-200 hover:text-accent transition-colors">Become an Instructor</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">Become an Instructor</DialogTitle>
          <DialogDescription>
            Join our team of experts and help shape the next generation of tech talent.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-6 py-4">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold font-heading text-lg text-primary">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" type="text" placeholder="e.g., Ada Lovelace" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+234..." required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Current Location</Label>
                <Input id="location" name="location" type="text" placeholder="City, State, Country" required />
              </div>
            </div>
             <div className="grid gap-2">
                <Label htmlFor="languages">Preferred Language(s)</Label>
                <Input id="languages" name="languages" type="text" placeholder="e.g., English, Yoruba" required />
              </div>
          </div>

          {/* Professional Background */}
          <div className="space-y-4">
            <h3 className="font-semibold font-heading text-lg text-primary">Professional Background</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="expertise">Area of Expertise</Label>
                    <select id="expertise" name="expertise" required className="form-control" defaultValue="">
                        <option value="" disabled>Select your expertise</option>
                        {expertiseAreas.map(area => <option key={area} value={area}>{area}</option>)}
                    </select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input id="experience" name="experience" type="number" min="0" placeholder="e.g., 5" required />
                </div>
            </div>
            <div className="grid gap-2">
                <Label>Have You Taught Before?</Label>
                <RadioGroup name="hasTaught" defaultValue="no" onValueChange={setHasTaughtBefore} className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="taught-yes" />
                        <Label htmlFor="taught-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="taught-no" />
                        <Label htmlFor="taught-no">No</Label>
                    </div>
                </RadioGroup>
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
                        <Textarea id="teachingExperience" name="teachingExperience" placeholder="e.g., Mentored junior developers, conducted workshops..." />
                    </motion.div>
                )}
            </AnimatePresence>
          </div>
          
          {/* Technical Setup */}
          <div className="space-y-4">
            <h3 className="font-semibold font-heading text-lg text-primary">Technical Setup</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label>Laptop/Computer for Teaching?</Label>
                    <RadioGroup name="hasLaptop" defaultValue="yes" className="flex space-x-4">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="laptop-yes" /><Label htmlFor="laptop-yes">Yes</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="laptop-no" /><Label htmlFor="laptop-no">No</Label></div>
                    </RadioGroup>
                </div>
                <div className="grid gap-2">
                    <Label>Stable Internet Access?</Label>
                    <RadioGroup name="hasInternet" defaultValue="yes" className="flex space-x-4">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="internet-yes" /><Label htmlFor="internet-yes">Yes</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="internet-no" /><Label htmlFor="internet-no">No</Label></div>
                    </RadioGroup>
                </div>
            </div>
            <div className="grid gap-2">
                <Label>Preferred Training Mode</Label>
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2"><Checkbox id="mode-online" name="trainingMode" value="Online" /><Label htmlFor="mode-online">Online</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="mode-onsite" name="trainingMode" value="Onsite" /><Label htmlFor="mode-onsite">Onsite</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="mode-both" name="trainingMode" value="Both" /><Label htmlFor="mode-both">Both</Label></div>
                </div>
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-4">
            <h3 className="font-semibold font-heading text-lg text-primary">Availability & Preferences</h3>
            <div className="grid gap-2">
                <Label htmlFor="hoursPerWeek">Hours Per Week (Dedication)</Label>
                <Input id="hoursPerWeek" name="hoursPerWeek" type="number" min="1" placeholder="e.g., 10" required />
            </div>
            <div className="grid gap-2">
              <Label>Preferred Teaching Schedule</Label>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Weekdays</p>
                <div className="flex flex-wrap gap-4">
                  {weekdays.map(day => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox id={`schedule-${day.toLowerCase()}`} name="schedule" value={day} />
                      <Label htmlFor={`schedule-${day.toLowerCase()}`}>{day}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Weekends</p>
                <div className="flex flex-wrap gap-4">
                  {weekends.map(day => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox id={`schedule-${day.toLowerCase()}`} name="schedule" value={day} />
                      <Label htmlFor={`schedule-${day.toLowerCase()}`}>{day}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-4">
            <h3 className="font-semibold font-heading text-lg text-primary">Additional Info</h3>
            <div className="grid gap-2">
                <Label htmlFor="whyTeach">Why do you want to teach at Skiva Digital Academy?</Label>
                <Textarea id="whyTeach" name="whyTeach" placeholder="Share your motivation..." required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="resume">Upload Resume / Portfolio (Optional)</Label>
                <Input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx" />
            </div>
          </div>

          {/* Consent */}
          <div className="items-top flex space-x-2">
            <Checkbox id="consent" name="consent" required />
            <div className="grid gap-1.5 leading-none">
              <label htmlFor="consent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I confirm that the information provided is accurate and I agree to Skiva Digital Academy’s instructor terms and policies.
              </label>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="accent" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InstructorApplicationModal;