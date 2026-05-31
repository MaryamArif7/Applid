import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import SandboxSection from '@/components/SandboxSection'
import DashboardSection from '@/components/DashboardSection'
import FeaturesSection from '@/components/FeaturesSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <SandboxSection />
      <DashboardSection />
      <FeaturesSection />
      <Footer />
    </main>
  )
}
