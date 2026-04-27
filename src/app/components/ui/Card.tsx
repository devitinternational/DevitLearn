import clsx from "clsx";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "yellow" | "dark";
  hover?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
}

export default function Card({
  children,
  className,
  variant = "default",
  hover = false,
  padding = "md",
}: CardProps) {
  const variants = {
    default: "bg-[var(--white)] border-2 border-[var(--black)]",
    yellow: "theme-fixed-yellow bg-[#FFC107] border-2 border-[var(--black)] text-[var(--black)]",
    dark: "bg-[var(--black)] border-2 border-[var(--black)] text-[var(--white)]",
  };

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={clsx(
        "shadow-[4px_4px_0px_var(--black)]",
        variants[variant],
        paddings[padding],
        hover && "transition-all duration-150 hover:shadow-[6px_6px_0px_var(--black)] hover:-translate-x-[1px] hover:-translate-y-[1px] cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
