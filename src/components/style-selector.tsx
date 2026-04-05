"use client";

import { DESIGN_STYLES } from "@/lib/styles";
import type { DesignStyle } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StyleSelectorProps {
  selected: DesignStyle | null;
  onSelect: (style: DesignStyle) => void;
}

const STYLE_COLORS: Record<string, string> = {
  modern: "from-zinc-600 to-zinc-800",
  minimalist: "from-gray-100 to-gray-300",
  industrial: "from-amber-700 to-stone-700",
  scandinavian: "from-amber-100 to-sky-100",
  bohemian: "from-orange-400 to-pink-500",
  rustic: "from-amber-600 to-yellow-800",
  luxury: "from-yellow-400 to-amber-600",
  japandi: "from-stone-300 to-emerald-200",
  tropical: "from-green-400 to-teal-500",
  neoclassical: "from-stone-200 to-amber-100",
};

export function StyleSelector({ selected, onSelect }: StyleSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {DESIGN_STYLES.map((style) => (
        <button
          key={style.id}
          onClick={() => onSelect(style.id)}
          className={cn(
            "relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
            selected === style.id
              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
              : "border-border hover:border-primary/30 hover:bg-muted/50"
          )}
        >
          <div
            className={cn(
              "w-12 h-12 rounded-lg bg-gradient-to-br",
              STYLE_COLORS[style.id] || "from-gray-400 to-gray-600"
            )}
          />
          <span className="text-sm font-medium">{style.label}</span>
          {selected === style.id && (
            <div className="absolute top-2 right-2">
              <Check className="h-4 w-4 text-primary" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
