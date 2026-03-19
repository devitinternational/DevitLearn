import clsx from "clsx";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "yellow" | "dark" | "white" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export default function Badge({
  children,
  variant = "yellow",
  size = "md",
  className,
}: BadgeProps) {
  const variants = {
    yellow: "bg-[#FFC107] text-[#0A0A0A] border-[#0A0A0A]",
    dark: "bg-[#0A0A0A] text-white border-[#0A0A0A]",
    white: "bg-white text-[#0A0A0A] border-[#0A0A0A]",
    outline: "bg-transparent text-[#0A0A0A] border-[#0A0A0A]",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center border-2 font-bold uppercase tracking-[0.08em]",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
