import React from 'react';
import Select from 'react-select';

const FilterDropdown = ({ options, onChange }) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      backdropFilter: 'blur(8px)',
      border: state.isFocused ? '2px solid #10b981' : '2px solid #e2e8f0',
      borderRadius: '12px',
      padding: '4px 8px',
      boxShadow: state.isFocused 
        ? '0 10px 25px -3px rgba(16, 185, 129, 0.1), 0 4px 6px -2px rgba(16, 185, 129, 0.05)' 
        : 'none',
      transition: 'all 0.3s ease',
      '&:hover': {
        borderColor: '#cbd5e1',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#94a3b8',
      fontWeight: '500',
    }),
    multiValue: (provided, state) => {
      const colors = [
        { bg: '#d1fae5', text: '#065f46', border: '#10b981' },
        { bg: '#ccfbf1', text: '#134e4a', border: '#14b8a6' },
        { bg: '#cffafe', text: '#164e63', border: '#06b6d4' },
        { bg: '#dbeafe', text: '#1e3a8a', border: '#3b82f6' },
        { bg: '#e9d5ff', text: '#581c87', border: '#8b5cf6' },
      ];
      const colorIndex = state.data.value.length % colors.length;
      const selectedColor = colors[colorIndex];
      
      return {
        ...provided,
        backgroundColor: selectedColor.bg,
        borderRadius: '6px',
        border: `1px solid ${selectedColor.border}`,
        margin: '2px',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      };
    },
    multiValueLabel: (provided, state) => {
      const colors = [
        { text: '#065f46' }, 
        { text: '#134e4a' }, 
        { text: '#164e63' }, 
        { text: '#1e3a8a' }, 
        { text: '#581c87' }, 
      ];
      const colorIndex = state.data.value.length % colors.length;
      
      return {
        ...provided,
        color: colors[colorIndex].text,
        fontWeight: '600',
        fontSize: '12px',
        padding: '2px 6px',
      };
    },
    multiValueRemove: (provided, state) => {
      const colors = [
        { text: '#065f46', hover: '#dc2626' },
        { text: '#134e4a', hover: '#dc2626' },
        { text: '#164e63', hover: '#dc2626' },
        { text: '#1e3a8a', hover: '#dc2626' },
        { text: '#581c87', hover: '#dc2626' },
      ];
      const colorIndex = state.data.value.length % colors.length;
      
      return {
        ...provided,
        color: colors[colorIndex].text,
        borderRadius: '0 4px 4px 0',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: colors[colorIndex].hover,
          color: 'white',
          transform: 'scale(1.1)',
        },
      };
    },
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused 
        ? '#f0fdfa' 
        : state.isSelected 
        ? '#10b981' 
        : 'white',
      color: state.isSelected ? 'white' : '#1f2937',
      padding: '12px 16px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: state.isSelected ? '#059669' : '#f0fdfa',
        transform: 'translateX(4px)',
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      border: '1px solid #e5e7eb',
      marginTop: '8px',
    }),
    menuList: (provided) => ({
      ...provided,
      padding: '0',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? '#10b981' : '#94a3b8',
      transition: 'all 0.3s ease',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      '&:hover': {
        color: '#10b981',
      },
    }),
  };

  return (
    <div className="w-full">
      <Select 
        isMulti 
        options={options} 
        placeholder="🏷️ Filter by categories..." 
        className="text-sm"
        classNamePrefix="react-select"
        styles={customStyles}
        onChange={onChange}
        components={{
          IndicatorSeparator: () => null,
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#10b981',
            primary75: '#34d399',
            primary50: '#6ee7b7',
            primary25: '#a7f3d0',
          },
        })}
      />
    </div>
  );
};

export default FilterDropdown;