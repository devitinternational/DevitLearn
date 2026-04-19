"use client";
import Link from "next/link";

interface DevItLogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "white" | "black";
  showWordmark?: boolean;
}

const sizes = {
  sm: { mark: 28, text: "text-lg" },
  md: { mark: 36, text: "text-2xl" },
  lg: { mark: 48, text: "text-3xl" },
};

export default function DevItLogo({
  size = "md",
  variant = "default",
  showWordmark = true,
}: DevItLogoProps) {
  const { mark, text } = sizes[size];
  const markColor = variant === "white" ? "#FFFFFF" : "#0A0A0A";
  const bgColor = variant === "white" ? "#0A0A0A" : "#FFC107";
  const textColor = variant === "white" ? "#FFFFFF" : variant === "black" ? "#0A0A0A" : "#0A0A0A";

  return (
    <Link href="/" className="flex items-center gap-2 no-underline group">
      {/* D Mark */}
      <div
        className="flex items-center justify-center flex-shrink-0 border-2 border-[#0A0A0A]"
        style={{
          width: mark,
          height: mark,
          background: bgColor,
        }}
      >
        <svg
          width={mark * 0.62}
          height={mark * 0.62}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Custom D shape with the square cutout — matching the logo */}
          <path
            d="M4 4h8c8 0 16 3.6 16 12s-8 12-16 12H4V4z"
            fill={markColor}
          />
          <rect x="3" y="11" width="7" height="7" rx="1.5" fill={bgColor} />
        </svg>
      </div>

      {showWordmark && (
        <span
          className={`font-heading font-black ${text} tracking-tight leading-none`}
          style={{ color: textColor, fontFamily: "var(--font-heading)" }}
        >
          Dev<span style={{ color: variant === "default" ? "#0A0A0A" : textColor }}>It</span>
        </span>
      )}
    </Link>
  );
}
