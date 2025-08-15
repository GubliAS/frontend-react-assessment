import React, { useState, useEffect, useRef } from 'react';
import { Search, Clock } from 'lucide-react';

const SearchBar = ({ value, onChange, onSearch, suggestions = [], loading = false }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('job-search-history');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (value) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [value, suggestions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      addToHistory(value.trim());
      onSearch();
      setShowSuggestions(false);
    }
  };

  const addToHistory = (searchTerm) => {
    const newHistory = [searchTerm, ...searchHistory.filter(term => term !== searchTerm)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('job-search-history', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('job-search-history');
  };

  const selectSuggestion = (suggestion) => {
    onChange(suggestion);
    addToHistory(suggestion);
    onSearch();
    setShowSuggestions(false);
  };

  const showDropdown = showSuggestions && (filteredSuggestions.length > 0 || searchHistory.length > 0);

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Job title, keywords, or company"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={(e) => {
            setTimeout(() => {
              if (!searchRef.current?.contains(e.relatedTarget)) {
                setShowSuggestions(false);
              }
            }, 150);
          }}
          className="w-full pl-10 pr-4 py-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          disabled={loading}
        />
      </form>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-80 overflow-y-auto bg-white border rounded shadow">
          <div className="p-2">
            {filteredSuggestions.length > 0 && (
              <div className="mb-2">
                <div className="text-xs font-medium text-gray-500 px-2 py-1">Suggestions</div>
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectSuggestion(suggestion)}
                    className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded text-sm flex items-center"
                  >
                    <Search className="w-4 h-4 mr-2 text-gray-400" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {searchHistory.length > 0 && (
              <div>
                <div className="flex items-center justify-between px-2 py-1">
                  <div className="text-xs font-medium text-gray-500">Recent searches</div>
                  <button
                    type="button"
                    onClick={clearHistory}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    Clear
                  </button>
                </div>
                {searchHistory.map((term, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectSuggestion(term)}
                    className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded text-sm flex items-center"
                  >
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    {term}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
