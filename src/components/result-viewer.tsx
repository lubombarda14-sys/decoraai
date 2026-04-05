"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

interface RenderResult {
  modelName: string;
  imageUrl: string;
  duration: number;
}

interface ResultViewerProps {
  originalUrl: string;
  results: RenderResult[];
  onTryAgain: () => void;
}

export function ResultViewer({
  originalUrl,
  results,
  onTryAgain,
}: ResultViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showOriginal, setShowOriginal] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const activeResult = results[activeIndex];

  const handleSliderMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging && e.type === "mousemove") return;
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handleDownload = async () => {
    if (!activeResult) return;
    try {
      const response = await fetch(activeResult.imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `decoraai-${activeResult.modelName.replace(/\s+/g, "-")}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(activeResult.imageUrl, "_blank");
    }
  };

  if (!activeResult) return null;

  return (
    <div className="space-y-6">
      {/* Comparison slider */}
      <div
        className="relative aspect-video w-full overflow-hidden rounded-xl border border-border cursor-col-resize select-none"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleSliderMove}
        onTouchMove={handleSliderMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* Result image (full) */}
        <Image
          src={activeResult.imageUrl}
          alt="Resultado"
          fill
          className="object-cover"
          unoptimized
        />

        {/* Original image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <Image
            src={originalUrl}
            alt="Original"
            fill
            className="object-cover"
            style={{ minWidth: "100%", width: "auto" }}
          />
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg">
            <ChevronLeft className="h-4 w-4 text-zinc-700 -mr-1" />
            <ChevronRight className="h-4 w-4 text-zinc-700 -ml-1" />
          </div>
        </div>

        {/* Labels */}
        <Badge className="absolute top-3 left-3 z-20" variant="secondary">
          Original
        </Badge>
        <Badge className="absolute top-3 right-3 z-20" variant="secondary">
          DecorAI
        </Badge>
      </div>

      {/* Model results tabs */}
      {results.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {results.map((result, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`
                relative flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden border-2 transition-all
                ${
                  index === activeIndex
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/30"
                }
              `}
            >
              <Image
                src={result.imageUrl}
                alt={result.modelName}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/70 px-2 py-1">
                <p className="text-[10px] text-white truncate">
                  {result.modelName}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Info + Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge variant="outline">
            {activeResult.modelName}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {(activeResult.duration / 1000).toFixed(1)}s
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onTryAgain}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Novo render
          </Button>
          <Button size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Baixar
          </Button>
        </div>
      </div>
    </div>
  );
}
