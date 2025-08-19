import React, { useState } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { addEducation, updateEducation, removeEducation } from '../../../redux/educationSection/EducationSlice';
import { useEducation } from '../../../redux/educationSection/useEducationInfo';
import InputField from '../../../components/shared/InputField';
import SelectField from '../../../components/shared/SelectInputField';
import Button from '../../../components/shared/Button';
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

const EducationSection = () => {
  const { educationList, dispatch } = useEducation();

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    grade: '',
    current: false
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { institution, degree, fieldOfStudy, startDate } = formData;
    if (!institution || !degree || !fieldOfStudy || !startDate) {
      alert('Please fill in all required fields');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (editingId) {
      dispatch(updateEducation({ id: editingId, updatedData: formData }));
      setEditingId(null);
    } else {
      dispatch(addEducation({ ...formData, id: Date.now().toString() }));
    }

    resetForm();
  };

  const handleEdit = (edu) => {
    setFormData(edu);
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
      startDate: '',
      endDate: '',
      grade: '',
      current: false
    });
    setEditingId(null);
    setShowForm(false);
  };

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
                  onClick={() => dispatch(removeEducation(edu.id))}
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
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate || 'Not specified'}
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
                label="Institution *"
                name="institution"
                value={formData.institution}
                onChange={(e) => handleInputChange('institution', e.target.value)}
                options={GHANA_INSTITUTIONS.map(inst => ({ value: inst, label: inst }))}
                required
              />
              
              <SelectField
                label="Degree Level *"
                name="degree"
                value={formData.degree}
                onChange={(e) => handleInputChange('degree', e.target.value)}
                options={DEGREE_LEVELS.map(deg => ({ value: deg, label: deg }))}
                required
              />
            </div>

            {/* Field of Study */}
            <InputField
              label="Field of Study *"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
              placeholder="Enter your field of study"
              required
            />

            {/* Grade */}
            <InputField
              label="Grade"
              name="grade"
              value={formData.grade}
              onChange={(e) => handleInputChange('grade', e.target.value)}
              placeholder="Enter your grade (e.g., 3.5 GPA, First Class, etc.)"
            />

            {/* Date Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Start Date *"
                type="month"
                name="startDate"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                required
              />

              <InputField
                label="End Date"
                type="month"
                name="endDate"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                disabled={formData.current}
              />
            </div>

            {/* Current Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.current}
                onChange={(e) => handleInputChange('current', e.target.checked)}
                id="current"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="current" className="text-sm">
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