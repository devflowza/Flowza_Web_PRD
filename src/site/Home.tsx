import { useEffect } from 'react';
import SiteLayout from './SiteLayout';
import HomeHero from './home/HomeHero';
import ClientsMarquee from './home/ClientsMarquee';
import PlatformsGrid from './home/PlatformsGrid';
import HowItWorks from './home/HowItWorks';
import WhyFlowza from './home/WhyFlowza';
import FinanceSpotlight from './home/FinanceSpotlight';
import Pricing from '../components/Pricing';
import TestimonialsSection from './home/TestimonialsSection';
import ActionTrio from './home/ActionTrio';
import FaqSection from './home/FaqSection';

export default function Home() {
  useEffect(() => {
    document.title = 'Flowza AI — Business Operating Systems';
  }, []);

  return (
    <SiteLayout>
      <HomeHero />
      <ClientsMarquee />
      <PlatformsGrid />
      <HowItWorks />
      <WhyFlowza />
      <FinanceSpotlight />
      <Pricing />
      <TestimonialsSection />
      <ActionTrio />
      <FaqSection />
    </SiteLayout>
  );
}
