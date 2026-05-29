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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT check_future_booking CHECK (event_date >= CURRENT_DATE)
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
('infra', 'Venue Tents & Setup', 'Infrastructure', 1200.00, 'flat', 'Strong weather-proof tents, tables, chairs, and fencing for your event ground.', 'Infrastructure', TRUE),
('speakers', 'Stage Speakers & Sound', 'AV & Sound', 850.00, 'flat', 'High-quality speakers, amplifiers, and sound controllers to play clear audio.', 'Audio', TRUE),
('projectors', 'HD Projectors & Visuals', 'AV & Sound', 500.00, 'flat', 'Bright visual projectors and wide screens to show videos or presentations.', 'Visual', TRUE),
('catering', 'Food & Catering', 'Food & Talent', 12.00, 'per-guest', 'Tasty food and drinks, live cooking counters, and uniform buffet servers.', 'Dining', FALSE),
('photos', 'Photos & Video Shoots', 'AV & Sound', 950.00, 'flat', 'Professional camera team, candid photos, and high-quality event videos.', 'Media', FALSE),
('stage', 'Custom Stage Design', 'Infrastructure', 1500.00, 'flat', 'Beautifully decorated wooden stages, background themes, and red carpets.', 'Stage', FALSE),
('security', 'Security & Guard Crews', 'Logistics & Tech', 600.00, 'flat', 'Trained guards, entrance metal detectors, and safe emergency exit planning.', 'Security', FALSE),
('drones', 'Drone Video & Live Stream', 'AV & Sound', 750.00, 'flat', 'Flying cameras for sky views and live video broadcasting on YouTube.', 'Drone', FALSE),
('lights', 'Stage Lights & Lasers', 'AV & Sound', 1100.00, 'flat', 'Colorful moving lights, stage spotlights, and smoke effects.', 'Lighting', FALSE),
('artist', 'Celebrity & Band Bookings', 'Food & Talent', 3000.00, 'flat', 'Hiring famous singers, music bands, or DJs for guest entertainment.', 'Talent', FALSE),
('rsvp', 'Invitation & Guest Invites', 'Logistics & Tech', 350.00, 'flat', 'Beautiful digital cards sent on WhatsApp and phone support for guest confirmations.', 'Invites', FALSE),
('valet', 'Valet Parking & Shuttles', 'Logistics & Tech', 450.00, 'flat', 'Trained drivers to park cars and golf carts for elderly guests.', 'Logistics', FALSE),
('vr', 'Virtual Reality Game Zones', 'Logistics & Tech', 800.00, 'flat', 'Fun VR headset game areas and a rotating selfie camera booth.', 'VR', FALSE),
('cleanup', 'Eco-Friendly Cleaning', 'Infrastructure', 2.00, 'per-guest', 'Garbage recycling bins and cleanup staff to keep the ground clean.', 'Cleanup', FALSE),
('ticketing', 'Digital Entry Tickets', 'Logistics & Tech', 4.00, 'per-guest', 'Wristband entries, high-speed gate scanners, and physical receipt printers.', 'Ticketing', FALSE),
('emcee', 'Event Host & Speaker', 'Food & Talent', 500.00, 'flat', 'Friendly anchors and hosts to introduce events and play games with guests.', 'Talent', FALSE),
('soundproof', 'Sound Isolation Setup', 'Infrastructure', 900.00, 'flat', 'Sound-dampening panels and blankets to block external noises.', 'Acoustics', FALSE),
('pyrotechnics', 'Special Effects & Sparklers', 'AV & Sound', 650.00, 'flat', 'Safe cold sparks, stage bubble machines, and paper confetti blasts.', 'Pyrotechnics', FALSE);

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
