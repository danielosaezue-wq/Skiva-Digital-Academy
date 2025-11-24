import React from 'react';
import { Helmet } from 'react-helmet';
import { motion, useInView, animate } from 'framer-motion';
import { CheckCircle, ZoomIn, Users, User, Clock, Award } from 'lucide-react';
import { useRef } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const AnimatedCounter = ({ to }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.5
  });
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    if (isInView) {
      const controls = animate(0, to, {
        duration: 2,
        onUpdate(value) {
          setCount(Math.floor(value));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, to]);
  
  return <span ref={ref}>{count}</span>;
};

const About = () => {
  const logoUrl = "https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/49e60bbd8ca690e162188560bc90f599.png";
  const missionImageUrl = "https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/59cea7f4d6819472d8227bb6e33a311a.png";
  const visionImageUrl = "https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/f9e12120330df18b51a7ee07b7514e4e.png";
  const certificateUrl = "https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/a92c7d1f3750977511c7786f2eca395f.jpg";
  const aboutDisplayImageUrl = "https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/021963de2982b5ed4f0756ee3323ce71.jpg";

  const whatWeDo = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "What We Do",
      description: "At Skiva Digital Academy, we focus on providing real expertise and real results. We connect learners directly with verified industry instructors who offer practical knowledge backed by real-world experience. We also create intensive, project-based short courses designed to help learners master specific digital skills in a short time. Every course is practical, market-driven, and structured to make you job-ready, productive, and competitive immediately."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Flexible Learning",
      description: "We understand that every learner has unique needs. That's why Skiva offers flexible learning options that allow you to learn your way, at your pace. You can choose: Online Group Classes (3–5 learners) or Private One-on-One Sessions. Regardless of the format, you receive direct, personalized feedback from your instructor, ensuring clarity, support, and quality throughout your learning journey."
    },
    {
      icon: <User className="h-8 w-8" />,
      title: "Mentorship",
      description: "Learning at Skiva goes beyond the classroom. Our mentorship program connects you with seasoned industry professionals who provide continuous guidance, career insights, and personalized support. This mentorship helps you build confidence, navigate challenges, and accelerate your growth in the tech ecosystem."
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Skiva Digital Academy - Digital Education Nigeria</title>
        <meta name="description" content="Learn about Skiva Digital Academy, a leading digital skills academy in Africa, committed to providing practical, market-driven tech training in Nigeria." />
        <link rel="canonical" href="https://www.skivadigitalacademy.com/about" />
      </Helmet>

      <div className="bg-background text-foreground">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pt-24 pb-16 sm:pt-32 sm:pb-24"
        >
          <div className="container mx-auto px-4">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto text-center mb-16">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center mb-6"
              >
                <img src={logoUrl} alt="Skiva Digital Academy Logo" className="h-16 w-auto" />
              </motion.div>
              
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-4xl md:text-5xl font-bold text-primary tracking-tight mb-6"
              >
                About Us
              </motion.h1>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              >
                Skiva Digital Academy (RN 8684248) is fully registered under the Corporate Affairs Commission (CAC) in accordance with the Companies and Allied Matters Act, 2020. We are committed to equipping individuals with practical, market-ready digital skills through programs that bridge the gap between learning and real-world application.
              </motion.p>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-4 text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              >
                In a world where everyone claims to be an expert, finding the right instructor can be difficult. At Skiva, we remove that uncertainty. We connect you with verified, industry-tested instructors who have real experience and proven results—ensuring you learn from professionals who truly understand their craft.
              </motion.p>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="mt-8 p-6 bg-primary/10 border border-primary/20 rounded-lg max-w-2xl mx-auto"
              >
                <p className="text-xl md:text-2xl font-semibold text-primary italic">
                  "At Skiva, we don't just teach SKIlls — we deliver VAlue that shapes your future."
                </p>
              </motion.div>
            </div>

            {/* Main Image */}
            <div className="mb-16">
              <img 
                src={aboutDisplayImageUrl} 
                alt="Skiva Digital Academy team working collaboratively" 
                className="rounded-lg shadow-lg w-full max-w-5xl mx-auto" 
              />
            </div>

            {/* Mission & Vision Section */}
            <div className="bg-secondary py-16 rounded-lg mb-20">
              <div className="max-w-6xl mx-auto px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  {/* Mission */}
                  <div className="grid gap-8 items-center">
                    <img src={missionImageUrl} alt="Our Mission" className="rounded-lg shadow-lg w-full" />
                    <div>
                      <h2 className="text-3xl font-bold text-primary font-heading mb-4">Our Mission</h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        To equip learners with relevant, practical digital skills delivered by trusted industry professionals—ensuring they gain the right skills, from the right people, at the right time, and at a cost that empowers their career and future.
                      </p>
                    </div>
                  </div>
                  
                  {/* Vision */}
                  <div className="grid gap-8 items-center">
                    <div>
                      <h2 className="text-3xl font-bold text-primary font-heading mb-4">Our Vision</h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        To become Africa's most trusted pathway to digital empowerment, enabling anyone, anywhere, to access high-quality skills, connect with expert instructors, and explore real opportunities that transform their careers.
                      </p>
                    </div>
                    <img src={visionImageUrl} alt="Our Vision" className="rounded-lg shadow-lg w-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* What We Do Section - Improved Layout */}
            <div className="mt-20">
              <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-16 font-heading">
                What Makes Skiva Different
              </h2>
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {whatWeDo.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="p-8 bg-card rounded-xl shadow-sm border border-border hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="p-3 bg-primary/10 rounded-full mb-4">
                        <div className="text-primary">
                          {item.icon}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-center">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certificate Section */}
            <div className="mt-20">
              <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4 font-heading">
                Certificate of Completion
              </h2>
              <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-8 text-lg">
                Every course at Skiva Digital Academy comes with an official Certificate of Completion. This certificate validates the skills you've gained and can be proudly showcased to employers, clients, or added to your portfolio.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="max-w-3xl mx-auto rounded-lg shadow-2xl overflow-hidden cursor-pointer group relative">
                    <img 
                      loading="lazy" 
                      src={certificateUrl} 
                      alt="Sample Skiva Digital Academy Certificate of Completion" 
                      className="w-full h-auto" 
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="w-16 h-16 text-white" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0">
                  <img 
                    src={certificateUrl} 
                    alt="Enlarged view of Skiva Digital Academy Certificate of Completion" 
                    className="w-full h-auto rounded-lg" 
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Impact Numbers Section */}
            <div className="mt-20 bg-primary text-primary-foreground py-16 rounded-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-heading">
                Our Impact in Numbers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <p className="text-5xl font-bold text-accent mb-2">
                    <AnimatedCounter to={15} />+
                  </p>
                  <p className="text-lg">Programs</p>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <p className="text-5xl font-bold text-accent mb-2">
                    <AnimatedCounter to={500} />+
                  </p>
                  <p className="text-lg">Students Trained</p>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <p className="text-5xl font-bold text-accent mb-2">
                    <AnimatedCounter to={7} />+
                  </p>
                  <p className="text-lg">Countries Reached</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default About;