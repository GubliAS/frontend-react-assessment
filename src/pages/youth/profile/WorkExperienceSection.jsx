import React, { useState } from 'react';
import InputField from '../../../components/shared/InputField';
import SelectField from '../../../components/shared/SelectInputField';
import { Plus, Trash2, Edit } from 'lucide-react';
import { useWorkExperience } from '../../../redux/workExperienceSection/useWorkExperience'; // <-- your custom hook
import { addWorkExperience, updateWorkExperience, removeWorkExperience } from '../../../redux/workExperienceSection/WorkExperienceSlice';
import { Card } from '../../../components/ui/card';
const WorkExperienceSection = () => {
  const { workExperiences, dispatch } = useWorkExperience(); // from Redux
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    location: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateDuration = (startDate, endDate, current) => {
    if (!startDate) return '';
    const start = new Date(startDate);
    const end = current ? new Date() : new Date(endDate);
    if (isNaN(start) || (!current && isNaN(end))) return '';
    const diff = Math.abs(end - start);
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(
      (diff % (1000 * 60 * 60 * 24 * 365)) /
      (1000 * 60 * 60 * 24 * 30)
    );
    return years > 0
      ? `${years} yr${years > 1 ? 's' : ''} ${
          months > 0 ? `${months} mo${months > 1 ? 's' : ''}` : ''
        }`
      : `${months} mo${months !== 1 ? 's' : ''}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateWorkExperience({ id: editingId, ...formData }));
      setEditingId(null);
    } else {
      dispatch(addWorkExperience({ ...formData, id: Date.now().toString() }));
    }
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      location: '',
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Work Experience List */}
      <div className="space-y-4">
        {workExperiences.map((exp) => (
          <div key={exp.id} className="border border-white/20 rounded-lg p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{exp.position}</h3>
                <p className="text-gray-400">{exp.company}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(exp.id);
                    setFormData(exp);
                    setShowForm(true);
                  }}
                >
                  <Edit size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(removeWorkExperience(exp.id))}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {exp.startDate} - {exp.current ? 'Present' : exp.endDate} (
              {calculateDuration(exp.startDate, exp.endDate, exp.current)})
            </p>
            {exp.description && (
              <p className="mt-2 text-sm">{exp.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Add Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full border border-dashed border-white/30 p-2 rounded-lg text-gray-300 hover:border-[rgb(151,177,150)]/50"
        >
          <Plus size={16} className="inline mr-2" />
          Add Work Experience
        </button>
      )}

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 border border-white/20 p-6 bg-white shadow-lg hover:shadow-xl transition-all  text-card-foreground shadow-sm rounded-lg mb-2"
        >
          <InputField
            label="Company"
            name="company"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            required
          />
          <InputField
            label="Position"
            name="position"
            value={formData.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
            required
          />
          <SelectField
            label="Location"
            name="location"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            options={[
              { value: 'newyork', label: 'New York' },
              { value: 'london', label: 'London' },
              { value: 'remote', label: 'Remote' },
            ]}
          />
          <InputField
            type="date"
            label="Start Date"
            name="startDate"
            value={formData.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            required
          />
          <InputField
            type="date"
            label="End Date"
            name="endDate"
            value={formData.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            disabled={formData.current}
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.current}
              onChange={(e) => handleInputChange('current', e.target.checked)}
            />
            <span className="text-sm text-gray-300">I currently work here</span>
          </div>
          <InputField
            label="Description"
            name="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe your role..."
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-[rgb(151,177,150)] px-4 py-2 rounded text-black"
            >
              {editingId ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="border border-white/30 px-4 py-2 rounded text-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default WorkExperienceSection;
