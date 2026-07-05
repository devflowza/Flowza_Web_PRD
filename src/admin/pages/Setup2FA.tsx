import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Copy, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import type { AdminUser } from '../types';
import { useToast } from '../context/ToastContext';
import { callEdgeFunction } from '../lib/api';

interface SetupData {
  qrCodeUrl: string;
  secret: string;
  backupCodes: string[];
}

export default function Setup2FA() {
  const { session, login } = useAdminAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [setupData, setSetupData] = useState<SetupData | null>(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [step, setStep] = useState<'qr' | 'backup'>('qr');
  const [copiedCodes, setCopiedCodes] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!session) return;
    callEdgeFunction<SetupData & { existing?: boolean }>('admin-2fa-setup', { action: 'generate' }, session.token)
      .then(data => {
        if (data.existing) {
          navigate('/adm/dashboard');
          return;
        }
        setSetupData(data);
      })
      .catch(() => addToast('error', 'Failed to load 2FA setup'))
      .finally(() => setLoading(false));
  }, [session]);

  async function handleVerify() {
    if (!session || code.length !== 6) return;
    setVerifying(true);
    try {
      await callEdgeFunction('admin-2fa-setup', { action: 'verify', code }, session.token);
      setStep('backup');
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : 'Invalid code');
      setCode('');
    } finally {
      setVerifying(false);
    }
  }

  async function handleComplete() {
    if (!session || !confirmed) return;
    try {
      const res = await callEdgeFunction<{ token: string; user: AdminUser }>(
        'admin-auth',
        { action: 'complete-2fa-setup' },
        session.token
      );
      login(res.token, res.user);
      addToast('success', '2FA enabled successfully');
      navigate('/adm/dashboard');
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : 'Failed to complete setup');
    }
  }

  function copyBackupCodes() {
    if (!setupData) return;
    navigator.clipboard.writeText(setupData.backupCodes.join('\n'));
    setCopiedCodes(true);
    setTimeout(() => setCopiedCodes(false), 2000);
    addToast('success', 'Backup codes copied');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 mb-4 shadow-lg">
            <ShieldCheck size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {step === 'qr' ? 'Set up two-factor authentication' : 'Save your backup codes'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {step === 'qr'
              ? 'Scan the QR code with your authenticator app'
              : 'Store these codes safely — each can only be used once'}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
          {step === 'qr' && setupData && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <img src={setupData.qrCodeUrl} alt="QR Code" className="w-48 h-48" />
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center">
                  Can't scan? Enter this key manually:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-2.5 text-center">
                  <code className="text-xs font-mono text-gray-700 dark:text-gray-300 break-all">
                    {setupData.secret}
                  </code>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Enter the 6-digit code to verify
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center text-2xl font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                  placeholder="000000"
                />
              </div>

              <button
                onClick={handleVerify}
                disabled={verifying || code.length !== 6}
                className="w-full py-2.5 bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                {verifying ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Verify & Continue'}
              </button>
            </div>
          )}

          {step === 'backup' && setupData && (
            <div className="space-y-6">
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4 flex gap-3">
                <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Save these backup codes in a secure location. If you lose access to your authenticator app, you can use these to regain access.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {setupData.backupCodes.map((code, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-center"
                  >
                    <code className="text-sm font-mono text-gray-700 dark:text-gray-300">{code}</code>
                  </div>
                ))}
              </div>

              <button
                onClick={copyBackupCodes}
                className="w-full py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                {copiedCodes ? <CheckCircle size={16} className="text-emerald-500" /> : <Copy size={16} />}
                {copiedCodes ? 'Copied!' : 'Copy all codes'}
              </button>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={e => setConfirmed(e.target.checked)}
                  className="mt-0.5 rounded border-gray-300 text-sky-500"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  I have saved my backup codes in a safe place
                </span>
              </label>

              <button
                onClick={handleComplete}
                disabled={!confirmed}
                className="w-full py-2.5 bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                <ShieldCheck size={16} />
                Complete Setup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
