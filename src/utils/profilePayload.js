// ...new file...
/**
 * Whitelist and map client-side profile to backend shape.
 * - Only include fields the backend expects to avoid validation errors.
 * - Map ghanaCardFile -> ghCardUploadFront by default if a single file was uploaded.
 * - Exclude fields not yet supported by backend (e.g. bio) unless backend adds them.
 */

export function sanitizePersonalInfo(rawPersonal = {}) {
  const sanitized = {};

  // If user used ghanaCardFile on frontend, map it to ghCardUploadFront (backend expects front/back)
  if (rawPersonal.ghanaCardFile) {
    // If both front/back are provided, prefer explicit front/back values
    if (!rawPersonal.ghCardUploadFront && !rawPersonal.ghCardUploadBack) {
      sanitized.ghCardUploadFront = rawPersonal.ghanaCardFile;
    }
  }

  // allowed personal keys (ensure this list matches your backend fields)
  const ALLOWED_PERSONAL = [

    'address',

    'dateOfBirth',
    'gender',
    'ghanaCardNumber',
    'ghCardUploadFront',
    'ghCardUploadBack',

    'professionalBio'
  ];

  const ALLOWED_GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'];

  for (const key of ALLOWED_PERSONAL) {
    const val = rawPersonal[key];

    if (val === undefined || val === null) continue;

    if (typeof val === 'string') {
      const t = val.trim();
      if (t.length === 0) continue; // skip empty strings

      if (key === 'gender') {
        if (!ALLOWED_GENDERS.includes(t)) continue; // skip invalid gender
      }

      sanitized[key] = t;
    } else {
      sanitized[key] = val;
    }
  }

  // Address handling (keep existing logic)...
  // ...existing code...
  return sanitized;
}

export function sanitizeCareerAspiration(careerAspiration = {}) {
  const sanitized = {};

  // List of allowed career aspiration fields that backend expects
  const ALLOWED_CAREER_FIELDS = [
    'careerField',
    'careerInterests',
    'desiredJobTitles', 
    'targetIndustries',
    'preferredJobLocations',
    'preferredJobTypes',
    'expectedSalary',
    'keySkillsToGain',
    'certifications'
  ];

  for (const key of ALLOWED_CAREER_FIELDS) {
    const val = careerAspiration[key];

    if (val === undefined || val === null) continue;

    // Handle arrays
    if (Array.isArray(val)) {
      const filtered = val.filter(item => 
        item !== null && 
        item !== undefined && 
        (typeof item === 'string' ? item.trim().length > 0 : true)
      );
      if (filtered.length > 0) {
        sanitized[key] = filtered;
      }
    }
    // Handle expectedSalary object
    else if (key === 'expectedSalary' && typeof val === 'object') {
      const salaryObj = {};
      if (typeof val.min === 'number' && val.min > 0) salaryObj.min = val.min;
      if (typeof val.max === 'number' && val.max > 0) salaryObj.max = val.max;
      if (Object.keys(salaryObj).length > 0) {
        sanitized[key] = salaryObj;
      }
    }
    // Handle strings
    else if (typeof val === 'string') {
      const trimmed = val.trim();
      if (trimmed.length > 0) {
        sanitized[key] = trimmed;
      }
    }
    // Handle other types as-is
    else {
      sanitized[key] = val;
    }
  }

  return sanitized;
}

// Add work-experience sanitizer that strips endDate when isCurrent === true
function sanitizeWorkExperience(list = []) {
  if (!Array.isArray(list)) return [];
  const ALLOWED = ['company','position','startDate','endDate','isCurrent','description','location','title','department'];
  return list.map(item => {
    if (!item || typeof item !== 'object') return null;
    const out = {};
    const isCurr = item.isCurrent === true || item.current === true;
    for (const key of ALLOWED) {
      if (key === 'endDate' && isCurr) continue; // omit endDate when current
      const val = item[key];
      if (val === undefined || val === null) continue;
      if (typeof val === 'string') {
        const trimmed = val.trim();
        if (trimmed.length === 0) continue;
        out[key] = trimmed;
      } else {
        out[key] = val;
      }
    }
    if (isCurr) out.isCurrent = true;
    return out;
  }).filter(Boolean);
}

// New: education sanitizer — strip endYear when isCurrent === true and whitelist fields
export function sanitizeEducation(list = []) {
  if (!Array.isArray(list)) return [];
  const ALLOWED = ['id','institution','degree','fieldOfStudy','startYear','endYear','isCurrent','grade','location','notes'];
  return list.map(item => {
    if (!item || typeof item !== 'object') return null;
    const out = {};
    const isCurr = item.isCurrent === true || item.current === true;
    for (const key of ALLOWED) {
      if (key === 'endYear' && isCurr) continue; // omit endYear when current
      const val = item[key];
      if (val === undefined || val === null) continue;
      if (typeof val === 'string') {
        const trimmed = val.trim();
        if (trimmed.length === 0) continue;
        // try to normalize numeric year strings to numbers for startYear/endYear
        if ((key === 'startYear' || key === 'endYear') && /^\d{4}$/.test(trimmed)) {
          out[key] = Number(trimmed);
        } else {
          out[key] = trimmed;
        }
      } else if (typeof val === 'number') {
        out[key] = val;
      } else {
        out[key] = val;
      }
    }
    if (isCurr) out.isCurrent = true;
    return out;
  }).filter(Boolean);
}

export function sanitizeProfileForCreate(profile = {}) {
  // Accept either nested { personalInfo: {...} } or flat top-level personal fields
  const payload = {};

  // determine source for personal fields
  const personalSource = profile.personalInfo && Object.keys(profile.personalInfo).length
    ? profile.personalInfo
    : profile;

  const sanitizedPersonal = sanitizePersonalInfo(personalSource);

  // merge personal fields at top-level (assembleProfile now spreads personalInfo)
  if (Object.keys(sanitizedPersonal).length > 0) {
    Object.assign(payload, sanitizedPersonal);
  }

  if (Array.isArray(profile.workExperience) && profile.workExperience.length > 0) {
    const sanitizedWork = sanitizeWorkExperience(profile.workExperience);
    console.log('Including sanitized work in payload:', sanitizedWork);
    if (sanitizedWork.length > 0) payload.workExperience = sanitizedWork;
  }

  // Replace direct passthrough with sanitizer that strips endYear when isCurrent true
  if (Array.isArray(profile.education) && profile.education.length > 0) {
    const sanitizedEducation = sanitizeEducation(profile.education);
    if (sanitizedEducation.length > 0) {
      console.log('Including sanitized education in payload:', sanitizedEducation);
      payload.education = sanitizedEducation;
    }
  }

  // handle skills: accept either categorized arrays (technicalSkills/softSkills/languages)
  // or a flat profile.skills array (with optional item.category or item.type), then map to categorized arrays
  const pushItem = (arr, item) => {
    if (item === undefined || item === null) return;
    if (typeof item === 'string') arr.push({ name: item });
    else arr.push(item);
  };

  if (Array.isArray(profile.technicalSkills) && profile.technicalSkills.length > 0) {
    payload.technicalSkills = profile.technicalSkills;
  }
  if (Array.isArray(profile.softSkills) && profile.softSkills.length > 0) {
    payload.softSkills = profile.softSkills;
  }
  if (Array.isArray(profile.languages) && profile.languages.length > 0) {
    payload.languages = profile.languages;
  }

  // fallback: if profile.skills is provided as a flat array, distribute by category property (or default to technical)
  if (Array.isArray(profile.skills) && profile.skills.length > 0) {
    const tech = [];
    const soft = [];
    const lang = [];

    profile.skills.forEach(s => {
      const category = (s && (s.category || s.type) || 'technical').toString().toLowerCase();
      if (category === 'technical') pushItem(tech, s);
      else if (category === 'soft') pushItem(soft, s);
      else if (category === 'language' || category === 'languages') pushItem(lang, s);
      else pushItem(tech, s); // default
    });

    if (tech.length) payload.technicalSkills = tech;
    if (soft.length) payload.softSkills = soft;
    if (lang.length) payload.languages = lang;
  }

  if (Array.isArray(profile.certifications) && profile.certifications.length > 0) {
    payload.certifications = profile.certifications;
  }

  if (profile.careerAspiration && Object.keys(profile.careerAspiration).length > 0) {
    payload.careerAspiration = profile.careerAspiration;
  }
   // Also handle individual career fields passed directly at top level
  const directCareerFields = [
    'careerField', 'careerInterests', 'desiredJobTitles', 
    'targetIndustries', 'preferredJobLocations', 'preferredJobTypes',
    'expectedSalary', 'keySkillsToGain'
  ];
  
  directCareerFields.forEach(field => {
    if (profile[field] !== undefined) {
      const careerObj = { [field]: profile[field] };
      const sanitized = sanitizeCareerAspiration(careerObj);
      if (sanitized[field] !== undefined) {
        payload[field] = sanitized[field];
      }
    }
  });

  // include profile photo when provided as a File/Blob (keep as-is so objectToFormData can append it)
  if (profile.profilePhoto instanceof File || profile.profilePhoto instanceof Blob) {
    payload.profilePhoto = profile.profilePhoto;
  } else if (typeof profile.profilePhoto === 'string' && profile.profilePhoto.trim()) {
    // allow sending an existing URL or base64 string if caller wants to keep it as string
    payload.profilePhoto = profile.profilePhoto.trim();
  }

  // intentionally exclude fields backend doesn't support (e.g. bio)
  return payload;
}

export function objectToFormData(obj, form = new FormData(), namespace = '') {
  for (const property in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, property)) continue;
    const formKey = namespace ? `${namespace}[${property}]` : property;
    const value = obj[property];

    if (value === null || value === undefined) continue;

    // Files / Blobs
    if (value instanceof File || value instanceof Blob) {
      form.append(formKey, value);
    } else if (Array.isArray(value)) {
      // For arrays of primitives or objects, append JSON string for backend to parse,
      // or append individual values if backend expects multiple same-name fields.
      // Here we append JSON for consistency.
      form.append(formKey, JSON.stringify(value));
    } else if (typeof value === 'object') {
      // nested objects — serialize
      form.append(formKey, JSON.stringify(value));
    } else {
      form.append(formKey, String(value));
    }
  }
  return form;
}