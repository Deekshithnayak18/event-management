import React, { useState, useEffect, useMemo } from 'react';
import './style.css';
import { supabaseClient } from './supabaseClient';

// SVG Icon Components for Services
const Icons = {
  Infrastructure: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  Audio: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
      <circle cx="12" cy="14" r="4"/>
      <line x1="12" y1="6" x2="12.01" y2="6"/>
    </svg>
  ),
  Visual: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 7a2 2 0 0 0-2.45-1.45L16 7V5a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2l4.55 1.45A2 2 0 0 0 23 17V7z"/>
    </svg>
  ),
  Dining: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  Media: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  Stage: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      <path d="M2 12h20"/>
    </svg>
  ),
  Security: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7s0 6 8 10z"/>
    </svg>
  ),
  Drone: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  Lighting: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  ),
  Talent: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
      <path d="M19 10v1a7 7 0 0 1-14 0v-1"/>
      <line x1="12" y1="19" x2="12" y2="22"/>
    </svg>
  ),
  Invites: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Logistics: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="2" ry="2"/>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  VR: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 10a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-4z"/>
      <line x1="6" y1="12" x2="10" y2="12"/>
      <line x1="14" y1="12" x2="18" y2="12"/>
      <circle cx="12" cy="12" r="1"/>
    </svg>
  ),
  Cleanup: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    </svg>
  ),
  Ticketing: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2Z"/>
      <path d="M9 5v14"/>
      <path d="M15 5v14"/>
    </svg>
  ),
  Emcee: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7"/>
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
    </svg>
  ),
  Acoustics: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10a4 4 0 0 2-4 4v2a4 4 0 0 2 4 4M21 10a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4"/>
      <path d="M6 12a6 6 0 0 1 12 0v0"/>
      <path d="M9 12a3 3 0 0 1 6 0v0"/>
    </svg>
  ),
  Pyrotechnics: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
    </svg>
  )
};

// Event Categories Configurations
const EVENTS_DATA = {
  concerts: {
    title: 'Concerts & Music Festivals',
    baseCost: 5000,
    multiplier: 1.5,
    desc: 'Massive staging, acoustic power arrays, safety cordons, and extreme stage special effects tailored for roaring crowds.',
    stats: { capacity: '5,000+ Guests', soundPower: '80K Watts RMS', stageSize: '60x40 Ft', securityCrew: '40 guards' },
    recommendations: ['infra', 'speakers', 'stage', 'lights', 'security', 'pyrotechnics', 'ticketing']
  },
  marriage: {
    title: 'Marriages & Royal Weddings',
    baseCost: 4000,
    multiplier: 1.2,
    desc: 'Elegance redefined. Luxurious fine dining, bespoke thematic backdrops, dreamlike ambient lighting, and comprehensive guest logistics.',
    stats: { capacity: '200 - 1500 Guests', decorTheme: 'Custom Floral', diningCourses: '8 Cuisines', parkingCars: '500+ spaces' },
    recommendations: ['infra', 'catering', 'photos', 'lights', 'rsvp', 'valet', 'emcee']
  },
  sports: {
    title: 'Sports Events & Tournaments',
    baseCost: 3000,
    multiplier: 1.1,
    desc: 'High-brightness live display boards, sound projection across arenas, robust public address systems, and security boundaries.',
    stats: { capacity: '10,000+ Stadiums', screensCount: '4 LED Walls', camerasAngle: '8 Multi-cams', firstAid: '3 Medical booths' },
    recommendations: ['infra', 'speakers', 'projectors', 'security', 'drones', 'ticketing']
  },
  food: {
    title: 'Food Festivals & Exhibitions',
    baseCost: 2500,
    multiplier: 1.0,
    desc: 'Grid layout structures for food stalls, high-hygiene food zones, eco-friendly cleanup systems, and cozy acoustic musical overlays.',
    stats: { stallsCap: '50+ Vendors', hygieneAudit: 'ISO Compliant', trashBins: '120 stations', ambientMusic: 'Distributed audio' },
    recommendations: ['infra', 'catering', 'speakers', 'cleanup', 'lights', 'rsvp']
  },
  college: {
    title: 'College Fests & Cultural Summits',
    baseCost: 2000,
    multiplier: 0.9,
    desc: 'Extremely high-energy visuals, stellar celebrity anchor coordination, engaging VR booths, and affordable rates for student committees!',
    stats: { capacity: '2,500+ Students', discountApplied: '10% Student special', techBooths: '6 interactive', starsBooked: 'Top-tier artists' },
    recommendations: ['speakers', 'lights', 'artist', 'vr', 'ticketing', 'emcee', 'pyrotechnics']
  },
  corporate: {
    title: 'Corporate Galas & Tech Seminars',
    baseCost: 3500,
    multiplier: 1.3,
    desc: 'Super high-definition mapping projectors, perfect speech soundproofing, smooth check-in registrations, and formal anchors.',
    stats: { capacity: '100 - 800 Corporate', hdProjectors: 'Triple mapping', micsSystem: '12 Pro lapels', wifiCoverage: 'Gigabit network' },
    recommendations: ['projectors', 'speakers', 'rsvp', 'soundproof', 'emcee', 'security']
  }
};

const EXCHANGE_RATE = 83;

// Format dynamic values in INR (lakhs/crores format)
const formatINR = (usdVal) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Math.round(usdVal * EXCHANGE_RATE));
};

// Formats a number that is ALREADY in INR (e.g. from the database table)
const formatDirectINR = (inrVal) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(inrVal);
};

function App() {
  // Theme States: 'purple', 'blue', 'rose', 'green'
  const [themeAccent, setThemeAccent] = useState('purple');
  
  // Database States
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [dbSearchQuery, setDbSearchQuery] = useState('');
  const [dbConnected, setDbConnected] = useState(false);

  // Dynamic Credentials override portal
  const [showCredentialsPortal, setShowCredentialsPortal] = useState(false);
  const [inputDbUrl, setInputDbUrl] = useState('');
  const [inputDbKey, setInputDbKey] = useState('');
  
  // SQL schema display overlay state
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [sqlCopied, setSqlCopied] = useState(false);

  // Interactive Calculator Inputs
  const [selectedEventType, setSelectedEventType] = useState('concerts');
  const [guestCount, setGuestCount] = useState(350);
  const [selectedServices, setSelectedServices] = useState(['infra', 'speakers', 'projectors']);
  
  // Search and Filter States for 18 Services Card list
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Showcase Tab State
  const [activeShowcaseTab, setActiveShowcaseTab] = useState('concerts');
  
  // Booking Simulator Dialog Toggles
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [recentBookingResult, setRecentBookingResult] = useState(null);
  
  // Inline edit state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editId, setEditId] = useState('');
  const [editClientName, setEditClientName] = useState('');
  const [editClientEmail, setEditClientEmail] = useState('');
  const [editEventDate, setEditEventDate] = useState('');
  const [editEventType, setEditEventType] = useState('');
  const [editGuestCount, setEditGuestCount] = useState(100);
  const [editSelectedServices, setEditSelectedServices] = useState([]);
  
  // FAQ Accordion State (stores the active index, or null if all closed)
  const [faqOpenIndex, setFaqOpenIndex] = useState(null);
  
  // Contact Form States
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // -------------------------------------------------------------
  // DATABASE SYNCHRONIZATION (DBMS Core)
  // -------------------------------------------------------------
  const loadDatabaseData = async () => {
    setDbConnected(supabaseClient.isConnected());
    
    // Load services from PostgreSQL / Local cache
    setLoadingServices(true);
    const fetchedServices = await supabaseClient.fetchServices();
    setServices(fetchedServices);
    setLoadingServices(false);

    // Load bookings from PostgreSQL / Local cache
    setLoadingBookings(true);
    const fetchedBookings = await supabaseClient.fetchBookings();
    setBookings(fetchedBookings);
    setLoadingBookings(false);
  };

  useEffect(() => {
    loadDatabaseData();
    // Pre-fill credentials portal inputs
    const creds = supabaseClient.getCredentials();
    setInputDbUrl(creds.url);
    setInputDbKey(creds.key);
  }, []);

  const handleSaveCredentials = (e) => {
    e.preventDefault();
    const ok = supabaseClient.saveCredentials(inputDbUrl, inputDbKey);
    if (ok) {
      setShowCredentialsPortal(false);
      loadDatabaseData();
    } else {
      alert("Invalid Supabase URL format! Must be a valid URL pointing to a .supabase.co host.");
    }
  };

  const handleClearCredentials = () => {
    localStorage.removeItem('auraevents_supabase_url');
    localStorage.removeItem('auraevents_supabase_key');
    window.location.reload();
  };

  // Theme changer helper
  const handleThemeChange = (themeName) => {
    setThemeAccent(themeName);
  };

  // Toggle Service in calculator state
  const handleToggleService = (serviceId) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  // Remove service specifically
  const handleRemoveService = (serviceId) => {
    setSelectedServices(selectedServices.filter(id => id !== serviceId));
  };

  // Add all recommended services for the chosen event type
  const handleAddRecommendations = (eventId) => {
    const recs = EVENTS_DATA[eventId].recommendations;
    const combined = Array.from(new Set([...selectedServices, ...recs]));
    setSelectedServices(combined);
  };

  // Reset to default standard services
  const handleResetServices = () => {
    setSelectedServices(['infra', 'speakers', 'projectors']);
  };

  // Filtered Services List
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            service.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeFilter === 'All' || service.category === activeFilter;
      return matchesSearch && matchesCategory;
    });
  }, [services, searchQuery, activeFilter]);

  // Dynamic Live Pricing Calculator Logic
  const totalCostDetails = useMemo(() => {
    const eventDetails = EVENTS_DATA[selectedEventType];
    if (!eventDetails) return { adjustedBase: 0, servicesList: [], servicesTotal: 0, total: 0 };
    
    const eventBase = eventDetails.baseCost;
    const multiplier = eventDetails.multiplier;
    const adjustedBaseCost = eventBase * multiplier;
    
    let servicesSum = 0;
    const brokenDownServices = selectedServices.map(serviceId => {
      const s = services.find(serv => serv.id === serviceId);
      if (!s) return null;
      
      const price = s.pricingModel === 'per-guest' ? s.basePrice * guestCount : s.basePrice;
      servicesSum += price;
      
      return {
        id: s.id,
        title: s.title,
        cost: price,
        pricingModel: s.pricingModel,
        basePrice: s.basePrice
      };
    }).filter(Boolean);
    
    const finalTotal = adjustedBaseCost + servicesSum;
    
    return {
      adjustedBase: adjustedBaseCost,
      servicesList: brokenDownServices,
      servicesTotal: servicesSum,
      total: finalTotal
    };
  }, [services, selectedEventType, guestCount, selectedServices]);

  // Calculate prices for inline editing dialog dynamically
  const computedEditTotal = useMemo(() => {
    const eventDetails = EVENTS_DATA[editEventType];
    if (!eventDetails) return 0;
    
    const base = eventDetails.baseCost * eventDetails.multiplier;
    let servicesSum = 0;
    
    editSelectedServices.forEach(serviceId => {
      const s = services.find(serv => serv.id === serviceId);
      if (s) {
        servicesSum += s.pricingModel === 'per-guest' ? s.basePrice * editGuestCount : s.basePrice;
      }
    });
    
    return base + servicesSum;
  }, [services, editEventType, editGuestCount, editSelectedServices]);

  // Accordion FAQ toggle
  const toggleFaq = (index) => {
    setFaqOpenIndex(faqOpenIndex === index ? null : index);
  };

  // -------------------------------------------------------------
  // CRUD CONTROLLERS (Front-End Bindings)
  // -------------------------------------------------------------

  // CREATE (C) - Save New Reservation Layout in PostgreSQL
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail || !bookingDate) return;

    const payload = {
      clientName: bookingName,
      clientEmail: bookingEmail,
      eventDate: bookingDate,
      eventType: selectedEventType,
      guestCount: guestCount,
      selectedServices: selectedServices,
      totalPrice: totalCostDetails.total * EXCHANGE_RATE
    };

    const res = await supabaseClient.insertBooking(payload);
    if (res.success) {
      setRecentBookingResult(res.data);
      setBookingSuccess(true);
      // Reload booking log list
      const updatedList = await supabaseClient.fetchBookings();
      setBookings(updatedList);
    } else {
      alert("Failed to insert database row. Check Supabase connection.");
    }
  };

  // READ (R) - Live Database Bookings Visual Filter
  const filteredBookingsLogs = useMemo(() => {
    return bookings.filter(b => {
      const text = `${b.client_name} ${b.client_email} ${b.event_type}`.toLowerCase();
      return text.includes(dbSearchQuery.toLowerCase());
    });
  }, [bookings, dbSearchQuery]);

  // UPDATE (U) - Pull details and launch inline editor
  const handleOpenEditModal = (b) => {
    setEditId(b.id);
    setEditClientName(b.client_name);
    setEditClientEmail(b.client_email);
    setEditEventDate(b.event_date);
    setEditEventType(b.event_type);
    setEditGuestCount(b.guest_count);
    setEditSelectedServices(b.selected_services || []);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editClientName || !editClientEmail || !editEventDate) return;

    const payload = {
      clientName: editClientName,
      clientEmail: editClientEmail,
      eventDate: editEventDate,
      eventType: editEventType,
      guestCount: editGuestCount,
      selectedServices: editSelectedServices,
      totalPrice: computedEditTotal * EXCHANGE_RATE
    };

    const res = await supabaseClient.updateBooking(editId, payload);
    if (res.success) {
      setShowEditModal(false);
      // Reload lists
      const updatedList = await supabaseClient.fetchBookings();
      setBookings(updatedList);
    } else {
      alert("Database failed to update record.");
    }
  };

  const handleToggleEditService = (serviceId) => {
    if (editSelectedServices.includes(serviceId)) {
      setEditSelectedServices(editSelectedServices.filter(id => id !== serviceId));
    } else {
      setEditSelectedServices([...editSelectedServices, serviceId]);
    }
  };

  // DELETE (D) - Annul Reservation Layout
  const handleDeleteBooking = async (id, name) => {
    const ok = window.confirm(`DBMS Transaction Alert:\nAre you sure you want to annul and delete the reservation row for "${name}" from the bookings database table?`);
    if (!ok) return;

    const res = await supabaseClient.deleteBooking(id);
    if (res.success) {
      // Reload logs
      const updatedList = await supabaseClient.fetchBookings();
      setBookings(updatedList);
    } else {
      alert("Failed to delete row from database.");
    }
  };

  // Inquiry Insertion Log
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    const payload = {
      repName: contactName,
      email: contactEmail,
      specsNotes: contactMessage
    };

    const res = await supabaseClient.insertInquiry(payload);
    if (res.success) {
      setContactSuccess(true);
      setTimeout(() => {
        setContactName('');
        setContactEmail('');
        setContactMessage('');
        setContactSuccess(false);
      }, 4000);
    } else {
      alert("Inquiry logging failed.");
    }
  };

  // Reset calculator states when closing booking successful window
  const closeBookingModal = () => {
    setShowBookingModal(false);
    setBookingSuccess(false);
    setBookingName('');
    setBookingEmail('');
    setBookingDate('');
    setRecentBookingResult(null);
  };

  // Copy SQL script tool helper
  const handleCopySql = () => {
    const code = document.getElementById('postgres-ddl-code').innerText;
    navigator.clipboard.writeText(code);
    setSqlCopied(true);
    setTimeout(() => setSqlCopied(false), 2000);
  };

  return (
    <div className={`theme-${themeAccent}`}>
      {/* Background ambient neon glow filters */}
      <div className="bg-ambient-glow">
        <div className="glow-blob glow-blob-1"></div>
        <div className="glow-blob glow-blob-2"></div>
        <div className="glow-blob glow-blob-3"></div>
      </div>

      {/* FLOATING ACCENT THEMING CONTROLLER */}
      <div className="accent-controller">
        <span>Aesthetics:</span>
        <div className="theme-dots">
          <button 
            onClick={() => handleThemeChange('purple')} 
            className={`theme-dot theme-dot-purple ${themeAccent === 'purple' ? 'active' : ''}`}
            title="Vibrant Neon Purple"
            aria-label="Set theme to Neon Purple"
          ></button>
          <button 
            onClick={() => handleThemeChange('blue')} 
            className={`theme-dot theme-dot-blue ${themeAccent === 'blue' ? 'active' : ''}`}
            title="Electric Neon Blue"
            aria-label="Set theme to Neon Blue"
          ></button>
          <button 
            onClick={() => handleThemeChange('rose')} 
            className={`theme-dot theme-dot-rose ${themeAccent === 'rose' ? 'active' : ''}`}
            title="Sunset Neon Rose"
            aria-label="Set theme to Neon Rose"
          ></button>
          <button 
            onClick={() => handleThemeChange('green')} 
            className={`theme-dot theme-dot-green ${themeAccent === 'green' ? 'active' : ''}`}
            title="Emerald Oasis Green"
            aria-label="Set theme to Emerald Green"
          ></button>
        </div>
      </div>

      {/* HEADER & STICKY GLASSMORPHIC NAVBAR */}
      <header className="navbar">
        <div className="container nav-container">
          <a href="#" className="logo" id="auraevents-logo">
            <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            AuraEvents
          </a>
          <nav className="nav-links">
            <a href="#" className="nav-link active">Home</a>
            <a href="#calculator" className="nav-link">Cost Calculator</a>
            <a href="#services" className="nav-link">
              Services
              <span className="nav-badge">{services.length || 18}</span>
            </a>
            <a href="#db-console" className="nav-link" style={{color: 'var(--accent-text)', fontWeight: '700'}}>
              DBMS Dashboard
            </a>
            <a href="#showcase" className="nav-link">Event Hub</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </nav>
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <button 
              onClick={() => setShowSqlModal(true)} 
              className="btn btn-secondary"
              style={{padding: '0.6rem 1.2rem', fontSize: '0.85rem'}}
            >
              Get Schema SQL
            </button>
            <button 
              onClick={() => setShowBookingModal(true)} 
              className="btn btn-primary btn-glow"
              id="header-cta-btn"
            >
              Book Setup
            </button>
          </div>
        </div>
      </header>

      {/* DATABASE MOCK / SANDBOX CONNECTION WARNER */}
      <div className="container" style={{marginTop: '2rem'}}>
        {!dbConnected ? (
          <div className="glass-panel db-setup-banner" style={{borderColor: 'rgba(245, 158, 11, 0.3)', borderRadius: 'var(--radius-lg)'}}>
            <div>
              <h4 style={{color: '#f59e0b', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <span>⚠️</span> Sandbox DBMS Mode Active
              </h4>
              <p style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>
                Currently saving and reading transactions locally inside <strong>browser localStorage</strong>. Connect your live Supabase database for multi-user PostgreSQL records!
              </p>
            </div>
            <div className="db-setup-actions">
              <button onClick={() => setShowCredentialsPortal(true)} className="btn btn-primary btn-glow" style={{padding: '0.5rem 1rem', fontSize: '0.8rem'}}>
                Configure Supabase
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-panel db-setup-banner" style={{borderColor: 'rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.03)', borderRadius: 'var(--radius-lg)'}}>
            <div>
              <h4 style={{color: '#10b981', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <span>✓</span> PostgreSQL Database Linked
              </h4>
              <p style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>
                Connected to live Supabase backend. Reading/writing catalogs and booking transactions dynamically in real-time.
              </p>
            </div>
            <div className="db-setup-actions">
              <button onClick={() => setShowCredentialsPortal(true)} className="btn btn-secondary" style={{padding: '0.5rem 1rem', fontSize: '0.8rem'}}>
                Credentials Config
              </button>
              <button onClick={handleClearCredentials} className="btn btn-accent" style={{padding: '0.5rem 1rem', fontSize: '0.8rem', color: '#ef4444'}}>
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>

      {/* HERO SECTION */}
      <section className="hero-section" style={{paddingTop: '3rem'}}>
        <div className="container">
          <div className="hero-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px'}}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Interactive DBMS Grading Project
          </div>
          <h1 className="hero-heading">
            Database-Centric Event Manager Software
          </h1>
          <p className="hero-subheading">
            Store and retrieve reservations in real-time. Build layout budgets, edit active transactions, and cancel infrastructure orders using Supabase PostgreSQL tables and secure Row-Level Security rules.
          </p>
          <div className="hero-ctas">
            <a href="#calculator" className="btn btn-primary btn-glow">Configure Event Calculator</a>
            <a href="#db-console" className="btn btn-secondary">Open Database Log</a>
          </div>

          {/* Key Metrics Stats Banner */}
          <div className="stats-bar glass-panel">
            <div className="stat-item">
              <div className="stat-value">{services.length || 18}</div>
              <div className="stat-label">Catalog Items (DB)</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{bookings.length}</div>
              <div className="stat-label">Active Bookings (DB)</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">PostgreSQL</div>
              <div className="stat-label">Database Type</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">RLS Policies</div>
              <div className="stat-label">Access Controls</div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE BUDGET CALCULATOR SECTION */}
      <section className="calculator-section" id="calculator">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Interactive Event Builder</span>
            <h2 className="section-title">Live Cost Projection Engine</h2>
            <p className="section-desc">
              Change the event type, slide guest volumes, and toggle services on/off. Watch prices adapt dynamically and commit configurations to the database!
            </p>
          </div>

          <div className="calculator-wrapper">
            {/* Control Panel */}
            <div className="calc-panel glass-panel">
              <h3 className="calc-title">
                <svg className="calc-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
                  <line x1="9" y1="9" x2="15" y2="9"/>
                  <line x1="9" y1="13" x2="15" y2="13"/>
                  <line x1="9" y1="17" x2="15" y2="17"/>
                </svg>
                Step 1: Customize Your Layout
              </h3>

              {/* Event Type Grid Buttons */}
              <div className="calc-row">
                <label>Select Event Model</label>
                <div className="event-type-grid">
                  {Object.entries(EVENTS_DATA).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedEventType(key);
                        handleAddRecommendations(key);
                      }}
                      className={`event-type-btn ${selectedEventType === key ? 'active' : ''}`}
                    >
                      {value.title.split(' & ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Count Range Slider */}
              <div className="calc-row">
                <label htmlFor="guest-slider-main">
                  Expected Attendance
                  <span className="val">{guestCount} Guests</span>
                </label>
                <div className="range-slider-container">
                  <input
                    type="range"
                    id="guest-slider-main"
                    className="range-slider"
                    min="50"
                    max="3000"
                    step="50"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Services Selector Checks */}
              <div className="calc-row">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem'}}>
                  <label style={{margin: 0}}>Toggle Services List</label>
                  <div style={{display: 'flex', gap: '0.5rem'}}>
                    <button 
                      onClick={handleResetServices}
                      className="btn btn-accent" 
                      style={{padding: '0.35rem 0.75rem', fontSize: '0.75rem', borderRadius: '4px'}}
                    >
                      Reset Standard
                    </button>
                    <button 
                      onClick={() => setSelectedServices(services.map(s => s.id))} 
                      className="btn btn-accent" 
                      style={{padding: '0.35rem 0.75rem', fontSize: '0.75rem', borderRadius: '4px'}}
                    >
                      Select All
                    </button>
                  </div>
                </div>
                
                {loadingServices ? (
                  <div style={{padding: '2rem', textAlign: 'center', color: 'var(--text-muted)'}}>Connecting to Services Catalog Table...</div>
                ) : (
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto', paddingRight: '0.5rem', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '0.75rem'}}>
                    {services.map((service) => {
                      const isChecked = selectedServices.includes(service.id);
                      return (
                        <label 
                          key={service.id} 
                          style={{
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.5rem', 
                            fontSize: '0.8rem', 
                            fontWeight: 500, 
                            color: isChecked ? 'var(--text-primary)' : 'var(--text-secondary)',
                            cursor: 'pointer',
                            background: isChecked ? 'rgba(255,255,255,0.03)' : 'transparent',
                            padding: '0.35rem',
                            borderRadius: '4px'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleService(service.id)}
                            style={{accentColor: 'var(--accent-primary)', width: '0.9rem', height: '0.9rem'}}
                          />
                          <span style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} title={service.title}>
                            {service.title}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Cost Summary Visual Board */}
            <div className="summary-panel glass-panel">
              <div className="summary-header">
                <h3>Live Budget Sheet</h3>
                <p style={{color: 'var(--text-secondary)', fontSize: '0.8rem'}}>Active layers: {selectedServices.length} modules</p>
              </div>

              {/* Selected List */}
              <div className="selected-list">
                <div className="selected-item" style={{background: 'rgba(139,92,246,0.05)', borderColor: 'rgba(139,92,246,0.1)'}}>
                  <div className="selected-name">
                    <span style={{color: 'var(--accent-text)'}}>★</span>
                    {EVENTS_DATA[selectedEventType]?.title} (Base)
                  </div>
                  <div className="selected-cost">{formatINR(totalCostDetails.adjustedBase)}</div>
                </div>

                {totalCostDetails.servicesList.length === 0 ? (
                  <div style={{padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem'}}>
                    No modular services selected. Check items to build infrastructure details!
                  </div>
                ) : (
                  totalCostDetails.servicesList.map(s => (
                    <div key={s.id} className="selected-item">
                      <div className="selected-name">
                        <span style={{color: 'var(--accent-primary)'}}>✓</span>
                        {s.title}
                      </div>
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <span className="selected-cost">{formatINR(s.cost)}</span>
                        <button 
                          className="selected-remove" 
                          onClick={() => handleRemoveService(s.id)}
                          title="Remove service"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Total Calculation Display */}
              <div>
                <div className="summary-cost-block">
                  <div className="summary-cost-label">Calculated Estimate</div>
                  <div className="summary-cost-total">{formatINR(totalCostDetails.total)}</div>
                  <div className="summary-cost-sub">
                    Includes {guestCount} guests & {selectedServices.length} database specifications
                  </div>
                </div>

                <button 
                  onClick={() => setShowBookingModal(true)} 
                  className="btn btn-primary btn-glow" 
                  style={{width: '100%', justifyContent: 'center'}}
                  id="checkout-book-btn"
                >
                  Write to PostgreSQL Table
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC DATABASE CRUD CONSOLE TABLE */}
      <section className="database-dashboard-section" id="db-console">
        <div className="container">
          <div className="section-header">
            <span className="section-tag" style={{color: 'var(--accent-text)'}}>DBMS Active Log</span>
            <h2 className="section-title">Live Transactions Database Visualizer</h2>
            <p className="section-desc">
              Execute full CRUD operations directly on the <code>bookings</code> PostgreSQL table below. View, update date/guest count, and delete records seamlessly.
            </p>
          </div>

          <div className="glass-panel" style={{padding: '2.5rem'}}>
            <div className="db-controls">
              {/* Database Search query filter */}
              <div style={{position: 'relative', width: '100%', maxWidth: '24rem'}}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Search bookings by client name, email, or event type..."
                  value={dbSearchQuery}
                  onChange={(e) => setDbSearchQuery(e.target.value)}
                  style={{paddingLeft: '2.5rem', borderRadius: '8px'}}
                  id="db-search-input"
                />
                <svg style={{position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: 'var(--text-muted)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>

              {/* Status information and logs stats counter */}
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <div className="db-stats-pill">
                  {filteredBookingsLogs.length} of {bookings.length} Rows Logged
                </div>
                <div className="db-status-info">
                  <div className={`status-indicator ${dbConnected ? 'connected' : 'fallback'}`}></div>
                  <div>
                    <div className="db-status-text">{dbConnected ? 'Supabase DB Linked' : 'Local Sandbox Mock'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live bookings visual data log table */}
            {loadingBookings ? (
              <div style={{padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)'}}>
                Querying bookings table from PostgreSQL backend...
              </div>
            ) : filteredBookingsLogs.length === 0 ? (
              <div style={{padding: '4rem', textAlign: 'center', border: '1px dashed var(--border-glass)', borderRadius: 'var(--radius-lg)', color: 'var(--text-muted)'}}>
                <span style={{fontSize: '2.5rem', display: 'block', marginBottom: '1rem'}}>📋</span>
                <h4 style={{color: '#ffffff', marginBottom: '0.5rem'}}>No Booking Records Found</h4>
                <p style={{fontSize: '0.85rem'}}>There are no transactions logged matching your search. Create one using the calculator above!</p>
              </div>
            ) : (
              <div className="db-table-container">
                <table className="db-table">
                  <thead>
                    <tr>
                      <th className="db-th">Date</th>
                      <th className="db-th">Client Details</th>
                      <th className="db-th">Event Model</th>
                      <th className="db-th">Guests</th>
                      <th className="db-th">Selected Modules</th>
                      <th className="db-th">Calculated Price</th>
                      <th className="db-th" style={{textAlign: 'center'}}>DBMS Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookingsLogs.map(b => (
                      <tr key={b.id} className="db-tr">
                        <td className="db-td" style={{fontFamily: 'var(--font-heading)', fontWeight: '700', color: '#ffffff'}}>
                          {b.event_date}
                        </td>
                        <td className="db-td">
                          <div className="db-client-info">
                            <span className="db-client-name">{b.client_name}</span>
                            <span className="db-client-email">{b.client_email}</span>
                          </div>
                        </td>
                        <td className="db-td">
                          <span className={`db-type-badge db-type-${b.event_type}`}>
                            {b.event_type}
                          </span>
                        </td>
                        <td className="db-td" style={{fontWeight: '600', color: 'var(--text-primary)'}}>
                          {b.guest_count}
                        </td>
                        <td className="db-td">
                          <div className="db-services-tags">
                            {b.selected_services && b.selected_services.length > 0 ? (
                              b.selected_services.map(sId => (
                                <span key={sId} className="db-services-tag">
                                  {services.find(s => s.id === sId)?.title || sId}
                                </span>
                              ))
                            ) : (
                              <span style={{color: 'var(--text-muted)', fontSize: '0.75rem'}}>No add-on layers</span>
                            )}
                          </div>
                        </td>
                        <td className="db-td" style={{fontWeight: '800', color: 'var(--accent-text)', fontSize: '0.95rem'}}>
                          {formatDirectINR(b.total_price)}
                        </td>
                        <td className="db-td">
                          <div className="db-actions" style={{justifyContent: 'center'}}>
                            {/* UPDATE trigger */}
                            <button 
                              onClick={() => handleOpenEditModal(b)} 
                              className="db-btn-icon edit" 
                              title="Edit/Reschedule record"
                            >
                              ✏️
                            </button>
                            {/* DELETE trigger */}
                            <button 
                              onClick={() => handleDeleteBooking(b.id, b.client_name)} 
                              className="db-btn-icon delete" 
                              title="Annul/Cancel booking row"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>
                PostgreSQL Constraints: Primary keys are unique UUID v4 strings. Default timestamps are synchronized in UTC.
              </span>
              <button 
                onClick={() => setShowSqlModal(true)} 
                className="btn btn-secondary" 
                style={{padding: '0.5rem 1rem', fontSize: '0.8rem'}}
              >
                View SQL Structure schema
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES DYNAMIC GRID SECTION */}
      <section className="services-section" id="services">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Modular Capabilities</span>
            <h2 className="section-title">Our Full Service Suite</h2>
            <p className="section-desc">
              Explore 18 complete standard and customized event infrastructure solutions. Search or filter to build your college project layout.
            </p>
          </div>

          {/* Filtering bar and Search bar */}
          <div className="filter-bar">
            <div className="search-input-wrapper">
              <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search infra, laser shows, safety, ticketing..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="service-search-input"
              />
            </div>

            <div className="filter-tabs">
              {['All', 'Infrastructure', 'AV & Sound', 'Food & Talent', 'Logistics & Tech'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`filter-tab ${activeFilter === tab ? 'active' : ''}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* 18 Services Grid */}
          {filteredServices.length === 0 ? (
            <div className="glass-panel" style={{padding: '4rem', textAlign: 'center'}}>
              <h3 style={{marginBottom: '0.5rem', color: '#ffffff'}}>No Services Found</h3>
              <p style={{color: 'var(--text-secondary)'}}>No items match your search filter "{searchQuery}". Try searching for sound, lights, or parking.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveFilter('All'); }} 
                className="btn btn-primary" 
                style={{marginTop: '1.5rem'}}
              >
                Clear Search filters
              </button>
            </div>
          ) : (
            <div className="grid services-grid">
              {filteredServices.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                const showPerGuestLabel = service.pricingModel === 'per-guest';
                
                return (
                  <article key={service.id} className="service-card glass-panel">
                    {service.isStandard && (
                      <span className="service-badge">Core Service</span>
                    )}
                    
                    <div>
                      <div className="service-icon-box">
                        {Icons[service.iconKey] ? Icons[service.iconKey]('service-icon') : Icons.Infrastructure('service-icon')}
                      </div>
                      <h3 className="service-title">{service.title}</h3>
                      <p className="service-desc">{service.description}</p>
                    </div>

                    <div className="service-footer">
                      <div className="service-cost-tag">
                        <span className="service-cost-val">
                          {formatINR(service.basePrice)}
                        </span>
                        <span className="service-cost-lbl">
                          {showPerGuestLabel ? 'per Guest fee' : 'Flat setup fee'}
                        </span>
                      </div>

                      <button
                        onClick={() => handleToggleService(service.id)}
                        className={`service-toggle-btn ${isSelected ? 'added' : ''}`}
                        title={isSelected ? 'Remove from live budget sheet' : 'Add to live budget sheet'}
                        aria-label={`${isSelected ? 'Remove' : 'Add'} ${service.title}`}
                      >
                        {isSelected ? '✓' : '+'}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* EVENT TYPES DYNAMIC SHOWCASE HUB */}
      <section className="events-section" id="showcase">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Interactive Visualizer</span>
            <h2 className="section-title">Adaptable Event Models</h2>
            <p className="section-desc">
              Select an event category to view its recommended technical specifications and explore how AuraEvents builds themes.
            </p>
          </div>

          {/* Event showcase switcher tabs */}
          <div className="event-showcase-tabs">
            {Object.keys(EVENTS_DATA).map(key => (
              <button
                key={key}
                onClick={() => setActiveShowcaseTab(key)}
                className={`event-showcase-tab ${activeShowcaseTab === key ? 'active' : ''}`}
              >
                {EVENTS_DATA[key].title}
              </button>
            ))}
          </div>

          {/* Event details showcase block */}
          <div className="showcase-display glass-panel">
            <div className="showcase-details">
              <h3>
                <span style={{color: 'var(--accent-text)'}}>⚡</span>
                {EVENTS_DATA[activeShowcaseTab]?.title}
              </h3>
              <p>{EVENTS_DATA[activeShowcaseTab]?.desc}</p>
              
              <div className="showcase-stats-grid">
                {EVENTS_DATA[activeShowcaseTab] && Object.entries(EVENTS_DATA[activeShowcaseTab].stats).map(([statName, statVal]) => (
                  <div key={statName} className="showcase-stat">
                    <div className="showcase-stat-val">{statVal}</div>
                    <div className="showcase-stat-lbl">
                      {statName.replace(/([A-Z])/g, ' $1').toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="showcase-recommendations">
                <h4 className="showcase-rec-title">Recommended Setup Layer:</h4>
                <div className="showcase-rec-tags">
                  {EVENTS_DATA[activeShowcaseTab]?.recommendations.map(recId => {
                    const serv = services.find(s => s.id === recId);
                    return serv ? (
                      <span key={recId} className="showcase-rec-tag">
                        {serv.title}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedEventType(activeShowcaseTab);
                  handleAddRecommendations(activeShowcaseTab);
                  const calcElement = document.getElementById('calculator');
                  if (calcElement) calcElement.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-primary"
                style={{marginTop: '2rem'}}
              >
                Apply Custom Specifications
              </button>
            </div>

            {/* College project mock showcase stage visualizer */}
            <div className="college-visualizer">
              <div className="stage-laser stage-laser-1"></div>
              <div className="stage-laser stage-laser-2"></div>
              <div className="stage-beams"></div>
              
              <div className="stage-speaker-l stage-element"></div>
              <div className="stage-speaker-r stage-element"></div>
              
              <div className="stage-banner">
                <span style={{fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-text)', display: 'block', marginBottom: '0.2rem'}}>
                  AURA LIVE
                </span>
                <div className="stage-banner-title">
                  {activeShowcaseTab === 'concerts' && 'ROCK FEST 2026'}
                  {activeShowcaseTab === 'marriage' && 'FOREVER WEDDING'}
                  {activeShowcaseTab === 'sports' && 'ARENA CUP LIVE'}
                  {activeShowcaseTab === 'food' && 'TASTE FESTIVAL'}
                  {activeShowcaseTab === 'college' && 'CULTURAL SUMMIT'}
                  {activeShowcaseTab === 'corporate' && 'TECH KEYNOTE'}
                </div>
                <span style={{fontSize: '0.75rem', color: 'var(--text-secondary)'}}>
                  {activeShowcaseTab === 'concerts' && '80,000W Sound Active'}
                  {activeShowcaseTab === 'marriage' && 'Bespoke Floral Decor Active'}
                  {activeShowcaseTab === 'sports' && 'Multi-Cam Live Stream Active'}
                  {activeShowcaseTab === 'food' && 'Hygiene Stall Grid Active'}
                  {activeShowcaseTab === 'college' && 'Celebrity DJ Guest Setup Active'}
                  {activeShowcaseTab === 'corporate' && 'Dual Mapping Lens Active'}
                </span>
              </div>
              
              <div className="stage-floor"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ACCORDION FAQ SECTION */}
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Answering Inquiries</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">
              All you need to know about our student packages, heavy infrastructure capabilities, and green energy initiatives.
            </p>
          </div>

          <div className="faq-grid">
            {[
              {
                q: "How does Supabase store our event data?",
                a: "AuraEvents links directly to a hosted Supabase PostgreSQL instance. When you commit your budget estimates, they are written as new rows into a structured 'bookings' table. Custom services are retrieved in real-time on load from the 'services' catalog table."
              },
              {
                q: "What DBMS features are demonstrated in this project?",
                a: "This project showcases full relational CRUD operations! It allows inserting booking records (Create), dynamically displaying logs from the tables (Read), editing attendee sizes/dates with real-time recalculations (Update), and annulling orders with complete index synchronization (Delete)."
              },
              {
                q: "What are PostgreSQL RLS policies used for?",
                a: "Row-Level Security (RLS) is configured in Supabase to specify table permissions. In this project, services table select access is allowed publicly, while bookings and inquiries tables permit complete public select/insert/edit access to simulate standard business operations safely."
              },
              {
                q: "What happens if our internet goes offline during the practical lab?",
                a: "Don't worry! We engineered a complete Local Sandbox Database fallback system backed by HTML5 localStorage. All CRUD transactions operate seamlessly in fallback mode, letting you demonstrate all features offline before connecting to live Supabase!"
              }
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-item glass-panel ${faqOpenIndex === idx ? 'active' : ''}`}
              >
                <button 
                  onClick={() => toggleFaq(idx)} 
                  className="faq-question-btn"
                  aria-expanded={faqOpenIndex === idx ? 'true' : 'false'}
                >
                  {faq.q}
                  <svg className="faq-icon-chevron" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-inner">
                    <p style={{margin: 0}}>{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLASSMORPHIC CONTACT & FEEDBACK FORM */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="glass-panel contact-layout">
            
            {/* Information panel */}
            <div className="contact-info-panel" style={{border: 'none'}}>
              <div>
                <h3 className="contact-info-title">Let's Plan Your Perfect Layout</h3>
                <p className="contact-info-text">
                  Have special infrastructure requirements or custom college project budgets? Drop us a line. Our coordination office is open 24/7.
                </p>
              </div>

              <div className="contact-methods">
                <div className="contact-method-item">
                  <div className="contact-method-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div className="contact-method-details">
                    <h4>Direct Phone support</h4>
                    <p>+1 (555) 839-2910 (Student Desk)</p>
                  </div>
                </div>

                <div className="contact-method-item">
                  <div className="contact-method-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div className="contact-method-details">
                    <h4>E-mail Enquiries</h4>
                    <p>support@auraevents.edu</p>
                  </div>
                </div>

                <div className="contact-method-item">
                  <div className="contact-method-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div className="contact-method-details">
                    <h4>Operations Headquarters</h4>
                    <p>Building 4B, Technical Campus University</p>
                  </div>
                </div>
              </div>

              <div style={{marginTop: '2rem'}}>
                <span className="footer-college-tag">★ Grading: DBMS Lab Practical Approved</span>
              </div>
            </div>

            {/* Input panel */}
            <div className="contact-form-panel" style={{border: 'none', background: 'rgba(0,0,0,0.15)', borderLeft: '1px solid var(--border-glass)'}}>
              <h3 style={{fontSize: '1.5rem', marginBottom: '1.5rem'}}>Send Booking Query</h3>
              
              {contactSuccess ? (
                <div style={{background: 'rgba(16,185,129,0.1)', border: '1px solid #10b981', borderRadius: 'var(--radius-md)', padding: '2rem', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                  <span style={{fontSize: '2.5rem', display: 'block', marginBottom: '1rem'}}>✉</span>
                  <h4 style={{color: '#ffffff', marginBottom: '0.5rem'}}>Message Transmitted Successfully!</h4>
                  <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Your specs have been logged in the inquiries table. A layout draft has been sent to your email.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} id="contact-feedback-form">
                  <div className="form-group">
                    <label htmlFor="contact-name">Representative Name</label>
                    <input
                      type="text"
                      className="form-input"
                      id="contact-name"
                      placeholder="e.g. Student Coordinator John"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email">E-mail Address</label>
                    <input
                      type="email"
                      className="form-input"
                      id="contact-email"
                      placeholder="yourname@domain.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message">Event Specs & Notes</label>
                    <textarea
                      className="form-input"
                      id="contact-message"
                      placeholder="Specify sound Decibels (dB), requested security barrier lengths, or custom culinary requests..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{width: '100%', justifyContent: 'center', marginTop: '1rem'}}
                  >
                    Insert Inquiry Row
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>AuraEvents</h4>
              <p>State-of-the-art modular infrastructure systems enabling students and managers to construct premium concerts, weddings, and cultural festivals.</p>
              <div className="footer-socials">
                <a href="#" className="footer-social-icon" aria-label="AuraEvents Github">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                </a>
                <a href="#" className="footer-social-icon" aria-label="AuraEvents Twitter">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                  </svg>
                </a>
                <a href="#" className="footer-social-icon" aria-label="AuraEvents LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-column">
              <h5>Event Solutions</h5>
              <ul className="footer-links">
                <li><a href="#calculator" className="footer-link">Concerts & Festivals</a></li>
                <li><a href="#calculator" className="footer-link">Weddings & Marriages</a></li>
                <li><a href="#calculator" className="footer-link">Sports Tournaments</a></li>
                <li><a href="#calculator" className="footer-link">Food Exhibitions</a></li>
                <li><a href="#calculator" className="footer-link">College Cultural Fests</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h5>Core Equipment</h5>
              <ul className="footer-links">
                <li><a href="#services" className="footer-link">German Pagoda Tents</a></li>
                <li><a href="#services" className="footer-link">Audio Line Arrays</a></li>
                <li><a href="#services" className="footer-link">Projection Lenses</a></li>
                <li><a href="#services" className="footer-link">RFID Gate Access</a></li>
                <li><a href="#services" className="footer-link">SFX Sparklers</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h5>Project Info</h5>
              <ul className="footer-links">
                <li><a href="#faq" className="footer-link">FAQ Guide</a></li>
                <li><a href="#calculator" className="footer-link">Cost Calculator</a></li>
                <li><a href="#contact" className="footer-link">Submit Feedback</a></li>
                <li style={{color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem'}}>Course Code: CSE-DBMS-2026</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">
              &copy; {new Date().getFullYear()} AuraEvents Inc. Created for Technical DBMS Lab Practical Examination.
            </p>
            <div>
              <span className="footer-college-tag">Academic DBMS Presentation</span>
            </div>
          </div>
        </div>
      </footer>

      {/* -------------------------------------------------------------
         MODALS & OVERLAYS PORTALS
         ------------------------------------------------------------- */}

      {/* CREDENTIALS DYNAMIC PORTAL OVERLAY */}
      {showCredentialsPortal && (
        <div className="modal-overlay" onClick={() => setShowCredentialsPortal(false)}>
          <div 
            className="modal-content glass-panel" 
            onClick={(e) => e.stopPropagation()}
            style={{borderColor: '#f59e0b'}}
          >
            <button className="modal-close-btn" onClick={() => setShowCredentialsPortal(false)}>✕</button>
            <div className="modal-header">
              <h3 style={{color: '#f59e0b'}}>PostgreSQL Connection Config</h3>
              <p>Bind your exact Supabase Database credentials to route transaction tables actively.</p>
            </div>

            <form onSubmit={handleSaveCredentials} id="credentials-connection-form">
              <div className="form-group">
                <label htmlFor="portal-db-url">Supabase Project URL</label>
                <input
                  type="text"
                  className="form-input"
                  id="portal-db-url"
                  placeholder="https://yourprojectid.supabase.co"
                  value={inputDbUrl}
                  onChange={(e) => setInputDbUrl(e.target.value)}
                  required
                />
                <span style={{fontSize: '0.7rem', color: 'var(--text-muted)'}}>Found under Project Settings → API in your Supabase Console.</span>
              </div>

              <div className="form-group" style={{marginTop: '1rem'}}>
                <label htmlFor="portal-db-key">Supabase Public API Key / Secret Access Token</label>
                <input
                  type="text"
                  className="form-input"
                  id="portal-db-key"
                  placeholder="eyJhbGciOi..."
                  value={inputDbKey}
                  onChange={(e) => setInputDbKey(e.target.value)}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', boxShadow: '0 0 20px rgba(245,158,11,0.2)', color: '#ffffff', marginTop: '1.5rem'}}
              >
                Validate and Bind Database Connection
              </button>
            </form>
          </div>
        </div>
      )}

      {/* GET SQL SCHEMA MODAL OVERLAY */}
      {showSqlModal && (
        <div className="modal-overlay" onClick={() => setShowSqlModal(false)}>
          <div 
            className="modal-content glass-panel" 
            onClick={(e) => e.stopPropagation()}
            style={{maxWidth: '52rem'}}
          >
            <button className="modal-close-btn" onClick={() => setShowSqlModal(false)}>✕</button>
            <div className="modal-header" style={{textAlign: 'left', marginBottom: '1.5rem'}}>
              <h3>PostgreSQL DBMS DDL Structure</h3>
              <p>Copy-paste this schema structure into your Supabase SQL Editor to configure all services, bookings, and policies instantly!</p>
            </div>

            <div className="sql-console">
              <div className="sql-header">
                <span style={{fontSize: '0.75rem', color: '#6b7280', fontWeight: 'bold'}}>SUPABASE SQL SCRIPT</span>
                <button className="sql-actions-btn" onClick={handleCopySql}>
                  {sqlCopied ? 'Copied to Clipboard!' : 'Copy SQL Commands'}
                </button>
              </div>
              <pre className="sql-pre-code" id="postgres-ddl-code">
                <code>
<span className="sql-comment">-- =========================================================================</span>{'\n'}
<span className="sql-comment">-- AuraEvents Database Schema DDL Setup</span>{'\n'}
<span className="sql-comment">-- =========================================================================</span>{'\n'}{'\n'}
<span className="sql-keyword">DROP TABLE IF EXISTS</span> inquiries CASCADE;{'\n'}
<span className="sql-keyword">DROP TABLE IF EXISTS</span> bookings CASCADE;{'\n'}
<span className="sql-keyword">DROP TABLE IF EXISTS</span> services CASCADE;{'\n'}{'\n'}
<span className="sql-comment">-- 1. Create services catalog table</span>{'\n'}
<span className="sql-keyword">CREATE TABLE</span> services ({'\n'}
    id <span className="sql-type">VARCHAR(50)</span> <span className="sql-keyword">PRIMARY KEY</span>,{'\n'}
    title <span className="sql-type">VARCHAR(100)</span> <span className="sql-keyword">NOT NULL</span>,{'\n'}
    category <span className="sql-type">VARCHAR(50)</span> <span className="sql-keyword">NOT NULL</span>,{'\n'}
    base_price <span className="sql-type">NUMERIC(10, 2)</span> <span className="sql-keyword">NOT NULL</span>,{'\n'}
    pricing_model <span className="sql-type">VARCHAR(20)</span> <span className="sql-keyword">NOT NULL</span>,{'\n'}
    description <span className="sql-type">TEXT</span> <span className="sql-keyword">NOT NULL</span>,{'\n'}
    icon_key <span className="sql-type">VARCHAR(50)</span> <span className="sql-keyword">NOT NULL</span>,{'\n'}
    is_standard <span className="sql-type">BOOLEAN</span> <span className="sql-keyword">DEFAULT FALSE</span>{'\n'});{'\n'}{'\n'}
<span className="sql-comment">-- 2. Create bookings table</span>{'\n'}
<span className="sql-keyword">CREATE TABLE</span> bookings ({'\n'}
    id <span className="sql-type">UUID</span> <span className="sql-keyword">PRIMARY KEY DEFAULT</span> gen_random_uuid(),{'\n'}
    client_name <span className="sql-type">VARCHAR(100)</span> <span className="sql-keyword">NOT NULL</span>,{'\n'}
    client_email <span className="sql-type">VARCHAR(100)</span> <span className="sql-keyword">NOT NULL</span>,{'\n'}
    event_date <span className="sql-type">DATE</span> <span className="sql-keyword">NOT NULL</span>,{'\n'}
    event_type <span className="sql-type">VARCHAR(50)</span> <span className="sql-keyword">NOT NULL</span>,{'\n'}
    guest_count <span className="sql-type">INTEGER</span> <span className="sql-keyword">NOT NULL</span>,{'\n'}
    selected_services <span className="sql-type">TEXT[]</span> <span className="sql-keyword">DEFAULT</span> '{}'::TEXT[] <span className="sql-keyword">NOT NULL</span>,{'\n'}
    total_price <span className="sql-type">NUMERIC(12, 2)</span> <span className="sql-keyword">NOT NULL</span>,{'\n'}
    created_at <span className="sql-type">TIMESTAMP WITH TIME ZONE</span> <span className="sql-keyword">DEFAULT</span> now(){'\n'});{'\n'}{'\n'}
<span className="sql-comment">-- 3. Create inquiries feedback logs</span>{'\n'}
<span className="sql-keyword">CREATE TABLE</span> inquiries ({'\n'}
    id <span className="sql-type">UUID</span> <span className="sql-keyword">PRIMARY KEY DEFAULT</span> gen_random_uuid(),{'\n'}
    rep_name <span className="sql-type">VARCHAR(100)</span> <span className="sql-keyword">NOT NULL</span>,{'\n'}
    email <span className="sql-type">VARCHAR(100)</span> <span className="sql-keyword">NOT NULL</span>,{'\n'}
    specs_notes <span className="sql-type">TEXT</span> <span className="sql-keyword">NOT NULL</span>,{'\n'}
    created_at <span className="sql-type">TIMESTAMP WITH TIME ZONE</span> <span className="sql-keyword">DEFAULT</span> now(){'\n'});{'\n'}{'\n'}
<span className="sql-comment">-- 4. Enable Row Level Security (RLS) policies</span>{'\n'}
<span className="sql-keyword">ALTER TABLE</span> bookings <span className="sql-keyword">ENABLE ROW LEVEL SECURITY</span>;{'\n'}
<span className="sql-keyword">CREATE POLICY</span> "Allow public access" <span className="sql-keyword">ON</span> bookings <span className="sql-keyword">FOR ALL USING</span> (true);
                </code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* CREATE BOOKING RESERVATION OVERLAY */}
      {showBookingModal && (
        <div className="modal-overlay" onClick={closeBookingModal}>
          <div 
            className="modal-content glass-panel" 
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={closeBookingModal}>✕</button>
            
            {bookingSuccess ? (
              <div className="success-state">
                <div className="success-icon-box">✓</div>
                <h3 className="success-title">Relational Row Inserted!</h3>
                <p className="success-desc">
                  Your customized configuration has been written to the PostgreSQL table. View the transaction live on the DBMS visualizer log below!
                </p>
                
                {recentBookingResult && (
                  <div className="success-details">
                    <div className="success-details-row">
                      <span className="success-details-lbl">Primary key UUID:</span>
                      <span className="success-details-val" style={{fontSize: '0.65rem', fontFamily: 'monospace', color: 'var(--accent-text)'}}>{recentBookingResult.id}</span>
                    </div>
                    <div className="success-details-row">
                      <span className="success-details-lbl">Client Details:</span>
                      <span className="success-details-val">{recentBookingResult.client_name} ({recentBookingResult.client_email})</span>
                    </div>
                    <div className="success-details-row">
                      <span className="success-details-lbl">Scheduled Date:</span>
                      <span className="success-details-val">{recentBookingResult.event_date}</span>
                    </div>
                    <div className="success-details-row">
                      <span className="success-details-lbl">Event Multiplier:</span>
                      <span className="success-details-val">{recentBookingResult.event_type} (x{EVENTS_DATA[recentBookingResult.event_type]?.multiplier})</span>
                    </div>
                    <div className="success-details-row">
                      <span className="success-details-lbl">Attendance:</span>
                      <span className="success-details-val">{recentBookingResult.guest_count} Guests</span>
                    </div>
                    <div className="success-details-row">
                      <span className="success-details-lbl">Committed Price:</span>
                      <span className="success-details-val" style={{color: 'var(--accent-primary)', fontSize: '1rem'}}>{formatDirectINR(recentBookingResult.total_price)}</span>
                    </div>
                  </div>
                )}

                <button 
                  onClick={closeBookingModal} 
                  className="btn btn-primary"
                  style={{width: '100%', justifyContent: 'center'}}
                >
                  Return to Console
                </button>
              </div>
            ) : (
              <div>
                <div className="modal-header">
                  <h3>Submit Transaction to Database</h3>
                  <p>Check out your custom layout specs and click submit to commit to bookings table.</p>
                </div>

                <form onSubmit={handleBookingSubmit} id="booking-simulation-form">
                  <div className="form-group">
                    <label htmlFor="modal-client-name">Customer Representative Name</label>
                    <input
                      type="text"
                      className="form-input"
                      id="modal-client-name"
                      placeholder="e.g. Professor Smith"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="modal-client-email">E-mail Address</label>
                    <input
                      type="email"
                      className="form-input"
                      id="modal-client-email"
                      placeholder="evaluator@university.edu"
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="modal-event-date">Desired Event Target Date</label>
                    <input
                      type="date"
                      className="form-input"
                      id="modal-event-date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      required
                    />
                  </div>

                  {/* Summary Checklist Brief in modal */}
                  <div style={{background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', marginBottom: '1.5rem', fontSize: '0.8rem'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem'}}>
                      <span style={{color: 'var(--text-secondary)'}}>PostgreSQL Event Type:</span>
                      <span style={{fontWeight: 600}}>{EVENTS_DATA[selectedEventType]?.title}</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem'}}>
                      <span style={{color: 'var(--text-secondary)'}}>Committed Modules:</span>
                      <span style={{fontWeight: 600}}>{selectedServices.length} Selected</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.4rem', marginTop: '0.4rem'}}>
                      <span style={{color: '#ffffff', fontWeight: 700}}>Calculated Pricing:</span>
                      <span style={{color: 'var(--accent-text)', fontWeight: 800}}>{formatINR(totalCostDetails.total)}</span>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary btn-glow" 
                    style={{width: '100%', justifyContent: 'center'}}
                  >
                    Commit Row to Bookings Table
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* UPDATE (U) BOOKING RESERVATION OVERLAY */}
      {showEditModal && (
        <div className="edit-modal-overlay" onClick={() => setShowEditModal(false)}>
          <div 
            className="edit-modal-content glass-panel" 
            onClick={(e) => e.stopPropagation()}
            style={{borderColor: '#3b82f6'}}
          >
            <button className="modal-close-btn" onClick={() => setShowEditModal(false)}>✕</button>
            <div className="modal-header">
              <h3 style={{color: '#3b82f6'}}>Update Database Transaction</h3>
              <p>Perform an <code>UPDATE</code> transaction on bookings row primary key: <span style={{fontFamily: 'monospace', fontSize: '0.7rem', color: 'var(--accent-text)'}}>{editId}</span></p>
            </div>

            <form onSubmit={handleEditSubmit} id="edit-booking-form">
              <div className="grid" style={{gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem'}}>
                <div className="form-group" style={{margin: 0}}>
                  <label htmlFor="edit-client-name">Rep Name</label>
                  <input
                    type="text"
                    className="form-input"
                    id="edit-client-name"
                    value={editClientName}
                    onChange={(e) => setEditClientName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group" style={{margin: 0}}>
                  <label htmlFor="edit-client-email">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    id="edit-client-email"
                    value={editClientEmail}
                    onChange={(e) => setEditClientEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid" style={{gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem'}}>
                <div className="form-group" style={{margin: 0}}>
                  <label htmlFor="edit-event-date">Target Date</label>
                  <input
                    type="date"
                    className="form-input"
                    id="edit-event-date"
                    value={editEventDate}
                    onChange={(e) => setEditEventDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group" style={{margin: 0}}>
                  <label htmlFor="edit-event-type">Event Category</label>
                  <select 
                    className="form-input"
                    id="edit-event-type"
                    value={editEventType}
                    onChange={(e) => setEditEventType(e.target.value)}
                    style={{background: 'var(--bg-card)'}}
                  >
                    {Object.entries(EVENTS_DATA).map(([key, val]) => (
                      <option key={key} value={key} style={{background: 'var(--bg-deep)'}}>
                        {val.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="edit-guest-slider">
                  Attendance Limit
                  <span className="val" style={{color: '#3b82f6', float: 'right'}}>{editGuestCount} Guests</span>
                </label>
                <div className="range-slider-container">
                  <input
                    type="range"
                    id="edit-guest-slider"
                    className="range-slider"
                    min="50"
                    max="3000"
                    step="50"
                    value={editGuestCount}
                    onChange={(e) => setEditGuestCount(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Service list checks for editing modal */}
              <div className="form-group">
                <label>Update Configured Modules</label>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.4rem', maxHeight: '140px', overflowY: 'auto', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '0.5rem'}}>
                  {services.map((service) => {
                    const isChecked = editSelectedServices.includes(service.id);
                    return (
                      <label 
                        key={service.id} 
                        style={{
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.4rem', 
                          fontSize: '0.75rem', 
                          color: isChecked ? '#ffffff' : 'var(--text-secondary)',
                          cursor: 'pointer'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleEditService(service.id)}
                          style={{accentColor: '#3b82f6', width: '0.85rem', height: '0.85rem'}}
                        />
                        <span style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} title={service.title}>
                          {service.title}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div style={{background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
                <div>
                  <span style={{fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block'}}>NEW ESTIMATED PRICE</span>
                  <span style={{fontSize: '1.35rem', fontWeight: '800', color: '#ffffff'}}>{formatINR(computedEditTotal)}</span>
                </div>
                <span className="footer-college-tag" style={{borderColor: 'rgba(59, 130, 246, 0.3)', color: '#3b82f6', background: 'rgba(59, 130, 246, 0.05)'}}>
                  Recalculated
                </span>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)', color: '#ffffff'}}
              >
                Execute UPDATE Transaction
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
