import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
  className = '',
  inputClassName = '',
  variant = 'frosted', // 'light' = the recent light style, 'frosted' = translucent/dark style
  ...props
}) => {
  const COMMON = `flex h-10 w-full rounded-md border px-3 py-2 text-sm
    focus:border-[rgb(151,177,150)] focus:ring-[rgb(151,177,150)]/50
    hover:border-[rgb(151,177,150)]/50 transition-all duration-300`;

  const VARIANTS = {
    light: 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none',
    frosted: 'bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm focus:bg-white/15 focus:outline-none'
  };

  const variantClasses = VARIANTS[variant] || VARIANTS.light;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`text-sm font-medium ${variant === 'frosted' ? 'text-white' : 'text-gray-900'}`}
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`${COMMON} ${variantClasses} ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${inputClassName}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  variant: PropTypes.oneOf(['light', 'frosted']),
};

export default InputField;
