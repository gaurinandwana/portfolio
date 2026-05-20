import React, { useState } from "react";
import { PortfolioProfile, Project } from "../types";
import { ExternalLink, Github, Sparkles, FolderGit2, X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectsSectionProps {
  profile: PortfolioProfile;
}

export default function ProjectsSection({ profile }: ProjectsSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeDetailedProject, setActiveDetailedProject] = useState<Project | null>(null);

  const filterTypes = ["all", "frontend", "backend", "fullstack", "design"];

  const filteredProjects = selectedFilter === "all"
    ? profile.projects
    : profile.projects.filter(p => p.category.toLowerCase() === selectedFilter);

  return (
    <section id="projects-section" className="py-20 bg-neutral-50/30 font-sans">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Title row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Featured Projects</h2>
            <p className="text-sm text-neutral-500 max-w-lg">
              A curated showcase of applications, tools, and visual frameworks built to solve interactive challenges.
            </p>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap gap-1.5 self-start md:self-auto overflow-x-auto">
            {filterTypes.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide border transition-all capitalize ${
                  selectedFilter === filter
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50"
                }`}
              >
                {filter === "all" ? "All Projects" : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => setActiveDetailedProject(p)}
              className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Visual Header Image */}
                <div className="relative h-44 w-full bg-neutral-900 overflow-hidden">
                  <img
                    src={p.imageUrl || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"}
                    alt={p.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category overlay */}
                  <span className="absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 bg-white/90 text-neutral-800 rounded-full font-mono backdrop-blur-xs shadow-xs">
                    {p.category}
                  </span>

                  {p.featured && (
                    <span 
                      className="absolute top-4 right-4 flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 text-white rounded-full font-sans shadow-md"
                      style={{ backgroundColor: profile.themeColor }}
                    >
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Inner Info content */}
                <div className="px-6 space-y-2">
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>

              {/* Tag pills list */}
              <div className="px-6 pb-6 pt-4 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-neutral-100 hover:bg-neutral-200 text-neutral-600 px-2 py-0.5 rounded font-mono transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                  {p.tags.length > 3 && (
                    <span className="text-[10px] text-neutral-400 font-mono mt-0.5">+{p.tags.length - 3} more</span>
                  )}
                </div>

                <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1 group-hover:underline" style={{ color: profile.themeColor }}>
                  View Project Case Study
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty placeholder */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-neutral-150 p-6 flex flex-col items-center justify-center space-y-3">
            <AlertCircle className="w-10 h-10 text-neutral-400" />
            <h3 className="text-base font-bold text-neutral-700">No Projects Found</h3>
            <p className="text-xs text-neutral-500 max-w-xs leading-relaxed font-mono">
              There are no projects customized under "{selectedFilter}". Toggle "Live Builder" in the top bar to add your custom application!
            </p>
          </div>
        )}

        {/* Popup Case Study Drawer */}
        <AnimatePresence>
          {activeDetailedProject && (
            <>
              {/* Backing shading layer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-neutral-950 z-50 cursor-pointer"
                onClick={() => setActiveDetailedProject(null)}
              />

              {/* Central detailed overlay */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                className="fixed inset-y-0 right-0 w-full max-w-lg md:max-w-xl bg-white shadow-2xl z-50 flex flex-col overflow-hidden"
              >
                {/* Header card with background */}
                <div className="relative h-60 bg-neutral-900 overflow-hidden shrink-0">
                  <img
                    src={activeDetailedProject.imageUrl || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"}
                    alt={activeDetailedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-6">
                    <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 bg-white/20 text-white rounded-full font-mono backdrop-blur-md self-start mb-2 border border-white/20">
                      {activeDetailedProject.category}
                    </span>
                    <h2 className="text-2xl font-bold text-white text-shadow-md">
                      {activeDetailedProject.title}
                    </h2>
                  </div>
                  
                  {/* Close button overlay */}
                  <button
                    onClick={() => setActiveDetailedProject(null)}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition z-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Case Study Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest font-mono">Overview</h3>
                    <p className="text-sm text-neutral-700 leading-relaxed font-sans">
                      {activeDetailedProject.longDescription || activeDetailedProject.description}
                    </p>
                  </div>

                  {/* Skills/Tags highlights */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest font-mono">Engineering Tools</h3>
                    <div className="flex flex-wrap gap-2">
                      {activeDetailedProject.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-neutral-100 border border-neutral-150 rounded text-xs fonts-mono font-medium text-neutral-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions links panel */}
                  <div className="border-t border-neutral-100 pt-6 flex flex-wrap gap-4 text-sm font-semibold">
                    {activeDetailedProject.liveUrl && (
                      <a
                        href={activeDetailedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white shadow-sm transition"
                        style={{ backgroundColor: profile.themeColor }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Launch Live Demo
                      </a>
                    )}
                    {activeDetailedProject.githubUrl && (
                      <a
                        href={activeDetailedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 transition"
                      >
                        <Github className="w-4 h-4" />
                        Explore Repository
                      </a>
                    )}
                  </div>
                </div>

                {/* Sticky Drawer lower Closer */}
                <div className="p-4 border-t border-neutral-100 bg-neutral-50 flex justify-end shrink-0">
                  <button
                    onClick={() => setActiveDetailedProject(null)}
                    className="px-4 py-2 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 transition"
                  >
                    Close Sheet
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
