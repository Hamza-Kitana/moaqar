import { formatDate, formatDateTime } from "@/lib/format";
import { useI18n } from "@/lib/i18n";
import type { TimelineEntry } from "@/lib/store";

export function ComplaintTimeline({ entries }: { entries: TimelineEntry[] }) {
  const { t, lang } = useI18n();

  return (
    <div>
      <p className="mb-3 text-sm font-semibold">{t("timeline")}</p>
      <ol className="space-y-0">
        {entries.map((entry, i) => (
          <li key={i} className="relative flex gap-3 pb-4 last:pb-0">
            <div className="flex flex-col items-center">
              <span className="mt-1 size-2.5 shrink-0 rounded-full bg-primary ring-4 ring-primary/15" />
              {i < entries.length - 1 && <span className="mt-1 w-px flex-1 bg-border" />}
            </div>
            <div className="min-w-0 pb-1">
              <p className="text-xs font-medium leading-relaxed">{lang === "ar" ? entry.textAr : entry.textEn}</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                {entry.by} · {formatDateTime(entry.at, lang)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
