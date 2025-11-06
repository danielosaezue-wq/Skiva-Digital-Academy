import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const Testimonials = () => {
  const testimonials = [{
    name: "Emmanuel",
    role: "UI/UX & Graphic Designer",
    text: "Skiva Digital Academy took my tech skills to the next level with practical, problem-solving approaches to design challenges and beyond. I’m truly grateful for the experience and extend my appreciation to the mentor. God bless you richly.",
    image: "https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/ef35450d60fc5a5cd40fe8fddc77af26.jpg"
  }, {
    name: "Hafsat",
    role: "UI/UX Designer",
    text: "Learning UI/UX design at Skiva was one of the best decisions i made for myself. The instructor was very patient with us in class, which made it easy. Overall the learning experience was a 100/10 kudos.",
    image: "https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/25f4ba36e54ff8e245a9e60edb040758.jpg"
  }, {
    name: "Theodoric",
    role: "Graphic Designer",
    text: "Learning step by step helped me grow into a confident graphic designer with work I’m proud to share, and my work attracts paying clients.",
    image: "https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/c93e467fd26f4597754d81723a678ccd.webp"
  }, {
    name: "Chinenye",
    role: "UI/UX Designer",
    text: "At Skiva Digital Academy, learning felt real. Every lesson was tied to solving actual design problems. I was pushed to think deeper and build solutions, not just designs. I’m grateful for the growth.",
    image: "https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/e37351a8c25c703830a7d8aef2396436.jpg"
  }, {
    name: "Believe",
    role: "UI/UX Designer",
    text: "My time at Skiva Digital Academy was eye-opening. The classes were practical, engaging, and industry-focused. Complex concepts were broken down into simple steps, and today I approach design with confidence.",
    image: "https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/e3516415f54d42f41567970b1b30b3a5.jpg"
  }, {
    name: "Joshua",
    role: "UI/UX Designer",
    text: "Joining Skiva Digital Academy was one of my best decisions. Beyond learning UI/UX, I gained critical thinking, collaboration, and professional growth skills. The mentorship was second to none!",
    image: "https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/5b53bf6972ac02d1d5c73977567565ff.jpg"
  }, {
    name: "Duke",
    role: "UI/UX / Graphics Designer",
    text: "The mentorship I received pushed me beyond the basics, equipping me with problem-solving strategies that transformed how I approach design.",
    image: "https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/299ce47f83697a02d5f5e1340f9b6c37.jpg"
  }, {
    name: "Lee",
    role: "UI/UX Designer",
    text: "Skiva gave me more than just skills — they gave me confidence. The mentorship and real-time classes made complex topics easy to understand. I secured my first freelance gig within weeks of completing my course",
    image: "https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/e01b78002d08854d369aec86c3755190.jpg"
    }, {
    name: "Prosper",
    role: "Product Designer",
    text: "Skiva Digital Academy upgraded my skillset and mindset. I now approach design like a problem-solver, not just a creator. The guidance made learning practical, inspiring, and impactful. Highly recommend!",
    image: "https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/0fe6174f33c1fcff31e989d48f899862.jpg"
}, {
    name: "Godswill",
    role: "UI/UX Designer",
    text: "Skiva Digital Academy changed the game for me. I thought learning tech would be overwhelming, but the classes were clear, practical, and flexible. Now I design confidently.",
    image: "https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/004f3bda68b2f54610d9d0e5e2b7c49a.jpg"

  }];
  return <>
      <Helmet>
        <title>Testimonials - Skiva Digital Academy</title>
        <meta name="description" content="Hear from our students and alumni about their success stories after completing courses at Skiva Digital Academy." />
      </Helmet>
      <div className="bg-background text-foreground pt-20">
        <section className="py-20 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.7
          }} className="text-4xl md:text-5xl font-bold font-heading text-primary mb-4">Hear From Students</motion.h1>
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.7,
            delay: 0.2
          }} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how Skiva Digital Academy has helped transform careers and build futures.
            </motion.p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} className="bg-card rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
                  <img className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-primary" alt={`Testimonial from ${testimonial.name}`} src={testimonial.image} />
                  <p className="text-muted-foreground italic mb-4">"{testimonial.text}"</p>
                  <h3 className="font-bold font-heading text-lg text-foreground">{testimonial.name}</h3>
                  <p className="text-primary font-medium">{testimonial.role}</p>
                </motion.div>)}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }}>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">Ready to Start Your Success Story?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join our community of successful students and take the first step toward your dream career in tech.
              </p>
              <Link to="/courses">
                <Button size="lg" variant="accent" className="rounded-full">
                  Explore Our Courses
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>;
};
export default Testimonials;