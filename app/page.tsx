"use client";

import Features from "@/components/landingPage/features";
import HeroSection from "@/components/landingPage/hero-section";
import PartnersSection from "@/components/landingPage/partners-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PartnersSection />
      <section className="w-full h-screen overflow-hidden">
        <Features />
      </section>
    </main>
  );
}
