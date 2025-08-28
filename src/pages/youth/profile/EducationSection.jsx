import React, { useState } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { addEducation, updateEducation, removeEducation } from '../../../redux/educationSection/EducationSlice';
import { useEducation } from '../../../redux/educationSection/useEducationInfo';
import InputField from '../../../components/shared/InputField';
import SelectField from '../../../components/shared/SelectInputField';
import Button from '../../../components/shared/Button';
// Added imports to persist education to backend and show toast
import { updateProfile } from '../../../services/profile';
import { useToast } from '../../../hooks/use-toast';
import { useDispatch } from 'react-redux';
import { loadProfile } from '../../../redux/profile/profileActions';

const GHANA_INSTITUTIONS = [
  'University of Ghana',
  'Kwame Nkrumah University of Science and Technology (KNUST)',
  'University of Cape Coast (UCC)',
  'University for Development Studies (UDS)',
  'University of Education, Winneba (UEW)',
  'Ghana Institute of Management and Public Administration (GIMPA)',
  'Ashesi University',
  'Presbyterian University College',
  'Valley View University',
  'Central University',
  'Methodist University College',
  'Wisconsin International University College',
  'Regent University College',
  'Accra Technical University',
  'Ho Technical University',
  'Tamale Technical University',
  'Sunyani Technical University',
  'Koforidua Technical University',
  'Takoradi Technical University',
  'Bolgatanga Technical University',
  'Cape Coast Technical University',
  'Wa Technical University',
];

const DEGREE_LEVELS = [
  'High School / Secondary',
  'Diploma',
  'Higher National Diploma (HND)',
  "Bachelor's Degree",
  "Master's Degree",
  'PhD / Doctorate',
  'Professional Certificate',
  'Vocational Training'
];

const currentYear = new Date().getFullYear();
const YEARS = [
  { value: '', label: 'Year' },
  ...Array.from({ length: 60 }, (_, i) => {
    const y = String(currentYear - i);
    return { value: y, label: y };
  })
];

const EducationSection = () => {
  const { educationList, dispatch } = useEducation();

  // added toast + store dispatch for reloading canonical profile
  const { toast } = useToast();
  const storeDispatch = useDispatch();

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
const [formData, setFormData] = useState({
  institution: '',
  degree: '',
  fieldOfStudy: '',
  startYear: '', // Use empty string instead of null
  endYear: '',   // Use empty string instead of null
  grade: '',
  isCurrent: false,
});

  // parse year from multiple possible stored formats (yyyy, yyyy-mm-dd, dd/mm/yyyy, Date string)
  const parseYear = (v) => {
    if (!v && v !== 0) return '';
    const s = String(v).trim();
    if (/^\d{4}$/.test(s)) return s;
    // ISO like 2024-04-01 or 2024-04
    const iso = s.match(/^(\d{4})-/);
    if (iso) return iso[1];
    // dd/mm/yyyy
    const dm = s.match(/\/(\d{4})$/);
    if (dm) return dm[1];
    // fallback Date parse
    const d = new Date(s);
    if (!isNaN(d)) return String(d.getFullYear());
    return '';
  };

  const handleInputChange = (field, value) => {
    // when toggling "currently studying here", set endYear to current year (string for selects)
    if (field === 'isCurrent') {
      const isCurr = !!value;
      setFormData((prev) => ({
        ...prev,
        isCurrent: isCurr,
        endYear: isCurr ? String(currentYear) : null,
      }));
      console.log(currentYear)
      return;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (data = formData) => {
    const { institution, degree, fieldOfStudy } = data;
    const startY = parseYear(data.startYear);
    if (!institution || !degree || !fieldOfStudy || !startY) {
      alert('Please fill in all required fields (ensure Start Year is set)');
      return false;
    }
    // if not current, ensure end year is parsable
    if (!data.isCurrent) {
      const endY = parseYear(data.endYear);
      if (!endY) {
        alert('Please provide a valid End Year, or mark "Currently studying here".');
        return false;
      }
      // optional: ensure end >= start
      if (Number(endY) < Number(startY)) {
        alert('End year cannot be before start year.');
        return false;
      }
    }
    return true;
  };

  // helper: read missing values directly from DOM (covers browser autofill)
  const readFormFallback = (formEl) => {
    const names = ['institution', 'degree', 'fieldOfStudy', 'startYear', 'endYear', 'grade', 'isCurrent'];
    const updates = {};
    names.forEach((n) => {
      // form controls created with name prop
      const el = formEl.elements?.[n];
      if (!el) return;
      const val = el.type === 'checkbox' ? el.checked : el.value;
      // only use fallback if state value empty/undefined
      if (
        formData[n] === undefined ||
        formData[n] === '' ||
        formData[n] === null
      ) {
        updates[n] = val;
      }
    });
    return { ...formData, ...updates };
  };

  // persist education list to profile API (mirrors WorkExperienceSection approach)
  const persistEducation = async (list) => {
    try {
      console.log('Persisting education list to profile:', list);
      await updateProfile({ education: list });
      // refresh canonical profile so all slices remain in sync
      await storeDispatch(loadProfile());
      toast?.({ title: 'Profile updated', description: 'Education saved.' });
    } catch (err) {
      console.error('Failed to save education to profile:', err);
      toast?.({
        title: 'Save failed',
        description: err?.message || 'Failed to save education.',
        variant: 'destructive',
      });
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // merge state with any DOM values (handles autofill)
    const merged = readFormFallback(e.target);

    if (!validateForm(merged)) return;

    // normalize isCurrent (checkbox/dom may give boolean or string)
    const isCurr = merged.isCurrent === true || merged.isCurrent === 'true';
    // convert years to numbers for backend; ensure present students get currentYear
    const startYearNum = Number(parseYear(merged.startYear));
    const endYearNum = isCurr ? currentYear : Number(parseYear(merged.endYear));

    const payload = {
      ...merged,
      startYear: startYearNum,
      endYear: endYearNum,
      isCurrent: !!isCurr
    };

    if (editingId) {
      // reducer expects { id, data }
      dispatch(updateEducation({ id: editingId, data: payload }));
      // build updated list for persistence
      const updatedList = educationList.map((ed) =>
        ed.id === editingId ? { ...ed, ...payload } : ed
      );
      setEditingId(null);
      // persist canonical list (don't block UI)
      persistEducation(updatedList).catch(() => {});
    } else {
      // let the slice generate the id (slice already creates one)
      dispatch(addEducation(payload));
      // optimistic list for persistence
      const newList = [...(educationList || []), payload];
      persistEducation(newList).catch(() => {});
    }

    resetForm();
  };

  const handleEdit = (edu) => {
    // populate form with normalized year strings (handles storage in different formats)
    const sYear = parseYear(edu.startYear) || edu.startYear || '';
    let eYear = parseYear(edu.endYear) || edu.endYear || '';
    // if this entry is marked current, ensure the form endYear shows the current year
    if (edu.isCurrent && !eYear) eYear = String(currentYear);
    setFormData({
      ...edu,
      startYear: sYear,
      endYear: eYear,
      isCurrent: !!edu.isCurrent
    });
    setEditingId(edu.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startYear: null,
      endYear: null,
      grade: '',
      isCurrent: false
    });
    setEditingId(null);
    setShowForm(false);
  };
  console.log()
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Education</h2>
        <p className="text-gray-600">Add your educational background to showcase your qualifications.</p>
      </div>

      {/* Existing entries */}
      <div className="space-y-4">
        {educationList?.map((edu) => (
          <div key={edu.id} className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(edu)}
                  className="p-2"
                  aria-label="Edit education"
                >
                  <Edit className="w-4 h-4" />
                  <span className="sr-only">Edit</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    // compute new list and persist after removing locally
                    const updatedList = (educationList || []).filter((w) => w.id !== edu.id);
                    dispatch(removeEducation(edu.id));
                    await persistEducation(updatedList).catch(() => {});
                  }}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  aria-label="Delete education"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-sm">
              <div>
                <span className="font-medium">Field of Study:</span>
                <p>{edu.fieldOfStudy}</p>
              </div>
              <div>
                <span className="font-medium">Grade:</span>
                <p>{edu.grade || 'Not specified'}</p>
              </div>
              <div className="col-span-1 md:col-span-2">
                <span className="font-medium">Period:</span>
                <p>
                  {edu.startYear} - {edu.isCurrent ? 'Present' : edu.endYear || 'Not specified'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!showForm && (
       
            <Button 
                  onClick={() => setShowForm(true)} 
                  variant="outline" 
                  className="w-full border-dashed border-2 hover:border-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" /> 
                   Add Education
                </Button>
      )}

      {showForm && (
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? 'Edit Education' : 'Add New Education'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Institution and Degree */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="Institution"
                name="institution"
                value={formData.institution}
                onChange={(e) => handleInputChange('institution', e.target.value)}
                options={GHANA_INSTITUTIONS.map(inst => ({ value: inst, label: inst }))}
                required
               variant="light"
              />
              
              <SelectField
                label="Degree Level"
                name="degree"
                value={formData.degree}
                onChange={(e) => handleInputChange('degree', e.target.value)}
                options={DEGREE_LEVELS.map(deg => ({ value: deg, label: deg }))}
                required
               variant="light"
              />
            </div>

            {/* Field of Study */}
            <InputField
              label="Field of Study"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
              placeholder="Enter your field of study"
              required
         variant="light"
            />

            {/* Grade */}
            <InputField
              label="Grade"
              name="grade"
              value={formData.grade}
              onChange={(e) => handleInputChange('grade', e.target.value)}
              placeholder="Enter your grade (e.g., 3.5 GPA, First Class, etc.)"
             variant="light"
            />

            {/* Date Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
                <select
                  name="startYear"
                  value={formData.startYear}
                  onChange={(e) => handleInputChange('startYear', e.target.value)}
                  required
                  className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  {YEARS.map(year => (
                    <option key={year.value} value={year.value} disabled={year.value === ''}>
                      {year.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Year</label>
                <select
                  name="endYear"
                  value={formData.endYear}
                  onChange={(e) => handleInputChange('endYear', e.target.value)}
                  disabled={formData.isCurrent}
                  className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {YEARS.map(year => (
                    <option key={year.value} value={year.value} disabled={year.value === ''}>
                      {year.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Current Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isCurrent}
                onChange={(e) => handleInputChange('isCurrent', e.target.checked)}
                id="isCurrent"
                name="isCurrent"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isCurrent" className="text-sm">
                Currently studying here
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex gap-2 pt-4">
             <Button
                type="submit"
                variant="emeraldGradient"
                size="medium"
                className="px-4 py-2"
              >
                {editingId ? 'Update Education' : 'Add Education'}
              </Button>
              <button 
                type="button" 
                onClick={handleCancel} 
                className="border px-4 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EducationSection;