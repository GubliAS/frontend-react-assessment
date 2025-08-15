import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import  Button  from '../../../components/shared/Button';
import { Badge } from '../../../components/ui/badge';
// import { Progress } from '@/components/ui/progress';
import { Share2, Download, RefreshCw, Home, Trophy, Star, Clock, Target } from 'lucide-react';
import { useToast } from '../../../hooks/use-toast';
// import AppHeader from '@/components/layout/AppHeader';

const AssessmentResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { results, earnedBadges = [] } = location.state || {};

  if (!results) {
    navigate('/assessments');
    return null;
  }

  const getScoreColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (percentage) => {
    if (percentage >= 90) return 'default';
    if (percentage >= 80) return 'secondary';
    if (percentage >= 70) return 'outline';
    return 'destructive';
  };

  const getPerformanceMessage = (percentage) => {
    if (percentage >= 90) return "Outstanding performance! You've mastered this assessment.";
    if (percentage >= 80) return "Great job! You have a strong understanding of the material.";
    if (percentage >= 70) return "Good work! There's room for improvement in some areas.";
    if (percentage >= 60) return "You passed, but consider reviewing the material for better understanding.";
    return "Consider retaking this assessment after additional study.";
  };

  const handleShare = () => {
    const shareData = {
      title: 'Assessment Results',
      text: `I scored ${results.percentage}% on the ${results.assessmentTitle} assessment!`,
      url: window.location.origin
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(
        `I scored ${results.percentage}% on the ${results.assessmentTitle} assessment! Check it out at ${window.location.origin}`
      );
      toast({
        title: "Link copied!",
        description: "Share link copied to clipboard",
      });
    }
  };

  const handleDownload = () => {
    const resultsData = {
      assessment: results.assessmentTitle,
      score: `${results.percentage}%`,
      correct: `${results.correctAnswers}/${results.totalQuestions}`,
      points: results.totalPoints,
      timeSpent: `${Math.floor(results.timeSpent / 60)}:${(results.timeSpent % 60).toString().padStart(2, '0')}`,
      completedAt: new Date(results.completedAt).toLocaleDateString(),
      badges: earnedBadges
    };

    const dataStr = JSON.stringify(resultsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `assessment-results-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* <AppHeader /> */}
      
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Trophy className="w-16 h-16 text-yellow-500" />
          </div>
          <h1 className="text-3xl font-bold">Assessment Complete!</h1>
          <p className="text-muted-foreground">
            {results.assessmentTitle}
          </p>
        </div>

        {/* Score Overview */}
        <Card className="border-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Your Score</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-2">
              <div className={`text-6xl font-bold ${getScoreColor(results.percentage)}`}>
                {results.percentage}%
              </div>
              <Badge variant={getScoreBadgeVariant(results.percentage)} className="text-lg px-4 py-1">
                {results.correctAnswers}/{results.totalQuestions} Correct
              </Badge>
            </div>
            
            {/* <Progress value={results.percentage} className="h-3" /> */}
            
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              {getPerformanceMessage(results.percentage)}
            </p>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary">{results.totalPoints}</p>
              <p className="text-sm text-muted-foreground">Points Earned</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary">{formatTime(results.timeSpent)}</p>
              <p className="text-sm text-muted-foreground">Time Taken</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary">
                {Math.round((results.correctAnswers / results.totalQuestions) * 100)}%
              </p>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </CardContent>
          </Card>
        </div>

        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                New Badges Earned!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {earnedBadges.map((badgeId) => (
                  <div key={badgeId} className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <Star className="w-5 h-5 text-yellow-600" />
                    <span className="font-medium text-yellow-800">
                      Badge: {badgeId}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.percentage >= 80 ? (
              <div className="space-y-2">
                <p className="text-sm">🎉 Excellent work! Consider these next steps:</p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Try a more advanced assessment</li>
                  <li>• Share your achievement with your network</li>
                  <li>• Apply these skills to real projects</li>
                </ul>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm">📚 Recommended areas for improvement:</p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Review the topics you found challenging</li>
                  <li>• Practice with similar assessments</li>
                  <li>• Consider retaking this assessment</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share Results
          </Button>
          
          <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Report
          </Button>
          
          <Button onClick={() => navigate('/youth/assessments')} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Take Another
          </Button>
          
          <Button onClick={() => navigate('/youth/dashboard')} className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;