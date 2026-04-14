import React from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Medal, 
  Zap, 
  Map as MapIcon, 
  Swords, 
  Gamepad2, 
  Flame, 
  CreditCard,
  CheckCircle2,
  Star,
  ChevronRight,
  LayoutDashboard,
  MessageSquare,
  Settings,
  LogOut
} from 'lucide-react';
import { UserProfile, Language, LeaderboardEntry, Badge, DailyChallenge } from '../types';
import { cn } from '../lib/utils';

interface DashboardProps {
  user: UserProfile;
  language: Language;
  onNavigate: (view: any) => void;
}

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { userId: '1', name: 'Алихан М.', merit: 1250, rank: 1 },
  { userId: '2', name: 'Мадина С.', merit: 1100, rank: 2 },
  { userId: '3', name: 'Нурасыл Б.', merit: 950, rank: 3 },
  { userId: '4', name: 'Айгерим К.', merit: 800, rank: 4 },
  { userId: '5', name: 'Данияр Т.', merit: 750, rank: 5 },
];

const MOCK_BADGES: Badge[] = [
  { id: '1', name: { ru: 'Первый автономный робот', kk: 'Бірінші автономды робот', en: 'First Autonomous Robot' }, description: { ru: 'Успешно запущен автономный код', kk: 'Автономды код сәтті іске қосылды', en: 'Successfully launched autonomous code' }, icon: 'Bot', rarity: 'common' },
  { id: '2', name: { ru: 'Guru кода', kk: 'Код гуруы', en: 'Code Guru' }, description: { ru: 'Написано 1000+ строк кода', kk: '1000+ жол код жазылды', en: 'Wrote 1000+ lines of code' }, icon: 'Code', rarity: 'rare' },
  { id: '3', name: { ru: 'Alliance Captain', kk: 'Альянс капитаны', en: 'Alliance Captain' }, description: { ru: 'Лидерство на соревновании', kk: 'Жарыстағы көшбасшылық', en: 'Leadership at competition' }, icon: 'Users', rarity: 'epic' },
];

const MOCK_CHALLENGE: DailyChallenge = {
  id: 'daily-1',
  title: { ru: 'Повороты на 90°', kk: '90° бұрылыстар', en: '90° Turns' },
  description: { ru: 'Запрограммируй точный поворот робота на 90 градусов с использованием гироскопа.', kk: 'Гироскопты пайдаланып роботтың 90 градусқа дәл бұрылуын бағдарламалаңыз.', en: 'Program a precise 90-degree turn using a gyroscope.' },
  xpReward: 500,
  type: 'coding'
};

const translations = {
  ru: {
    welcome: "С возвращением, {name}!",
    merit: "Merit баллы",
    streak: "Дней подряд",
    xp: "Опыт",
    dailyChallenge: "Ежедневный Robot Challenge",
    leaderboard: "Leaderboard Хаба",
    badges: "Твои достижения",
    progressMap: "Карта прогресса сезона",
    duels: "Межхабные дуэли",
    rpgRole: "Твоя роль: {role}",
    cards: "Карточки навыков",
    start: "Приступить",
    rank: "Место",
    top3Bonus: "Топ-3 получают доп. время с роботом!",
    seasonPath: "Путь к Worlds",
    active: "Активно",
    completed: "Завершено"
  },
  kk: {
    welcome: "Қош келдіңіз, {name}!",
    merit: "Merit ұпайлары",
    streak: "Күн қатарынан",
    xp: "Тәжірибе",
    dailyChallenge: "Күнделікті Robot Challenge",
    leaderboard: "Хаб Leaderboard",
    badges: "Сенің жетістіктерің",
    progressMap: "Маусымдық прогресс картасы",
    duels: "Хабаралық дуэльдер",
    rpgRole: "Сенің рөлің: {role}",
    cards: "Дағды карталары",
    start: "Бастау",
    rank: "Орын",
    top3Bonus: "Топ-3 роботпен қосымша уақыт алады!",
    seasonPath: "Worlds-қа жол",
    active: "Белсенді",
    completed: "Аяқталды"
  },
  en: {
    welcome: "Welcome back, {name}!",
    merit: "Merit Points",
    streak: "Day Streak",
    xp: "Experience",
    dailyChallenge: "Daily Robot Challenge",
    leaderboard: "Hub Leaderboard",
    badges: "Your Achievements",
    progressMap: "Season Progress Map",
    duels: "Inter-hub Duels",
    rpgRole: "Your Role: {role}",
    cards: "Skill Cards",
    start: "Start",
    rank: "Rank",
    top3Bonus: "Top 3 get extra robot time!",
    seasonPath: "Path to Worlds",
    active: "Active",
    completed: "Completed"
  }
};

export default function Dashboard({ user, language, onNavigate }: DashboardProps) {
  const t = translations[language];

  return (
    <div className="flex h-screen bg-neutral-950 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-neutral-900/50 flex flex-col p-6">
        <div className="mb-10">
          <h2 className="text-2xl font-display font-bold gold-text-gradient">GOLD AI</h2>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active onClick={() => {}} />
          <SidebarItem icon={MapIcon} label={t.progressMap} onClick={() => {}} />
          <SidebarItem icon={Trophy} label="Leaderboard" onClick={() => {}} />
          <SidebarItem icon={Medal} label="Badges" onClick={() => {}} />
          <SidebarItem icon={MessageSquare} label="Mentor Chat" onClick={() => onNavigate('selection')} />
          <SidebarItem icon={Swords} label={t.duels} onClick={() => {}} />
          <SidebarItem icon={CreditCard} label={t.cards} onClick={() => {}} />
        </nav>

        <div className="pt-6 border-t border-white/5 space-y-2">
          <SidebarItem icon={Settings} label="Settings" onClick={() => {}} />
          <SidebarItem icon={LogOut} label="Logout" onClick={() => onNavigate('landing')} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-display font-bold mb-2">
              {t.welcome.replace('{name}', user.name)}
            </h1>
            <p className="text-neutral-400 flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-gold-400" />
              {t.rpgRole.replace('{role}', user.rpgRole.title)} (Lvl {user.rpgRole.level})
            </p>
          </div>

          <div className="flex gap-4">
            <StatCard icon={Flame} value={user.streak} label={t.streak} color="text-orange-500" />
            <StatCard icon={Star} value={user.merit} label={t.merit} color="text-gold-400" />
            <StatCard icon={Zap} value={user.xp} label={t.xp} color="text-blue-400" />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Daily Challenge & Progress Map */}
          <div className="lg:col-span-2 space-y-8">
            {/* Daily Challenge */}
            <section className="glass p-6 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <Zap className="w-32 h-32 text-gold-400" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-gold-400 font-bold mb-4">
                  <Flame className="w-5 h-5" />
                  {t.dailyChallenge}
                </div>
                <h3 className="text-2xl font-bold mb-2">{MOCK_CHALLENGE.title[language]}</h3>
                <p className="text-neutral-400 mb-6 max-w-lg">
                  {MOCK_CHALLENGE.description[language]}
                </p>
                <div className="flex items-center gap-4">
                  <button className="px-6 py-2 rounded-xl gold-gradient text-neutral-950 font-bold hover:scale-105 transition-transform">
                    {t.start}
                  </button>
                  <span className="text-gold-400 font-mono">+{MOCK_CHALLENGE.xpReward} XP</span>
                </div>
              </div>
            </section>

            {/* Progress Map (Simplified Visual) */}
            <section className="glass p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <MapIcon className="w-5 h-5 text-gold-400" />
                  {t.progressMap}
                </h3>
                <span className="text-sm text-neutral-500">{t.seasonPath}</span>
              </div>
              
              <div className="relative py-10">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/5 -translate-y-1/2" />
                <div className="flex justify-between relative z-10">
                  <MapNode label="Arduino Basics" completed />
                  <MapNode label="Mechanics 101" completed />
                  <MapNode label="FTC Intro" active />
                  <MapNode label="Regionals" />
                  <MapNode label="Worlds" />
                </div>
              </div>
            </section>

            {/* Badges Gallery */}
            <section className="glass p-6 rounded-3xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Medal className="w-5 h-5 text-gold-400" />
                {t.badges}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {MOCK_BADGES.map((badge) => (
                  <div key={badge.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center text-center hover:bg-white/10 transition-colors">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center mb-3",
                      badge.rarity === 'legendary' ? "bg-gold-500/20 text-gold-400" :
                      badge.rarity === 'epic' ? "bg-purple-500/20 text-purple-400" :
                      badge.rarity === 'rare' ? "bg-blue-500/20 text-blue-400" : "bg-white/10 text-neutral-400"
                    )}>
                      <Medal className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold mb-1">{badge.name[language]}</h4>
                    <p className="text-[10px] text-neutral-500">{badge.description[language]}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Leaderboard */}
          <div className="space-y-8">
            <section className="glass p-6 rounded-3xl h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-gold-400" />
                  {t.leaderboard}
                </h3>
              </div>
              
              <p className="text-xs text-emerald-500 mb-6 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {t.top3Bonus}
              </p>

              <div className="space-y-4">
                {MOCK_LEADERBOARD.map((entry) => (
                  <div 
                    key={entry.userId} 
                    className={cn(
                      "flex items-center justify-between p-3 rounded-2xl transition-colors",
                      entry.userId === user.id ? "bg-gold-500/10 border border-gold-500/20" : "hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "w-6 text-center font-mono font-bold",
                        entry.rank === 1 ? "text-gold-400" :
                        entry.rank === 2 ? "text-neutral-300" :
                        entry.rank === 3 ? "text-orange-400" : "text-neutral-600"
                      )}>
                        {entry.rank}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                        {entry.name[0]}
                      </div>
                      <span className="text-sm font-medium">{entry.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gold-400">{entry.merit}</span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-8 py-3 rounded-2xl border border-white/5 text-sm font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                View Full Leaderboard
                <ChevronRight className="w-4 h-4" />
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
        active 
          ? "bg-gold-500 text-neutral-950 shadow-lg shadow-gold-500/20" 
          : "text-neutral-400 hover:text-neutral-200 hover:bg-white/5"
      )}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );
}

function StatCard({ icon: Icon, value, label, color }: { icon: any, value: number | string, label: string, color: string }) {
  return (
    <div className="glass px-4 py-2 rounded-2xl flex items-center gap-3">
      <div className={cn("p-2 rounded-xl bg-white/5", color)}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="text-lg font-bold leading-none">{value}</div>
        <div className="text-[10px] text-neutral-500 uppercase tracking-wider">{label}</div>
      </div>
    </div>
  );
}

function MapNode({ label, active, completed }: { label: string, active?: boolean, completed?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3 relative">
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center transition-all border-4",
        completed ? "bg-emerald-500 border-emerald-500/20 text-white" :
        active ? "bg-gold-500 border-gold-500/20 text-neutral-950 scale-125 shadow-lg shadow-gold-500/40" :
        "bg-neutral-900 border-white/5 text-neutral-600"
      )}>
        {completed ? <CheckCircle2 className="w-5 h-5" /> : <Star className="w-5 h-5" />}
      </div>
      <span className={cn(
        "text-[10px] font-bold uppercase tracking-tighter absolute -bottom-6 whitespace-nowrap",
        active ? "text-gold-400" : "text-neutral-600"
      )}>
        {label}
      </span>
    </div>
  );
}
