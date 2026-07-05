import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, CheckCircle, Archive, Inbox, ArrowRight, Clock, BookOpen } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { callEdgeFunction } from '../lib/api';
import type { ContactSubmission } from '../types';

interface Stats {
  total: number;
  new: number;
  read: number;
  replied: number;
  archived: number;
}

export default function AdminDashboard() {
  const { session } = useAdminAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({ total: 0, new: 0, read: 0, replied: 0, archived: 0 });
  const [recent, setRecent] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    try {
      const [statsData, recentData] = await Promise.all([
        callEdgeFunction<Stats>('admin-data', { action: 'get-stats' }, session.token),
        callEdgeFunction<{ submissions: ContactSubmission[] }>('admin-data', { action: 'get-recent' }, session.token),
      ]);
      setStats(statsData);
      setRecent(recentData.submissions);
    } catch {
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (!session) return;
    loadData();
  }, [session, loadData]);

  const cards = [
    { label: 'Total', value: stats.total, icon: MessageSquare, color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-900/20' },
    { label: 'New / Unread', value: stats.new, icon: Inbox, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Read', value: stats.read, icon: BookOpen, color: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-100 dark:bg-gray-800' },
    { label: 'Replied', value: stats.replied, icon: CheckCircle, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Archived', value: stats.archived, icon: Archive, color: 'text-gray-500 dark:text-gray-400', bg: 'bg-gray-100 dark:bg-gray-800' },
  ];

  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    read: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    replied: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    archived: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500',
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Welcome back, {session?.user.email}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 animate-pulse">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-4" />
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-12" />
              </div>
            ))
          : cards.map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 leading-tight">{label}</p>
                  <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                    <Icon size={15} className={color} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
              </div>
            ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="font-semibold text-gray-900 dark:text-white">Recent Submissions</h2>
          <button
            onClick={() => navigate('/adm/contacts')}
            className="text-sm text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 flex items-center gap-1 transition-colors"
          >
            View all <ArrowRight size={14} />
          </button>
        </div>

        {loading ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="px-6 py-4 animate-pulse flex items-center gap-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1" />
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16" />
              </div>
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <MessageSquare size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">No submissions yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {recent.map(sub => (
              <button
                key={sub.id}
                onClick={() => navigate(`/adm/contacts/${sub.id}`)}
                className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left"
              >
                <div className="min-w-0 flex-1 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 items-center">
                  <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{sub.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{sub.subject}</p>
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-400">{new Date(sub.submitted_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[sub.status]}`}>
                  {sub.status}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
