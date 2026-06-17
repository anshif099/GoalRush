import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: 'fan', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-bg" />

      <div className="container contact-container">
        <div className="contact-left fade-up">
          <div className="section-tag" style={{ background: 'rgba(212,175,55,0.1)', borderColor: 'rgba(212,175,55,0.3)', color: '#7a5a00' }}>
            📬 Get in Touch
          </div>
          <h2 className="section-title">
            Ready to <span className="text-gradient-blue">Goal Rush?</span>
          </h2>
          <p className="section-subtitle">
            Whether you&apos;re a fan, brand, or sporting organisation — we&apos;d love to hear from you.
          </p>

          <div className="contact-info-list">
            {[
              { icon: '🌐', label: 'Website', value: 'goalrush.io' },
              { icon: '📧', label: 'Email', value: 'hello@goalrush.io' },
              { icon: '📍', label: 'HQ', value: 'London, UK • Dubai, UAE • Mumbai, IN' },
              { icon: '📱', label: 'Social', value: '@GoalRushGlobal' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="contact-info-row">
                <span className="info-icon">{icon}</span>
                <div>
                  <div className="info-label">{label}</div>
                  <div className="info-value">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-right fade-up fade-up-delay-2">
          {submitted ? (
            <div className="contact-success">
              <div className="success-emoji">🎉</div>
              <h3>Message Sent!</h3>
              <p>We&apos;ll get back to you within 24 hours. Welcome to the Goal Rush family!</p>
              <button className="btn btn-primary" onClick={() => setSubmitted(false)} id="send-another-btn">
                Send Another
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name">Full Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>I am a...</label>
                <div className="type-selector">
                  {[
                    { val: 'fan', label: '⚽ Sports Fan' },
                    { val: 'sponsor', label: '🤝 Brand / Sponsor' },
                    { val: 'partner', label: '🏟️ Sports Org' },
                    { val: 'investor', label: '💼 Investor' },
                  ].map(({ val, label }) => (
                    <button
                      key={val}
                      type="button"
                      className={`type-btn ${form.type === val ? 'active' : ''}`}
                      onClick={() => setForm({ ...form, type: val })}
                      id={`contact-type-${val}-btn`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Tell us about yourself or your brand..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg form-submit" id="contact-submit-btn">
                🚀 Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
