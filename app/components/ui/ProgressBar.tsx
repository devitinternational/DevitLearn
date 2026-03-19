interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  showPercent?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "yellow" | "dark";
}

export default function ProgressBar({
  value,
  label,
  showPercent = true,
  size = "md",
  variant = "yellow",
}: ProgressBarProps) {
  const heights = { sm: "h-2", md: "h-4", lg: "h-6" };
  const fillColors = {
    yellow: "bg-[#FFC107]",
    dark: "bg-[#0A0A0A]",
  };

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-xs font-bold uppercase tracking-widest text-[#0A0A0A]">
              {label}
            </span>
          )}
          {showPercent && (
            <span className="text-xs font-black font-mono tabular-nums">
              {Math.round(value)}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full ${heights[size]} bg-[#F0F0EC] border-2 border-[#0A0A0A] overflow-hidden`}
      >
        <div
          className={`${heights[size]} ${fillColors[variant]} border-r-2 border-[#0A0A0A] transition-all duration-700 ease-out relative overflow-hidden`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        >
          {/* Animated stripe */}
          <div className="absolute inset-0 stripe-bg opacity-30" />
        </div>
      </div>
    </div>
  );
}
