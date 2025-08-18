import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../utils/classNames';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  fullWidth = false,
  startIcon,
  endIcon,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  
  const variants = {
    primary: 'bg-[var(--gold-400)] text-[var(--ebony-50)] hover:bg-[var(--gold-500)] focus:ring-indigo-500',
    secondary: 'bg-[var(--ebony-50)] text-white border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    text: 'text-indigo-600 hover:text-indigo-800 bg-transparent hover:bg-indigo-50 focus:ring-indigo-500',

    // New variants for Header
    ghost: 'bg-transparent text-[var(--river-bed)] hover:text-[var(--gold-400)] transition-all duration-300',
    outlineWhite: 'border border-white/30 text-white rounded-full hover:border-[rgb(151,177,150)] hover:text-white transition-all duration-300 transform hover:scale-105',
    outlineEbony: 'bg-transparent text-[var(--ebony-50)] hover:text-[var(--gold-300)] hover:bg-transparent border-ebony hover:bg-[var(--ebony-50)]',
    mobileMenu: 'bg-transparent text-[var(--ebony-50)] hover:bg-[rgb(151,177,150)]/20 hover:text-[var(--ebony-50)] transition-all duration-300 rounded',
    seekerOremployer: 'gap-2 text-[var(--river-bed))] hover:text-[var(--ebony-50)] hover:bg-white/10',

    // NEW: Gradient button (Create Account style)
    gradient: 'text-white bg-gradient-to-r from-[rgb(151,177,150)] to-emerald-500 ' +
              'hover:from-[rgb(171,197,170)] hover:to-emerald-400 ' +
              'shadow-lg hover:shadow-xl hover:shadow-[rgb(151,177,150)]/25 ' +
              'transform hover:scale-[1.02] rounded-md',

    // NEW: Emerald gradient variant used by JobCard
    emeraldGradient: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transition-all duration-200 rounded-xl font-semibold'
  };

  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  return (
    <button
      type={type}
      className={classNames(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        disabled ? disabledStyles : '',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'text', 'seekerOremployer', 'gradient', 'ghost', 'outlineWhite', 'outlineEbony', 'mobileMenu', 'emeraldGradient']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
};

export default Button;

