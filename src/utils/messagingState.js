const STORAGE_KEY = 'messaging_data';

// Helper function to convert timestamp strings back to Date objects
const deserializeDates = (obj) => {
  if (obj === null || obj === undefined) return obj;
  
  if (typeof obj === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(obj)) {
    return new Date(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(deserializeDates);
  }
  
  if (typeof obj === 'object') {
    const result = {};
    for (const key in obj) {
      if (key === 'timestamp') {
        result[key] = new Date(obj[key]);
      } else {
        result[key] = deserializeDates(obj[key]);
      }
    }
    return result;
  }
  
  return obj;
};

export const getMessagingState = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    return deserializeDates(parsed);
  }
  
  return {
    conversations: mockConversations,
    currentChat: null,
    messages: [],
    typingStatus: false,
    notifications: mockNotifications,
    unreadCount: 5
  };
};

export const saveMessagingState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

// Mock data for development
const mockConversations = [
  {
    id: '1',
    participants: [
      { id: 'user1', name: 'John Doe', role: 'youth' },
      { id: 'employer1', name: 'TechCorp HR', avatar: '/placeholder.svg', role: 'employer' }
    ],
    lastMessage: {
      id: 'msg1',
      senderId: 'employer1',
      receiverId: 'user1',
      content: 'Thanks for your application. We\'d like to schedule an interview.',
      timestamp: new Date(Date.now() - 3600000),
      isRead: false
    },
    unreadCount: 2,
    isTyping: false
  },
  {
    id: '2',
    participants: [
      { id: 'user1', name: 'John Doe', role: 'youth' },
      { id: 'employer2', name: 'StartupGH', role: 'employer' }
    ],
    lastMessage: {
      id: 'msg2',
      senderId: 'user1',
      receiverId: 'employer2',
      content: 'Thank you for considering my application.',
      timestamp: new Date(Date.now() - 86400000),
      isRead: true
    },
    unreadCount: 0,
    isTyping: true
  }
];

export const mockNotifications = [
  {
    id: '1',
    title: 'New Message',
    message: 'TechCorp HR sent you a message',
    type: 'message',
    isRead: false,
    timestamp: new Date(Date.now() - 1800000),
    actionUrl: '/messages',
    icon: 'message-circle'
  },
  {
    id: '2',
    title: 'Interview Scheduled',
    message: 'Your interview with StartupGH is confirmed for tomorrow',
    type: 'interview',
    isRead: false,
    timestamp: new Date(Date.now() - 3600000),
    actionUrl: '/profile',
    icon: 'calendar'
  },
  {
    id: '3',
    title: 'Application Update',
    message: 'Your application status has been updated',
    type: 'job_application',
    isRead: true,
    timestamp: new Date(Date.now() - 86400000),
    actionUrl: '/jobs',
    icon: 'briefcase'
  }
];
