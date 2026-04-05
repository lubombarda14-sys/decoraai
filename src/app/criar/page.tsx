"use client";

import { useState } from "react";
import Link from "next/link";
import { ImageUpload } from "@/components/image-upload";
import { StyleSelector } from "@/components/style-selector";
import { RoomSelector } from "@/components/room-selector";
import { ModeSelector } from "@/components/mode-selector";
import { ResultViewer } from "@/components/result-viewer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Sparkles, Loader2, Wand2, ArrowLeft } from "lucide-react";
import { DESIGN_STYLES, ROOM_TYPES } from "@/lib/styles";
import type { DesignStyle, RoomType, TransformMode } from "@/lib/styles";

interface RenderResult {
  modelName: string;
  imageUrl: string;
  duration: number;
}

export default function CriarPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [style, setStyle] = useState<DesignStyle | null>(null);
  const [room, setRoom] = useState<RoomType | null>(null);
  const [mode, setMode] = useState<TransformMode>("redesign");
  const [strength, setStrength] = useState(65);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [results, setResults] = useState<RenderResult[]>([]);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const canGenerate = file && style && room && !loading;

  const handleGenerate = async () => {
    if (!file || !style || !room) return;

    setLoading(true);
    setResults([]);
    setProgress("Enviando imagem...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        throw new Error(uploadData.error || "Erro no upload");
      }

      setUploadedUrl(uploadData.url);

      const styleConfig = DESIGN_STYLES.find((s) => s.id === style);
      const roomConfig = ROOM_TYPES.find((r) => r.id === room);
      const prompt = `${styleConfig?.prompt || style}, ${roomConfig?.label.toLowerCase() || room}`;

      setProgress("Gerando renders com 3 modelos de IA (pode levar ate 60s)...");

      const renderRes = await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: uploadData.url,
          prompt,
          mode,
          strength: strength / 100,
        }),
      });
      const renderData = await renderRes.json();

      if (!renderRes.ok) {
        throw new Error(renderData.error || "Erro ao gerar render");
      }

      setResults(renderData.results);
    } catch (error) {
      console.error(error);
      setProgress(
        `Erro: ${error instanceof Error ? error.message : "Tente novamente"}`
      );
      setTimeout(() => setProgress(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults([]);
    setUploadedUrl(null);
  };

  const handleFullReset = () => {
    setFile(null);
    setPreviewUrl(null);
    setStyle(null);
    setRoom(null);
    setMode("redesign");
    setStrength(65);
    setResults([]);
    setUploadedUrl(null);
    setProgress("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
            <div className="flex items-center gap-2">
              <Wand2 className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold tracking-tight">DecorAI</h1>
            </div>
          </div>
          <p className="text-sm text-muted-foreground hidden sm:block">
            Transforme seu ambiente com IA
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        {results.length > 0 && previewUrl ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Resultado</h2>
                <p className="text-muted-foreground">
                  {results.length} variacao{results.length > 1 ? "es" : ""}{" "}
                  gerada{results.length > 1 ? "s" : ""} - arraste para comparar
                </p>
              </div>
              <Button variant="outline" onClick={handleFullReset}>
                Nova transformacao
              </Button>
            </div>
            <ResultViewer
              originalUrl={previewUrl}
              results={results}
              onTryAgain={handleReset}
            />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center space-y-3 py-4">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Transforme qualquer comodo em{" "}
                <span className="text-primary">30 segundos</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Faca upload de uma foto, escolha o estilo e veja como seu
                ambiente ficaria decorado por um profissional
              </p>
            </div>

            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  1
                </span>
                <h3 className="text-lg font-semibold">Foto do comodo</h3>
              </div>
              <ImageUpload
                onImageSelected={(f, url) => {
                  setFile(f);
                  setPreviewUrl(url);
                }}
                previewUrl={previewUrl}
                onClear={() => {
                  setFile(null);
                  setPreviewUrl(null);
                }}
              />
            </section>

            <Separator />

            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  2
                </span>
                <h3 className="text-lg font-semibold">Tipo de comodo</h3>
              </div>
              <RoomSelector selected={room} onSelect={setRoom} />
            </section>

            <Separator />

            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  3
                </span>
                <h3 className="text-lg font-semibold">Modo</h3>
              </div>
              <ModeSelector selected={mode} onSelect={setMode} />
            </section>

            <Separator />

            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  4
                </span>
                <h3 className="text-lg font-semibold">Estilo desejado</h3>
              </div>
              <StyleSelector selected={style} onSelect={setStyle} />
            </section>

            <Separator />

            {mode === "redesign" && (
              <>
                <section className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      5
                    </span>
                    <h3 className="text-lg font-semibold">
                      Intensidade da transformacao
                    </h3>
                  </div>
                  <div className="max-w-md space-y-3">
                    <Slider
                      value={[strength]}
                      onValueChange={(v) => setStrength(Array.isArray(v) ? v[0] : v)}
                      min={20}
                      max={90}
                      step={5}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Sutil</span>
                      <span className="font-mono text-foreground">
                        {strength}%
                      </span>
                      <span>Radical</span>
                    </div>
                  </div>
                </section>
                <Separator />
              </>
            )}

            <div className="flex flex-col items-center gap-4 pt-4">
              <Button
                size="lg"
                className="w-full max-w-md h-14 text-lg font-semibold"
                disabled={!canGenerate}
                onClick={handleGenerate}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Transformar com IA
                  </>
                )}
              </Button>
              {loading && progress && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {progress}
                </div>
              )}
              {!canGenerate && !loading && (
                <p className="text-sm text-muted-foreground">
                  {!file
                    ? "Faca upload de uma foto para comecar"
                    : !room
                      ? "Selecione o tipo de comodo"
                      : !style
                        ? "Escolha um estilo"
                        : ""}
                </p>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-muted-foreground">
          DecorAI - Powered by AI
        </div>
      </footer>
    </div>
  );
}
