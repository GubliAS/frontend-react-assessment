import React from "react";
// import AppHeader from "@/components/layout/AppHeader";
import ApplicationTracker from "../../../components/jobs/ApplicationTracker";
import { getApplicationStats } from "../../../utils/ApplicationTracker";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";

const Applications = () => {
  const stats = getApplicationStats();

  const statCards = [
    {
      title: "Total Applications",
      value: stats.total,
      icon: FileText,
      description: "All submitted applications",
    },
    {
      title: "Under Review",
      value: stats.reviewing + stats.interviewing,
      icon: Clock,
      description: "Applications in progress",
    },
    {
      title: "Offers Received",
      value: stats.offered,
      icon: CheckCircle,
      description: "Job offers received",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      description: "Applications declined",
    },
  ];

  return (
    <div >
      {/* <AppHeader
        notifications={[]}
        unreadCount={0}
        onNotificationClick={() => {}}
        onMarkAllNotificationsRead={() => {}}
        onOpenNotificationSettings={() => {}}
        onOpenSupportTicket={() => {}}
      /> */}

      <main className="container mx-auto px-4 ">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Applications
          </h1>
          <p className="text-muted-foreground">
            Track and manage your job applications
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white shadow-lg hover:shadow-xl transition-all rounded-lg  border-input bg-card p-4 shadow-sm"
              >
                <div className="flex flex-row items-center justify-between pb-2">
                  <h2 className="text-sm font-medium">{stat.title}</h2>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Application Tracker Component */}
        <ApplicationTracker />
      </main>
    </div>
  );
};

export default Applications;
