import About from "@/components/About";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Reviews from "@/components/Reviews";
import React from "react";

const Home = () => {
  return (
    <div className="bg-[#f0f4f8]">

      <Navbar />
      {/* Hero */}
      <section id="home">
        <Hero />
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <Features />
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-white">
        <About />
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-18 bg-[#f0f4f8]">
        <Reviews/>
      </section>
    </div>
  );
};

export default Home;
