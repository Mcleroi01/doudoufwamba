/*
  # Mouvement pour la Renaissance Économique - Database Schema

  1. New Tables
    - `articles`
      - `id` (uuid, primary key)
      - `title` (text, article title)
      - `slug` (text, unique URL-friendly identifier)
      - `summary` (text, short description)
      - `content` (text, full article content)
      - `image_url` (text, featured image)
      - `author` (text, article author)
      - `published_at` (timestamptz, publication date)
      - `created_at` (timestamptz, creation timestamp)
      - `updated_at` (timestamptz, last update timestamp)
    
    - `events`
      - `id` (uuid, primary key)
      - `title` (text, event title)
      - `slug` (text, unique URL-friendly identifier)
      - `description` (text, event description)
      - `location` (text, event venue)
      - `date` (timestamptz, event date and time)
      - `image_url` (text, event image)
      - `capacity` (integer, maximum attendees, nullable)
      - `created_at` (timestamptz, creation timestamp)
      - `updated_at` (timestamptz, last update timestamp)
    
    - `movement_registrations`
      - `id` (uuid, primary key)
      - `full_name` (text, registrant's name)
      - `email` (text, registrant's email)
      - `phone` (text, phone number)
      - `province` (text, province/region)
      - `message` (text, optional message, nullable)
      - `created_at` (timestamptz, registration timestamp)
    
    - `event_registrations`
      - `id` (uuid, primary key)
      - `event_id` (uuid, foreign key to events)
      - `full_name` (text, registrant's name)
      - `email` (text, registrant's email)
      - `phone` (text, phone number)
      - `created_at` (timestamptz, registration timestamp)
    
    - `contact_messages`
      - `id` (uuid, primary key)
      - `full_name` (text, sender's name)
      - `email` (text, sender's email)
      - `subject` (text, message subject)
      - `message` (text, message content)
      - `created_at` (timestamptz, submission timestamp)

  2. Security
    - Enable RLS on all tables
    - Public read access for articles and events
    - Authenticated users (admins) can manage content
    - Anyone can submit registrations and contact messages
*/

-- Articles Table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  summary text NOT NULL,
  content text NOT NULL,
  image_url text NOT NULL,
  author text DEFAULT 'Mouvement pour la Renaissance Économique',
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published articles"
  ON articles FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert articles"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete articles"
  ON articles FOR DELETE
  TO authenticated
  USING (true);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  date timestamptz NOT NULL,
  image_url text NOT NULL,
  capacity integer DEFAULT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update events"
  ON events FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete events"
  ON events FOR DELETE
  TO authenticated
  USING (true);

-- Movement Registrations Table
CREATE TABLE IF NOT EXISTS movement_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  province text NOT NULL,
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE movement_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register to the movement"
  ON movement_registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view registrations"
  ON movement_registrations FOR SELECT
  TO authenticated
  USING (true);

-- Event Registrations Table
CREATE TABLE IF NOT EXISTS event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register to events"
  ON event_registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view event registrations"
  ON event_registrations FOR SELECT
  TO authenticated
  USING (true);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can send contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS articles_published_at_idx ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS events_date_idx ON events(date);
CREATE INDEX IF NOT EXISTS event_registrations_event_id_idx ON event_registrations(event_id);