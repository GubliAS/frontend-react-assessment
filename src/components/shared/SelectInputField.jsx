
const SelectField = ({ label, name, options = [], required, ...props }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-200">
        {label}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm 
                   bg-white/10 border-white/20 text-white placeholder:text-gray-400 
                   focus:border-[rgb(151,177,150)] focus:ring-[rgb(151,177,150)]/50 
                   focus:bg-white/15 hover:border-[rgb(151,177,150)]/50 
                   backdrop-blur-sm transition-all duration-300"
        {...props}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-black">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;