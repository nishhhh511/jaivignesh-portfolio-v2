import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import CricketJourneySection from "@/components/cricket-journey-section";
import { PerformanceStatsSection } from "@/components/performance-stats-section";
import { AchievementsSection } from "@/components/achievements-section";
import { CertificatesSection } from "@/components/certificates-section";
import { GallerySection } from "@/components/gallery-section";
import { CTASection } from "@/components/cta-section";
import { PremiumFooter } from "@/components/premium-footer";
import { ScrollProgress } from "@/components/scroll-progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jai Vignesh | Student Athlete & Cricketer" },
      {
        name: "description",
        content:
          "Premium portfolio of Jai Vignesh - Student, Cricketer, Dream Chaser. Discover the journey of a passionate cricket player.",
      },
      { property: "og:title", content: "Jai Vignesh | Student Athlete & Cricketer" },
      { property: "og:description", content: "Premium portfolio of Jai Vignesh." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="bg-background text-foreground antialiased">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CricketJourneySection />
      <PerformanceStatsSection />
      <AchievementsSection />
      <CertificatesSection />
      <GallerySection />
      <CTASection />
      <PremiumFooter />
    </main>
  );
}
