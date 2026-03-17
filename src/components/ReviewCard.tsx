import { Star } from "lucide-react";
import { Review } from "@/types";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-card rounded-2xl border border-border p-5">
      <div className="flex items-center gap-1 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-warning text-warning" : "text-border"}`} />
        ))}
      </div>
      <p className="text-sm text-foreground leading-relaxed">"{review.text}"</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{review.displayName}</span>
        {review.service && <span className="text-xs text-muted-foreground">{review.service}</span>}
      </div>
    </div>
  );
}
