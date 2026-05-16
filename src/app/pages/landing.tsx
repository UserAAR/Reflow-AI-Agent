import { Navbar } from "../components/navbar";
import { Hero } from "../components/hero";
import { WhyReflow } from "../components/why-reflow";
import { ProcessTimeline } from "../components/process-timeline";
import { IntelligencePreview } from "../components/intelligence-preview";
import { Security } from "../components/security";
import { FinalCTA } from "../components/final-cta";
import { Footer } from "../components/footer";

export default function Landing() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 antialiased selection:bg-emerald-200/60">
      <Navbar />
      <main>
        <Hero />
        <WhyReflow />
        <ProcessTimeline />
        <IntelligencePreview />
        <Security />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
