import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, ArrowLeft, Bot, User, Loader2, Sparkles, Map, CheckCircle2, Circle, BookOpen, PenTool, Rocket as RocketIcon } from 'lucide-react';
import { MentorRole, Message, Language, Mentor, Level } from '../types';
import { getMentorResponse } from '../services/geminiService';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';
import Mermaid from './Mermaid';

interface ChatInterfaceProps {
  mentor: Mentor;
  language: Language;
  onBack: () => void;
}

const translations = {
  ru: {
    welcome: "Привет! Я твой {role}. Чем я могу помочь тебе сегодня?",
    placeholder: "Задайте вопрос ментору...",
    error: "Произошла ошибка при получении ответа. Пожалуйста, проверьте API ключ.",
    fallback: "Извини, я не смог обработать твой запрос.",
    poweredBy: "Работает на базе Gemini 3 Flash",
    roadmap: "Карта обучения",
    theory: "Теория",
    practice: "Практика",
    project: "Проект",
    hubMessage: "Отправляйся в Хаб за большими знаниями!",
    close: "Закрыть",
    verified: "Проверено ментором",
    locked: "Ожидает проверки"
  },
  kk: {
    welcome: "Сәлем! Мен сенің {role} тәлімгеріңмін. Бүгін саған қалай көмектесе аламын?",
    placeholder: "Тәлімгерге сұрақ қойыңыз...",
    error: "Жауап алу кезінде қате пайда болды. API кілтін тексеріңіз.",
    fallback: "Кешіріңіз, мен сіздің сұранысыңызды өңдей алмадым.",
    poweredBy: "Gemini 3 Flash негізінде жұмыс істейді",
    roadmap: "Оқу картасы",
    theory: "Теория",
    practice: "Тәжірибе",
    project: "Жоба",
    hubMessage: "Үлкен білім алу үшін Хабқа бар!",
    close: "Жабу",
    verified: "Тәлімгер тексерді",
    locked: "Тексеруді күтуде"
  },
  en: {
    welcome: "Hello! I am your {role}. How can I help you today?",
    placeholder: "Ask the mentor a question...",
    error: "An error occurred while getting the response. Please check the API key.",
    fallback: "Sorry, I couldn't process your request.",
    poweredBy: "Powered by Gemini 3 Flash",
    roadmap: "Learning Roadmap",
    theory: "Theory",
    practice: "Practice",
    project: "Project",
    hubMessage: "Head to the Hub for greater knowledge!",
    close: "Close",
    verified: "Mentor Verified",
    locked: "Awaiting Verification"
  }
};

export default function ChatInterface({ mentor, language, onBack }: ChatInterfaceProps) {
  const t = translations[language];
  const roleName = mentor.title[language];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      content: t.welcome.replace('{role}', roleName),
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const response = await getMentorResponse(mentor.id, language, input, history);
      
      let finalResponse = response || t.fallback;
      
      // Parse level completion tag: [LEVEL_COMPLETE: X]
      const levelMatch = finalResponse.match(/\[LEVEL_COMPLETE:\s*(\d+)\]/);
      if (levelMatch) {
        const levelId = parseInt(levelMatch[1]);
        if (!completedLevels.includes(levelId)) {
          handleLevelComplete(levelId);
        }
        // Remove tag from display
        finalResponse = finalResponse.replace(/\[LEVEL_COMPLETE:\s*\d+\]/g, '').trim();
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: finalResponse,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: t.error,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLevelComplete = (id: number) => {
    setCompletedLevels(prev => {
      if (prev.includes(id)) return prev;
      const newCompleted = [...prev, id];
      
      if (newCompleted.length === 3 && !prev.includes(3)) {
        // Hub message is now handled by the AI via REGULATOR_INSTRUCTION, 
        // but we can keep a fallback or UI trigger if needed.
      }
      return newCompleted;
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-4xl mx-auto px-4 relative">
      {/* Header */}
      <header className="py-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
              <Bot className="w-6 h-6 text-neutral-950" />
            </div>
            <div>
              <h3 className="font-bold">{roleName}</h3>
              <div className="flex items-center gap-1.5 text-xs text-emerald-500">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </div>
            </div>
          </div>
        </div>

        {mentor.levels && (
          <button
            onClick={() => setShowRoadmap(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass border-gold-500/30 text-gold-400 hover:bg-gold-500/10 transition-all"
          >
            <Map className="w-4 h-4" />
            <span className="text-sm font-medium">{t.roadmap}</span>
          </button>
        )}
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-6 space-y-6 scrollbar-hide">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex gap-4 max-w-[90%]",
              msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-lg shrink-0 flex items-center justify-center",
              msg.role === 'user' ? "bg-gold-500/20" : "bg-white/5"
            )}>
              {msg.role === 'user' ? <User className="w-5 h-5 text-gold-400" /> : <Bot className="w-5 h-5 text-neutral-400" />}
            </div>
            <div className={cn(
              "p-4 rounded-2xl text-sm leading-relaxed prose prose-invert prose-sm max-w-none",
              msg.role === 'user' 
                ? "bg-gold-500 text-neutral-950 font-medium rounded-tr-none" 
                : "glass rounded-tl-none"
            )}>
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    if (!inline && match && match[1] === 'mermaid') {
                      return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                    }
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex gap-4 mr-auto">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-gold-400 animate-spin" />
            </div>
            <div className="p-4 rounded-2xl glass rounded-tl-none">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400/50 animate-bounce" />
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400/50 animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400/50 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="py-6">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={t.placeholder}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 pr-14 text-sm focus:outline-none focus:border-gold-500/50 transition-colors resize-none min-h-[56px] max-h-32"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl gold-gradient text-neutral-950 disabled:opacity-50 disabled:grayscale transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[10px] text-center text-neutral-600 mt-2 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3" />
          {t.poweredBy}
        </p>
      </div>

      {/* Roadmap Modal */}
      <AnimatePresence>
        {showRoadmap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 glass backdrop-blur-xl p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Map className="text-gold-400" />
                {t.roadmap}
              </h2>
              <button
                onClick={() => {
                  setShowRoadmap(false);
                  setActiveLevel(null);
                }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {mentor.levels?.map((level) => (
                <div key={level.id} className="space-y-2">
                  <button
                    onClick={() => setActiveLevel(activeLevel?.id === level.id ? null : level)}
                    className={cn(
                      "w-full p-4 rounded-2xl border transition-all flex items-center justify-between",
                      completedLevels.includes(level.id) 
                        ? "bg-emerald-500/10 border-emerald-500/30" 
                        : "bg-white/5 border-white/10 hover:border-gold-500/30"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center font-bold",
                        completedLevels.includes(level.id) ? "bg-emerald-500 text-white" : "bg-white/10"
                      )}>
                        {completedLevels.includes(level.id) ? <CheckCircle2 className="w-6 h-6" /> : level.id}
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold">{level.title[language]}</h4>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-neutral-400">{level.description[language]}</p>
                          <span className={cn(
                            "text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider",
                            completedLevels.includes(level.id) 
                              ? "bg-emerald-500/20 text-emerald-400" 
                              : "bg-white/5 text-neutral-600"
                          )}>
                            {completedLevels.includes(level.id) ? t.verified : t.locked}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {activeLevel?.id === level.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gold-400 font-bold">
                              <BookOpen className="w-4 h-4" />
                              {t.theory}
                            </div>
                            <p className="text-neutral-400">{level.theory[language]}</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gold-400 font-bold">
                              <PenTool className="w-4 h-4" />
                              {t.practice}
                            </div>
                            <p className="text-neutral-400">{level.practice[language]}</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gold-400 font-bold">
                              <RocketIcon className="w-4 h-4" />
                              {t.project}
                            </div>
                            <p className="text-neutral-400">{level.project[language]}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


