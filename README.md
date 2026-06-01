# Event Management System

A React + Vite frontend for the Event Management System with Supabase backend integration.

## Commands

- `npm install` - install dependencies
- `npm run dev` - start local development server
- `npm run build` - build for production
- `npm run preview` - preview production build

## 4.2 FRONT END

The frontend of the Event Management System is developed using modern web technologies to provide an interactive, responsive, and user-friendly interface. It allows users to view events, register, manage bookings, and monitor payment status in real time.

### 4.2.1 FRONTEND TECHNOLOGIES USED

- HTML: page structure, forms, buttons, event cards, tables, dashboard layouts.
- CSS: responsive design, color schemes, typography, page layout, hover effects, mobile compatibility.
- JavaScript: event handling, validation, dynamic data display, API communication, booking confirmation, payment processing, and authentication.

### 4.2.2 HOME PAGE

The Home Page serves as the landing page and displays available events.

Features:
- Event cards
- Event images
- Event description
- Event date
- Event location
- Ticket price
- Register button

Sample structure:

```html
<section class="events-container">
  <div class="event-card">
    <h2>Tech Conference 2026</h2>
    <p>Date: 15 July 2026</p>
    <p>Location: Bangalore</p>
    <button>Register</button>
  </div>
</section>
```

### 4.2.3 EVENT LISTING PAGE

The Event Listing Page displays all events stored in the database.

Purpose:
- View available events
- Search events
- Filter events
- View event details

Example JavaScript:

```js
const { data, error } = await supabase
  .from('Event')
  .select('*');
```

### 4.2.4 PARTICIPANT REGISTRATION PAGE

The Registration Page allows users to create an account and register themselves.

Features:
- First name
- Last name
- Email
- Phone number
- Address

Sample form:

```html
<form id="registrationForm">
  <input type="text" placeholder="First Name">
  <input type="email" placeholder="Email">
  <input type="tel" placeholder="Phone">
  <button type="submit">Register</button>
</form>
```

When submitted, participant information is stored in the `Participant` table.

### 4.2.5 EVENT BOOKING PAGE

The Event Booking Page enables participants to reserve seats for selected events.

Functions:
- Select event
- Confirm registration
- Generate booking record
- Update event capacity

Workflow:
- Participant selects event.
- System validates availability.
- Booking record is created.
- Payment page is opened.

### 4.2.6 PAYMENT PAGE

The Payment Page handles payment transactions.

Features:
- Payment amount display
- Payment status
- Booking reference
- Transaction confirmation

Sample interface:

```html
<div class="payment-section">
  <h2>Payment Details</h2>
  <p>Total Amount: ₹1000</p>
  <button>Pay Now</button>
</div>
```

After successful payment:
- `Payment` table updated
- Booking status confirmed
- User receives confirmation

### 4.2.7 ADMIN DASHBOARD

The Admin Dashboard provides control over the Event Management System.

Functions:
- Event management: add, update, delete events
- Participant management: view and search participants
- Booking management: view bookings, update status, cancel bookings
- Payment management: view payments, track pending payments, generate reports

### 4.2.8 SUPABASE INTEGRATION

The frontend is connected to Supabase using the Supabase JavaScript client.

Example:

```js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_KEY';

const supabase = createClient(supabaseUrl, supabaseKey);
```

This connection enables:
- Data retrieval
- Data insertion
- Data updates
- Authentication
- Real-time database access

### 4.2.9 RESPONSIVE DESIGN

The frontend is designed to work across multiple devices:
- Desktop computers
- Laptops
- Tablets
- Mobile phones

Benefits:
- Better user experience
- Accessibility
- Mobile compatibility
- Improved navigation

### 4.2.10 FRONTEND WORKFLOW

The complete frontend workflow:

User → Home Page → View Events → Register/Login → Book Event → Make Payment → Booking Confirmation → Database Updated (Supabase)

Advantages:
- User-friendly interface
- Fast event registration
- Real-time database updates
- Secure backend communication
- Responsive layout
- Easy navigation

## Screenshots

Add screenshots of the website pages here:
- Home Page
- Event Listing Page
- Registration Page
- Booking Page
- Payment Page
- Admin Dashboard
