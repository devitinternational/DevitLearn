import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  fullWidth?: boolean;
  as?: "button" | "a";
  href?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wider border-2 border-[var(--black)] cursor-pointer transition-all duration-150 select-none relative active:translate-x-[2px] active:translate-y-[2px]";

  const variants = {
    primary:
      "theme-fixed-yellow bg-[#FFC107] text-[var(--black)] shadow-[4px_4px_0px_var(--black)] hover:shadow-[6px_6px_0px_var(--black)] hover:-translate-x-[1px] hover:-translate-y-[1px] active:shadow-[2px_2px_0px_var(--black)]",
    secondary:
      "bg-[var(--white)] text-[var(--black)] shadow-[4px_4px_0px_var(--black)] hover:shadow-[6px_6px_0px_var(--black)] hover:-translate-x-[1px] hover:-translate-y-[1px] active:shadow-[2px_2px_0px_var(--black)]",
    ghost:
      "bg-transparent text-[var(--black)] shadow-none hover:bg-[#FFC107] hover:shadow-[4px_4px_0px_var(--black)]",
    dark:
      "bg-[var(--black)] text-[var(--white)] shadow-[4px_4px_0px_rgba(var(--black-rgb),0.3)] hover:shadow-[6px_6px_0px_rgba(var(--black-rgb),0.4)] hover:-translate-x-[1px] hover:-translate-y-[1px] active:shadow-[2px_2px_0px_rgba(var(--black-rgb),0.3)] border-[var(--black)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...props}
    >
      {children}
    </button>
  );
}
