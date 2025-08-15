import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import Button  from '../shared/Button';
import { Clock, Target, Gift, Zap } from 'lucide-react';

const challenges = [
  {
    id: 1,
    title: 'Profile Perfectionist',
    description: 'Complete all sections of your profile',
    progress: 85,
    total: 100,
    reward: 200,
    difficulty: 'Easy',
    timeLeft: '3 days',
    type: 'daily'
  },
  {
    id: 2,
    title: 'Application Marathon',
    description: 'Apply to 5 jobs this week',
    progress: 2,
    total: 5,
    reward: 500,
    difficulty: 'Medium',
    timeLeft: '4 days',
    type: 'weekly'
  },
  {
    id: 3,
    title: 'Skill Assessment Champion',
    description: 'Complete 3 skill assessments with 80%+ score',
    progress: 1,
    total: 3,
    reward: 750,
    difficulty: 'Hard',
    timeLeft: '2 weeks',
    type: 'monthly'
  },
  {
    id: 4,
    title: 'Networking Ninja',
    description: 'Connect with 10 new professionals',
    progress: 6,
    total: 10,
    reward: 300,
    difficulty: 'Medium',
    timeLeft: '5 days',
    type: 'weekly'
  },
  {
    id: 5,
    title: 'Resume Master',
    description: 'Generate and download 3 different resume styles',
    progress: 0,
    total: 3,
    reward: 400,
    difficulty: 'Easy',
    timeLeft: '1 week',
    type: 'weekly'
  }
];

export default function ChallengeCards({ limit }) {
  const displayedChallenges = limit ? challenges.slice(0, limit) : challenges;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'daily': return '📅';
      case 'weekly': return '📈';
      case 'monthly': return '🏆';
      default: return '⭐';
    }
  };

  return (
    <div className="space-y-4">
      {!limit && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">🎯 Active Challenges</h2>
          <p className="text-blue-200">Complete challenges to earn XP and unlock rewards!</p>
        </div>
      )}

      <div className="grid gap-4">
        {displayedChallenges.map((challenge) => {
          const progressPercentage = (challenge.progress / challenge.total) * 100;
          const isCompleted = challenge.progress >= challenge.total;

          return (
            <Card
              key={challenge.id}
              className="bg-black/20 backdrop-blur-sm border-purple-500/20 hover:border-purple-400/40 transition-all"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTypeIcon(challenge.type)}</span>
                    <CardTitle className="text-white text-lg">{challenge.title}</CardTitle>
                  </div>
                  <Badge className={`${getDifficultyColor(challenge.difficulty)} text-white border-0`}>
                    {challenge.difficulty}
                  </Badge>
                </div>
                <p className="text-gray-300 text-sm">{challenge.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Progress</span>
                    <span className="text-white font-medium">
                      {challenge.progress}/{challenge.total}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>

                {/* Reward and Time */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Gift className="h-4 w-4" />
                      <span className="text-sm font-medium">{challenge.reward} XP</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-400">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{challenge.timeLeft}</span>
                    </div>
                  </div>

                  {isCompleted ? (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Target className="h-4 w-4 mr-1" />
                      Claim Reward
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="border-purple-500 text-purple-300">
                      <Zap className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
