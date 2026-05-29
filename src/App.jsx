import React, { useState, useEffect, useMemo } from 'react';
import './style.css';
import { supabaseClient } from './supabaseClient';

// SVG Icon Components for Services Catalog
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
  // Theme Accent States: 'purple', 'blue', 'rose', 'green'
  const [themeAccent, setThemeAccent] = useState('purple');
  
  // Theme mode: 'dark' | 'light'
  const [themeMode, setThemeMode] = useState(localStorage.getItem('auraevents_theme_mode') || 'dark');
  
  // Mobile responsiveness
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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

  // User authentication state (simulated)
  const [userSession, setUserSession] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register', 'otp', 'forgot'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authOtp, setAuthOtp] = useState(['', '', '', '']);

  // Interactive Calculator Inputs
  const [selectedEventType, setSelectedEventType] = useState('concerts');
  const [guestCount, setGuestCount] = useState(350);
  const [selectedServices, setSelectedServices] = useState(['infra', 'speakers', 'projectors']);
  
  // Search and Filter States for 18 Services Card list
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Showcase Tab State
  const [activeShowcaseTab, setActiveShowcaseTab] = useState('concerts');
  
  // Booking Simulator Checkout steps
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState('details'); // 'details' | 'payment' | 'success'
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [recentBookingResult, setRecentBookingResult] = useState(null);
  
  // Payment states
  const [cardNum, setCardNum] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [paymentMode, setPaymentMode] = useState('card'); // 'card' | 'upi'
  const [paymentLoading, setPaymentLoading] = useState(false);
  
  // Admin Panel states
  const [isAdminView, setIsAdminView] = useState(false);
  const [dbSqlLogs, setDbSqlLogs] = useState([]);
  
  // Admin Service CRUD modal states
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [newServiceId, setNewServiceId] = useState('');
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('Infrastructure');
  const [newServiceBasePrice, setNewServiceBasePrice] = useState(100);
  const [newServicePricingModel, setNewServicePricingModel] = useState('flat');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  
  // AI powered features
  const [aiDescription, setAiDescription] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  
  // Chatbot floating assistant states
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatbotMessages, setChatbotMessages] = useState([
    { id: 1, text: "Hello! I am AuraBot 🤖, your smart SaaS DBMS Assistant. Ask me anything about our services catalog, bookings database table, or SQL structure!", sender: "bot" }
  ]);
  
  // Live attendee count ticking up
  const [liveAttendeeCount, setLiveAttendeeCount] = useState(18427);
  
  // Carousel slide index
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Inline edit state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editId, setEditId] = useState('');
  const [editClientName, setEditClientName] = useState('');
  const [editClientEmail, setEditClientEmail] = useState('');
  const [editEventDate, setEditEventDate] = useState('');
  const [editEventType, setEditEventType] = useState('');
  const [editGuestCount, setEditGuestCount] = useState(100);
  const [editSelectedServices, setEditSelectedServices] = useState([]);
  
  // FAQ Accordion State
  const [faqOpenIndex, setFaqOpenIndex] = useState(null);
  
  // Contact Form States
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Dynamic timezone-safe today's current date limits (stops past date selections)
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const minDate = today.toISOString().split("T")[0];

  // Helper to add direct SQL console logs
  const addSqlLog = (operation, sqlText, status = 'success') => {
    const timestamp = new Date().toLocaleTimeString();
    setDbSqlLogs(prev => [
      {
        id: crypto.randomUUID(),
        timestamp,
        operation,
        sqlText,
        status
      },
      ...prev
    ]);
  };

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

    // Seed transaction logs in SQL console panel
    addSqlLog('SELECT', 'SELECT * FROM services ORDER BY is_standard DESC;', 'success');
    addSqlLog('SELECT', 'SELECT * FROM bookings ORDER BY event_date ASC;', 'success');
  };

  useEffect(() => {
    loadDatabaseData();
    // Pre-fill credentials portal inputs
    const creds = supabaseClient.getCredentials();
    setInputDbUrl(creds.url);
    setInputDbKey(creds.key);

    // Live counter tick up simulation
    const counterTimer = setInterval(() => {
      setLiveAttendeeCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 4500);

    return () => clearInterval(counterTimer);
  }, []);

  const handleSaveCredentials = (e) => {
    e.preventDefault();
    const ok = supabaseClient.saveCredentials(inputDbUrl, inputDbKey);
    if (ok) {
      setShowCredentialsPortal(false);
      loadDatabaseData();
      addSqlLog('CONNECT', `ALTER SYSTEM CONNECT TO '${inputDbUrl}';`, 'success');
    } else {
      alert("Invalid Supabase URL format! Must be a valid URL pointing to a .supabase.co host.");
      addSqlLog('CONNECT', 'ALTER SYSTEM CONNECT (FAILED: invalid host URL)', 'error');
    }
  };

  const handleClearCredentials = () => {
    localStorage.removeItem('auraevents_supabase_url');
    localStorage.removeItem('auraevents_supabase_key');
    addSqlLog('DISCONNECT', 'ALTER SYSTEM SHUTDOWN CONNECTION;', 'warn');
    window.location.reload();
  };

  // Theme mode switch
  const handleToggleThemeMode = () => {
    const nextMode = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(nextMode);
    localStorage.setItem('auraevents_theme_mode', nextMode);
    addSqlLog('ALTER', `ALTER SESSION SET colorscheme = '${nextMode}';`, 'success');
  };

  // Theme changer helper
  const handleThemeChange = (themeName) => {
    setThemeAccent(themeName);
    addSqlLog('ALTER', `ALTER SESSION SET accent = '${themeName}';`, 'success');
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
  // DYNAMIC DATABASE METRICS & SVG PLOTTING (DBMS SaaS Dash)
  // -------------------------------------------------------------
  const dbMetrics = useMemo(() => {
    const totalEvents = bookings.length;
    const totalGuests = bookings.reduce((sum, b) => sum + (b.guest_count || 0), 0);
    const totalRevenue = bookings.reduce((sum, b) => sum + Number(b.total_price || 0), 0);
    
    // Unique client count
    const uniqueEmails = new Set(bookings.map(b => b.client_email));
    const activeClients = uniqueEmails.size;

    // Guest limits scaling for Bar Chart plotting
    const maxGuests = bookings.length > 0 ? Math.max(...bookings.map(b => b.guest_count || 0)) : 1000;
    const maxCost = bookings.length > 0 ? Math.max(...bookings.map(b => Number(b.total_price || 0))) : 100000;

    return {
      totalEvents,
      totalGuests,
      totalRevenue,
      activeClients,
      maxGuests,
      maxCost
    };
  }, [bookings]);

  // -------------------------------------------------------------
  // CRUD CONTROLLERS (Front-End Bindings)
  // -------------------------------------------------------------

  // CREATE (C) - Save New Reservation Layout in PostgreSQL
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail || !bookingDate) return;

    // Timezone-safe past date boundary check (Backend Protection verification)
    const selectedDateObj = new Date(bookingDate);
    const todayObj = new Date();
    todayObj.setHours(0, 0, 0, 0);

    if (selectedDateObj < todayObj) {
      alert("Past dates are not allowed! Real-time timezone verification has blocked this transaction.");
      addSqlLog('INSERT', `INSERT INTO bookings (client_name, event_date) VALUES ('${bookingName}', '${bookingDate}') (FAILED: constraint check_future_booking failed)`, 'error');
      return;
    }

    const payload = {
      clientName: bookingName,
      clientEmail: bookingEmail,
      eventDate: bookingDate,
      eventType: selectedEventType,
      guestCount: guestCount,
      selectedServices: selectedServices,
      totalPrice: totalCostDetails.total * EXCHANGE_RATE
    };

    setPaymentLoading(true);
    setTimeout(async () => {
      const res = await supabaseClient.insertBooking(payload);
      setPaymentLoading(false);
      if (res.success) {
        setRecentBookingResult(res.data);
        setBookingStep('success');
        setBookingSuccess(true);
        addSqlLog('INSERT', `INSERT INTO bookings (id, client_name, client_email, event_date, event_type, guest_count, total_price) VALUES ('${res.data.id}', '${bookingName}', '${bookingEmail}', '${bookingDate}', '${selectedEventType}', ${guestCount}, ${payload.totalPrice});`, 'success');
        
        // Reload booking log list
        const updatedList = await supabaseClient.fetchBookings();
        setBookings(updatedList);
      } else {
        alert("Failed to insert database row. Check Supabase connection.");
        addSqlLog('INSERT', `INSERT INTO bookings ... (FAILED)`, 'error');
      }
    }, 1200);
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

    // Timezone-safe past date boundary check for updates
    const selectedDateObj = new Date(editEventDate);
    const todayObj = new Date();
    todayObj.setHours(0, 0, 0, 0);

    if (selectedDateObj < todayObj) {
      alert("Past dates are not allowed! Real-time timezone verification has blocked this transaction.");
      addSqlLog('UPDATE', `UPDATE bookings SET event_date = '${editEventDate}' WHERE id = '${editId}' (FAILED: check_future_booking constraint)`, 'error');
      return;
    }

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
      addSqlLog('UPDATE', `UPDATE bookings SET client_name = '${editClientName}', event_date = '${editEventDate}', guest_count = ${editGuestCount}, total_price = ${payload.totalPrice} WHERE id = '${editId}';`, 'success');
      // Reload lists
      const updatedList = await supabaseClient.fetchBookings();
      setBookings(updatedList);
    } else {
      alert("Database failed to update record.");
      addSqlLog('UPDATE', `UPDATE bookings WHERE id = '${editId}' (FAILED)`, 'error');
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
      addSqlLog('DELETE', `DELETE FROM bookings WHERE id = '${id}';`, 'warn');
      // Reload logs
      const updatedList = await supabaseClient.fetchBookings();
      setBookings(updatedList);
    } else {
      alert("Failed to delete row from database.");
      addSqlLog('DELETE', `DELETE FROM bookings WHERE id = '${id}' (FAILED)`, 'error');
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
      addSqlLog('INSERT', `INSERT INTO inquiries (id, rep_name, email, specs_notes) VALUES (gen_random_uuid(), '${contactName}', '${contactEmail}', 'Message text...');`, 'success');
      setTimeout(() => {
        setContactName('');
        setContactEmail('');
        setContactMessage('');
        setContactSuccess(false);
      }, 4000);
    } else {
      alert("Inquiry logging failed.");
      addSqlLog('INSERT', 'INSERT INTO inquiries (FAILED)', 'error');
    }
  };

  // Admin Catalog CRUD - ADD SERVICE
  const handleAddService = async (e) => {
    e.preventDefault();
    if (!newServiceId || !newServiceTitle || !newServiceDesc) return;
    
    const payload = {
      id: newServiceId,
      title: newServiceTitle,
      category: newServiceCategory,
      basePrice: Number(newServiceBasePrice),
      pricingModel: newServicePricingModel,
      description: newServiceDesc,
      iconKey: 'Infrastructure',
      isStandard: false
    };

    // Sync locally
    const savedServices = services;
    const isExist = savedServices.find(s => s.id === newServiceId);
    if (isExist) {
      alert("A service with this ID already exists!");
      return;
    }

    const updated = [...savedServices, payload];
    localStorage.setItem('auraevents_services', JSON.stringify(updated));
    setServices(updated);
    setShowAddServiceModal(false);
    
    // Clear fields
    setNewServiceId('');
    setNewServiceTitle('');
    setNewServiceBasePrice(100);
    setNewServiceDesc('');
    
    addSqlLog('INSERT', `INSERT INTO services (id, title, category, base_price, pricing_model) VALUES ('${payload.id}', '${payload.title}', '${payload.category}', ${payload.basePrice}, '${payload.pricingModel}');`, 'success');
  };

  // Admin Catalog CRUD - DELETE SERVICE
  const handleDeleteService = (id) => {
    const ok = window.confirm(`DBMS Catalog Alert:\nAre you sure you want to annul and delete the service "${id}" from the services table catalog?`);
    if (!ok) return;

    const filtered = services.filter(s => s.id !== id);
    localStorage.setItem('auraevents_services', JSON.stringify(filtered));
    setServices(filtered);
    addSqlLog('DELETE', `DELETE FROM services WHERE id = '${id}';`, 'warn');
  };

  // AI Promotional Text Generator
  const handleGenerateAiPromo = () => {
    setAiGenerating(true);
    setAiDescription('');
    const servicesNames = selectedServices.map(id => services.find(s => s.id === id)?.title).filter(Boolean).join(', ');
    const text = `Prepare for an extraordinary ${EVENTS_DATA[selectedEventType]?.title || selectedEventType} hosting up to ${guestCount} attendees. This state-of-the-art event plan is powered by Supabase and locked at an estimate of ${formatINR(totalCostDetails.total)}, fully amplified with ${selectedServices.length} infrastructure layers including: ${servicesNames || 'Core Setup'}. All reservations are secured with live PostgreSQL database constraints.`;
    
    // Simulate typing animation
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setAiDescription(prev => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setAiGenerating(false);
      }
    }, 10);
  };

  // Chatbot floating assistant messenger
  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = { id: Date.now(), text: chatInput, sender: 'user' };
    setChatbotMessages(prev => [...prev, userMsg]);
    setChatInput('');
    
    setTimeout(() => {
      const text = chatInput.toLowerCase();
      let reply = "I am here to help! Ask me about Supabase DB configurations, catalog services, SQL constraints, or bookings.";
      if (text.includes('supabase') || text.includes('database') || text.includes('db')) {
        reply = `Supabase PostgreSQL is our primary relational database. You can paste your custom Project URL and API Key in the setup banner above. All CRUD bookings and inquiries sync actively in real-time, backed up by localStorage sandbox logic!`;
      } else if (text.includes('services') || text.includes('catalog') || text.includes('infra')) {
        reply = `AuraEvents features 18 modular capability layers including Venue Tents, Sound Stage Arrays, Projection Lenses, and Drones. Standard items are flat rate, while custom catering, cleanup, and ticketing scale per guest dynamically!`;
      } else if (text.includes('sql') || text.includes('constraint') || text.includes('ddl') || text.includes('date')) {
        reply = `Our SQL schema defines a 'check_future_booking' CHECK constraint: 'CONSTRAINT check_future_booking CHECK (event_date >= CURRENT_DATE)'. This ensures past dates are rejected at the DBMS transaction level!`;
      } else if (text.includes('price') || text.includes('rupee') || text.includes('inr')) {
        reply = `All prices are dynamically converted from US Dollars to Indian Rupees (₹) using a standard 1 USD = 83 INR conversion rate, formatted in standard Indian en-IN Lakhs numbering system!`;
      } else if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
        reply = `Hello! How can I assist you with your college database project or AuraEvents SaaS setup today?`;
      }
      
      setChatbotMessages(prev => [...prev, { id: Date.now() + 1, text: reply, sender: 'bot' }]);
    }, 400);
  };

  // Reset calculator states when closing booking successful window
  const closeBookingModal = () => {
    setShowBookingModal(false);
    setBookingSuccess(false);
    setBookingName('');
    setBookingEmail('');
    setBookingDate('');
    setCardNum('');
    setCardExp('');
    setCardCvv('');
    setCardName('');
    setBookingStep('details');
    setRecentBookingResult(null);
  };

  // Copy SQL script tool helper
  const handleCopySql = () => {
    const code = document.getElementById('postgres-ddl-code').innerText;
    navigator.clipboard.writeText(code);
    setSqlCopied(true);
    setTimeout(() => setSqlCopied(false), 2000);
  };

  // -------------------------------------------------------------
  // SIMULATED AUTH SYSTEM CONTROLLERS
  // -------------------------------------------------------------
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      if (!authEmail || !authPassword) return;
      // Advance to OTP simulator
      setAuthMode('otp');
    } else if (authMode === 'register') {
      if (!authEmail || !authPassword || !authName) return;
      setAuthMode('otp');
    } else {
      // Complete OTP Verification
      setUserSession({
        email: authEmail || 'evaluator@university.edu',
        name: authName || 'Dr. Roberts'
      });
      setShowAuthModal(false);
      // Reset modes
      setAuthMode('login');
      setAuthEmail('');
      setAuthPassword('');
      setAuthName('');
      setAuthOtp(['', '', '', '']);
    }
  };

  const handleOtpChange = (index, val) => {
    if (isNaN(val)) return;
    const newOtp = [...authOtp];
    newOtp[index] = val.substring(val.length - 1);
    setAuthOtp(newOtp);
    // Shift focus automatically
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-char-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

   // Scroll detector for sticky navbar
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setNavbarScrolled(true);
      } else {
        setNavbarScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`theme-${themeAccent} theme-mode-${themeMode}`}>
      {/* Background ambient radial glow layers */}
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
      <header className={`navbar ${navbarScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="#" className="logo" id="auraevents-logo">
            <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            AuraEvents
          </a>
          
          <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <a href="#" className="nav-link active" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#calculator" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Calculator</a>
            <a href="#services" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Services
              <span className="nav-badge">{services.length}</span>
            </a>
            <a href="#db-console" className="nav-link" style={{color: 'var(--accent-text)', fontWeight: '700'}} onClick={() => setMobileMenuOpen(false)}>
              DBMS Dashboard
            </a>
            <a href="#showcase" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Showcases</a>
            <a href="#faq" className="nav-link" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          </nav>

          <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
            {/* SUN/MOON THEME MODE TOGGLE BUTTON */}
            <button 
              onClick={handleToggleThemeMode} 
              className="theme-mode-toggle-btn"
              title={themeMode === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle dark/light theme mode"
            >
              {themeMode === 'dark' ? '☀️' : '🌙'}
            </button>

            <button 
              onClick={() => setShowSqlModal(true)} 
              className="btn btn-secondary"
              style={{padding: '0.6rem 1.2rem', fontSize: '0.85rem'}}
            >
              Get SQL
            </button>
            
            {userSession ? (
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <span className="db-stats-pill" style={{background: 'var(--accent-subtle)', borderColor: 'var(--accent-primary)', fontSize: '0.8rem', padding: '0.5rem 0.9rem'}}>
                  👨‍💻 {userSession.name}
                </span>
                <button 
                  onClick={handleSignOut} 
                  className="btn btn-accent" 
                  style={{padding: '0.5rem 1rem', fontSize: '0.8rem', color: '#f43f5e', border: '1px solid rgba(244,63,94,0.1)'}}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { setAuthMode('login'); setShowAuthModal(true); }} 
                className="btn btn-primary btn-glow"
                style={{padding: '0.6rem 1.35rem', fontSize: '0.85rem'}}
              >
                Sign In
              </button>
            )}

            {/* Mobile Hamburger menu toggle */}
            <button 
              className={`hamburger-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile navigation menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
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
      <section className="hero-section" style={{paddingTop: '4rem', paddingBottom: '3.5rem'}}>
        <div className="container">
          <div className="hero-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px'}}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Interactive DBMS Grading Project
          </div>
          <h1 className="hero-heading" style={{fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', fontWeight: '800'}}>
            Plan <span style={{ background: 'linear-gradient(to right, #EC4899, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Extraordinary Events</span> With Ease
          </h1>
          <p className="hero-subheading">
            A premium startup-level event coordination software built to publish plans dynamically to PostgreSQL tables, track transaction analytics live, and generate scanned entry tickets.
          </p>
          <div className="hero-ctas">
            <a href="#services" className="btn btn-primary btn-glow">Explore Events</a>
            <button onClick={() => { setAuthMode('login'); setShowAuthModal(true); }} className="btn btn-secondary">Book Demo</button>
          </div>

          {/* SaaS Branding Floating Metrics */}
          <div className="stats-bar glass-panel" style={{marginTop: '3.5rem'}}>
            <div className="stat-item">
              <div className="stat-value">500+</div>
              <div className="stat-label">Events Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">20K+</div>
              <div className="stat-label">Attendees Managed</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">99%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-value" style={{fontSize: '1.8rem', lineHeight: '2.5rem'}}>₹ en-IN</div>
              <div className="stat-label">Rupee Localization</div>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC SCROLLING SPONSOR LOGO MARQUEE */}
      <section className="sponsor-marquee-section">
        <div className="marquee-container">
          <div className="marquee-content">
            <div className="sponsor-logo">💼 Microsoft Events</div>
            <div className="sponsor-logo">🎵 Spotify Live</div>
            <div className="sponsor-logo">🥤 Pepsi Fest</div>
            <div className="sponsor-logo">⚡ Redbull Arena</div>
            <div className="sponsor-logo">🎮 TwitchCon</div>
            <div className="sponsor-logo">🎨 Google I/O</div>
            {/* Duplicate for infinite loop */}
            <div className="sponsor-logo">💼 Microsoft Events</div>
            <div className="sponsor-logo">🎵 Spotify Live</div>
            <div className="sponsor-logo">🥤 Pepsi Fest</div>
            <div className="sponsor-logo">⚡ Redbull Arena</div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US MARKETING SECTION */}
      <section className="container" style={{padding: '5rem 0 2rem'}}>
        <div className="section-header">
          <span className="section-tag">Key Features</span>
          <h2 className="section-title">Why Plan With AuraEvents?</h2>
          <p className="section-desc">Experience premium technical production coupled with rock-solid database integrity.</p>
        </div>
        <div className="why-choose-grid">
          <div className="why-card glass-panel">
            <div className="why-icon-box">⛺</div>
            <h3 className="why-title">Weatherproof Tents</h3>
            <p className="why-desc">German pagoda canopy designs tailored for massive college grounds and weddings.</p>
          </div>
          <div className="why-card glass-panel">
            <div className="why-icon-box">🔊</div>
            <h3 className="why-title">80K Watt Audio</h3>
            <p className="why-desc">High-Decibel sound array installations playing crystal clear concert music.</p>
          </div>
          <div className="why-card glass-panel">
            <div className="why-icon-box">🎫</div>
            <h3 className="why-title">Digital Entry Gates</h3>
            <p className="why-desc">Instant check-in and attendee scan logs backing up database indexing.</p>
          </div>
          <div className="why-card glass-panel">
            <div className="why-icon-box">📈</div>
            <h3 className="why-title">Live DBMS Sync</h3>
            <p className="why-desc">Real-time analytical metrics illustrating budgets and slots directly in PostgreSQL.</p>
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS GALLERY TRACK */}
      <section className="upcoming-carousel-section container">
        <div className="section-header">
          <span className="section-tag">Featured Success Stories</span>
          <h2 className="section-title">Upcoming Mega Events</h2>
          <p className="section-desc">Explore the live plans currently active in our scheduling registry.</p>
        </div>
        <div className="carousel-viewport">
          <div className="carousel-track" style={{transform: `translateX(-${carouselIndex * 336}px)`}}>
            <div className="carousel-card" style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.85)), url(https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=500&q=80)'}}>
              <div className="carousel-card-content">
                <div>
                  <span className="carousel-card-date">15 Jun 2026</span>
                  <h3 className="carousel-card-title">Rock Fest Concert</h3>
                  <p className="carousel-card-desc">Stadium audio array arrays and special pyrotechnics.</p>
                </div>
                <div className="carousel-card-footer">
                  <span className="carousel-card-price">₹3,45,000</span>
                  <a href="#calculator" className="btn btn-primary" style={{padding: '0.4rem 0.85rem', fontSize: '0.75rem'}}>Check Specs</a>
                </div>
              </div>
            </div>

            <div className="carousel-card" style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.85)), url(https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80)'}}>
              <div className="carousel-card-content">
                <div>
                  <span className="carousel-card-date">22 Aug 2026</span>
                  <h3 className="carousel-card-title">Bespoke Palace Wedding</h3>
                  <p className="carousel-card-desc">Royal decoration backdrops, catering menus, and valets.</p>
                </div>
                <div className="carousel-card-footer">
                  <span className="carousel-card-price">₹12,80,000</span>
                  <a href="#calculator" className="btn btn-primary" style={{padding: '0.4rem 0.85rem', fontSize: '0.75rem'}}>Check Specs</a>
                </div>
              </div>
            </div>

            <div className="carousel-card" style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.85)), url(https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=500&q=80)'}}>
              <div className="carousel-card-content">
                <div>
                  <span className="carousel-card-date">09 Sep 2026</span>
                  <h3 className="carousel-card-title">National Arena Cup</h3>
                  <p className="carousel-card-desc">Sky drone video live stream feeds and crowd control crews.</p>
                </div>
                <div className="carousel-card-footer">
                  <span className="carousel-card-price">₹5,40,000</span>
                  <a href="#calculator" className="btn btn-primary" style={{padding: '0.4rem 0.85rem', fontSize: '0.75rem'}}>Check Specs</a>
                </div>
              </div>
            </div>

            <div className="carousel-card" style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.85)), url(https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=500&q=80)'}}>
              <div className="carousel-card-content">
                <div>
                  <span className="carousel-card-date">14 Oct 2026</span>
                  <h3 className="carousel-card-title">Tech Keynote Gala</h3>
                  <p className="carousel-card-desc">High-definition projectors, formal emcees, and gigabit WiFi.</p>
                </div>
                <div className="carousel-card-footer">
                  <span className="carousel-card-price">₹2,80,000</span>
                  <a href="#calculator" className="btn btn-primary" style={{padding: '0.4rem 0.85rem', fontSize: '0.75rem'}}>Check Specs</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-dots">
          {[0, 1].map(i => (
            <button 
              key={i} 
              className={`carousel-dot ${carouselIndex === i ? 'active' : ''}`}
              onClick={() => setCarouselIndex(i)}
              aria-label={`Slide group ${i+1}`}
            ></button>
          ))}
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
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto', paddingRight: '0.5rem', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '0.75rem'}}>
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

              {/* AI SMART CAPABILITIES RECOMMENDATIONS WIDGET */}
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(124, 58, 237, 0.04)', border: '1px dashed var(--accent-primary)', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-text)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>💡</span> AI Setup Recommender
                </h4>
                {selectedServices.includes('stage') && !selectedServices.includes('lights') ? (
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                    <strong>Recommendations Alert:</strong> Since you configured <strong>Custom Stage Design</strong>, we highly recommend adding <strong>Stage Lights & Lasers</strong> to elevate the stage atmosphere!
                  </p>
                ) : selectedServices.includes('speakers') && !selectedServices.includes('stage') ? (
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                    <strong>Recommendations Alert:</strong> Since you configured <strong>Stage Speakers & Sound</strong>, consider adding <strong>Custom Stage Design</strong> to secure a beautiful platform base for your arrays!
                  </p>
                ) : (
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Your active capabilities checklist looks beautifully harmonized for this event model. Ready to lock plans!
                  </p>
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

              {/* AI GENERATED EVENT DESCRIPTION BOX */}
              {aiDescription && (
                <div style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.2rem' }}>🤖 AI Promotional Pitch</strong>
                  {aiDescription}
                </div>
              )}

              {/* Total Calculation Display */}
              <div>
                <div className="summary-cost-block">
                  <div className="summary-cost-label">Calculated Estimate</div>
                  <div className="summary-cost-total">{formatINR(totalCostDetails.total)}</div>
                  <div className="summary-cost-sub">
                    Includes {guestCount} guests & {selectedServices.length} database specifications
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <button 
                    onClick={handleGenerateAiPromo} 
                    className="btn btn-accent" 
                    style={{ flexGrow: 1, padding: '0.6rem 0.85rem', fontSize: '0.75rem', justifyContent: 'center' }}
                    disabled={aiGenerating}
                  >
                    {aiGenerating ? 'Writing Pitch...' : '✨ AI Event Pitch'}
                  </button>
                </div>

                <button 
                  onClick={() => { setBookingStep('details'); setShowBookingModal(true); }} 
                  className="btn btn-primary btn-glow" 
                  style={{width: '100%', justifyContent: 'center'}}
                  id="checkout-book-btn"
                >
                  Save Event Plan
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
            <span className="section-tag" style={{color: 'var(--accent-text)'}}>DBMS Control Board</span>
            <h2 className="section-title">Relational Transaction Center</h2>
            <p className="section-desc">
              Audit the database, verify CHECK date constraints, manage row listings, and track live SQL operations.
            </p>
          </div>

          {/* DYNAMIC SaaS DASHBOARD METRICS */}
          <div className="analytics-dashboard-wrapper">
            <div className="analytics-grid">
              <div className="analytics-card glass-panel">
                <div className="analytics-card-header">
                  <span>Saved Plans</span>
                  <svg className="analytics-card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div className="analytics-card-val">{dbMetrics.totalEvents}</div>
                <div className="analytics-card-trend">Active Row Count</div>
              </div>

              <div className="analytics-card glass-panel">
                <div className="analytics-card-header">
                  <span>Tickets Sold</span>
                  <svg className="analytics-card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="analytics-card-val">{(dbMetrics.totalGuests + liveAttendeeCount).toLocaleString()}</div>
                <div className="analytics-card-trend">Live Sum of guest_count</div>
              </div>

              <div className="analytics-card glass-panel">
                <div className="analytics-card-header">
                  <span>Projected Revenue</span>
                  <span style={{fontSize: '0.95rem', color: 'var(--accent-primary)', fontWeight: '800'}}>₹</span>
                </div>
                <div className="analytics-card-val" style={{fontSize: '1.5rem', lineHeight: '2.2rem'}}>
                  {formatDirectINR(dbMetrics.totalRevenue)}
                </div>
                <div className="analytics-card-trend">Sum of total_price</div>
              </div>

              <div className="analytics-card glass-panel">
                <div className="analytics-card-header">
                  <span>Unique Clients</span>
                  <svg className="analytics-card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="4"/>
                    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/>
                  </svg>
                </div>
                <div className="analytics-card-val">{dbMetrics.activeClients}</div>
                <div className="analytics-card-trend">Distinct client_email</div>
              </div>
            </div>

            {/* DYNAMIC SVG CHART GRAPHICS */}
            {bookings.length > 0 && (
              <div className="charts-container">
                {/* SVG Bar Chart: Guest Distribution */}
                <div className="chart-card glass-panel">
                  <h3>
                    <span style={{color: 'var(--accent-text)'}}>📊</span>
                    Guest Distribution per Event
                  </h3>
                  <div className="chart-svg-wrapper flex-center" style={{padding: '1rem'}}>
                    <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
                      {/* Grid lines */}
                      <line x1="30" y1="20" x2="390" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                      <line x1="30" y1="90" x2="390" y2="90" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                      <line x1="30" y1="160" x2="390" y2="160" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                      
                      {bookings.slice(0, 7).map((b, i) => {
                        const barWidth = 30;
                        const spacing = 45;
                        const x = 50 + i * spacing;
                        const scaleFactor = b.guest_count / dbMetrics.maxGuests;
                        const barHeight = Math.max(10, scaleFactor * 140);
                        const y = 160 - barHeight;
                        
                        return (
                          <g key={b.id}>
                            {/* Bar card rect */}
                            <rect
                              x={x}
                              y={y}
                              width={barWidth}
                              height={barHeight}
                              rx="4"
                              fill="url(#barGradient)"
                              style={{transition: 'var(--transition-smooth)'}}
                            />
                            {/* Value text above bar */}
                            <text
                              x={x + barWidth / 2}
                              y={y - 5}
                              fill="var(--text-secondary)"
                              fontSize="8"
                              textAnchor="middle"
                            >
                              {b.guest_count}
                            </text>
                            {/* Label under bar */}
                            <text
                              x={x + barWidth / 2}
                              y="175"
                              fill="var(--text-muted)"
                              fontSize="7"
                              textAnchor="middle"
                            >
                              {b.client_name.split(' ')[0]}
                            </text>
                          </g>
                        );
                      })}
                      {/* Definitions for visual gradients */}
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--accent-primary)"/>
                          <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0.2"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                {/* SVG Line Chart: Budget Distribution Curve */}
                <div className="chart-card glass-panel">
                  <h3>
                    <span style={{color: 'var(--accent-text)'}}>📈</span>
                    Cost Distribution Trend Curve
                  </h3>
                  <div className="chart-svg-wrapper flex-center" style={{padding: '1rem'}}>
                    <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
                      {/* Grid lines */}
                      <line x1="30" y1="20" x2="390" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                      <line x1="30" y1="90" x2="390" y2="90" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                      <line x1="30" y1="160" x2="390" y2="160" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>

                      {(() => {
                        const activeList = bookings.slice(0, 7);
                        const points = activeList.map((b, i) => {
                          const spacing = 50;
                          const x = 50 + i * spacing;
                          const scale = Number(b.total_price) / dbMetrics.maxCost;
                          const y = 160 - Math.max(10, scale * 130);
                          return { x, y, b };
                        });

                        const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                        const areaPath = points.length > 0 
                          ? `${linePath} L ${points[points.length - 1].x} 160 L ${points[0].x} 160 Z`
                          : '';

                        return (
                          <g>
                            {/* Area Glow under Line */}
                            {areaPath && (
                              <path
                                d={areaPath}
                                fill="url(#lineAreaGradient)"
                                style={{transition: 'var(--transition-smooth)'}}
                              />
                            )}
                            {/* Main Stroke Line */}
                            {linePath && (
                              <path
                                d={linePath}
                                fill="none"
                                stroke="var(--accent-primary)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                style={{transition: 'var(--transition-smooth)'}}
                              />
                            )}
                            {/* Data points dots */}
                            {points.map((p, i) => (
                              <g key={i}>
                                <circle
                                  cx={p.x}
                                  cy={p.y}
                                  r="4"
                                  fill="#ffffff"
                                  stroke="var(--accent-secondary)"
                                  strokeWidth="2.5"
                                  style={{transition: 'var(--transition-smooth)'}}
                                />
                                <text
                                  x={p.x}
                                  y={p.y - 8}
                                  fill="var(--accent-text)"
                                  fontSize="7"
                                  fontWeight="bold"
                                  textAnchor="middle"
                                >
                                  ₹{(Number(p.b.total_price) / 1000).toFixed(0)}K
                                </text>
                                <text
                                  x={p.x}
                                  y="175"
                                  fill="var(--text-muted)"
                                  fontSize="7"
                                  textAnchor="middle"
                                >
                                  {p.b.client_name.split(' ')[0]}
                                </text>
                              </g>
                            ))}
                            <defs>
                              <linearGradient id="lineAreaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.25"/>
                                <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.0"/>
                              </linearGradient>
                            </defs>
                          </g>
                        );
                      })()}
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="glass-panel" style={{padding: '2.5rem'}}>
            {/* ADMIN / CLIENT TAB DRAWER TOGGLES */}
            <div className="admin-tab-bar">
              <button 
                onClick={() => setIsAdminView(false)} 
                className={`admin-tab-btn ${!isAdminView ? 'active' : ''}`}
              >
                📋 Bookings Client Registry
              </button>
              <button 
                onClick={() => setIsAdminView(true)} 
                className={`admin-tab-btn ${isAdminView ? 'active' : ''}`}
                id="admin-override-btn"
              >
                🔐 Administrative Control Center
              </button>
            </div>

            {!isAdminView ? (
              <div>
                <div className="db-controls">
                  {/* Database Search query filter */}
                  <div style={{position: 'relative', width: '100%', maxWidth: '24rem'}}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Search saved plans by name, email, type..."
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

                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <div className="db-stats-pill">
                      {filteredBookingsLogs.length} of {bookings.length} Plans Loaded
                    </div>
                    <div className="db-status-info">
                      <div className={`status-indicator ${dbConnected ? 'connected' : 'fallback'}`}></div>
                      <div className="db-status-text">{dbConnected ? 'Supabase DB Linked' : 'Local Sandbox Mock'}</div>
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
                          <th className="db-th">Target Date</th>
                          <th className="db-th">Client Details</th>
                          <th className="db-th">Event Model</th>
                          <th className="db-th">Guests Limit</th>
                          <th className="db-th">Configured Modules</th>
                          <th className="db-th">Committed Price</th>
                          <th className="db-th" style={{textAlign: 'center'}}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBookingsLogs.map(b => (
                          <tr key={b.id} className="db-tr">
                            <td className="db-td" style={{fontFamily: 'var(--font-heading)', fontWeight: '700'}}>
                              {b.event_date}
                            </td>
                            <td className="db-td">
                              <div className="db-client-info">
                                <span className="db-client-name" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{b.client_name}</span>
                                <span className="db-client-email">{b.client_email}</span>
                              </div>
                            </td>
                            <td className="db-td">
                              <span className={`db-type-badge db-type-${b.event_type}`}>
                                {b.event_type}
                              </span>
                            </td>
                            <td className="db-td" style={{fontWeight: '600'}}>
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
                                <button 
                                  onClick={() => handleOpenEditModal(b)} 
                                  className="db-btn-icon edit" 
                                  title="Edit/Reschedule record"
                                >
                                  ✏️
                                </button>
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
              </div>
            ) : (
              // ADMIN CONTROL PANEL WITH SERVICE CRUD
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.2rem' }}>Administrative Control Console</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Direct catalog CRUD operations and raw database schema execution audits.</p>
                  </div>
                  <button onClick={() => setShowAddServiceModal(true)} className="btn btn-primary btn-glow" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                    + Add New Capability
                  </button>
                </div>

                <div className="grid" style={{ gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem' }}>
                  {/* Service catalog row listing */}
                  <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto' }}>
                    <h4 style={{ fontSize: '1rem', color: 'var(--accent-text)', marginBottom: '1rem' }}>Active Infrastructure Services Catalog</h4>
                    <table className="db-table" style={{ fontSize: '0.8rem' }}>
                      <thead>
                        <tr>
                          <th className="db-th" style={{ padding: '0.5rem' }}>ID Key</th>
                          <th className="db-th" style={{ padding: '0.5rem' }}>Title</th>
                          <th className="db-th" style={{ padding: '0.5rem' }}>Category</th>
                          <th className="db-th" style={{ padding: '0.5rem' }}>Base Price (USD)</th>
                          <th className="db-th" style={{ padding: '0.5rem' }}>Model</th>
                          <th className="db-th" style={{ padding: '0.5rem', textAlign: 'center' }}>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {services.map(s => (
                          <tr key={s.id} className="db-tr">
                            <td className="db-td" style={{ fontFamily: 'monospace', fontWeight: 'bold', padding: '0.5rem' }}>{s.id}</td>
                            <td className="db-td" style={{ padding: '0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>{s.title}</td>
                            <td className="db-td" style={{ padding: '0.5rem' }}>{s.category}</td>
                            <td className="db-td" style={{ padding: '0.5rem', fontWeight: 700 }}>${s.basePrice}</td>
                            <td className="db-td" style={{ padding: '0.5rem' }}>{s.pricingModel}</td>
                            <td className="db-td" style={{ padding: '0.5rem', textAlign: 'center' }}>
                              {s.isStandard ? (
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Core Locked</span>
                              ) : (
                                <button onClick={() => handleDeleteService(s.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f43f5e' }}>🗑️</button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Simulated direct SQL transaction logging */}
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h4 style={{ fontSize: '1rem', color: 'var(--accent-text)', marginBottom: '0.5rem' }}>PostgreSQL Auditing Console</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Watch dynamic SQL commands execute against database index tables in real-time.</p>
                    
                    <div className="db-log-console">
                      {dbSqlLogs.length === 0 ? (
                        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Audit console active. Commit a budget transaction above to seed operations!</div>
                      ) : (
                        dbSqlLogs.map(log => (
                          <div key={log.id} className={`db-log-line ${log.status}`}>
                            <span style={{ color: 'var(--text-muted)' }}>[{log.timestamp}]</span> [{log.operation.toUpperCase()}] {log.sqlText}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem'}}>
              <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>
                DBMS Notice: Event date picker is protected by a <code>check_future_booking</code> PostgreSQL CHECK constraint. Past transactions are safely rejected.
              </span>
              <button 
                onClick={() => setShowSqlModal(true)} 
                className="btn btn-secondary" 
                style={{padding: '0.5rem 1rem', fontSize: '0.8rem'}}
              >
                View SQL DDL Console
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES DYNAMIC GRID SECTION */}
      <section className="services-section" id="services">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Modular Capabilities Catalog</span>
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
              {filteredServices.map((service, i) => {
                const isSelected = selectedServices.includes(service.id);
                const showPerGuestLabel = service.pricingModel === 'per-guest';
                
                // Simulated badges & seats left counters for premium visual card experience
                const isHot = i % 4 === 0;
                const isTrending = i % 5 === 2;
                const seatsLeft = 8 + (i * 3) % 25;
                
                return (
                  <article key={service.id} className="service-card glass-panel">
                    {/* Simulated visual SaaS badges */}
                    {isHot && <span className="hot-pill">Hot Trending</span>}
                    {isTrending && <span className="hot-pill" style={{background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)', boxShadow: '0 0 10px rgba(6,182,212,0.3)'}}>Trending</span>}
                    
                    {service.isStandard && (
                      <span className="service-badge">Core Setup</span>
                    )}
                    
                    <div>
                      <div className="service-icon-box" style={{marginTop: (isHot || isTrending) ? '1rem' : '0'}}>
                        {Icons[service.iconKey] ? Icons[service.iconKey]('service-icon') : Icons.Infrastructure('service-icon')}
                      </div>
                      <h3 className="service-title">{service.title}</h3>
                      <p className="service-desc">{service.description}</p>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', padding: '0.25rem 0'}}>
                      <span className="seats-badge">Category: {service.category}</span>
                      <span className={`seats-badge ${seatsLeft < 12 ? 'low' : ''}`}>
                        {seatsLeft} Slots Left
                      </span>
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

      {/* PRICING PLANS PLANS SECTION */}
      <section className="pricing-section container" id="pricing">
        <div className="section-header">
          <span className="section-tag">Academic Subscriptions</span>
          <h2 className="section-title">Transparent Tier Plans</h2>
          <p className="section-desc">Tiered pricing configurations tailored for budgets ranging from student seminars to college fests.</p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card glass-panel">
            <div>
              <h3 className="pricing-plan-title">Seminar Basic</h3>
              <div className="pricing-plan-price">₹12,500 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ event</span></div>
              <ul className="pricing-plan-features">
                <li className="pricing-plan-feature">Up to 250 guest count limit</li>
                <li className="pricing-plan-feature">Standard stage speakers</li>
                <li className="pricing-plan-feature">HD projectors & backdrop screens</li>
                <li className="pricing-plan-feature">Local sandbox DBMS storage</li>
              </ul>
            </div>
            <a href="#calculator" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Choose Basic</a>
          </div>

          <div className="pricing-card glass-panel popular">
            <span className="pricing-card-badge">Best Choice</span>
            <div>
              <h3 className="pricing-plan-title">Cultural Fest Pro</h3>
              <div className="pricing-plan-price">₹85,000 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ event</span></div>
              <ul className="pricing-plan-features">
                <li className="pricing-plan-feature">Up to 1,500 guest count limit</li>
                <li className="pricing-plan-feature">Bespoke stage canopy design</li>
                <li className="pricing-plan-feature">Line array speakers & lights</li>
                <li className="pricing-plan-feature">AI recommended specifications</li>
                <li className="pricing-plan-feature">Supabase PostgreSQL integration</li>
              </ul>
            </div>
            <a href="#calculator" className="btn btn-primary btn-glow" style={{ width: '100%', justifyContent: 'center' }}>Choose Fest Pro</a>
          </div>

          <div className="pricing-card glass-panel">
            <div>
              <h3 className="pricing-plan-title">Mega Arena Elite</h3>
              <div className="pricing-plan-price">₹2,45,000 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ event</span></div>
              <ul className="pricing-plan-features">
                <li className="pricing-plan-feature">Unlimited attendees capacity</li>
                <li className="pricing-plan-feature">Massive stadium infrastructure</li>
                <li className="pricing-plan-feature">Sky drone live streaming views</li>
                <li className="pricing-plan-feature">Special effects and cold pyrotechnics</li>
                <li className="pricing-plan-feature">Dedicated PostgreSQL DBA support</li>
              </ul>
            </div>
            <a href="#calculator" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Choose Arena Elite</a>
          </div>
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
              <p>State-of-the-art modular infrastructure systems enabling students and managers to construct premium fests, concerts, and marriages.</p>
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

      {/* ADMIN ADD SERVICE MODAL */}
      {showAddServiceModal && (
        <div className="modal-overlay" onClick={() => setShowAddServiceModal(false)}>
          <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '30rem' }}>
            <button className="modal-close-btn" onClick={() => setShowAddServiceModal(false)}>✕</button>
            <div className="modal-header">
              <h3>Add Custom Capability Service</h3>
              <p>Insert a new row catalog specification dynamically into database listings.</p>
            </div>
            <form onSubmit={handleAddService}>
              <div className="form-group">
                <label>Service ID Key (Lowercase, unique)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. laser" 
                  value={newServiceId}
                  onChange={(e) => setNewServiceId(e.target.value.toLowerCase())}
                  required 
                />
              </div>
              <div className="form-group" style={{ marginTop: '0.75rem' }}>
                <label>Service Title Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Neon Laser Show" 
                  value={newServiceTitle}
                  onChange={(e) => setNewServiceTitle(e.target.value)}
                  required 
                />
              </div>
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.75rem' }}>
                <div className="form-group">
                  <label>Base Price ($)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={newServiceBasePrice}
                    onChange={(e) => setNewServiceBasePrice(e.target.value)}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Pricing Model</label>
                  <select 
                    className="form-input" 
                    value={newServicePricingModel}
                    onChange={(e) => setNewServicePricingModel(e.target.value)}
                    style={{ background: 'var(--bg-deep)' }}
                  >
                    <option value="flat">flat fee</option>
                    <option value="per-guest">per-guest fee</option>
                  </select>
                </div>
              </div>
              <div className="form-group" style={{ marginTop: '0.75rem' }}>
                <label>Category Group</label>
                <select 
                  className="form-input" 
                  value={newServiceCategory}
                  onChange={(e) => setNewServiceCategory(e.target.value)}
                  style={{ background: 'var(--bg-deep)' }}
                >
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="AV & Sound">AV & Sound</option>
                  <option value="Food & Talent">Food & Talent</option>
                  <option value="Logistics & Tech">Logistics & Tech</option>
                </select>
              </div>
              <div className="form-group" style={{ marginTop: '0.75rem' }}>
                <label>Description (Simple language)</label>
                <textarea 
                  className="form-input" 
                  placeholder="Brief service description..." 
                  value={newServiceDesc}
                  onChange={(e) => setNewServiceDesc(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-glow" style={{ width: '100%', justifyContent: 'center', marginTop: '1.25rem' }}>
                Publish Capability to Catalog
              </button>
            </form>
          </div>
        </div>
      )}

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
              <p>Copy-paste this schema structure into your Supabase SQL Editor to configure all services, bookings, and constraints instantly!</p>
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
<span className="sql-comment">-- 2. Create bookings table with check constraint</span>{'\n'}
<span className="sql-keyword">CREATE TABLE</span> bookings ({'\n'}
    id <span className="sql-type">UUID</span> <span className="sql-keyword">PRIMARY KEY DEFAULT</span> gen_random_uuid(),{'\n'}
    client_name <span className="sql-type">VARCHAR(100)</span> <span className="sql-keyword">NOT NULL</span>,{'\n'}
    client_email <span className="sql-type">VARCHAR(100)</span> <span className="sql-keyword">NOT NULL</span>,{'\n'}
    event_date <span className="sql-type">DATE</span> <span className="sql-keyword">NOT NULL</span>,{'\n'}
    event_type <span className="sql-type">VARCHAR(50)</span> <span className="sql-keyword">NOT NULL</span>,{'\n'}
    guest_count <span className="sql-type">INTEGER</span> <span className="sql-keyword">NOT NULL</span>,{'\n'}
    selected_services <span className="sql-type">TEXT[]</span> <span className="sql-keyword">DEFAULT</span> '{}'::TEXT[] <span className="sql-keyword">NOT NULL</span>,{'\n'}
    total_price <span className="sql-type">NUMERIC(12, 2)</span> <span className="sql-keyword">NOT NULL</span>,{'\n'}
    created_at <span className="sql-type">TIMESTAMP WITH TIME ZONE</span> <span className="sql-keyword">DEFAULT</span> now(),{'\n'}
    <span className="sql-keyword">CONSTRAINT</span> check_future_booking <span className="sql-keyword">CHECK</span> (event_date &gt;= <span className="sql-keyword">CURRENT_DATE</span>){'\n'});{'\n'}{'\n'}
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

      {/* CREATE BOOKING RESERVATION OVERLAY WITH MULTI-STEP CHECKOUT AND QR CODE TICKET */}
      {showBookingModal && (
        <div className="modal-overlay" onClick={closeBookingModal}>
          <div 
            className="modal-content glass-panel" 
            onClick={(e) => e.stopPropagation()}
            style={{maxWidth: '35rem'}}
          >
            <button className="modal-close-btn" onClick={closeBookingModal}>✕</button>
            
            {/* Multi-step indicator bar */}
            <div className="checkout-steps-bar">
              <div className={`checkout-step ${bookingStep === 'details' ? 'active' : ''} ${bookingStep !== 'details' ? 'completed' : ''}`}>
                <span className="checkout-step-number">1</span>
                <span>Details</span>
              </div>
              <div className={`checkout-step ${bookingStep === 'payment' ? 'active' : ''} ${bookingStep === 'success' ? 'completed' : ''}`}>
                <span className="checkout-step-number">2</span>
                <span>Payment</span>
              </div>
              <div className={`checkout-step ${bookingStep === 'success' ? 'completed active' : ''}`}>
                <span className="checkout-step-number">3</span>
                <span>Ticket</span>
              </div>
            </div>

            {bookingStep === 'details' && (
              <div>
                <div className="modal-header">
                  <h3>Submit Transaction to Database</h3>
                  <p>Check out your custom layout specs and let us know who is organizing this event.</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); setBookingStep('payment'); }} id="booking-simulation-form">
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

                  <div className="form-group" style={{ marginTop: '0.75rem' }}>
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

                  <div className="form-group" style={{ marginTop: '0.75rem' }}>
                    <label htmlFor="modal-event-date">Desired Event Target Date</label>
                    <input
                      type="date"
                      className="form-input"
                      id="modal-event-date"
                      value={bookingDate}
                      min={minDate} // Dynamic timezone safe frontend validation constraint
                      onChange={(e) => setBookingDate(e.target.value)}
                      required
                    />
                  </div>

                  {/* Summary Checklist Brief in modal */}
                  <div style={{background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', margin: '1.25rem 0', fontSize: '0.8rem'}}>
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
                    Proceed to Payment Checkout
                  </button>
                </form>
              </div>
            )}

            {bookingStep === 'payment' && (
              <div>
                <div className="modal-header">
                  <h3>Simulated Payment Checkout Gateway</h3>
                  <p>Choose your gateway and complete the checkout to commit the reservation to Supabase.</p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <button 
                    onClick={() => setPaymentMode('card')} 
                    className={`btn ${paymentMode === 'card' ? 'btn-primary' : 'btn-secondary'}`} 
                    style={{ flexGrow: 1, justifyContent: 'center', padding: '0.5rem' }}
                  >
                    💳 Card Gateway (Stripe)
                  </button>
                  <button 
                    onClick={() => setPaymentMode('upi')} 
                    className={`btn ${paymentMode === 'upi' ? 'btn-primary' : 'btn-secondary'}`} 
                    style={{ flexGrow: 1, justifyContent: 'center', padding: '0.5rem' }}
                  >
                    📲 UPI Scan (Razorpay)
                  </button>
                </div>

                {paymentMode === 'card' ? (
                  <form onSubmit={handleBookingSubmit}>
                    <div className="credit-card-mock">
                      <div className="credit-card-chip"></div>
                      <div className="credit-card-number">{cardNum ? cardNum.replace(/(\d{4})/g, '$1 ') : '•••• •••• •••• ••••'}</div>
                      <div className="credit-card-row">
                        <div>
                          <span>Card Holder</span>
                          <div style={{ fontWeight: 600 }}>{cardName || 'YOUR NAME'}</div>
                        </div>
                        <div>
                          <span>Expiry</span>
                          <div style={{ fontWeight: 600 }}>{cardExp || 'MM/YY'}</div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>16-Digit Card Number</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        maxLength="16"
                        placeholder="4111 2222 3333 4444" 
                        value={cardNum}
                        onChange={(e) => setCardNum(e.target.value.replace(/\D/g, ''))}
                        required 
                      />
                    </div>
                    <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.75rem' }}>
                      <div className="form-group">
                        <label>Expiration Date</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="MM/YY" 
                          maxLength="5"
                          value={cardExp}
                          onChange={(e) => setCardExp(e.target.value)}
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Security CVV</label>
                        <input 
                          type="password" 
                          className="form-input" 
                          placeholder="•••" 
                          maxLength="3"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                          required 
                        />
                      </div>
                    </div>
                    <div className="form-group" style={{ marginTop: '0.75rem', marginBottom: '1.25rem' }}>
                      <label>Cardholder Full Name</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Holder Name" 
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        required 
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-glow" 
                      style={{ width: '100%', justifyContent: 'center' }}
                      disabled={paymentLoading}
                    >
                      {paymentLoading ? 'Authorizing Gateway Transaction...' : `Confirm & Pay ${formatINR(totalCostDetails.total)}`}
                    </button>
                  </form>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <div className="upi-qr-mock">
                      <svg width="140" height="140" viewBox="0 0 100 100">
                        {/* Custom vector QR code scan path */}
                        <path d="M0,0 h100 v100 h-100 z" fill="#ffffff" />
                        <rect x="8" y="8" width="24" height="24" fill="#020617" />
                        <rect x="12" y="12" width="16" height="16" fill="#ffffff" />
                        <rect x="68" y="8" width="24" height="24" fill="#020617" />
                        <rect x="72" y="12" width="16" height="16" fill="#ffffff" />
                        <rect x="8" y="68" width="24" height="24" fill="#020617" />
                        <rect x="12" y="72" width="16" height="16" fill="#ffffff" />
                        <rect x="36" y="36" width="28" height="28" fill="#020617" />
                        <rect x="40" y="40" width="20" height="20" fill="#ffffff" />
                        <rect x="15" y="40" width="10" height="10" fill="#020617" />
                        <rect x="40" y="15" width="15" height="10" fill="#020617" />
                        <rect x="75" y="45" width="10" height="15" fill="#020617" />
                        <rect x="45" y="75" width="15" height="10" fill="#020617" />
                      </svg>
                      <div className="upi-apps">
                        <span className="upi-app-pill">GPay</span>
                        <span className="upi-app-pill">PhonePe</span>
                        <span className="upi-app-pill">Paytm</span>
                        <span className="upi-app-pill">UPI ID</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Scan this Razorpay dynamic checkout code using any UPI App to lock the pricing reservation instantly.</p>
                    <button 
                      onClick={handleBookingSubmit} 
                      className="btn btn-primary btn-glow" 
                      style={{ width: '100%', justifyContent: 'center' }}
                      disabled={paymentLoading}
                    >
                      {paymentLoading ? 'Confirming UPI Payment...' : `Confirm Scan & Authorize ${formatINR(totalCostDetails.total)}`}
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {bookingStep === 'success' && (
              <div className="success-state">
                <div className="success-icon-box" style={{marginBottom: '1rem', background: '#10b981', color: '#ffffff'}}>✓</div>
                <h3 className="success-title">Event Plan Saved & Booked!</h3>
                <p className="success-desc" style={{marginBottom: '1.5rem'}}>
                  Your payment was authorized successfully. Your customized specifications are committed as a new row in the Supabase PostgreSQL 'bookings' table.
                </p>
                
                {/* Visual Event Ticket Stub with QR Code */}
                {recentBookingResult && (
                  <div className="ticket-stub">
                    <div className="ticket-header">
                      <span style={{fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1rem', color: '#ffffff'}}>
                        🎟️ AURA ENTRY TICKET
                      </span>
                      <span className="ticket-badge" style={{ background: '#10b981', color: '#ffffff' }}>CONFIRMED</span>
                    </div>

                    <div className="ticket-grid">
                      <div style={{ textAlign: 'left' }}>
                        <div className="ticket-meta-label">System Transaction UUID (Primary key)</div>
                        <div className="ticket-meta-val" style={{fontSize: '0.65rem', fontFamily: 'monospace', color: 'var(--accent-text)'}}>{recentBookingResult.id}</div>

                        <div className="ticket-meta-label">Representative Customer</div>
                        <div className="ticket-meta-val">{recentBookingResult.client_name}</div>

                        <div className="ticket-meta-label">Event Target Date & Model</div>
                        <div className="ticket-meta-val" style={{fontSize: '0.85rem'}}>
                          {recentBookingResult.event_date} | {recentBookingResult.event_type.toUpperCase()}
                        </div>

                        <div className="ticket-meta-label">Total Cost Locked (₹)</div>
                        <div className="ticket-meta-val" style={{color: 'var(--accent-primary)', fontSize: '1rem', margin: 0, fontWeight: 800}}>
                          {formatDirectINR(recentBookingResult.total_price)}
                        </div>
                      </div>

                      {/* Mock QR Code generator block */}
                      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <div className="ticket-qr-box" style={{ background: '#ffffff', padding: '0.5rem', borderRadius: '4px' }}>
                          <svg className="ticket-qr-svg" viewBox="0 0 100 100" style={{ width: '80px', height: '80px' }}>
                            {/* QR Outer border */}
                            <path d="M0,0 h100 v100 h-100 z" fill="#ffffff" />
                            {/* QR Patterns */}
                            <rect x="10" y="10" width="20" height="20" fill="#030712" />
                            <rect x="15" y="15" width="10" height="10" fill="#ffffff" />
                            
                            <rect x="70" y="10" width="20" height="20" fill="#030712" />
                            <rect x="75" y="15" width="10" height="10" fill="#ffffff" />
                            
                            <rect x="10" y="70" width="20" height="20" fill="#030712" />
                            <rect x="15" y="75" width="10" height="10" fill="#ffffff" />
                            
                            <rect x="40" y="40" width="20" height="20" fill="#030712" />
                            <rect x="45" y="45" width="10" height="10" fill="#ffffff" />
                            
                            {/* Small specs blocks */}
                            <rect x="35" y="10" width="10" height="5" fill="#030712" />
                            <rect x="55" y="15" width="5" height="15" fill="#030712" />
                            <rect x="10" y="45" width="15" height="5" fill="#030712" />
                            <rect x="45" y="70" width="10" height="10" fill="#030712" />
                            <rect x="70" y="45" width="15" height="15" fill="#030712" />
                            <rect x="80" y="75" width="10" height="5" fill="#030712" />
                          </svg>
                        </div>
                        <span style={{fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.5rem', display: 'block'}}>
                          Scan for Entrance logs
                        </span>
                      </div>

                    </div>
                  </div>
                )}

                <button 
                  onClick={closeBookingModal} 
                  className="btn btn-primary"
                  style={{width: '100%', justifyContent: 'center'}}
                >
                  Return to Dashboard
                </button>
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
                    min={minDate} // Dynamic timezone-safe date boundary constraint
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
                Save Updated Plan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SIMULATED USER SIGN IN PORTAL OVERLAY */}
      {showAuthModal && (
        <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div 
            className="modal-content glass-panel" 
            onClick={(e) => e.stopPropagation()}
            style={{maxWidth: '28rem'}}
          >
            <button className="modal-close-btn" onClick={() => setShowAuthModal(false)}>✕</button>
            
            <div className="auth-tabs">
              <button 
                className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`}
                onClick={() => setAuthMode('login')}
              >
                Sign In
              </button>
              <button 
                className={`auth-tab-btn ${authMode === 'register' ? 'active' : ''}`}
                onClick={() => setAuthMode('register')}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} id="user-authentication-form">
              {authMode === 'otp' ? (
                <div style={{textAlign: 'center'}}>
                  <span style={{fontSize: '2.5rem', display: 'block', marginBottom: '1rem'}}>🔑</span>
                  <h3>Verify OTP Code</h3>
                  <p style={{fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem'}}>
                    We've simulated sending a 4-digit security code to your email: <strong>{authEmail || 'evaluator@university.edu'}</strong>.
                  </p>
                  
                  <div className="otp-box-grid">
                    {[0, 1, 2, 3].map(i => (
                      <input
                        key={i}
                        type="text"
                        className="otp-input"
                        id={`otp-char-${i}`}
                        value={authOtp[i]}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        maxLength="1"
                        required
                      />
                    ))}
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{width: '100%', justifyContent: 'center', marginTop: '1rem'}}
                  >
                    Confirm & Unlock Admin Dashboard
                  </button>
                </div>
              ) : (
                <div>
                  {authMode === 'register' && (
                    <div className="form-group">
                      <label htmlFor="auth-name-input">Full Name</label>
                      <input
                        type="text"
                        className="form-input"
                        id="auth-name-input"
                        placeholder="e.g. Professor Smith"
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <div className="form-group" style={{marginTop: '1rem'}}>
                    <label htmlFor="auth-email-input">E-mail Address</label>
                    <input
                      type="email"
                      className="form-input"
                      id="auth-email-input"
                      placeholder="yourname@domain.com"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group" style={{marginTop: '1rem'}}>
                    <label htmlFor="auth-password-input">Password</label>
                    <input
                      type="password"
                      className="form-input"
                      id="auth-password-input"
                      placeholder="••••••••"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary btn-glow" 
                    style={{width: '100%', justifyContent: 'center', marginTop: '2rem'}}
                  >
                    {authMode === 'login' ? 'Proceed to Sign In' : 'Proceed to Sign Up'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* FLOATING INTERACTIVE AI CHATBOT WIDGET (AURABOT) */}
      <div className="chatbot-float">
        {!isChatbotOpen ? (
          <button 
            onClick={() => setIsChatbotOpen(true)} 
            className="chatbot-toggle-btn"
            title="Chat with AuraBot AI Assistant"
            aria-label="Open chatbot window"
          >
            💬
          </button>
        ) : (
          <div className="chatbot-window glass-panel">
            <div className="chatbot-header">
              <span className="chatbot-header-title">
                <span className="chatbot-header-indicator"></span>
                AuraBot AI DBMS Assistant 🤖
              </span>
              <button 
                onClick={() => setIsChatbotOpen(false)} 
                className="chatbot-close"
                title="Close chat"
              >
                ✕
              </button>
            </div>
            
            <div className="chat-messages">
              {chatbotMessages.map(msg => (
                <div key={msg.id} className={`chat-message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="chat-input-area">
              <input 
                type="text" 
                className="chat-input" 
                placeholder="Ask about Supabase, SQL, prices..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleChatSend(); }}
              />
              <button onClick={handleChatSend} className="chat-send-btn">➔</button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;
