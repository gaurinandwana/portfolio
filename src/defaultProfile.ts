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
      title: "Interactive Study Planner",
      description: "A student-centric scheduling app designed to streamline task management, track exam targets, and calculate study progress.",
      longDescription: "A fully responsive personal organization application designed to help university students optimize their weekly study sessions, balance project deadlines, and view performance milestones visually.",
      tags: ["React.js", "Tailwind CSS", "TypeScript", "Local Storage"],
      category: "frontend",
      liveUrl: undefined,
      githubUrl: "https://github.com/gaurinandwana",
      imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
    {
      id: "gauri_proj_2",
      title: "Algorithm Visualizer Canvas",
      description: "An interactive, web-based tool demonstrating sorting and search algorithms to make computer science theory intuitive.",
      longDescription: "A hands-on visualization tool demonstrating algorithms like Bubble Sort, Quick Sort, and Binary Search, enabling students to inspect real-time variable swaps and step-by-step executions.",
      tags: ["HTML/CSS", "JavaScript", "Animation", "Canvas"],
      category: "design",
      liveUrl: undefined,
      githubUrl: "https://github.com/gaurinandwana",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      featured: true,
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
