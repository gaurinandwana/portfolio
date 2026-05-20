import React, { useState, useRef, useEffect } from "react";
import { PortfolioProfile, ChatMessage } from "../types";
import { MessageSquare, Send, X, Bot, HelpCircle, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface RecruiterChatWidgetProps {
  profile: PortfolioProfile;
}

export default function RecruiterChatWidget({ profile }: RecruiterChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome_msg",
      sender: "assistant",
      text: `Hello! 👋 I'm **${profile.name}'s AI Career Agent**. I am trained directly on ${profile.name}'s skills, projects, and work history. \n\nWhat would you like to know about ${profile.name}'s technical background or availability?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const presetQuestions = [
    "What are your core technical strengths?",
    "Tell me about your featured projects.",
    "Are you open to remote roles?",
    "How can I contact Webmaster?",
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: "msg_" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      // Build conversation history to send (latest 8 messages to prevent token bloat)
      const feedMessages = [...messages, userMsg].slice(-8).map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: feedMessages,
          profile: profile,
        }),
      });

      if (!res.ok) {
        throw new Error("API call failed");
      }

      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: "msg_reply_" + Date.now(),
        sender: "assistant",
        text: data.text || "I was unable to retrieve a response. Please type another question.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e) {
      // Connect offline mock answer
      const offlineMsg = `[Offline Mode] Thanks for asking! I'm ${profile.name}'s profile assistant. I am unable to connect to the active backend services right now, but ${profile.name}'s core skill sets include **${profile.skills.slice(0, 4).map(s => s.name).join(", ")}** and they can be reached directly at **${profile.contact.email}**!`;
      
      const assistantMsg: ChatMessage = {
        id: "msg_reply_error_" + Date.now(),
        sender: "assistant",
        text: offlineMsg,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Minimal Custom helper to render basic markdown bold and bullet lists safely
  const renderMarkdown = (text: string) => {
    return text.split("\n").map((line, lineIdx) => {
      // Detect bullet points
      const isBullet = line.trim().startsWith("*") || line.trim().startsWith("-");
      let lineContent = line;
      if (isBullet) {
        lineContent = line.trim().substring(1).trim();
      }

      // Replace basic bolds **word**
      const parts = lineContent.split(/\*\*([\s\S]*?)\*\*/g);
      const renderedParts = parts.map((part, partIdx) => {
        if (partIdx % 2 === 1) {
          return <strong key={partIdx} className="font-bold text-slate-900 bg-indigo-50 px-1 rounded">{part}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <li key={lineIdx} className="ml-4 list-disc text-sm text-slate-700 my-1 leading-relaxed">
            {renderedParts}
          </li>
        );
      }

      return (
        <p key={lineIdx} className="text-sm text-slate-700 min-h-[0.5rem] leading-relaxed my-1.5 font-sans">
          {renderedParts}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {/* Toggleable Chat panel */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[360px] sm:w-[400px] h-[520px] bg-white rounded-2xl shadow-xl border border-neutral-100 flex flex-col overflow-hidden"
          >
            {/* Widget Header */}
            <div className="bg-neutral-900 p-4 shrink-0 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center relative">
                  <Bot className="w-5 h-5 text-white" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-neutral-900 rounded-full animate-ping" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-neutral-900 rounded-full" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold flex items-center gap-1.5">
                    {profile.name} AI Agent
                    <span className="text-[9px] bg-indigo-500/30 text-indigo-300 font-mono text-uppercase tracking-wider px-1 rounded border border-indigo-500/50">
                      Gemini 3.5
                    </span>
                  </h3>
                  <p className="text-[10px] text-neutral-400">Ask anything about my career</p>
                </div>
              </div>
              <button
                id="close-chat-widget"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Conversational Screen */}
            <div className="flex-1 overflow-y-auto p-4 bg-neutral-50 space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm border ${
                      m.sender === "user"
                        ? "bg-neutral-900 text-white border-neutral-800 rounded-br-none"
                        : "bg-white text-slate-800 border-slate-100 rounded-bl-none"
                    }`}
                  >
                    <div className="space-y-1">
                      {m.sender === "assistant" ? (
                        renderMarkdown(m.text)
                      ) : (
                        <p className="text-sm leading-relaxed">{m.text}</p>
                      )}
                      <span
                        className={`text-[9px] block text-right mt-1 ${
                          m.sender === "user" ? "text-neutral-400" : "text-slate-400"
                        }`}
                      >
                        {m.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white max-w-[85%] rounded-2xl rounded-bl-none p-4 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                      <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                      <span>AI Agent is reviewing profile files...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Helper presets */}
            <div className="px-4 py-2 border-t border-neutral-100 bg-white flex flex-col gap-1 shrink-0">
              <div className="flex items-center gap-1 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">
                <HelpCircle className="w-3 h-3 text-neutral-400" />
                Suggested Queries:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {presetQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    disabled={isLoading}
                    className="text-[11px] font-medium text-indigo-600 hover:text-white bg-indigo-50 hover:bg-indigo-600 border border-indigo-100 hover:border-indigo-600 px-2.5 py-1 rounded-full text-left transition select-none disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Keyboard Entry */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-3 border-t border-neutral-100 bg-white flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                placeholder="Type your recruitment inquiry..."
                className="flex-1 bg-neutral-100 rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 select-text focus:outline-none focus:ring-2 focus:ring-indigo-300"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                id="btn-send-message"
                disabled={!inputText.trim() || isLoading}
                className="p-2.5 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating launcher Bubble icon */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        id="toggle-ai-recruiter-chat"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-3.5 rounded-full shadow-lg border border-neutral-800 hover:border-neutral-700 transition"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
        </span>
        <div className="flex items-center gap-1.5">
          <Bot className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold tracking-wide">Ask AI Agent</span>
        </div>
      </motion.button>
    </div>
  );
}
