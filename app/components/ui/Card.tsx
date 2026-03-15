import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`
        bg-white
        border-4 border-devitBlack
        shadow-brutal
        p-6
        w-full
        max-w-full
        ${className}
      `}
    >
      {children}
    </div>
  );
};