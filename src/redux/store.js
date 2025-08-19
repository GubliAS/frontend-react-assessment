import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import workExperienceReducer from './workExperienceSection/WorkExperienceSlice';
import personalInfoReducer from './personaInfo/PersonalInfoSlice';
import educationReducer from './educationSection/EducationSlice';
import skillsReducer from './skillsInfoSection/SkillSlice';
import certificatesReducer from './certificateSection/CertificateSlice';
import photoReducer from './photoSection/PhotoSlice'; // ✅ import Photo slice
import authReducer from './auth/authSlice'; // <-- add auth slice import
import careerAspirationReducer from './careerAspiration/careerAspirationSlice'; // <-- add career aspiration reducer

const persistConfig = {
  key: 'root',
  storage,
};

const makePersistedReducer = (key, reducer) =>
  persistReducer({ ...persistConfig, key }, reducer);

export const store = configureStore({
  reducer: {
    auth: makePersistedReducer('auth', authReducer), // <-- register auth slice
    workExperience: makePersistedReducer('workExperience', workExperienceReducer),
    personalInfo: makePersistedReducer('personalInfo', personalInfoReducer),
    education: makePersistedReducer('education', educationReducer),
    skills: makePersistedReducer('skills', skillsReducer),
    certificates: makePersistedReducer('certificates', certificatesReducer),
    photo: makePersistedReducer('photo', photoReducer), // ✅ register photo slice
    careerAspiration: makePersistedReducer('careerAspiration', careerAspirationReducer), // <-- register career aspiration slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
