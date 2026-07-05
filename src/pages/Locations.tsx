import { Users, Clock } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import LocationCard from '../components/LocationCard';

const locations = [
  {
    company: 'Head Office',
    city: 'Bengaluru',
    country: 'India',
    address: 'CloudValley Solutions OPC Pvt Ltd\nSai Sree Layout, Parappana Agrahara,\nBengaluru, Karnataka, India',
    companyHighlight: 'CloudValley Solutions OPC Pvt Ltd',
    phone: '',
    email: '',
    description: '',
    accentColor: '#0ea5e9',
  },
  {
    company: 'Development Center',
    city: 'Muscat',
    country: 'Oman',
    address: 'SoarTek LLC\nNear Centara Hotel,\nGhala, Muscat,\nOman',
    companyHighlight: 'SoarTek LLC',
    phone: '',
    email: '',
    description: '',
    accentColor: '#06b6d4',
  },
  {
    company: 'Other Locations',
    city: 'Dubai',
    country: 'United Arab Emirates',
    address: 'National Insurance Building, Office 603, Opposite Deira City Center, Deira, Dubai, United Arab Emirates',
    phone: '',
    email: '',
    description: '',
    accentColor: '#f59e0b',
  },
];

const highlights = [
  {
    icon: Users,
    title: 'Diverse Teams',
    description: '50+ talented professionals united by a mission to transform business operations.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock availability across all time zones ensuring your business never stops.',
  },
];

export default function Locations() {
  return (
    <PageLayout>
      <PageHero
        label="Office Locations"
        title="Wherever You Are,"
        titleHighlight="We're There Too"
        subtitle="Flowza operates globally with offices strategically positioned across India and the Middle East. Connect with our teams across three major hubs."
        imageUrl="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-sky-600" />
                </div>
                <h3 className="font-display font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-600 mb-3 block">
              Our Offices
            </span>
            <h2 className="font-display font-bold text-4xl text-gray-900">Visit Our Global Offices</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {locations.map((location) => (
              <LocationCard key={location.company} {...location} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-4xl text-gray-900 mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Reach out to our team and we'll connect you with the right person to help.
          </p>
          <a
            href="mailto:contact@flowza.ai"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white bg-sky-gradient hover:shadow-[0_0_28px_rgba(14,165,233,0.55)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Contact Us
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
