import React from 'react';
import { Link } from 'react-router-dom';
import HomeFooter from '../components/HomeFooter';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
    {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">Ghana Talent Hub</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
              
              <div className="flex space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-indigo-600">Log in</Link>
                <Link 
                  to="/register" 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            
            <span className="block text-indigo-600">Home page</span>
          </h1>
          
          <div className="mt-10 flex justify-center space-x-4">
            
            
          </div>
        </div>
      </div>

      <HomeFooter />
      
      

      
    </div>
  );
};

export default Home;
