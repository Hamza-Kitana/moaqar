import { Pencil, Trash2, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function EmployeesPanel() {
  const { t, lang } = useI18n();
  const { me, isSuper, state, upsertEmployee, removeEmployee, activeEmployees } = useStore();

  const [open, setOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", username: "", password: "222", phone: "", active: true });

  const rows = useMemo(() => {
    return activeEmployees
      .concat(state.accounts.filter((a) => a.kind === "employee" && !a.active))
      .sort((a, b) => a.name.localeCompare(b.name, lang === "ar" ? "ar" : "en"));
  }, [activeEmployees, state.accounts, lang]);

  if (!me || !isSuper) {
    return (
      <div className="rise-in surface rounded-2xl p-10 text-center text-sm text-muted-foreground">
        {t("superOnly")}
      </div>
    );
  }

  const openAdd = () => {
    setEditId(null);
    setForm({ name: "", username: "", password: "222", phone: "", active: true });
    setOpen(true);
  };

  const openEdit = (id: string) => {
    const e = state.accounts.find((a) => a.id === id);
    if (!e) return;
    setEditId(id);
    setForm({
      name: e.name,
      username: e.username,
      password: e.password,
      phone: e.phone ?? "",
      active: e.active,
    });
    setOpen(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    upsertEmployee({
      id: editId ?? undefined,
      name: form.name,
      username: form.username,
      password: form.password,
      phone: form.phone || null,
      active: form.active,
    });
    toast.success(t("save"));
    setOpen(false);
  };

  return (
    <div className="rise-in space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">{t("employees")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("employeesPageDesc")}</p>
        </div>
        <Button className="h-11 gap-2 touch-manipulation" onClick={openAdd}>
          <UserPlus className="size-4" />
          {t("addEmployee")}
        </Button>
      </div>

      <div className="space-y-3 lg:hidden">
        {rows.length === 0 ? (
          <div className="surface rounded-2xl p-10 text-center text-sm text-muted-foreground">{t("noData")}</div>
        ) : (
          rows.map((emp) => (
            <div key={emp.id} className="surface app-card-tap rounded-2xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold">{emp.name}</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">{emp.username}</p>
                  {emp.phone && (
                    <p className="mt-1 font-mono text-xs text-muted-foreground">{emp.phone}</p>
                  )}
                  <p className="mt-2 text-xs">
                    <span
                      className={
                        emp.active
                          ? "rounded-full bg-success/15 px-2 py-0.5 font-medium text-success"
                          : "rounded-full bg-secondary px-2 py-0.5 font-medium text-muted-foreground"
                      }
                    >
                      {emp.active ? t("active") : t("inactive")}
                    </span>
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button
                    size="iconLg"
                    variant="ghost"
                    className="touch-manipulation"
                    onClick={() => openEdit(emp.id)}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    size="iconLg"
                    variant="ghost"
                    className="touch-manipulation text-destructive"
                    onClick={() => setDeleteTarget({ id: emp.id, name: emp.name })}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <section className="surface hidden overflow-hidden rounded-2xl lg:block">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("username")}</TableHead>
                <TableHead>{t("phone")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead className="text-end">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                    {t("noData")}
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell className="font-medium">{emp.name}</TableCell>
                    <TableCell className="font-mono text-xs">{emp.username}</TableCell>
                    <TableCell className="font-mono text-xs">{emp.phone ?? "—"}</TableCell>
                    <TableCell>{emp.active ? t("active") : t("inactive")}</TableCell>
                    <TableCell className="text-end">
                      <div className="flex justify-end gap-1">
                        <Button size="sm" variant="ghost" onClick={() => openEdit(emp.id)}>
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive"
                          onClick={() => setDeleteTarget({ id: emp.id, name: emp.name })}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="dialog-mobile-full flex max-h-[100dvh] max-w-md flex-col gap-0 overflow-hidden p-0 sm:max-w-md sm:rounded-3xl">
          <DialogHeader className="shrink-0 border-b border-border/70 bg-secondary/40 px-5 py-4 pe-14 sm:px-6 sm:py-5 sm:pe-12">
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
                {editId ? <Pencil className="size-4" /> : <UserPlus className="size-4" />}
              </span>
              <div className="min-w-0 space-y-1">
                <DialogTitle>{editId ? t("editEmployee") : t("addEmployee")}</DialogTitle>
                <DialogDescription>{editId ? t("editEmployeeDesc") : t("addEmployeeDesc")}</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form className="flex min-h-0 flex-1 flex-col" onSubmit={submit}>
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
              <div className="space-y-2">
                <Label htmlFor="emp-name">{t("name")}</Label>
                <Input
                  id="emp-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="h-11 rounded-xl border-border/80 bg-background shadow-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emp-username">{t("username")}</Label>
                <Input
                  id="emp-username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="h-11 rounded-xl border-border/80 bg-background font-mono text-sm shadow-none"
                  dir="ltr"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emp-password">{t("password")}</Label>
                <Input
                  id="emp-password"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="h-11 rounded-xl border-border/80 bg-background font-mono text-sm shadow-none"
                  dir="ltr"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emp-phone">{t("phone")}</Label>
                <Input
                  id="emp-phone"
                  type="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="h-11 rounded-xl border-border/80 bg-background font-mono text-sm shadow-none"
                  dir="ltr"
                />
              </div>
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-secondary/25 px-4 py-3.5">
                <div className="min-w-0 space-y-0.5">
                  <Label htmlFor="emp-active" className="text-sm font-semibold">
                    {t("active")}
                  </Label>
                  <p className="text-xs leading-relaxed text-muted-foreground">{t("employeeActiveHint")}</p>
                </div>
                <Switch
                  id="emp-active"
                  checked={form.active}
                  onCheckedChange={(v) => setForm({ ...form, active: v })}
                />
              </div>
            </div>

            <DialogFooter
              className={cn(
                "shrink-0 gap-2 border-t border-border/60 bg-secondary/30 px-5 py-4 sm:flex-row sm:justify-start sm:px-6",
                "flex-col sm:flex-row",
              )}
            >
              <Button type="submit" className="h-11 min-w-[7.5rem] flex-1 touch-manipulation sm:flex-none">
                {t("save")}
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="h-11 min-w-[7.5rem] flex-1 touch-manipulation sm:flex-none"
                onClick={() => setOpen(false)}
              >
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
        description={t("deleteEmployeeConfirm")}
        itemName={deleteTarget?.name}
        onConfirm={() => {
          if (!deleteTarget) return;
          if (removeEmployee(deleteTarget.id)) toast.success(t("delete"));
          else toast.error(t("deleteFailed"));
        }}
      />
    </div>
  );
}
