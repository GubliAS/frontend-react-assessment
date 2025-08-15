import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import Button from '../shared/Button';
import { Filter, X } from 'lucide-react';

const FilterSidebar = ({ filters, onFiltersChange, onClearFilters }) => {
  const jobTypeOptions = [
    'Full-time',
    'Part-time',
    'Contract',
    'Internship',
    'Remote'
  ];

  const locationOptions = [
    'Accra, Greater Accra',
    'Kumasi, Ashanti',
    'Takoradi, Western',
    'Cape Coast, Central',
    'Tamale, Northern'
  ];

  const categoryOptions = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Marketing',
    'Sales',
    'Operations',
    'Human Resources'
  ];

  const handleJobTypeChange = (jobType, checked) => {
    const updatedJobTypes = checked
      ? [...filters.jobTypes, jobType]
      : filters.jobTypes.filter(type => type !== jobType);

    onFiltersChange({
      ...filters,
      jobTypes: updatedJobTypes
    });
  };

  const handleLocationChange = (location, checked) => {
    const updatedLocations = checked
      ? [...filters.locations, location]
      : filters.locations.filter(loc => loc !== location);

    onFiltersChange({
      ...filters,
      locations: updatedLocations
    });
  };

  const handleCategoryChange = (category, checked) => {
    const updatedCategories = checked
      ? [...(filters.categories || []), category]
      : (filters.categories || []).filter(cat => cat !== category);

    onFiltersChange({
      ...filters,
      categories: updatedCategories
    });
  };

  const handleSalaryRangeChange = (value) => {
    onFiltersChange({ ...filters, salaryRange: value });
  };

  const handleExperienceChange = (value) => {
    onFiltersChange({ ...filters, experience: value });
  };

  const handleDatePostedChange = (value) => {
    onFiltersChange({ ...filters, datePosted: value });
  };

  const handleCompanySizeChange = (value) => {
    onFiltersChange({ ...filters, companySize: value });
  };

  const handleRemoteWorkChange = (checked) => {
    onFiltersChange({ ...filters, remoteWork: checked });
  };

  const hasActiveFilters =
    (filters.jobTypes && filters.jobTypes.length > 0) ||
    (filters.locations && filters.locations.length > 0) ||
    filters.salaryRange ||
    filters.experience ||
    filters.datePosted ||
    filters.companySize ||
    filters.remoteWork ||
    (filters.categories && filters.categories.length > 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearFilters}
              className="text-red-600 hover:text-red-700"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Remote Work Toggle */}
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Remote Work</Label>
          <Switch
            checked={filters.remoteWork}
            onCheckedChange={handleRemoteWorkChange}
          />
        </div>

        {/* Job Categories Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Job Categories</Label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {categoryOptions.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={(filters.categories || []).includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked)}
                />
                <Label 
                  htmlFor={`category-${category}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Job Type Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Job Type</Label>
          <div className="space-y-2">
            {jobTypeOptions.map((jobType) => (
              <div key={jobType} className="flex items-center space-x-2">
                <Checkbox
                  id={`jobType-${jobType}`}
                  checked={filters.jobTypes.includes(jobType)}
                  onCheckedChange={(checked) => handleJobTypeChange(jobType, checked)}
                />
                <Label 
                  htmlFor={`jobType-${jobType}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {jobType}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Location</Label>
          <div className="space-y-2">
            {locationOptions.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox
                  id={`location-${location}`}
                  checked={filters.locations.includes(location)}
                  onCheckedChange={(checked) => handleLocationChange(location, checked)}
                />
                <Label 
                  htmlFor={`location-${location}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {location}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Date Posted Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Date Posted</Label>
          <RadioGroup value={filters.datePosted} onValueChange={handleDatePostedChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="24h" id="24h" />
              <Label htmlFor="24h" className="text-sm font-normal cursor-pointer">Last 24 hours</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3d" id="3d" />
              <Label htmlFor="3d" className="text-sm font-normal cursor-pointer">Last 3 days</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="7d" id="7d" />
              <Label htmlFor="7d" className="text-sm font-normal cursor-pointer">Last week</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="30d" id="30d" />
              <Label htmlFor="30d" className="text-sm font-normal cursor-pointer">Last month</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Company Size Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Company Size</Label>
          <Select value={filters.companySize} onValueChange={handleCompanySizeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="startup">Startup (1-10 employees)</SelectItem>
              <SelectItem value="small">Small (11-50 employees)</SelectItem>
              <SelectItem value="medium">Medium (51-200 employees)</SelectItem>
              <SelectItem value="large">Large (201-1000 employees)</SelectItem>
              <SelectItem value="enterprise">Enterprise (1000+ employees)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Salary Range Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Salary Range</Label>
          <Select value={filters.salaryRange} onValueChange={handleSalaryRangeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select salary range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-2000">GHS 0 - 2,000</SelectItem>
              <SelectItem value="2000-4000">GHS 2,000 - 4,000</SelectItem>
              <SelectItem value="4000-6000">GHS 4,000 - 6,000</SelectItem>
              <SelectItem value="6000-8000">GHS 6,000 - 8,000</SelectItem>
              <SelectItem value="8000+">GHS 8,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Experience Level Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Experience Level</Label>
          <RadioGroup value={filters.experience} onValueChange={handleExperienceChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="entry" id="entry" />
              <Label htmlFor="entry" className="text-sm font-normal cursor-pointer">Entry Level (0-2 years)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mid" id="mid" />
              <Label htmlFor="mid" className="text-sm font-normal cursor-pointer">Mid Level (2-5 years)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="senior" id="senior" />
              <Label htmlFor="senior" className="text-sm font-normal cursor-pointer">Senior Level (5+ years)</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
