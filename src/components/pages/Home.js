import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Layout, Terminal, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-32 pb-24 text-center">
        <h1 className="text-6xl font-extrabold mb-6 leading-tight">
          Code Editor Platform
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Write, Edit, and Preview HTML, CSS, and JavaScript in real-time.
          Build, test, and deploy your web projects all in one place.
        </p>
        <div className="flex justify-center space-x-6">
          <Link
            to="/signup"
            className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg"
          >
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="border border-gray-300 text-gray-300 hover:text-white hover:border-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-800 py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-16">
            Everything you need to code
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Code size={40} />}
              title="Live Preview"
              description="See your changes in real-time as you code."
            />
            <FeatureCard 
              icon={<Terminal size={40} />}
              title="Multiple Languages"
              description="Support for HTML, CSS, and JavaScript."
            />
            <FeatureCard 
              icon={<Layout size={40} />}
              title="Responsive Design"
              description="Test your designs across all screen sizes."
            />
            <FeatureCard 
              icon={<Users size={40} />}
              title="Collaboration"
              description="Share and work together with other developers."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-700 p-6 rounded-lg text-center shadow-md hover:bg-gray-600 transition duration-200">
    <div className="text-purple-500 mb-4 flex justify-center">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export default Home;
