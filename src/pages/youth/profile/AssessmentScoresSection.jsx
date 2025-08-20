import React from 'react';
import Button  from '../../../components/shared/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Switch } from '../../../components/ui/switch';
import { Progress } from '../../../components/ui/progress';
import { Trophy, Eye, EyeOff, Star, Calendar, TrendingUp, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { useAssessment } from '../../../redux/assessmentSection/useAssessment';
  
const AssessmentScoresForm = () => {
  const { assessmentScores = [], dispatch } = useAssessment();

  // NOTE: dispatches use generic action types. If you have action creators, replace these with them.
  const updateAssessmentScore = (id, changes) => {
    dispatch({ type: 'assessment/updateAssessmentScore', payload: { id, changes } });
  };

  const addAssessmentScore = (assessment) => {
    dispatch({ type: 'assessment/addAssessmentScore', payload: assessment });
  };
  
  const toggleVisibility = (id, isVisible) => {
    updateAssessmentScore(id, { isVisible });
  };
  
  const getScoreColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (percentage) => {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 80) return 'Good';
    if (percentage >= 70) return 'Fair';
    return 'Needs Improvement';
  };

  // Mock function to add sample assessment
  const addSampleAssessment = () => {
    const sampleAssessment = {
      id: Date.now().toString(),
      assessmentName: 'React Development Skills',
      category: 'Technical',
      score: 85,
      maxScore: 100,
      percentage: 85,
      completedDate: new Date().toISOString(),
      isVisible: true,
      skillsAssessed: ['React', 'JavaScript', 'Component Architecture', 'State Management']
    };
    addAssessmentScore(sampleAssessment);
  };
  
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Assessment Scores</h2>
        <p className="text-gray-600 mt-2">
          Showcase your assessment results to potential employers. You control which scores are visible on your profile.
        </p>
      </div>

      {assessmentScores.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Assessment Scores Yet</h3>
            <p className="text-gray-600 mb-6">
              Complete assessments to showcase your skills and knowledge to employers.
            </p>
            <div className="space-y-3">
              <Button onClick={addSampleAssessment} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Sample Assessment
              </Button>
              <p className="text-sm text-gray-500">
                Go to the Assessments section to take professional skill assessments
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your Assessment Results</h3>
            <Badge variant="secondary">
              {assessmentScores.filter(score => score.isVisible).length} of {assessmentScores.length} visible
            </Badge>
          </div>

          {assessmentScores.map((assessment) => (
            <Card key={assessment.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{assessment.assessmentName}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{assessment.category}</Badge>
                      <span className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {format(new Date(assessment.completedDate), 'MMM dd, yyyy')}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(assessment.percentage)}`}>
                        {assessment.percentage}%
                      </div>
                      <div className="text-sm text-gray-500">
                        {assessment.score}/{assessment.maxScore}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Score Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Performance</span>
                    <span className={`text-sm font-medium ${getScoreColor(assessment.percentage)}`}>
                      {getScoreLabel(assessment.percentage)}
                    </span>
                  </div>
                  <Progress value={assessment.percentage} className="h-2" />
                </div>

                {/* Skills Assessed */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Skills Assessed
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {assessment.skillsAssessed.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Visibility Control */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    {assessment.isVisible ? (
                      <Eye className="w-4 h-4 text-green-600" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    )}
                    <span className="text-sm font-medium">
                      {assessment.isVisible ? 'Visible to Employers' : 'Hidden from Employers'}
                    </span>
                  </div>
                  <Switch
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-emerald-400 data-[state=checked]:to-green-600 data-[state=unchecked]:bg-gray-200"
                    checked={assessment.isVisible}
                    onCheckedChange={(checked) => toggleVisibility(assessment.id, checked)}
                  />
                </div>

                {assessment.isVisible && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-800 font-medium">
                        This score will be displayed on your public profile
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="text-center py-8">
              <Plus className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Take More Assessments</h3>
              <p className="text-gray-600 mb-4">
                Build your skills portfolio by completing more professional assessments
              </p>
              <Button variant="outline">
                Browse Assessments
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Visibility Summary */}
      {assessmentScores.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Eye className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Profile Visibility</h4>
                <p className="text-sm text-blue-800">
                  Only scores marked as "visible" will appear on your public profile. 
                  You can toggle visibility anytime to control what employers see.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AssessmentScoresForm;
