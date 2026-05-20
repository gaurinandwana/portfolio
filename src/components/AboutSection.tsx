import React from "react";
import { PortfolioProfile } from "../types";
import { ArrowRight, FileText, MapPin, Github, Linkedin, Twitter, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface AboutSectionProps {
  profile: PortfolioProfile;
  onOpenEditor: () => void;
  isAdminMode?: boolean;
}

export default function AboutSection({ profile, onOpenEditor, isAdminMode = false }: AboutSectionProps) {
  // Compute some interesting reactive metrics based on current loaded inputs
  const yearsExp = profile.experiences.filter(e => e.type === "work").length * 2 + 1; // logical estimate
  const completedProjects = profile.projects.length;
  const accoladeCount = profile.achievements.length;

  return (
    <section id="hero-about-section" className="relative py-20 lg:py-28 overflow-hidden bg-neutral-50/50">
      {/* Decorative gradient background background shapes */}
      <div 
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: profile.themeColor }}
      />
      <div 
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full mix-blend-multiply filter blur-2xl opacity-10 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: profile.themeColor }}
      />

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Typographical intro info */}
        <div className="lg:col-span-7 space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-tight"
          >
            I'm <span className="underline decoration-indigo-400 decoration-3" style={{ textDecorationColor: profile.themeColor }}>{profile.name}</span>
            <br />
            {profile.role}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-600 leading-relaxed max-w-xl font-sans"
          >
            {profile.tagline}
          </motion.p>

          {/* Quick social bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 font-mono"
          >
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-neutral-200 shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              {profile.contact.location}
            </span>
            {profile.contact.github && (
              <a 
                href={profile.contact.github.startsWith("http") ? profile.contact.github : `https://${profile.contact.github}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
            {profile.contact.linkedin && (
              <a 
                href={profile.contact.linkedin.startsWith("http") ? profile.contact.linkedin : `https://${profile.contact.linkedin}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            )}
            {profile.contact.twitter && (
              <a 
                href={profile.contact.twitter.startsWith("http") ? profile.contact.twitter : `https://${profile.contact.twitter}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors"
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </a>
            )}
          </motion.div>

          {/* Core Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#projects-section"
              className="px-6 py-3.5 text-white font-medium text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
              style={{ backgroundColor: profile.themeColor }}
            >
              Explore Projects
              <ArrowRight className="w-4 h-4" />
            </a>
            {isAdminMode && (
              <button
                id="cta-open-editor"
                onClick={onOpenEditor}
                className="px-6 py-3.5 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200 font-medium text-sm rounded-xl shadow-xs transition"
              >
                Edit This Portfolio
              </button>
            )}
          </motion.div>
        </div>

        {/* Visual card representing avatar and statistics */}
        <div className="lg:col-span-5 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="relative bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-lg select-none"
          >
            <div className="absolute top-4 right-4 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>

            {/* Micro avatar representation */}
            <div className="flex items-center gap-4 pb-6 border-b border-neutral-100">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold font-mono shadow-inner animate-pulse-slow relative"
                style={{ 
                  background: `linear-gradient(135deg, ${profile.themeColor}dd, ${profile.themeColor})` 
                }}
              >
                {profile.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">{profile.name}</h3>
                <p className="text-xs text-neutral-500 font-mono">{profile.role}</p>
              </div>
            </div>

            {/* About text narrative block */}
            <div className="py-6 border-b border-neutral-100">
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2 font-mono">Biography</h4>
              <p className="text-sm text-neutral-600 leading-relaxed font-sans">{profile.aboutText}</p>
            </div>

            {/* Bento-style stats highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 text-center">
              <div>
                <p className="text-2xl font-bold text-neutral-900" style={{ color: profile.themeColor }}>
                  {yearsExp}+
                </p>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide font-mono">Years Exp</p>
              </div>
              <div className="border-x border-neutral-100">
                <p className="text-2xl font-bold text-neutral-900" style={{ color: profile.themeColor }}>
                  {completedProjects}
                </p>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide font-mono">Projects</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-neutral-900" style={{ color: profile.themeColor }}>
                  {accoladeCount}
                </p>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide font-mono">Accolades</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
