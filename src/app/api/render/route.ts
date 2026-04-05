import { NextRequest, NextResponse } from "next/server";
import { generateRenders } from "@/lib/replicate";

export const maxDuration = 300;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, prompt, mode, strength } = body;

    console.log("Render request:", { imageUrl: imageUrl?.substring(0, 80), prompt, mode, strength });

    if (!imageUrl || !prompt) {
      return NextResponse.json(
        { error: "imageUrl e prompt sao obrigatorios" },
        { status: 400 }
      );
    }

    const results = await generateRenders({
      imageUrl,
      prompt,
      mode: mode || "redesign",
      strength: strength || 0.65,
    });

    console.log("Render results:", results.length, "models succeeded");

    if (results.length === 0) {
      return NextResponse.json(
        { error: "Nenhum modelo conseguiu gerar o render. Tente novamente." },
        { status: 500 }
      );
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Render API error:", error);
    const message = error instanceof Error ? error.message : "Erro interno ao gerar render";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
