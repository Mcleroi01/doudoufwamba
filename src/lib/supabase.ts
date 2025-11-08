import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image_url: string;
  author: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  date: string;
  image_url: string;
  capacity: number | null;
  created_at: string;
  updated_at: string;
}

export interface MovementRegistration {
  full_name: string;
  email: string;
  phone: string;
  province: string;
  message?: string;
}

export interface EventRegistration {
  event_id: string;
  full_name: string;
  email: string;
  phone: string;
}

export interface ContactMessage {
  full_name: string;
  email: string;
  subject: string;
  message: string;
}
