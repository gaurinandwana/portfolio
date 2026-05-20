import React from "react";
import { PortfolioProfile } from "../types";
import { Award, ShieldCheck, Milestone, Calendar, Sparkles } from "lucide-react";

interface AchievementsSectionProps {
  profile: PortfolioProfile;
}

export default function AchievementsSection({ profile }: AchievementsSectionProps) {
  return (
    <section id="achievements-section" className="py-20 bg-neutral-50/50 border-b border-neutral-100 font-sans">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Accompanying titles */}
        <div className="space-y-3 mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Milestones & Honors
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Notable Achievements</h2>
          <p className="text-sm text-neutral-500 max-w-lg mx-auto leading-relaxed">
            Prizes, specialized certifications, and peer-to-peer industry recognitions earned over my developer career.
          </p>
        </div>

        {/* Accolades grid spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-6 bg-white rounded-xl border border-neutral-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Visual Icon Badge */}
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white/95 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: `${profile.themeColor}dd` }}
                >
                  <Award className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors">
                    {ach.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-bold font-mono uppercase tracking-wide">
                    Issued by: {ach.issuer}
                  </p>
                </div>

                {ach.description && (
                  <p className="text-sm text-neutral-500 leading-relaxed font-sans pt-1">
                    {ach.description}
                  </p>
                )}
              </div>

              {/* Lower date overlay stamp */}
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                <Calendar className="w-3.5 h-3.5 text-neutral-300" />
                {ach.date}
              </div>
            </div>
          ))}
        </div>

        {/* Empty placeholder */}
        {profile.achievements.length === 0 && (
          <div className="text-center py-12 text-sm text-neutral-400 font-mono">
            No accolades loaded. Customize inside the panel to load your awards!
          </div>
        )}

      </div>
    </section>
  );
}
