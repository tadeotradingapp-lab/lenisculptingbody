import { Share2, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
  className?: string;
}

export function ShareButton({ title, text, url, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const fullUrl = window.location.origin + url;

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: fullUrl });
      } catch {}
    } else {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`w-8 h-8 flex items-center justify-center rounded-full bg-background/80 backdrop-blur text-muted-foreground hover:text-primary transition-colors ${className}`}
      aria-label="Compartir"
    >
      {copied ? <Check className="w-4 h-4 text-success" /> : <Share2 className="w-4 h-4" />}
    </button>
  );
}
