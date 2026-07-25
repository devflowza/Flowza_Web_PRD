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
import { faqItems } from './data';

const faqJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});

export default function Home() {
  useEffect(() => {
    document.title = 'FlowZa AI — Business Operating Systems';
  }, []);

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
      <HomeHero />
      <ClientsMarquee />
      <PlatformsGrid />
      <HowItWorks />
      <WhyFlowza />
      <FinanceSpotlight />
      <Pricing />
      <TestimonialsSection />
      <FaqSection />
      <ActionTrio />
    </SiteLayout>
  );
}
