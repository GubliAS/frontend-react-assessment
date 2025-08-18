import React, { useState, useEffect } from 'react';
import { RefreshCw, Target, User, GraduationCap, Briefcase, Award, Camera, Languages } from 'lucide-react';
// import { useProfile } from '../contexts/ProfileContext';
// import { useToast } from '../hooks/use-toast';
import ProgressCircle from './ProgressCircle';
import ActionItemsList from './ActionItemsList';

const SkillDevelopmentTracker = () => {
//   const { profileData, completionPercentage } = useProfile();
//   const { toast } = useToast();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Define action items based on profile completion
  const getActionItems = () => {
    return [
      {
        id: 'personal-info',
        title: 'Complete Personal Information',
        description: 'Add your basic details, contact info, and bio',
        weight: 25,
        // completed: Boolean(profileData.personalInfo.firstName && profileData.personalInfo.lastName && profileData.personalInfo.bio),
        route: '/profile',
        icon: User,
        priority: 'high'
      },
      {
        id: 'education',
        title: 'Add Education Background',
        description: 'Include your academic qualifications and certifications',
        weight: 20,
        // completed: profileData.education.length > 0,
        route: '/profile',
        icon: GraduationCap,
        priority: 'high'
      },
      {
        id: 'work-experience',
        title: 'Add Work Experience',
        description: 'Share your professional background and achievements',
        weight: 20,
        // completed: profileData.workExperience.length > 0,
        route: '/profile',
        icon: Briefcase,
        priority: 'medium'
      },
      {
        id: 'skills',
        title: 'List Your Skills',
        description: 'Add technical and soft skills to showcase your abilities',
        weight: 15,
        // completed: profileData.skills.length >= 3,
        route: '/profile',
        icon: Languages,
        priority: 'medium'
      },
      {
        id: 'certificates',
        title: 'Upload Certificates',
        description: 'Add professional certifications and achievements',
        weight: 10,
        // completed: profileData.certificates.length > 0,
        route: '/profile',
        icon: Award,
        priority: 'low'
      },
      {
        id: 'profile-photo',
        title: 'Add Profile Photo',
        description: 'Upload a professional profile picture',
        weight: 10,
        // completed: !!profileData.profilePhoto,
        route: '/profile',
        icon: Camera,
        priority: 'low'
      }
    ];
  };

  const actionItems = getActionItems();
  const incompleteItems = actionItems.filter(item => !item.completed);

//   useEffect(() => {
//     if (completionPercentage === 100 && !showCelebration) {
//       setShowCelebration(true);
//       toast({
//         title: "🎉 Congratulations!",
//         description: "You've completed your profile! You're ready to apply for jobs."
//       });
//     }
//   }, [completionPercentage, showCelebration, toast]);

//   const handleRefresh = () => {
//     setIsRefreshing(true);
//     setTimeout(() => {
//       setIsRefreshing(false);
//       toast({
//         title: "Progress Updated",
//         description: "Your profile progress has been recalculated."
//       });
//     }, 1000);
//   };

  const handleItemClick = (route) => {
    console.log(`Navigating to: ${route}`);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Progress Section */}
      <div className="bg-white rounded-lg shadow col-span-12">
        <div className="text-center pb-4 sm:pb-6 border-b border-gray-200 pt-4">
          <h2 className="flex items-center justify-center gap-2 text-lg sm:text-xl text-gray-900 font-semibold">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            Profile Development Progress
          </h2>
          <p className="text-sm text-gray-600">
            Complete your profile to unlock more opportunities
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4 sm:space-y-6 pt-4 pb-6">
          <ProgressCircle percentage="80" />

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button
            //   onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center justify-center border border-gray-300 rounded-md px-3 py-2 text-xs sm:text-sm hover:bg-gray-100 disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 sm:w-4 sm:h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Recalculate Progress
            </button>

            {80 === 100 && (
              <div className="text-xs sm:text-sm text-green-600 font-medium">
                ✅ Profile Complete!
              </div>
            )}
          </div>

          {incompleteItems.length > 0 && (
            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-600">
                Complete {incompleteItems.length} more section{incompleteItems.length !== 1 ? 's' : ''} to reach 100%
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Items Section */}
      {incompleteItems.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="pb-3 sm:pb-4 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold">Next Steps</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Focus on these high-impact sections to improve your profile
            </p>
          </div>
          <div className="pt-4">
            <ActionItemsList items={actionItems} onItemClick={handleItemClick} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillDevelopmentTracker;
