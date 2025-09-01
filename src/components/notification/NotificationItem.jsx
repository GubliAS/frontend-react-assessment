import React from "react";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, Calendar, Briefcase, Bell } from "lucide-react";

const NotificationItem = ({ notification, onClick }) => {
  const getIcon = () => {
    switch (notification.type) {
      case "message":
        return <MessageCircle size={16} className="text-blue-500" />;
      case "interview":
        return <Calendar size={16} className="text-green-500" />;
      case "job_application":
        return <Briefcase size={16} className="text-purple-500" />;
      default:
        return <Bell size={16} className="text-gray-500" />;
    }
  };

  return (
    <div
      onClick={() => onClick(notification)}
      className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
        !notification.isRead ? "bg-blue-50" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">{getIcon()}</div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4
              className={`text-sm font-medium ${
                !notification.isRead ? "text-gray-900" : "text-gray-700"
              }`}
            >
              {notification.title}
            </h4>
            {!notification.isRead && (
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            )}
          </div>

          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>

          <span className="text-xs text-gray-500 mt-2 block">
            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
