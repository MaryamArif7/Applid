import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
// import SandboxSection from '@/components/SandboxSection'
import DashboardSection from "@/components/DashboardSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import ProblemSection from "@/components/ProblemSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import StatsBar from "@/components/StatsBar";
import ClosingCTA from "@/components/ClosingCTA";
export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProblemSection /> 
      <HowItWorksSection /> 
      <DashboardSection />
      <ClosingCTA />
      <Footer />
    </main>
  );
}
