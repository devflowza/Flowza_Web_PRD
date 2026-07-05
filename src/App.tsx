import { Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './site/Home';
import GetStarted from './pages/GetStarted';
import ProductDetail from './pages/ProductDetail';
import FinanceDemo from './pages/FinanceDemo';
import About from './pages/About';
import Locations from './pages/Locations';
import Documentation from './pages/Documentation';
import HelpCenter from './pages/HelpCenter';
import Status from './pages/Status';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import Contact from './pages/Contact';
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import { AdminThemeProvider } from './admin/context/ThemeContext';
import { ToastProvider } from './admin/context/ToastContext';
import AdminLayout from './admin/components/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import Setup2FA from './admin/pages/Setup2FA';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminContacts from './admin/pages/AdminContacts';
import ContactDetail from './admin/pages/ContactDetail';
import AdminSettings from './admin/pages/AdminSettings';
import AdminSecurity from './admin/pages/AdminSecurity';
import AdminUsers from './admin/pages/AdminUsers';

function PublicRoutes() {
  return (
    <>
      <ScrollToTop />
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
      </Routes>
    </>
  );
}

function AdminRoutes() {
  return (
    <AdminThemeProvider>
      <AdminAuthProvider>
        <ToastProvider>
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
