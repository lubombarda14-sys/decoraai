"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, ImageIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onImageSelected: (file: File, previewUrl: string) => void;
  previewUrl: string | null;
  onClear: () => void;
}

export function ImageUpload({
  onImageSelected,
  previewUrl,
  onClear,
}: ImageUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const url = URL.createObjectURL(file);
        onImageSelected(file, url);
      }
      setIsDragActive(false);
    },
    [onImageSelected]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  if (previewUrl) {
    return (
      <div className="relative group">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted">
          <Image
            src={previewUrl}
            alt="Foto do comodo"
            fill
            className="object-cover"
          />
        </div>
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`
        relative flex flex-col items-center justify-center gap-4 p-12
        border-2 border-dashed rounded-xl cursor-pointer
        transition-all duration-200
        ${
          isDragActive
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border hover:border-primary/50 hover:bg-muted/50"
        }
      `}
    >
      <input {...getInputProps()} />
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        {isDragActive ? (
          <ImageIcon className="h-8 w-8 text-primary" />
        ) : (
          <Upload className="h-8 w-8 text-muted-foreground" />
        )}
      </div>
      <div className="text-center">
        <p className="text-lg font-medium">
          {isDragActive ? "Solte a foto aqui" : "Arraste uma foto do comodo"}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          ou clique para selecionar (JPG, PNG, WebP - max 10MB)
        </p>
      </div>
    </div>
  );
}
