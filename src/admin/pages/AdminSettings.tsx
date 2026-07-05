import { useState, useEffect, FormEvent } from 'react';
import { Server, Mail, Eye, EyeOff, Save, Zap, Plus, Trash2, ToggleLeft, ToggleRight, Users } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';
import { callEdgeFunction } from '../lib/api';
import type { SmtpConfig, NotificationRecipient } from '../types';

const defaultConfig: Omit<SmtpConfig, 'id' | 'updated_at'> = {
  host: '',
  port: 587,
  encryption: 'tls',
  username: '',
  password: '',
  sender_name: '',
  sender_email: '',
};

const emptyRecipient = { email: '', label: '', notify_on_new: true, notify_on_replied: true };

export default function AdminSettings() {
  const { session } = useAdminAuth();
  const { addToast } = useToast();
  const [config, setConfig] = useState(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [recipients, setRecipients] = useState<NotificationRecipient[]>([]);
  const [recipientsLoading, setRecipientsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecipient, setNewRecipient] = useState(emptyRecipient);
  const [addingRecipient, setAddingRecipient] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;
    callEdgeFunction<{ config: SmtpConfig | null }>('admin-smtp', { action: 'get' }, session.token)
      .then(({ config: c }) => {
        if (c) {
          setConfig({
            host: c.host,
            port: c.port,
            encryption: c.encryption,
            username: c.username,
            password: c.password,
            sender_name: c.sender_name,
            sender_email: c.sender_email,
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    loadRecipients();
  }, [session]);

  async function loadRecipients() {
    if (!session) return;
    setRecipientsLoading(true);
    try {
      const { recipients: data } = await callEdgeFunction<{ recipients: NotificationRecipient[] }>(
        'admin-notification-recipients',
        { action: 'list' },
        session.token
      );
      setRecipients(data);
    } catch {
    } finally {
      setRecipientsLoading(false);
    }
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!session) return;
    setSaving(true);
    try {
      await callEdgeFunction('admin-smtp', { action: 'save', config }, session.token);
      addToast('success', 'SMTP configuration saved');
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  }

  async function handleTest() {
    if (!session) return;
    setTesting(true);
    try {
      await callEdgeFunction('admin-smtp', { action: 'test', config }, session.token);
      addToast('success', 'Test email sent! Check your inbox.');
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : 'Test email failed');
    } finally {
      setTesting(false);
    }
  }

  async function handleAddRecipient(e: FormEvent) {
    e.preventDefault();
    if (!session) return;
    setAddingRecipient(true);
    try {
      const { recipient } = await callEdgeFunction<{ recipient: NotificationRecipient }>(
        'admin-notification-recipients',
        { action: 'add', ...newRecipient },
        session.token
      );
      setRecipients(prev => [...prev, recipient]);
      setNewRecipient(emptyRecipient);
      setShowAddForm(false);
      addToast('success', 'Recipient added');
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : 'Failed to add recipient');
    } finally {
      setAddingRecipient(false);
    }
  }

  async function handleToggleActive(recipient: NotificationRecipient) {
    if (!session) return;
    setTogglingId(recipient.id);
    try {
      const { recipient: updated } = await callEdgeFunction<{ recipient: NotificationRecipient }>(
        'admin-notification-recipients',
        { action: 'update', id: recipient.id, is_active: !recipient.is_active },
        session.token
      );
      setRecipients(prev => prev.map(r => r.id === updated.id ? updated : r));
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : 'Failed to update recipient');
    } finally {
      setTogglingId(null);
    }
  }

  async function handleToggleFlag(recipient: NotificationRecipient, flag: 'notify_on_new' | 'notify_on_replied') {
    if (!session) return;
    setTogglingId(recipient.id);
    try {
      const { recipient: updated } = await callEdgeFunction<{ recipient: NotificationRecipient }>(
        'admin-notification-recipients',
        { action: 'update', id: recipient.id, [flag]: !recipient[flag] },
        session.token
      );
      setRecipients(prev => prev.map(r => r.id === updated.id ? updated : r));
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : 'Failed to update recipient');
    } finally {
      setTogglingId(null);
    }
  }

  async function handleDeleteRecipient(id: string) {
    if (!session) return;
    setDeletingId(id);
    try {
      await callEdgeFunction('admin-notification-recipients', { action: 'delete', id }, session.token);
      setRecipients(prev => prev.filter(r => r.id !== id));
      addToast('success', 'Recipient removed');
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : 'Failed to remove recipient');
    } finally {
      setDeletingId(null);
    }
  }

  const field = (
    label: string,
    key: keyof typeof config,
    type: string = 'text',
    placeholder = ''
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
      <input
        type={key === 'password' ? (showPass ? 'text' : 'password') : type}
        value={String(config[key])}
        onChange={e => setConfig(prev => ({ ...prev, [key]: type === 'number' ? Number(e.target.value) : e.target.value }))}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
      />
    </div>
  );

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Configure email sending and forwarding settings</p>
      </div>

      {loading ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 animate-pulse">
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave}>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                <Server size={15} className="text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white text-sm">SMTP Server</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Outbound email configuration</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {field('SMTP Host', 'host', 'text', 'smtp.gmail.com')}
                {field('SMTP Port', 'port', 'number', '587')}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Encryption</label>
                <select
                  value={config.encryption}
                  onChange={e => setConfig(prev => ({ ...prev, encryption: e.target.value as 'tls' | 'ssl' | 'none' }))}
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition appearance-none"
                >
                  <option value="tls">TLS (recommended)</option>
                  <option value="ssl">SSL</option>
                  <option value="none">None</option>
                </select>
              </div>

              {field('SMTP Username', 'username', 'text', 'you@gmail.com')}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">SMTP Password</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={config.password}
                    onChange={e => setConfig(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="App password or SMTP password"
                    className="w-full pl-3 pr-10 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 border-b">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                  <Mail size={15} className="text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Sender Identity</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">How emails appear to recipients</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {field('Sender Name', 'sender_name', 'text', 'Flowza Support')}
                {field('Sender Email', 'sender_email', 'email', 'support@flowza.ai')}
              </div>
            </div>

            <div className="px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white font-semibold rounded-lg text-sm transition-colors"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save size={15} />
                )}
                Save Configuration
              </button>
              <button
                type="button"
                onClick={handleTest}
                disabled={testing || !config.host}
                className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-60 font-medium rounded-lg text-sm transition-colors"
              >
                {testing ? (
                  <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Zap size={15} />
                )}
                Test Connection
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Forwarding Recipients */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
              <Users size={15} className="text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Forwarding Recipients</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Email addresses that receive forwarded contact messages</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(v => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <Plus size={13} />
            Add Recipient
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddRecipient} className="px-6 py-5 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">New Recipient</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={newRecipient.email}
                  onChange={e => setNewRecipient(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="team@example.com"
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Label <span className="font-normal text-gray-400">(optional)</span></label>
                <input
                  type="text"
                  value={newRecipient.label}
                  onChange={e => setNewRecipient(prev => ({ ...prev, label: e.target.value }))}
                  placeholder="Sales Team"
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-5 mb-5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={newRecipient.notify_on_new}
                  onChange={e => setNewRecipient(prev => ({ ...prev, notify_on_new: e.target.checked }))}
                  className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500 focus:ring-offset-0"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Notify on New / Unread</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={newRecipient.notify_on_replied}
                  onChange={e => setNewRecipient(prev => ({ ...prev, notify_on_replied: e.target.checked }))}
                  className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500 focus:ring-offset-0"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Notify on Replied</span>
              </label>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={addingRecipient}
                className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white font-semibold rounded-lg text-sm transition-colors"
              >
                {addingRecipient ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Plus size={14} />
                )}
                Add
              </button>
              <button
                type="button"
                onClick={() => { setShowAddForm(false); setNewRecipient(emptyRecipient); }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {recipientsLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="animate-pulse flex items-center gap-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8" />
              </div>
            ))}
          </div>
        ) : recipients.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <Users size={28} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400">No forwarding recipients configured</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Add email addresses to automatically receive forwarded contact messages</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {recipients.map(recipient => (
              <div key={recipient.id} className={`px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 transition-colors ${!recipient.is_active ? 'opacity-50' : ''}`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{recipient.email}</span>
                    {recipient.label && (
                      <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full">{recipient.label}</span>
                    )}
                    {!recipient.is_active && (
                      <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-full">Inactive</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    <button
                      onClick={() => handleToggleFlag(recipient, 'notify_on_new')}
                      disabled={togglingId === recipient.id}
                      className={`flex items-center gap-1 text-xs transition-colors ${recipient.notify_on_new ? 'text-sky-600 dark:text-sky-400' : 'text-gray-400 dark:text-gray-600'}`}
                    >
                      {recipient.notify_on_new ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                      New / Unread
                    </button>
                    <button
                      onClick={() => handleToggleFlag(recipient, 'notify_on_replied')}
                      disabled={togglingId === recipient.id}
                      className={`flex items-center gap-1 text-xs transition-colors ${recipient.notify_on_replied ? 'text-sky-600 dark:text-sky-400' : 'text-gray-400 dark:text-gray-600'}`}
                    >
                      {recipient.notify_on_replied ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                      Replied
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleActive(recipient)}
                    disabled={togglingId === recipient.id}
                    title={recipient.is_active ? 'Deactivate' : 'Activate'}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-50"
                  >
                    {recipient.is_active ? <ToggleRight size={16} className="text-sky-500" /> : <ToggleLeft size={16} />}
                  </button>
                  <button
                    onClick={() => handleDeleteRecipient(recipient.id)}
                    disabled={deletingId === recipient.id}
                    title="Remove recipient"
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition disabled:opacity-50"
                  >
                    {deletingId === recipient.id
                      ? <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                      : <Trash2 size={15} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
