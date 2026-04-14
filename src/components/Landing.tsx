import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, TrendingDown, Zap, GraduationCap, Rocket, Briefcase, Users2, Code, Cpu } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Language } from '../types';

const translations = {
  ru: {
    badge: "Gold Students Club AI",
    heroTitle: "Обеспечиваем масштабируемое и дешёвое обучение робототехнике",
    heroDesc: "Ваш персональный наставник 24/7 в сельских регионах. Геймификация, реальные достижения и путь к мировым чемпионатам.",
    cta: "Начать обучение",
    economicTitle: "Экономический эффект",
    economicDesc: "AI-ментор снижает зависимость от человеческих ресурсов и делает масштабирование линейным. Стоимость обучения падает в десятки раз.",
    now: "Сейчас: 300k ₸ / команда",
    nowDesc: "Зависимость от дефицитных специалистов",
    withAi: "С AI: 1 AI → 100 учеников",
    withAiDesc: "Масштабируемое и доступное решение",
    chartTitle: "Сравнение стоимости (₸ на команду)",
    humanMentor: "Человеческий ментор",
    aiMentor: "AI-ментор (Gold)",
    footer: "© 2026 Gold Students Club. Разработано для сельских регионов.",
    features: [
      { icon: Code, title: "Programming Mentor", desc: "Учит коду для роботов с нуля" },
      { icon: Cpu, title: "Robotics Mentor", desc: "Обучает механике и электронике" },
      { icon: Users2, title: "Team Mentor", desc: "Помогает в управлении командой" },
      { icon: Briefcase, title: "Career Mentor", desc: "Строит путь в STEM карьере" },
    ]
  },
  kk: {
    badge: "Gold Students Club AI",
    heroTitle: "AI-ментор жетіспейтін сараптама қабатын алмастырады",
    heroDesc: "Ауылдық аймақтарда робототехниканы ауқымды және арзан оқытуды қамтамасыз етеміз. Сіздің жеке тәлімгеріңіз 24/7.",
    cta: "Оқуды бастау",
    economicTitle: "Экономикалық тиімділік",
    economicDesc: "AI-ментор адам ресурстарына тәуелділікті азайтады және ауқымдануды желілік етеді. Оқу құны ондаған есе төмендейді.",
    now: "Қазір: 300k ₸ / команда",
    nowDesc: "Тапшы мамандарға тәуелділік",
    withAi: "AI-мен: 1 AI → 100 оқушы",
    withAiDesc: "Ауқымды және қолжетімді шешім",
    chartTitle: "Құн салыстыруы (командаға ₸)",
    humanMentor: "Адам тәлімгері",
    aiMentor: "AI-тәлімгер (Gold)",
    footer: "© 2026 Gold Students Club. Ауылдық аймақтар үшін әзірленген.",
    features: [
      { icon: Code, title: "Programming Mentor", desc: "Роботтарға арналған кодты нөлден үйретеді" },
      { icon: Cpu, title: "Robotics Mentor", desc: "Механика мен электрониканы үйретеді" },
      { icon: Users2, title: "Team Mentor", desc: "Команданы басқаруға көмектеседі" },
      { icon: Briefcase, title: "Career Mentor", desc: "STEM мансабында жол салады" },
    ]
  },
  en: {
    badge: "Gold Students Club AI",
    heroTitle: "AI Mentor Replaces the Missing Layer of Expertise",
    heroDesc: "Providing scalable and affordable robotics education in rural regions. Your personal tutor 24/7.",
    cta: "Start Learning",
    economicTitle: "Economic Impact",
    economicDesc: "AI mentor reduces dependence on human resources and makes scaling linear. Education costs drop significantly.",
    now: "Now: 300k ₸ / team",
    nowDesc: "Dependence on scarce specialists",
    withAi: "With AI: 1 AI → 100 students",
    withAiDesc: "Scalable and affordable solution",
    chartTitle: "Cost Comparison (₸ per team)",
    humanMentor: "Human Mentor",
    aiMentor: "AI Mentor (Gold)",
    footer: "© 2026 Gold Students Club. Developed for rural regions.",
    features: [
      { icon: Code, title: "Programming Mentor", desc: "Teaches robot coding from scratch" },
      { icon: Cpu, title: "Robotics Mentor", desc: "Teaches mechanics and electronics" },
      { icon: Users2, title: "Team Mentor", desc: "Helps with team management" },
      { icon: Briefcase, title: "Career Mentor", desc: "Builds a path in STEM career" },
    ]
  }
};

export default function Landing({ onStart, language }: { onStart: () => void; language: Language }) {
  const t = translations[language];
  
  const data = [
    { name: t.humanMentor, cost: 300000, color: '#4b5563' },
    { name: t.aiMentor, cost: 5000, color: '#eab308' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gold-500/10 blur-[120px] rounded-full -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl pt-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-gold-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>{t.badge}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
            {t.heroTitle.split(' ').map((word, i) => (
              i > 3 ? <span key={i} className="gold-text-gradient">{word} </span> : word + ' '
            ))}
          </h1>
          
          <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
            {t.heroDesc}
          </p>
          
          <button
            onClick={onStart}
            className="px-8 py-4 rounded-xl gold-gradient text-neutral-950 font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-gold-500/20"
          >
            {t.cta}
          </button>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl glass hover:border-gold-500/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mb-4 group-hover:bg-gold-500/20 transition-colors">
                <item.icon className="w-6 h-6 text-gold-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-neutral-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Economic Effect */}
      <section className="py-20 px-6 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-display font-bold mb-6">
              {t.economicTitle}
            </h2>
            <p className="text-lg text-neutral-400 mb-8">
              {t.economicDesc}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                  <TrendingDown className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{t.now}</h4>
                  <p className="text-neutral-500">{t.nowDesc}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{t.withAi}</h4>
                  <p className="text-neutral-500">{t.withAiDesc}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-[400px] glass rounded-3xl p-8">
            <h3 className="text-center font-bold mb-6 text-neutral-400">{t.chartTitle}</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="cost" radius={[8, 8, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/5 text-center text-neutral-500 text-sm">
        <p>{t.footer}</p>
      </footer>
    </div>
  );
}
