import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  children,
  className = '',
  header,
  footer,
  padding = 'p-6',
  shadow = 'shadow-sm',
  rounded = 'rounded-xl',
  border = 'border border-gray-200',
  hoverEffect = false,
}) => {
  return (
    <div 
      className={`bg-white ${rounded} ${shadow} ${border} overflow-hidden ${hoverEffect ? 'transition-all duration-200 hover:shadow-md' : ''} ${className}`}
    >
      {header && (
        <div className="border-b border-gray-200 px-6 py-4">
          {typeof header === 'string' ? (
            <h3 className="text-lg font-medium text-gray-900">{header}</h3>
          ) : (
            header
          )}
        </div>
      )}
      
      <div className={padding}>
        {children}
      </div>
      
      {footer && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  footer: PropTypes.node,
  padding: PropTypes.string,
  shadow: PropTypes.string,
  rounded: PropTypes.string,
  border: PropTypes.string,
  hoverEffect: PropTypes.bool,
};

export default Card;
