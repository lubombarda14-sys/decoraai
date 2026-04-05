"use client";

import { TRANSFORM_MODES } from "@/lib/styles";
import type { TransformMode } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { Paintbrush, Package } from "lucide-react";

const MODE_ICONS: Record<string, React.ElementType> = {
  redesign: Paintbrush,
  "fill-empty": Package,
};

interface ModeSelectorProps {
  selected: TransformMode;
  onSelect: (mode: TransformMode) => void;
}

export function ModeSelector({ selected, onSelect }: ModeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {TRANSFORM_MODES.map((mode) => {
        const Icon = MODE_ICONS[mode.id] || Paintbrush;
        return (
          <button
            key={mode.id}
            onClick={() => onSelect(mode.id)}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
              selected === mode.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/30 hover:bg-muted/50"
            )}
          >
            <Icon className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm font-semibold">{mode.label}</span>
            <span className="text-xs text-muted-foreground text-center">
              {mode.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
