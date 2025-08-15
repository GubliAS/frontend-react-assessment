import React, { useState } from 'react';
// import AppHeader from '../components/layout/AppHeader';
import UserStatsDisplay from '../../components/gamification/UserStatsDisplay';
import BadgeCollection from '../../components/gamification/BadgeCollection';
import LeaderboardComponent from '../../components/gamification/LeaderboardComponent';
import AchievementGallery from '../../components/gamification/AchievementGallery';
import ChallengeCards from '../../components/gamification/ChallengeCards';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

const Gamification = () => {
  // Temporary static or mock userId until auth is integrated
  const [userId] = useState('mock-user-id');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* <AppHeader /> */}
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            🎮 Talent Hub Arena
          </h1>
          <p className="text-xl text-blue-200">
            Level up your career journey with rewards and achievements!
          </p>
        </div>

        {/* User Stats */}
        <div className="mb-8">
          <UserStatsDisplay userId={userId} />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto bg-black/30 backdrop-blur-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">Overview</TabsTrigger>
            <TabsTrigger value="challenges" className="data-[state=active]:bg-purple-600">Challenges</TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-purple-600">Achievements</TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-purple-600">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BadgeCollection userId={userId} />
              <div className="space-y-6">
                <ChallengeCards limit={3} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="challenges">
            <ChallengeCards />
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementGallery userId={userId} />
          </TabsContent>

          <TabsContent value="leaderboard">
            <LeaderboardComponent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Gamification;
