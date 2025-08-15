import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import Button  from '../shared/Button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Trophy, Medal, Award, Crown } from 'lucide-react';

const leaderboardData = [
  { rank: 1, name: 'Sarah Chen', xp: 15420, avatar: '', level: 12, badge: 'Career Legend' },
  { rank: 2, name: 'Marcus Johnson', xp: 14890, avatar: '', level: 11, badge: 'Skill Master' },
  { rank: 3, name: 'Emily Rodriguez', xp: 14320, avatar: '', level: 11, badge: 'Network Pro' },
  { rank: 4, name: 'David Kim', xp: 13750, avatar: '', level: 10, badge: 'Assessment Ace' },
  { rank: 5, name: 'Lisa Thompson', xp: 13200, avatar: '', level: 10, badge: 'Job Hunter' },
  { rank: 6, name: 'Alex Turner', xp: 12890, avatar: '', level: 10, badge: 'Profile Master' },
  { rank: 7, name: 'You', xp: 2450, avatar: '', level: 7, badge: 'Rising Star', isCurrentUser: true }
];

const LeaderboardComponent = () => {
  const [timeFilter, setTimeFilter] = useState('all-time');

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-400" />;
      case 2: return <Trophy className="h-5 w-5 text-gray-400" />;
      case 3: return <Medal className="h-5 w-5 text-orange-400" />;
      default: return <Award className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex justify-center gap-2">
        {['weekly', 'monthly', 'all-time'].map((filter) => (
          <Button
            key={filter}
            variant={timeFilter === filter ? "default" : "outline"}
            onClick={() => setTimeFilter(filter)}
            className={timeFilter === filter ? "bg-purple-600" : "border-purple-500 text-purple-300"}
          >
            {filter === 'all-time' ? 'All Time' : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </Button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <Card className="bg-black/20 backdrop-blur-sm border-purple-500/20">
        <CardContent className="p-6">
          <div className="flex justify-center items-end gap-4 mb-8">
            {/* 2nd Place */}
            <div className="text-center">
              <div className="relative mb-3">
                <Avatar className="h-16 w-16 border-4 border-gray-400">
                  <AvatarFallback className="bg-gray-600 text-white">
                    {leaderboardData[1].name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2 bg-gray-400 rounded-full p-1">
                  <Trophy className="h-4 w-4 text-white" />
                </div>
              </div>
              <h3 className="text-white font-semibold text-sm">{leaderboardData[1].name}</h3>
              <p className="text-gray-300 text-xs">{leaderboardData[1].xp.toLocaleString()} XP</p>
              <div className="h-20 bg-gray-400 rounded-t-lg mt-2 flex items-end justify-center pb-2">
                <span className="text-white font-bold text-lg">2</span>
              </div>
            </div>

            {/* 1st Place */}
            <div className="text-center">
              <div className="relative mb-3">
                <Avatar className="h-20 w-20 border-4 border-yellow-400">
                  <AvatarFallback className="bg-yellow-600 text-white">
                    {leaderboardData[0].name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
                  <Crown className="h-5 w-5 text-white" />
                </div>
              </div>
              <h3 className="text-white font-semibold">{leaderboardData[0].name}</h3>
              <p className="text-gray-300 text-sm">{leaderboardData[0].xp.toLocaleString()} XP</p>
              <div className="h-24 bg-yellow-400 rounded-t-lg mt-2 flex items-end justify-center pb-2">
                <span className="text-white font-bold text-xl">1</span>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              <div className="relative mb-3">
                <Avatar className="h-16 w-16 border-4 border-orange-400">
                  <AvatarFallback className="bg-orange-600 text-white">
                    {leaderboardData[2].name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2 bg-orange-400 rounded-full p-1">
                  <Medal className="h-4 w-4 text-white" />
                </div>
              </div>
              <h3 className="text-white font-semibold text-sm">{leaderboardData[2].name}</h3>
              <p className="text-gray-300 text-xs">{leaderboardData[2].xp.toLocaleString()} XP</p>
              <div className="h-16 bg-orange-400 rounded-t-lg mt-2 flex items-end justify-center pb-2">
                <span className="text-white font-bold">3</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Full Leaderboard */}
      <Card className="bg-black/20 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white">🏆 Full Rankings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {leaderboardData.map((user) => (
            <div
              key={user.rank}
              className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${
                user.isCurrentUser
                  ? 'bg-purple-600/20 border-purple-400 shadow-lg'
                  : 'bg-white/5 border-gray-600 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="flex items-center justify-center w-8 h-8">
                  {user.rank <= 3 ? (
                    getRankIcon(user.rank)
                  ) : (
                    <span className="text-gray-400 font-bold">#{user.rank}</span>
                  )}
                </div>

                <Avatar className="h-10 w-10">
                  <AvatarFallback className={user.isCurrentUser ? "bg-purple-600" : "bg-gray-600"}>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h4 className={`font-semibold ${user.isCurrentUser ? 'text-purple-300' : 'text-white'}`}>
                    {user.name}
                    {user.isCurrentUser && <span className="ml-2 text-xs">(You)</span>}
                  </h4>
                  <p className="text-sm text-gray-400">Level {user.level}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-white font-semibold">{user.xp.toLocaleString()}</p>
                <p className="text-xs text-gray-400">XP</p>
              </div>

              <Badge className="bg-purple-600 text-white border-0">
                {user.badge}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardComponent;
