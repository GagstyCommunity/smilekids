import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const riskBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium transition-colors",
  {
    variants: {
      level: {
        low: "bg-success/15 text-success border border-success/20",
        medium: "bg-warning/15 text-warning border border-warning/20",
        high: "bg-destructive/15 text-destructive border border-destructive/20",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
      },
    },
    defaultVariants: {
      level: "low",
      size: "md",
    },
  }
);

interface RiskBadgeProps extends VariantProps<typeof riskBadgeVariants> {
  className?: string;
  showDot?: boolean;
}

export function RiskBadge({ level, size, className, showDot = true }: RiskBadgeProps) {
  const labels = {
    low: "Low Risk",
    medium: "Medium Risk",
    high: "High Risk",
  };

  return (
    <span className={cn(riskBadgeVariants({ level, size }), className)}>
      {showDot && (
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            level === "low" && "bg-success",
            level === "medium" && "bg-warning",
            level === "high" && "bg-destructive"
          )}
        />
      )}
      {labels[level || "low"]}
    </span>
  );
}
