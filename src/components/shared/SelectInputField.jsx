import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = '',
  required = false,
  className = '',
  selectClassName = '',
  variant = 'frosted', // 'light' | 'frosted'
  ...props
}) => {
  const COMMON = `h-10 w-full rounded-md border px-3 py-2 text-sm transition-all duration-200
    focus:outline-none focus:ring-[rgb(151,177,150)] focus:ring-opacity-50`;

  const VARIANTS = {
    light: 'bg-white border-gray-200 text-gray-900 placeholder-gray-400',
    frosted: 'bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm'
  };

  const variantClasses = VARIANTS[variant] || VARIANTS.light;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`text-sm font-medium ${variant === 'frosted' ? 'text-white' : 'text-gray-900'}`}
        >
          {label}{required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`${COMMON} ${variantClasses} ${selectClassName}`}
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map(opt => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  selectClassName: PropTypes.string,
  variant: PropTypes.oneOf(['light', 'frosted']),
};

export default SelectField;