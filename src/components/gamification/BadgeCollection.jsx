import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import  Button from '../shared/Button';
import { CheckCircle } from 'lucide-react';

const badges = [
  { 
    id: 1, 
    name: 'Profile Master', 
    description: 'Complete 100% of your profile',
    icon: '👤',
    rarity: 'common',
    earned: true,
    earnedDate: '2023-12-01'
  },
  { 
    id: 2, 
    name: 'Job Hunter', 
    description: 'Apply to 10 jobs',
    icon: '🎯',
    rarity: 'common',
    earned: true,
    earnedDate: '2023-12-05'
  },
  { 
    id: 3, 
    name: 'Skill Collector', 
    description: 'Add 20 skills to your profile',
    icon: '🛠️',
    rarity: 'rare',
    earned: true,
    earnedDate: '2023-12-10'
  },
  { 
    id: 4, 
    name: 'Network Builder', 
    description: 'Connect with 50 professionals',
    icon: '🤝',
    rarity: 'rare',
    earned: false,
    progress: 32,
    total: 50
  },
  { 
    id: 5, 
    name: 'Assessment Ace', 
    description: 'Complete 5 skill assessments with 90%+ score',
    icon: '🏆',
    rarity: 'epic',
    earned: false,
    progress: 2,
    total: 5
  },
  { 
    id: 6, 
    name: 'Career Legend', 
    description: 'Reach level 20',
    icon: '⭐',
    rarity: 'legendary',
    earned: false,
    progress: 7,
    total: 20
  }
];

export default function BadgeCollection({ userId }) {
  const [showAll, setShowAll] = useState(false);
  const [recentBadge, setRecentBadge] = useState(null);

  const displayedBadges = showAll ? badges : badges.slice(0, 6);
  const earnedCount = badges.filter(badge => badge.earned).length;

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getRarityBorder = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-gray-300';
      case 'rare': return 'border-blue-400';
      case 'epic': return 'border-purple-400';
      case 'legendary': return 'border-yellow-400';
      default: return 'border-gray-300';
    }
  };

  return (
    <Card className="bg-black/20 backdrop-blur-sm border-purple-500/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            🏅 Badge Collection
            <Badge className="bg-purple-600 text-white">
              {earnedCount}/{badges.length}
            </Badge>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {displayedBadges.map((badge) => (
            <div
              key={badge.id}
              className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${
                badge.earned ? '' : 'opacity-60'
              }`}
              onClick={() => badge.earned && setRecentBadge(badge.id)}
            >
              <div
                className={`p-4 rounded-xl border-2 ${
                  badge.earned 
                    ? `${getRarityBorder(badge.rarity)} bg-gradient-to-br from-white/10 to-white/5` 
                    : 'border-gray-600 bg-gray-800/50'
                } backdrop-blur-sm`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2 relative">
                    {badge.earned ? badge.icon : '🔒'}
                    {badge.earned && (
                      <div className="absolute -top-1 -right-1">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </div>
                    )}
                  </div>
                  <h4 className="font-semibold text-sm text-white mb-1">
                    {badge.name}
                  </h4>
                  <div className="flex items-center justify-center mb-2">
                    <Badge 
                      className={`text-xs ${getRarityColor(badge.rarity)} text-white border-0`}
                    >
                      {badge.rarity}
                    </Badge>
                  </div>
                  
                  {!badge.earned && badge.progress !== undefined && (
                    <div className="text-xs text-gray-300">
                      {badge.progress}/{badge.total}
                    </div>
                  )}
                </div>

                {/* Hover tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                    {badge.description}
                    {badge.earned && badge.earnedDate && (
                      <div className="text-gray-400">
                        Earned: {new Date(badge.earnedDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Unlock animation */}
              {recentBadge === badge.id && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-yellow-400/20 rounded-xl animate-ping"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-400 animate-bounce">
                    ✨
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {badges.length > 6 && (
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="border-purple-500 text-purple-300 hover:bg-purple-500/20"
            >
              {showAll ? 'Show Less' : `Show All ${badges.length} Badges`}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
