import React, { useState, useEffect } from "react";
import { PortfolioProfile } from "./types";
import { defaultProfile } from "./defaultProfile";
import { 
  Settings, PenTool, Sparkles, Sliders, Menu, X, ArrowUpRight 
} from "lucide-react";

// Import modular layouts
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import AchievementsSection from "./components/AchievementsSection";
import ContactSection from "./components/ContactSection";
import LiveEditor from "./components/LiveEditor";

export default function App() {
  const [profile, setProfile] = useState<PortfolioProfile>(defaultProfile);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);

  // Load profile state and check admin authorization on bootstrap
  useEffect(() => {
    try {
      const persisted = localStorage.getItem("dev_portfolio_profile_live");
      if (persisted) {
        const parsed = JSON.parse(persisted);
        if (parsed.name === "Alex Rivera" || parsed.experiences?.some((e: any) => e.company === "Prodigy Infotech" || e.type === "work")) {
          // Reset to preferred Gauri profile immediately if it loads older mock/work profile
          localStorage.setItem("dev_portfolio_profile_live", JSON.stringify(defaultProfile));
          setProfile(defaultProfile);
        } else {
          setProfile(parsed);
        }
      }
    } catch (e) {
      console.warn("Could not deserialize saved profile config, using defaults.");
    }

    // Check query params for secret authorization
    try {
      const params = new URLSearchParams(window.location.search);
      const isManualAdmin = params.get("edit") === "true" || params.get("admin") === "true";
      const isManualDisable = params.get("edit") === "false" || params.get("admin") === "false";

      if (isManualDisable) {
        localStorage.removeItem("gauri_portfolio_admin_authorized");
        setIsAdminMode(false);
      } else if (isManualAdmin) {
        localStorage.setItem("gauri_portfolio_admin_authorized", "true");
        setIsAdminMode(true);
      } else {
        const hasSavedAuth = localStorage.getItem("gauri_portfolio_admin_authorized") === "true";
        setIsAdminMode(hasSavedAuth);
      }
    } catch (err) {
      console.warn("Could not parse location queries.");
    }
  }, []);

  // Handle stealth easter egg clicks
  const handleLogoClick = () => {
    setLogoClickCount(prev => {
      const nextCount = prev + 1;
      if (nextCount >= 5) {
        const nextState = !isAdminMode;
        setIsAdminMode(nextState);
        if (nextState) {
          localStorage.setItem("gauri_portfolio_admin_authorized", "true");
          setIsEditorOpen(true);
        } else {
          localStorage.removeItem("gauri_portfolio_admin_authorized");
        }
        return 0;
      }
      return nextCount;
    });
  };

  // Reset chick count after 3 seconds of inactivity
  useEffect(() => {
    if (logoClickCount > 0) {
      const timer = setTimeout(() => setLogoClickCount(0), 3000);
      return () => clearTimeout(timer);
    }
  }, [logoClickCount]);

  // Update handler that auto-persists updates
  const handleProfileChange = (updated: PortfolioProfile) => {
    setProfile(updated);
    try {
      localStorage.setItem("dev_portfolio_profile_live", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to persist updated profile config to local storage.");
    }
  };

  const hasWorkExperience = profile.experiences.some(exp => exp.type === "work");

  const navLinks = [
    { name: "About", href: "#hero-about-section" },
    { name: "Skills", href: "#skills-section" },
    { name: "Projects", href: "#projects-section" },
    { name: hasWorkExperience ? "Experience" : "Education", href: "#experience-section" },
    { name: "Achievements", href: "#achievements-section" },
    { name: "Tools", href: "#tech-stack-section" },
    { name: "Contact", href: "#contact-section" },
  ];

  // Tech stack / Tools logos list (the visual icons row representing their preferred technologies)
  const technicalTools = [
    { name: "Visual Studio Code", desc: "Primary IDE", category: "editor" },
    { name: "Git & GitHub", desc: "Version Control", category: "vcs" },
    { name: "Docker Containers", desc: "Isolation", category: "devops" },
    { name: "Google Cloud", desc: "Cloud Hosting", category: "cloud" },
    { name: "Figma Canvas", desc: "Interface Design", category: "design" },
    { name: "Terminal Csh", desc: "Command Shell", category: "shell" },
    { name: "Postman API Client", desc: "Testing", category: "api" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col transition-colors duration-200">
      
      {/* Top sticky Navigation Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-neutral-200 z-30 font-sans">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            onClick={handleLogoClick}
            className="flex items-center gap-2 cursor-pointer select-none group"
            title="Gauri's space logo"
          >
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold font-mono shadow-xs transition-transform group-active:scale-95"
              style={{ backgroundColor: profile.themeColor }}
            >
              {profile.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <span className="text-sm font-bold text-neutral-900 leading-none group-hover:text-neutral-700 transition-colors">{profile.name}</span>
              <span className="block text-[9px] text-neutral-400 font-mono tracking-wider">DEV PORTFOLIO</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 hover:underline transition-colors select-none"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Builder Action Toggle */}
          <div className="flex items-center gap-2">
            {isAdminMode && (
              <button
                id="header-toggle-builder-btn"
                onClick={() => setIsEditorOpen(true)}
                className="flex items-center gap-1 bg-neutral-900 hover:bg-neutral-800 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition shadow-sm animate-fade-in"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Customize Info</span>
              </button>
            )}

            {/* Mobile hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 md:hidden bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-150 bg-white p-4 space-y-2 text-sm flex flex-col shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 rounded-lg font-medium transition"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Main Sections */}
      <main className="flex-1">
        {/* LANDING PAGE -> HERO & ABOUT (with Metrics Counters) */}
        <AboutSection 
          profile={profile} 
          onOpenEditor={() => setIsEditorOpen(true)} 
          isAdminMode={isAdminMode} 
        />

        {/* LANDING PAGE -> SKILLS */}
        <SkillsSection profile={profile} />

        {/* LANDING PAGE -> FEATURED PROJECTS */}
        <ProjectsSection profile={profile} />

        {/* LANDING PAGE -> EXPERIENCE */}
        <ExperienceSection profile={profile} />

        {/* LANDING PAGE -> ACHIEVEMENTS */}
        <AchievementsSection profile={profile} />

        {/* LANDING PAGE -> TECH STACK & TOOLS */}
        <section id="tech-stack-section" className="py-20 bg-white border-b border-neutral-100 font-sans">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center space-y-2 mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Tech Stack & Tools</h2>
              <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
                The visual frameworks, environments, and operating programs I interact with daily to design and ship scalable code.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {technicalTools.map((tool, index) => (
                <div 
                  key={index}
                  className="p-4 bg-neutral-50/50 hover:bg-neutral-50 rounded-xl border border-neutral-200 flex items-center gap-3 transition-colors duration-200"
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                    style={{ 
                      backgroundColor: `${profile.themeColor}15`, 
                      color: profile.themeColor 
                    }}
                  >
                    {tool.name[0]}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-neutral-800 leading-none">{tool.name}</h3>
                    <p className="text-[10px] text-neutral-400 mt-1 font-mono font-medium">{tool.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LANDING PAGE -> CONTACT FORM & coordinates */}
        <ContactSection profile={profile} />
      </main>

      {/* Floating builder reminder badge on the far left column */}
      {isAdminMode && (
        <div className="hidden lg:block fixed bottom-6 left-6 z-40 animate-fade-in">
          <div className="p-4 bg-white/95 border border-neutral-200 rounded-2xl shadow-lg font-sans max-w-xs space-y-2 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-600" style={{ color: profile.themeColor }}>
              <Sparkles className="w-3.5 h-3.5" />
              Configurator Portal
            </div>
            <p className="text-[11px] text-neutral-500 leading-relaxed font-mono">
              Want to use this portfolio for yourself? Click <strong>Customize</strong> above, update your profile files, and hit export!
            </p>
            <button
              onClick={() => setIsEditorOpen(true)}
              className="w-full py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[10px] font-bold rounded-lg transition"
            >
              Open Customize Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Live profile customizer drawer */}
      <LiveEditor
        profile={profile}
        onChange={handleProfileChange}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />

    </div>
  );
}
