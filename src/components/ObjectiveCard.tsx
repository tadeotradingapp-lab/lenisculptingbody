import { Link } from "react-router-dom";
import { Objective } from "@/types";
import { cn } from "@/lib/utils";
import { Flame, Droplets, Sparkles, Heart, Target, Sun } from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface ObjectiveCardProps {
  objective: Objective;
  label: string;
  icon: string;
}

const objectiveConfig: Record<Objective, { gradient: string; Icon: LucideIcon }> = {
  reduccion: { gradient: "from-primary/20 to-primary/5", Icon: Flame },
  drenaje: { gradient: "from-blue-100 to-blue-50", Icon: Droplets },
  celulitis: { gradient: "from-orange-100 to-orange-50", Icon: Sparkles },
  gluteos: { gradient: "from-pink-100 to-pink-50", Icon: Heart },
  abdomen: { gradient: "from-purple-100 to-purple-50", Icon: Target },
  glow: { gradient: "from-yellow-100 to-yellow-50", Icon: Sun },
};

export function ObjectiveCard({ objective, label }: ObjectiveCardProps) {
  const config = objectiveConfig[objective];
  const Icon = config.Icon;

  return (
    <Link
      to={`/servicios?objetivo=${objective}`}
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-to-br border border-border hover:shadow-card hover:scale-105 transition-all duration-300 min-h-[100px] active:scale-[0.98]",
        config.gradient
      )}
    >
      <Icon className="w-6 h-6 text-foreground/70" />
      <span className="font-display font-semibold text-sm text-foreground text-center">{label}</span>
    </Link>
  );
}
