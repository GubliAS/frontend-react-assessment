import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import  Button  from '../../components/shared/Button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Star, Award, Clock, Trophy } from 'lucide-react';
import { assessmentTemplates } from '../../utils/AssessmentData';
import { getAssessmentState, calculateLevel, getPointsForNextLevel } from '../../utils/AssessmentState';

const AssessmentDashboard = ({ onStartAssessment }) => {
  const [assessmentState, setAssessmentState] = useState(getAssessmentState());

  useEffect(() => {
    const state = getAssessmentState();
    setAssessmentState(state);
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'verbal': return '📝';
      case 'numerical': return '🔢';
      case 'logical': return '🧩';
      case 'spatial': return '🗺️';
      default: return '📊';
    }
  };

  const currentLevel = calculateLevel(assessmentState.totalPoints);
  const pointsForNext = getPointsForNextLevel(assessmentState.totalPoints);
  const levelProgress = ((assessmentState.totalPoints % 500) / 500) * 100;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Level</p>
                <p className="text-2xl font-bold text-blue-600">{currentLevel}</p>
              </div>
              <Trophy className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Points</p>
                <p className="text-2xl font-bold text-green-600">{assessmentState.totalPoints}</p>
              </div>
              <Star className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Badges Earned</p>
                <p className="text-2xl font-bold text-purple-600">
                  {assessmentState.badges.filter(b => b.earned).length}
                </p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-orange-600">{assessmentState.streak}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Level {currentLevel} Progress</span>
              <span>{pointsForNext} points to Level {currentLevel + 1}</span>
            </div>
            <Progress value={levelProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Available Assessments */}
      <Card>
        <CardHeader>
          <CardTitle>Available Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assessmentTemplates.map((assessment) => (
              <Card key={assessment.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{getTypeIcon(assessment.type)}</span>
                      <Badge className={getDifficultyColor(assessment.difficulty)}>
                        {assessment.difficulty}
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg">{assessment.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{assessment.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{assessment.questions.length} questions</span>
                      <span>{Math.floor(assessment.timeLimit / 60)} min</span>
                      <span>{assessment.points} pts</span>
                    </div>
                    
                    <Button 
                      onClick={() => onStartAssessment(assessment)}
                      className="w-full"
                      disabled={assessmentState.isActive}
                    >
                      Start Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentDashboard;
