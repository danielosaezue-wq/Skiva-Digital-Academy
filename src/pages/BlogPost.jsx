import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { blogPostsData } from '@/lib/blogData';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPostsData.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-40">
        <h1 className="text-3xl font-bold">Post Not Found</h1>
        <p className="text-muted-foreground mt-4">The blog post you are looking for does not exist.</p>
        <Link to="/blog">
          <Button className="mt-8">Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - Skiva Digital Academy Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://www.skivadigitalacademy.com/blog/${post.slug}`} />
      </Helmet>

      <div className="bg-background text-foreground pt-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-8">
              <Link to="/blog" className="inline-flex items-center text-primary hover:underline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </div>

            <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full font-medium mb-4 inline-block">
              {post.category}
            </span>

            <h1 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-4 leading-tight">{post.title}</h1>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg mb-12 shadow-lg">
              <img 
                className="w-full h-auto object-cover"
                alt={post.title}
                src={post.image} 
              />
            </div>

            <div className="prose prose-lg max-w-none text-foreground/90 prose-headings:text-primary prose-headings:font-heading prose-a:text-primary hover:prose-a:underline prose-strong:text-foreground prose-p:leading-relaxed prose-ul:leading-relaxed">
              {post.content}
            </div>
          </motion.div>
        </article>
      </div>
    </>
  );
};

export default BlogPost;