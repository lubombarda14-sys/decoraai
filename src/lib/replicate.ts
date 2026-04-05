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
    const output = await replicate.run(
      modelId as `${string}/${string}:${string}`,
      { input }
    );
    const duration = Date.now() - start;

    // Extract URL from various output formats
    const imageUrl = extractUrl(output);

    if (!imageUrl) {
      console.error(`Model ${modelName} returned unexpected output:`, typeof output, output);
      return null;
    }

    console.log(`Model ${modelName} succeeded in ${duration}ms: ${imageUrl.substring(0, 80)}`);
    return { modelName, imageUrl, duration };
  } catch (error) {
    console.error(`Model ${modelName} failed:`, error);
    return null;
  }
}

function extractUrl(output: unknown): string | null {
  // FileOutput - has toString() that returns URL
  if (output && typeof output === "object" && "url" in output) {
    return String(output);
  }
  // Plain string URL
  if (typeof output === "string") {
    return output;
  }
  // Array of FileOutput or strings
  if (Array.isArray(output) && output.length > 0) {
    return extractUrl(output[0]);
  }
  return null;
}

// Models with explicit version IDs (required for community models)
const MODELS = {
  "interior-design": {
    id: "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
    name: "Interior Design Classic",
  },
  "sdxl-lightning": {
    id: "rocketdigitalai/interior-design-sdxl-lightning:5d8da4e5c98fea03dcfbe3ec89e40cf0f4a0074a8930fa02aa0ee2aaf98c3d11",
    name: "SDXL Lightning (Rapido)",
  },
  "style-transfer": {
    id: "remodela-ai/style-transfer-ii:dd55311b5b866a46c5473e8fb71bcc38d58d651682c51940f45c1b78525cab30",
    name: "Style Transfer v2",
  },
} as const;

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
    models.push({
      id: MODELS["interior-design"].id,
      name: MODELS["interior-design"].name,
      input: {
        image: imageUrl,
        prompt: fullPrompt,
        prompt_strength: 0.75,
      },
    });
    models.push({
      id: MODELS["sdxl-lightning"].id,
      name: MODELS["sdxl-lightning"].name,
      input: {
        image: imageUrl,
        prompt: fullPrompt,
      },
    });
  } else {
    models.push({
      id: MODELS["interior-design"].id,
      name: MODELS["interior-design"].name,
      input: {
        image: imageUrl,
        prompt: fullPrompt,
        prompt_strength: strength,
      },
    });
    models.push({
      id: MODELS["sdxl-lightning"].id,
      name: MODELS["sdxl-lightning"].name,
      input: {
        image: imageUrl,
        prompt: fullPrompt,
      },
    });
    models.push({
      id: MODELS["style-transfer"].id,
      name: MODELS["style-transfer"].name,
      input: {
        image: imageUrl,
        prompt: fullPrompt,
      },
    });
  }

  // Run models sequentially to avoid rate limiting on new accounts
  const results: RenderResult[] = [];
  for (let i = 0; i < models.length; i++) {
    const m = models[i];
    const result = await runModel(m.id, m.name, m.input);
    if (result) results.push(result);
    if (i < models.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  return results;
}
