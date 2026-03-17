import { Link } from "react-router-dom";
import { Objective } from "@/types";
import { cn } from "@/lib/utils";

interface ObjectiveCardProps {
  objective: Objective;
  label: string;
  icon: string;
}

const objectiveColors: Record<Objective, string> = {
  reduccion: "from-primary/20 to-primary/5",
  drenaje: "from-blue-100 to-blue-50",
  celulitis: "from-orange-100 to-orange-50",
  gluteos: "from-pink-100 to-pink-50",
  abdomen: "from-purple-100 to-purple-50",
  glow: "from-yellow-100 to-yellow-50",
};

export function ObjectiveCard({ objective, label, icon }: ObjectiveCardProps) {
  return (
    <Link
      to={`/servicios?objetivo=${objective}`}
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-to-br border border-border hover:shadow-card transition-all min-h-[100px]",
        objectiveColors[objective]
      )}
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-display font-semibold text-sm text-foreground text-center">{label}</span>
    </Link>
  );
}
