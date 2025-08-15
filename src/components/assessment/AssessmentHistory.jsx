import React, { useState, useEffect } from "react";
import { Calendar, Clock, Trophy, TrendingUp, Download, Eye } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function AssessmentHistory() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    setHistoryData([
      { id: '1', assessmentTitle: 'Verbal Reasoning', type: 'verbal', score: 85, totalQuestions: 10, correctAnswers: 8, timeSpent: 720, points: 120, completedAt: '2024-01-15', difficulty: 'medium' },
      { id: '2', assessmentTitle: 'Numerical Reasoning', type: 'numerical', score: 92, totalQuestions: 8, correctAnswers: 7, timeSpent: 1080, points: 180, completedAt: '2024-01-12', difficulty: 'medium' },
      { id: '3', assessmentTitle: 'Logical Reasoning', type: 'logical', score: 78, totalQuestions: 12, correctAnswers: 9, timeSpent: 1440, points: 200, completedAt: '2024-01-10', difficulty: 'hard' },
      { id: '4', assessmentTitle: 'Verbal Reasoning', type: 'verbal', score: 76, totalQuestions: 10, correctAnswers: 7, timeSpent: 900, points: 100, completedAt: '2024-01-08', difficulty: 'medium' }
    ]);
  }, []);

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'verbal': return '📝';
      case 'numerical': return '🔢';
      case 'logical': return '🧩';
      case 'spatial': return '🎯';
      default: return '📊';
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const chartData = historyData.map((item, index) => ({
    assessment: `${item.type.charAt(0).toUpperCase()}${index + 1}`,
    score: item.score,
    date: item.completedAt
  })).reverse();

  const performanceByType = historyData.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = { type: item.type, totalScore: 0, count: 0, averageScore: 0 };
    }
    acc[item.type].totalScore += item.score;
    acc[item.type].count += 1;
    acc[item.type].averageScore = Math.round(acc[item.type].totalScore / acc[item.type].count);
    return acc;
  }, {});

  const performanceData = Object.values(performanceByType);

  const totalAssessments = historyData.length;
  const averageScore = totalAssessments > 0 ? Math.round(historyData.reduce((sum, item) => sum + item.score, 0) / totalAssessments) : 0;
  const totalPoints = historyData.reduce((sum, item) => sum + item.points, 0);
  const highestScore = totalAssessments > 0 ? Math.max(...historyData.map(item => item.score)) : 0;

  const exportHistory = () => {
    const dataStr = JSON.stringify(historyData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `assessment-history-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Assessment History</h1>
          <p className="text-gray-500">Track your progress and performance over time</p>
        </div>
        <button onClick={exportHistory} className="flex items-center gap-2 border rounded px-3 py-2 hover:bg-gray-100">
          <Download className="w-4 h-4" />
          Export History
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="border rounded p-6 text-center">
          <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <p className="text-2xl font-bold">{totalAssessments}</p>
          <p className="text-sm text-gray-500">Total Assessments</p>
        </div>
        <div className="border rounded p-6 text-center">
          <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold">{averageScore}%</p>
          <p className="text-sm text-gray-500">Average Score</p>
        </div>
        <div className="border rounded p-6 text-center">
          <Trophy className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-bold">{highestScore}%</p>
          <p className="text-sm text-gray-500">Highest Score</p>
        </div>
        <div className="border rounded p-6 text-center">
          <Trophy className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <p className="text-2xl font-bold">{totalPoints}</p>
          <p className="text-sm text-gray-500">Total Points</p>
        </div>
      </div>

      {/* Charts */}
      <div className="border rounded p-6">
        <h2 className="font-semibold mb-4">Score Progress Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="assessment" />
            <YAxis domain={[0, 100]} />
            <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
            <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="border rounded p-6">
        <h2 className="font-semibold mb-4">Average Performance by Type</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis domain={[0, 100]} />
            <Tooltip formatter={(value) => [`${value}%`, 'Average Score']} />
            <Bar dataKey="averageScore" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed History */}
      <div className="space-y-4">
        {historyData.map((assessment) => (
          <div key={assessment.id} className="border rounded p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-2xl">{getTypeIcon(assessment.type)}</div>
                <div>
                  <h3 className="font-semibold">{assessment.assessmentTitle}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(assessment.difficulty)}`}>{assessment.difficulty}</span>
                    <span className="px-2 py-1 rounded text-xs border">{assessment.type}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${getScoreColor(assessment.score)}`}>{assessment.score}%</div>
                <div className="text-sm text-gray-500">{assessment.correctAnswers}/{assessment.totalQuestions} correct</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t text-sm text-gray-500">
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{new Date(assessment.completedAt).toLocaleDateString()}</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{formatTime(assessment.timeSpent)}</div>
              <div className="flex items-center gap-2"><Trophy className="w-4 h-4" />{assessment.points} points</div>
            </div>
            <div className="mt-4">
              <button className="flex items-center gap-2 border rounded px-3 py-1 text-sm hover:bg-gray-100">
                <Eye className="w-4 h-4" /> View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
