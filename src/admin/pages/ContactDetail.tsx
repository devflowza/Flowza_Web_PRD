import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Mail, Phone, Clock, Send, Archive,
  Bold, Italic, List, CheckCircle, StickyNote, Forward
} from 'lucide-react';
import DOMPurify from 'dompurify';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';
import { callEdgeFunction } from '../lib/api';
import type { ContactSubmission, ContactReply, SubmissionStatus } from '../types';

const statusColors: Record<SubmissionStatus, string> = {
  new: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  read: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  replied: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  archived: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500',
};

export default function ContactDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { session } = useAdminAuth();
  const { addToast } = useToast();
  const editorRef = useRef<HTMLDivElement>(null);

  const [submission, setSubmission] = useState<ContactSubmission | null>(null);
  const [replies, setReplies] = useState<ContactReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [sending, setSending] = useState(false);
  const [forwarding, setForwarding] = useState(false);
  const [replySubject, setReplySubject] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [{ submission: sub }, { replies: reps }] = await Promise.all([
        callEdgeFunction<{ submission: ContactSubmission | null }>('admin-data', { action: 'get-submission', id }, session!.token),
        callEdgeFunction<{ replies: ContactReply[] }>('admin-data', { action: 'get-replies', submissionId: id }, session!.token),
      ]);

      if (!sub) {
        navigate('/adm/contacts');
        return;
      }

      setSubmission(sub);
      setReplies(reps);
      setNote(sub.admin_note || '');
      setReplySubject(`Re: ${sub.subject}`);

      if (sub.status === 'new') {
        await callEdgeFunction('admin-data', {
          action: 'update-submission',
          id,
          updates: { status: 'read' },
        }, session!.token);
        setSubmission(prev => prev ? { ...prev, status: 'read' } : prev);
      }
    } catch {
      navigate('/adm/contacts');
    } finally {
      setLoading(false);
    }
  }, [id, session, navigate]);

  useEffect(() => {
    if (!id || !session) return;
    loadData();
  }, [id, session, loadData]);

  async function saveNote() {
    if (!submission || !session) return;
    setSavingNote(true);
    try {
      await callEdgeFunction('admin-data', {
        action: 'update-submission',
        id: submission.id,
        updates: { admin_note: note },
      }, session.token);
      addToast('success', 'Note saved');
    } catch {
      addToast('error', 'Failed to save note');
    } finally {
      setSavingNote(false);
    }
  }

  async function updateStatus(status: SubmissionStatus) {
    if (!submission || !session) return;
    try {
      await callEdgeFunction('admin-data', {
        action: 'update-submission',
        id: submission.id,
        updates: { status },
      }, session.token);
      setSubmission(prev => prev ? { ...prev, status } : prev);
      addToast('success', `Marked as ${status}`);
    } catch {
      addToast('error', 'Failed to update status');
    }
  }

  async function forwardMessage() {
    if (!submission || !session) return;
    setForwarding(true);
    try {
      const { sent, total } = await callEdgeFunction<{ success: boolean; sent: number; total: number }>(
        'admin-forward-message',
        { submissionId: submission.id },
        session.token
      );
      addToast('success', `Message forwarded to ${sent} of ${total} recipient${total !== 1 ? 's' : ''}`);
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : 'Failed to forward message');
    } finally {
      setForwarding(false);
    }
  }

  function execFormat(cmd: string) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !editorRef.current) {
      editorRef.current?.focus();
      return;
    }

    const range = selection.getRangeAt(0);
    if (!editorRef.current.contains(range.commonAncestorContainer)) {
      editorRef.current.focus();
      return;
    }

    if (cmd === 'bold' || cmd === 'italic') {
      const tag = cmd === 'bold' ? 'strong' : 'em';
      const wrapper = document.createElement(tag);
      try {
        range.surroundContents(wrapper);
      } catch {
        const fragment = range.extractContents();
        wrapper.appendChild(fragment);
        range.insertNode(wrapper);
      }
      selection.removeAllRanges();
      const newRange = document.createRange();
      newRange.selectNodeContents(wrapper);
      selection.addRange(newRange);
    } else if (cmd === 'insertUnorderedList') {
      const contents = range.extractContents();
      const ul = document.createElement('ul');
      const li = document.createElement('li');
      li.appendChild(contents);
      ul.appendChild(li);
      range.insertNode(ul);
      selection.removeAllRanges();
      const newRange = document.createRange();
      newRange.selectNodeContents(li);
      newRange.collapse(false);
      selection.addRange(newRange);
    }
    editorRef.current.focus();
  }

  async function sendReply() {
    if (!submission || !session) return;
    const body = editorRef.current?.innerHTML || '';
    const text = editorRef.current?.innerText?.trim() || '';
    if (!text) {
      addToast('error', 'Reply body cannot be empty');
      return;
    }
    setSending(true);
    try {
      await callEdgeFunction('admin-send-reply', {
        submissionId: submission.id,
        to: submission.email,
        toName: submission.name,
        subject: replySubject,
        body,
      }, session.token);
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : 'Failed to send reply email');
      setSending(false);
      return;
    }

    try {
      const { reply } = await callEdgeFunction<{ reply: ContactReply }>('admin-data', {
        action: 'save-reply',
        submissionId: submission.id,
        subject: replySubject,
        replyBody: body,
        adminId: session.user.id,
      }, session.token);

      setSubmission(prev => prev ? { ...prev, status: 'replied', replied_at: new Date().toISOString() } : prev);
      if (reply) setReplies(prev => [...prev, reply]);
      if (editorRef.current) editorRef.current.innerHTML = '';
      addToast('success', 'Reply sent successfully');
    } catch {
      addToast('error', 'Email sent but failed to save reply record. Please refresh.');
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48" />
        <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        <div className="h-60 bg-gray-200 dark:bg-gray-700 rounded-xl" />
      </div>
    );
  }

  if (!submission) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/adm/contacts')}
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white truncate">{submission.subject}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">From {submission.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[submission.status]}`}>
            {submission.status}
          </span>
          <button
            onClick={forwardMessage}
            disabled={forwarding}
            title="Forward to configured recipients"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition"
          >
            {forwarding
              ? <div className="w-3.5 h-3.5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              : <Forward size={14} />}
            Forward
          </button>
          {submission.status !== 'archived' && (
            <button
              onClick={() => updateStatus('archived')}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              title="Archive"
            >
              <Archive size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5 pb-5 border-b border-gray-100 dark:border-gray-800">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold">{submission.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Mail size={13} />
              <span>{submission.email}</span>
            </div>
            {submission.phone && (
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Phone size={13} />
                <span>{submission.phone}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 shrink-0">
            <Clock size={12} />
            <span>{new Date(submission.submitted_at).toLocaleString()}</span>
          </div>
        </div>
        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap text-sm leading-relaxed">
          {submission.message}
        </p>
      </div>

      {replies.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Reply Thread</h3>
          {replies.map(reply => (
            <div key={reply.id} className="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-sky-700 dark:text-sky-400">Admin replied</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(reply.sent_at).toLocaleString()}</span>
              </div>
              <div
                className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(reply.body) }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Send size={16} />
          Send Reply
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Subject</label>
            <input
              type="text"
              value={replySubject}
              onChange={e => setReplySubject(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Message</label>
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="flex items-center gap-1 px-2 py-1.5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <button
                  type="button"
                  onClick={() => execFormat('bold')}
                  className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition"
                >
                  <Bold size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => execFormat('italic')}
                  className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition"
                >
                  <Italic size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => execFormat('insertUnorderedList')}
                  className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition"
                >
                  <List size={14} />
                </button>
              </div>
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                className="min-h-[140px] px-4 py-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-900 focus:outline-none"
                onKeyDown={e => {
                  if (e.key === 'Enter' && e.ctrlKey) {
                    e.preventDefault();
                    sendReply();
                  }
                }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Ctrl+Enter to send</p>
          </div>

          <button
            onClick={sendReply}
            disabled={sending}
            className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white font-semibold rounded-lg text-sm transition-colors"
          >
            {sending ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send size={15} />
            )}
            {sending ? 'Sending...' : 'Send Reply'}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <StickyNote size={16} />
          Internal Note
          <span className="text-xs font-normal text-gray-400">(never sent to customer)</span>
        </h3>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          rows={4}
          placeholder="Add an internal note about this submission..."
          className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition resize-none"
        />
        <div className="mt-3">
          <button
            onClick={saveNote}
            disabled={savingNote}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-medium rounded-lg text-sm transition-colors hover:bg-gray-700 dark:hover:bg-gray-100 disabled:opacity-60"
          >
            {savingNote ? (
              <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <CheckCircle size={14} />
            )}
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
}
