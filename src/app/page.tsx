"use client";

import HeroSection from "@/components/home/HeroSection";
import ProductCategories from "@/components/home/StepsSection";
import FloatingWhatsAppButton from "@/components/home/FloatingWhatsAppButton";
import GoogleReviewsSection from "@/components/home/GoogleReviewsSection";
import SpecialOccasionRecommendations from "@/components/home/SpecialOccasionRecommendations";
import AppFeaturesSection from "@/components/home/AppFeaturesSection";
import { useEffect, useState } from "react";
import StepsSection from "@/components/home/StepsSection";

export default function Home() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      <HeroSection />
      <StepsSection />
      <FloatingWhatsAppButton />
      <SpecialOccasionRecommendations />
      <AppFeaturesSection />
      <GoogleReviewsSection />
    </div>
  );
}
