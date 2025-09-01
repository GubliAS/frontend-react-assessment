import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button  from '../shared/Button';
import { Badge } from '../ui/badge';
import { Bell, Settings, Check, ExternalLink } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import NotificationItem from './NotificationItem';

const NotificationCenter = ({
  notifications,
  unreadCount,
  onNotificationClick,
  onMarkAllRead,
  onOpenSettings
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Link  className="text-emerald-900">
          <Bell size={20} />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Link>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0 border-0 shadow-lg ring-0" align="end">
        <div className="bg-white rounded-lg">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={onMarkAllRead}>
                    <Check size={16} />
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={onOpenSettings}>
                  <Settings size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell size={48} className="mx-auto text-gray-400 mb-4" />
                <h4 className="text-gray-900 font-medium mb-2">No notifications</h4>
                <p className="text-gray-600 text-sm">You're all caught up!</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={(notif) => {
                    onNotificationClick(notif);
                    setIsOpen(false);
                  }}
                />
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200">
              <Link to="youth/notifications">
                <Button
                  variant="ghost"
                  className="w-full text-sm flex items-center gap-2"
                >
                  View all notifications
                  <ExternalLink size={14} />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
