import React, { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

const SearchBar = ({ initialValue = '', onSearch }) => {
  const [term, setTerm] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  const debouncedSearch = useMemo(
    () => debounce((val) => onSearch(val), 300),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(term);
    return () => debouncedSearch.cancel();
  }, [term, debouncedSearch]);

  return (
    <div className="relative w-full">
      <div
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
          isFocused ? 'text-emerald-500' : 'text-slate-400'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <input
        type="text"
        placeholder="Search by name or category..."
        className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-300 
                   bg-white/50 backdrop-blur-sm focus:bg-white focus:outline-none
                   placeholder:text-slate-400 text-slate-700 font-medium
                   ${
                     isFocused
                       ? 'border-emerald-300 shadow-lg shadow-emerald-500/20'
                       : 'border-slate-200 hover:border-slate-300'
                   }`}
        value={term}
        onChange={(e) => setTerm(e.target.value)}   // ✅ local state only
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {term && (
        <button
          onClick={() => {
            setTerm('');
            onSearch('');
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 
                   transition-colors duration-200 hover:scale-110"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      {term && (
        <div className="absolute top-full left-0 right-0 mt-1">
          <div className="text-xs text-slate-500 px-4">
            Searching for "{term}"...
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
