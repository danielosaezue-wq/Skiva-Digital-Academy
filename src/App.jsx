import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Courses from '@/pages/Courses';
import CourseDetail from '@/pages/CourseDetail';
import Mentorship from '@/pages/Mentorship';
import BookTraining from '@/pages/BookTraining';
import Contact from '@/pages/Contact';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import Pricing from '@/pages/Pricing';
import BecomeAnInstructor from '@/pages/BecomeAnInstructor';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import { Helmet } from 'react-helmet';

function App() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Skiva Digital Academy",
    "url": "https://www.skivadigitalacademy.com",
    "logo": "https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/004a50b0c4e05fd5c2414215b1671995.png",
    "description": "Practical online training platform in Nigeria offering courses in web development, UI/UX, data science, and more. Get certified and launch your tech career.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NG"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+2347025753414",
      "contactType": "Customer Service",
      "email": "info@skivadigitalacademy.com"
    },
    "sameAs": [
      "https://www.linkedin.com/company/skivadigitalacademy",
      "https://www.instagram.com/skivadigitalacademy"
    ]
  };

  return (
    <Router>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:courseId" element={<CourseDetail />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/book-training" element={<BookTraining />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/become-an-instructor" element={<BecomeAnInstructor />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;