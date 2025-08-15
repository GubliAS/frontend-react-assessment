import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import Button  from '../shared/Button';
import { Filter, Share2 } from 'lucide-react';

const achievements = [
  { 
    id: 1, 
    name: 'First Steps', 
    description: 'Create your first profile',
    icon: '👶',
    rarity: 'common',
    category: 'profile',
    earned: true,
    earnedDate: '2023-11-15',
    xpReward: 50
  },
  { 
    id: 2, 
    name: 'Profile Master', 
    description: 'Complete 100% of your profile',
    icon: '👤',
    rarity: 'rare',
    category: 'profile',
    earned: true,
    earnedDate: '2023-12-01',
    xpReward: 200
  },
  { 
    id: 3, 
    name: 'Early Bird', 
    description: 'Apply to a job within 24 hours of posting',
    icon: '🐦',
    rarity: 'epic',
    category: 'jobs',
    earned: true,
    earnedDate: '2023-12-05',
    xpReward: 300
  },
  { 
    id: 4, 
    name: 'Skill Collector', 
    description: 'Add 20 skills to your profile',
    icon: '🛠️',
    rarity: 'rare',
    category: 'skills',
    earned: true,
    earnedDate: '2023-12-10',
    xpReward: 250
  },
  { 
    id: 5, 
    name: 'Assessment Ace', 
    description: 'Score 90%+ on 5 skill assessments',
    icon: '🏆',
    rarity: 'epic',
    category: 'assessments',
    earned: false,
    progress: 2,
    total: 5,
    xpReward: 500
  },
  { 
    id: 6, 
    name: 'Career Legend', 
    description: 'Reach level 20',
    icon: '⭐',
    rarity: 'legendary',
    category: 'general',
    earned: false,
    progress: 7,
    total: 20,
    xpReward: 1000
  }
];

export default function AchievementGallery({ userId }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRarity, setSelectedRarity] = useState('all');

  const categories = ['all', 'profile', 'jobs', 'skills', 'assessments', 'general'];
  const rarities = ['all', 'common', 'rare', 'epic', 'legendary'];

  const filteredAchievements = achievements.filter(achievement => {
    const categoryMatch = selectedCategory === 'all' || achievement.category === selectedCategory;
    const rarityMatch = selectedRarity === 'all' || achievement.rarity === selectedRarity;
    return categoryMatch && rarityMatch;
  });

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getRarityBorder = (rarity, earned) => {
    if (!earned) return 'border-gray-600';
    switch (rarity) {
      case 'common': return 'border-gray-400';
      case 'rare': return 'border-blue-400';
      case 'epic': return 'border-purple-400';
      case 'legendary': return 'border-yellow-400';
      default: return 'border-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="bg-black/20 backdrop-blur-sm border-purple-500/20">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-purple-300" />
              <span className="text-white font-medium">Filters:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="space-x-2">
                <span className="text-sm text-gray-300">Category:</span>
                {categories.map(category => (
                  <Button
                    key={category}
                    size="sm"
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-purple-600" : "border-purple-500 text-purple-300"}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="space-x-2">
                <span className="text-sm text-gray-300">Rarity:</span>
                {rarities.map(rarity => (
                  <Button
                    key={rarity}
                    size="sm"
                    variant={selectedRarity === rarity ? "default" : "outline"}
                    onClick={() => setSelectedRarity(rarity)}
                    className={selectedRarity === rarity ? "bg-purple-600" : "border-purple-500 text-purple-300"}
                  >
                    {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => (
          <Card 
            key={achievement.id}
            className={`border-2 ${getRarityBorder(achievement.rarity, achievement.earned)} bg-black/20 backdrop-blur-sm hover:scale-105 transition-all cursor-pointer ${
              !achievement.earned ? 'opacity-60' : ''
            }`}
          >
            <CardHeader className="text-center pb-3">
              <div className="text-6xl mb-2">
                {achievement.earned ? achievement.icon : '🔒'}
              </div>
              <CardTitle className="text-white text-lg">{achievement.name}</CardTitle>
              <div className="flex justify-center gap-2">
                <Badge className={`${getRarityColor(achievement.rarity)} text-white border-0`}>
                  {achievement.rarity}
                </Badge>
                <Badge className="bg-purple-600 text-white border-0">
                  {achievement.xpReward} XP
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="text-center space-y-3">
              <p className="text-gray-300 text-sm">{achievement.description}</p>

              {achievement.earned ? (
                <div className="space-y-2">
                  <p className="text-green-400 text-sm font-medium">✅ Achieved!</p>
                  <p className="text-xs text-gray-400">
                    {new Date(achievement.earnedDate).toLocaleDateString()}
                  </p>
                  <Button size="sm" variant="outline" className="border-purple-500 text-purple-300">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              ) : achievement.progress !== undefined ? (
                <div className="space-y-2">
                  <p className="text-yellow-400 text-sm">
                    Progress: {achievement.progress}/{achievement.total}
                  </p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 text-sm">🔒 Locked</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
