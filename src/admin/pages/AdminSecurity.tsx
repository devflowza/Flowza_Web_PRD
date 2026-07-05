import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Key, RefreshCw, Copy, CheckCircle, AlertTriangle, Lock, RotateCcw } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';
import { callEdgeFunction } from '../lib/api';

interface BackupCodesData {
  codes: string[];
}

export default function AdminSecurity() {
  const { session } = useAdminAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [loadingCodes, setLoadingCodes] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowConfirm(false);
        setShowResetConfirm(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!session) return;
    callEdgeFunction<BackupCodesData>('admin-2fa-setup', { action: 'get-backup-codes' }, session.token)
      .then(({ codes }) => setBackupCodes(codes || []))
      .catch(() => {})
      .finally(() => setLoadingCodes(false));
  }, [session]);

  async function regenerateCodes() {
    if (!session) return;
    setRegenerating(true);
    try {
      const { codes } = await callEdgeFunction<BackupCodesData>(
        'admin-2fa-setup',
        { action: 'regenerate-backup-codes' },
        session.token
      );
      setBackupCodes(codes);
      setShowConfirm(false);
      addToast('success', 'Backup codes regenerated. Save them now!');
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : 'Failed to regenerate');
    } finally {
      setRegenerating(false);
    }
  }

  function copyCodes() {
    navigator.clipboard.writeText(backupCodes.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    addToast('success', 'Backup codes copied to clipboard');
  }

  async function resetTotp() {
    if (!session) return;
    setResetting(true);
    try {
      await callEdgeFunction('admin-2fa-setup', { action: 'reset-totp' }, session.token);
      setShowResetConfirm(false);
      addToast('success', 'Authenticator reset. Please re-enroll your app.');
      navigate('/adm/setup-2fa');
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : 'Failed to reset 2FA');
    } finally {
      setResetting(false);
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Security</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage two-factor authentication and backup codes</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <ShieldCheck size={15} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Two-Factor Authentication</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">TOTP-based authentication (RFC 6238)</p>
              </div>
            </div>
          </div>
          <div className="px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Status: {session?.user.totp_enabled ? 'Enabled' : 'Disabled'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Compatible with Google Authenticator and Microsoft Authenticator
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                >
                  <RotateCcw size={13} />
                  Re-enroll Authenticator
                </button>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                  session?.user.totp_enabled
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                }`}>
                  {session?.user.totp_enabled ? (
                    <><CheckCircle size={12} /> Active</>
                  ) : (
                    <><AlertTriangle size={12} /> Inactive</>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                  <Key size={15} className="text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Backup Codes</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">One-time use emergency access codes</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyCodes}
                  disabled={backupCodes.length === 0}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition disabled:opacity-50"
                >
                  {copied ? <CheckCircle size={13} className="text-emerald-500" /> : <Copy size={13} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button
                  onClick={() => setShowConfirm(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition"
                >
                  <RefreshCw size={13} />
                  Regenerate
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {loadingCodes ? (
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-9 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : backupCodes.length === 0 ? (
              <div className="text-center py-6">
                <Lock size={28} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">No backup codes available</p>
              </div>
            ) : (
              <>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-3 flex gap-2.5 mb-4">
                  <AlertTriangle size={14} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    Each code can only be used once. Store these in a secure password manager.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {backupCodes.map((code, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-2.5 text-center"
                    >
                      <code className="text-sm font-mono text-gray-700 dark:text-gray-300">{code}</code>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {showConfirm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4" onClick={() => setShowConfirm(false)}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Regenerate backup codes?</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                This will invalidate all existing backup codes. Make sure to save the new ones.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={regenerateCodes}
                  disabled={regenerating}
                  className="flex-1 py-2.5 bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                >
                  {regenerating ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Regenerate'}
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showResetConfirm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4" onClick={() => setShowResetConfirm(false)}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                  <RotateCcw size={18} className="text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Re-enroll authenticator app?</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                This will generate a new 2FA secret. Your current authenticator app entry will stop working and you will be taken through the setup process again.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={resetTotp}
                  disabled={resetting}
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                >
                  {resetting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Reset & Re-enroll'}
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
