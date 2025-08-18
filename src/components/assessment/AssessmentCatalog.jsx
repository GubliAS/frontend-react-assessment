import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import  Button  from '../../components/shared/Button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Checkbox } from '../../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Separator } from '../../components/ui/separator';
import { Search, Filter, BookOpen, Clock, Star, Trophy, Target, Brain } from 'lucide-react';
import { assessmentTemplates } from '../../utils/AssessmentData';

const AssessmentCatalog = ({ onStartAssessment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [sortBy, setSortBy] = useState('title');
  const [showFilters, setShowFilters] = useState(false);

  const assessmentTypes = ['verbal', 'numerical', 'logical', 'spatial', 'mixed'];
  const difficulties = ['easy', 'medium', 'hard'];

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
      case 'spatial': return '🎯';
      case 'mixed': return '🎭';
      default: return '📊';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'verbal': return 'bg-blue-100 text-blue-800';
      case 'numerical': return 'bg-purple-100 text-purple-800';
      case 'logical': return 'bg-orange-100 text-orange-800';
      case 'spatial': return 'bg-pink-100 text-pink-800';
      case 'mixed': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleDifficultyToggle = (difficulty) => {
    setSelectedDifficulties(prev => 
      prev.includes(difficulty) 
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const filteredAssessments = assessmentTemplates
    .filter(assessment => {
      const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           assessment.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(assessment.type);
      const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(assessment.difficulty);
      
      return matchesSearch && matchesType && matchesDifficulty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'difficulty':
          const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'points':
          return b.points - a.points;
        case 'time':
          return a.timeLimit - b.timeLimit;
        case 'questions':
          return b.questions.length - a.questions.length;
        default:
          return a.title.localeCompare(b.title);
      }
    });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTypes([]);
    setSelectedDifficulties([]);
    setSortBy('title');
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Assessment Catalog</h1>
        <p className="text-muted-foreground">
          Discover and take assessments to test your skills and knowledge
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search assessments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="difficulty">Difficulty</SelectItem>
              <SelectItem value="points">Points</SelectItem>
              <SelectItem value="time">Duration</SelectItem>
              <SelectItem value="questions">Questions</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Assessment Types */}
                <div>
                  <h3 className="font-medium mb-3">Assessment Type</h3>
                  <div className="space-y-2">
                    {assessmentTypes.map(type => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={() => handleTypeToggle(type)}
                        />
                        <label htmlFor={type} className="flex items-center gap-2 text-sm capitalize cursor-pointer">
                          <span>{getTypeIcon(type)}</span>
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Difficulty Levels */}
                <div>
                  <h3 className="font-medium mb-3">Difficulty</h3>
                  <div className="space-y-2">
                    {difficulties.map(difficulty => (
                      <div key={difficulty} className="flex items-center space-x-2">
                        <Checkbox
                          id={difficulty}
                          checked={selectedDifficulties.includes(difficulty)}
                          onCheckedChange={() => handleDifficultyToggle(difficulty)}
                        />
                        <label htmlFor={difficulty} className="text-sm capitalize cursor-pointer">
                          {difficulty}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Separator className="my-4" />
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={clearFilters} size="sm">
                  Clear Filters
                </Button>
                <div className="text-sm text-muted-foreground flex items-center">
                  {filteredAssessments.length} assessment(s) found
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Results */}
      {filteredAssessments.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No assessments found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssessments.map((assessment) => (
            <Card key={assessment.id} className="hover:shadow-lg transition-all cursor-pointer group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{getTypeIcon(assessment.type)}</div>
                    <div className="space-y-1">
                      <Badge className={getDifficultyColor(assessment.difficulty)}>
                        {assessment.difficulty}
                      </Badge>
                      <Badge variant="outline" className={getTypeColor(assessment.type)}>
                        {assessment.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {assessment.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {assessment.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Assessment Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">{assessment.questions.length}</p>
                    <p className="text-xs text-muted-foreground">Questions</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-center">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">{Math.floor(assessment.timeLimit / 60)}m</p>
                    <p className="text-xs text-muted-foreground">Duration</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-center">
                      <Star className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">{assessment.points}</p>
                    <p className="text-xs text-muted-foreground">Points</p>
                  </div>
                </div>

                {/* Badge Preview */}
                {assessment.badge && (
                  <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                    <Trophy className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-muted-foreground">
                      Earn badge: {assessment.badge}
                    </span>
                  </div>
                )}

                <Button 
                  onClick={() => onStartAssessment(assessment)}
                  className="w-full"
                  variant='emeraldGradient'
                >
                  Start Assessment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssessmentCatalog;