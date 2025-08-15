import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { ArrowUpDown } from 'lucide-react';

const SortOptions = ({
  sortBy,
  onSortChange
}) => {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-gray-500" />
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevance">Relevance</SelectItem>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="salary-high">Salary: High to Low</SelectItem>
          <SelectItem value="salary-low">Salary: Low to High</SelectItem>
          <SelectItem value="company">Company A-Z</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortOptions;
