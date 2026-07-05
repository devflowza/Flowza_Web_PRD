import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Settings,
  ShieldCheck,
  LogOut,
  Zap,
  Moon,
  Sun,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useAdminTheme } from '../context/ThemeContext';

interface Props {
  unreadCount: number;
  onClose?: () => void;
}

const navItems = [
  { to: '/adm/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/adm/contacts', icon: MessageSquare, label: 'Contacts' },
  { to: '/adm/users', icon: Users, label: 'Users' },
  { to: '/adm/settings', icon: Settings, label: 'Settings' },
  { to: '/adm/security', icon: ShieldCheck, label: 'Security' },
];

export default function AdminSidebar({ unreadCount, onClose }: Props) {
  const { logout } = useAdminAuth();
  const { theme, toggleTheme } = useAdminTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/adm');
  };

  return (
    <aside className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 w-64 shrink-0">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">Flowza.ai</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Admin Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`
            }
          >
            <Icon size={17} />
            <span>{label}</span>
            {label === 'Contacts' && unreadCount > 0 && (
              <span className="ml-auto bg-sky-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {unreadCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-800 space-y-1">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all w-full"
        >
          {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all w-full"
        >
          <LogOut size={17} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
