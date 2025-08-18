import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
// import AppHeader from '../components/layout/AppHeader';
import AssessmentDashboard from '../../../components/assessment/AssessmentDashboard';
import AssessmentLauncher from '../../../components/assessment/AssessmentLauncher';
import AssessmentTakingInterface from '../../../components/assessment/AssessmentTakingInterface';
import AssessmentCatalog from '../../../components/assessment/AssessmentCatalog';
import AssessmentHistory from '../../../components/assessment/AssessmentHistory';

const Assessments = () => {
  const navigate = useNavigate();
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, launcher, taking
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleStartAssessment = (assessment) => {
    setSelectedAssessment(assessment);
    setCurrentView('launcher');
  };

  const handleCancelAssessment = () => {
    setSelectedAssessment(null);
    setCurrentView('dashboard');
  };

  const handleBeginAssessment = () => {
    setCurrentView('taking');
  };

  const handleCompleteAssessment = () => {
    setSelectedAssessment(null);
    setCurrentView('dashboard');
    setActiveTab('dashboard');
  };

  const handleExitAssessment = () => {
    setSelectedAssessment(null);
    setCurrentView('dashboard');
  };

  // If taking an assessment, show full-screen interface
  if (currentView === 'taking' && selectedAssessment) {
    return (
      <AssessmentTakingInterface
        assessment={selectedAssessment}
        onComplete={handleCompleteAssessment}
        onExit={handleExitAssessment}
      />
    );
  }

  // If launching an assessment, show launcher
  if (currentView === 'launcher' && selectedAssessment) {
    return (
      <div className="min-h-screen bg-background">
        {/* <AppHeader /> */}
        <div className="py-8">
          <AssessmentLauncher
            assessment={selectedAssessment}
            onStart={handleBeginAssessment}
            onCancel={handleCancelAssessment}
          />
        </div>
      </div>
    );
  }

  // Main assessments page with tabs
  return (
    <div >
      {/* <AppHeader /> */}
    
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-7xl mx-auto px-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="catalog">Catalog</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-6">
            <AssessmentDashboard onStartAssessment={handleStartAssessment} />
          </TabsContent>
          
          <TabsContent value="catalog" className="mt-6">
            <AssessmentCatalog onStartAssessment={handleStartAssessment} />
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <AssessmentHistory />
          </TabsContent>
        </Tabs>
     
    </div>
  );
};

export default Assessments;
