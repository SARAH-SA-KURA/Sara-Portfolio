import React, { useState } from 'react';
import MarqueeBand from './MarqueeBand';

const EMAIL = "abdelwahidsara@gmail.com";
const EMPTY_FORM = { name: '', tele: '', email: '', message: '' };

const Contact = () => {
  const [alert, setAlert] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const flash = (text) => {
    setAlert(text);
    setTimeout(() => setAlert(null), 2500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => flash("Email copied to clipboard!"));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // There's no backend behind this form, so hand the message to the visitor's
  // mail client pre-filled instead of silently dropping it.
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      flash("Please fill in your name, email and message.");
      return;
    }

    const subject = `Portfolio message from ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.tele.trim() && `WhatsApp: ${form.tele}`,
      '',
      form.message
    ].filter(Boolean).join('\n');

    window.location.href =
      `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    flash("Opening your mail app...");
    setForm(EMPTY_FORM);
  };

  return (
    <section id="contact">
      {/* The Alert Box */}
      {alert && <div className="alert-cute">{alert}</div>}

      <p className="section-eyebrow">Contact</p>
      <h2 className="section-title">Let's Talk</h2>

      <MarqueeBand word="Contact" />

      <div className="formule">
        <div className="formule-input">
          <form id="contact-form" onSubmit={handleSubmit}>
            <input type="text" className="name-text" name="name" placeholder="What is your name"
              value={form.name} onChange={handleChange} />
            <input type="tel" className="tel-text" name="tele" placeholder="Your WhatsApp"
              value={form.tele} onChange={handleChange} />
            <input type="email" className="email-text" name="email" placeholder="Your Email"
              value={form.email} onChange={handleChange} />
            <textarea name="message" id="mssg" placeholder="Your Message"
              value={form.message} onChange={handleChange}></textarea>
            <button type="submit" className="btn-input">Send Message</button>
          </form>
        </div>
      </div>

      <div className="cont">
        <div className="watt-div">
          <div><i className="fa-regular fa-message"></i></div>
          <p className="num">0716-241752</p>
          <p className="title-watt">WhatsApp</p>
        </div>
        <div className="email-div">
          <div><i className="fa-regular fa-envelope"></i></div>
          <p className="email">{EMAIL}</p>
          <p className="title-email">Email</p>
        </div>
        <div className="linkd-div">
          <div><i className="fa-brands fa-linkedin-in"></i></div>
          <p><a className="linkd" href="https://linkedin.com/in/sara-abdelwahid-937a50278" target="_blank" rel="noreferrer">linkedin/Sarah</a></p>
          <p className="title-linkd">linkedin</p>
        </div>
      </div>

      <div className="footer-div">
        <h4>Have an idea in mind? Let's make it Happen</h4>
        <button type="button" id="email" className="email-cta" onClick={copyEmail}>
          {EMAIL}
        </button>
      </div>
    </section>
  );
};

export default Contact;
