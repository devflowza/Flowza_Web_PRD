export interface AdminUser {
  id: string;
  email: string;
  role: string;
  totp_enabled: boolean;
  totp_setup_complete: boolean;
  last_login_at: string | null;
}

export interface AdminUserRecord {
  id: string;
  email: string;
  role: string;
  display_name: string | null;
  is_active: boolean;
  totp_enabled: boolean;
  totp_setup_complete: boolean;
  last_login_at: string | null;
  created_at: string;
}

export interface AdminSession {
  user: AdminUser;
  token: string;
  expiresAt: number;
}

export type SubmissionStatus = 'new' | 'read' | 'replied' | 'archived';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: SubmissionStatus;
  submitted_at: string;
  replied_at: string | null;
  admin_note: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactReply {
  id: string;
  submission_id: string;
  subject: string;
  body: string;
  sent_at: string;
  admin_id: string | null;
  created_at: string;
}

export interface SmtpConfig {
  id: string;
  host: string;
  port: number;
  encryption: 'tls' | 'ssl' | 'none';
  username: string;
  password: string;
  sender_name: string;
  sender_email: string;
  updated_at: string;
}

export interface NotificationRecipient {
  id: string;
  email: string;
  label: string;
  notify_on_new: boolean;
  notify_on_replied: boolean;
  is_active: boolean;
  created_at: string;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
