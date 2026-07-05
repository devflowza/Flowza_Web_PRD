import { useState, useEffect, useCallback } from 'react';
import { Users, Plus, Search, MoreHorizontal, ShieldCheck, ShieldOff, KeyRound, Trash2, CreditCard as Edit3, CheckCircle, XCircle, RefreshCw, Eye, EyeOff, X, AlertTriangle, Crown, User } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';
import { callEdgeFunction } from '../lib/api';
import type { AdminUserRecord } from '../types';

type Modal =
  | { type: 'create' }
  | { type: 'edit'; user: AdminUserRecord }
  | { type: 'password'; user: AdminUserRecord }
  | { type: 'delete'; user: AdminUserRecord }
  | { type: 'reset2fa'; user: AdminUserRecord }
  | null;

export default function AdminUsers() {
  const { session } = useAdminAuth();
  const { addToast } = useToast();
  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<Modal>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    try {
      const { users } = await callEdgeFunction<{ users: AdminUserRecord[] }>(
        'admin-data', { action: 'list-admin-users' }, session.token
      );
      setUsers(users);
    } catch {
      addToast('error', 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [session, addToast]);

  useEffect(() => {
    if (!session) return;
    loadUsers();
  }, [session, loadUsers]);

  const filtered = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.display_name || '').toLowerCase().includes(search.toLowerCase())
  );

  function closeModal() {
    setModal(null);
  }

  function handleCreated(user: AdminUserRecord) {
    setUsers(prev => [...prev, user]);
    closeModal();
    addToast('success', `Admin account created for ${user.email}`);
  }

  function handleUpdated(user: AdminUserRecord) {
    setUsers(prev => prev.map(u => u.id === user.id ? user : u));
    closeModal();
    addToast('success', 'User updated successfully');
  }

  function handleDeleted(id: string) {
    setUsers(prev => prev.filter(u => u.id !== id));
    closeModal();
    addToast('success', 'User deleted');
  }

  function handle2faReset(id: string) {
    setUsers(prev => prev.map(u =>
      u.id === id ? { ...u, totp_enabled: false, totp_setup_complete: false } : u
    ));
    closeModal();
    addToast('success', '2FA reset — user must re-enroll on next login');
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Manage admin portal accounts and access
          </p>
        </div>
        <button
          onClick={() => setModal({ type: 'create' })}
          className="flex items-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          <Plus size={16} />
          New User
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="relative max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
            />
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 animate-pulse">
                <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 bg-gray-200 dark:bg-gray-700 rounded w-40" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-56" />
                </div>
                <div className="h-6 w-20 bg-gray-100 dark:bg-gray-800 rounded-full hidden sm:block" />
                <div className="h-6 w-16 bg-gray-100 dark:bg-gray-800 rounded-full hidden md:block" />
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center">
              <Users size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {search ? 'No users match your search' : 'No admin users yet'}
              </p>
            </div>
          ) : (
            filtered.map(user => (
              <UserRow
                key={user.id}
                user={user}
                currentUserId={session!.user.id}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                onEdit={() => { setActiveMenu(null); setModal({ type: 'edit', user }); }}
                onPassword={() => { setActiveMenu(null); setModal({ type: 'password', user }); }}
                onReset2fa={() => { setActiveMenu(null); setModal({ type: 'reset2fa', user }); }}
                onDelete={() => { setActiveMenu(null); setModal({ type: 'delete', user }); }}
                onToggleActive={async () => {
                  setActiveMenu(null);
                  try {
                    const { user: updated } = await callEdgeFunction<{ user: AdminUserRecord }>(
                      'admin-data',
                      { action: 'update-admin-user', id: user.id, is_active: !user.is_active },
                      session!.token
                    );
                    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
                    addToast('success', `Account ${updated.is_active ? 'enabled' : 'disabled'}`);
                  } catch (e: unknown) {
                    addToast('error', e instanceof Error ? e.message : 'Failed to update');
                  }
                }}
              />
            ))
          )}
        </div>
      </div>

      {modal?.type === 'create' && (
        <CreateUserModal token={session!.token} onClose={closeModal} onCreated={handleCreated} />
      )}
      {modal?.type === 'edit' && (
        <EditUserModal token={session!.token} user={modal.user} onClose={closeModal} onUpdated={handleUpdated} />
      )}
      {modal?.type === 'password' && (
        <ResetPasswordModal token={session!.token} user={modal.user} onClose={closeModal} onSuccess={() => { closeModal(); addToast('success', 'Password updated'); }} />
      )}
      {modal?.type === 'reset2fa' && (
        <Reset2FAModal token={session!.token} user={modal.user} onClose={closeModal} onSuccess={() => handle2faReset(modal.user.id)} />
      )}
      {modal?.type === 'delete' && (
        <DeleteUserModal token={session!.token} user={modal.user} onClose={closeModal} onDeleted={() => handleDeleted(modal.user.id)} />
      )}

      {activeMenu && (
        <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
      )}
    </div>
  );
}

function UserRow({
  user, currentUserId, activeMenu, setActiveMenu,
  onEdit, onPassword, onReset2fa, onDelete, onToggleActive
}: {
  user: AdminUserRecord;
  currentUserId: string;
  activeMenu: string | null;
  setActiveMenu: (id: string | null) => void;
  onEdit: () => void;
  onPassword: () => void;
  onReset2fa: () => void;
  onDelete: () => void;
  onToggleActive: () => void;
}) {
  const isMe = user.id === currentUserId;
  const menuOpen = activeMenu === user.id;

  return (
    <div className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shrink-0 text-white text-sm font-bold">
        {(user.display_name || user.email).charAt(0).toUpperCase()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
            {user.display_name || user.email}
          </p>
          {isMe && (
            <span className="text-xs bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 px-1.5 py-0.5 rounded font-medium">
              You
            </span>
          )}
          {!user.is_active && (
            <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded font-medium">
              Disabled
            </span>
          )}
        </div>
        {user.display_name && (
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
        )}
      </div>

      <div className="hidden sm:flex items-center gap-1.5 shrink-0">
        <RoleBadge role={user.role} />
      </div>

      <div className="hidden md:flex items-center gap-1.5 shrink-0">
        {user.totp_enabled ? (
          <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full font-medium">
            <ShieldCheck size={11} />
            2FA on
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full font-medium">
            <ShieldOff size={11} />
            2FA off
          </span>
        )}
      </div>

      <div className="hidden lg:block text-xs text-gray-400 dark:text-gray-500 shrink-0 w-28 text-right">
        {user.last_login_at
          ? new Date(user.last_login_at).toLocaleDateString()
          : 'Never logged in'}
      </div>

      <div className="relative shrink-0">
        <button
          onClick={(e) => { e.stopPropagation(); setActiveMenu(menuOpen ? null : user.id); }}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <MoreHorizontal size={16} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 py-1 z-20">
            <MenuBtn icon={Edit3} label="Edit profile" onClick={onEdit} />
            <MenuBtn icon={KeyRound} label="Reset password" onClick={onPassword} />
            <MenuBtn icon={RefreshCw} label="Reset 2FA" onClick={onReset2fa} />
            <MenuBtn
              icon={user.is_active ? XCircle : CheckCircle}
              label={user.is_active ? 'Disable account' : 'Enable account'}
              onClick={onToggleActive}
            />
            {!isMe && (
              <>
                <div className="my-1 border-t border-gray-100 dark:border-gray-800" />
                <MenuBtn icon={Trash2} label="Delete user" onClick={onDelete} danger />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function MenuBtn({ icon: Icon, label, onClick, danger = false }: { icon: React.ElementType; label: string; onClick: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 w-full px-3.5 py-2 text-sm transition-colors ${
        danger
          ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
      }`}
    >
      <Icon size={14} />
      {label}
    </button>
  );
}

function RoleBadge({ role }: { role: string }) {
  if (role === 'super_admin') {
    return (
      <span className="flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full">
        <Crown size={10} />
        Super Admin
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
      <User size={10} />
      Admin
    </span>
  );
}

function ModalShell({ title, subtitle, onClose, children }: { title: string; subtitle?: string; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4 py-8" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">{title}</h2>
            {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors -mt-0.5">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-3.5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition";

function PasswordInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || 'Enter password'}
        className={inputCls + ' pr-10'}
      />
      <button
        type="button"
        onClick={() => setShow(s => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      >
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  );
}

function CreateUserModal({ token, onClose, onCreated }: { token: string; onClose: () => void; onCreated: (u: AdminUserRecord) => void }) {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'super_admin'>('admin');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const { user } = await callEdgeFunction<{ user: AdminUserRecord }>(
        'admin-data',
        { action: 'create-admin-user', email, password, role, display_name: displayName },
        token
      );
      onCreated(user);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
    } finally {
      setSaving(false);
    }
  }

  return (
    <ModalShell title="Create admin user" subtitle="New user will need to set up 2FA on first login" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertTriangle size={14} className="text-red-500 shrink-0" />
            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}
        <Field label="Email address">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@example.com" className={inputCls} />
        </Field>
        <Field label="Display name (optional)">
          <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Full name" className={inputCls} />
        </Field>
        <Field label="Password">
          <PasswordInput value={password} onChange={setPassword} placeholder="Minimum 8 characters" />
        </Field>
        <Field label="Role">
          <select value={role} onChange={e => setRole(e.target.value as 'admin' | 'super_admin')} className={inputCls}>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </Field>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving || !email || !password} className="flex-1 py-2.5 bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
            {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Plus size={15} />}
            Create User
          </button>
          <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg text-sm transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

function EditUserModal({ token, user, onClose, onUpdated }: { token: string; user: AdminUserRecord; onClose: () => void; onUpdated: (u: AdminUserRecord) => void }) {
  const [email, setEmail] = useState(user.email);
  const [displayName, setDisplayName] = useState(user.display_name || '');
  const [role, setRole] = useState(user.role);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const { user: updated } = await callEdgeFunction<{ user: AdminUserRecord }>(
        'admin-data',
        { action: 'update-admin-user', id: user.id, email, role, display_name: displayName },
        token
      );
      onUpdated(updated);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
    } finally {
      setSaving(false);
    }
  }

  return (
    <ModalShell title="Edit user" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertTriangle size={14} className="text-red-500 shrink-0" />
            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}
        <Field label="Email address">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className={inputCls} />
        </Field>
        <Field label="Display name">
          <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Full name" className={inputCls} />
        </Field>
        <Field label="Role">
          <select value={role} onChange={e => setRole(e.target.value)} className={inputCls}>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </Field>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving || !email} className="flex-1 py-2.5 bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
            {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : null}
            Save Changes
          </button>
          <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg text-sm transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

function ResetPasswordModal({ token, user, onClose, onSuccess }: { token: string; user: AdminUserRecord; onClose: () => void; onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return; }
    setSaving(true);
    try {
      await callEdgeFunction('admin-data', { action: 'reset-admin-password', id: user.id, newPassword: password }, token);
      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setSaving(false);
    }
  }

  return (
    <ModalShell title="Reset password" subtitle={`Setting new password for ${user.display_name || user.email}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertTriangle size={14} className="text-red-500 shrink-0" />
            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}
        <Field label="New password">
          <PasswordInput value={password} onChange={setPassword} placeholder="Minimum 8 characters" />
        </Field>
        <Field label="Confirm password">
          <PasswordInput value={confirm} onChange={setConfirm} placeholder="Repeat password" />
        </Field>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving || !password || !confirm} className="flex-1 py-2.5 bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
            {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <KeyRound size={14} />}
            Set Password
          </button>
          <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg text-sm transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

function Reset2FAModal({ token, user, onClose, onSuccess }: { token: string; user: AdminUserRecord; onClose: () => void; onSuccess: () => void }) {
  const [saving, setSaving] = useState(false);

  async function handle() {
    setSaving(true);
    try {
      await callEdgeFunction('admin-data', { action: 'reset-admin-2fa', id: user.id }, token);
      onSuccess();
    } catch {
      setSaving(false);
    }
  }

  return (
    <ModalShell title="Reset 2FA" onClose={onClose}>
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
          <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
              Reset 2FA for {user.display_name || user.email}?
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
              Their current authenticator app entry will stop working. They will be required to re-enroll on next login.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={handle} disabled={saving} className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
            {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <RefreshCw size={14} />}
            Reset 2FA
          </button>
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg text-sm transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

function DeleteUserModal({ token, user, onClose, onDeleted }: { token: string; user: AdminUserRecord; onClose: () => void; onDeleted: () => void }) {
  const [saving, setSaving] = useState(false);

  async function handle() {
    setSaving(true);
    try {
      await callEdgeFunction('admin-data', { action: 'delete-admin-user', id: user.id }, token);
      onDeleted();
    } catch {
      setSaving(false);
    }
  }

  return (
    <ModalShell title="Delete user" onClose={onClose}>
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-800 dark:text-red-300">
              Permanently delete {user.display_name || user.email}?
            </p>
            <p className="text-xs text-red-700 dark:text-red-400 mt-1">
              This action cannot be undone. The account will be removed immediately.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={handle} disabled={saving} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
            {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Trash2 size={14} />}
            Delete
          </button>
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg text-sm transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
