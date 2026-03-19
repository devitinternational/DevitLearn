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
    "inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wider border-2 border-[#0A0A0A] cursor-pointer transition-all duration-150 select-none relative active:translate-x-[2px] active:translate-y-[2px]";

  const variants = {
    primary:
      "bg-[#FFC107] text-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] hover:shadow-[6px_6px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] active:shadow-[2px_2px_0px_#0A0A0A]",
    secondary:
      "bg-white text-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] hover:shadow-[6px_6px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] active:shadow-[2px_2px_0px_#0A0A0A]",
    ghost:
      "bg-transparent text-[#0A0A0A] shadow-none hover:bg-[#FFC107] hover:shadow-[4px_4px_0px_#0A0A0A]",
    dark:
      "bg-[#0A0A0A] text-white shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.4)] hover:-translate-x-[1px] hover:-translate-y-[1px] active:shadow-[2px_2px_0px_rgba(0,0,0,0.3)] border-[#0A0A0A]",
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