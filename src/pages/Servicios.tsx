import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ServiceCard } from "@/components/ServiceCard";
import { Chip } from "@/components/Chip";
import { Input } from "@/components/ui/input";
import { services } from "@/data/services";
import { Search } from "lucide-react";
import { ServiceCategory, Objective } from "@/types";

const categories: { key: ServiceCategory | "all"; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "corporal", label: "Corporal" },
  { key: "facial", label: "Facial" },
  { key: "addon", label: "Add-ons" },
  { key: "combo", label: "Combos" },
];

const objectiveFilters: { key: Objective; label: string }[] = [
  { key: "reduccion", label: "Reducción" },
  { key: "drenaje", label: "Drenaje" },
  { key: "celulitis", label: "Celulitis" },
  { key: "gluteos", label: "Glúteos" },
  { key: "abdomen", label: "Abdomen" },
  { key: "glow", label: "Glow" },
];

export default function Servicios() {
  const [params] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ServiceCategory | "all">("all");
  const [objective, setObjective] = useState<Objective | null>(params.get("objetivo") as Objective | null);

  const filtered = useMemo(() => {
    return services.filter(s => {
      if (category !== "all" && s.category !== category) return false;
      if (objective && !s.objectives.includes(objective)) return false;
      if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, category, objective]);

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">Servicios</h1>
        <p className="text-muted-foreground mt-1 text-sm">Encuentra el tratamiento ideal para ti.</p>

        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar servicio..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 rounded-xl" />
        </div>

        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(c => (
            <Chip key={c.key} variant="outline" active={category === c.key} onClick={() => setCategory(c.key)}>{c.label}</Chip>
          ))}
        </div>

        <div className="flex gap-2 mt-2 overflow-x-auto pb-2 scrollbar-hide">
          {objectiveFilters.map(o => (
            <Chip key={o.key} variant="outline" active={objective === o.key} onClick={() => setObjective(objective === o.key ? null : o.key)}>{o.label}</Chip>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {filtered.map(s => <ServiceCard key={s.id} service={s} />)}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="font-display font-semibold">No se encontraron servicios</p>
            <p className="text-sm mt-1">Intenta con otros filtros.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
