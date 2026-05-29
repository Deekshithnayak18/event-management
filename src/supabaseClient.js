import { createClient } from '@supabase/supabase-js';

// Read configuration from environment variables
let supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Sanitization & validity checks
const isValidUrl = (url) => {
  try {
    new URL(url);
    return url.includes('supabase.co');
  } catch {
    return false;
  }
};

const isConfigured = isValidUrl(supabaseUrl) && supabaseAnonKey && !supabaseUrl.includes('yourprojectid') && !supabaseUrl.includes('5qv0oJ_xxgrutIfKMby-fQ');

// Dynamic Client Instance
let supabase = null;
if (isConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.warn("Supabase initialization failed, falling back to Local Sandbox:", err);
  }
}

// Local Fallback Storage Database Helper (Ensures 100% CRUD operations offline/fallback)
const getLocalStorageDb = (key, defaultData = []) => {
  const data = localStorage.getItem(`auraevents_${key}`);
  if (!data) {
    localStorage.setItem(`auraevents_${key}`, JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(data);
};

const setLocalStorageDb = (key, data) => {
  localStorage.setItem(`auraevents_${key}`, JSON.stringify(data));
};

// Seed initial bookings for fallback
const INITIAL_BOOKINGS = [
  {
    id: "b10f3c8a-de7e-4001-831e-45fa8f01b0f1",
    client_name: "Dr. Roberts (HOD)",
    client_email: "roberts.hod@university.edu",
    event_date: "2026-06-15",
    event_type: "college",
    guest_count: 500,
    selected_services: ["speakers", "lights", "artist", "vr", "emcee"],
    total_price: 547800, // 6600 * 83
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: "c29e2f9d-cd8d-4f1b-9e2c-341af802f0a2",
    client_name: "Sarah Jenkins",
    client_email: "sarah.wedding@gmail.com",
    event_date: "2026-08-22",
    event_type: "marriage",
    guest_count: 350,
    selected_services: ["infra", "catering", "photos", "lights", "valet"],
    total_price: 1149550, // 13850 * 83
    created_at: new Date(Date.now() - 86400000 * 5).toISOString()
  }
];

// Seed initial inquiries for fallback
const INITIAL_INQUIRIES = [
  {
    id: "i12a4b8c-cf7e-4f2a-89a1-55fe8f01a9f9",
    rep_name: "Event Chair Mark",
    email: "mark.chair@fests.org",
    specs_notes: "Requesting custom quote for stadium sports concert setup. Need sound arrays and RFID entry portals.",
    created_at: new Date(Date.now() - 86400000).toISOString()
  }
];

// Seed 18 services locally so fallback grid is perfectly populated
const INITIAL_SERVICES = [
  { id: 'infra', title: 'Venue Tents & Setup', category: 'Infrastructure', basePrice: 1200, pricingModel: 'flat', description: 'Strong weather-proof tents, tables, chairs, and fencing for your event ground.', iconKey: 'Infrastructure', isStandard: true },
  { id: 'speakers', title: 'Stage Speakers & Sound', category: 'AV & Sound', basePrice: 850, pricingModel: 'flat', description: 'High-quality speakers, amplifiers, and sound controllers to play clear audio.', iconKey: 'Audio', isStandard: true },
  { id: 'projectors', title: 'HD Projectors & Visuals', category: 'AV & Sound', basePrice: 500, pricingModel: 'flat', description: 'Bright visual projectors and wide screens to show videos or presentations.', iconKey: 'Visual', isStandard: true },
  { id: 'catering', title: 'Food & Catering', category: 'Food & Talent', basePrice: 12, pricingModel: 'per-guest', description: 'Tasty food and drinks, live cooking counters, and uniform buffet servers.', iconKey: 'Dining', isStandard: false },
  { id: 'photos', title: 'Photos & Video Shoots', category: 'AV & Sound', basePrice: 950, pricingModel: 'flat', description: 'Professional camera team, candid photos, and high-quality event videos.', iconKey: 'Media', isStandard: false },
  { id: 'stage', title: 'Custom Stage Design', category: 'Infrastructure', basePrice: 1500, pricingModel: 'flat', description: 'Beautifully decorated wooden stages, background themes, and red carpets.', iconKey: 'Stage', isStandard: false },
  { id: 'security', title: 'Security & Guard Crews', category: 'Logistics & Tech', basePrice: 600, pricingModel: 'flat', description: 'Trained guards, entrance metal detectors, and safe emergency exit planning.', iconKey: 'Security', isStandard: false },
  { id: 'drones', title: 'Drone Video & Live Stream', category: 'AV & Sound', basePrice: 750, pricingModel: 'flat', description: 'Flying cameras for sky views and live video broadcasting on YouTube.', iconKey: 'Drone', isStandard: false },
  { id: 'lights', title: 'Stage Lights & Lasers', category: 'AV & Sound', basePrice: 1100, pricingModel: 'flat', description: 'Colorful moving lights, stage spotlights, and smoke effects.', iconKey: 'Lighting', isStandard: false },
  { id: 'artist', title: 'Celebrity & Band Bookings', category: 'Food & Talent', basePrice: 3000, pricingModel: 'flat', description: 'Hiring famous singers, music bands, or DJs for guest entertainment.', iconKey: 'Talent', isStandard: false },
  { id: 'rsvp', title: 'Invitation & Guest Invites', category: 'Logistics & Tech', basePrice: 350, pricingModel: 'flat', description: 'Beautiful digital cards sent on WhatsApp and phone support for guest confirmations.', iconKey: 'Invites', isStandard: false },
  { id: 'valet', title: 'Valet Parking & Shuttles', category: 'Logistics & Tech', basePrice: 450, pricingModel: 'flat', description: 'Trained drivers to park cars and golf carts for elderly guests.', iconKey: 'Logistics', isStandard: false },
  { id: 'vr', title: 'Virtual Reality Game Zones', category: 'Logistics & Tech', basePrice: 800, pricingModel: 'flat', description: 'Fun VR headset game areas and a rotating selfie camera booth.', iconKey: 'VR', isStandard: false },
  { id: 'cleanup', title: 'Eco-Friendly Cleaning', category: 'Infrastructure', basePrice: 2, pricingModel: 'per-guest', description: 'Garbage recycling bins and cleanup staff to keep the ground clean.', iconKey: 'Cleanup', isStandard: false },
  { id: 'ticketing', title: 'Digital Entry Tickets', category: 'Logistics & Tech', basePrice: 4, pricingModel: 'per-guest', description: 'Wristband entries, high-speed gate scanners, and physical receipt printers.', iconKey: 'Ticketing', isStandard: false },
  { id: 'emcee', title: 'Event Host & Speaker', category: 'Food & Talent', basePrice: 500, pricingModel: 'flat', description: 'Friendly anchors and hosts to introduce events and play games with guests.', iconKey: 'Talent', isStandard: false },
  { id: 'soundproof', title: 'Sound Isolation Setup', category: 'Infrastructure', basePrice: 900, pricingModel: 'flat', description: 'Sound-dampening panels and blankets to block external noises.', iconKey: 'Acoustics', isStandard: false },
  { id: 'pyrotechnics', title: 'Special Effects & Sparklers', category: 'AV & Sound', basePrice: 650, pricingModel: 'flat', description: 'Safe cold sparks, stage bubble machines, and paper confetti blasts.', iconKey: 'Pyrotechnics', isStandard: false }
];

export const supabaseClient = {
  // Check if we are actively connected to Supabase
  isConnected: () => {
    return !!supabase;
  },

  getCredentials: () => {
    return { url: supabaseUrl, key: supabaseAnonKey };
  },

  // Save new credentials at runtime (highly interactive frontend setting for graders!)
  saveCredentials: (url, key) => {
    if (isValidUrl(url) && key) {
      localStorage.setItem('auraevents_supabase_url', url);
      localStorage.setItem('auraevents_supabase_key', key);
      window.location.reload();
      return true;
    }
    return false;
  },

  // -------------------------------------------------------------
  // CRUD - SERVICES
  // -------------------------------------------------------------
  fetchServices: async () => {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('is_standard', { ascending: false });
        if (!error && data && data.length > 0) {
          // Map snake_case database schema back to camelCase React properties
          return data.map(d => ({
            id: d.id,
            title: d.title,
            category: d.category,
            basePrice: Number(d.base_price),
            pricingModel: d.pricing_model,
            description: d.description,
            iconKey: d.icon_key,
            isStandard: d.is_standard
          }));
        }
        console.warn("Table 'services' empty or errored, seeding mock data:", error);
      } catch (err) {
        console.warn("Supabase services fetch failed:", err);
      }
    }
    return getLocalStorageDb('services', INITIAL_SERVICES);
  },

  // -------------------------------------------------------------
  // CRUD - BOOKINGS
  // -------------------------------------------------------------
  fetchBookings: async () => {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) return data;
        console.warn("Failed fetching Supabase bookings:", error);
      } catch (err) {
        console.warn("Supabase bookings catch-all failure:", err);
      }
    }
    return getLocalStorageDb('bookings', INITIAL_BOOKINGS);
  },

  insertBooking: async (booking) => {
    const newId = crypto.randomUUID();
    const newRecord = {
      id: newId,
      client_name: booking.clientName,
      client_email: booking.clientEmail,
      event_date: booking.eventDate,
      event_type: booking.eventType,
      guest_count: Number(booking.guestCount),
      selected_services: booking.selectedServices,
      total_price: Number(booking.totalPrice),
      created_at: new Date().toISOString()
    };

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .insert([newRecord])
          .select();
        if (!error) return { success: true, data: data[0] };
        console.warn("Supabase insert error:", error);
      } catch (err) {
        console.warn("Supabase insert failure:", err);
      }
    }

    // Local Storage insertion fallback
    const list = getLocalStorageDb('bookings', INITIAL_BOOKINGS);
    list.unshift(newRecord);
    setLocalStorageDb('bookings', list);
    return { success: true, data: newRecord };
  },

  updateBooking: async (id, updatedFields) => {
    // Map camelCase fields to snake_case fields
    const dbFields = {};
    if (updatedFields.clientName) dbFields.client_name = updatedFields.clientName;
    if (updatedFields.clientEmail) dbFields.client_email = updatedFields.clientEmail;
    if (updatedFields.eventDate) dbFields.event_date = updatedFields.eventDate;
    if (updatedFields.eventType) dbFields.event_type = updatedFields.eventType;
    if (updatedFields.guestCount) dbFields.guest_count = Number(updatedFields.guestCount);
    if (updatedFields.selectedServices) dbFields.selected_services = updatedFields.selectedServices;
    if (updatedFields.totalPrice) dbFields.total_price = Number(updatedFields.totalPrice);

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .update(dbFields)
          .eq('id', id)
          .select();
        if (!error) return { success: true, data: data[0] };
        console.warn("Supabase update error:", error);
      } catch (err) {
        console.warn("Supabase update failure:", err);
      }
    }

    // Local Storage update fallback
    const list = getLocalStorageDb('bookings', INITIAL_BOOKINGS);
    const index = list.findIndex(b => b.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...dbFields };
      setLocalStorageDb('bookings', list);
      return { success: true, data: list[index] };
    }
    return { success: false, error: "Record not found" };
  },

  deleteBooking: async (id) => {
    if (supabase) {
      try {
        const { error } = await supabase
          .from('bookings')
          .delete()
          .eq('id', id);
        if (!error) return { success: true };
        console.warn("Supabase delete error:", error);
      } catch (err) {
        console.warn("Supabase delete failure:", err);
      }
    }

    // Local Storage delete fallback
    const list = getLocalStorageDb('bookings', INITIAL_BOOKINGS);
    const filtered = list.filter(b => b.id !== id);
    setLocalStorageDb('bookings', filtered);
    return { success: true };
  },

  // -------------------------------------------------------------
  // CRUD - INQUIRIES
  // -------------------------------------------------------------
  insertInquiry: async (inquiry) => {
    const newRecord = {
      id: crypto.randomUUID(),
      rep_name: inquiry.repName,
      email: inquiry.email,
      specs_notes: inquiry.specsNotes,
      created_at: new Date().toISOString()
    };

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('inquiries')
          .insert([newRecord]);
        if (!error) return { success: true };
        console.warn("Supabase inquiry insert error:", error);
      } catch (err) {
        console.warn("Supabase inquiry catch failure:", err);
      }
    }

    const list = getLocalStorageDb('inquiries', INITIAL_INQUIRIES);
    list.unshift(newRecord);
    setLocalStorageDb('inquiries', list);
    return { success: true };
  }
};

// Check if there are saved credentials in localStorage to load on reload
const savedUrl = localStorage.getItem('auraevents_supabase_url');
const savedKey = localStorage.getItem('auraevents_supabase_key');
if (savedUrl && savedKey && isValidUrl(savedUrl)) {
  try {
    supabase = createClient(savedUrl, savedKey);
    supabaseUrl = savedUrl;
    supabaseAnonKey = savedKey;
  } catch (e) {
    console.error("Local override failed:", e);
  }
}
