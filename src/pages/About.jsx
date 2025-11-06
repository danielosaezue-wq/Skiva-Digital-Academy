import React from 'react';
import { Helmet } from 'react-helmet';
import { motion, useInView, animate } from 'framer-motion';
import { CheckCircle, ZoomIn } from 'lucide-react';
import { useRef } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
const AnimatedCounter = ({
  to
}) => {
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

  const whatWeDo = [{
    title: "Short Courses",
    description: "We offer intensive, focused courses designed to equip learners with specific digital skills in a short time frame. These programs are practical, project-based, and tailored to meet industry demands — making it easy for you to apply what you learn immediately."
  }, {
    title: "Mentorship",
    description: "At Skiva, learning doesn’t stop in the classroom. Our mentorship program connects learners with seasoned professionals who provide guidance, feedback, and career advice. This one-on-one support helps you navigate challenges, build confidence, and accelerate your journey in the tech space."
  }, {
    title: "Flexible Learning",
    description: "We understand that everyone learns differently. That’s why we provide flexible learning options — whether you prefer online sessions, physical classes, or private coaching. With flexible scheduling and delivery modes, you can learn at your own pace without compromising on quality."
  }, {
    title: "Certification",
    description: "Upon completion of our programs, learners receive recognized certificates that validate their skills and boost their professional profiles. These certifications not only strengthen your credibility but also open doors to local and international opportunities in today’s competitive digital economy."
  }];
  return <>
      <Helmet>
        <title>About Skiva Digital Academy - Digital Education Nigeria</title>
        <meta name="description" content="Learn about Skiva Digital Academy, a leading digital skills academy in Africa, committed to providing practical, market-driven tech training in Nigeria." />
        <link rel="canonical" href="https://www.skivadigitalacademy.com/about" />
      </Helmet>
      <div className="bg-background text-foreground">
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.5
      }} className="pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.div initial={{
              y: 20,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              duration: 0.5,
              delay: 0.2
            }} className="flex justify-center mb-6">
                <img src={logoUrl} alt="Skiva Digital Academy Logo" className="h-16 w-auto" />
              </motion.div>
              <motion.h1 initial={{
              y: 20,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              duration: 0.5,
              delay: 0.4
            }} className="text-4xl md:text-5xl font-bold text-primary tracking-tight">About Us</motion.h1>
              <motion.p initial={{
              y: 20,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              duration: 0.5,
              delay: 0.6
            }} className="mt-6 text-lg md:text-xl text-muted-foreground">
                Skiva Digital Academy (RN 8684248) is duly registered with the Corporate Affairs Commission under the Companies and Allied Matters Act, 2020. We are committed to equipping individuals with practical, market-ready digital skills through programs that bridge the gap between learning and real-world application, empowering you to excel in today's fast-evolving tech industry.
              </motion.p>
            </div>

            <div className="mb-16">
              <img src={aboutDisplayImageUrl} alt="Skiva Digital Academy team working collaboratively" className="rounded-lg shadow-lg w-full max-w-5xl mx-auto" />
            </div>

            <div className="bg-secondary py-16 rounded-lg">
              <div className="max-w-5xl mx-auto grid md:grid-cols-1 gap-16 px-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <img src={missionImageUrl} alt="Our Mission" className="rounded-lg shadow-lg w-full" />
                  <div>
                    <h2 className="text-3xl font-bold text-primary font-heading">Our Mission</h2>
                    <p className="mt-2 text-muted-foreground">To empower learners with hands-on, industry-relevant skills that open global career opportunities.</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                   <div className="md:order-2">
                    <img src={visionImageUrl} alt="Our Vision" className="rounded-lg shadow-lg w-full" />
                  </div>
                  <div className="md:order-1">
                    <h2 className="text-3xl font-bold text-primary font-heading">Our Vision</h2>
                    <p className="mt-2 text-muted-foreground">To be Africa’s leading hub for digital education, where innovation, mentorship, and opportunity meet.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20">
              <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12 font-heading">What We Do</h2>
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {whatWeDo.map((item, index) => <div key={index} className="p-6 bg-card rounded-lg shadow-sm">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="h-6 w-6 text-accent mr-3" />
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>)}
              </div>
            </div>

            <div className="mt-20">
              <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4 font-heading">Certificate of Completion</h2>
              <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-8">Every course at Skiva Digital Academy comes with an official Certificate of Completion. This certificate validates the skills you've gained and can be proudly showcased to employers, clients, or added to your portfolio.</p>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="max-w-3xl mx-auto rounded-lg shadow-2xl overflow-hidden cursor-pointer group relative">
                    <img loading="lazy" src={certificateUrl} alt="Sample Skiva Digital Academy Certificate of Completion" className="w-full h-auto" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="w-16 h-16 text-white" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0">
                  <img src={certificateUrl} alt="Enlarged view of Skiva Digital Academy Certificate of Completion" className="w-full h-auto rounded-lg" />
                </DialogContent>
              </Dialog>
            </div>

            <div className="mt-20 bg-primary text-primary-foreground py-16 rounded-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-heading">Our Impact in Numbers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-5xl font-bold text-accent"><AnimatedCounter to={15} />+</p>
                  <p className="mt-2 text-lg">Programs</p>
                </div>
                <div>
                  <p className="text-5xl font-bold text-accent"><AnimatedCounter to={500} />+</p>
                  <p className="mt-2 text-lg">Students Trained</p>
                </div>
                <div>
                  <p className="text-5xl font-bold text-accent"><AnimatedCounter to={7} />+</p>
                  <p className="mt-2 text-lg">Countries Reached</p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </>;
};
export default About;