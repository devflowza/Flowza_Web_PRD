import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './site/Home';

/* Route-level code splitting: only the home page ships in the main bundle. */
const GetStarted = lazy(() => import('./pages/GetStarted'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const FinanceDemo = lazy(() => import('./pages/FinanceDemo'));
const About = lazy(() => import('./pages/About'));
const Locations = lazy(() => import('./pages/Locations'));
const Documentation = lazy(() => import('./pages/Documentation'));
const HelpCenter = lazy(() => import('./pages/HelpCenter'));
const Status = lazy(() => import('./pages/Status'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AdminLogin = lazy(() => import('./admin/pages/AdminLogin'));
const Setup2FA = lazy(() => import('./admin/pages/Setup2FA'));
const AdminLayout = lazy(() => import('./admin/components/AdminLayout'));
const AdminDashboard = lazy(() => import('./admin/pages/AdminDashboard'));
const AdminContacts = lazy(() => import('./admin/pages/AdminContacts'));
const ContactDetail = lazy(() => import('./admin/pages/ContactDetail'));
const AdminSettings = lazy(() => import('./admin/pages/AdminSettings'));
const AdminSecurity = lazy(() => import('./admin/pages/AdminSecurity'));
const AdminUsers = lazy(() => import('./admin/pages/AdminUsers'));

import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import { AdminThemeProvider } from './admin/context/ThemeContext';
import { ToastProvider } from './admin/context/ToastContext';

/** Quiet route-transition fallback. */
function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white" aria-busy="true" aria-label="Loading">
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
      </span>
    </div>
  );
}

function PublicRoutes() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/finance" element={<FinanceDemo />} />
          <Route path="/finance-demo" element={<FinanceDemo />} />
          <Route path="/about" element={<About />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/status" element={<Status />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

function AdminRoutes() {
  return (
    <AdminThemeProvider>
      <AdminAuthProvider>
        <ToastProvider>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/adm" element={<AdminLogin />} />
              <Route path="/adm/setup-2fa" element={<Setup2FA />} />
              <Route path="/adm/*" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="contacts" element={<AdminContacts />} />
                <Route path="contacts/:id" element={<ContactDetail />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="security" element={<AdminSecurity />} />
              </Route>
            </Routes>
          </Suspense>
        </ToastProvider>
      </AdminAuthProvider>
    </AdminThemeProvider>
  );
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/adm');

  if (isAdmin) return <AdminRoutes />;
  return <PublicRoutes />;
}
