import React, { useState } from "react";
import { PortfolioProfile, Skill, Project, Experience, Achievement } from "../types";
import { 
  X, Check, Plus, Trash2, Edit3, Settings, 
  Download, Upload, Sparkles, RefreshCw, Layers 
} from "lucide-react";
import { defaultProfile } from "../defaultProfile";
import { motion, AnimatePresence } from "motion/react";

interface LiveEditorProps {
  profile: PortfolioProfile;
  onChange: (updated: PortfolioProfile) => void;
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'basic' | 'skills' | 'experience' | 'projects' | 'achievements';

export default function LiveEditor({ profile, onChange, isOpen, onClose }: LiveEditorProps) {
  const [activeTab, setActiveTab] = useState<TabType>('basic');
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");
  const [showImporter, setShowImporter] = useState(false);

  const handleBasicChange = (field: keyof PortfolioProfile | 'contact_email' | 'contact_location' | 'contact_phone' | 'contact_github' | 'contact_linkedin' | 'contact_twitter', value: string) => {
    if (field.toString().startsWith('contact_')) {
      const contactField = field.toString().replace('contact_', '') as keyof typeof profile.contact;
      onChange({
        ...profile,
        contact: {
          ...profile.contact,
          [contactField]: value
        }
      });
    } else {
      onChange({
        ...profile,
        [field]: value
      });
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${profile.name.toLowerCase().replace(/\s+/g, '_')}_portfolio_config.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importText);
      if (parsed.name && parsed.role && Array.isArray(parsed.skills)) {
        onChange(parsed);
        setImportError("");
        setImportText("");
        setShowImporter(false);
      } else {
        setImportError("Invalid data format: Missing key fields");
      }
    } catch (e) {
      setImportError("Invalid JSON syntax.");
    }
  };

  const resetToDefault = () => {
    if (window.confirm("Restore default sample data? Your unsaved custom modifications will be discarded.")) {
      onChange(defaultProfile);
    }
  };

  // Skill manipulations
  const updateSkill = (index: number, updatedSkill: Skill) => {
    const list = [...profile.skills];
    list[index] = updatedSkill;
    onChange({ ...profile, skills: list });
  };

  const addSkill = () => {
    const newSkill: Skill = { name: "New Skill", level: 3, category: "Languages" };
    onChange({ ...profile, skills: [...profile.skills, newSkill] });
  };

  const removeSkill = (index: number) => {
    const list = profile.skills.filter((_, i) => i !== index);
    onChange({ ...profile, skills: list });
  };

  // Experience updates
  const updateExperience = (index: number, updatedExp: Experience) => {
    const list = [...profile.experiences];
    list[index] = updatedExp;
    onChange({ ...profile, experiences: list });
  };

  const addExperience = (type: 'work' | 'education') => {
    const newExp: Experience = {
      id: "exp_" + Date.now(),
      role: type === 'work' ? "Developer Role" : "Degree Program",
      company: type === 'work' ? "Tech Company" : "Institution",
      location: "City, State",
      period: "2024 - Present",
      description: ["Contributed to core initiatives."],
      type
    };
    onChange({ ...profile, experiences: [newExp, ...profile.experiences] });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...profile,
      experiences: profile.experiences.filter(e => e.id !== id)
    });
  };

  // Project updates
  const updateProject = (index: number, updatedProj: Project) => {
    const list = [...profile.projects];
    list[index] = updatedProj;
    onChange({ ...profile, projects: list });
  };

  const addProject = () => {
    const newProj: Project = {
      id: "proj_" + Date.now(),
      title: "Novel Application",
      description: "A fast, scalable app designed to solve interactive constraints.",
      category: "frontend",
      tags: ["React", "TypeScript"],
      featured: false,
    };
    onChange({ ...profile, projects: [...profile.projects, newProj] });
  };

  const removeProject = (id: string) => {
    onChange({
      ...profile,
      projects: profile.projects.filter(p => p.id !== id)
    });
  };

  // Accolades/Achievements
  const updateAchievement = (index: number, updatedAch: Achievement) => {
    const list = [...profile.achievements];
    list[index] = updatedAch;
    onChange({ ...profile, achievements: list });
  };

  const addAchievement = () => {
    const newAch: Achievement = {
      id: "ach_" + Date.now(),
      title: "Excellence Recognition",
      issuer: "Summit Collective",
      date: "May 2026",
      description: "Recognized for driving key development performance metrics."
    };
    onChange({ ...profile, achievements: [...profile.achievements, newAch] });
  };

  const removeAchievement = (id: string) => {
    onChange({
      ...profile,
      achievements: profile.achievements.filter(a => a.id !== id)
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950 z-40"
            onClick={onClose}
          />

          {/* Slider Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-xl md:max-w-2xl bg-white shadow-2xl z-50 flex flex-col font-sans"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Settings className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900">Portfolio Live Builder</h2>
                  <p className="text-xs text-neutral-500">Customize any content. LocalStorage auto-saves.</p>
                </div>
              </div>
              <button 
                id="close-editor-btn"
                onClick={onClose} 
                className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-400 hover:text-neutral-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions Bar */}
            <div className="px-6 py-3 border-b border-neutral-100 bg-neutral-50/50 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  id="btn-export-profile"
                  onClick={handleExport}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white border border-neutral-200 hover:bg-neutral-100 rounded text-neutral-700 font-medium transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-neutral-500" />
                  Backup Config
                </button>
                <button
                  id="btn-toggle-importer"
                  onClick={() => setShowImporter(!showImporter)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white border border-neutral-200 hover:bg-neutral-100 rounded text-neutral-700 font-medium transition-all"
                >
                  <Upload className="w-3.5 h-3.5 text-neutral-500" />
                  Restore JSON
                </button>
              </div>

              <button
                id="btn-reset-default"
                onClick={resetToDefault}
                className="flex items-center gap-1 px-3 py-1.5 text-neutral-500 hover:text-red-600 font-medium transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>
            </div>

            {/* JSON Importer Drawer */}
            {showImporter && (
              <div className="bg-indigo-50/70 p-4 border-b border-indigo-100 text-xs">
                <p className="font-semibold text-neutral-800 mb-2">Paste Portfolio Config JSON:</p>
                <textarea
                  className="w-full h-32 p-2 font-mono bg-white border border-neutral-200 rounded text-neutral-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder='{ "name": "...", "role": "...", "skills": [] }'
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                />
                {importError && <p className="text-red-600 mt-1 font-semibold">{importError}</p>}
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={handleImport}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded transition"
                  >
                    Load JSON
                  </button>
                  <button
                    onClick={() => { setShowImporter(false); setImportError(""); }}
                    className="px-3 py-1.5 text-neutral-500 hover:text-neutral-800"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Editor Tabs Navigation */}
            <div className="flex border-b border-neutral-200 text-sm bg-white overflow-x-auto whitespace-nowrap">
              {(['basic', 'skills', 'experience', 'projects', 'achievements'] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-medium border-b-2 transition-all capitalize flex-1 text-center ${
                    activeTab === tab
                      ? 'border-indigo-600 text-indigo-600 bg-indigo-50/10'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800 hover:border-neutral-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Editor Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTab === 'basic' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Display Name</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-neutral-200 rounded text-sm text-neutral-900 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                        value={profile.name}
                        onChange={(e) => handleBasicChange('name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Headline Role</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-neutral-200 rounded text-sm text-neutral-900 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                        value={profile.role}
                        onChange={(e) => handleBasicChange('role', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Current Company</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-neutral-200 rounded text-sm text-neutral-900 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                        value={profile.company || ""}
                        onChange={(e) => handleBasicChange('company', e.target.value)}
                        placeholder="e.g. Innovate Labs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Theme Accent Color</label>
                      <select
                        className="w-full p-2 border border-neutral-200 rounded text-sm text-neutral-900 focus:ring-2 focus:ring-indigo-200 focus:outline-none bg-white"
                        value={profile.themeColor}
                        onChange={(e) => handleBasicChange('themeColor', e.target.value)}
                      >
                        <option value="#6366f1">Indigo (Default)</option>
                        <option value="#22c55e">Emerald (Nature)</option>
                        <option value="#ea580c">Orange (Flame)</option>
                        <option value="#06b6d4">Cyan (Horizon)</option>
                        <option value="#a855f7">Purple (Cosmic)</option>
                        <option value="#ec4899">Pink (Cyberpunk)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Short Tagline</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-neutral-200 rounded text-sm text-neutral-900 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                      value={profile.tagline}
                      onChange={(e) => handleBasicChange('tagline', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">About Bio Paragraph</label>
                    <textarea
                      rows={4}
                      className="w-full p-2 border border-neutral-200 rounded text-sm text-neutral-900 focus:ring-2 focus:ring-indigo-200 focus:outline-none resize-y"
                      value={profile.aboutText}
                      onChange={(e) => handleBasicChange('aboutText', e.target.value)}
                    />
                  </div>

                  <div className="border-t border-neutral-200 pt-4 space-y-4">
                    <h3 className="font-semibold text-sm text-neutral-900">Contact Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          className="w-full p-2 border border-neutral-200 rounded text-sm text-neutral-900 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                          value={profile.contact.email}
                          onChange={(e) => handleBasicChange('contact_email', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1">Office Location</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-neutral-200 rounded text-sm text-neutral-900 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                          value={profile.contact.location}
                          onChange={(e) => handleBasicChange('contact_location', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1">GitHub (no https://)</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-neutral-200 rounded text-sm text-neutral-900 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                          value={profile.contact.github}
                          onChange={(e) => handleBasicChange('contact_github', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1">LinkedIn (no https://)</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-neutral-200 rounded text-sm text-neutral-900 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                          value={profile.contact.linkedin}
                          onChange={(e) => handleBasicChange('contact_linkedin', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-neutral-900">Technical Skills Matrix</h3>
                    <button
                      id="btn-add-skill"
                      onClick={addSkill}
                      className="flex items-center gap-1 text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Skill
                    </button>
                  </div>

                  <div className="space-y-3">
                    {profile.skills.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-sm">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                          <input
                            type="text"
                            placeholder="Skill Name"
                            className="bg-white p-1.5 border border-neutral-200 rounded text-xs select-text focus:outline-none"
                            value={skill.name}
                            onChange={(e) => updateSkill(idx, { ...skill, name: e.target.value })}
                          />
                          <select
                            className="bg-white p-1.5 border border-neutral-200 rounded text-xs focus:outline-none"
                            value={skill.category}
                            onChange={(e) => updateSkill(idx, { ...skill, category: e.target.value })}
                          >
                            <option value="Languages">Languages</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Tools & DevOps">Tools & DevOps</option>
                            <option value="Other">Other</option>
                          </select>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-neutral-500 whitespace-nowrap">Proficiency:</span>
                            <select
                              className="bg-white p-1.5 border border-neutral-200 rounded text-xs focus:outline-none flex-1"
                              value={skill.level}
                              onChange={(e) => updateSkill(idx, { ...skill, level: parseInt(e.target.value) })}
                            >
                              <option value="1">1/5 (Beginner)</option>
                              <option value="2">2/5 (Familiar)</option>
                              <option value="3">3/5 (Competent)</option>
                              <option value="4">4/5 (Experienced)</option>
                              <option value="5">5/5 (Expert)</option>
                            </select>
                          </div>
                        </div>
                        <button
                          onClick={() => removeSkill(idx)}
                          className="p-1.5 text-neutral-400 hover:text-red-500 rounded bg-white hover:bg-neutral-100 border border-neutral-200 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-neutral-900">Career Timeline</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addExperience('work')}
                        className="flex items-center gap-1 text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        + Work
                      </button>
                      <button
                        onClick={() => addExperience('education')}
                        className="flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        + Education
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {profile.experiences.map((exp, idx) => (
                      <div key={exp.id} className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-3 relative">
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-red-500 rounded bg-white hover:bg-neutral-100 border border-neutral-200 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-500 uppercase">Role / Degree Title</label>
                            <input
                              type="text"
                              className="w-full p-2 bg-white border border-neutral-200 rounded mt-0.5"
                              value={exp.role}
                              onChange={(e) => updateExperience(idx, { ...exp, role: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-500 uppercase">Company / Institution</label>
                            <input
                              type="text"
                              className="w-full p-2 bg-white border border-neutral-200 rounded mt-0.5"
                              value={exp.company}
                              onChange={(e) => updateExperience(idx, { ...exp, company: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-500 uppercase">Employment Period</label>
                            <input
                              type="text"
                              className="w-full p-2 bg-white border border-neutral-200 rounded mt-0.5"
                              value={exp.period}
                              onChange={(e) => updateExperience(idx, { ...exp, period: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-500 uppercase">Location</label>
                            <input
                              type="text"
                              className="w-full p-2 bg-white border border-neutral-200 rounded mt-0.5"
                              value={exp.location}
                              onChange={(e) => updateExperience(idx, { ...exp, location: e.target.value })}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Impact Highlights (Line-by-line)</label>
                          <textarea
                            rows={3}
                            className="w-full p-2 bg-white border border-neutral-200 rounded text-xs font-sans resize-y"
                            value={(exp.description || []).join("\n")}
                            onChange={(e) => updateExperience(idx, { ...exp, description: e.target.value.split("\n") })}
                            placeholder="Write separate bullet points on separate lines"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-neutral-900">Custom Showcase Projects</h3>
                    <button
                      onClick={addProject}
                      className="flex items-center gap-1 text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Project
                    </button>
                  </div>

                  <div className="space-y-4">
                    {profile.projects.map((proj, idx) => (
                      <div key={proj.id} className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-3 relative">
                        <button
                          onClick={() => removeProject(proj.id)}
                          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-red-500 rounded bg-white hover:bg-neutral-100 border border-neutral-200 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-500 uppercase">Project Title</label>
                            <input
                              type="text"
                              className="w-full p-2 bg-white border border-neutral-200 rounded mt-0.5"
                              value={proj.title}
                              onChange={(e) => updateProject(idx, { ...proj, title: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-500 uppercase">Category</label>
                            <select
                              className="w-full p-2 bg-white border border-neutral-200 rounded mt-0.5"
                              value={proj.category}
                              onChange={(e) => updateProject(idx, { ...proj, category: e.target.value as any })}
                            >
                              <option value="frontend">Frontend</option>
                              <option value="backend">Backend</option>
                              <option value="fullstack">Full-Stack</option>
                              <option value="design">UI/UX Design</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-500 uppercase">Live Showcase Link</label>
                            <input
                              type="text"
                              className="w-full p-2 bg-white border border-neutral-200 rounded mt-0.5"
                              value={proj.liveUrl || ""}
                              placeholder="https://..."
                              onChange={(e) => updateProject(idx, { ...proj, liveUrl: e.target.value || undefined })}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-500 uppercase">GitHub Repository Link</label>
                            <input
                              type="text"
                              className="w-full p-2 bg-white border border-neutral-200 rounded mt-0.5"
                              value={proj.githubUrl || ""}
                              placeholder="https://github.com/..."
                              onChange={(e) => updateProject(idx, { ...proj, githubUrl: e.target.value || undefined })}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs items-center">
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-500 uppercase">Image URL</label>
                            <input
                              type="text"
                              className="w-full p-2 bg-white border border-neutral-200 rounded mt-0.5"
                              value={proj.imageUrl || ""}
                              placeholder="Unsplash / local image URL"
                              onChange={(e) => updateProject(idx, { ...proj, imageUrl: e.target.value || undefined })}
                            />
                          </div>
                          <div className="flex items-center gap-2 pt-4">
                            <input
                              type="checkbox"
                              id={`check-featured-${proj.id}`}
                              className="rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                              checked={proj.featured}
                              onChange={(e) => updateProject(idx, { ...proj, featured: e.target.checked })}
                            />
                            <label htmlFor={`check-featured-${proj.id}`} className="text-xs font-semibold text-neutral-700 select-none">
                              Highlight in Featured Projects
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-0.5">Short Description</label>
                          <input
                            type="text"
                            className="w-full p-2 bg-white border border-neutral-200 rounded text-xs"
                            value={proj.description}
                            onChange={(e) => updateProject(idx, { ...proj, description: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-0.5">Detailed Tech Summary (optional)</label>
                          <textarea
                            rows={2}
                            className="w-full p-2 bg-white border border-neutral-200 rounded text-xs"
                            value={proj.longDescription || ""}
                            onChange={(e) => updateProject(idx, { ...proj, longDescription: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-0.5">Tags / Technologies (comma separated)</label>
                          <input
                            type="text"
                            className="w-full p-2 bg-white border border-neutral-200 rounded text-xs"
                            value={proj.tags.join(", ")}
                            onChange={(e) => updateProject(idx, { ...proj, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-neutral-900">Achievements / Recognitions</h3>
                    <button
                      onClick={addAchievement}
                      className="flex items-center gap-1 text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Achievement
                    </button>
                  </div>

                  <div className="space-y-4">
                    {profile.achievements.map((ach, idx) => (
                      <div key={ach.id} className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-3 relative">
                        <button
                          onClick={() => removeAchievement(ach.id)}
                          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-red-500 rounded bg-white hover:bg-neutral-100 border border-neutral-200 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div className="col-span-2">
                            <label className="block text-[10px] font-bold text-neutral-500 uppercase">Award / Cert Name</label>
                            <input
                              type="text"
                              className="w-full p-2 bg-white border border-neutral-200 rounded mt-0.5"
                              value={ach.title}
                              onChange={(e) => updateAchievement(idx, { ...ach, title: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-500 uppercase">Date</label>
                            <input
                              type="text"
                              className="w-full p-2 bg-white border border-neutral-200 rounded mt-0.5"
                              value={ach.date}
                              onChange={(e) => updateAchievement(idx, { ...ach, date: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 text-xs">
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-500 uppercase">Issuer Corporation</label>
                            <input
                              type="text"
                              className="w-full p-2 bg-white border border-neutral-200 rounded mt-0.5"
                              value={ach.issuer}
                              onChange={(e) => updateAchievement(idx, { ...ach, issuer: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-500 uppercase">Context / Significance Description</label>
                            <input
                              type="text"
                              className="w-full p-2 bg-white border border-neutral-200 rounded mt-0.5"
                              value={ach.description || ""}
                              onChange={(e) => updateAchievement(idx, { ...ach, description: e.target.value || undefined })}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Lower Confirmer */}
            <div className="p-4 border-t border-neutral-100 bg-neutral-50/80 flex justify-end">
              <button
                id="btn-confirm-save-close"
                onClick={onClose}
                className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-sm rounded-lg transition-all shadow-sm flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Done Customizing
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
