import { useState, useEffect, useCallback } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import AdminSidebar from './AdminSidebar';
import ToastContainer from './ToastContainer';
import { callEdgeFunction } from '../lib/api';

export default function AdminLayout() {
  const { session, isLoading } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = useCallback(async () => {
    if (!session) return;
    try {
      const { count } = await callEdgeFunction<{ count: number }>(
        'admin-data',
        { action: 'get-unread-count' },
        session.token
      );
      setUnreadCount(count);
    } catch {
    }
  }, [session]);

  useEffect(() => {
    if (!session) return;
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [session, fetchUnreadCount]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return <Navigate to="/adm" replace />;

  if (!session.user.totp_setup_complete) {
    return <Navigate to="/adm/setup-2fa" replace />;
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <AdminSidebar unreadCount={unreadCount} onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="font-semibold text-gray-900 dark:text-white text-sm">FlowZa Admin</span>
        </header>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}
