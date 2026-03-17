import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { PromoCard } from "@/components/PromoCard";
import { Chip } from "@/components/Chip";
import { promos } from "@/data/promos";

export default function Promos() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return promos;
    return promos.filter(p => p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase())));
  }, [filter]);

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">Promociones</h1>
        <p className="text-muted-foreground mt-1 text-sm">Ofertas especiales para cuidarte más.</p>
        
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {["all", "Facial", "Corporal", "Flash", "Bienestar"].map(f => (
            <Chip key={f} variant="outline" active={filter === f} onClick={() => setFilter(f)}>
              {f === "all" ? "Todas" : f}
            </Chip>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filtered.map(p => <PromoCard key={p.id} promo={p} />)}
        </div>
      </div>
    </Layout>
  );
}
