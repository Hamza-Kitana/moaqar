import { ChevronLeft, ChevronRight, ImageIcon, X, ZoomIn } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function ComplaintPhotoGallery({ images }: { images: string[] }) {
  const { t, dir } = useI18n();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const Prev = dir === "rtl" ? ChevronRight : ChevronLeft;
  const Next = dir === "rtl" ? ChevronLeft : ChevronRight;

  if (images.length === 0) return null;

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setIndex((i) => (i + 1) % images.length);

  return (
    <>
      <div className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
        <p className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
          <ImageIcon className="size-3.5 text-primary" />
          {t("photos")} ({images.length})
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {images.map((src, i) => (
            <button
              key={`${src.slice(0, 32)}-${i}`}
              type="button"
              onClick={() => openAt(i)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border/70 bg-secondary/30 touch-manipulation"
            >
              <img src={src} alt="" className="size-full object-cover transition-transform group-hover:scale-105" />
              <span className="absolute inset-0 flex items-center justify-center bg-primary/0 transition-colors group-hover:bg-primary/20">
                <ZoomIn className="size-5 text-white opacity-0 drop-shadow transition-opacity group-hover:opacity-100" />
              </span>
            </button>
          ))}
        </div>
        <p className="mt-2 text-[10px] text-muted-foreground">{t("tapToViewPhoto")}</p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex max-h-[95dvh] max-w-4xl flex-col gap-0 overflow-hidden border-none bg-black/95 p-0 text-white sm:rounded-2xl">
          <DialogTitle className="sr-only">{t("photos")}</DialogTitle>
          <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2.5 sm:px-4">
            <p className="text-sm font-medium">
              {t("photoViewer")} {index + 1}/{images.length}
            </p>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 hover:text-white"
              onClick={() => setOpen(false)}
              aria-label={t("close")}
            >
              <X className="size-4" />
            </Button>
          </div>
          <div className="relative flex min-h-[50dvh] flex-1 items-center justify-center p-3 sm:p-6">
            {images.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="iconLg"
                className="absolute start-2 top-1/2 z-10 -translate-y-1/2 bg-black/40 text-white hover:bg-black/60 hover:text-white sm:start-4"
                onClick={goPrev}
                aria-label={t("prevPhoto")}
              >
                <Prev className="size-5" />
              </Button>
            )}
            <img
              src={images[index]}
              alt=""
              className="max-h-[75dvh] max-w-full rounded-lg object-contain"
            />
            {images.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="iconLg"
                className="absolute end-2 top-1/2 z-10 -translate-y-1/2 bg-black/40 text-white hover:bg-black/60 hover:text-white sm:end-4"
                onClick={goNext}
                aria-label={t("nextPhoto")}
              >
                <Next className="size-5" />
              </Button>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto border-t border-white/10 p-3 sm:p-4">
              {images.map((src, i) => (
                <button
                  key={`thumb-${i}`}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={cn(
                    "size-14 shrink-0 overflow-hidden rounded-lg border-2 touch-manipulation",
                    i === index ? "border-gold" : "border-transparent opacity-70 hover:opacity-100",
                  )}
                >
                  <img src={src} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
