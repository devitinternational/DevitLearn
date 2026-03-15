import React from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  disabled,
  children,
  className = "",
  ...props
}) => {
  const base =
    "px-6 py-3 text-sm md:text-base font-semibold border-4 border-devitBlack transition-all duration-150 shadow-brutal";

  const variants = {
    primary: "bg-devitYellow text-devitBlack",
    secondary: "bg-white text-devitBlack",
  };

  const hover =
    "hover:translate-x-[6px] hover:translate-y-[6px] hover:shadow-none";

  const disabledStyle =
    "bg-gray-200 text-gray-500 shadow-[4px_4px_0px_#888] cursor-not-allowed";

  return (
    <button
      aria-disabled={disabled}
      disabled={disabled}
      className={`
        ${base}
        ${!disabled ? variants[variant] : disabledStyle}
        ${!disabled ? hover : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};