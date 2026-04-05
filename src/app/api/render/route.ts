import { NextRequest, NextResponse } from "next/server";
import { generateRenders } from "@/lib/replicate";

export const maxDuration = 300;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const prompt = formData.get("prompt") as string;
    const mode = (formData.get("mode") as string) || "redesign";
    const strength = parseFloat((formData.get("strength") as string) || "0.65");

    console.log("Render request:", { hasFile: !!file, prompt, mode, strength });

    if (!file || !prompt) {
      return NextResponse.json(
        { error: "file e prompt sao obrigatorios" },
        { status: 400 }
      );
    }

    // Convert file to data URL for Replicate
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const mimeType = file.type || "image/jpeg";
    const imageUrl = `data:${mimeType};base64,${base64}`;

    const results = await generateRenders({
      imageUrl,
      prompt,
      mode: mode as "redesign" | "fill-empty",
      strength,
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
