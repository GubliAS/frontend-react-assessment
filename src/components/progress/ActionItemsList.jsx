import React from 'react';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ActionItemsList = ({ items, onItemClick }) => {
  const navigate = useNavigate();

  const sortedItems = [...items].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return b.weight - a.weight;
  });

  const handleItemClick = (item) => {
    onItemClick(item.route);
    navigate(item.route);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border border-red-200 bg-red-50';
      case 'medium': return 'border border-yellow-200 bg-yellow-50';
      case 'low': return 'border border-green-200 bg-green-50';
      default: return 'border border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900">Action Items</h3>
        <span className="text-xs text-gray-500">
          {items.filter(item => !item.completed).length} remaining
        </span>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {sortedItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className={`rounded-lg p-3 sm:p-4 transition-all duration-200 hover:shadow-md cursor-pointer ${
                item.completed ? 'opacity-75' : ''
              } ${getPriorityColor(item.priority)}`}
              onClick={() => handleItemClick(item)}
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div
                  className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${
                    item.completed ? 'bg-green-100' : 'bg-white'
                  }`}
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  ) : (
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-1">
                    <h4
                      className={`font-medium text-xs sm:text-sm ${
                        item.completed ? 'text-gray-600 line-through' : 'text-gray-900'
                      }`}
                    >
                      {item.title}
                    </h4>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full flex-shrink-0 self-start sm:self-auto ${
                        item.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : item.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      +{item.weight}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 sm:mb-0">{item.description}</p>

                  {!item.completed && (
                    <div className="mt-2 sm:hidden">
                      <button
                        className="w-full text-xs border border-gray-300 rounded-md px-2 py-1 flex items-center justify-center hover:bg-gray-50"
                      >
                        Complete Now
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </button>
                    </div>
                  )}
                </div>

                {!item.completed && (
                  <div className="hidden sm:block">
                    <button
                      className="flex-shrink-0 text-xs border border-gray-300 rounded-md px-2 py-1 flex items-center hover:bg-gray-50"
                    >
                      Complete Now
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActionItemsList;
