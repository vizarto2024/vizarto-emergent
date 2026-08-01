import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import DualPath from "../components/DualPath";
import AIMatching from "../components/AIMatching";
import JobsSection from "../components/JobsSection";
import CandidatesSection from "../components/CandidatesSection";
import { Stats, Testimonials, LocationsSection } from "../components/Sections";
import CTABand from "../components/CTABand";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="bg-white text-slate-900">
      <Header />
      <Hero />
      <Stats />
      <Features />
      <DualPath />
      <AIMatching />
      <JobsSection />
      <LocationsSection />
      <CandidatesSection />
      <Testimonials />
      <CTABand />
      <Footer />
    </div>
  );
};

export default Landing;
