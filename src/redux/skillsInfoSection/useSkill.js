import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const useSkills = () => {
  const dispatch = useAppDispatch();
  const technicalSkills = useAppSelector(state => state.skills.technicalSkills || []);
  const softSkills = useAppSelector(state => state.skills.softSkills || []);
  const languages = useAppSelector(state => state.skills.languages || []);
  const isLoading = useAppSelector(state => state.skills.isLoading);
  const error = useAppSelector(state => state.skills.error);
  const editingId = useAppSelector(state => state.skills.editingId);
  const showForm = useAppSelector(state => state.skills.showForm);
  const formData = useAppSelector(state => state.skills.formData);

  // normalize level/proficiency values so UI selects match available options
  const normalizeLevel = (lvl) => {
    if (lvl === undefined || lvl === null) return 'intermediate';
    const s = String(lvl).trim().toLowerCase();
    if (!s) return 'intermediate';
    if (s === 'expert' || s === 'pro' || s === 'master') return 'advanced';
    if (s === 'advanced' || s === 'senior') return 'advanced';
    if (s === 'intermediate' || s === 'mid' || s === 'competent') return 'intermediate';
    if (s === 'beginner' || s === 'novice' || s === 'junior' || s === 'basic') return 'beginner';
    // if backend used 'proficiency' values like 'Expert'/'Advanced', map them; otherwise fallback to the raw lowercase value
    if (['advanced','intermediate','beginner'].includes(s)) return s;
    return 'intermediate';
  };

  // combined skills for UI convenience (adds category and ensures id field, and normalizes level)
  const skills = [
    ...technicalSkills.map(item => ({
      ...item,
      category: 'technical',
      id: item.id || item._id,
      level: normalizeLevel(item.level || item.proficiency)
    })),
    ...softSkills.map(item => ({
      ...item,
      category: 'soft',
      id: item.id || item._id,
      level: normalizeLevel(item.level || item.proficiency)
    })),
    ...languages.map(item => ({
      ...item,
      category: 'language',
      id: item.id || item._id,
      level: normalizeLevel(item.level || item.proficiency)
    })),
  ];

  return { dispatch, skills, technicalSkills, softSkills, languages, isLoading, error, editingId, showForm, formData };
};
