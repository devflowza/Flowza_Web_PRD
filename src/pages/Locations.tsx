import { useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import LocationCard from '../components/LocationCard';
import Reveal from '../site/Reveal';

const locations = [
  {
    company: 'Head Office',
    city: 'Bengaluru',
    country: 'India',
    address: 'CloudValley Solutions OPC Pvt Ltd\nSai Sree Layout, Parappana Agrahara,\nBengaluru, Karnataka, India',
    companyHighlight: 'CloudValley Solutions OPC Pvt Ltd',
  },
  {
    company: 'Development Center',
    city: 'Muscat',
    country: 'Oman',
    address: 'SoarTek LLC\nNear Centara Hotel,\nGhala, Muscat,\nOman',
    companyHighlight: 'SoarTek LLC',
  },
  {
    company: 'Regional Office',
    city: 'Dubai',
    country: 'United Arab Emirates',
    address: 'National Insurance Building, Office 603, Opposite Deira City Center, Deira, Dubai, United Arab Emirates',
  },
];

export default function Locations() {
  useEffect(() => {
    document.title = 'Locations — FlowZa AI';
    return () => {
      document.title = 'FlowZa AI — Business Operating Systems';
    };
  }, []);

  return (
    <PageLayout>
      <PageHero
        label="Locations"
        title="Three hubs,"
        titleHighlight="one team."
        subtitle="FlowZa operates across India and the Middle East — close to the businesses we build for, in their time zones and tax regimes."
      />

      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-5 md:grid-cols-3">
            {locations.map((location, i) => (
              <Reveal key={location.company} delay={i * 90}>
                <LocationCard {...location} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="display-title text-[1.75rem] text-ink sm:text-3xl">
              Can't find what you're looking for?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-500">
              Reach out and we'll connect you with the right person — wherever you are.
            </p>
            <a href="mailto:sales@flowza.ai" className="btn-primary btn-lg mt-8 inline-flex">
              Contact us
            </a>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
