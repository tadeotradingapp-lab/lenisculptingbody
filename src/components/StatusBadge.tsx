import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "pending" | "active" | "expiring";
  className?: string;
}

const config = {
  pending: { label: "Pendiente", bg: "bg-warning/10", text: "text-warning", dot: "bg-warning" },
  active: { label: "Vigente", bg: "bg-success/10", text: "text-success", dot: "bg-success" },
  expiring: { label: "Finaliza pronto", bg: "bg-destructive/10", text: "text-destructive", dot: "bg-destructive" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, bg, text, dot } = config[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold", bg, text, className)}>
      <span className={cn("w-2 h-2 rounded-full animate-pulse", dot)} />
      {label}
    </span>
  );
}
