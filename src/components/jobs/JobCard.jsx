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
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleView}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-blue-600 font-medium">{company}</p>
          </div>
          <div className="flex items-center gap-2">
            {hasApplied && (
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Applied
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="p-2"
            >
              {isSaved ? (
                <BookmarkCheck className="w-5 h-5 text-blue-600" />
              ) : (
                <Bookmark className="w-5 h-5 text-gray-400" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          {salary && (
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>{formatSalary()}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{getTimeAgo(postedDate)}</span>
          </div>
        </div>

        <div className="mb-3">
          <Badge variant="secondary" className="mr-2">
            {jobType}
          </Badge>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{skills.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
