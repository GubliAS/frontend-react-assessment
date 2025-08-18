import React from 'react';
import { Link } from 'react-router-dom';
import HomeFooter from '../components/HomeFooter';
import Header from '../components/Header';
import Hero from '../components/Hero';
import LeadingTalentPlatformSection from '../components/LeadingTalentPlatform';
import LaunchYourCareerSection from '../components/LaunchYourCareer';
import EmpoweringYouthSection from '../components/EmpoweringYouth';
import SuccessStories from '../components/SuccessStories';
import GetStartedSection from '../components/GetStarted';
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
    {/* Navigation */}
      <Header />
    <Hero/>
      {/* Hero Section */}
      <div className="bg-white">
         <LeadingTalentPlatformSection />
         <EmpoweringYouthSection/>
          <SuccessStories />
            <GetStartedSection />
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          {/* <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            
            <span className="block text-indigo-600">Home page</span>
          </h1> */}
          
          {/* <div className="mt-10 flex justify-center space-x-4"> */}
                  {/* Leading Talent Platform Section */}
           
            
          {/* </div> */}
         
      {/* Get Started Section */}
    

      {/* Launch Your Career Section */}
      <LaunchYourCareerSection />
        </div>
      </div>


      

      <HomeFooter />
      
      

      
    </div>
  );
};

export default Home;
