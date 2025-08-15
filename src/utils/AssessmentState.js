
import { defaultBadges } from './AssessmentData';

const STORAGE_KEY = 'assessment_data';

export const getAssessmentState = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {
    currentAssessment: null,
    questions: [],
    answers: [],
    currentQuestionIndex: 0,
    timer: 0,
    progress: 0,
    score: 0,
    badges: defaultBadges,
    leaderboard: [],
    isCompleted: false,
    isActive: false,
    streak: 0,
    totalPoints: 0,
    level: 1
  };
};

export const saveAssessmentState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const calculateLevel = (points) => {
  return Math.floor(points / 500) + 1;
};

export const getPointsForNextLevel = (currentPoints) => {
  const currentLevel = calculateLevel(currentPoints);
  return currentLevel * 500 - currentPoints;
};

export const checkBadgeEarned = (badges, result) => {
  const earnedBadges = [];
  
  badges.forEach(badge => {
    if (!badge.earned) {
      switch (badge.id) {
        case 'first-assessment':
          earnedBadges.push(badge.id);
          break;
        case 'verbal-master':
          if (result.assessmentId === 'verbal-reasoning' && result.percentage >= 80) {
            earnedBadges.push(badge.id);
          }
          break;
        case 'numbers-guru':
          if (result.assessmentId === 'numerical-reasoning' && result.percentage >= 85) {
            earnedBadges.push(badge.id);
          }
          break;
      }
    }
  });
  
  return earnedBadges;
};
