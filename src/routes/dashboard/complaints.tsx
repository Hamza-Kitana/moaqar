import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Building2, Calendar, Check, ChevronLeft, ChevronRight, CircleX, Inbox, Loader2, MapPin, Phone, RotateCcw, Search, ShieldCheck, Trash2, User, UserCog } from "lucide-react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { ComplaintTimeline } from "@/components/dashboard/ComplaintTimeline";
import { LocationMap } from "@/components/dashboard/LocationMap";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { WorkflowSteps } from "@/components/dashboard/WorkflowSteps";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useI18n, type TKey } from "@/lib/i18n";
import {
  assignableEmployees,
  complaintComplainantPhone,
  countEmployeeStatusFilter,
  matchesEmployeeStatusFilter,
  resolveComplaintCoords,
  useStore,
  visibleComplaints,
  type Complaint,
  type ComplaintStatus,
  type EmployeeReportOutcome,
} from "@/lib/store";
import { cn } from "@/lib/utils";

type ComplaintsSearch = { region?: string };

export const Route = createFileRoute("/dashboard/complaints")({
  validateSearch: (search: Record<string, unknown>): ComplaintsSearch => {
    if (typeof search["region"] === "string") return { region: search["region"] };
    return {};
  },
  component: ComplaintsPage,
});

const ADMIN_FILTERS: Array<ComplaintStatus | "all"> = ["all", "new", "assigned", "pending_review", "closed"];
const EMPLOYEE_FILTERS: Array<ComplaintStatus | "all"> = ["all", "assigned", "pending_review", "closed"];

function statusFilterLabel(f: ComplaintStatus | "all", isSuper: boolean, t: (k: TKey) => string) {
  if (f === "all") return t("filterAll");
  if (!isSuper && f === "assigned") return t("st_new");
  return t(`st_${f}` as "st_new");
}

type ComplaintCardProps = {
  c: Complaint;
  lang: "ar" | "en";
  t: (k: TKey) => string;
  state: ReturnType<typeof useStore>["state"];
  showRegion: boolean;
  showAssignee: boolean;
  employeeView: boolean;
  isUnread: boolean;
  onOpen: () => void;
};

function ComplaintMobileCard({
  c,
  lang,
  t,
  state,
  showRegion,
  showAssignee,
  employeeView,
  isUnread,
  onOpen,
}: ComplaintCardProps) {
  const lib = state.libraries.find((l) => l.id === c.libraryId);
  const branch = state.branches.find((b) => b.id === c.branchId);
  const assignee = c.assignedTo ? state.accounts.find((a) => a.id === c.assignedTo) : null;
  const complainantPhone = complaintComplainantPhone(c);
  const Chevron = lang === "ar" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "surface app-card-tap w-full rounded-xl p-3 text-start touch-manipulation sm:rounded-2xl sm:p-4",
        isUnread && "ring-2 ring-primary/25",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {isUnread && <span className="size-2 shrink-0 rounded-full bg-primary" aria-hidden />}
            <span className="font-mono text-xs font-bold text-primary">{c.ref}</span>
            <StatusBadge status={c.status} employeeView={employeeView} />
          </div>
          <p className="mt-1.5 truncate text-sm font-semibold">
            {lib ? (lang === "ar" ? lib.nameAr : lib.nameEn) : "—"}
          </p>
          {showRegion && branch && (
            <p className="mt-0.5 flex items-center gap-1 truncate text-[11px] text-muted-foreground">
              <Building2 className="size-3 shrink-0" />
              {lang === "ar" ? branch.nameAr : branch.nameEn}
            </p>
          )}
          <p className="mt-0.5 flex items-center gap-1 truncate text-[11px] text-muted-foreground">
            <MapPin className="size-3 shrink-0" />
            {c.locationText}
          </p>
        </div>
        <Chevron className="mt-1 size-4 shrink-0 text-muted-foreground/50" />
      </div>

      <div
        className={cn(
          "mt-3 grid gap-2 border-t border-border/60 pt-3 text-[11px]",
          showAssignee ? "grid-cols-2" : "grid-cols-1",
        )}
      >
        <div className="min-w-0">
          <p className="font-semibold text-muted-foreground">{t("complainant")}</p>
          <p className="mt-0.5 truncate font-medium">{c.createdByName}</p>
          {complainantPhone && (
            <p className="mt-0.5 flex items-center gap-1 truncate font-mono text-muted-foreground">
              <Phone className="size-3 shrink-0" />
              {complainantPhone}
            </p>
          )}
        </div>
        {showAssignee && (
          <div className="min-w-0">
            <p className="font-semibold text-muted-foreground">{t("assignedEmployee")}</p>
            <p className={cn("mt-0.5 truncate", assignee ? "font-medium text-primary" : "text-warning")}>
              {assignee?.name ?? t("unassigned")}
            </p>
          </div>
        )}
      </div>

      <p className="mt-2 text-[10px] text-muted-foreground">
        {new Date(c.createdAt).toLocaleDateString(lang === "ar" ? "ar-JO" : "en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>
    </button>
  );
}

function ComplaintsPage() {
  const { t, lang } = useI18n();
  const store = useStore();
  const navigate = Route.useNavigate();
  const { region: regionParam } = Route.useSearch();
  const { me, state, isSuper, markRead, assignComplaint, submitEmployeeReport, approveComplaint, returnComplaint, deleteComplaint } = store;

  const list = useMemo(() => visibleComplaints(store), [store.state, store.me, store.isSuper]);
  const regionFilter =
    isSuper && regionParam && state.branches.some((b) => b.id === regionParam) ? regionParam : "all";

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | "all">("new");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [assignTo, setAssignTo] = useState("");
  const [resolutionNote, setResolutionNote] = useState("");
  const [employeeOutcome, setEmployeeOutcome] = useState<EmployeeReportOutcome>("resolved");
  const [returnNote, setReturnNote] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const regionList = regionFilter === "all" ? list : list.filter((c) => c.branchId === regionFilter);

  const filtered = regionList.filter((c) => {
    const q = search.trim().toLowerCase();
    const branch = state.branches.find((b) => b.id === c.branchId);
    const lib = state.libraries.find((l) => l.id === c.libraryId);
    const assignee = c.assignedTo ? state.accounts.find((a) => a.id === c.assignedTo) : null;
    const haystack = [
      c.ref,
      c.notes,
      c.locationText,
      c.createdByName,
      c.createdByPhone,
      complaintComplainantPhone(c),
      branch?.nameAr,
      branch?.nameEn,
      branch?.city,
      lib?.nameAr,
      lib?.nameEn,
      assignee?.name,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const matchSearch = !q || haystack.includes(q);
    const matchStatus = isSuper
      ? statusFilter === "all" || c.status === statusFilter
      : matchesEmployeeStatusFilter(c, statusFilter);
    return matchSearch && matchStatus;
  });

  const statusFilters = isSuper ? ADMIN_FILTERS : EMPLOYEE_FILTERS;

  const groups = useMemo(() => {
    const byBranch = state.branches
      .map((b) => ({
        branch: b,
        items: filtered.filter((c) => c.branchId === b.id),
      }))
      .filter((g) => g.items.length > 0);
    const known = new Set(state.branches.map((b) => b.id));
    const other = filtered.filter((c) => !known.has(c.branchId));
    if (other.length) {
      byBranch.push({
        branch: { id: "other", nameAr: "أخرى", nameEn: "Other", city: "" },
        items: other,
      });
    }
    return byBranch;
  }, [filtered, state.branches]);

  const selected = useMemo(() => {
    if (!selectedId) return null;
    return visibleComplaints(store).find((c) => c.id === selectedId) ?? null;
  }, [selectedId, store.state.complaints, store.me, store.isSuper]);
  const employees = useMemo(() => assignableEmployees(store), [store.state.accounts]);

  useEffect(() => {
    setAssignTo(selected?.assignedTo ?? "");
  }, [selected?.id, selected?.assignedTo]);

  const activeRegion = state.branches.find((b) => b.id === regionFilter);
  const showRegionColumn = isSuper && regionFilter === "all";
  const colCount = showRegionColumn ? 9 : 8;

  const setRegion = (id: string) => {
    setSelectedId(null);
    setDetailOpen(false);
    void navigate({
      search: id === "all" ? {} : { region: id },
    });
  };

  const openDetail = (c: Complaint) => {
    setSelectedId(c.id);
    setResolutionNote("");
    setEmployeeOutcome("resolved");
    setReturnNote("");
    setCoords(null);
    setLocationLoading(false);
    setDetailOpen(true);
    markRead(c.id);
  };

  const closeDetail = () => {
    setDetailOpen(false);
    setLocationLoading(false);
  };

  const captureLocation = () => {
    if (locationLoading) return;
    if (!navigator.geolocation) {
      toast.error(lang === "ar" ? "المتصفح لا يدعم الموقع" : "Geolocation not supported");
      return;
    }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationLoading(false);
        toast.success(t("locationCaptured"));
      },
      () => {
        setLocationLoading(false);
        toast.error(lang === "ar" ? "تعذّر الحصول على الموقع" : "Could not get location");
      },
      { enableHighAccuracy: true, timeout: 30_000, maximumAge: 0 },
    );
  };

  const tableGroups =
    isSuper && regionFilter === "all"
      ? groups
      : [{ branch: null as (typeof groups)[0]["branch"] | null, items: filtered }];

  const openCount = (items: Complaint[]) => items.filter((c) => c.status !== "closed").length;

  return (
    <div className="rise-in flex flex-col gap-3 sm:gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">
            {isSuper
              ? activeRegion && regionFilter !== "all"
                ? `${t("complaints")} — ${lang === "ar" ? activeRegion.nameAr : activeRegion.nameEn}`
                : t("complaints")
              : t("myTasks")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {filtered.length} {t("total")}
            {statusFilter !== "all" ? ` · ${t(`st_${statusFilter}` as "st_new")}` : ""}
          </p>
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="h-9 w-full rounded-xl border border-input bg-card ps-9 pe-3 text-xs outline-none ring-offset-background transition-shadow placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring sm:h-10 sm:text-sm"
            placeholder={t("searchComplaintsPh")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {isSuper && (
        <div className="grid grid-cols-2 gap-2 min-[420px]:grid-cols-3 sm:gap-3 xl:grid-cols-4 xl:gap-4">
          <button
            type="button"
            onClick={() => setRegion("all")}
            className={cn(
              "surface rounded-xl p-3 text-start transition-colors sm:rounded-2xl sm:p-4",
              regionFilter === "all" ? "ring-2 ring-primary" : "hover:bg-secondary/40",
            )}
          >
            <p className="text-[10px] font-semibold text-muted-foreground sm:text-xs">{t("allRegions")}</p>
            <p className="mt-0.5 font-display text-xl font-bold tabular-nums sm:mt-1 sm:text-2xl">{list.length}</p>
            <p className="mt-0.5 line-clamp-2 text-[9px] leading-tight text-muted-foreground sm:mt-1 sm:text-[11px]">
              {openCount(list)} {t("openComplaints")}
            </p>
          </button>
          {state.branches.map((b) => {
            const items = list.filter((c) => c.branchId === b.id);
            const open = openCount(items);
            const fresh = items.filter((c) => c.status === "new").length;
            const active = regionFilter === b.id;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setRegion(b.id)}
                className={cn(
                  "surface rounded-xl p-3 text-start transition-colors sm:rounded-2xl sm:p-4",
                  active ? "ring-2 ring-primary" : "hover:bg-secondary/40",
                )}
              >
                <div className="flex items-center justify-between gap-1">
                  <p className="truncate text-xs font-semibold sm:text-sm">{lang === "ar" ? b.nameAr : b.nameEn}</p>
                  {fresh > 0 && (
                    <span className="bg-gold grid min-w-4 shrink-0 place-items-center rounded-full px-1 text-[9px] font-bold text-primary sm:min-w-5 sm:px-1.5 sm:text-[10px]">
                      {fresh}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 font-display text-xl font-bold tabular-nums sm:mt-1 sm:text-2xl">{items.length}</p>
                <p className="mt-0.5 line-clamp-2 text-[9px] leading-tight text-muted-foreground sm:mt-1 sm:text-[11px]">
                  {open} {t("openComplaints")}
                  {fresh > 0 ? ` · ${fresh} ${t("st_new")}` : ""}
                </p>
              </button>
            );
          })}
        </div>
      )}

      <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-0.5 scrollbar-hide sm:justify-center sm:gap-1.5">
        {statusFilters.map((f) => {
          const count = isSuper
            ? f === "all"
              ? regionList.length
              : regionList.filter((c) => c.status === f).length
            : countEmployeeStatusFilter(regionList, f);
          const active = statusFilter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setStatusFilter(f)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2.5 text-xs font-medium touch-manipulation sm:gap-2 sm:px-4 sm:py-2",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <span className="max-w-[7rem] truncate sm:max-w-none">
                {statusFilterLabel(f, isSuper, t)}
              </span>
              <span
                className={cn(
                  "grid min-w-4 place-items-center rounded-full px-1 text-[9px] font-semibold sm:min-w-5 sm:px-1.5 sm:text-[10px]",
                  active ? "bg-primary-foreground/20" : "bg-secondary",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="xl:hidden">
        {filtered.length === 0 ? (
          <div className="surface flex flex-col items-center justify-center gap-2 rounded-2xl p-12 text-center sm:p-16">
            <Inbox className="size-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              {regionFilter !== "all" ? t("noComplaintsInRegion") : t("noData")}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {tableGroups.map((group) => (
              <div key={group.branch?.id ?? "flat"}>
                {group.branch && (
                  <p className="mb-2 flex items-center gap-1.5 px-1 text-xs font-semibold text-muted-foreground">
                    <Building2 className="size-3.5 text-primary" />
                    {lang === "ar" ? group.branch.nameAr : group.branch.nameEn}
                    <span className="font-normal">· {group.items.length}</span>
                  </p>
                )}
                <div className="grid gap-3 md:grid-cols-2">
                  {group.items.map((c) => (
                    <ComplaintMobileCard
                      key={c.id}
                      c={c}
                      lang={lang}
                      t={t}
                      state={state}
                      showRegion={showRegionColumn}
                      showAssignee={isSuper}
                      employeeView={!isSuper}
                      isUnread={Boolean(me && !c.readBy.includes(me.id))}
                      onOpen={() => openDetail(c)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <section className="surface hidden overflow-hidden rounded-2xl xl:block">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 p-16 text-center">
            <Inbox className="size-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              {regionFilter !== "all" ? t("noComplaintsInRegion") : t("noData")}
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-8 ps-4" />
                <TableHead className="font-semibold">{t("refNo")}</TableHead>
                <TableHead className="font-semibold">{t("library")}</TableHead>
                {showRegionColumn && <TableHead className="font-semibold">{t("region")}</TableHead>}
                <TableHead className="font-semibold">{t("location")}</TableHead>
                <TableHead className="font-semibold">{t("complainant")}</TableHead>
                <TableHead className="font-semibold">{t("phone")}</TableHead>
                <TableHead className="font-semibold">{t("status")}</TableHead>
                {isSuper && <TableHead className="font-semibold">{t("assignedEmployee")}</TableHead>}
                <TableHead className="pe-4 font-semibold">{t("createdAt")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableGroups.map((group) => (
                <Fragment key={group.branch?.id ?? "flat"}>
                  {group.branch && (
                    <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                      <TableCell colSpan={colCount} className="py-2.5 ps-4">
                        <span className="flex items-center gap-1.5 text-xs font-semibold">
                          <Building2 className="size-3.5 text-primary" />
                          {lang === "ar" ? group.branch.nameAr : group.branch.nameEn}
                          <span className="font-normal text-muted-foreground">
                            · {group.items.length} {t("total")}
                          </span>
                        </span>
                      </TableCell>
                    </TableRow>
                  )}
                  {group.items.map((c) => {
                    const lib = state.libraries.find((l) => l.id === c.libraryId);
                    const branch = state.branches.find((b) => b.id === c.branchId);
                    const assignee = c.assignedTo
                      ? state.accounts.find((a) => a.id === c.assignedTo)
                      : null;
                    const complainantPhone = complaintComplainantPhone(c);
                    const isUnread = Boolean(me && !c.readBy.includes(me.id));
                    return (
                      <TableRow key={c.id} className="cursor-pointer" onClick={() => openDetail(c)}>
                        <TableCell className="w-8 ps-4">
                          <span
                            className={cn(
                              "mx-auto block size-2 rounded-full",
                              isUnread ? "bg-primary" : "bg-transparent",
                            )}
                          />
                        </TableCell>
                        <TableCell className="font-mono text-xs font-semibold text-primary">{c.ref}</TableCell>
                        <TableCell className="max-w-[10rem] truncate font-medium">
                          {lib ? (lang === "ar" ? lib.nameAr : lib.nameEn) : "—"}
                        </TableCell>
                        {showRegionColumn && (
                          <TableCell className="max-w-[8rem] truncate text-muted-foreground">
                            {branch ? (lang === "ar" ? branch.nameAr : branch.nameEn) : "—"}
                          </TableCell>
                        )}
                        <TableCell className="max-w-[10rem] truncate text-muted-foreground">{c.locationText}</TableCell>
                        <TableCell className="max-w-[8rem] truncate text-sm font-medium">{c.createdByName}</TableCell>
                        <TableCell className="max-w-[7rem] truncate font-mono text-xs text-muted-foreground">
                          {complainantPhone ?? t("noPhone")}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={c.status} employeeView={!isSuper} />
                        </TableCell>
                        {isSuper && (
                          <TableCell
                            className={cn(
                              "max-w-[8rem] truncate text-sm",
                              assignee ? "font-medium text-primary" : "text-warning",
                            )}
                          >
                            {assignee?.name ?? t("unassigned")}
                          </TableCell>
                        )}
                        <TableCell className="pe-4 text-muted-foreground">
                          {new Date(c.createdAt).toLocaleDateString(lang === "ar" ? "ar-JO" : "en-GB")}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        )}
      </section>

      <Dialog
        open={detailOpen}
        onOpenChange={(open) => {
          if (!open) closeDetail();
        }}
      >
        <DialogContent className="dialog-mobile-full flex max-h-[90vh] max-w-3xl flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl">
          {selected && (
            <ComplaintDetail
              complaint={selected}
              lang={lang}
              t={t}
              {...(me?.id ? { meId: me.id } : {})}
              state={state}
              isSuper={isSuper}
              assignTo={assignTo}
              setAssignTo={setAssignTo}
              employees={employees}
              resolutionNote={resolutionNote}
              setResolutionNote={setResolutionNote}
              coords={coords}
              locationLoading={locationLoading}
              captureLocation={captureLocation}
              onAssign={() => {
                if (!assignTo) return;
                assignComplaint(selected.id, assignTo);
                toast.success(selected.assignedTo ? t("changeAssignee") : t("assign"));
              }}
              onSubmitReport={() => {
                if (!resolutionNote.trim()) {
                  toast.error(
                    employeeOutcome === "resolved"
                      ? lang === "ar"
                        ? "اكتب ما تم عمله"
                        : "Enter resolution notes"
                      : t("unresolvedReason"),
                  );
                  return;
                }
                if (employeeOutcome === "resolved" && !coords) {
                  toast.error(t("locationRequired"));
                  return;
                }
                submitEmployeeReport(selected.id, employeeOutcome, resolutionNote.trim(), coords);
                toast.success(t("reportSent"));
              }}
              onApprove={() => {
                approveComplaint(selected.id);
                toast.success(t("complaintClosed"));
              }}
              onReturn={() => {
                const target = assignTo || selected.assignedTo;
                if (!target) return;
                returnComplaint(selected.id, returnNote.trim(), assignTo !== selected.assignedTo ? assignTo : undefined);
                toast.success(t("complaintReturned"));
              }}
              employeeOutcome={employeeOutcome}
              setEmployeeOutcome={setEmployeeOutcome}
              returnNote={returnNote}
              setReturnNote={setReturnNote}
              onDelete={() => setDeleteOpen(true)}
            />
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title={t("confirmDeleteTitle")}
        description={t("deleteComplaintConfirm")}
        itemName={selected?.ref}
        confirmLabel={t("deleteComplaint")}
        onConfirm={() => {
          if (!selected) return;
          if (deleteComplaint(selected.id)) {
            toast.success(t("complaintDeleted"));
            setDeleteOpen(false);
            closeDetail();
            setSelectedId(null);
          } else {
            toast.error(t("deleteFailed"));
          }
        }}
      />
    </div>
  );
}

type DetailProps = {
  complaint: Complaint;
  lang: "ar" | "en";
  t: (k: import("@/lib/i18n").TKey) => string;
  meId?: string;
  state: ReturnType<typeof useStore>["state"];
  isSuper: boolean;
  assignTo: string;
  setAssignTo: (v: string) => void;
  employees: ReturnType<typeof useStore>["state"]["accounts"];
  resolutionNote: string;
  setResolutionNote: (v: string) => void;
  employeeOutcome: EmployeeReportOutcome;
  setEmployeeOutcome: (v: EmployeeReportOutcome) => void;
  returnNote: string;
  setReturnNote: (v: string) => void;
  coords: { lat: number; lng: number } | null;
  locationLoading: boolean;
  captureLocation: () => void;
  onAssign: () => void;
  onSubmitReport: () => void;
  onApprove: () => void;
  onReturn: () => void;
  onDelete?: () => void;
};

function OutcomeToggle({
  value,
  onChange,
  t,
}: {
  value: EmployeeReportOutcome;
  onChange: (v: EmployeeReportOutcome) => void;
  t: DetailProps["t"];
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={() => onChange("resolved")}
        className={cn(
          "flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors touch-manipulation",
          value === "resolved"
            ? "border-success/40 bg-success/10 text-success"
            : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/50",
        )}
      >
        <Check className="size-4" />
        {t("outcomeResolved")}
      </button>
      <button
        type="button"
        onClick={() => onChange("unresolved")}
        className={cn(
          "flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors touch-manipulation",
          value === "unresolved"
            ? "border-destructive/40 bg-destructive/10 text-destructive"
            : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/50",
        )}
      >
        <CircleX className="size-4" />
        {t("outcomeUnresolved")}
      </button>
    </div>
  );
}

function ComplaintDetail({
  complaint: c,
  lang,
  t,
  meId,
  state,
  isSuper,
  assignTo,
  setAssignTo,
  employees,
  resolutionNote,
  setResolutionNote,
  employeeOutcome,
  setEmployeeOutcome,
  returnNote,
  setReturnNote,
  coords,
  locationLoading,
  captureLocation,
  onAssign,
  onSubmitReport,
  onApprove,
  onReturn,
  onDelete,
}: DetailProps) {
  const lib = state.libraries.find((l) => l.id === c.libraryId);
  const branch = state.branches.find((b) => b.id === c.branchId);
  const assignee = c.assignedTo ? state.accounts.find((a) => a.id === c.assignedTo) : null;
  const complainantPhone = complaintComplainantPhone(c);
  const isClosed = c.status === "closed";
  const canAssign = isSuper && !isClosed && c.status !== "pending_review";
  const canSubmitReport =
    !isSuper && !!meId && c.assignedTo === meId && c.status === "assigned";
  const canReview = isSuper && c.status === "pending_review";
  const awaitingReview = !isSuper && c.status === "pending_review" && c.assignedTo === meId;
  const report = c.employeeReport;

  return (
    <>
      <DialogHeader className="shrink-0 border-b border-border/70 bg-gradient-to-b from-secondary/70 to-secondary/30 px-5 py-5 pe-14 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-1">
            <DialogDescription className="m-0 font-mono text-[11px] font-semibold tracking-wide text-primary">
              {c.ref}
            </DialogDescription>
            <DialogTitle className="text-start text-lg font-bold leading-snug sm:text-xl">
              {lib ? (lang === "ar" ? lib.nameAr : lib.nameEn) : "—"}
            </DialogTitle>
            {branch && (
              <p className="text-xs text-muted-foreground">
                {lang === "ar" ? branch.nameAr : branch.nameEn}
              </p>
            )}
          </div>
          <StatusBadge status={c.status} employeeView={!isSuper} />
        </div>
        <div className="mt-4">
          <WorkflowSteps status={c.status} employeeView={!isSuper} />
        </div>
      </DialogHeader>

      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/70 bg-card px-4 py-3 shadow-sm">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
              <User className="size-3.5 text-primary" />
              {t("complainant")}
            </p>
            <p className="mt-1.5 text-sm font-bold">{c.createdByName}</p>
            <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
              <Phone className="size-3" />
              {complainantPhone ? (
                <a href={`tel:${complainantPhone}`} className="font-mono hover:text-primary">
                  {complainantPhone}
                </a>
              ) : (
                t("noPhone")
              )}
            </p>
          </div>
          {isSuper && (
            <div className="rounded-xl border border-border/70 bg-card px-4 py-3 shadow-sm">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                <UserCog className="size-3.5 text-primary" />
                {t("assignedEmployee")}
              </p>
              <p className={cn("mt-1.5 text-sm font-bold", assignee ? "text-primary" : "text-warning")}>
                {assignee?.name ?? t("unassigned")}
              </p>
            </div>
          )}
        </div>

        <dl className="grid gap-3 text-xs sm:grid-cols-2">
          <MetaRow
            icon={Building2}
            label={t("library")}
            value={lib ? (lang === "ar" ? lib.nameAr : lib.nameEn) : "—"}
          />
          <MetaRow
            icon={Briefcase}
            label={t("branch")}
            value={branch ? (lang === "ar" ? branch.nameAr : branch.nameEn) : "—"}
          />
          <MetaRow icon={MapPin} label={t("location")} value={c.locationText} />
          <MetaRow
            icon={Calendar}
            label={t("createdAt")}
            value={new Date(c.createdAt).toLocaleString(lang === "ar" ? "ar-JO" : "en-GB")}
          />
        </dl>

        <div className="grid gap-3 sm:grid-cols-2">
          {(() => {
            const problem = resolveComplaintCoords(c);
            return problem ? (
              <LocationMap
                title={t("problemLocation")}
                subtitle={c.locationText}
                lat={problem.lat}
                lng={problem.lng}
                mapLabel={t("viewOnMap")}
                approximate={problem.approximate}
                approximateLabel={t("approxLocation")}
                className="border-primary/20"
              />
            ) : (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="text-xs font-semibold text-primary">{t("problemLocation")}</p>
                <p className="mt-1.5 text-sm font-medium">{c.locationText}</p>
                <p className="mt-2 text-xs text-muted-foreground">{t("noCoords")}</p>
              </div>
            );
          })()}
          {c.resolution && c.resolution.lat && c.resolution.lng ? (
            <LocationMap
              title={t("employeeLocation")}
              subtitle={c.resolution.by}
              lat={c.resolution.lat}
              lng={c.resolution.lng}
              mapLabel={t("viewOnMap")}
              className="border-success/25"
            />
          ) : (
            <div className="flex min-h-[12rem] flex-col justify-between rounded-xl border border-dashed border-success/30 bg-success/5 p-4">
              <div>
                <p className="text-xs font-semibold text-success">{t("employeeLocation")}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t("awaitingEmployeeVisit")}</p>
              </div>
              <p className="text-[11px] text-muted-foreground">{t("noCoords")}</p>
            </div>
          )}
        </div>

        <div className="rounded-xl bg-secondary/40 px-4 py-3">
          <p className="text-[11px] font-semibold text-muted-foreground">{t("notes")}</p>
          <p className="mt-2 text-sm leading-relaxed">{c.notes}</p>
        </div>

        {c.images.length > 0 && (
          <div>
            <p className="mb-2 text-[11px] font-semibold text-muted-foreground">{t("photos")}</p>
            <div className="flex flex-wrap gap-2">
              {c.images.map((src, i) => (
                <img key={i} src={src} alt="" className="size-20 rounded-xl border border-border object-cover" />
              ))}
            </div>
          </div>
        )}

        {report && (
          <div
            className={cn(
              "rounded-xl border p-4",
              report.outcome === "resolved"
                ? "border-success/25 bg-success/10"
                : "border-destructive/25 bg-destructive/5",
            )}
          >
            <p
              className={cn(
                "text-xs font-semibold",
                report.outcome === "resolved" ? "text-success" : "text-destructive",
              )}
            >
              {t("employeeReportTitle")} —{" "}
              {report.outcome === "resolved" ? t("outcomeResolved") : t("outcomeUnresolved")}
            </p>
            <p className="mt-2 text-sm leading-relaxed">{report.note}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {report.by} · {new Date(report.at).toLocaleString(lang === "ar" ? "ar-JO" : "en-GB")}
            </p>
          </div>
        )}

        {awaitingReview && (
          <div className="rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 text-sm text-muted-foreground">
            {t("awaitingSuperReview")}
          </div>
        )}

        {canSubmitReport && (
          <div className="space-y-4 rounded-xl border border-border/70 bg-card p-4 shadow-sm">
            <div>
              <Label className="text-xs">{t("visitOutcome")}</Label>
              <div className="mt-2">
                <OutcomeToggle value={employeeOutcome} onChange={setEmployeeOutcome} t={t} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>
                {employeeOutcome === "resolved" ? t("resolutionNote") : t("unresolvedReason")}
              </Label>
              <Textarea
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
                rows={3}
                placeholder={
                  employeeOutcome === "resolved"
                    ? lang === "ar"
                      ? "اشرح ما تم عمله..."
                      : "Describe what was done..."
                    : lang === "ar"
                      ? "لماذا لم تُحل المشكلة؟"
                      : "Why could the issue not be resolved?"
                }
              />
            </div>
            {employeeOutcome === "resolved" && (
              <>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={captureLocation}
                  disabled={locationLoading}
                  className="w-full gap-2 touch-manipulation sm:w-auto"
                >
                  {locationLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : coords ? (
                    <Check className="size-4 text-success" />
                  ) : (
                    <MapPin className="size-4" />
                  )}
                  {locationLoading ? t("locatingPosition") : coords ? t("locationCaptured") : t("attachLocation")}
                </Button>
                {!coords && <p className="text-xs text-muted-foreground">{t("locationRequired")}</p>}
                {coords && (
                  <LocationMap
                    lat={coords.lat}
                    lng={coords.lng}
                    title={t("employeeLocation")}
                    mapLabel={t("viewOnMap")}
                    mapClassName="aspect-[16/9]"
                  />
                )}
              </>
            )}
            <Button className="w-full touch-manipulation" onClick={onSubmitReport} disabled={locationLoading}>
              {employeeOutcome === "resolved" ? t("markResolved") : t("markUnresolved")}
            </Button>
          </div>
        )}

        {(canAssign || canReview) && (
          <div className="space-y-4 rounded-xl border border-border/70 bg-card p-4 shadow-sm">
            {canReview && (
              <div className="space-y-3 border-b border-border/60 pb-4">
                <div>
                  <p className="text-sm font-bold">{t("superReviewTitle")}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{t("superReviewDesc")}</p>
                </div>
                <Button className="w-full gap-2 touch-manipulation sm:w-auto" onClick={onApprove}>
                  <ShieldCheck className="size-4" />
                  {t("approveClose")}
                </Button>
              </div>
            )}

            {canAssign && (
              <div className="space-y-2">
                <Label>{c.assignedTo ? t("changeAssignee") : t("assign")}</Label>
                {employees.length === 0 ? (
                  <p className="text-xs text-muted-foreground">{t("noActiveEmployees")}</p>
                ) : (
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Select value={assignTo} onValueChange={setAssignTo}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder={t("employeeName")} />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map((e) => (
                          <SelectItem key={e.id} value={e.id}>
                            {e.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={onAssign} disabled={!assignTo || assignTo === (c.assignedTo ?? "")}>
                      {c.assignedTo ? t("changeAssignee") : t("assign")}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {canReview && (
              <div className="space-y-3">
                <Label>{t("returnNote")}</Label>
                <Textarea
                  value={returnNote}
                  onChange={(e) => setReturnNote(e.target.value)}
                  rows={2}
                  placeholder={lang === "ar" ? "ملاحظات للموظf..." : "Notes for the employee..."}
                />
                <div className="space-y-2">
                  <Label>{t("reassignEmployee")}</Label>
                  <Select value={assignTo} onValueChange={setAssignTo}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("employeeName")} />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((e) => (
                        <SelectItem key={e.id} value={e.id}>
                          {e.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="secondary" className="w-full gap-2 touch-manipulation" onClick={onReturn}>
                  <RotateCcw className="size-4" />
                  {assignTo && assignTo !== c.assignedTo ? t("reassignEmployee") : t("returnToEmployee")}
                </Button>
              </div>
            )}
          </div>
        )}

        {isSuper && onDelete && (
          <div className="border-t border-border/60 pt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive touch-manipulation"
              onClick={onDelete}
            >
              <Trash2 className="size-4" />
              {t("deleteComplaint")}
            </Button>
          </div>
        )}

        <ComplaintTimeline entries={c.timeline} />
      </div>
    </>
  );
}

function MetaRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl bg-secondary/35 px-3 py-2.5">
      <Icon className="mt-0.5 size-3.5 shrink-0 text-primary" />
      <div className="min-w-0">
        <dt className="text-[10px] text-muted-foreground">{label}</dt>
        <dd className="mt-0.5 truncate font-medium">{value}</dd>
      </div>
    </div>
  );
}
