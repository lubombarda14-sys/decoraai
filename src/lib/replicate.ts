import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export interface RenderRequest {
  imageUrl: string;
  prompt: string;
  mode: "redesign" | "fill-empty";
  strength?: number;
}

export interface RenderResult {
  modelName: string;
  imageUrl: string;
  duration: number;
}

async function runModel(
  modelId: string,
  modelName: string,
  input: Record<string, unknown>
): Promise<RenderResult | null> {
  const start = Date.now();
  try {
    const output = await replicate.run(modelId as `${string}/${string}`, {
      input,
    });
    const duration = Date.now() - start;

    let imageUrl: string | null = null;

    if (typeof output === "string") {
      imageUrl = output;
    } else if (Array.isArray(output) && output.length > 0) {
      const first = output[0];
      if (typeof first === "string") {
        imageUrl = first;
      } else if (first && typeof first === "object" && "url" in first) {
        imageUrl = (first as { url: string }).url;
      }
    } else if (output && typeof output === "object" && "url" in output) {
      imageUrl = (output as { url: string }).url;
    }

    if (!imageUrl) {
      console.error(`Model ${modelName} returned unexpected output:`, output);
      return null;
    }

    return { modelName, imageUrl, duration };
  } catch (error) {
    console.error(`Model ${modelName} failed:`, error);
    return null;
  }
}

export async function generateRenders(
  request: RenderRequest
): Promise<RenderResult[]> {
  const { imageUrl, prompt, mode, strength = 0.65 } = request;

  const fullPrompt = `${prompt}, professional interior photography, 8k uhd, high quality, photorealistic, well-lit`;

  const models: Array<{
    id: string;
    name: string;
    input: Record<string, unknown>;
  }> = [];

  if (mode === "fill-empty") {
    // For empty rooms, use the specialized model + general models
    models.push({
      id: "melgor/stabledesign_interiordesign",
      name: "StableDesign (Especialista em vazios)",
      input: {
        image: imageUrl,
        prompt: fullPrompt,
      },
    });
    models.push({
      id: "adirik/interior-design",
      name: "Interior Design Classic",
      input: {
        image: imageUrl,
        prompt: fullPrompt,
        prompt_strength: 0.75,
      },
    });
    models.push({
      id: "rocketdigitalai/interior-design-sdxl-lightning",
      name: "SDXL Lightning (Rapido)",
      input: {
        image: imageUrl,
        prompt: fullPrompt,
      },
    });
  } else {
    // Redesign mode — use all general models
    models.push({
      id: "adirik/interior-design",
      name: "Interior Design Classic",
      input: {
        image: imageUrl,
        prompt: fullPrompt,
        prompt_strength: strength,
      },
    });
    models.push({
      id: "rocketdigitalai/interior-design-sdxl-lightning",
      name: "SDXL Lightning (Rapido)",
      input: {
        image: imageUrl,
        prompt: fullPrompt,
      },
    });
    models.push({
      id: "remodela-ai/style-transfer-ii",
      name: "Style Transfer v2",
      input: {
        image: imageUrl,
        prompt: fullPrompt,
      },
    });
  }

  // Run all models in parallel
  const results = await Promise.allSettled(
    models.map((m) => runModel(m.id, m.name, m.input))
  );

  return results
    .map((r) => (r.status === "fulfilled" ? r.value : null))
    .filter((r): r is RenderResult => r !== null);
}
