import React, { useState } from 'react';
import Landing from './components/Landing';
import MentorSelection from './components/MentorSelection';
import ChatInterface from './components/ChatInterface';
import { MentorRole, Language, Mentor } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Globe } from 'lucide-react';

type View = 'landing' | 'selection' | 'chat';

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'ru', label: 'Русский' },
  { code: 'kk', label: 'Қазақша' },
  { code: 'en', label: 'English' },
];

const mentors: Mentor[] = [
  {
    id: 'programming',
    title: { ru: 'Programming Mentor', kk: 'Programming Mentor', en: 'Programming Mentor' },
    description: {
      ru: 'Учит коду для роботов (Java, C++) с нуля. Заменяет живого учителя программирования.',
      kk: 'Роботтарға арналған кодты (Java, C++) нөлден үйретеді. Тірі бағдарламалау мұғалімін алмастырады.',
      en: 'Teaches robot coding (Java, C++) from scratch. Replaces a live programming teacher.'
    },
    icon: 'Code',
    color: 'bg-blue-500',
    examples: {
      ru: ['Как написать автономный период?', 'Объясни циклы в Java'],
      kk: ['Автономды кезеңді қалай жазуға болады?', 'Java-дағы циклдарды түсіндір'],
      en: ['How to write autonomous period?', 'Explain loops in Java']
    },
    levels: [
      {
        id: 1,
        title: { ru: 'Основы синтаксиса', kk: 'Синтаксис негіздері', en: 'Syntax Basics' },
        description: { ru: 'Переменные, типы данных и вывод текста.', kk: 'Айнымалылар, деректер түрлері және мәтінді шығару.', en: 'Variables, data types, and text output.' },
        theory: { ru: 'Изучаем как компьютер хранит данные.', kk: 'Компьютер деректерді қалай сақтайтынын үйренеміз.', en: 'Learning how a computer stores data.' },
        practice: { ru: 'Напишите программу Hello World.', kk: 'Hello World бағдарламасын жазыңыз.', en: 'Write a Hello World program.' },
        project: { ru: 'Простой калькулятор.', kk: 'Қарапайым калькулятор.', en: 'Simple calculator.' }
      },
      {
        id: 2,
        title: { ru: 'Условия и циклы', kk: 'Шарттар мен циклдар', en: 'Conditions and Loops' },
        description: { ru: 'Логика принятия решений в коде.', kk: 'Кодта шешім қабылдау логикасы.', en: 'Decision-making logic in code.' },
        theory: { ru: 'Операторы if/else и циклы for/while.', kk: 'if/else операторлары және for/while циклдары.', en: 'if/else operators and for/while loops.' },
        practice: { ru: 'Создайте алгоритм обхода препятствия.', kk: 'Кедергілерді айналып өту алгоритмін жасаңыз.', en: 'Create an obstacle avoidance algorithm.' },
        project: { ru: 'Автономный квадрат.', kk: 'Автономды квадрат.', en: 'Autonomous square.' }
      },
      {
        id: 3,
        title: { ru: 'Функции и методы', kk: 'Функциялар мен әдістер', en: 'Functions and Methods' },
        description: { ru: 'Организация кода и повторное использование.', kk: 'Кодты ұйымдастыру және қайта пайдалану.', en: 'Code organization and reuse.' },
        theory: { ru: 'Как разбивать сложные задачи на простые.', kk: 'Күрделі тапсырмаларды қарапайым тапсырмаларға қалай бөлуге болады.', en: 'How to break complex tasks into simple ones.' },
        practice: { ru: 'Напишите функцию движения робота.', kk: 'Роботтың қозғалыс функциясын жазыңыз.', en: 'Write a robot movement function.' },
        project: { ru: 'Библиотека движений.', kk: 'Қозғалыс кітапханасы.', en: 'Movement library.' }
      }
    ]
  },
  {
    id: 'robotics',
    title: { ru: 'Robotics Mentor', kk: 'Robotics Mentor', en: 'Robotics Mentor' },
    description: {
      ru: 'Обучает механике, электронике и конструированию. Ваш наставник по железу.',
      kk: 'Механиканы, электрониканы және конструкциялауды үйретеді. Сіздің темір бойынша тәлімгеріңіз.',
      en: 'Teaches mechanics, electronics, and construction. Your hardware mentor.'
    },
    icon: 'Cpu',
    color: 'bg-gold-500',
    examples: {
      ru: ['Как работает гироскоп?', 'Подбери передаточное число'],
      kk: ['Гироскоп қалай жұмыс істейді?', 'Беріліс санын таңда'],
      en: ['How does a gyro work?', 'Select a gear ratio']
    },
    levels: [
      {
        id: 1,
        title: { ru: 'Первый свет', kk: 'Алғашқы жарық', en: 'First Light' },
        description: { ru: 'Зажигание светодиода и основы цепей.', kk: 'Светодиодты жағу және тізбек негіздері.', en: 'Lighting an LED and circuit basics.' },
        theory: { ru: 'Закон Ома и компоненты.', kk: 'Ом заңы және компоненттер.', en: 'Ohm\'s Law and components.' },
        practice: { ru: 'Соберите схему со светодиодом.', kk: 'Светодиодты схеманы жинаңыз.', en: 'Assemble a circuit with an LED.' },
        project: { ru: 'Мигающий маяк.', kk: 'Жыпылықтайтын маяк.', en: 'Blinking beacon.' }
      },
      {
        id: 2,
        title: { ru: 'Движение', kk: 'Қозғалыс', en: 'Movement' },
        description: { ru: 'Моторы и драйверы.', kk: 'Моторлар мен драйверлер.', en: 'Motors and drivers.' },
        theory: { ru: 'Как работают DC моторы.', kk: 'Тұрақты ток моторлары қалай жұмыс істейді.', en: 'How DC motors work.' },
        practice: { ru: 'Подключите мотор к Arduino.', kk: 'Моторды Arduino-ға қосыңыз.', en: 'Connect a motor to Arduino.' },
        project: { ru: 'Первая тележка.', kk: 'Алғашқы арба.', en: 'First cart.' }
      },
      {
        id: 3,
        title: { ru: 'Сенсоры', kk: 'Сенсорлар', en: 'Sensors' },
        description: { ru: 'Обратная связь от мира.', kk: 'Әлемнен кері байланыс.', en: 'Feedback from the world.' },
        theory: { ru: 'Ультразвук и ИК датчики.', kk: 'Ультрадыбыстық және ИҚ датчиктер.', en: 'Ultrasonic and IR sensors.' },
        practice: { ru: 'Измерьте расстояние датчиком.', kk: 'Датчикпен қашықтықты өлшеңіз.', en: 'Measure distance with a sensor.' },
        project: { ru: 'Робот-пылесос (прототип).', kk: 'Робот-шаңсорғыш (прототип).', en: 'Robot vacuum (prototype).' }
      }
    ]
  },
  {
    id: 'team',
    title: { ru: 'Team Mentor', kk: 'Team Mentor', en: 'Team Mentor' },
    description: {
      ru: 'Помогает распределить роли и управлять командой. Ментор по лидерству.',
      kk: 'Рөлдерді бөлуге және команданы басқаруға көмектеседі. Көшбасшылық бойынша тәлімгер.',
      en: 'Helps distribute roles and manage the team. Leadership mentor.'
    },
    icon: 'Users2',
    color: 'bg-purple-500',
    examples: {
      ru: ['Как распределить роли?', 'У нас конфликт в команде'],
      kk: ['Рөлдерді қалай бөлуге болады?', 'Командада жанжал туындады'],
      en: ['How to distribute roles?', 'We have a team conflict']
    }
  },
  {
    id: 'career',
    title: { ru: 'Career Mentor', kk: 'Career Mentor', en: 'Career Mentor' },
    description: {
      ru: 'Строит путь в STEM, подбирает стажировки и вузы. Ваш карьерный гид.',
      kk: 'STEM-де жол салады, тағылымдамалар мен жоғары оқу орындарын таңдайды. Сіздің мансаптық нұсқаулығыңыз.',
      en: 'Builds a path in STEM, selects internships and universities. Your career guide.'
    },
    icon: 'Briefcase',
    color: 'bg-emerald-500',
    examples: {
      ru: ['Где найти стажировку?', 'Как поступить в топ вуз?'],
      kk: ['Тағылымдаманы қайдан табуға болады?', 'Үздік ЖОО-ға қалай түсуге болады?'],
      en: ['Where to find an internship?', 'How to get into a top university?']
    }
  }
];

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [language, setLanguage] = useState<Language>('ru');

  const handleStart = () => setView('selection');
  
  const handleSelectMentor = (role: MentorRole) => {
    const mentor = mentors.find(m => m.id === role);
    if (mentor) {
      setSelectedMentor(mentor);
      setView('chat');
    }
  };

  const handleBackToSelection = () => {
    setView('selection');
    setSelectedMentor(null);
  };

  const handleBackToLanding = () => {
    setView('landing');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-gold-500 selection:text-neutral-950">
      {/* Global Header / Language Selector */}
      <nav className="fixed top-0 left-0 right-0 p-6 max-w-7xl mx-auto flex justify-between items-center z-50 pointer-events-none">
        <button 
          onClick={handleBackToLanding}
          className="text-2xl font-display font-bold gold-text-gradient pointer-events-auto"
        >
          GOLD AI
        </button>
        
        <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full pointer-events-auto">
          <Globe className="w-4 h-4 text-gold-400" />
          <div className="flex gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`text-xs font-medium transition-colors ${
                  language === lang.code ? 'text-gold-400' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Landing onStart={handleStart} language={language} />
          </motion.div>
        )}

        {view === 'selection' && (
          <motion.div
            key="selection"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="pt-20"
          >
            <MentorSelection onSelect={handleSelectMentor} language={language} />
          </motion.div>
        )}

        {view === 'chat' && selectedMentor && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="pt-20"
          >
            <ChatInterface 
              mentor={selectedMentor} 
              language={language}
              onBack={handleBackToSelection} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

