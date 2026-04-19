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
    default: "bg-white border-2 border-[#0A0A0A]",
    yellow: "bg-[#FFC107] border-2 border-[#0A0A0A]",
    dark: "bg-[#0A0A0A] border-2 border-[#0A0A0A] text-white",
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
        "shadow-[4px_4px_0px_#0A0A0A]",
        variants[variant],
        paddings[padding],
        hover && "transition-all duration-150 hover:shadow-[6px_6px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}