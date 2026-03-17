import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Chip } from "@/components/Chip";
import { results } from "@/data/results";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";

export default function Resultados() {
  const [selected, setSelected] = useState<typeof results[0] | null>(null);
  const [filter, setFilter] = useState("all");

  const allTags = [...new Set(results.flatMap(r => r.tags))];
  const filtered = filter === "all" ? results : results.filter(r => r.tags.includes(filter));

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="font-display font-bold text-2xl md:text-3xl text-gradient-primary">Resultados reales</h1>
        <p className="text-muted-foreground mt-1 text-sm">Resultados pueden variar según cada persona.</p>

        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          <Chip variant="outline" active={filter === "all"} onClick={() => setFilter("all")}>Todos</Chip>
          {allTags.map(t => <Chip key={t} variant="outline" active={filter === t} onClick={() => setFilter(t)}>{t}</Chip>)}
        </div>

        <div className="columns-2 md:columns-3 gap-4 mt-6 space-y-4">
          {filtered.map(r => (
            <div key={r.id} className="break-inside-avoid cursor-pointer group" onClick={() => setSelected(r)}>
              <div className="rounded-2xl overflow-hidden bg-muted relative">
                {r.type === "beforeAfter" ? (
                  <BeforeAfterSlider beforeUrl={r.beforeUrl} afterUrl={r.afterUrl} className="aspect-[3/4]" />
                ) : (
                  <img src={r.imageUrl} alt={r.serviceName} className="w-full aspect-[3/4] object-cover" loading="lazy" />
                )}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-background font-display font-semibold text-sm bg-foreground/60 px-4 py-2 rounded-full">Ver detalle</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {r.tags.map(t => <span key={t} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-background rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-elevated" onClick={e => e.stopPropagation()}>
            <div className="p-4 flex items-center justify-between border-b border-border">
              <h3 className="font-display font-semibold text-foreground">{selected.serviceName}</h3>
              <button onClick={() => setSelected(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted active:scale-[0.95]"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4">
              {selected.type === "beforeAfter" ? (
                <BeforeAfterSlider beforeUrl={selected.beforeUrl} afterUrl={selected.afterUrl} className="aspect-[3/4] rounded-xl" />
              ) : (
                <img src={selected.imageUrl} alt={selected.serviceName} className="w-full rounded-xl" />
              )}
              <div className="flex flex-wrap gap-2 mt-4">
                {selected.tags.map(t => <Chip key={t} variant="primary">{t}</Chip>)}
                {selected.sessions && <Chip variant="success">{selected.sessions} sesiones</Chip>}
              </div>
              <Link to={`/reservar?type=service&id=${selected.serviceSlug}`} className="mt-4 flex items-center justify-center gap-2 w-full h-11 rounded-full bg-primary text-primary-foreground font-display font-semibold active:scale-[0.98]">
                Solicitar cita <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-center text-muted-foreground mt-3">Resultados pueden variar según cada persona.</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
