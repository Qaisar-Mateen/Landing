"use client";

import Features from "@/components/landingPage/features";
import Footer from "@/components/landingPage/footer";
import HeroSection from "@/components/landingPage/hero-section";
import PartnersSection from "@/components/landingPage/partners-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PartnersSection />
      <section className="relative z-9 w-full h-screen overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 flex justify-center">
          <div className="text-center max-w-2xl mb-12">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">Why we are the best in the Industry</h2>
              <p className="text-muted-foreground max-w-xl">Powerful primitives, reliable infrastructure, and a team that supports you throughout the process. The stack below highlights a few key capabilities that make it easy for you to succeed.</p>
            </div>
          </div>
        </div>
        <Features />
      </section>
      <Footer />
    </main>
  );
}
