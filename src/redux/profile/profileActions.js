  import { getProfile } from '../../services/profile';
  import { setPersonalInfo } from '../personaInfo/PersonalInfoSlice';
  import { setWorkExperiences } from '../workExperienceSection/WorkExperienceSlice';
  import { setEducationList } from '../educationSection/EducationSlice';
  import { setSkills } from '../skillsInfoSection/SkillSlice';
  import { setCertificates } from '../certificateSection/CertificateSlice';
  import { setCareerAspiration } from '../careerAspiration/careerAspirationSlice';
  import { setPhotoFile } from '../photoSection/PhotoSlice';

  // Thunk-style loader that maps backend profile fields into slices
  export const loadProfile = () => {
    return async (dispatch) => {
      try {
        const data = await getProfile(); // returns null when 404
        // if no profile yet, just return null (no dispatches)
        if (!data) return null;

        // backend may return profile directly or wrapped; normalize:
        const profile = data?.profile ?? data?.data ?? data;

        if (!profile) return null;

        // Map fields into slices (guard with fallback shapes)
        if (profile.personalInfo || profile.personal) {
          dispatch(setPersonalInfo(profile.personalInfo ?? profile.personal));
        } else {
          // try top-level fields
          const p = {
            firstName: profile.user?.firstName || profile.firstName,
            lastName: profile.user?.lastName || profile.lastName,
            email: profile.user?.email || profile.email,
            dateOfBirth: profile.user?.dateOfBirth || profile.dateOfBirth,
            gender: profile.gender,
            ghanaCardNumber: profile.ghanaCardNumber,
            ghCardUploadFront: profile.ghCardUploadFront,
            ghCardUploadBack: profile.ghCardUploadBack,
            address: {
              region: profile.address?.region,
              district: profile.address?.district,
              city: profile.address?.city,
            },
            professionalBio: profile.professionalBio,
            phoneNumber: profile.user?.phoneNumber || profile.phoneNumber,
          };
          if (p.firstName || p.email) dispatch(setPersonalInfo(p));
        }

        if (profile.workExperience || profile.workExperiences) {
          dispatch(setWorkExperiences(profile.workExperience ?? profile.workExperiences));
        }

        if (profile.education) {
          dispatch(setEducationList(profile.education));
        }

        if (profile.skills) {
          dispatch(setSkills(profile.skills));
        }

        if (profile.certifications) {
          dispatch(setCertificates(profile.certifications));
        }

        if (profile.careerAspiration) {
          dispatch(setCareerAspiration(profile.careerAspiration));
        }

        if (profile.profilePhoto) {
          // profile photo is handled in photo slice
          dispatch(setPhotoFile(profile.profilePhoto));
        }

        return profile;
      } catch (err) {
        // Only log non-404 errors
        const status = err?.status || err?.response?.status;
        if (status === 404) {
          // no profile — not an error condition
          return null;
        }
        console.error('Failed to load profile', err);
        return null;
      }
    };
  };

  export default {
    loadProfile,
  };