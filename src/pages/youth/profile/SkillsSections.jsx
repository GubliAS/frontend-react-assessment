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
// Added imports for persisting skills
import { updateProfile, createProfile } from '../../../services/profile';
import { useToast } from '../../../hooks/use-toast';
import { useDispatch } from 'react-redux';
import { loadProfile } from '../../../redux/profile/profileActions';
import { PREDEFINED_SKILLS } from '../../../utils/constants';

const SkillForm= () => {
  const { skills, dispatch } = useSkills();
  const { toast } = useToast();
  const storeDispatch = useDispatch();

  const [currentInput, setCurrentInput] = useState('');
  const [currentCategory, setCurrentCategory] = useState('technical');
  const [currentLevel, setCurrentLevel] = useState('intermediate');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showLimitWarning, setShowLimitWarning] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const inputRef = useRef(null);
  const MAX_PER_CATEGORY = 10;
  const currentCount = skills.filter(s => s.category === currentCategory).length;

  // Use shared PREDEFINED_SKILLS from utils/constants
 
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

  const filteredSuggestions = (PREDEFINED_SKILLS[currentCategory] || []).filter(
    skill => skill.toLowerCase().includes(currentInput.toLowerCase()) &&
             !skills.some(s => s.name.toLowerCase() === skill.toLowerCase())
  );

  // helper to create an id consistent with slice fallback
  const createClientId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

  // Build categorized arrays expected by backend
  const categorize = (list = []) => {
    const tech = [];
    const soft = [];
    const lang = [];
    (list || []).forEach(item => {
      const cat = (item && (item.category || item.type) || 'technical').toString().toLowerCase();
      const normalized = { ...item };
      // ensure minimal shape: name + optional level
      if (typeof normalized === 'string') normalized.name = normalized;
      if (cat === 'technical') tech.push(normalized);
      else if (cat === 'soft') soft.push(normalized);
      else if (cat === 'language') lang.push(normalized);
      else tech.push(normalized);
    });
    return { tech, soft, lang };
  };

  // Persist skills to profile (update -> fallback create on 404)
  const persistSkills = async (list) => {
    const { tech, soft, lang } = categorize(list);
    // Send empty arrays when clearing last items to ensure server sync
    const payload = {
      technicalSkills: tech,
      softSkills: soft,
      languages: lang,
    };

    try {
      await updateProfile(payload);
      await storeDispatch(loadProfile());
      toast?.({ title: 'Profile updated', description: 'Skills saved.' });
    } catch (err) {
      const status = err?.status || err?.response?.status;
      if (status === 404) {
        try {
          await createProfile(payload);
          await storeDispatch(loadProfile());
          toast?.({ title: 'Profile created', description: 'Skills saved.' });
          return;
        } catch (createErr) {
          console.error('Failed to create profile with skills:', createErr);
          toast?.({ title: 'Save failed', description: createErr?.message || 'Failed to save skills.', variant: 'destructive' });
          throw createErr;
        }
      }
      console.error('Failed to save skills to profile:', err);
      toast?.({ title: 'Save failed', description: err?.message || 'Failed to save skills.', variant: 'destructive' });
      throw err;
    }
  };

  const handleAddSkill = (skillName) => {
    if (!skillName.trim()) return;
    if (currentCount >= MAX_PER_CATEGORY) {
      setShowLimitWarning(true);
      return;
    }

    // create an id locally so we can build optimistic payload for persistence
    const clientId = createClientId();
    const payload = { id: clientId, name: skillName.trim(), category: currentCategory, level: currentLevel };

    dispatch(addSkill(payload));
    setCurrentInput('');
    setShowSuggestions(false);
    inputRef.current?.focus();

    // optimistic persistence (don't block UI)
    const newList = [...skills, payload];
    persistSkills(newList).catch(() => {});
  };

  const handleRemoveSkill = (id) => {
    // compute optimistic list then dispatch + persist
    const updatedList = skills.filter(s => s.id !== id && s._id !== id);
    dispatch(removeSkill(id));
    persistSkills(updatedList).catch(() => {});
  };

  const handleUpdateLevel = (id, level) => {
    // update locally then persist new list
    dispatch(updateSkill({ id, data: { level } }));
    const updatedList = skills.map(s => (s.id === id || s._id === id ? { ...s, level } : s));
    persistSkills(updatedList).catch(() => {});
  };

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
    // update local slice and persist
    dispatch(reorderSkills(newSkills));
    persistSkills(newSkills).catch(() => {});
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

                  <Select value={currentLevel} onValueChange={setCurrentLevel}>
                    <SelectTrigger className="w-full h-10 bg-white text-gray-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Proficiency Level" disabled className="text-gray-500">Proficiency Level</SelectItem>
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
                        className="flex items-center justify-between p-3 bg-gray-200 rounded-lg cursor-move hover:bg-gray-300 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <GripVertical className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{skill.name}</span>
                          <Badge className={levelColors[skill.level]} variant="outline">{skill.level}</Badge>
                        </div>

                        <div className="flex items-center space-x-2">
                        
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
