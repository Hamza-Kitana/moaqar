import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Building2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const fieldInputClass = "h-11 rounded-xl border-border/80 bg-background shadow-none";

export const Route = createFileRoute("/dashboard/branches")({
  component: BranchesPage,
});

type BranchForm = { nameAr: string; nameEn: string; city: string };
type LibraryForm = { nameAr: string; nameEn: string; branchId: string; address: string };

const emptyBranch = (): BranchForm => ({ nameAr: "", nameEn: "", city: "" });
const emptyLibrary = (branchId = ""): LibraryForm => ({
  nameAr: "",
  nameEn: "",
  branchId,
  address: "",
});

type DeleteTarget =
  | { kind: "branch"; id: string; name: string }
  | { kind: "library"; id: string; name: string };

function BranchesPage() {
  const { t, lang } = useI18n();
  const { state, upsertBranch, removeBranch, upsertLibrary, removeLibrary } = useStore();

  const [branchOpen, setBranchOpen] = useState(false);
  const [branchEditId, setBranchEditId] = useState<string | null>(null);
  const [branchForm, setBranchForm] = useState<BranchForm>(emptyBranch());

  const [libraryOpen, setLibraryOpen] = useState(false);
  const [libraryEditId, setLibraryEditId] = useState<string | null>(null);
  const [libForm, setLibForm] = useState<LibraryForm>(emptyLibrary(state.branches[0]?.id ?? ""));
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  const openAddBranch = () => {
    setBranchEditId(null);
    setBranchForm(emptyBranch());
    setBranchOpen(true);
  };

  const openEditBranch = (id: string) => {
    const b = state.branches.find((x) => x.id === id);
    if (!b) return;
    setBranchEditId(id);
    setBranchForm({ nameAr: b.nameAr, nameEn: b.nameEn, city: b.city });
    setBranchOpen(true);
  };

  const submitBranch = (e: React.FormEvent) => {
    e.preventDefault();
    upsertBranch({ id: branchEditId ?? undefined, ...branchForm });
    toast.success(t("save"));
    setBranchOpen(false);
  };

  const openAddLibrary = () => {
    setLibraryEditId(null);
    setLibForm(emptyLibrary(state.branches[0]?.id ?? ""));
    setLibraryOpen(true);
  };

  const openEditLibrary = (id: string) => {
    const l = state.libraries.find((x) => x.id === id);
    if (!l) return;
    setLibraryEditId(id);
    setLibForm({
      nameAr: l.nameAr,
      nameEn: l.nameEn,
      branchId: l.branchId,
      address: l.address,
    });
    setLibraryOpen(true);
  };

  const submitLibrary = (e: React.FormEvent) => {
    e.preventDefault();
    upsertLibrary({ id: libraryEditId ?? undefined, ...libForm });
    toast.success(t("save"));
    setLibraryOpen(false);
  };

  return (
    <div className="rise-in space-y-6">
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">{t("branches")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("branchesPageDesc")}</p>
      </div>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-sm font-bold">
            <Building2 className="size-4 text-primary" />
            {t("branch")}
          </h2>
          <Button size="sm" className="gap-2" onClick={openAddBranch}>
            <Plus className="size-4" />
            {t("addBranch")}
          </Button>
        </div>

        {state.branches.length === 0 ? (
          <p className="surface rounded-2xl p-8 text-center text-sm text-muted-foreground">{t("noData")}</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {state.branches.map((b) => (
              <div key={b.id} className="surface flex items-start justify-between gap-3 rounded-2xl p-4">
                <div className="min-w-0">
                  <p className="font-semibold">{lang === "ar" ? b.nameAr : b.nameEn}</p>
                  <p className="text-xs text-muted-foreground">{b.city}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button size="sm" variant="ghost" onClick={() => openEditBranch(b.id)}>
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() =>
                      setDeleteTarget({
                        kind: "branch",
                        id: b.id,
                        name: lang === "ar" ? b.nameAr : b.nameEn,
                      })
                    }
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-sm font-bold">
            <BookOpen className="size-4 text-primary" />
            {t("library")}
          </h2>
          <Button size="sm" className="gap-2" onClick={openAddLibrary} disabled={state.branches.length === 0}>
            <Plus className="size-4" />
            {t("addLibrary")}
          </Button>
        </div>

        {state.libraries.length === 0 ? (
          <p className="surface rounded-2xl p-8 text-center text-sm text-muted-foreground">{t("noData")}</p>
        ) : (
          <>
            <div className="space-y-3 lg:hidden">
              {state.libraries.map((l) => {
                const b = state.branches.find((x) => x.id === l.branchId);
                return (
                  <div
                    key={l.id}
                    className="surface flex items-start justify-between gap-3 rounded-2xl p-4"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold">{lang === "ar" ? l.nameAr : l.nameEn}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {b ? (lang === "ar" ? b.nameAr : b.nameEn) : "—"}
                      </p>
                      <p className="mt-1 text-[11px] text-muted-foreground">{l.address}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Button size="sm" variant="ghost" onClick={() => openEditLibrary(l.id)}>
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() =>
                          setDeleteTarget({
                            kind: "library",
                            id: l.id,
                            name: lang === "ar" ? l.nameAr : l.nameEn,
                          })
                        }
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="surface hidden overflow-x-auto rounded-2xl lg:block">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-start text-xs text-muted-foreground">
                    <th className="p-3">{t("library")}</th>
                    <th className="p-3">{t("branch")}</th>
                    <th className="p-3">{t("location")}</th>
                    <th className="p-3" />
                  </tr>
                </thead>
                <tbody>
                  {state.libraries.map((l) => {
                    const b = state.branches.find((x) => x.id === l.branchId);
                    return (
                      <tr key={l.id} className="border-b border-border/40">
                        <td className="p-3 font-medium">{lang === "ar" ? l.nameAr : l.nameEn}</td>
                        <td className="p-3">{b ? (lang === "ar" ? b.nameAr : b.nameEn) : "—"}</td>
                        <td className="p-3 text-xs text-muted-foreground">{l.address}</td>
                        <td className="p-3">
                          <div className="flex justify-end gap-1">
                            <Button size="sm" variant="ghost" onClick={() => openEditLibrary(l.id)}>
                              <Pencil className="size-3.5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive"
                              onClick={() =>
                                setDeleteTarget({
                                  kind: "library",
                                  id: l.id,
                                  name: lang === "ar" ? l.nameAr : l.nameEn,
                                })
                              }
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      <Dialog open={branchOpen} onOpenChange={setBranchOpen}>
        <DialogContent className="dialog-mobile-full flex max-h-[100dvh] max-w-md flex-col gap-0 overflow-hidden p-0 sm:max-w-md sm:rounded-3xl">
          <DialogHeader className="shrink-0 border-b border-border/70 bg-secondary/40 px-5 py-4 pe-14 sm:px-6 sm:py-5 sm:pe-12">
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
                {branchEditId ? <Pencil className="size-4" /> : <Building2 className="size-4" />}
              </span>
              <div className="min-w-0 space-y-1">
                <DialogTitle>{branchEditId ? t("editBranch") : t("addBranch")}</DialogTitle>
                <DialogDescription>{branchEditId ? t("editBranchDesc") : t("addBranchDesc")}</DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <form className="flex min-h-0 flex-1 flex-col" onSubmit={submitBranch}>
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
              <div className="space-y-2">
                <Label>{t("nameArLabel")}</Label>
                <Input value={branchForm.nameAr} onChange={(e) => setBranchForm({ ...branchForm, nameAr: e.target.value })} className={fieldInputClass} required />
              </div>
              <div className="space-y-2">
                <Label>{t("nameEnLabel")}</Label>
                <Input value={branchForm.nameEn} onChange={(e) => setBranchForm({ ...branchForm, nameEn: e.target.value })} className={cn(fieldInputClass, "font-mono text-sm")} dir="ltr" required />
              </div>
              <div className="space-y-2">
                <Label>{t("cityLabel")}</Label>
                <Input value={branchForm.city} onChange={(e) => setBranchForm({ ...branchForm, city: e.target.value })} className={fieldInputClass} required />
              </div>
            </div>
            <DialogFooter className="shrink-0 gap-2 border-t border-border/60 bg-secondary/30 px-5 py-4 sm:flex-row sm:justify-start sm:px-6">
              <Button type="submit" className="h-11 min-w-[7.5rem] flex-1 touch-manipulation sm:flex-none">{t("save")}</Button>
              <Button type="button" variant="secondary" className="h-11 min-w-[7.5rem] flex-1 touch-manipulation sm:flex-none" onClick={() => setBranchOpen(false)}>
                {t("cancel")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={libraryOpen} onOpenChange={setLibraryOpen}>
        <DialogContent className="dialog-mobile-full flex max-h-[100dvh] max-w-md flex-col gap-0 overflow-hidden p-0 sm:max-w-md sm:rounded-3xl">
          <DialogHeader className="shrink-0 border-b border-border/70 bg-secondary/40 px-5 py-4 pe-14 sm:px-6 sm:py-5 sm:pe-12">
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
                {libraryEditId ? <Pencil className="size-4" /> : <BookOpen className="size-4" />}
              </span>
              <div className="min-w-0 space-y-1">
                <DialogTitle>{libraryEditId ? t("editLibrary") : t("addLibrary")}</DialogTitle>
                <DialogDescription>{libraryEditId ? t("editLibraryDesc") : t("addLibraryDesc")}</DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <form className="flex min-h-0 flex-1 flex-col" onSubmit={submitLibrary}>
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
              <div className="space-y-2">
                <Label>{t("nameArLabel")}</Label>
                <Input value={libForm.nameAr} onChange={(e) => setLibForm({ ...libForm, nameAr: e.target.value })} className={fieldInputClass} required />
              </div>
              <div className="space-y-2">
                <Label>{t("nameEnLabel")}</Label>
                <Input value={libForm.nameEn} onChange={(e) => setLibForm({ ...libForm, nameEn: e.target.value })} className={cn(fieldInputClass, "font-mono text-sm")} dir="ltr" required />
              </div>
              <div className="space-y-2">
                <Label>{t("branch")}</Label>
                <Select value={libForm.branchId} onValueChange={(v) => setLibForm({ ...libForm, branchId: v })}>
                  <SelectTrigger className="h-11 rounded-xl">
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
              <div className="space-y-2">
                <Label>{t("location")}</Label>
                <Input value={libForm.address} onChange={(e) => setLibForm({ ...libForm, address: e.target.value })} className={fieldInputClass} required />
              </div>
            </div>
            <DialogFooter className="shrink-0 gap-2 border-t border-border/60 bg-secondary/30 px-5 py-4 sm:flex-row sm:justify-start sm:px-6">
              <Button type="submit" className="h-11 min-w-[7.5rem] flex-1 touch-manipulation sm:flex-none">{t("save")}</Button>
              <Button type="button" variant="secondary" className="h-11 min-w-[7.5rem] flex-1 touch-manipulation sm:flex-none" onClick={() => setLibraryOpen(false)}>
                {t("cancel")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        onOpenChange={(next) => !next && setDeleteTarget(null)}
        title={t("confirmDeleteTitle")}
        description={
          deleteTarget?.kind === "branch" ? t("deleteBranchConfirm") : t("deleteLibraryConfirm")
        }
        itemName={deleteTarget?.name}
        onConfirm={() => {
          if (!deleteTarget) return;
          if (deleteTarget.kind === "branch") removeBranch(deleteTarget.id);
          else removeLibrary(deleteTarget.id);
          toast.success(t("delete"));
        }}
      />
    </div>
  );
}
