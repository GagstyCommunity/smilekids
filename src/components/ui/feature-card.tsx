import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  onClick?: () => void;
  badge?: string;
  locked?: boolean;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
  onClick,
  badge,
  locked,
}: FeatureCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card p-6 shadow-card transition-all duration-300",
        "hover:shadow-card-hover hover:-translate-y-1",
        "border border-border/50",
        onClick && "cursor-pointer",
        locked && "opacity-75",
        className
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Badge */}
      {badge && (
        <span className="absolute top-4 right-4 px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
          {badge}
        </span>
      )}

      {/* Lock overlay */}
      {locked && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
          <span className="px-3 py-1 bg-muted rounded-full text-sm font-medium text-muted-foreground">
            🔒 Pro Feature
          </span>
        </div>
      )}

      <div className="relative z-0">
        {/* Icon */}
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          <Icon className="w-6 h-6" />
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
