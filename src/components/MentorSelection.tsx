import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Rocket, Briefcase, Users2, ChevronRight, BrainCircuit, Trophy, Star, Code, Cpu } from 'lucide-react';
import { MentorRole, Mentor, Language } from '../types';

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

const iconMap: Record<string, any> = {
  Code,
  Cpu,
  Briefcase,
  Users2
};

const translations = {
  ru: {
    title: "Выберите своего ментора",
    desc: "Каждый AI-ментор специализируется на своей области, чтобы дать вам максимально глубокую экспертизу.",
    aiTitle: "AI + Данные: Аналитика талантов",
    progress: "Прогресс обучения",
    progressDesc: "AI анализирует, как быстро ученик усваивает материал и рекомендует персональный темп.",
    leaders: "Выявление лидеров",
    leadersDesc: "Система отслеживает активность в Team Mentor и выявляет скрытых лидеров и сильных инженеров.",
    teams: "Оптимальные команды",
    teamsDesc: "На основе данных о навыках AI рекомендует идеальное распределение ролей для победы в сезоне."
  },
  kk: {
    title: "Тәлімгеріңізді таңдаңыз",
    desc: "Әрбір AI-тәлімгер сізге барынша терең сараптама беру үшін өз саласына маманданған.",
    aiTitle: "AI + Деректер: Таланттар аналитикасы",
    progress: "Оқу прогресі",
    progressDesc: "AI оқушының материалды қаншалықты тез меңгеретінін талдайды және жеке қарқынды ұсынады.",
    leaders: "Көшбасшыларды анықтау",
    leadersDesc: "Жүйе Team Mentor-дағы белсенділікті бақылайды және жасырын көшбасшылар мен мықты инженерлерді анықтайды.",
    teams: "Оңтайлы командалар",
    teamsDesc: "Дағдылар туралы мәліметтер негізінде AI маусымда жеңіске жету үшін рөлдерді тамаша бөлуді ұсынады."
  },
  en: {
    title: "Choose Your Mentor",
    desc: "Each AI mentor specializes in their field to provide you with the deepest possible expertise.",
    aiTitle: "AI + Data: Talent Analytics",
    progress: "Learning Progress",
    progressDesc: "AI analyzes how quickly a student masters the material and recommends a personal pace.",
    leaders: "Identifying Leaders",
    leadersDesc: "The system tracks activity in Team Mentor and identifies hidden leaders and strong engineers.",
    teams: "Optimal Teams",
    teamsDesc: "Based on skill data, AI recommends the ideal distribution of roles for victory in the season."
  }
};

export default function MentorSelection({ onSelect, language }: { onSelect: (role: MentorRole) => void; language: Language }) {
  const t = translations[language];
  
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-display font-bold mb-4">{t.title}</h2>
        <p className="text-neutral-400 max-w-xl mx-auto">
          {t.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {mentors.map((mentor, i) => {
          const Icon = iconMap[mentor.icon];
          return (
            <motion.button
              key={mentor.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onSelect(mentor.id)}
              className="group relative p-8 rounded-3xl glass text-left hover:border-gold-500/50 transition-all overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${mentor.color}/5 blur-3xl -z-10 group-hover:scale-150 transition-transform`} />
              
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl ${mentor.color}/10 flex items-center justify-center`}>
                  <Icon className={`w-7 h-7 ${mentor.id === 'robotics' ? 'text-gold-400' : 'text-white'}`} />
                </div>
                <ChevronRight className="w-6 h-6 text-neutral-600 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
              </div>

              <h3 className="text-2xl font-bold mb-3">{mentor.title[language]}</h3>
              <p className="text-neutral-400 mb-6 line-clamp-2">
                {mentor.description[language]}
              </p>

              <div className="flex flex-wrap gap-2">
                {mentor.examples[language].map((ex, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 rounded-md bg-white/5 text-neutral-500">
                    "{ex}"
                  </span>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* AI Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 rounded-3xl glass border-gold-500/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <BrainCircuit className="w-32 h-32 text-gold-500" />
        </div>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center">
            <BrainCircuit className="w-6 h-6 text-gold-400" />
          </div>
          <h3 className="text-2xl font-bold">{t.aiTitle}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gold-400 font-bold">
              <Star className="w-4 h-4" />
              <span>{t.progress}</span>
            </div>
            <p className="text-sm text-neutral-400">
              {t.progressDesc}
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gold-400 font-bold">
              <Trophy className="w-4 h-4" />
              <span>{t.leaders}</span>
            </div>
            <p className="text-sm text-neutral-400">
              {t.leadersDesc}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gold-400 font-bold">
              <Users2 className="w-4 h-4" />
              <span>{t.teams}</span>
            </div>
            <p className="text-sm text-neutral-400">
              {t.teamsDesc}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


