import { useState } from 'react';

const templates = [
  {
    id: 'campus-fest',
    title: 'Campus Fest',
    subtitle: 'Music, food trucks, open mic and crowd energy.',
    guests: 220,
    pace: '1-day event',
    tone: 'Casual, creative, student-run',
    tasks: ['Approve stage layout', 'Book audio crew', 'Share promo posters', 'Coordinate food stalls'],
  },
  {
    id: 'club-gala',
    title: 'Club Gala',
    subtitle: 'Award night with performances, speakers, and dinner.',
    guests: 140,
    pace: 'Evening program',
    tone: 'Semi-formal, polished, memorable',
    tasks: ['Finalize seating', 'Prepare agenda', 'Confirm catering', 'Print programs'],
  },
  {
    id: 'study-workshop',
    title: 'Study Workshop',
    subtitle: 'Interactive labs, breakout rooms, and speaker sessions.',
    guests: 70,
    pace: 'Half-day workshop',
    tone: 'Focused, collaborative, practical',
    tasks: ['Reserve classroom', 'Print handouts', 'Set up screens', 'Gather volunteer guides'],
  },
];

const featureCards = [
  {
    title: 'Live planner preview',
    description: 'See how a selected event comes together with guest count and budget at a glance.',
  },
  {
    title: 'Template switching',
    description: 'Swap between festival, gala, or workshop flows and compare task checklists instantly.',
  },
  {
    title: 'Compact project notes',
    description: 'Keep event goals, venue details, and deadlines in one easy-to-scan panel.',
  },
  {
    title: 'Built for class demos',
    description: 'A college-friendly layout that is polished but not overly corporate.',
  },
];

const timelineSteps = [
  { time: 'Week 1', label: 'Plan theme, book venue, assign roles' },
  { time: 'Week 2', label: 'Confirm logistics, launch RSVP, print assets' },
  { time: 'Event day', label: 'Setup, run program, capture highlights' },
];

function estimateBudget(guestCount) {
  return 250 + guestCount * 9;
}

function App() {
  const [activeTemplate, setActiveTemplate] = useState(templates[0]);
  const [guestCount, setGuestCount] = useState(activeTemplate.guests);

  const handleTemplateSelect = (template) => {
    setActiveTemplate(template);
    setGuestCount(template.guests);
  };

  const budget = estimateBudget(guestCount);

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand">Campus Event Lab</div>
        <nav className="nav-links">
          <a href="#planner">Planner</a>
          <a href="#templates">Templates</a>
          <a href="#checklist">Checklist</a>
          <a href="#notes">Notes</a>
        </nav>
      </header>

      <section className="hero" id="planner">
        <div className="hero-copy">
          <span className="eyebrow">College Project</span>
          <h1>Build event plans that feel real, simple, and usable.</h1>
          <p>
            This mini app is designed as a complete project demo: choose a template, tune guest count,
            check the schedule, and review a compact event summary without the marketing fluff.
          </p>
          <div className="hero-actions">
            <button type="button">Try the planner</button>
            <a className="secondary-link" href="#templates">See templates</a>
          </div>
          <div className="hero-stat-row">
            <div className="stat-card">
              <strong>3</strong>
              <span>Event flows</span>
            </div>
            <div className="stat-card">
              <strong>12</strong>
              <span>Key project tasks</span>
            </div>
            <div className="stat-card">
              <strong>Compact</strong>
              <span>College ready UI</span>
            </div>
          </div>
        </div>

        <aside className="planner-panel">
          <div className="panel-tag">Live event preview</div>
          <div className="panel-card">
            <h2>{activeTemplate.title}</h2>
            <p>{activeTemplate.subtitle}</p>
            <div className="info-pill-row">
              <span>{activeTemplate.pace}</span>
              <span>{activeTemplate.tone}</span>
            </div>
            <div className="input-group">
              <label htmlFor="guests">Expected guests</label>
              <input
                id="guests"
                type="number"
                min="20"
                max="400"
                step="10"
                value={guestCount}
                onChange={(event) => setGuestCount(Number(event.target.value))}
              />
            </div>
            <div className="budget-block">
              <span>Estimated budget</span>
              <strong>${budget}</strong>
            </div>
            <div className="task-preview">
              <strong>Top tasks</strong>
              <ul>
                {activeTemplate.tasks.slice(0, 3).map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </section>

      <section className="section" id="templates">
        <div className="section-heading">
          <small>Template playground</small>
          <h2>Choose the event flow that fits your project.</h2>
        </div>
        <div className="template-tabs">
          {templates.map((template) => (
            <button
              key={template.id}
              type="button"
              className={template.id === activeTemplate.id ? 'tab-button active' : 'tab-button'}
              onClick={() => handleTemplateSelect(template)}
            >
              {template.title}
            </button>
          ))}
        </div>
        <div className="event-preview">
          <div className="preview-panel">
            <h3>Event snapshot</h3>
            <p>{activeTemplate.subtitle}</p>
            <div className="preview-details">
              <div>
                <span>Guest goal</span>
                <strong>{guestCount}</strong>
              </div>
              <div>
                <span>Program type</span>
                <strong>{activeTemplate.pace}</strong>
              </div>
              <div>
                <span>Budget</span>
                <strong>${budget}</strong>
              </div>
            </div>
          </div>
          <div className="timeline-card">
            <h3>Project timeline</h3>
            <div className="timeline-list">
              {timelineSteps.map(({ time, label }) => (
                <div key={time} className="timeline-item">
                  <span className="timeline-time">{time}</span>
                  <p>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section feature-grid" id="checklist">
        {featureCards.map((card) => (
          <article key={card.title} className="feature-card">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </article>
        ))}
      </section>

      <section className="section notes-panel" id="notes">
        <div>
          <h2>Why this fits a college project</h2>
          <p>
            It’s designed to show a real planning flow without being overly polished. Everything is
            readable, compact, and built around a useful event management experience for student teams.
          </p>
        </div>
        <div className="notes-grid">
          <div className="note-card">
            <h3>Fast to demo</h3>
            <p>Replace the content, add event types, or wire this into a backend as your next milestone.</p>
          </div>
          <div className="note-card">
            <h3>Function-first</h3>
            <p>Interactive template selection, guest planning, and schedule review are all on one screen.</p>
          </div>
          <div className="note-card">
            <h3>Ready to extend</h3>
            <p>Build attendee RSVP, venue maps, or vendor checklists from this compact base.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>Campus Event Lab • Demo-ready event planner for assignments, hackathons, and class presentations.</p>
      </footer>
    </div>
  );
}

export default App;
