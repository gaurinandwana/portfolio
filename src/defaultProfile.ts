import { PortfolioProfile } from "./types";

export const defaultProfile: PortfolioProfile = {
  name: "Gauri Nandwana",
  role: "Software Developer & AI Enthusiast",
  company: "VIT Bhopal University",
  tagline: "Building the future of software with clean code, modern web technologies, and generative AI systems.",
  aboutText: "I am a student currently pursuing my B.Tech in Computer Science from Vellore Institute of Technology (Bhopal campus) with a strong academic background, maintaining a CGPA of 8.5, and having a consistent record of excellence, including 96% in Class 10 and 92% in Class 12 CBSE. Honored with the title of 'Young Scientist of India' in 2023 by NITI Aayog, Government of India, I am passionate about science, innovation, and coding. I am eager to apply my learning to build clean, creative, and technical software solutions.",
  themeColor: "#06b6d4", // Cyan/Teal accent fits beautifully
  skills: [
    { name: "Python", level: 4, category: "Languages" },
    { name: "Java / C++", level: 4, category: "Languages" },
    { name: "JavaScript / TypeScript", level: 3, category: "Languages" },
    { name: "React.js / Vite", level: 3, category: "Frontend" },
    { name: "HTML & CSS / Tailwind", level: 5, category: "Frontend" },
    { name: "Git & GitHub VCS", level: 4, category: "Tools & DevOps" },
    { name: "Problem Solving", level: 4, category: "Tools & DevOps" },
    { name: "Team Collaboration", level: 5, category: "Other" },
    { name: "Public Speaking", level: 4, category: "Other" }
  ],
  projects: [
    {
      id: "gauri_proj_1",
      title: "Momentum Organizer App",
      description: "A comprehensive student-centric scheduling and study planner application designed to streamline task management, track exam targets, and calculate study progress.",
      longDescription: "A fully responsive personal organization application designed to help university students optimize their weekly study sessions, balance project deadlines, track class schedules, and leverage visual dashboards for performance metrics.",
      tags: ["React.js", "Tailwind CSS", "TypeScript", "Local Storage"],
      category: "frontend",
      liveUrl: undefined,
      githubUrl: "https://github.com/gaurinandwana/momentumm-organizer-app",
      imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
    {
      id: "gauri_proj_2",
      title: "Yojana AI",
      description: "An AI-powered application designed to streamline the discovery, eligibility analysis, and application processes of Indian government welfare programs (Yojanas) for citizens.",
      longDescription: "Yojana AI leverages state-of-the-art generative AI and natural language models to extract requirements and demystify government schemas. Citizens can enter demographic data to receive bespoke scheme matching and clear checklists.",
      tags: ["React.js", "Generative AI", "FastAPI", "Tailwind CSS", "TypeScript"],
      category: "fullstack",
      liveUrl: undefined,
      githubUrl: "https://github.com/gaurinandwana/yojana-ai",
      imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
      featured: false,
    }
  ],
  experiences: [
    {
      id: "gauri_exp_4",
      role: "B.Tech in Computer Science",
      company: "Vellore Institute of Technology",
      location: "VIT Bhopal Campus",
      period: "Sep 2024 - Apr 2028",
      description: [
        "Core study in Programming Languages, Data Structures, Web Development, and Algorithm design.",
        "Consistently maintaining high-tier academic excellence with an active 8.5 CGPA."
      ],
      type: "education"
    },
    {
      id: "gauri_exp_5",
      role: "High School & Higher Secondary",
      company: "Birla Balika Vidyapeeth",
      location: "Pilani, Rajasthan",
      period: "Graduated 2024",
      description: [
        "Completed Class 10 (CBSE) achieving an outstanding 96%.",
        "Completed Class 12 (CBSE) graduating with a stellar 92%."
      ],
      type: "education"
    }
  ],
  achievements: [
    {
      id: "gauri_ach_1",
      title: "Young Scientist of India (YSI 2023) Awardee",
      issuer: "NITI Aayog, Government of India",
      date: "2023",
      description: "Prestigious national recognition awarded by India's apex public policy think tank to honor exceptional innovative capability, curiosity, and scientific passion."
    },
    {
      id: "gauri_ach_2",
      title: "10th Class Academic Excellence Honor",
      issuer: "CBSE Board",
      date: "2022",
      description: "Secured a consistent top academic tier with an official record of 96% in matriculation."
    },
    {
      id: "gauri_ach_3",
      title: "12th Class High-Tier Graduation",
      issuer: "CBSE Board",
      date: "2024",
      description: "Graduated high school with a highly competitive score of 92% in the Senior School Certificate Examination."
    }
  ],
  contact: {
    email: "gaurinandwana4@gmail.com",
    phone: "9031717980",
    location: "Jaipur, Rajasthan, 302016",
    github: "github.com/gaurinandwana",
    linkedin: "linkedin.com/in/gaurinandwana"
  }
};
