import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaInstagram } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // For now just simulate submission — Firebase can be added later
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setForm({ name: '', email: '', message: '' });
      setSending(false);
    }, 800);
  };

  return (
    <div className="contact-page page-wrapper">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            Get in <span>Touch</span>
          </h2>
          <p className="text-muted" style={{ textAlign: 'center', marginBottom: 48 }}>
            Have a question? We&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="contact-info-card">
              <div className="contact-info-item">
                <div className="contact-icon">
                  <HiMail />
                </div>
                <div>
                  <p className="contact-info-label">Email</p>
                  <p className="contact-info-value">
                    <a href="mailto:theboyz4968@gmail.com">theboyz4968@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <HiPhone />
                </div>
                <div>
                  <p className="contact-info-label">Phone</p>
                  <p className="contact-info-value">
                    <a href="tel:9591529684">+91 9591529684</a>
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <FaInstagram />
                </div>
                <div>
                  <p className="contact-info-label">Instagram</p>
                  <p className="contact-info-value">
                    <a href="https://instagram.com/theboyzmenwear" target="_blank" rel="noreferrer">
                      @The Boyz Menswear
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <HiLocationMarker />
                </div>
                <div>
                  <p className="contact-info-label">Location</p>
                  <p className="contact-info-value">India</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input
                  className="form-input"
                  type="text"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  className="form-input"
                  type="email"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  className="form-textarea"
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-full" disabled={sending}>
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
