import { useRef, useState, useCallback } from "react";

interface BeforeAfterSliderProps {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function BeforeAfterSlider({ beforeUrl, afterUrl, beforeLabel = "Antes", afterLabel = "Después", className }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragging) updatePosition(e.clientX);
  };

  const handlePointerUp = () => setDragging(false);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl select-none touch-none cursor-col-resize ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <img src={afterUrl} alt={afterLabel} className="w-full h-full object-cover" draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={beforeUrl} alt={beforeLabel} className="w-full h-full object-cover" draggable={false} />
      </div>
      <div className="absolute top-0 bottom-0" style={{ left: `${position}%`, transform: "translateX(-50%)" }}>
        <div className="h-full w-0.5 bg-primary-foreground shadow-lg" />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary-foreground shadow-elevated flex items-center justify-center">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-3 bg-primary rounded-full" />
            <div className="w-0.5 h-3 bg-primary rounded-full" />
          </div>
        </div>
      </div>
      <span className="absolute bottom-3 left-3 px-2 py-1 rounded-full bg-foreground/70 text-background text-xs font-medium">{beforeLabel}</span>
      <span className="absolute bottom-3 right-3 px-2 py-1 rounded-full bg-foreground/70 text-background text-xs font-medium">{afterLabel}</span>
    </div>
  );
}
