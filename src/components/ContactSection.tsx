import React, { useState } from "react";
import { PortfolioProfile } from "../types";
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, Check, ExternalLink, MessageSquareText, Github, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactSectionProps {
  profile: PortfolioProfile;
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [hasSent, setHasSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    // Simulate minor network delay
    setTimeout(() => {
      setIsSubmitting(false);
      setHasSent(true);
      // Clean inputs
      setName("");
      setEmail("");
      setMessage("");
    }, 1200);
  };

  return (
    <section id="contact-section" className="py-20 bg-neutral-900 text-white font-sans overflow-hidden relative">
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full mix-blend-screen filter blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: profile.themeColor }}
      />
      <div 
        className="absolute top-[-10%] left-[-10%] w-80 h-80 rounded-full mix-blend-screen filter blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: profile.themeColor }}
      />

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left column: links and copy items */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-white">Let's Connect</h2>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              I am open to discuss new opportunities, technical architecture consulting, open-source ideas, or engineering collaborations.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest font-mono">My Coordinates</h3>
            
            <div className="space-y-3">
              {/* Email entry */}
              <div className="flex items-center justify-between p-3.5 bg-neutral-800/50 rounded-xl border border-neutral-800 group hover:border-neutral-700 transition">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neutral-800 rounded-lg text-neutral-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider font-mono">Email</p>
                    <p className="text-sm text-neutral-200 font-medium">{profile.contact.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy("email", profile.contact.email)}
                  className="p-2 text-neutral-400 hover:text-white rounded bg-neutral-800/80 hover:bg-neutral-800 transition"
                >
                  {copiedKey === "email" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Phone coordinate */}
              {profile.contact.phone && (
                <div className="flex items-center justify-between p-3.5 bg-neutral-800/50 rounded-xl border border-neutral-800 group hover:border-neutral-700 transition">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-neutral-800 rounded-lg text-neutral-300">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider font-mono">Cell Phone</p>
                      <p className="text-sm text-neutral-200 font-medium">{profile.contact.phone}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy("phone", profile.contact.phone || "")}
                    className="p-2 text-neutral-400 hover:text-white rounded bg-neutral-800/80 hover:bg-neutral-800 transition"
                  >
                    {copiedKey === "phone" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}

              {/* Office Location */}
              <div className="flex items-center justify-between p-3.5 bg-neutral-800/50 rounded-xl border border-neutral-800 group hover:border-neutral-700 transition">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neutral-800 rounded-lg text-neutral-300">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider font-mono">Headquarters Location</p>
                    <p className="text-sm text-neutral-200 font-medium">{profile.contact.location}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy("loc", profile.contact.location)}
                  className="p-2 text-neutral-400 hover:text-white rounded bg-neutral-800/80 hover:bg-neutral-800 transition"
                >
                  {copiedKey === "loc" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* GitHub */}
              {profile.contact.github && (
                <div className="flex items-center justify-between p-3.5 bg-neutral-800/50 rounded-xl border border-neutral-800 group hover:border-neutral-700 transition">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-neutral-800 rounded-lg text-neutral-300">
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider font-mono">GitHub Profile</p>
                      <a 
                        href={profile.contact.github.startsWith("http") ? profile.contact.github : `https://${profile.contact.github}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-neutral-200 font-medium hover:underline hover:text-white flex items-center gap-1.5"
                      >
                        {profile.contact.github.replace("https://", "").replace("http://", "")}
                        <ExternalLink className="w-3 h-3 text-neutral-400" />
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy("github", profile.contact.github || "")}
                    className="p-2 text-neutral-400 hover:text-white rounded bg-neutral-800/80 hover:bg-neutral-800 transition"
                  >
                    {copiedKey === "github" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}

              {/* LinkedIn */}
              {profile.contact.linkedin && (
                <div className="flex items-center justify-between p-3.5 bg-neutral-800/50 rounded-xl border border-neutral-800 group hover:border-neutral-700 transition">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-neutral-800 rounded-lg text-neutral-300">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider font-mono">LinkedIn Profile</p>
                      <a 
                        href={profile.contact.linkedin.startsWith("http") ? profile.contact.linkedin : `https://${profile.contact.linkedin}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-neutral-200 font-medium hover:underline hover:text-white flex items-center gap-1.5"
                      >
                        {profile.contact.linkedin.replace("https://", "").replace("http://", "")}
                        <ExternalLink className="w-3 h-3 text-neutral-400" />
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy("linkedin", profile.contact.linkedin || "")}
                    className="p-2 text-neutral-400 hover:text-white rounded bg-neutral-800/80 hover:bg-neutral-800 transition"
                  >
                    {copiedKey === "linkedin" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="text-xs text-neutral-500 font-mono tracking-wider pt-6">
            © 2026 {profile.name}. All Rights Reservable.
          </div>
        </div>

        {/* Right column: Interactive Form */}
        <div className="lg:col-span-7 bg-neutral-800/30 border border-neutral-800/80 p-6 md:p-8 rounded-2xl relative">
          <AnimatePresence mode="wait">
            {!hasSent ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono mb-1.5">Your Name</label>
                    <input
                      type="text"
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 select-text"
                      required
                      placeholder="Recruiter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono mb-1.5">Email Address</label>
                    <input
                      type="email"
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 select-text"
                      required
                      placeholder="hiring@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono mb-1.5">Your Message</label>
                  <textarea
                    rows={4}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-4 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 select-text resize-none"
                    required
                    placeholder="We loved your observability dashboard project. Are you available for an introductory call?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    id="submit-contact-form"
                    disabled={isSubmitting}
                    className="px-6 py-3.5 text-xs font-bold text-white rounded-xl shadow-md flex items-center gap-2 transition disabled:opacity-50"
                    style={{ backgroundColor: profile.themeColor }}
                  >
                    {isSubmitting ? (
                      <>Processing...</>
                    ) : (
                      <>
                        Deliver Secure Message
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="contact-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 space-y-6"
              >
                <div className="flex justify-center">
                  <div className="p-3 bg-green-500/10 text-green-400 rounded-full border border-green-500/30">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Message Logged!</h3>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                    Thank you, {name}! Your message was successfully recorded in the browser's sandbox environment. 
                  </p>
                </div>

                <div className="bg-neutral-850 p-4 border border-neutral-800 rounded-xl space-y-2 text-left text-xs text-neutral-300">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-400 mb-1">
                    <MessageSquareText className="w-4 h-4" />
                    Automated Message Receipt:
                  </div>
                  <p className="italic text-neutral-400">
                    "Hi {name}, thank you for reaching out from {email}! I will review your message soon and get back to you via your coordinates."
                  </p>
                </div>

                <button
                  onClick={() => setHasSent(false)}
                  className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-750 text-neutral-300 text-xs font-semibold rounded-lg transition"
                >
                  Message Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
