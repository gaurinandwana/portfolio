import React from "react";
import { PortfolioProfile } from "../types";
import { Briefcase, GraduationCap, MapPin, Calendar, Circle } from "lucide-react";
import { motion } from "motion/react";

interface ExperienceSectionProps {
  profile: PortfolioProfile;
}

export default function ExperienceSection({ profile }: ExperienceSectionProps) {
  // Group or sort the experiences chronological-wise. Normally, work is shown higher than education or merged chronologically
  const sortedExperiences = [...profile.experiences];

  const hasWorkExperience = sortedExperiences.some(exp => exp.type === "work");

  return (
    <section id="experience-section" className="py-20 bg-white border-b border-neutral-100 font-sans">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Title Block */}
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
            {hasWorkExperience ? "Career & Educational Journey" : "Academic & Educational Journey"}
          </h2>
          <p className="text-sm text-neutral-500 max-w-lg mx-auto leading-relaxed">
            {hasWorkExperience 
              ? "A chronological timeline of my professional work milestones, academic credentials, and core contributions."
              : "A dedicated timeline of my active study milestones, academic credentials, and collegiate activities."}
          </p>
        </div>

        {/* Timeline Line */}
        <div className="relative border-l-2 border-neutral-100 ml-4 md:ml-32 space-y-12 pb-6">
          {sortedExperiences.map((exp, index) => (
            <div key={exp.id} className="relative pl-8 group">
              
              {/* Timeline Indicator Node Bullet */}
              <div 
                className="absolute -left-3 top-1.5 w-5 h-5 rounded-full border-4 bg-white transition-all group-hover:scale-110 flex items-center justify-center"
                style={{ borderColor: profile.themeColor }}
              >
                <div 
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: profile.themeColor }}
                />
              </div>

              {/* Side date marker visible on larger desktop interfaces */}
              <div className="hidden md:block absolute -left-36 top-1.5 w-28 text-right pr-4">
                <span className="text-xs font-bold text-neutral-400 font-mono tracking-wider">{exp.period}</span>
              </div>

              {/* Timeline Card */}
              <div className="bg-neutral-50 hover:bg-neutral-100/75 border border-neutral-200 p-5 rounded-xl transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-200/50">
                  <div>
                    {/* Role title and Type Icon */}
                    <div className="flex items-center gap-2">
                      {exp.type === "work" ? (
                        <Briefcase className="w-4 h-4 text-neutral-500" />
                      ) : (
                        <GraduationCap className="w-4 h-4 text-neutral-500" />
                      )}
                      <h3 className="text-base font-bold text-neutral-900 leading-tight">
                        {exp.role}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2.5 text-xs text-neutral-500 font-mono mt-1.5">
                      <span className="font-semibold text-neutral-700">{exp.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Micro timeline mobile inline indicator */}
                  <div className="md:hidden flex items-center gap-1.5 text-xs font-bold text-neutral-400 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </div>
                </div>

                {/* Bullets lists */}
                {exp.description && exp.description.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm text-neutral-600 font-sans list-none">
                    {exp.description.map((bullet, bIdx) => {
                      if (!bullet.trim()) return null;
                      return (
                        <li key={bIdx} className="flex items-start gap-2 leading-relaxed">
                          <Circle className="w-1.5 h-1.5 text-neutral-400 mt-2 shrink-0 fill-neutral-400" />
                          <span>{bullet}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty placeholder */}
        {sortedExperiences.length === 0 && (
          <div className="text-center py-12 text-sm text-neutral-400 font-mono">
            No milestones configured. Click Customize in the header to map your experiences!
          </div>
        )}

      </div>
    </section>
  );
}
