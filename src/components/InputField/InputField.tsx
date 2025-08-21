import React, { useState } from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: "text" | "password";
  clearable?: boolean;
  showPasswordToggle?: boolean;
}

const sizeStyles = {
  sm: "py-1 px-2 text-sm",
  md: "py-2 px-3 text-base",
  lg: "py-3 px-4 text-lg",
};

const variantStyles = {
  filled: "bg-gray-100 border border-gray-300 focus:border-blue-500",
  outlined: "bg-white border-2 border-blue-500 focus:border-blue-700",
  ghost: "bg-transparent border-b-2 border-gray-300 focus:border-blue-500",
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable = false,
  showPasswordToggle = false,
}) => {
  const [localValue, setLocalValue] = useState<string>(value || "");
  const [showPassword, setShowPassword] = useState(false);
  const displayValue = value !== undefined ? value : localValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    if (onChange) onChange(e);
  };

  const handleClear = () => {
    setLocalValue("");
    if (onChange) onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
  };

  const inputType = showPasswordToggle && type === "password"
    ? (showPassword ? "text" : "password")
    : type;

  return (
    <div className="flex flex-col gap-1 w-full max-w-md">
      {label && (
        <label className="font-medium text-gray-800  ">{label}</label>
      )}
      <div className="relative flex items-center">
        <input
          className={`transition border rounded w-full outline-none border-gray-600
            ${sizeStyles[size]}
            ${variantStyles[variant]}
            ${invalid ? "border-red-500 focus:border-red-700" : ""}
            ${disabled ? "bg-gray-200 opacity-70 cursor-not-allowed" : ""}
            ${loading ? "pr-10" : ""}  `}
          type={inputType}
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          aria-invalid={invalid}
          aria-label={label}
        />
        {/* Loading spinner */}
        {loading && (
          <span className="absolute right-2 animate-spin text-gray-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          </span>
        )}
        {/* Clear button */}
        {clearable && displayValue && !disabled && !loading && (
          <button
            type="button"
            className="absolute right-2 text-gray-400 hover:text-gray-700"
            onClick={handleClear}
            tabIndex={-1}
            aria-label="Clear"
          >
            &#10005;
          </button>
        )}
        {/* Password toggle */}
        {showPasswordToggle && type === "password" && !loading && (
          <button
            type="button"
            className="absolute right-2 pr-6 text-gray-400 hover:text-gray-700"
            onClick={() => setShowPassword((p) => !p)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
            style={clearable ? { right: '2.5rem' } : undefined}
          >
            {showPassword ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.188.206-2.33.588-3.388M8.239 15.759A5.979 5.979 0 0112 17c3.314 0 6-2.686 6-6 0-1.037-.262-2.015-.725-2.859"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.269 2.943 9.543 7-.174.559-.386 1.099-.632 1.615"/>
              </svg>
            )}
          </button>
        )}
      </div>
      {helperText && !invalid && (
        <span className="text-xs text-gray-500 dark:text-gray-400">{helperText}</span>
      )}
      {invalid && errorMessage && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};
