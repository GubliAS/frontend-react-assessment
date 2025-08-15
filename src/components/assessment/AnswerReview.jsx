import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, ArrowLeft, ArrowRight, BookOpen, Lightbulb, ExternalLink } from 'lucide-react';

const AnswerReview = ({ assessment, userAnswers, results, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [filterType, setFilterType] = useState('all'); // all, correct, incorrect

  if (!assessment || !userAnswers || !results) {
    return null;
  }

  const filteredQuestions = assessment.questions.filter((question, index) => {
    const userAnswer = userAnswers[question.id];
    const isCorrect = userAnswer === question.correctAnswer;
    
    switch (filterType) {
      case 'correct':
        return isCorrect;
      case 'incorrect':
        return !isCorrect;
      default:
        return true;
    }
  });

  const currentQuestionData = filteredQuestions[currentQuestion];
  const currentQuestionIndex = assessment.questions.findIndex(q => q.id === currentQuestionData?.id);
  const userAnswer = userAnswers[currentQuestionData?.id];
  const isCorrect = userAnswer === currentQuestionData?.correctAnswer;

  const handleNext = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getAnswerStatusIcon = (questionId) => {
    const userAns = userAnswers[questionId];
    const question = assessment.questions.find(q => q.id === questionId);
    const correct = userAns === question?.correctAnswer;
    
    return correct ? (
      <CheckCircle className="w-5 h-5 text-green-600" />
    ) : (
      <XCircle className="w-5 h-5 text-red-600" />
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getExplanation = (question, userAnswer, correctAnswer) => {
    // Mock explanations - in real app, these would come from your data
    const explanations = {
      'verbal-1': "Accra is the capital and largest city of Ghana, located on the Atlantic coast in the Greater Accra Region.",
      'numerical-1': "To calculate the total cost: 8 GH₵ × 5.5 kg = 44 GH₵. This is a basic multiplication problem using Ghana's currency.",
      'logical-1': "The pattern follows Ghana's largest cities by population in descending order. Wa is the next largest after Tamale.",
      'spatial-1': "Upper West region shares borders with both Upper East and Northern regions, making it the connecting region between them."
    };
    
    return explanations[question.id] || "This question tests your understanding of the core concepts. Review the related materials for better comprehension.";
  };

  const getLearningResources = (question) => {
    // Mock learning resources
    const resources = {
      'verbal': [
        { title: "Ghana Geography Guide", url: "#", type: "article" },
        { title: "West African Countries Overview", url: "#", type: "video" }
      ],
      'numerical': [
        { title: "Currency Conversion Practice", url: "#", type: "exercise" },
        { title: "Basic Mathematics Review", url: "#", type: "course" }
      ],
      'logical': [
        { title: "Pattern Recognition Techniques", url: "#", type: "tutorial" },
        { title: "Logical Reasoning Fundamentals", url: "#", type: "article" }
      ],
      'spatial': [
        { title: "Ghana Regional Map Study", url: "#", type: "interactive" },
        { title: "Spatial Reasoning Skills", url: "#", type: "practice" }
      ]
    };
    
    return resources[question.type] || [];
  };

  if (!currentQuestionData) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No questions match your filter</h3>
            <p className="text-muted-foreground mb-4">
              Try changing the filter to see different questions
            </p>
            <Button onClick={() => setFilterType('all')}>
              Show All Questions
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Answer Review</h1>
          <p className="text-muted-foreground">{assessment.title}</p>
        </div>
        <Button variant="outline" onClick={onClose}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Results
        </Button>
      </div>

      {/* Filter Tabs */}
      <Tabs value={filterType} onValueChange={setFilterType}>
        <TabsList>
          <TabsTrigger value="all">All Questions ({assessment.questions.length})</TabsTrigger>
          <TabsTrigger value="correct">
            Correct ({assessment.questions.filter(q => userAnswers[q.id] === q.correctAnswer).length})
          </TabsTrigger>
          <TabsTrigger value="incorrect">
            Incorrect ({assessment.questions.filter(q => userAnswers[q.id] !== q.correctAnswer).length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Navigation Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-96 overflow-y-auto">
              {filteredQuestions.map((question, index) => {
                const questionIndex = assessment.questions.findIndex(q => q.id === question.id);
                const isCurrentQ = index === currentQuestion;
                const userAns = userAnswers[question.id];
                const correct = userAns === question.correctAnswer;
                
                return (
                  <div
                    key={question.id}
                    className={`p-3 rounded-lg cursor-pointer border transition-colors ${
                      isCurrentQ 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:bg-muted'
                    }`}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Q{questionIndex + 1}</span>
                      {getAnswerStatusIcon(question.id)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {question.type} • {question.difficulty}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Question Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(currentQuestionData.difficulty)}>
                      {currentQuestionData.difficulty}
                    </Badge>
                    <Badge variant="outline">
                      {currentQuestionData.type}
                    </Badge>
                    <Badge variant="outline">
                      {currentQuestionData.points} pts
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">
                    Question {currentQuestionIndex + 1} of {assessment.questions.length}
                  </CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-600" />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">{currentQuestionData.question}</p>
              {currentQuestionData.context && (
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <p className="text-sm">
                    <strong>Context:</strong> {currentQuestionData.context}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Answer Options */}
          <Card>
            <CardHeader>
              <CardTitle>Answer Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQuestionData.options.map((option, index) => {
                const isUserAnswer = userAnswer === index;
                const isCorrectAnswer = currentQuestionData.correctAnswer === index;
                
                let optionClass = 'p-4 border rounded-lg ';
                if (isCorrectAnswer) {
                  optionClass += 'border-green-500 bg-green-50 ';
                } else if (isUserAnswer && !isCorrectAnswer) {
                  optionClass += 'border-red-500 bg-red-50 ';
                } else {
                  optionClass += 'border-border ';
                }
                
                return (
                  <div key={index} className={optionClass}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{option}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {isUserAnswer && (
                          <Badge variant="outline" className="text-xs">
                            Your Answer
                          </Badge>
                        )}
                        {isCorrectAnswer && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            Correct
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Explanation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Explanation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                {getExplanation(currentQuestionData, userAnswer, currentQuestionData.correctAnswer)}
              </p>
            </CardContent>
          </Card>

          {/* Learning Resources */}
          {getLearningResources(currentQuestionData).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Learning Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getLearningResources(currentQuestionData).map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors">
                      <div>
                        <p className="font-medium">{resource.title}</p>
                        <p className="text-xs text-muted-foreground capitalize">{resource.type}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} of {filteredQuestions.length} questions
            </span>
            
            <Button
              variant="outline"
              onClick={handleNext}
              disabled={currentQuestion === filteredQuestions.length - 1}
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerReview;