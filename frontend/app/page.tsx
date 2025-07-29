import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { FeaturedJobs } from "@/components/featured-jobs"
import { FeaturedEmployers } from "@/components/featured-employers"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <StatsSection />
      <FeaturedJobs />
      <FeaturedEmployers />
      <Footer />
    </main>
  )
}
