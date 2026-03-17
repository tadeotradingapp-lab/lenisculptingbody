import { Layout } from "@/components/layout/Layout";
import { ReviewCard } from "@/components/ReviewCard";
import { reviews } from "@/data/reviews";
import { Star } from "lucide-react";

export default function Resenas() {
  const avg = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <Layout>
      <div className="container py-6 max-w-2xl">
        <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">Reseñas</h1>
        <div className="flex items-center gap-3 mt-4 mb-6">
          <span className="font-display font-bold text-4xl text-foreground">{avg}</span>
          <div>
            <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-warning text-warning" />)}</div>
            <p className="text-sm text-muted-foreground">{reviews.length} reseñas</p>
          </div>
        </div>
        <div className="space-y-4">
          {reviews.map(r => <ReviewCard key={r.id} review={r} />)}
        </div>
        <div className="mt-8 text-center">
          <button className="inline-flex items-center gap-2 h-11 px-6 rounded-full border-2 border-primary text-primary font-display font-semibold">
            Dejar una reseña
          </button>
          <p className="text-xs text-muted-foreground mt-2">Tu reseña ayuda a otras personas.</p>
        </div>
      </div>
    </Layout>
  );
}
