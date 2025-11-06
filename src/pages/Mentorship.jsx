import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Users, Briefcase, Lightbulb, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Users,
    title: "One-on-One Mentorship",
    description: "Get paired with an experienced professional in your field who will provide personalized guidance, career advice, and portfolio reviews.",
    image: "https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/e48cc3204e46fe931524cf131459be68.jpg",
    alt: "A mentor and mentee collaborating on a laptop in a bright, modern office."
  },
  {
    icon: Briefcase,
    title: "Internship Opportunities",
    description: "Qualified students may be connected with partner companies for internship opportunities to gain professional experience.",
    image: "https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/6577bad24d42b4c27b0a3b758bbfaad0.jpg",
    alt: "A diverse group of professionals putting their hands together in a symbol of teamwork."
  },
  {
    icon: Lightbulb,
    title: "Project-Based Learning",
    description: "Work on real-world projects that solve actual business problems, building your portfolio and gaining valuable experience.",
    image: "https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/9669213bfe4241af63d9e6cda970b386.jpg",
    alt: "A team collaborating around a whiteboard covered in charts and sticky notes."
  },
  {
    icon: GraduationCap,
    title: "Career Growth Support",
    description: "Receive assistance with resume building, interview preparation, and job search strategies from industry insiders.",
    image: "https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/32d371c8d2a36cae509f423b52e0edbe.jpg",
    alt: "A group of professionals collaborating with hands together, symbolizing career growth support."
  }
];

const Mentorship = () => {
  return (
    <>
      <Helmet>
        <title>Mentorship & Internship | Skiva Digital Academy</title>
        <meta name="description" content="Accelerate your career with Skiva's mentorship and internship programs. Get guidance from industry experts and work on real-world projects." />
      </Helmet>
      <div className="bg-background text-foreground">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pt-24 pb-16 sm:pt-32 sm:pb-24"
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="text-center md:text-left">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold text-primary tracking-tight font-heading"
                >
                  Learning Beyond the Classroom
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-6 text-lg md:text-xl text-muted-foreground"
                >
                  At Skiva Digital Academy, we believe learning doesn’t stop at theory. Our mentorship and internship programs are designed to bridge the gap between learning and earning.
                </motion.p>
              </div>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <img className="rounded-lg shadow-xl w-full h-auto object-cover" alt="A person learning online with a laptop and headphones" src="https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/a2802ad4f8a94a8c01640cab25f7471f.jpg" />
              </motion.div>
            </div>

            <div className="mt-24 max-w-6xl mx-auto">
              <div className="space-y-16">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'md:grid-flow-row-dense' : ''}`}
                  >
                    <div className={`p-8 ${index % 2 !== 0 ? 'md:col-start-2' : ''}`}>
                      <div className="flex items-center mb-4">
                        <div className="bg-secondary p-3 rounded-full">
                          <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="ml-4 text-2xl font-bold text-primary font-heading">{feature.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                    <div className="overflow-hidden rounded-lg shadow-xl">
                      <img className="w-full h-64 object-cover" alt={feature.alt} src={feature.image} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-24 text-center bg-secondary p-12 rounded-lg"
            >
              <h2 className="text-3xl font-bold text-primary font-heading mb-4">Ready to Accelerate Your Career?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Join our mentorship program and get the guidance you need to succeed in the competitive tech industry.
              </p>
              <Button asChild size="lg" variant="accent" className="rounded-full">
                <Link to="/book-training">Join the Mentorship Program</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Mentorship;