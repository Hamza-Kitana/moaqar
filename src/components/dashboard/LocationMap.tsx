import { MapPin } from "lucide-react";

import { cn } from "@/lib/utils";

type LocationMapProps = {
  lat: number;
  lng: number;
  title?: string;
  subtitle?: string;
  mapLabel: string;
  approximate?: boolean;
  approximateLabel?: string;
  className?: string;
  mapClassName?: string;
};

/** Embedded map (Google Maps embed + OSM fallback link) — no API key required */
export function LocationMap({
  lat,
  lng,
  title,
  subtitle,
  mapLabel,
  approximate,
  approximateLabel,
  className,
  mapClassName,
}: LocationMapProps) {
  const embedSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=15&hl=ar&output=embed`;
  const openUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <div className={cn("overflow-hidden rounded-xl border border-border/70 bg-card", className)}>
      {(title || subtitle) && (
        <div className="border-b border-border/60 bg-secondary/40 px-3 py-2.5">
          {title && <p className="text-xs font-semibold">{title}</p>}
          {subtitle && <p className="mt-0.5 text-sm font-medium text-foreground/90">{subtitle}</p>}
          <p className="mt-1 flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
            <MapPin className="size-3 shrink-0" />
            {lat.toFixed(5)}, {lng.toFixed(5)}
            {approximate && approximateLabel ? ` · ${approximateLabel}` : ""}
          </p>
        </div>
      )}
      <div className={cn("relative aspect-[16/10] w-full bg-secondary/30", mapClassName)}>
        <iframe
          title={title ?? mapLabel}
          src={embedSrc}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="border-t border-border/60 px-3 py-2">
        <a
          href={openUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium text-primary hover:underline"
        >
          {mapLabel}
        </a>
      </div>
    </div>
  );
}
