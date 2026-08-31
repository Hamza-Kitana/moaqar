import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { LocationMap } from "@/components/dashboard/LocationMap";
import { ImageUpload } from "@/components/site/ImageUpload";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";
import { BRANCH_COORDS, GUEST_COMPLAINANT_ID, useStore } from "@/lib/store";

export const Route = createFileRoute("/complaint")({
  head: () => ({
    meta: [
      { title: "تقديم شكوى | شركة الموقر التجارية" },
      { name: "description", content: "تقديم شكوى جديدة لمكتبتك عبر منصة الموقر التجارية." },
    ],
  }),
  component: ComplaintPage,
});

function ComplaintPage() {
  const { t, lang } = useI18n();
  const { state, addComplaint } = useStore();

  const [complainantName, setComplainantName] = useState("");
  const [complainantPhone, setComplainantPhone] = useState("");
  const [branchId, setBranchId] = useState("");
  const [libraryId, setLibraryId] = useState("");
  const [locationText, setLocationText] = useState("");
  const [notes, setNotes] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const branchLibraries = state.libraries.filter((l) => !branchId || l.branchId === branchId);
  const selectedLibrary = state.libraries.find((l) => l.id === libraryId);
  const branch = branchId ? state.branches.find((b) => b.id === branchId) : null;
  const libraryCoords = selectedLibrary ? BRANCH_COORDS[selectedLibrary.branchId] : null;

  return (
    <div className="min-h-[100dvh]">
      <SiteHeader />
      <main className="mx-auto max-w-3xl gap-6 px-3 py-6 sm:gap-8 sm:px-4 sm:py-10">
        <section className="surface rise-in rounded-2xl p-4 sm:rounded-3xl sm:p-6 md:p-8">
          <h1 className="text-xl font-bold sm:text-2xl">{t("submitComplaint")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("submitComplaintDesc")}</p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const name = complainantName.trim();
              const phone = complainantPhone.trim();

              if (!name) {
                toast.error(t("nameRequired"));
                return;
              }
              if (!phone) {
                toast.error(t("phoneRequired"));
                return;
              }
              if (!branchId || !libraryId || !selectedLibrary) {
                toast.error(lang === "ar" ? "يرجى اختيار الفرع والمكتبة" : "Please select branch & library");
                return;
              }
              if (!notes.trim()) {
                toast.error(lang === "ar" ? "يرجى كتابة الشكوى" : "Please enter complaint details");
                return;
              }

              const coords = BRANCH_COORDS[selectedLibrary.branchId];
              const ref = addComplaint({
                libraryId,
                branchId: selectedLibrary.branchId,
                locationText: locationText.trim() || selectedLibrary.address,
                lat: coords?.lat ?? null,
                lng: coords?.lng ?? null,
                notes: notes.trim(),
                images,
                createdById: GUEST_COMPLAINANT_ID,
                createdByName: name,
                createdByPhone: phone,
              });

              toast.success(`${t("complaintSentRef")} ${ref}`);
              setComplainantName("");
              setComplainantPhone("");
              setBranchId("");
              setLibraryId("");
              setLocationText("");
              setNotes("");
              setImages([]);
            }}
          >
            <div className="space-y-4 rounded-xl border border-border/70 bg-secondary/25 p-4">
              <p className="text-xs font-bold text-primary">{t("complainantInfo")}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>{t("name")}</Label>
                  <Input
                    value={complainantName}
                    onChange={(e) => setComplainantName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{t("phone")}</Label>
                  <Input
                    type="tel"
                    value={complainantPhone}
                    onChange={(e) => setComplainantPhone(e.target.value)}
                    placeholder="07XXXXXXXX"
                    dir="ltr"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>{t("branch")}</Label>
                <Select
                  value={branchId}
                  onValueChange={(v) => {
                    setBranchId(v);
                    setLibraryId("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectBranch")} />
                  </SelectTrigger>
                  <SelectContent>
                    {state.branches.map((b) => (
                      <SelectItem key={b.id} value={b.id}>
                        {lang === "ar" ? b.nameAr : b.nameEn}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>{t("library")}</Label>
                <Select value={libraryId} onValueChange={setLibraryId} disabled={!branchId}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectLibrary")} />
                  </SelectTrigger>
                  <SelectContent>
                    {branchLibraries.map((l) => (
                      <SelectItem key={l.id} value={l.id}>
                        {lang === "ar" ? l.nameAr : l.nameEn}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[11px] text-muted-foreground">{t("libraryLocationHint")}</p>
              </div>
            </div>

            {branch && selectedLibrary && (
              <div className="space-y-3 rounded-xl border border-border/70 bg-secondary/30 px-3 py-3">
                <div className="text-xs">
                  <span className="text-muted-foreground">{t("branch")}: </span>
                  <span className="font-medium">{lang === "ar" ? branch.nameAr : branch.nameEn}</span>
                  <span className="mx-2 text-muted-foreground">·</span>
                  <span className="font-medium">
                    {lang === "ar" ? selectedLibrary.nameAr : selectedLibrary.nameEn}
                  </span>
                  <p className="mt-1 text-muted-foreground">{selectedLibrary.address}</p>
                </div>
                {libraryCoords && (
                  <LocationMap
                    lat={libraryCoords.lat}
                    lng={libraryCoords.lng}
                    title={t("library")}
                    subtitle={selectedLibrary.address}
                    mapLabel={t("viewOnMap")}
                    approximate
                    approximateLabel={t("approxLocation")}
                    mapClassName="aspect-[16/9]"
                  />
                )}
              </div>
            )}

            <div className="space-y-1.5">
              <Label>{t("location")}</Label>
              <Input
                value={locationText}
                onChange={(e) => setLocationText(e.target.value)}
                placeholder={selectedLibrary?.address ?? ""}
              />
            </div>

            <div className="space-y-1.5">
              <Label>{t("notes")}</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                required
                placeholder={
                  lang === "ar" ? "اشرح المشكلة بالتفصيل..." : "Describe the issue in detail..."
                }
              />
            </div>

            <ImageUpload images={images} onChange={setImages} label={t("images")} hint={t("imageHint")} />

            <div className="sticky bottom-0 -mx-4 border-t border-border/60 bg-card/95 px-4 py-3 backdrop-blur-md sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none supports-[padding:max(0px)]:pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <Button type="submit" className="w-full touch-manipulation" size="lg">
                {t("send")}
              </Button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
