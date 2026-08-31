import { ImagePlus, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";

import { compressImageFile } from "@/lib/image-utils";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  onChange: (images: string[]) => void;
  label?: string;
  hint?: string;
};

export function ImageUpload({ images, onChange, label, hint }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const addFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setLoading(true);
    try {
      const compressed: string[] = [];
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;
        try {
          compressed.push(await compressImageFile(file));
        } catch {
          /* skip unreadable files */
        }
      }
      if (compressed.length) onChange([...images, ...compressed]);
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium">{label}</p>}
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && !loading && inputRef.current?.click()}
        onClick={() => !loading && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          void addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "surface flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-8 transition-colors",
          loading && "pointer-events-none opacity-70",
          dragging ? "border-primary bg-primary/5" : "border-border/70 hover:border-primary/40",
        )}
      >
        <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
          {loading ? <Loader2 className="size-6 animate-spin" /> : <ImagePlus className="size-6" />}
        </span>
        {hint && <p className="mt-3 text-center text-xs text-muted-foreground">{hint}</p>}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => void addFiles(e.target.files)}
        />
      </div>
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {images.map((src, i) => (
            <div key={i} className="group relative">
              <img src={src} alt="" className="size-20 rounded-xl border border-border object-cover" />
              <button
                type="button"
                onClick={() => onChange(images.filter((_, j) => j !== i))}
                className="touch-target absolute -end-1.5 -top-1.5 grid size-7 place-items-center rounded-full bg-destructive text-destructive-foreground opacity-100 shadow-sm sm:opacity-0 sm:group-hover:opacity-100"
                aria-label="Remove"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
