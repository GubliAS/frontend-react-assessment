import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "./ui/card";
import YoungAfrican from "../assets/young-african.png";
import AfricanProfessionals from "../assets/african-professionals.png";
import AfricanStudent from "../assets/african-student.png";
// Small inline icon to avoid adding a new dependency
const UserPlus = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
    <path d="M15 14c2.761 0 5 2.239 5 5v1H4v-1c0-2.761 2.239-5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9.5" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 8v6M22 11h-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const steps = [
  {
    id: 1,
    title: "Register & Create Profile",
    desc: "Sign up and build your professional profile highlighting your skills and career goals.",
    gradient: "from-blue-400 to-indigo-500",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    cta: "Create Profile",
    img: YoungAfrican,
  },
  {
    id: 2,
    title: "Learn & Develop Skills",
    desc: "Complete courses and training programs tailored to your career path and industry needs.",
    gradient: "from-green-400 to-emerald-500",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    cta: "Start Learning",
    img: AfricanStudent,
  },
  {
    id: 3,
    title: "Connect with Employers",
    desc: "Get matched with job opportunities and interview with companies seeking your talents.",
    gradient: "from-orange-400 to-pink-500",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    cta: "Find Jobs",
    img: AfricanProfessionals,
  },
];

export default function GetStartedSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16 ">
      <header className="text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--ebony-50)]">
          Get Started in 3 Simple Steps
        </h2>
        <p className="mt-2 text-sm text-e">
          Your journey to career success begins here.
        </p>
      </header>

      <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:justify-center gap-6">
        {steps.map((step, idx) => (
          <React.Fragment key={step.id}>
            <Card className="w-full sm:w-80 relative backdrop-blur-sm bg-white/95 border-0 overflow-hidden rounded-2xl">
              {/* Header Image Section - updated for roundness + spacing */}
              <div className={`relative bg-gradient-to-r ${step.gradient} overflow-hidden`}>
                {/* padded wrapper so the image has breathing room from the card edge */}
                <div className="p-4">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-44 sm:h-48 object-cover rounded-2xl shadow-sm"
                  />
                </div>
                {/* optional subtle overlay */}
                <div className="absolute inset-0 pointer-events-none rounded-t-2xl" />
              </div>

              <CardContent className="pt-6 pb-6">
                {/* Icon */}
                <div className="flex justify-start mb-4">
                  <div className={`w-12 h-12 ${step.iconBg} rounded-xl flex items-center justify-center`}>
                    <UserPlus className={`w-6 h-6 ${step.iconColor}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <CardTitle className="text-gray-900 font-bold text-lg">
                    {step.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {step.desc}
                  </CardDescription>
                </div>

                <div className="mt-6">
                  <Link
                    to="/signup"
                    className="inline-block rounded-full px-4 py-2 text-sm bg-ebony text-white hover:opacity-95"
                  >
                    {step.cta}
                  </Link>
                </div>
              </CardContent>
            </Card>

          
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
