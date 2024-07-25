import React from 'react'
import { Navigate } from 'react-router-dom';
import Herosection from './Sections/Herosection';
import Stories from './Sections/Stories';
import Testimonials from './Sections/Testimonials';
import Features from './Sections/Features';
import ContactUs from './Sections/ContactUs';
import Footer from './Sections/Footer';

export default function LandingPage() {
  const IS_LOGGED_IN = localStorage.getItem('IS_LOGGED_IN')
  if (IS_LOGGED_IN) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className='text-white'>
       <Herosection/>
      <Stories />
      <Testimonials />
      <Features />
      <ContactUs />
      <Footer />
    </div>
  )
}
