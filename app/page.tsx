"use client";

import Features from "@/components/landingPage/features";
import Footer from "@/components/landingPage/footer";
import HeroSection from "@/components/landingPage/hero-section";
import PartnersSection from "@/components/landingPage/partners-section";
import StatsSection from "@/components/landingPage/stats-section";
import { TextAnimate } from '@/components/ui/text-animation';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PartnersSection />
      <section className="relative z-9 w-full h-screen overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 flex justify-center">
          <div className="text-center max-w-2xl mb-0">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">Why we are the best in the Industry</h2>
              <TextAnimate by="character" animation="blurInUp" delay={0.15} duration={0.8} className="text-muted-foreground max-w-xl">
                Powerful primitives, reliable infrastructure, and a team that supports you throughout the process. The stack below highlights key capabilities that make it easy for you to succeed.
              </TextAnimate>
            </div>
          </div>
        </div>
        <Features />
      </section>
      <StatsSection />
      <Footer />
    </main>
  );
}
