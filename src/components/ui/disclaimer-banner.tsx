import { cn } from "@/lib/utils";
import { AlertTriangle, Info } from "lucide-react";

interface DisclaimerBannerProps {
  variant?: "info" | "warning";
  className?: string;
}

export function DisclaimerBanner({ variant = "info", className }: DisclaimerBannerProps) {
  const Icon = variant === "warning" ? AlertTriangle : Info;
  
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl p-4 text-sm",
        variant === "info" && "bg-info/10 text-info border border-info/20",
        variant === "warning" && "bg-warning/10 text-warning border border-warning/20",
        className
      )}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-medium mb-1">Wellness Guidance Only</p>
        <p className="opacity-80">
          This is for wellness guidance only and is not a medical diagnosis. 
          Please consult a dental professional for medical advice.
        </p>
      </div>
    </div>
  );
}
