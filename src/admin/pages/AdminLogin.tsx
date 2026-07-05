import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';
import { callEdgeFunction } from '../lib/api';
import type { AdminUser } from '../types';

type Step = 'credentials' | 'totp';

export default function AdminLogin() {
  const [step, setStep] = useState<Step>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempToken, setTempToken] = useState('');
  const { login } = useAdminAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  async function handleCredentials(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await callEdgeFunction<{ step: string; tempToken?: string; token?: string; user?: AdminUser }>(
        'admin-auth',
        { action: 'login', email, password }
      );
      if (res.step === 'totp') {
        setTempToken(res.tempToken || '');
        setStep('totp');
      } else if (res.token && res.user) {
        login(res.token, res.user);
        if (!res.user.totp_setup_complete) {
          navigate('/adm/setup-2fa');
        } else {
          navigate('/adm/dashboard');
        }
      }
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleTotp(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await callEdgeFunction<{ token: string; user: AdminUser }>(
        'admin-auth',
        { action: 'verify-totp', tempToken, code: totpCode }
      );
      login(res.token, res.user);
      navigate('/adm/dashboard');
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : 'Invalid code');
      setTotpCode('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 mb-4 shadow-lg">
            <Zap size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Flowza.ai</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Admin Portal</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
          {step === 'credentials' ? (
            <>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Sign in to your account</h2>
              <form onSubmit={handleCredentials} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                      placeholder="admin@flowza.ai"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Continue'
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                  <Lock size={18} className="text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Two-factor authentication</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Enter the 6-digit code from your authenticator app</p>
                </div>
              </div>
              <form onSubmit={handleTotp} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Authentication code
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={totpCode}
                    onChange={e => setTotpCode(e.target.value.replace(/\D/g, ''))}
                    required
                    autoFocus
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center text-2xl font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                    placeholder="000000"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || totpCode.length !== 6}
                  className="w-full py-2.5 bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Verify'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => { setStep('credentials'); setTotpCode(''); }}
                  className="w-full py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  Back to login
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
