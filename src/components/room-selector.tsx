"use client";

import { ROOM_TYPES } from "@/lib/styles";
import type { RoomType } from "@/lib/styles";
import { cn } from "@/lib/utils";
import {
  Sofa,
  Bed,
  CookingPot,
  Bath,
  Monitor,
  Utensils,
  Sun,
  Baby,
} from "lucide-react";

const ROOM_ICONS: Record<string, React.ElementType> = {
  sofa: Sofa,
  bed: Bed,
  "cooking-pot": CookingPot,
  bath: Bath,
  monitor: Monitor,
  utensils: Utensils,
  sun: Sun,
  baby: Baby,
};

interface RoomSelectorProps {
  selected: RoomType | null;
  onSelect: (room: RoomType) => void;
}

export function RoomSelector({ selected, onSelect }: RoomSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {ROOM_TYPES.map((room) => {
        const Icon = ROOM_ICONS[room.icon] || Sofa;
        return (
          <button
            key={room.id}
            onClick={() => onSelect(room.id)}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200",
              selected === room.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/30 hover:bg-muted/50"
            )}
          >
            <Icon className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">{room.label}</span>
          </button>
        );
      })}
    </div>
  );
}
