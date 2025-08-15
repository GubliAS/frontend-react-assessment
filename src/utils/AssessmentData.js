// utils/assessmentData.js

export const ghanaContextQuestions = [
  {
    id: 'verbal-1',
    type: 'verbal',
    difficulty: 'easy',
    question: 'What is the capital of Ghana?',
    options: ['Kumasi', 'Accra', 'Tamale', 'Cape Coast'],
    correctAnswer: 1,
    timeLimit: 30,
    points: 10,
    context: 'Basic Ghana knowledge'
  },
  {
    id: 'numerical-1',
    type: 'numerical',
    difficulty: 'medium',
    question: 'If cocoa costs GH₵ 8 per kg and you buy 5.5 kg, how much do you pay?',
    options: ['GH₵ 40', 'GH₵ 44', 'GH₵ 48', 'GH₵ 42'],
    correctAnswer: 1,
    timeLimit: 45,
    points: 15,
    context: 'Ghana currency and agriculture'
  },
  {
    id: 'logical-1',
    type: 'logical',
    difficulty: 'medium',
    question: 'Complete the pattern: Accra, Kumasi, Tamale, ?',
    options: ['Cape Coast', 'Sunyani', 'Wa', 'Ho'],
    correctAnswer: 2,
    timeLimit: 60,
    points: 20,
    context: 'Ghana cities by population'
  },
  {
    id: 'spatial-1',
    type: 'spatial',
    difficulty: 'hard',
    question: 'Which region borders both Upper East and Northern regions?',
    options: ['Upper West', 'Brong Ahafo', 'Volta', 'Central'],
    correctAnswer: 0,
    timeLimit: 45,
    points: 25,
    context: 'Ghana geography'
  }
];

export const defaultBadges = [
  {
    id: 'first-assessment',
    name: 'First Steps',
    description: 'Complete your first assessment',
    icon: 'star',
    requirement: 'Complete 1 assessment',
    earned: false
  },
  {
    id: 'verbal-master',
    name: 'Word Wizard',
    description: 'Excel in verbal reasoning',
    icon: 'award',
    requirement: 'Score 80%+ in verbal assessment',
    earned: false
  },
  {
    id: 'numbers-guru',
    name: 'Numbers Guru',
    description: 'Master of numerical reasoning',
    icon: 'badge',
    requirement: 'Score 85%+ in numerical assessment',
    earned: false
  },
  {
    id: 'streak-warrior',
    name: 'Streak Warrior',
    description: 'Complete assessments for 7 days straight',
    icon: 'timer',
    requirement: 'Complete 7-day streak',
    earned: false
  }
];

export const assessmentTemplates = [
  {
    id: 'verbal-reasoning',
    title: 'Verbal Reasoning',
    description: 'Test your language and comprehension skills',
    type: 'verbal',
    questions: ghanaContextQuestions.filter(q => q.type === 'verbal'),
    timeLimit: 900, // 15 minutes
    difficulty: 'medium',
    badge: 'verbal-master',
    points: 100
  },
  {
    id: 'numerical-reasoning',
    title: 'Numerical Reasoning',
    description: 'Evaluate your mathematical and analytical abilities',
    type: 'numerical',
    questions: ghanaContextQuestions.filter(q => q.type === 'numerical'),
    timeLimit: 1200, // 20 minutes
    difficulty: 'medium',
    badge: 'numbers-guru',
    points: 150
  },
  {
    id: 'logical-reasoning',
    title: 'Logical Reasoning',
    description: 'Challenge your problem-solving skills',
    type: 'logical',
    questions: ghanaContextQuestions.filter(q => q.type === 'logical'),
    timeLimit: 1800, // 30 minutes
    difficulty: 'hard',
    points: 200
  },
  {
    id: 'mixed-assessment',
    title: 'Comprehensive Assessment',
    description: 'Complete cognitive evaluation',
    type: 'mixed',
    questions: ghanaContextQuestions,
    timeLimit: 3600, // 60 minutes
    difficulty: 'hard',
    points: 400
  }
];
