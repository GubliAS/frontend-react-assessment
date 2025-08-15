import React, { useEffect, useState } from 'react';

const ProgressCircle = ({ 
  percentage, 
  size = 200, 
  strokeWidth = 12,
  showAnimation = true 
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [displayPercentage, setDisplayPercentage] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  // Determine color based on percentage
  const getColor = (percent) => {
    if (percent <= 30) return '#ef4444'; // red
    if (percent <= 70) return '#eab308'; // yellow
    return '#22c55e'; // green
  };

  // Animate percentage counting
  useEffect(() => {
    if (!showAnimation) {
      setAnimatedPercentage(percentage);
      setDisplayPercentage(percentage);
      return;
    }

    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const stepValue = percentage / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const currentPercentage = Math.min(stepValue * currentStep, percentage);
      setAnimatedPercentage(currentPercentage);
      setDisplayPercentage(Math.round(currentPercentage));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [percentage, showAnimation]);

  const isPulseActive = percentage === 100;

  return (
    <div className={`relative ${isPulseActive ? 'animate-pulse' : ''}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(animatedPercentage)}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">
            {displayPercentage}%
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Complete
          </div>
        </div>
      </div>
      
      {/* Celebration effect for 100% */}
      {percentage === 100 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-4xl animate-bounce">🎉</div>
        </div>
      )}
    </div>
  );
};

export default ProgressCircle;
