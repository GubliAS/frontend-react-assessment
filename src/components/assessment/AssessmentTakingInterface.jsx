import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import Button  from '../../components/shared/Button';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { Clock, ArrowLeft, ArrowRight, Flag, AlertTriangle } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { getAssessmentState, saveAssessmentState, checkBadgeEarned } from '../../utils/AssessmentState';

const AssessmentTakingInterface = ({ assessment, onComplete, onExit }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(assessment.timeLimit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeRemaining <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Auto-save answers
  useEffect(() => {
    const state = getAssessmentState();
    const updatedState = {
      ...state,
      currentAssessment: assessment.id,
      answers: selectedAnswers,
      currentQuestionIndex: currentQuestion,
      timer: timeRemaining,
      isActive: true
    };
    saveAssessmentState(updatedState);
  }, [selectedAnswers, currentQuestion, timeRemaining, assessment.id]);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = useCallback(() => {
    let correctAnswers = 0;
    let totalPoints = 0;

    assessment.questions.forEach(question => {
      const userAnswer = selectedAnswers[question.id];
      if (userAnswer === question.correctAnswer) {
        correctAnswers++;
        totalPoints += question.points;
      }
    });

    const percentage = (correctAnswers / assessment.questions.length) * 100;
    
    return {
      assessmentId: assessment.id,
      assessmentTitle: assessment.title,
      correctAnswers,
      totalQuestions: assessment.questions.length,
      percentage: Math.round(percentage),
      totalPoints,
      timeSpent: assessment.timeLimit - timeRemaining,
      completedAt: new Date().toISOString()
    };
  }, [assessment, selectedAnswers, timeRemaining]);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const results = calculateResults();
      const state = getAssessmentState();
      
      // Check for earned badges
      const earnedBadges = checkBadgeEarned(state.badges, results);
      
      // Update badges
      const updatedBadges = state.badges.map(badge => ({
        ...badge,
        earned: badge.earned || earnedBadges.includes(badge.id),
        earnedDate: earnedBadges.includes(badge.id) ? new Date().toISOString() : badge.earnedDate
      }));

      // Update state
      const updatedState = {
        ...state,
        currentAssessment: null,
        answers: {},
        currentQuestionIndex: 0,
        timer: 0,
        isCompleted: true,
        isActive: false,
        totalPoints: state.totalPoints + results.totalPoints,
        badges: updatedBadges,
        streak: state.streak + 1
      };

      saveAssessmentState(updatedState);

      if (earnedBadges.length > 0) {
        toast({
          title: "🎉 Badge Earned!",
          description: `You earned ${earnedBadges.length} new badge(s)!`,
        });
      }

      // Navigate to results page with results data
      navigate('/youth/assessment/results', { state: { results, earnedBadges } });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit assessment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExit = () => {
    setShowExitDialog(true);
  };

  const confirmExit = () => {
    const state = getAssessmentState();
    const updatedState = {
      ...state,
      currentAssessment: null,
      isActive: false
    };
    saveAssessmentState(updatedState);
    onExit();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestionData = assessment.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;
  const answeredQuestions = Object.keys(selectedAnswers).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExit}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Exit
            </Button>
            <div>
              <h1 className="text-xl font-semibold">{assessment.title}</h1>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {assessment.questions.length}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4" />
              <span className={timeRemaining < 300 ? 'text-destructive font-medium' : ''}>
                {formatTime(timeRemaining)}
              </span>
            </div>
            <Badge variant="outline">
              {answeredQuestions}/{assessment.questions.length} answered
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-card border-b p-4">
        <div className="max-w-4xl mx-auto">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg mb-2">
                  {currentQuestionData.question}
                </CardTitle>
                {currentQuestionData.context && (
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                    Context: {currentQuestionData.context}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant="secondary">
                  {currentQuestionData.points} pts
                </Badge>
                <Badge variant="outline">
                  {currentQuestionData.difficulty}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {currentQuestionData.options.map((option, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted ${
                  selectedAnswers[currentQuestionData.id] === index
                    ? 'border-primary bg-primary/5'
                    : 'border-border'
                }`}
                onClick={() => handleAnswerSelect(currentQuestionData.id, index)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedAnswers[currentQuestionData.id] === index
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground'
                  }`} />
                  <span className="text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex gap-2">
            {currentQuestion === assessment.questions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || answeredQuestions === 0}
                className="flex items-center gap-2"
              >
                <Flag className="w-4 h-4" />
                {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Warning for unanswered questions */}
        {answeredQuestions < assessment.questions.length && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">
                You have {assessment.questions.length - answeredQuestions} unanswered questions.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Exit Confirmation Dialog */}
      {showExitDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Exit Assessment?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Are you sure you want to exit? Your progress will be lost.
              </p>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowExitDialog(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmExit}>
                  Exit Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AssessmentTakingInterface;