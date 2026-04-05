export const ROOM_TYPES = [
  { id: "living-room", label: "Sala de Estar", icon: "sofa" },
  { id: "bedroom", label: "Quarto", icon: "bed" },
  { id: "kitchen", label: "Cozinha", icon: "cooking-pot" },
  { id: "bathroom", label: "Banheiro", icon: "bath" },
  { id: "office", label: "Escritorio", icon: "monitor" },
  { id: "dining-room", label: "Sala de Jantar", icon: "utensils" },
  { id: "balcony", label: "Varanda", icon: "sun" },
  { id: "kids-room", label: "Quarto Infantil", icon: "baby" },
] as const;

export const DESIGN_STYLES = [
  {
    id: "modern",
    label: "Moderno",
    prompt: "modern interior design, clean lines, neutral colors, contemporary furniture, minimalist decor, warm lighting",
    image: "/styles/modern.jpg",
  },
  {
    id: "minimalist",
    label: "Minimalista",
    prompt: "minimalist interior design, very clean, white walls, simple furniture, lots of natural light, zen atmosphere",
    image: "/styles/minimalist.jpg",
  },
  {
    id: "industrial",
    label: "Industrial",
    prompt: "industrial interior design, exposed brick walls, metal fixtures, concrete floors, Edison bulbs, raw materials",
    image: "/styles/industrial.jpg",
  },
  {
    id: "scandinavian",
    label: "Escandinavo",
    prompt: "scandinavian interior design, light wood, white and gray palette, cozy textiles, hygge atmosphere, natural materials",
    image: "/styles/scandinavian.jpg",
  },
  {
    id: "bohemian",
    label: "Boho",
    prompt: "bohemian interior design, colorful textiles, plants, macrame, eclectic furniture, warm earthy tones, layered rugs",
    image: "/styles/bohemian.jpg",
  },
  {
    id: "rustic",
    label: "Rustico",
    prompt: "rustic interior design, natural wood, stone elements, warm colors, farmhouse style, cozy and inviting",
    image: "/styles/rustic.jpg",
  },
  {
    id: "luxury",
    label: "Luxo",
    prompt: "luxury interior design, premium materials, marble, gold accents, velvet furniture, crystal chandelier, elegant and opulent",
    image: "/styles/luxury.jpg",
  },
  {
    id: "japandi",
    label: "Japandi",
    prompt: "japandi interior design, japanese minimalism meets scandinavian, natural materials, wabi-sabi, muted earth tones, simple elegance",
    image: "/styles/japandi.jpg",
  },
  {
    id: "tropical",
    label: "Tropical",
    prompt: "tropical interior design, lush green plants, rattan furniture, palm leaf patterns, bright and airy, resort style",
    image: "/styles/tropical.jpg",
  },
  {
    id: "neoclassical",
    label: "Neoclassico",
    prompt: "neoclassical interior design, elegant moldings, symmetry, classic furniture, soft palette, refined and timeless",
    image: "/styles/neoclassical.jpg",
  },
] as const;

export const TRANSFORM_MODES = [
  {
    id: "redesign",
    label: "Redesign",
    description: "Transforma o estilo mantendo a estrutura",
  },
  {
    id: "fill-empty",
    label: "Mobiliar Vazio",
    description: "Preenche um comodo vazio com moveis",
  },
] as const;

export type RoomType = (typeof ROOM_TYPES)[number]["id"];
export type DesignStyle = (typeof DESIGN_STYLES)[number]["id"];
export type TransformMode = (typeof TRANSFORM_MODES)[number]["id"];
