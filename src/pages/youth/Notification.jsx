import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button  from '../../components/shared/Button';
import { Badge } from '../../components/ui/badge';
import { 
  Bell, 
  Settings, 
  Check, 
  Trash2, 
  ArrowLeft,
  MessageCircle,
  Calendar,
  Briefcase,
  CreditCard,
  Clock
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';
import { useToast } from '../../hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { getMessagingState, saveMessagingState } from '../../utils/messagingState';

const Notifications = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [messagingState, setMessagingState] = useState(getMessagingState());
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const filterItems = ['All', 'Messages', 'Jobs', 'Interviews', 'System'];

  const getIcon = (type) => {
    switch (type) {
      case 'message':
        return <MessageCircle size={16} className="text-blue-500" />;
      case 'interview':
        return <Calendar size={16} className="text-green-500" />;
      case 'job_application':
        return <Briefcase size={16} className="text-purple-500" />;
      case 'system':
        return <CreditCard size={16} className="text-orange-500" />;
      default:
        return <Bell size={16} className="text-[var(--ebony-50)]" />;
    }
  };

  const filteredNotifications = messagingState.notifications.filter(notification => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Messages') return notification.type === 'message';
    if (selectedFilter === 'Jobs') return notification.type === 'job_application';
    if (selectedFilter === 'Interviews') return notification.type === 'interview';
    if (selectedFilter === 'System') return notification.type === 'system';
    return true;
  });

  const unreadCount = messagingState.notifications.filter(n => !n.isRead).length;

  const handleMarkAllRead = () => {
    const updatedState = {
      ...messagingState,
      notifications: messagingState.notifications.map(n => ({ ...n, isRead: true })),
      unreadCount: 0
    };
    setMessagingState(updatedState);
    saveMessagingState(updatedState);
    toast({
      title: "Success",
      description: "All notifications marked as read",
    });
  };

  const handleDeleteNotification = (id) => {
    setNotificationToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (notificationToDelete) {
      const updatedNotifications = messagingState.notifications.filter(
        n => n.id !== notificationToDelete
      );
      const updatedState = {
        ...messagingState,
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter(n => !n.isRead).length
      };
      setMessagingState(updatedState);
      saveMessagingState(updatedState);
      toast({
        title: "Success",
        description: "Notification deleted",
      });
    }
    setShowDeleteModal(false);
    setNotificationToDelete(null);
  };

  const handleClearAll = () => {
    const updatedState = {
      ...messagingState,
      notifications: [],
      unreadCount: 0
    };
    setMessagingState(updatedState);
    saveMessagingState(updatedState);
    toast({
      title: "Success",
      description: "All notifications cleared",
    });
  };

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      const updatedNotifications = messagingState.notifications.map(n =>
        n.id === notification.id ? { ...n, isRead: true } : n
      );
      const updatedState = {
        ...messagingState,
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter(n => !n.isRead).length
      };
      setMessagingState(updatedState);
      saveMessagingState(updatedState);
    }

    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  if (showSettings) {
    return <NotificationSettings onBack={() => setShowSettings(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </Button>
          <div className="flex items-center gap-3">
            <Bell size={24} className="text-[var(--ebony-50)]" />
            <h1 className="text-2xl text-[var(--ebony-50)] font-bold text-foreground">Notifications & Reminders</h1>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Badge variant="secondary" className="px-3 py-1">
                {unreadCount} unread
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
                <Check size={16} className="mr-2" />
                Mark all as read
              </Button>
            )}
            {messagingState.notifications.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleClearAll}>
                <Trash2 size={16} className="mr-2" />
                Clear All
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
              <Settings size={16} />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {filterItems.map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "emeraldGradient" : "outline"}
              size="small"
              onClick={() => setSelectedFilter(filter)}
              className="whitespace-nowrap"
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No notifications</h3>
              <p className="text-muted-foreground">You're all caught up!</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-4 p-4 rounded-lg  cursor-pointer transition-colors bg-white hover:shadow-xl transition-all rounded-lg  text-card-foreground shadow-sm ${
                  !notification.isRead ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="mt-1">{getIcon(notification.type)}</div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className={`font-medium ${
                      !notification.isRead ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {notification.title}
                    </h4>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock size={12} />
                        {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                      </span>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  
                  {notification.actionUrl && (
                    <Link 
                      to={notification.actionUrl} 
                      className="text-sm text-primary hover:underline mt-2 inline-block"
                    >
                      View Details →
                    </Link>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNotification(notification.id);
                  }}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Notification?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this notification? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteModal(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

// Notification Settings Component
const NotificationSettings = ({ onBack }) => {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailAlerts: true,
    smsNotifications: false,
    liveEventReminders: true,
    newContentAlerts: true,
    billingUpdates: true,
    messageNotifications: true,
    jobApplications: true,
    interviewReminders: true,
  });

  const { toast } = useToast();

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    // Save settings logic here
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated",
    });
  };

  const handleReset = () => {
    setSettings({
      pushNotifications: true,
      emailAlerts: true,
      smsNotifications: false,
      liveEventReminders: true,
      newContentAlerts: true,
      billingUpdates: true,
      messageNotifications: true,
      jobApplications: true,
      interviewReminders: true,
    });
  };

  const ToggleItem = ({ label, value, onChange }) => (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <Button
        variant="outline"
        size="small"
        onClick={onChange}
        className={value ? "text-white bg-gradient-to-r from-green-600 to-emerald-600" : "bg-gray-200"}
      >
        {value ? "On" : "Off"}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold text-[var(--ebony-50)] text-foreground">Notification Settings</h1>
        </div>

        <div className="space-y-8">
          {/* Delivery Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Delivery Preferences</h3>
            <div className="bg-card bg-white hover:shadow-xl transition-all rounded-lg  text-card-foreground shadow-sm rounded-lg p-4">
              <ToggleItem
                label="Push Notifications"
                value={settings.pushNotifications}
                onChange={() => handleToggle('pushNotifications')}
              />
              <ToggleItem
                label="Email Alerts"
                value={settings.emailAlerts}
                onChange={() => handleToggle('emailAlerts')}
              />
              <ToggleItem
                label="SMS Notifications"
                value={settings.smsNotifications}
                onChange={() => handleToggle('smsNotifications')}
              />
            </div>
          </div>

          {/* Notification Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Notification Categories</h3>
            <div className="bg-card bg-white hover:shadow-xl transition-all rounded-lg  text-card-foreground shadow-sm rounded-lg p-4">
              <ToggleItem
                label="Message Notifications"
                value={settings.messageNotifications}
                onChange={() => handleToggle('messageNotifications')}
              />
              <ToggleItem
                label="Job Applications"
                value={settings.jobApplications}
                onChange={() => handleToggle('jobApplications')}
              />
              <ToggleItem
                label="Interview Reminders"
                value={settings.interviewReminders}
                onChange={() => handleToggle('interviewReminders')}
              />
              <ToggleItem
                label="New Content Alerts"
                value={settings.newContentAlerts}
                onChange={() => handleToggle('newContentAlerts')}
              />
              <ToggleItem
                label="Billing Updates"
                value={settings.billingUpdates}
                onChange={() => handleToggle('billingUpdates')}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button variant="outline" onClick={handleReset}>
              Reset to Default
            </Button>
            <Button variant="emeraldGradient" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;