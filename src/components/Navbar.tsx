import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, MessageCircle, Mail } from 'lucide-react';

const products = [
  { id: 'finance', name: 'Flowza Finance', tagline: 'All-in-one finance & ERP', color: '#10b981' },
  { id: 'spamaster', name: 'Flowza Spa Master', tagline: 'Spa & wellness management', color: '#f43f5e' },
  { id: 'logispro', name: 'Flowza LogisPro', tagline: 'Smart logistics platform', color: '#38bdf8' },
  { id: 'qrforge', name: 'Flowza QRForge', tagline: 'Dynamic QR code engine', color: '#f59e0b' },
  { id: 'pos', name: 'Flowza POS', tagline: 'Next-gen point of sale', color: '#0ea5e9' },
  { id: 'fleetza', name: 'Flowza Fleetza', tagline: 'Fleet intelligence system', color: '#06b6d4' },
  { id: 'club', name: 'Flowza Club', tagline: 'Club & membership management', color: '#9333ea' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-products-menu]')) setProductsOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`w-full max-w-6xl rounded-2xl border px-5 py-3 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-2xl border-sky-200/80 shadow-[0_4px_24px_rgba(14,165,233,0.14)]'
            : 'bg-white/70 backdrop-blur-xl border-sky-100 shadow-[0_2px_16px_rgba(14,165,233,0.06)]'
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="relative w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.4)] group-hover:shadow-[0_0_30px_rgba(14,165,233,0.6)] transition-all duration-300">
            <img
              src="/Logo_Final_-_Focused.jpeg"
              alt="Flowza"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-display font-bold text-sm tracking-tight transition-colors duration-500 text-sky-900">
            Flowza<span className="text-gradient-violet"> AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <div data-products-menu className="relative">
            <button
              onClick={() => setProductsOpen((v) => !v)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm transition-colors duration-200 rounded-full ${
                scrolled
                  ? 'text-gray-600 hover:text-sky-700 hover:bg-sky-50'
                  : 'text-gray-600 hover:text-sky-700 hover:bg-sky-50'
              }`}
            >
              Products
              <ChevronDown
                size={13}
                className={`transition-transform duration-300 ${productsOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {productsOpen && (
              <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-[520px] rounded-2xl border border-sky-100 bg-white shadow-[0_24px_80px_rgba(14,165,233,0.18)] overflow-hidden" style={{ animation: 'slideUp 0.25s ease-out forwards' }}>
                <div className="p-3 grid grid-cols-2 gap-1.5">
                  {products.map((product) => (
                    <Link
                      key={product.name}
                      to={`/products/${product.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-sky-50 transition-all duration-200 group/item"
                      onClick={() => setProductsOpen(false)}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background: `${product.color}18`,
                          border: `1px solid ${product.color}40`,
                        }}
                      >
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: product.color }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 group-hover/item:text-sky-700 transition-colors leading-tight">{product.name}</p>
                        <p className="text-xs text-gray-500 leading-tight mt-0.5">{product.tagline}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-end">
                  <a href="https://flowza.ai/#products" className="text-xs text-sky-600 font-medium hover:text-sky-800 transition-colors">All platforms →</a>
                </div>
              </div>
            )}
          </div>

          <a
            href="#why-flowza"
            className={`px-4 py-2 text-sm transition-colors duration-200 rounded-full ${
              scrolled ? 'text-gray-600 hover:text-sky-700 hover:bg-sky-50' : 'text-gray-600 hover:text-sky-700 hover:bg-sky-50'
            }`}
          >
            Why Flowza
          </a>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://web.whatsapp.com/send?phone=96892107562&text=Hello! Flowza"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex items-center gap-1.5 px-3 py-2 text-sm transition-all duration-200 rounded-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
          >
            <MessageCircle size={15} />
            <span>WhatsApp</span>
          </a>
          <Link
            to="/contact"
            className={`flex items-center gap-1.5 px-3 py-2 text-sm transition-colors duration-200 rounded-full ${
              scrolled ? 'text-gray-600 hover:text-sky-700 hover:bg-sky-50' : 'text-gray-600 hover:text-sky-700 hover:bg-sky-50'
            }`}
          >
            <Mail size={14} />
            <span>Contact</span>
          </Link>
          <a
            href="#products"
            className="relative px-5 py-2.5 rounded-full text-sm font-semibold text-white overflow-hidden group bg-violet-gradient hover:shadow-[0_0_28px_rgba(14,165,233,0.55)] transition-all duration-300 hover:-translate-y-0.5"
          >
            <span className="relative z-10">Explore Products</span>
            <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className={`md:hidden p-2 rounded-full transition-colors ${
            scrolled ? 'text-gray-600 hover:text-sky-700 hover:bg-sky-50' : 'text-gray-600 hover:text-sky-700 hover:bg-sky-50'
          }`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="absolute top-full mt-2 left-4 right-4 rounded-2xl border border-sky-100 bg-white shadow-[0_16px_48px_rgba(14,165,233,0.18)] overflow-hidden md:hidden" style={{ animation: 'slideUp 0.25s ease-out forwards' }}>
          <div className="p-4">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-widest px-2 mb-2">Products</p>
            <div className="grid grid-cols-1 gap-1 mb-4">
              {products.map((product) => (
                <Link
                  key={product.name}
                  to={`/products/${product.id}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-sky-50 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${product.color}18`, border: `1px solid ${product.color}40` }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: product.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 flex flex-col gap-1">
              <a href="#why-flowza" className="px-3 py-2.5 text-sm text-gray-600 hover:text-sky-700 rounded-xl hover:bg-sky-50 transition-colors" onClick={() => setMobileOpen(false)}>Why Flowza</a>
              <a
                href="https://web.whatsapp.com/send?phone=96892107562&text=Hello! Flowza"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-emerald-600 hover:text-emerald-700 rounded-xl hover:bg-emerald-50 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <MessageCircle size={14} />
                WhatsApp
              </a>
              <Link
                to="/contact"
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-600 hover:text-sky-700 rounded-xl hover:bg-sky-50 transition-colors w-full text-left"
                onClick={() => setMobileOpen(false)}
              >
                <Mail size={14} />
                Contact
              </Link>
            </div>
            <div className="mt-3">
              <a
                href="#products"
                className="block text-center py-3 rounded-full text-sm font-semibold text-white bg-violet-gradient"
                onClick={() => setMobileOpen(false)}
              >
                Explore Products
              </a>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
