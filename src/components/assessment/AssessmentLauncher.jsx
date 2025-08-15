import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import Button from '../../components/shared/Button';
import { Badge } from '../../components/ui/badge';
import { Clock, Award, AlertCircle } from 'lucide-react';

const AssessmentLauncher = ({ assessment, onStart, onCancel }) => {
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

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="text-6xl">{getTypeIcon(assessment.type)}</div>
          </div>
          <CardTitle className="text-2xl">{assessment.title}</CardTitle>
          <div className="flex justify-center gap-2 mt-2">
            <Badge className={getDifficultyColor(assessment.difficulty)}>
              {assessment.difficulty}
            </Badge>
            <Badge variant="outline">
              {assessment.type}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p className="text-center text-gray-600 text-lg">
            {assessment.description}
          </p>
          
          {/* Assessment Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {assessment.questions.length}
                </div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span className="text-2xl font-bold text-green-600">
                    {Math.floor(assessment.timeLimit / 60)}
                  </span>
                </div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center p-4 bg-purple-50 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span className="text-2xl font-bold text-purple-600">
                    {assessment.points}
                  </span>
                </div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
            </div>
          </div>
          
          {/* Instructions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Important Instructions:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Questions are contextualized to Ghana's work environment</li>
                  <li>• Each question has a time limit - work efficiently</li>
                  <li>• You cannot go back to previous questions</li>
                  <li>• Earn badges and points based on your performance</li>
                  <li>• Complete the assessment in one sitting</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={onStart}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Start Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentLauncher;
