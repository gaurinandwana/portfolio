import React, { useState } from "react";
import { PortfolioProfile, Skill } from "../types";
import { Cpu, Code, Database, Terminal, Flame } from "lucide-react";

interface SkillsSectionProps {
  profile: PortfolioProfile;
}

export default function SkillsSection({ profile }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(profile.skills.map((s) => s.category)))];

  const filteredSkills = selectedCategory === "All"
    ? profile.skills
    : profile.skills.filter((s) => s.category === selectedCategory);

  // Helper to resolve logical icon for each category dynamically
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "languages":
        return <Code className="w-4 h-4" />;
      case "frontend":
        return <Cpu className="w-4 h-4" />;
      case "backend":
        return <Database className="w-4 h-4" />;
      case "tools & devops":
        return <Terminal className="w-4 h-4" />;
      default:
        return <Flame className="w-4 h-4" />;
    }
  };

  return (
    <section id="skills-section" className="py-20 bg-white border-y border-neutral-100">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              Core Technical Skills
            </h2>
            <p className="text-sm text-neutral-500 max-w-lg font-sans">
              A comprehensive matrix of my development disciplines. Tap any category below to filter or inspect proficiency levels.
            </p>
          </div>

          {/* Quick tab filters */}
          <div className="flex flex-wrap gap-1.5 self-start md:self-auto overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide border transition-all ${
                  selectedCategory === cat
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-neutral-50 text-neutral-500 border-neutral-150 hover:bg-neutral-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              className="p-5 bg-neutral-50 rounded-xl border border-neutral-200 hover:border-neutral-300 transition-all duration-300 hover:shadow-sm flex flex-col justify-between group"
            >
              {/* Upper row */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span 
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white font-mono text-neutral-500 border border-neutral-200/80 shadow-xs group-hover:bg-indigo-50/20"
                  >
                    {getCategoryIcon(skill.category)}
                    {skill.category}
                  </span>
                  
                  {/* Proficiency descriptor badge */}
                  <span className="font-mono text-neutral-400 font-semibold uppercase">
                    {skill.level === 5 ? "Expert" : skill.level === 4 ? "Advanced" : "Competent"}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-neutral-800 font-sans group-hover:text-neutral-900">
                  {skill.name}
                </h3>
              </div>

              {/* Lower visual indicator */}
              <div className="mt-6 space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-bold text-neutral-400 font-mono">
                  <span>Proficiency</span>
                  <span style={{ color: profile.themeColor }}>{skill.level * 20}%</span>
                </div>
                
                {/* Visual bar tracker */}
                <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${skill.level * 20}%`,
                      backgroundColor: profile.themeColor,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic skills context message */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-sm text-neutral-400 font-mono">
            No active skills found for the selected category. Customise it inside the builder!
          </div>
        )}
      </div>
    </section>
  );
}
