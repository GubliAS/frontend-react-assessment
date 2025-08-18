import React, { useState, useEffect } from 'react';
import { MapPin, Clock, DollarSign, Bookmark, BookmarkCheck, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import  Button  from '../../components/shared/Button';
import { Badge } from '../ui/badge';
import { getApplicationByJobId } from '../../utils/ApplicationTracker';

const JobCard = ({
  id,
  title,
  company,
  location,
  salary,
  jobType,
  postedDate,
  description,
  skills,
  isSaved = false,
  onSave,
  onView
}) => {
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const application = getApplicationByJobId(id);
    setHasApplied(!!application);
  }, [id]);

  const handleSave = (e) => {
    e.stopPropagation();
    onSave?.(id);
  };

  const handleView = () => {
    onView?.(id);
  };

  const formatSalary = () => {
    if (!salary) return null;
    return `${salary.currency} ${salary.min.toLocaleString()} - ${salary.max.toLocaleString()}`;
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <Card
      className="pt-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 overflow-hidden cursor-pointer"
      onClick={handleView}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {company ? company.split(' ').map(word => word[0]).join('').substring(0, 2) : 'JC'}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
              <p className="text-green-600 font-semibold text-lg">{company}</p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm text-gray-500 mt-2">
                <span className="flex items-center gap-1 min-w-0">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{location}</span>
                </span>
                <span className="flex items-center gap-1 text-sm">
                  <Clock className="w-4 h-4" />
                  {getTimeAgo(postedDate)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasApplied && (
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Applied
              </Badge>
            )}

            <button
              onClick={(e) => { e.stopPropagation(); handleSave(e); }}
              className={`p-2 rounded-full transition-colors ${
                isSaved ? 'text-green-600 bg-green-50' : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
              }`}
              aria-label={isSaved ? 'Unsave job' : 'Save job'}
            >
              {isSaved ? (
                <BookmarkCheck className="w-5 h-5 text-green-600" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {skills.slice(0, 4).map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              +{skills.length - 4} more
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-4 border-t border-gray-100 gap-3">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
              {jobType}
            </span>

            {salary && (
              <span className="text-lg font-bold text-green-600 truncate">
                {formatSalary()}
              </span>
            )}
          </div>

          <div className="w-full sm:w-auto">
            <Button
              onClick={(e) => { e.stopPropagation(); handleView(); }}
              variant="emeraldGradient"
              size="medium"
              className="px-6 py-2 w-full sm:w-auto"
            >
              View Job
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
