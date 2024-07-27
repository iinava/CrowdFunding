import React from "react";
import Herosection from "./Sections/Herosection";
import Stories from "./Sections/Stories";
import Testimonials from "./Sections/Testimonials";
import Features from "./Sections/Features";
import ContactUs from "./Sections/ContactUs";
import Footer from "./Sections/Footer";
import { useSelector } from "react-redux";

export default function LandingPage() {
  return (
    <div className="text-white">
      <Herosection />
      <Stories />
      <Testimonials />
      <Features />
      <ContactUs />
      <Footer />
    </div>
  );
}
