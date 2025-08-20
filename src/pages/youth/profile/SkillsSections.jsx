import React, { useState, useRef, useEffect } from 'react';
import { useSkills } from '../../../redux/skillsInfoSection/useSkill';
import Button from '../../../components/shared/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';
import { Badge } from '../../../components/ui/badge';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../../components/ui/select';
import { Label } from '../../../components/ui/label';
import InputField from '../../../components/shared/InputField'; // <- Use your custom InputField
import { X, Plus, GripVertical } from 'lucide-react';
import { addSkill, removeSkill, updateSkill, reorderSkills } from '../../../redux/skillsInfoSection/SkillSlice';

const SkillForm= () => {
  const { skills, dispatch } = useSkills();
  const [currentInput, setCurrentInput] = useState('');
  const [currentCategory, setCurrentCategory] = useState('technical');
  const [currentLevel, setCurrentLevel] = useState('intermediate');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showLimitWarning, setShowLimitWarning] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const inputRef = useRef(null);
  const MAX_PER_CATEGORY = 10;
  const currentCount = skills.filter(s => s.category === currentCategory).length;

  const predefinedSkills = {
    technical: ['JavaScript','TypeScript','React','Node.js','Python','Java','C++','SQL','MongoDB','PostgreSQL','AWS','Docker','Kubernetes','Git','HTML','CSS','Angular','Vue.js','Express.js','Django','Spring Boot','Machine Learning','Data Analysis','Cybersecurity','DevOps','Mobile Development','UI/UX Design'],
    soft: ['Communication','Leadership','Teamwork','Problem Solving','Critical Thinking','Time Management','Adaptability','Creativity','Public Speaking','Negotiation','Project Management','Emotional Intelligence','Conflict Resolution','Mentoring','Strategic Planning','Decision Making','Customer Service','Analytical Thinking'],
    language: ['English','Spanish','French','German','Chinese','Japanese','Korean','Arabic','Portuguese','Italian','Russian','Dutch','Swedish','Norwegian','Hindi','Bengali','Turkish','Polish','Hebrew','Thai','Vietnamese']
  };

  const levelColors = {
    beginner: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    intermediate: 'bg-blue-100 text-blue-800 border-blue-200',
    advanced: 'bg-green-100 text-green-800 border-green-200'
  };

  const categoryLabels = {
    technical: 'Technical Skills',
    soft: 'Soft Skills',
    language: 'Languages'
  };

  const filteredSuggestions = predefinedSkills[currentCategory].filter(
    skill => skill.toLowerCase().includes(currentInput.toLowerCase()) &&
             !skills.some(s => s.name.toLowerCase() === skill.toLowerCase())
  );

  const handleAddSkill = (skillName) => {
    if (!skillName.trim()) return;
    if (currentCount >= MAX_PER_CATEGORY) {
      setShowLimitWarning(true);
      return;
    }
    dispatch(addSkill({ name: skillName.trim(), category: currentCategory, level: currentLevel }));
    setCurrentInput('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleRemoveSkill = (id) => dispatch(removeSkill(id));
  const handleUpdateLevel = (id, level) => dispatch(updateSkill({ id, level }));

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      e.preventDefault();
      if (currentCount < MAX_PER_CATEGORY) handleAddSkill(currentInput);
    }
  };

  const handleDragStart = (e, id) => { setDraggedItem(id); e.dataTransfer.effectAllowed = 'move'; };
  const handleDragOver = (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; };
  const handleDrop = (e, targetId) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;
    const draggedIndex = skills.findIndex(s => s.id === draggedItem);
    const targetIndex = skills.findIndex(s => s.id === targetId);
    const newSkills = [...skills];
    const [removed] = newSkills.splice(draggedIndex, 1);
    newSkills.splice(targetIndex, 0, removed);
    dispatch(reorderSkills(newSkills));
    setDraggedItem(null);
  };

  const getSkillsByCategory = (category) => skills.filter(s => s.category === category);

  useEffect(() => {
    // clear warning when user switches category or count changes
    if (currentCount < MAX_PER_CATEGORY) setShowLimitWarning(false);
  }, [currentCategory, currentCount]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills & Languages</h2>
        <p className="text-gray-600">Add your skills and languages to showcase your expertise and capabilities.</p>
      </div>

      <Tabs value={currentCategory} onValueChange={setCurrentCategory}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="technical">Technical Skills</TabsTrigger>
          <TabsTrigger value="soft">Soft Skills</TabsTrigger>
          <TabsTrigger value="language">Languages</TabsTrigger>
        </TabsList>

        <TabsContent value={currentCategory} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add {categoryLabels[currentCategory]}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 relative">
                  <InputField
                    ref={inputRef}
                    name="skill"
                    value={currentInput}
                    onChange={e => {
                      setCurrentInput(e.target.value);
                      setShowSuggestions(e.target.value.length > 0);
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder={`Enter ${categoryLabels[currentCategory].toLowerCase()}...`}
                    variant="light"
                  />
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                      {filteredSuggestions.slice(0, 8).map(suggestion => (
                        <button
                          key={suggestion}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                          onMouseDown={() => handleAddSkill(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                  {currentCount >= MAX_PER_CATEGORY && (
                    <p className="mt-2 text-sm text-red-600">Maximum of {MAX_PER_CATEGORY} items reached for {categoryLabels[currentCategory].toLowerCase()}.</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="skill-level" className="text-sm text-gray-700">Proficiency Level</Label>
                  <Select value={currentLevel} onValueChange={setCurrentLevel}>
                    <SelectTrigger className="w-full h-10 bg-white text-gray-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                variant='emeraldGradient'
                onClick={() => handleAddSkill(currentInput)}
                disabled={!currentInput.trim() || currentCount >= MAX_PER_CATEGORY}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add {categoryLabels[currentCategory]}
              </Button>

              <div>
                <Label className="text-sm text-gray-700">Current {categoryLabels[currentCategory]} ({getSkillsByCategory(currentCategory).length})</Label>
                {getSkillsByCategory(currentCategory).length === 0 ? (
                  <p className="text-gray-500 text-sm italic">No {categoryLabels[currentCategory].toLowerCase()} added yet.</p>
                ) : (
                  <div className="space-y-2">
                    {getSkillsByCategory(currentCategory).map(skill => (
                      <div
                        key={skill.id}
                        draggable
                        onDragStart={e => handleDragStart(e, skill.id)}
                        onDragOver={handleDragOver}
                        onDrop={e => handleDrop(e, skill.id)}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <GripVertical className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{skill.name}</span>
                          <Badge className={levelColors[skill.level]} variant="outline">{skill.level}</Badge>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Select value={skill.level} onValueChange={value => handleUpdateLevel(skill.id, value)}>
                            <SelectTrigger className="w-32 h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="outline" size="sm" onClick={() => handleRemoveSkill(skill.id)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillForm;
