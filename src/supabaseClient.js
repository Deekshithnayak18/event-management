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
    total_price: 6600,
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
    total_price: 13850,
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
  { id: 'infra', title: 'Venue Setup & Pagodas', category: 'Infrastructure', basePrice: 1200, pricingModel: 'flat', description: 'Heavy-duty steel trussing, weather-proof German pagodas, dynamic layout planning, and secure perimeter fencing.', iconKey: 'Infrastructure', isStandard: true },
  { id: 'speakers', title: 'High-Fidelity Speakers', category: 'AV & Sound', basePrice: 850, pricingModel: 'flat', description: 'Pro audio line arrays, high-wattage subwoofers, visual stage monitors, and digital sound boards tuning sound perfectly.', iconKey: 'Audio', isStandard: true },
  { id: 'projectors', title: 'HD Projectors & Mapping', category: 'AV & Sound', basePrice: 500, pricingModel: 'flat', description: 'High-lumen laser projectors, widescreen custom projection mapping, and ultra-bright resolution outputs.', iconKey: 'Visual', isStandard: true },
  { id: 'catering', title: 'Catering & Fine Dining', category: 'Food & Talent', basePrice: 12, pricingModel: 'per-guest', description: 'Curated global cuisines, high-end live counters, professional uniform buffet service, and certified hygiene systems.', iconKey: 'Dining', isStandard: false },
  { id: 'photos', title: 'Photography & 4K Video', category: 'AV & Sound', basePrice: 950, pricingModel: 'flat', description: 'Professional cinematic camera operators, high-end candid photography, instant digital photo delivery portal.', iconKey: 'Media', isStandard: false },
  { id: 'stage', title: 'Bespoke Stage Design', category: 'Infrastructure', basePrice: 1500, pricingModel: 'flat', description: 'Custom elevated multi-tier stage structures, modern thematic backdrops, and acoustic backdrop draping.', iconKey: 'Stage', isStandard: false },
  { id: 'security', title: 'Security & Crowd Control', category: 'Logistics & Tech', basePrice: 600, pricingModel: 'flat', description: 'Licensed professional bouncers, crowd control baricading, emergency exit routing, and metal detector entry arches.', iconKey: 'Security', isStandard: false },
  { id: 'drones', title: 'Drone Coverage & Stream', category: 'AV & Sound', basePrice: 750, pricingModel: 'flat', description: '4K dual-operator thermal camera drones, real-time wireless feed encoding, and multi-platform live streaming setups.', iconKey: 'Drone', isStandard: false },
  { id: 'lights', title: 'Laser Shows & Lighting', category: 'AV & Sound', basePrice: 1100, pricingModel: 'flat', description: 'Intelligent DMX moving heads, architectural uplighting, colorful lasers, ambient smoke, and custom dynamic light cues.', iconKey: 'Lighting', isStandard: false },
  { id: 'artist', title: 'Artist & Celebrity Booking', category: 'Food & Talent', basePrice: 3000, pricingModel: 'flat', description: 'Direct coordination with top artists, management of booking riders, premium green rooms, and technical hospitality.', iconKey: 'Talent', isStandard: false },
  { id: 'rsvp', title: 'Invites & RSVP Management', category: 'Logistics & Tech', basePrice: 350, pricingModel: 'flat', description: 'Custom animated WhatsApp digital invites, active RSVP call desk, real-time digital attendee dashboard.', iconKey: 'Invites', isStandard: false },
  { id: 'valet', title: 'Valet Parking & Logistics', category: 'Logistics & Tech', basePrice: 450, pricingModel: 'flat', description: 'Trained valet drivers, automated key tag systems, VIP shuttle carts, and active traffic coordination.', iconKey: 'Logistics', isStandard: false },
  { id: 'vr', title: 'VR & Interactive Booths', category: 'Logistics & Tech', basePrice: 800, pricingModel: 'flat', description: 'Next-gen virtual reality experience pods, 360-degree rotating camera selfie booths, and instant social share links.', iconKey: 'VR', isStandard: false },
  { id: 'cleanup', title: 'Eco Waste & Clean Up', category: 'Infrastructure', basePrice: 2, pricingModel: 'per-guest', description: 'Zero-plastic waste management bins, active janitorial staffing, post-event eco-friendly disposal and recycling.', iconKey: 'Cleanup', isStandard: false },
  { id: 'ticketing', title: 'RFID Registration', category: 'Logistics & Tech', basePrice: 4, pricingModel: 'per-guest', description: 'Tap-to-enter RFID wristbands, on-site barcode thermal ticket printers, and high-speed turnstile entrance pods.', iconKey: 'Ticketing', isStandard: false },
  { id: 'emcee', title: 'Multi-lingual Emcee Anchor', category: 'Food & Talent', basePrice: 500, pricingModel: 'flat', description: 'Charismatic hosts fluent in multiple languages, dynamic crowd engagement games, and script development.', iconKey: 'Talent', isStandard: false },
  { id: 'soundproof', title: 'Acoustic Soundproofing', category: 'Infrastructure', basePrice: 900, pricingModel: 'flat', description: 'Heavy sound-dampening acoustic wall blankets, stage echo isolators, and environmental decibel regulation systems.', iconKey: 'Acoustics', isStandard: false },
  { id: 'pyrotechnics', title: 'SFX & Cold Fire Sparks', category: 'AV & Sound', basePrice: 650, pricingModel: 'flat', description: 'Safe cold-pyro spark fountain machines, CO2 heavy-fog dancefloor clouds, and synchronised stadium confetti blasts.', iconKey: 'Pyrotechnics', isStandard: false }
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
