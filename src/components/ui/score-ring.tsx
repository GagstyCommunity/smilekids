import { cn } from "@/lib/utils";

interface ScoreRingProps {
  score: number;
  maxScore?: number;
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
  sublabel?: string;
  riskLevel?: "low" | "medium" | "high";
  className?: string;
}

const sizeConfig = {
  sm: { diameter: 80, strokeWidth: 6, fontSize: "text-lg", sublabelSize: "text-xs" },
  md: { diameter: 120, strokeWidth: 8, fontSize: "text-2xl", sublabelSize: "text-sm" },
  lg: { diameter: 160, strokeWidth: 10, fontSize: "text-3xl", sublabelSize: "text-base" },
  xl: { diameter: 200, strokeWidth: 12, fontSize: "text-4xl", sublabelSize: "text-lg" },
};

const riskColors = {
  low: "stroke-risk-low",
  medium: "stroke-risk-medium",
  high: "stroke-risk-high",
};

export function ScoreRing({
  score,
  maxScore = 100,
  size = "md",
  label,
  sublabel,
  riskLevel,
  className,
}: ScoreRingProps) {
  const config = sizeConfig[size];
  const radius = (config.diameter - config.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(score / maxScore, 1);
  const strokeDashoffset = circumference * (1 - progress);

  // Determine color based on risk level or score
  const getStrokeColor = () => {
    if (riskLevel) return riskColors[riskLevel];
    if (score >= 70) return "stroke-risk-low";
    if (score >= 40) return "stroke-risk-medium";
    return "stroke-risk-high";
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={config.diameter}
        height={config.diameter}
        viewBox={`0 0 ${config.diameter} ${config.diameter}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={config.diameter / 2}
          cy={config.diameter / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={config.strokeWidth}
          className="text-muted"
        />
        {/* Progress circle */}
        <circle
          cx={config.diameter / 2}
          cy={config.diameter / 2}
          r={radius}
          fill="none"
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={cn("transition-all duration-1000 ease-out animate-score-fill", getStrokeColor())}
          style={{ strokeDashoffset }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-bold text-foreground", config.fontSize)}>{score}</span>
        {label && <span className={cn("text-muted-foreground font-medium", config.sublabelSize)}>{label}</span>}
        {sublabel && <span className={cn("text-muted-foreground", config.sublabelSize)}>{sublabel}</span>}
      </div>
    </div>
  );
}
