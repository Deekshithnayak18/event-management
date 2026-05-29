-- =========================================================================
-- AuraEvents Database Management System (DBMS) Schema
-- DBMS Practical Project: Dynamic Infrastructure Booking System
-- Database: PostgreSQL (via Supabase)
-- =========================================================================

-- 1. DROP EXISTING TABLES IF THEY EXISTS (To prevent conflict during re-runs)
DROP TABLE IF EXISTS inquiries CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS services CASCADE;

-- 2. CREATE SERVICES DATABASE TABLE (Dynamic catalog of 18 services)
CREATE TABLE services (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    base_price NUMERIC(10, 2) NOT NULL,
    pricing_model VARCHAR(20) NOT NULL CHECK (pricing_model IN ('flat', 'per-guest')),
    description TEXT NOT NULL,
    icon_key VARCHAR(50) NOT NULL,
    is_standard BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. CREATE BOOKINGS DATABASE TABLE (Dynamic event reservations made by users)
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name VARCHAR(100) NOT NULL,
    client_email VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    guest_count INTEGER NOT NULL CHECK (guest_count > 0),
    selected_services TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    total_price NUMERIC(12, 2) NOT NULL CHECK (total_price >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CREATE INQUIRIES DATABASE TABLE (Log of custom spec requirements)
CREATE TABLE inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rep_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    specs_notes TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================================
-- DML DATA SEEDING (Insert the 18 service catalog rows into the database)
-- =========================================================================

INSERT INTO services (id, title, category, base_price, pricing_model, description, icon_key, is_standard) VALUES
('infra', 'Venue Setup & Pagodas', 'Infrastructure', 1200.00, 'flat', 'Heavy-duty steel trussing, weather-proof German pagodas, dynamic layout planning, and secure perimeter fencing.', 'Infrastructure', TRUE),
('speakers', 'High-Fidelity Speakers', 'AV & Sound', 850.00, 'flat', 'Pro audio line arrays, high-wattage subwoofers, visual stage monitors, and digital sound boards tuning sound perfectly.', 'Audio', TRUE),
('projectors', 'HD Projectors & Mapping', 'AV & Sound', 500.00, 'flat', 'High-lumen laser projectors, widescreen custom projection mapping, and ultra-bright resolution outputs.', 'Visual', TRUE),
('catering', 'Catering & Fine Dining', 'Food & Talent', 12.00, 'per-guest', 'Curated global cuisines, high-end live counters, professional uniform buffet service, and certified hygiene systems.', 'Dining', FALSE),
('photos', 'Photography & 4K Video', 'AV & Sound', 950.00, 'flat', 'Professional cinematic camera operators, high-end candid photography, instant digital photo delivery portal.', 'Media', FALSE),
('stage', 'Bespoke Stage Design', 'Infrastructure', 1500.00, 'flat', 'Custom elevated multi-tier stage structures, modern thematic backdrops, and acoustic backdrop draping.', 'Stage', FALSE),
('security', 'Security & Crowd Control', 'Logistics & Tech', 600.00, 'flat', 'Licensed professional bouncers, crowd control baricading, emergency exit routing, and metal detector entry arches.', 'Security', FALSE),
('drones', 'Drone Coverage & Stream', 'AV & Sound', 750.00, 'flat', '4K dual-operator thermal camera drones, real-time wireless feed encoding, and multi-platform live streaming setups.', 'Drone', FALSE),
('lights', 'Laser Shows & Lighting', 'AV & Sound', 1100.00, 'flat', 'Intelligent DMX moving heads, architectural uplighting, colorful lasers, ambient smoke, and custom dynamic light cues.', 'Lighting', FALSE),
('artist', 'Artist & Celebrity Booking', 'Food & Talent', 3000.00, 'flat', 'Direct coordination with top artists, management of booking riders, premium green rooms, and technical hospitality.', 'Talent', FALSE),
('rsvp', 'Invites & RSVP Management', 'Logistics & Tech', 350.00, 'flat', 'Custom animated WhatsApp digital invites, active RSVP call desk, real-time digital attendee dashboard.', 'Invites', FALSE),
('valet', 'Valet Parking & Logistics', 'Logistics & Tech', 450.00, 'flat', 'Trained valet drivers, automated key tag systems, VIP shuttle carts, and active traffic coordination.', 'Logistics', FALSE),
('vr', 'VR & Interactive Booths', 'Logistics & Tech', 800.00, 'flat', 'Next-gen virtual reality experience pods, 360-degree rotating camera selfie booths, and instant social share links.', 'VR', FALSE),
('cleanup', 'Eco Waste & Clean Up', 'Infrastructure', 2.00, 'per-guest', 'Zero-plastic waste management bins, active janitorial staffing, post-event eco-friendly disposal and recycling.', 'Cleanup', FALSE),
('ticketing', 'RFID Registration', 'Logistics & Tech', 4.00, 'per-guest', 'Tap-to-enter RFID wristbands, on-site barcode thermal ticket printers, and high-speed turnstile entrance pods.', 'Ticketing', FALSE),
('emcee', 'Multi-lingual Emcee Anchor', 'Food & Talent', 500.00, 'flat', 'Charismatic hosts fluent in multiple languages, dynamic crowd engagement games, and script development.', 'Talent', FALSE),
('soundproof', 'Acoustic Soundproofing', 'Infrastructure', 900.00, 'flat', 'Heavy sound-dampening acoustic wall blankets, stage echo isolators, and environmental decibel regulation systems.', 'Acoustics', FALSE),
('pyrotechnics', 'SFX & Cold Fire Sparks', 'AV & Sound', 650.00, 'flat', 'Safe cold-pyro spark fountain machines, CO2 heavy-fog dancefloor clouds, and synchronised stadium confetti blasts.', 'Pyrotechnics', FALSE);

-- =========================================================================
-- DATABASE ACCESS CONTROLS (Row Level Security - RLS Policies)
-- Configure tables to permit secure public CRUD operations for front-end demo
-- =========================================================================

-- Enable RLS on all tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- 1. Policies for 'services' table (Everyone can read, only admin can write)
CREATE POLICY "Enable read access for all users on services" ON services
    FOR SELECT USING (true);

-- 2. Policies for 'bookings' table (Everyone can execute full CRUD operations)
CREATE POLICY "Enable select access for all users on bookings" ON bookings
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users on bookings" ON bookings
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users on bookings" ON bookings
    FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete access for all users on bookings" ON bookings
    FOR DELETE USING (true);

-- 3. Policies for 'inquiries' table (Everyone can select or insert new logs)
CREATE POLICY "Enable insert access for all users on inquiries" ON inquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable select access for all users on inquiries" ON inquiries
    FOR SELECT USING (true);
