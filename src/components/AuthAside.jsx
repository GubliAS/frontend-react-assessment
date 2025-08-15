import React from 'react';

const AuthAside = ({ 
  title = "Unlock Your Potential",
  subtitle = "Join the largest community of young Ghanaian professionals, entrepreneurs, and innovators shaping the future of our nation.",
  stats = [
    { value: '15K+', label: 'Active Members' },
    { value: '800+', label: 'Opportunities' },
    { value: '50+', label: 'Partners' },
  ]
}) => {
  const cardClasses =
    'text-center p-4 rounded-xl bg-white backdrop-blur-sm border shadow-[0px_8px_12px_0px_rgba(0,0,0,0.25)] border-white/10 hover:bg-[var(--gold-300)]/20 hover:border-[rgb(151,177,150)]/30 transition-all duration-300 cursor-pointer group';
  
  const valueClasses =
    'text-2xl font-bold text-[var(--ebony-50)] group-hover:text-[var(--gold-300)] transition-colors duration-300';
  
  const labelClasses =
    'text-sm text-[var(--river-bed)] group-hover:text-[var(--gold-300)] transition-colors duration-300';

  return (
    <div className="hidden lg:block space-y-8 text-white">
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-5xl font-bold leading-tight">
            <span className="text-[var(--ebony-50)]">
              {title.split(' ').slice(0, 2).join(' ')}
            </span>
            <br />
            <span className="text-[var(--ebony-50)]">
              {title.split(' ').slice(2).join(' ')}
            </span>
          </h2>
          <p className="text-xl text-[var(--river-bed)] leading-relaxed max-w-lg">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 pt-8">
          {stats.map(({ value, label }, idx) => (
            <div key={idx} className={cardClasses}>
              <div className={valueClasses}>{value}</div>
              <div className={labelClasses}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthAside;