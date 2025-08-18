import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
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
      <Card className="bg-white text-card-foreground border border-gray-100 shadow-sm relative">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-[var(--ebony-900)]">Level {stats.level}</h3>
              <p className="text-[var(--ebony-600)] text-sm">Experience Points</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-full">
              <Star className="h-6 w-6 text-emerald-600" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-[var(--ebony-600)]">
              <span>{stats.xp.toLocaleString()} XP</span>
              <span>{stats.xpToNextLevel.toLocaleString()} XP</span>
            </div>
            <Progress value={progressToNextLevel} className="h-2 bg-gray-100" />
            <p className="text-xs text-[var(--ebony-600)] text-center">
              {Math.max(0, stats.xpToNextLevel - stats.xp)} XP to level {stats.level + 1}
            </p>
          </div>

          {showXPAnimation && (
            <div className="absolute top-3 right-3 animate-bounce">
              <Badge className="bg-emerald-500 text-white border-0">+50 XP</Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-white text-card-foreground border border-gray-100 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-[var(--ebony-900)]">{stats.totalAchievements}</h3>
              <p className="text-[var(--ebony-600)] text-sm">Achievements</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-full">
              <Trophy className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-[var(--ebony-600)]">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            <span className="text-sm">+3 this week</span>
          </div>
        </CardContent>
      </Card>

      {/* Rank */}
      <Card className="bg-white text-card-foreground border border-gray-100 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-[var(--ebony-900)]">#{stats.rank}</h3>
              <p className="text-[var(--ebony-600)] text-sm">Global Rank</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-full">
              <Target className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-[var(--ebony-600)]">
            <div className="w-2 h-2 bg-emerald-100 rounded-full animate-pulse"></div>
            <span className="text-sm">Climbing fast!</span>
          </div>
        </CardContent>
      </Card>

      {/* Streak */}
      <Card className="bg-white text-card-foreground border border-gray-100 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-[var(--ebony-900)]">{stats.streakDays}</h3>
              <p className="text-[var(--ebony-600)] text-sm">Day Streak</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-full">
              <Zap className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div className="text-sm">
            <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full inline-block">
              🔥 On Fire!
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStatsDisplay;
