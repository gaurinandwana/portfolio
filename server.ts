import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Safe wrapper for Gemini SDK initialization (lazy initialization to avoid boot crashes)
  function getGeminiClient() {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY" || key.trim() === "") {
      return null;
    }
    return new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // API to handle chatbot conversations
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, profile } = req.body;

      if (!profile) {
        return res.status(400).json({ error: "Candidate profile data is required" });
      }

      const client = getGeminiClient();
      if (!client) {
        // Return a reassuring fallback mock response if API key is not configured yet
        const lastUserMessage = messages[messages.length - 1]?.text || "Hello";
        return res.json({
          text: `[Fallback Response - Gemini API Key Not Configured] Hello! I am the AI Recruiter Agent for ${profile.name}. Normally, I can answer any questions about ${profile.name}'s experiences in ${profile.experiences?.[0]?.company || "their career"}, projects like "${profile.projects?.[0]?.title || "their highlighted work"}", or skills such as ${profile.skills?.[0]?.name || "development"}. \n\nSince no GEMINI_API_KEY was found in the environment secrets, I am running in Offline Mode. Let me know if you would like to edit the achievements, projects, or contact info in the top panel!`,
        });
      }

      // Format messages into contents for the Gemini SDK
      // The Gemini chat API expects a structure of previous interactions.
      // We can map our messages to the 'parts' formatting.
      const contents = messages.map((m: any) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      // Build system instruction representing the full portfolio details
      const skillsStr = profile.skills
        .map((s: any) => `- ${s.name} (Level: ${s.level}/5, Category: ${s.category})`)
        .join("\n");

      const projectsStr = profile.projects
        .map(
          (p: any) =>
            `- **${p.title}** (${p.category}): ${p.description}\n  *Detail*: ${p.longDescription || ""}\n  *Tags*: ${p.tags.join(", ")}`
        )
        .join("\n\n");

      const experienceStr = profile.experiences
        .map(
          (e: any) =>
            `- **${e.role}** at ${e.company} (${e.period}, ${e.location})\n  *Highlights*:\n  ${(e.description || []).map((d: string) => `  * ${d}`).join("\n")}`
        )
        .join("\n\n");

      const achievementsStr = profile.achievements
        .map((a: any) => `- **${a.title}** issued by ${a.issuer} (${a.date})${a.description ? `: ${a.description}` : ""}`)
        .join("\n");

      const systemInstruction = `You are a charming, professional, and knowledgeable AI Recruiter Agent representing the software engineer matches ${profile.name}.
Your job is to answer questions from recruiters, hiring managers, and visitors about ${profile.name}'s professional background, skills, work, achievements, and contact information.

Here is ${profile.name}'s complete portfolio profile data:
---
Name: ${profile.name}
Role: ${profile.role}
At Current Company: ${profile.company || "N/A"}
Tagline: ${profile.tagline}
About: ${profile.aboutText}

Skills Matrix:
${skillsStr}

Featured & Completed Projects:
${projectsStr}

Work & Educational Experiences:
${experienceStr}

Notable Achievements & Certifications:
${achievementsStr}

Contact Information:
- Email: ${profile.contact.email}
- Phone: ${profile.contact.phone || "N/A"}
- Location: ${profile.contact.location}
- GitHub: ${profile.contact.github || "N/A"}
- LinkedIn: ${profile.contact.linkedin || "N/A"}
- Twitter: ${profile.contact.twitter || "N/A"}
---

Guidance for your persona:
1. Always stay in character. Speak in the first person ("I am ${profile.name}'s AI Agent...", "Alex built that project because...") or third person respectfully, but frame it as being their dedicated agent.
2. Be highly professional, technical, clear, and slightly enthusiastic about hiring opportunities.
3. Keep responses concise but fully informative. Use rich markdown list formatting, bold typography, and code/span highlights when displaying technical skills.
4. If asked about contact details, suggest they reach out to ${profile.name} directly via Email (${profile.contact.email}).
5. If someone asks a question out of scope (e.g., general cooking recipes, global politics, sports), politely guide them back to ${profile.name}'s professional background.

Helpful, honest, and persuasive to sell ${profile.name}'s talent!`;

      // Call Gemini 3.5 Flash
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      const responseText = response.text || "I was unable to generate a response. Please check back shortly.";

      res.json({ text: responseText });
    } catch (error: any) {
      console.error("Gemini API Error details:", error);
      res.status(500).json({ error: error?.message || "Internal Server Error" });
    }
  });

  // Integration of Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving of built assets
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
