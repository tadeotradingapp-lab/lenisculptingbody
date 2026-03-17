import { cn } from "@/lib/utils";

interface ChipProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "success" | "outline";
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Chip({ children, variant = "default", active, onClick, className }: ChipProps) {
  const base = "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap";
  const variants = {
    default: active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80",
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    outline: active ? "border-2 border-primary bg-primary/5 text-primary" : "border border-border text-muted-foreground hover:border-primary/50",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(base, variants[variant], onClick && "cursor-pointer", !onClick && "cursor-default", className)}
    >
      {children}
    </button>
  );
}
