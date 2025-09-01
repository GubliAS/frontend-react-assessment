import React, { useState } from 'react';
import InputField from '../../../components/shared/InputField';
// import SelectField from '../../../components/shared/SelectInputField';
import { Plus, Trash2, Edit } from 'lucide-react';
import { useWorkExperience } from '../../../redux/workExperienceSection/useWorkExperience'; // <-- your custom hook
import { addWorkExperience, updateWorkExperience, removeWorkExperience } from '../../../redux/workExperienceSection/WorkExperienceSlice';
import Button from '../../../components/shared/Button';
import { Card } from '../../../components/ui/card';
import { updateProfile, deleteProfileItem } from '../../../services/profile';
import { useToast } from '../../../hooks/use-toast';
import PersonalInfoSection from './PersonalInfoSection';
import { usePersonalInfo } from '../../../redux/personaInfo/usePersonalInfo';
import { useDispatch } from 'react-redux';
import { loadProfile } from '../../../redux/profile/profileActions';
import { MONTHS } from '../../../utils/constants';

// helper: normalize various date values to yyyy-MM-dd for <input type="date">
function formatDateForInput(v) {
  if (!v) return '';
  try {
    const d = typeof v === 'string' ? new Date(v) : v;
    if (isNaN(d)) return '';
    return d.toISOString().slice(0, 10);
  } catch {
    return '';
  }
}

const currentYear = new Date().getFullYear();
const YEARS = [
  { value: '', label: 'Year' },
  ...Array.from({ length: 60 }, (_, i) => ({
    value: String(currentYear - i),
    label: String(currentYear - i)
  }))
];

const WorkExperienceSection = () => {
  const { workExperiences, dispatch } = useWorkExperience(); // from Redux
  const { personalInfo } = usePersonalInfo();
  const { toast } = useToast();
  const storeDispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    // store ISO-like dates directly (yyyy-mm-01) for start and end
    startDate: '',
    endDate: '',
    // keep month/year parts for immediate UI binding
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    isCurrent: false,
    description: '',
    location: '',
  });

  // Parse month/year from various date formats
  const parseMonthYear = (d) => {
    if (!d) return { m: '', y: '' };
    // yyyy-mm(-dd)? pattern
    const isoMatch = String(d).match(/^(\d{4})-(\d{2})(?:-(\d{2}))?/);
    if (isoMatch) return { m: isoMatch[2], y: isoMatch[1] };
    // dd/mm/yyyy
    const dmMatch = String(d).match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (dmMatch) return { m: dmMatch[2], y: dmMatch[3] };
    // Date parse fallback
    const parsed = new Date(d);
    if (!isNaN(parsed)) {
      return { m: String(parsed.getMonth() + 1).padStart(2, '0'), y: String(parsed.getFullYear()) };
    }
    return { m: '', y: '' };
  };

  // Build ISO date string from month/year object
  const buildIsoFromMY = ({ m, y }) => {
    return (m && y) ? `${y}-${m}-01` : '';
  };

  const handleInputChange = (field, value) => {
    // accept event objects
    if (value && typeof value === 'object' && 'target' in value) {
      value = value.target?.value;
    }

    // keep isCurrent toggle behaviour: if checked, clear endDate
    if (field === 'isCurrent') {
      setFormData((prev) => ({ ...prev, isCurrent: !!value, endDate: value ? '' : prev.endDate }));
      return;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle month/year select changes but store as startDate/endDate in ISO (yyyy-mm-01)
  const handleMonthYearChange = (dateField, part, value) => {
    // dateField is 'startDate' or 'endDate'
    const monthKey = dateField === 'startDate' ? 'startMonth' : 'endMonth';
    const yearKey = dateField === 'startDate' ? 'startYear' : 'endYear';

    setFormData((prev) => {
      const next = { ...prev, [monthKey]: prev[monthKey], [yearKey]: prev[yearKey] };
      if (part === 'month') next[monthKey] = value;
      else next[yearKey] = value;

      // build ISO only when both month & year are present
      const iso = (next[monthKey] && next[yearKey]) ? `${next[yearKey]}-${next[monthKey]}-01` : '';
      next[dateField] = iso;
      return next;
    });
  };

  const calculateDuration = (isoStart, isoEnd, current) => {
    if (!isoStart) return '';
    const start = new Date(isoStart);
    const end = current ? new Date() : (isoEnd ? new Date(isoEnd) : null);
    if (isNaN(start) || (!current && !end)) return '';
    const diffMonths = Math.max(0, (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()));
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;
    if (years > 0) return `${years} yr${years > 1 ? 's' : ''}${months > 0 ? ` ${months} mo${months > 1 ? 's' : ''}` : ''}`;
    return `${months} mo${months !== 1 ? 's' : ''}`;
  };

  const formatMonthYear = (iso) => {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      if (isNaN(d)) return '';
      return d.toLocaleString(undefined, { month: 'long', year: 'numeric' }); // e.g. April 2024
    } catch {
      return '';
    }
  };

  // Persist work experience list to profile API
  const persistWorkExperiences = async (list) => {
    try {
      // send updated workExperience array to backend
      const res = await updateProfile({ workExperience: list});
      // Refresh canonical profile so all slices stay in sync
      await storeDispatch(loadProfile());
      toast?.({ title: 'Profile updated', description: 'Work experience saved.' });
      return res;
    } catch (err) {
      console.error('Failed to save work experience to profile:', err);
      toast?.({
        title: 'Save failed',
        description: err?.message || 'Failed to save work experience.',
        variant: 'destructive',
      });
      throw err;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that start date month and year are selected
    const startMonthYear = parseMonthYear(formData.startDate);
    if (!startMonthYear.m || !startMonthYear.y) {
      alert('Please select both start month and year.');
      return;
    }

    // If not current job, validate end date
    if (!formData.isCurrent) {
      const endMonthYear = parseMonthYear(formData.endDate);
      if (!endMonthYear.m || !endMonthYear.y) {
        alert('Please select both end month and year, or check "I currently work here".');
        return;
      }
    }

    // Use startDate/endDate directly from state (already stored as yyyy-mm-01 or '')
    const startDate = formData.startDate || '';
    const endDate = formData.isCurrent ? '' : (formData.endDate || '');

    const payload = {
      ...formData,
      startDate,
      endDate,
    };

    if (editingId) {
      // compute updated list for persistence
      const updatedList = workExperiences.map((exp) =>
        exp.id === editingId ? { ...exp, ...payload } : exp
      );
      // update local slice
      dispatch(updateWorkExperience({ id: editingId, data: payload }));
      setEditingId(null);
      // persist canonical list
      persistWorkExperiences(updatedList).catch(() => {});
    } else {
      // let slice create the id if it does so — pass payload only
      dispatch(addWorkExperience(payload));
      // optimistic local list for persistence
      const newList = [...workExperiences, payload];
      persistWorkExperiences(newList);
    }

    // Reset form
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      // keep month/year parts for immediate UI binding
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      isCurrent: false,
      description: '',
      location: '',
    });
    setShowForm(false);
  };

  const handleEdit = (exp) => {
    setEditingId(exp.id);
    // Parse existing dates and populate form (populate month/year parts too)
    const { m: sMonth, y: sYear } = parseMonthYear(exp.startDate);
    const { m: eMonth, y: eYear } = parseMonthYear(exp.endDate);
    
    setFormData({
      ...exp,
      // Ensure dates are in proper ISO format for the form
      startDate: buildIsoFromMY({ m: sMonth, y: sYear }) || (exp.startDate || ''),
      endDate: buildIsoFromMY({ m: eMonth, y: eYear }) || (exp.endDate || ''),
      startMonth: sMonth || '',
      startYear: sYear || '',
      endMonth: eMonth || '',
      endYear: eYear || '',
      isCurrent: !!exp.isCurrent,
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      // keep month/year parts for immediate UI binding
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      isCurrent: false,
      description: '',
      location: '',
    });
  };
console.log("start date", formData.startDate)
console.log("end date", formData.endDate)
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Experience</h2>
        <p className="text-gray-600">Add your past and current roles to showcase your professional experience.</p>
      </div>
      
      {/* Work Experience List */}
      <div className="space-y-4">
        {workExperiences.map((exp) => (
          <div key={exp.id} className="bg-white shadow-sm hover:shadow-xl transition-all rounded-lg p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{exp.position}</h3>
                <p className="text-gray-600">{exp.company}</p>
                {exp.location && (
                  <p className="text-sm text-gray-500">{exp.location}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(exp)}
                  className="p-2"
                  aria-label="Edit work experience"
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
                    const updatedList = workExperiences.filter((w) => w.id !== exp.id);
                    // if server id exists try delete first (best-effort)
                    const serverId = exp._id || exp.serverId;
                    if (serverId) {
                      deleteProfileItem('workExperience', serverId).catch(() => {
                        console.warn('Failed to delete work experience on server', serverId);
                      });
                    }
                    dispatch(removeWorkExperience(exp.id));
                    await persistWorkExperiences(updatedList);
                  }}
                   className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                   aria-label="Delete work experience"
                 >
                   <Trash2 className="w-4 h-4" />
                   <span className="sr-only">Delete</span>
                 </Button>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {formatMonthYear(exp.startDate) || '-'} - {exp.isCurrent ? 'Present' : (formatMonthYear(exp.endDate) || '-')}
              {' '}
              ({calculateDuration(exp.startDate, exp.endDate, exp.isCurrent)})
            </p>
            {exp.description && (
              <p className="mt-2 text-sm">{exp.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Add Button */}
      {!showForm && (
        <Button 
          onClick={() => setShowForm(true)} 
          variant="outline" 
          className="w-full border-dashed border-2 hover:border-blue-500 hover:text-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" /> 
          Add Work Experience
        </Button>
      )}

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 border border-white/20 p-6 bg-white shadow-lg hover:shadow-xl transition-all text-card-foreground shadow-sm rounded-lg mb-2"
        >
          <InputField
            label="Company"
            name="company"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            required
            variant="light"
          />
          
          <InputField
            label="Position"
            name="position"
            value={formData.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
            required
            variant="light"
          />
          
          <InputField
            label="Location"
            name="location"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="Enter location (city, remote, etc.)"
            variant="light"
          />
          
          {/* Start Date - Month/Year Selectors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <select
                  name="startMonth"
                  value={formData.startMonth || parseMonthYear(formData.startDate).m}
                  onChange={(e) => handleMonthYearChange('startDate', 'month', e.target.value)}
                  className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  required
                >
                  {MONTHS.map((month) => (
                    <option key={month.value} value={month.value} disabled={month.value === ''}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  name="startYear"
                  value={formData.startYear || parseMonthYear(formData.startDate).y}
                  onChange={(e) => handleMonthYearChange('startDate', 'year', e.target.value)}
                  className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  required
                >
                  {YEARS.map((year) => (
                    <option key={year.value} value={year.value} disabled={year.value === ''}>
                      {year.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* End Date - Month/Year Selectors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <select
                  name="endMonth"
                  value={formData.endMonth || parseMonthYear(formData.endDate).m}
                  onChange={(e) => handleMonthYearChange('endDate', 'month', e.target.value)}
                  disabled={formData.isCurrent}
                  className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {MONTHS.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  name="endYear"
                  value={formData.endYear || parseMonthYear(formData.endDate).y}
                  onChange={(e) => handleMonthYearChange('endDate', 'year', e.target.value)}
                  disabled={formData.isCurrent}
                  className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {YEARS.map((year) => (
                    <option key={year.value} value={year.value}>
                      {year.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Current Job Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isCurrent"
              checked={formData.isCurrent}
              onChange={(e) => handleInputChange('isCurrent', e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isCurrent" className="text-sm text-gray-700">
              I currently work here
            </label>
          </div>

          <InputField
            label="Description"
            name="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe your role..."
            variant="light"
          />

          {/* Form Actions */}
          <div className="flex gap-2">
            <Button
              type="submit"
              variant="emeraldGradient"
              size="medium"
              className="px-4 py-2 rounded"
            >
              {editingId ? 'Update' : 'Add'}
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              variant="outlineEbony"
              size="medium"
              className="px-4 py-2 rounded text-gray-700"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default WorkExperienceSection;