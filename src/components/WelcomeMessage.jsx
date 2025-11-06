import React from 'react';

const WelcomeMessage = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
            Welcome to Skiva Digital Academy
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We are committed to providing high-quality, practical digital skills training that prepares you for the evolving job market. Our programs are designed to be straight to the point with respect to market demand.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { title: 'One-on-one Training', icon: '👤', desc: 'Personalized onsite private training tailored to your needs' },
              { title: 'Group Training', icon: '👥', desc: 'Onsite group training for teams and organizations' },
              { title: 'Mentorship', icon: '🎓', desc: 'Guidance from industry experts to accelerate your growth' },
              { title: 'Personalized Learning', icon: '📚', desc: 'Custom learning paths based on your goals and pace' },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-100 text-center">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-heading font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeMessage;