import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Trophy, Star, Zap, Target, TrendingUp } from 'lucide-react';

const UserStatsDisplay = ({ userId }) => {
  const [stats, setStats] = useState({
    xp: 2450,
    level: 7,
    xpToNextLevel: 3000,
    totalAchievements: 24,
    rank: 156,
    streakDays: 12,
    pointsThisWeek: 180
  });

  const [showXPAnimation, setShowXPAnimation] = useState(false);

  const progressToNextLevel = (stats.xp / stats.xpToNextLevel) * 100;

  // Simulate XP gain animation
  useEffect(() => {
    const timer = setTimeout(() => setShowXPAnimation(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* XP and Level */}
      <Card className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white border-0 shadow-xl relative">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold">Level {stats.level}</h3>
              <p className="text-yellow-100 text-sm">Experience Points</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <Star className="h-6 w-6" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{stats.xp.toLocaleString()} XP</span>
              <span>{stats.xpToNextLevel.toLocaleString()} XP</span>
            </div>
            <Progress value={progressToNextLevel} className="h-2 bg-white/20" />
            <p className="text-xs text-yellow-100 text-center">
              {stats.xpToNextLevel - stats.xp} XP to level {stats.level + 1}
            </p>
          </div>

          {showXPAnimation && (
            <div className="absolute top-2 right-2 animate-bounce">
              <Badge className="bg-green-500 text-white border-0">+50 XP</Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold">{stats.totalAchievements}</h3>
              <p className="text-purple-100 text-sm">Achievements</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <Trophy className="h-6 w-6" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">+3 this week</span>
          </div>
        </CardContent>
      </Card>

      {/* Rank */}
      <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold">#{stats.rank}</h3>
              <p className="text-blue-100 text-sm">Global Rank</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <Target className="h-6 w-6" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Climbing fast!</span>
          </div>
        </CardContent>
      </Card>

      {/* Streak */}
      <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold">{stats.streakDays}</h3>
              <p className="text-green-100 text-sm">Day Streak</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <Zap className="h-6 w-6" />
            </div>
          </div>
          <div className="text-sm">
            <span className="bg-white/20 px-2 py-1 rounded-full">
              🔥 On Fire!
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStatsDisplay;
