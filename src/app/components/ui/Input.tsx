import React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  id,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-heading text-devitBlack"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={`
          w-full
          px-4 py-2
          border-4 border-devitBlack
          outline-none
          transition
          focus:shadow-brutal
          focus:bg-devitYellow/10
          ${className}
        `}
        aria-label={label}
        {...props}
      />
    </div>
  );
};