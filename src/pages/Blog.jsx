import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { blogPostsData } from '@/lib/blogData';

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog & Resources - Skiva Digital Academy</title>
        <meta name="description" content="Stay updated with the latest industry trends, career advice, and learning tips from the Skiva Digital Academy blog." />
        <link rel="canonical" href="https://www.skivadigitalacademy.com/blog" />
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
              Our Blog & Resources
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Insights, trends, and advice to help you succeed in the digital world.
            </motion.p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPostsData.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card rounded-lg shadow-lg overflow-hidden flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2 group"
                >
                  <Link to={`/blog/${post.slug}`} className="flex flex-col justify-between h-full">
                    <div>
                      <div className="overflow-hidden h-56">
                        <img 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          alt={post.title}
                          src={post.image} />
                      </div>
                      
                      <div className="p-6">
                        <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                          {post.category}
                        </span>

                        <h3 className="text-xl font-bold font-heading text-foreground mt-4 mb-3">{post.title}</h3>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{post.date}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm mb-6">{post.excerpt}</p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <div
                        className="w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-10 px-4 py-2"
                      >
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">Ready to Start Your Learning Journey?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Explore our courses and find the perfect program to build your future.
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
    </>
  );
};

export default Blog;