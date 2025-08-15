import React from "react";
import { FileText, Upload, ArrowRight } from "lucide-react";

export const CreationModeSelector = ({ onModeSelect }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
          Create Your GTH Profile
        </h1>
        <p className="text-gray-500 text-lg">
          Choose how you'd like to create your professional profile
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Manual Form Option */}
        <div
          className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-emerald-500 rounded-lg bg-white"
        >
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
              <FileText className="h-8 w-8 text-white" />
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Manual Form Creation</h3>
              <p className="text-gray-500">
                Build your profile step by step with our guided form. Perfect
                for creating a detailed, customized profile.
              </p>
            </div>

            <div className="space-y-2 text-sm text-gray-500">
              <p>✓ Step-by-step guidance</p>
              <p>✓ Full customization control</p>
              <p>✓ No existing documents needed</p>
            </div>

            <button
              onClick={() => onModeSelect("manual")}
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-md transition"
            >
              <span>Start Manual Creation</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-xs text-gray-400">
              Estimated time: 10-15 minutes
            </p>
          </div>
        </div>

        {/* AI Upload Option */}
        <div
          className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-emerald-500 rounded-lg bg-white"
        >
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
              <Upload className="h-8 w-8 text-white" />
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold">
                AI-Powered Resume Upload
              </h3>
              <p className="text-gray-500">
                Upload your existing resume and let our AI extract and organize
                your information automatically.
              </p>
            </div>

            <div className="space-y-2 text-sm text-gray-500">
              <p>✓ Instant information extraction</p>
              <p>✓ AI-powered data parsing</p>
              <p>✓ Quick profile creation</p>
            </div>

            <button
              onClick={() => onModeSelect("upload")}
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-md transition"
            >
              <span>Upload Resume</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-xs text-gray-400">
              Estimated time: 3-5 minutes
            </p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Both options allow you to review and edit your information before
          finalizing your profile.
        </p>
      </div>
    </div>
  );
};
