"use client";
import Link from "next/link";
import Image from "next/image";

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

const logoColors = {
  yellow: "#FFC107",
  black: "#0A0A0A",
  white: "#FFFFFF",
};

export default function DevItLogo({
  size = "md",
  variant = "default",
  showWordmark = true,
}: DevItLogoProps) {
  const { mark, text } = sizes[size];
  const markColor = variant === "white" ? logoColors.white : logoColors.black;
  const bgColor = variant === "white" ? logoColors.black : logoColors.yellow;
  const textColor = variant === "white" ? logoColors.white : logoColors.black;
  const borderColor = variant === "white" ? logoColors.white : logoColors.black;

  return (
    <Link href="/" className="flex items-center gap-2 no-underline group">
      {/* D Mark Logo Image */}
      <div
        className="flex items-center justify-center flex-shrink-0 border-2"
        style={{
          width: mark,
          height: mark,
          background: bgColor,
          borderColor,
        }}
      >
        <Image
          src="/logo.png"
          alt="DevIt Logo"
          width={mark}
          height={mark}
          className="object-cover w-full h-full"
        />
      </div>

      {showWordmark && (
        <span
          className={`font-heading font-black ${text} tracking-tight leading-none`}
          style={{ color: textColor, fontFamily: "var(--font-heading)" }}
        >
          Dev<span style={{ color: textColor }}>It</span>
        </span>
      )}
    </Link>
  );
}
