import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Pricing = () => {
  const { toast } = useToast();

  const plans = [
    {
      name: 'Starter Plan',
      price: '₦50,000',
      usdPrice: '$60',
      description: 'Perfect for beginners starting their digital journey',
      features: [
        'Access to 1 course of your choice',
        'Online training sessions',
        'Basic learning materials',
        'Community forum access',
        'Certificate of completion',
        '30-day money-back guarantee'
      ],
      popular: false,
      color: 'from-gray-600 to-gray-700'
    },
    {
      name: 'Pro Plan',
      price: '₦120,000',
      usdPrice: '$150',
      description: 'Most popular choice for serious learners',
      features: [
        'Access to 3 courses',
        'Online + offline training options',
        'Mentorship sessions (3 sessions)',
        'Portfolio review and feedback',
        'Industry networking events',
        'Job placement assistance',
        'Lifetime community access',
        'Priority support'
      ],
      popular: true,
      color: 'from-blue-500 to-purple-600'
    },
    {
      name: 'Premium Plan',
      price: 'Custom Pricing',
      usdPrice: 'Contact Us',
      description: 'Tailored for professionals seeking personalized growth',
      features: [
        '1-on-1 Personalized training',
        'Unlimited course access',
        'Dedicated mentor assignment',
        'Internship opportunity guaranteed',
        'Custom learning path design',
        'Direct industry connections',
        'Personal branding support',
        'Lifetime career support'
      ],
      popular: false,
      color: 'from-purple-600 to-pink-600'
    }
  ];

  const additionalServices = [
    {
      name: 'Individual Course',
      price: '₦25,000 - ₦40,000',
      description: 'Single course access without additional benefits'
    },
    {
      name: 'Mentorship Only',
      price: '₦15,000/session',
      description: 'One-on-one mentoring sessions with industry experts'
    },
    {
      name: 'Portfolio Review',
      price: '₦10,000',
      description: 'Professional review and feedback on your portfolio'
    },
    {
      name: 'Career Consultation',
      price: '₦8,000',
      description: 'Strategic career planning and guidance session'
    }
  ];

  const handleSelectPlan = (planName) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      description: `Enrollment for ${planName} will be available soon.`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Pricing & Plans - Skiva Digital Academy</title>
        <meta name="description" content="Choose the perfect learning plan for your digital career journey. Flexible pricing options from starter to premium plans with mentorship and internship opportunities." />
      </Helmet>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Choose Your <span className="gradient-text">Learning Plan</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Flexible pricing options designed to fit your budget and career goals
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`glass-effect rounded-xl p-8 card-hover relative ${
                    plan.popular ? 'ring-2 ring-blue-400 scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-current" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                      <span className="text-gray-400 ml-2">/ {plan.usdPrice}</span>
                    </div>
                    <p className="text-gray-300">{plan.description}</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={() => handleSelectPlan(plan.name)}
                    className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white`}
                  >
                    {plan.name === 'Premium Plan' ? 'Contact Us' : 'Get Started'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 bg-gray-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Additional <span className="gradient-text">Services</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                À la carte options for specific needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-effect rounded-xl p-6 card-hover"
                >
                  <h3 className="text-lg font-bold text-white mb-2">{service.name}</h3>
                  <div className="text-2xl font-bold gradient-text mb-3">{service.price}</div>
                  <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                  <Button 
                    onClick={() => handleSelectPlan(service.name)}
                    variant="outline" 
                    className="w-full border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                  >
                    Select
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: 'Can I switch plans later?',
                  answer: 'Yes, you can upgrade your plan at any time. The price difference will be calculated and you can pay the remaining amount.'
                },
                {
                  question: 'Is there a refund policy?',
                  answer: 'We offer a 30-day money-back guarantee for all our plans. If you\'re not satisfied, we\'ll refund your payment.'
                },
                {
                  question: 'Are the courses self-paced?',
                  answer: 'Our courses offer flexibility with both self-paced learning and scheduled live sessions depending on your chosen plan.'
                },
                {
                  question: 'Do you offer payment plans?',
                  answer: 'Yes, we offer flexible payment plans for all our courses. Contact us to discuss installment options.'
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-effect rounded-xl p-6"
                >
                  <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-effect rounded-2xl p-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Still Have <span className="gradient-text">Questions?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Our team is here to help you choose the perfect plan for your career goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4">
                    Contact Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/book-training">
                  <Button size="lg" variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4">
                    Book Consultation
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Pricing;