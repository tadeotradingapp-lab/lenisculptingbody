import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Chip } from "@/components/Chip";
import { services } from "@/data/services";
import { promos } from "@/data/promos";
import { packages } from "@/data/packages";
import { Sparkles, ArrowRight } from "lucide-react";
import { Objective } from "@/types";

const objectives: { key: Objective; label: string; icon: string }[] = [
  { key: "abdomen", label: "Abdomen", icon: "💪" },
  { key: "gluteos", label: "Glúteos", icon: "🍑" },
  { key: "drenaje", label: "Drenaje", icon: "💧" },
  { key: "celulitis", label: "Celulitis", icon: "✨" },
  { key: "glow", label: "Facial Glow", icon: "🌟" },
];

const preferences = [
  { key: "quick", label: "Rápido (1 sesión)", icon: "⚡" },
  { key: "plan", label: "Plan (6–8 sesiones)", icon: "📋" },
];

const intensities = [
  { key: "relaxing", label: "Relajante", icon: "🧘" },
  { key: "intensive", label: "Intensivo", icon: "🔥" },
];

function getRecommendation(obj: Objective, pref: string, intensity: string) {
  const matchingServices = services.filter(s => s.objectives.includes(obj));
  const primary = matchingServices[0] || services[0];
  const alt1 = matchingServices[1] || services[1];
  
  const matchingPromo = promos.find(p => p.tags.some(t => 
    obj === "glow" ? t.toLowerCase().includes("facial") : t.toLowerCase().includes("corporal")
  ));
  
  const matchingPkg = pref === "plan" ? packages[1] : packages[0];

  return {
    primary: { type: "service" as const, name: primary.name, id: primary.id, desc: primary.shortDescription },
    alternatives: [
      matchingPromo ? { type: "promo" as const, name: matchingPromo.title, id: matchingPromo.id, desc: matchingPromo.subtitle } : { type: "service" as const, name: alt1.name, id: alt1.id, desc: alt1.shortDescription },
      { type: "package" as const, name: matchingPkg.title, id: matchingPkg.id, desc: `${matchingPkg.sessionsCount} sesiones · ${matchingPkg.savingsDisplay}` },
    ],
  };
}

export default function Recomendador() {
  const [step, setStep] = useState(1);
  const [objective, setObjective] = useState<Objective | null>(null);
  const [pref, setPref] = useState("");
  const [intensity, setIntensity] = useState("");

  const showResult = step === 4 && objective;
  const result = showResult ? getRecommendation(objective!, pref, intensity) : null;

  return (
    <Layout showStickyCTA={false}>
      <div className="container py-8 max-w-lg">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground">Recomendador rápido</h1>
          <p className="text-muted-foreground text-sm mt-1">3 preguntas · 30 segundos</p>
        </div>

        {/* Progress */}
        <div className="flex gap-1 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className={`flex-1 h-1 rounded-full transition-colors ${s < step || showResult ? "bg-primary" : s === step ? "bg-primary/50" : "bg-border"}`} />
          ))}
        </div>

        {step === 1 && (
          <div>
            <h2 className="font-display font-semibold text-lg text-foreground mb-4">¿Cuál es tu objetivo principal?</h2>
            <div className="grid grid-cols-1 gap-3">
              {objectives.map(o => (
                <button key={o.key} onClick={() => { setObjective(o.key); setStep(2); }} className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all hover:border-primary/30 ${objective === o.key ? "border-primary bg-primary/5" : "border-border"}`}>
                  <span className="text-2xl">{o.icon}</span>
                  <span className="font-medium text-foreground">{o.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="font-display font-semibold text-lg text-foreground mb-4">¿Qué prefieres?</h2>
            <div className="grid grid-cols-1 gap-3">
              {preferences.map(p => (
                <button key={p.key} onClick={() => { setPref(p.key); setStep(3); }} className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all hover:border-primary/30 ${pref === p.key ? "border-primary bg-primary/5" : "border-border"}`}>
                  <span className="text-2xl">{p.icon}</span>
                  <span className="font-medium text-foreground">{p.label}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="text-sm text-muted-foreground mt-4">← Volver</button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="font-display font-semibold text-lg text-foreground mb-4">¿Qué sensación buscas?</h2>
            <div className="grid grid-cols-1 gap-3">
              {intensities.map(i => (
                <button key={i.key} onClick={() => { setIntensity(i.key); setStep(4); }} className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all hover:border-primary/30 ${intensity === i.key ? "border-primary bg-primary/5" : "border-border"}`}>
                  <span className="text-2xl">{i.icon}</span>
                  <span className="font-medium text-foreground">{i.label}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="text-sm text-muted-foreground mt-4">← Volver</button>
          </div>
        )}

        {showResult && result && (
          <div className="animate-fade-in">
            <h2 className="font-display font-semibold text-lg text-foreground mb-4">Tu recomendación</h2>
            <div className="bg-gradient-to-br from-primary/10 to-secondary rounded-2xl p-6 border border-primary/20 mb-4">
              <Chip variant="primary" className="mb-2">Recomendado para ti</Chip>
              <h3 className="font-display font-bold text-xl text-foreground">{result.primary.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{result.primary.desc}</p>
              <Link to={`/reservar?type=${result.primary.type}&id=${result.primary.id}`} className="mt-4 flex items-center justify-center gap-2 h-12 rounded-full bg-primary text-primary-foreground font-display font-semibold shadow-glow">
                Solicitar cita <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-sm font-medium text-foreground mb-3">También podría interesarte:</p>
            {result.alternatives.map((alt, i) => (
              <Link key={i} to={`/reservar?type=${alt.type}&id=${alt.id}`} className="block p-4 rounded-xl border border-border hover:border-primary/30 transition-all mb-2">
                <p className="font-medium text-foreground">{alt.name}</p>
                <p className="text-sm text-muted-foreground">{alt.desc}</p>
              </Link>
            ))}
            <button onClick={() => { setStep(1); setObjective(null); setPref(""); setIntensity(""); }} className="text-sm text-primary font-medium mt-4">Hacer el test de nuevo</button>
          </div>
        )}
      </div>
    </Layout>
  );
}
