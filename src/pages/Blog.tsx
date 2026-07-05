import { useState } from 'react';
import { Clock, ArrowRight, Bookmark } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';

const categories = ['All', 'Product', 'Company', 'Engineering', 'Guides', 'Industry'];

const posts = [
  {
    id: 1,
    category: 'Product',
    title: 'Introducing Flowza Finance 3.0: Real-Time AI Bookkeeping',
    excerpt: 'Our biggest product update yet. Flowza Finance 3.0 brings real-time transaction categorization, automated VAT reporting, and a new AI assistant that answers financial questions in plain language.',
    author: 'Layla Hassan',
    authorRole: 'CTO',
    authorImg: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: 'Feb 14, 2026',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
  },
  {
    id: 2,
    category: 'Company',
    title: 'Why We Raised a Series A to Build Deeper, Not Wider',
    excerpt: 'Six platforms is plenty. Here\'s why we\'re investing our Series A in making each product 10x better rather than launching new ones.',
    author: 'Nasser Al-Rashidi',
    authorRole: 'CEO',
    authorImg: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: 'Jan 28, 2026',
    readTime: '4 min read',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
  },
  {
    id: 3,
    category: 'Engineering',
    title: 'How We Built the Flowza Unified AI Core',
    excerpt: 'One model to rule them all. We explain the architecture decisions behind sharing a single AI brain across six vastly different product surfaces.',
    author: 'Khalid Nuri',
    authorRole: 'Head of Engineering',
    authorImg: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: 'Jan 10, 2026',
    readTime: '12 min read',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
  },
  {
    id: 4,
    category: 'Guides',
    title: 'Getting the Most Out of Flowza Spa Master: A Complete Setup Guide',
    excerpt: 'From booking configuration to staff scheduling, loyalty programs to payment processing — everything you need to launch Flowza Spa Master in under an hour.',
    author: 'Sara Al-Mansoori',
    authorRole: 'VP Customer Success',
    authorImg: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: 'Dec 19, 2025',
    readTime: '9 min read',
    image: '/product-spamaster-new.webp',
    featured: false,
  },
  {
    id: 5,
    category: 'Industry',
    title: 'The State of AI Adoption in GCC SMEs: 2026 Report',
    excerpt: 'We surveyed 350 small and medium businesses across the UAE, KSA, Qatar, and Egypt. The findings are both promising and sobering.',
    author: 'Omar Khalil',
    authorRole: 'CPO',
    authorImg: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: 'Dec 5, 2025',
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
  },
  {
    id: 6,
    category: 'Engineering',
    title: 'Zero-Downtime Deployments at Scale: Lessons from 99.9% Uptime',
    excerpt: 'How we achieved 99.9% uptime across six live products serving 100+ businesses — without a single major incident in the past year.',
    author: 'Khalid Nuri',
    authorRole: 'Head of Engineering',
    authorImg: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: 'Nov 22, 2025',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
  },
  {
    id: 7,
    category: 'Guides',
    title: 'Migrating to Flowza LogisPro: A Step-by-Step Playbook',
    excerpt: 'Switching logistics platforms sounds scary. We\'ve moved 18 companies to Flowza LogisPro without a single day of operational downtime.',
    author: 'Sara Al-Mansoori',
    authorRole: 'VP Customer Success',
    authorImg: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: 'Nov 8, 2025',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
  },
  {
    id: 8,
    category: 'Product',
    title: 'Flowza QRForge Dynamic Campaigns: How Brands Are Using Smart QR Codes',
    excerpt: 'QR codes are having a massive renaissance. We look at five innovative ways Flowza clients are using Flowza QRForge dynamic campaigns to drive measurable ROI.',
    author: 'Hana Yamamoto',
    authorRole: 'Head of Design',
    authorImg: 'https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: 'Oct 30, 2025',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
  },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');

  const featured = posts.find((p) => p.featured);
  const filtered = posts
    .filter((p) => !p.featured)
    .filter((p) => activeCategory === 'All' || p.category === activeCategory);

  return (
    <PageLayout>
      <PageHero
        label="Flowza Blog"
        title="Ideas, Insights &"
        titleHighlight="Updates"
        subtitle="Deep dives into AI, product thinking, engineering craft, and the future of business software — from the team building it."
        imageUrl="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />

      {featured && (
        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-600 mb-6">Featured Post</p>
            <div className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group">
              <div className="overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 min-h-[280px]"
                />
              </div>
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold mb-4">{featured.category}</span>
                  <h2 className="font-display font-bold text-2xl text-gray-900 mb-3 leading-tight group-hover:text-sky-700 transition-colors">{featured.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={featured.authorImg} alt={featured.author} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-semibold text-gray-900">{featured.author}</p>
                      <p className="text-xs text-gray-400">{featured.authorRole}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <Clock size={12} />
                    <span>{featured.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-10 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-sky-600 text-white shadow-[0_0_16px_rgba(14,165,233,0.35)]'
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <div className="overflow-hidden h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold">{post.category}</span>
                    <button className="text-gray-300 hover:text-sky-500 transition-colors">
                      <Bookmark size={14} />
                    </button>
                  </div>
                  <h3 className="font-display font-semibold text-gray-900 mb-2 leading-snug group-hover:text-sky-700 transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={post.authorImg} alt={post.author} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-xs text-gray-500">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock size={11} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500">No posts in this category yet. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center bg-white border border-gray-200 rounded-3xl p-12 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_10px_30px_rgba(15,23,42,0.05)]">
          <h2 className="font-display font-bold text-3xl text-gray-900 mb-3">Stay in the loop</h2>
          <p className="text-gray-600 mb-8">Get our best articles delivered to your inbox — no spam, ever.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-sky-400 transition-colors"
            />
            <button className="px-6 py-3 rounded-full bg-violet-gradient text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all duration-200 flex items-center gap-2">
              Subscribe <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
