import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Branch = { id: string; nameAr: string; nameEn: string; city: string };
export type Library = { id: string; nameAr: string; nameEn: string; branchId: string; address: string };

export type AccountKind = "super" | "employee";

export type Account = {
  id: string;
  username: string;
  password: string;
  name: string;
  phone: string | null;
  kind: AccountKind;
  active: boolean;
  createdAt: string;
};

export type ComplaintStatus = "new" | "assigned" | "returned" | "pending_review" | "closed";

export type EmployeeReportOutcome = "resolved" | "unresolved";

export type EmployeeReport = {
  outcome: EmployeeReportOutcome;
  note: string;
  lat: number | null;
  lng: number | null;
  at: string;
  by: string;
  byId: string;
};

export type TimelineEntry = {
  at: string;
  by: string;
  textAr: string;
  textEn: string;
};

export type Complaint = {
  id: string;
  ref: string;
  libraryId: string;
  branchId: string;
  locationText: string;
  lat: number | null;
  lng: number | null;
  notes: string;
  images: string[];
  createdById: string;
  createdByName: string;
  createdByPhone: string | null;
  createdAt: string;
  status: ComplaintStatus;
  assignedTo: string | null;
  readBy: string[];
  employeeReport: EmployeeReport | null;
  resolution: { note: string; lat: number; lng: number; at: string; by: string } | null;
  resolvedBy: string | null;
  timeline: TimelineEntry[];
};

/** @deprecated legacy — no longer used */
export type DailyAssignment = {
  id: string;
  employeeId: string;
  branchId: string;
  date: string;
  assignedAt: string;
  assignedBy: string;
};

export type Notification = {
  id: string;
  to: string;
  textAr: string;
  textEn: string;
  at: string;
  read: boolean;
  link?: string;
};

type State = {
  branches: Branch[];
  libraries: Library[];
  accounts: Account[];
  complaints: Complaint[];
  notifications: Notification[];
  sessionId: string | null;
};

export const GUEST_COMPLAINANT_ID = "guest";

export const BRANCH_COORDS: Record<string, { lat: number; lng: number }> = {
  "b-amman": { lat: 31.9539, lng: 35.9106 },
  "b-ajloun": { lat: 32.3326, lng: 35.7517 },
  "b-irbid": { lat: 32.5556, lng: 35.85 },
};

export function resolveComplaintCoords(c: Pick<Complaint, "lat" | "lng" | "branchId">): {
  lat: number;
  lng: number;
  approximate: boolean;
} | null {
  if (c.lat != null && c.lng != null) return { lat: c.lat, lng: c.lng, approximate: false };
  const fallback = BRANCH_COORDS[c.branchId];
  if (!fallback) return null;
  return { ...fallback, approximate: true };
}

export function complaintComplainantPhone(c: Complaint): string | null {
  return c.createdByPhone;
}

const uid = () => Math.random().toString(36).slice(2, 10);
const now = () => new Date().toISOString();

type LegacyAccount = Partial<Account> & { kind?: string; roleId?: string | null; managerId?: string | null };

function normalizeAccount(raw: LegacyAccount, fallbackCreatedAt: string): Account | null {
  const kindRaw = raw.kind ?? "employee";
  if (kindRaw === "user") return null;
  const kind: AccountKind = kindRaw === "super" ? "super" : "employee";
  if (!raw.id || !raw.username || !raw.password || !raw.name) return null;
  return {
    id: raw.id,
    username: raw.username,
    password: raw.password,
    name: raw.name,
    phone: raw.phone ?? null,
    kind,
    active: raw.active ?? true,
    createdAt: raw.createdAt ?? fallbackCreatedAt,
  };
}

function migrateAccounts(parsed: LegacyAccount[] | undefined, base: Account[]): Account[] {
  if (!parsed?.length) return base;
  const normalized = parsed
    .map((a) => normalizeAccount(a, base[0]?.createdAt ?? now()))
    .filter((a): a is Account => a != null);
  const hasSuper = normalized.some((a) => a.kind === "super" && a.active);
  if (!hasSuper) return base;
  const byId = new Map<string, Account>();
  for (const a of normalized) byId.set(a.id, a);
  for (const seedAcc of base) {
    if (!byId.has(seedAcc.id)) byId.set(seedAcc.id, seedAcc);
  }
  return [...byId.values()];
}

function normalizeComplaint(c: Complaint & { status?: string }): Complaint {
  let status = c.status;
  if (status === "resolved") status = "closed";
  const valid = ["new", "assigned", "returned", "pending_review", "closed"];
  if (!valid.includes(status)) status = "new";
  return {
    ...c,
    status: status as ComplaintStatus,
    employeeReport: c.employeeReport ?? null,
    resolvedBy: c.resolvedBy ?? null,
    images: Array.isArray(c.images) ? c.images.filter(Boolean) : [],
  };
}

function hydrateState(raw: string | null): State {
  const base = seed();
  if (!raw) return base;
  try {
    const parsed = JSON.parse(raw) as Partial<State> & { dailyAssignments?: unknown[] };
    const accounts = migrateAccounts(parsed.accounts as LegacyAccount[] | undefined, base.accounts);
    const accountIds = new Set(accounts.map((a) => a.id));
    const complaints = (parsed.complaints?.length ? parsed.complaints : base.complaints).map(
      normalizeComplaint,
    );
    const sessionId =
      parsed.sessionId && accountIds.has(parsed.sessionId) ? parsed.sessionId : null;
    return {
      branches: parsed.branches?.length ? parsed.branches : base.branches,
      libraries: parsed.libraries?.length ? parsed.libraries : base.libraries,
      accounts,
      complaints: complaints.length ? complaints : base.complaints,
      notifications: parsed.notifications?.filter((n) => accountIds.has(n.to)) ?? base.notifications,
      sessionId,
    };
  } catch {
    return base;
  }
}

function seed(): State {
  const ago = (days: number, hours = 10) =>
    new Date(Date.now() - days * 86_400_000 - hours * 3_600_000).toISOString();

  const branches: Branch[] = [
    { id: "b-amman", nameAr: "عمان", nameEn: "Amman", city: "Amman" },
    { id: "b-ajloun", nameAr: "عجلون", nameEn: "Ajloun", city: "Ajloun" },
    { id: "b-irbid", nameAr: "إربد", nameEn: "Irbid", city: "Irbid" },
  ];

  const libraries: Library[] = [
    { id: "l1", nameAr: "جامعة الأردنية", nameEn: "University of Jordan", branchId: "b-amman", address: "الجبيهة - شارع الملكة رانيا" },
    { id: "l2", nameAr: "مدرسة النور الأهلية", nameEn: "Al-Noor Private School", branchId: "b-amman", address: "الصويفية" },
    { id: "l5", nameAr: "مركز المدينة التجاري", nameEn: "City Business Centre", branchId: "b-amman", address: "وسط البلد - الدوار الرابع" },
    { id: "l3", nameAr: "مؤسسة عجلون التعليمية", nameEn: "Ajloun Education Centre", branchId: "b-ajloun", address: "وسط البلد" },
    { id: "l6", nameAr: "مدرسة عنجرة", nameEn: "Anjara School", branchId: "b-ajloun", address: "عنجرة" },
    { id: "l4", nameAr: "جامعة اليرموك", nameEn: "Yarmouk University", branchId: "b-irbid", address: "شارع الجامعة" },
    { id: "l7", nameAr: "مستشفى إربد الحكومي", nameEn: "Irbid Government Hospital", branchId: "b-irbid", address: "الحرم الجامعي" },
    { id: "l8", nameAr: "مؤسسة الحسن الخيرية", nameEn: "Al-Hassan Charity", branchId: "b-irbid", address: "حي الجامعة" },
  ];

  const emp = (
    id: string,
    username: string,
    name: string,
    phone: string,
    daysAgo: number,
    active = true,
  ): Account => ({
    id,
    username,
    password: "222",
    name,
    phone,
    kind: "employee",
    active,
    createdAt: ago(daysAgo),
  });

  const accounts: Account[] = [
    {
      id: "a-super",
      username: "Sadmin",
      password: "222",
      name: "عبدالله المواقر",
      phone: "0790000000",
      kind: "super",
      active: true,
      createdAt: ago(60),
    },
    emp("e1", "s.momani", "سارة الموماني", "0798111001", 30),
    emp("e2", "k.maidani", "خالد الميداني", "0798111002", 28),
    emp("e3", "z.kurdi", "زيد الكردي", "0798222001", 26),
    emp("e4", "o.faouri", "عمر الفاعوري", "0798222002", 24),
    emp("e5", "l.hammoud", "لينا الحمود", "0798333001", 22),
    emp("e6", "y.nablusi", "يزن النابلسي", "0798333002", 20),
    emp("e7", "n.din", "نور الدين", "0798112001", 18),
    emp("e8", "k.sarhan", "كمال السرحان", "0798334001", 16),
    emp("e-pending", "pending.emp", "يوسف الجديد", "0798111999", 2, false),
  ];

  const complaints: Complaint[] = [
    {
      id: "c1",
      ref: "MWQ-1001",
      libraryId: "l3",
      branchId: "b-ajloun",
      locationText: "عجلون - وسط البلد",
      lat: 32.3321,
      lng: 35.7512,
      notes: "جهاز الطباعة لا يعمل ويوجد نقص في الرفوف.",
      images: [],
      createdById: GUEST_COMPLAINANT_ID,
      createdByName: "محمد العواملة",
      createdByPhone: "0797654321",
      createdAt: ago(0, 2),
      status: "new",
      assignedTo: null,
      readBy: [],
      employeeReport: null,
      resolution: null,
      resolvedBy: null,
      timeline: [{ at: ago(0, 2), by: "محمد العواملة", textAr: "تم تقديم الشكوى", textEn: "Complaint submitted" }],
    },
    {
      id: "c2",
      ref: "MWQ-1002",
      libraryId: "l1",
      branchId: "b-amman",
      locationText: "عمان - الجبيهة",
      lat: 32.0194,
      lng: 35.8775,
      notes: "تأخر في توريد القرطاسية للفصل الجديد.",
      images: [],
      createdById: GUEST_COMPLAINANT_ID,
      createdByName: "فاطمة النابلسي",
      createdByPhone: "0790123456",
      createdAt: ago(1, 5),
      status: "assigned",
      assignedTo: "e1",
      readBy: ["e1"],
      employeeReport: null,
      resolution: null,
      resolvedBy: null,
      timeline: [
        { at: ago(1, 5), by: "فاطمة النابلسي", textAr: "تم تقديم الشكوى", textEn: "Complaint submitted" },
        { at: ago(1, 3), by: "عبدالله المواقر", textAr: "تم توكيل الشكوى إلى سارة الموماني", textEn: "Assigned to Sara Al-Momani" },
      ],
    },
    {
      id: "c3",
      ref: "MWQ-1003",
      libraryId: "l2",
      branchId: "b-amman",
      locationText: "عمان - الصويفية",
      lat: 31.9545,
      lng: 35.8602,
      notes: "كراسي القراءة مكسورة في قاعة الأطفال.",
      images: [],
      createdById: GUEST_COMPLAINANT_ID,
      createdByName: "أحمد الشمري",
      createdByPhone: "0791122334",
      createdAt: ago(2, 8),
      status: "pending_review",
      assignedTo: "e2",
      readBy: ["e2", "a-super"],
      employeeReport: {
        outcome: "resolved",
        note: "تم استبدال 6 كراسي وتركيب واقيات زوايا.",
        lat: 31.9539,
        lng: 35.855,
        at: ago(0, 4),
        by: "خالد الميداني",
        byId: "e2",
      },
      resolution: {
        note: "تم استبدال 6 كراسي وتركيب واقيات زوايا.",
        lat: 31.9539,
        lng: 35.855,
        at: ago(0, 4),
        by: "خالد الميداني",
      },
      resolvedBy: null,
      timeline: [
        { at: ago(2, 8), by: "أحمد الشمري", textAr: "تم تقديم الشكوى", textEn: "Complaint submitted" },
        { at: ago(2, 4), by: "عبدالله المواقر", textAr: "تم توكيل الشكوى إلى خالد الميداني", textEn: "Assigned to Khaled Al-Maidani" },
        { at: ago(0, 4), by: "خالد الميداني", textAr: "أبلغ الموظف عن حل المشكلة — بانتظار المراجعة", textEn: "Employee reported resolution — pending review" },
      ],
    },
    {
      id: "c4",
      ref: "MWQ-1004",
      libraryId: "l6",
      branchId: "b-ajloun",
      locationText: "عجلون - عنجرة",
      lat: 32.3065,
      lng: 35.7548,
      notes: "الإنارة في الممر الرئيسي ضعيفة جداً بعد المغرب.",
      images: [],
      createdById: GUEST_COMPLAINANT_ID,
      createdByName: "ريم جرادات",
      createdByPhone: "0792233445",
      createdAt: ago(1, 7),
      status: "returned",
      assignedTo: "e3",
      readBy: ["e3", "a-super"],
      employeeReport: null,
      resolution: null,
      resolvedBy: null,
      timeline: [
        { at: ago(1, 7), by: "ريم جرادات", textAr: "تم تقديم الشكوى", textEn: "Complaint submitted" },
        { at: ago(1, 4), by: "عبدالله المواقر", textAr: "تم توكيل الشكوى إلى زيد الكردي", textEn: "Assigned to Zaid Al-Kurdi" },
        {
          at: ago(0, 3),
          by: "عبدالله المواقر",
          textAr: "أُعيدت الشكوى إلى زيد الكردي: يرجى زيارة الموقع مجدداً",
          textEn: "Returned to Zaid Al-Kurdi: please revisit the site",
        },
      ],
    },
    {
      id: "c5",
      ref: "MWQ-1005",
      libraryId: "l4",
      branchId: "b-irbid",
      locationText: "إربد - شارع الحصن",
      lat: 32.5412,
      lng: 35.8551,
      notes: "أجهزة الحاسوب في قاعة البحث لا تتصل بالإنترنت.",
      images: [],
      createdById: GUEST_COMPLAINANT_ID,
      createdByName: "يزن الحسن",
      createdByPhone: "0793344556",
      createdAt: ago(0, 6),
      status: "new",
      assignedTo: null,
      readBy: [],
      employeeReport: null,
      resolution: null,
      resolvedBy: null,
      timeline: [{ at: ago(0, 6), by: "يزن الحسن", textAr: "تم تقديم الشكوى", textEn: "Complaint submitted" }],
    },
    {
      id: "c6",
      ref: "MWQ-1006",
      libraryId: "l7",
      branchId: "b-irbid",
      locationText: "إربد - الحرم الجامعي",
      lat: 32.5368,
      lng: 35.8559,
      notes: "نقص حاد في الكتب المنهجية لقسم الهندسة.",
      images: [],
      createdById: GUEST_COMPLAINANT_ID,
      createdByName: "دiana القاسم",
      createdByPhone: "0794455667",
      createdAt: ago(3, 3),
      status: "pending_review",
      assignedTo: "e5",
      readBy: ["e5", "a-super"],
      employeeReport: {
        outcome: "unresolved",
        note: "الكتب غير متوفرة لدى المورد — يحتاج تدخل الإدارة.",
        lat: null,
        lng: null,
        at: ago(0, 2),
        by: "لينا الحمود",
        byId: "e5",
      },
      resolution: null,
      resolvedBy: null,
      timeline: [
        { at: ago(3, 3), by: "دiana القاسم", textAr: "تم تقديم الشكوى", textEn: "Complaint submitted" },
        { at: ago(2, 9), by: "عبدالله المواقر", textAr: "تم توكيل الشكوى إلى لina الحمود", textEn: "Assigned to Lina Al-Hammoud" },
        {
          at: ago(0, 2),
          by: "لينا الحمود",
          textAr: "أبلغ الموظف بعدم حل المشكلة — بانتظار المراجعة",
          textEn: "Employee reported unresolved — pending review",
        },
      ],
    },
    {
      id: "c7",
      ref: "MWQ-1007",
      libraryId: "l5",
      branchId: "b-amman",
      locationText: "عمان - الدوار الرابع",
      lat: 31.9638,
      lng: 35.9032,
      notes: "النظام الآلي للإعارة يتوقف بشكل متكرر.",
      images: [],
      createdById: GUEST_COMPLAINANT_ID,
      createdByName: "باسل الشريف",
      createdByPhone: "0795566778",
      createdAt: ago(0, 8),
      status: "new",
      assignedTo: null,
      readBy: [],
      employeeReport: null,
      resolution: null,
      resolvedBy: null,
      timeline: [{ at: ago(0, 8), by: "باسل الشريف", textAr: "تم تقديم الشكوى", textEn: "Complaint submitted" }],
    },
    {
      id: "c8",
      ref: "MWQ-1008",
      libraryId: "l8",
      branchId: "b-irbid",
      locationText: "إربد - حي الجامعة",
      lat: 32.5521,
      lng: 35.8488,
      notes: "تسريب مياه من سقف قسم الدوريات.",
      images: [],
      createdById: GUEST_COMPLAINANT_ID,
      createdByName: "غادة النجار",
      createdByPhone: "0796677889",
      createdAt: ago(5, 6),
      status: "closed",
      assignedTo: "e6",
      readBy: ["e6", "a-super"],
      employeeReport: {
        outcome: "resolved",
        note: "تم عزل السقف ونقل الأرشيف المتضرر.",
        lat: 32.5556,
        lng: 35.85,
        at: ago(2, 1),
        by: "يزن النابلسي",
        byId: "e6",
      },
      resolution: {
        note: "تم عزل السقف ونقل الأرشيف المتضرر.",
        lat: 32.5556,
        lng: 35.85,
        at: ago(1, 2),
        by: "يزن النابلسي",
      },
      resolvedBy: "a-super",
      timeline: [
        { at: ago(5, 6), by: "غادة النجار", textAr: "تم تقديم الشكوى", textEn: "Complaint submitted" },
        { at: ago(4, 8), by: "عبدالله المواقر", textAr: "تم توكيل الشكوى إلى يزن النابلسي", textEn: "Assigned to Yazan Al-Nablusi" },
        { at: ago(1, 2), by: "عبدالله المواقر", textAr: "تم تأكيد حل الشكوى", textEn: "Complaint marked resolved" },
      ],
    },
  ];

  const notifications: Notification[] = [
    {
      id: "n1",
      to: "a-super",
      textAr: "طلب تفعيل حساب موظف: يوسف الجديد",
      textEn: "Employee activation pending: Youssef Al-Jadeed",
      at: ago(1, 4),
      read: false,
      link: "/dashboard/employees",
    },
    {
      id: "n2",
      to: "e1",
      textAr: "تم توكيلك بالشكوى MWQ-1002",
      textEn: "You were assigned complaint MWQ-1002",
      at: ago(1, 3),
      read: false,
      link: "/dashboard/complaints",
    },
  ];

  return {
    branches,
    libraries,
    accounts,
    complaints,
    notifications,
    sessionId: null,
  };
}

const KEY = "mwq.state.v12";
const SYNC_CHANNEL = "mwq.state.sync";

function mergeRemoteState(prev: State, incoming: State): State {
  return {
    ...incoming,
    sessionId: incoming.sessionId === null ? null : prev.sessionId,
  };
}

type Ctx = {
  state: State;
  me: Account | null;
  isSuper: boolean;
  login: (username: string, password: string) => Account | null;
  logout: () => void;
  addComplaint: (
    data: Omit<
      Complaint,
      | "id"
      | "ref"
      | "createdAt"
      | "status"
      | "assignedTo"
      | "readBy"
      | "employeeReport"
      | "resolution"
      | "resolvedBy"
      | "timeline"
    >,
  ) => string;
  markRead: (complaintId: string) => void;
  assignComplaint: (complaintId: string, employeeId: string) => void;
  submitEmployeeReport: (
    complaintId: string,
    outcome: EmployeeReportOutcome,
    note: string,
    coords: { lat: number; lng: number } | null,
  ) => void;
  approveComplaint: (complaintId: string) => void;
  returnComplaint: (complaintId: string, note: string, employeeId?: string) => void;
  deleteComplaint: (complaintId: string) => boolean;
  upsertEmployee: (a: Partial<Account> & { id?: string }) => void;
  updateSuperProfile: (data: {
    name: string;
    username: string;
    phone: string | null;
    currentPassword?: string;
    newPassword?: string;
  }) => "ok" | "wrong_password" | "username_taken" | "forbidden";
  removeEmployee: (id: string) => boolean;
  upsertBranch: (b: Partial<Branch> & { id?: string }) => void;
  removeBranch: (id: string) => void;
  upsertLibrary: (l: Partial<Library> & { id?: string }) => void;
  removeLibrary: (id: string) => void;
  myNotifications: Notification[];
  markNotificationsRead: () => void;
  activeEmployees: Account[];
  hydrated: boolean;
};

const StoreContext = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(() => seed());
  const [hydrated, setHydrated] = useState(false);
  const tabIdRef = useRef(uid());
  const applyingRemoteRef = useRef(false);
  const lastSyncPayloadRef = useRef("");
  const channelRef = useRef<BroadcastChannel | null>(null);

  const applyRemote = useCallback((raw: string) => {
    if (!raw || raw === lastSyncPayloadRef.current) return;
    try {
      const parsed = JSON.parse(raw) as State;
      applyingRemoteRef.current = true;
      lastSyncPayloadRef.current = raw;
      setState((prev) => mergeRemoteState(prev, parsed));
    } catch {
      /* ignore corrupt payloads */
    }
  }, []);

  const persistState = useCallback((next: State) => {
    const payload = JSON.stringify(next);
    lastSyncPayloadRef.current = payload;
    window.localStorage.setItem(KEY, payload);
    channelRef.current?.postMessage({
      type: "sync",
      payload,
      source: tabIdRef.current,
    });
  }, []);

  useEffect(() => {
    channelRef.current = new BroadcastChannel(SYNC_CHANNEL);
    return () => channelRef.current?.close();
  }, []);

  useEffect(() => {
    try {
      const raw =
        window.localStorage.getItem(KEY) ??
        window.localStorage.getItem("mwq.state.v11") ??
        window.localStorage.getItem("mwq.state.v10");
      const next = hydrateState(raw);
      if (raw) lastSyncPayloadRef.current = JSON.stringify(next);
      setState(next);
    } catch {
      setState(seed());
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const onStorage = (e: StorageEvent) => {
      if (e.key !== KEY || !e.newValue) return;
      applyRemote(e.newValue);
    };

    const onBroadcast = (e: MessageEvent<{ type?: string; payload?: string; source?: string }>) => {
      if (e.data?.type !== "sync" || !e.data.payload) return;
      if (e.data.source === tabIdRef.current) return;
      applyRemote(e.data.payload);
    };

    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      const raw = window.localStorage.getItem(KEY);
      if (raw) applyRemote(raw);
    };

    window.addEventListener("storage", onStorage);
    channelRef.current?.addEventListener("message", onBroadcast);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.removeEventListener("storage", onStorage);
      channelRef.current?.removeEventListener("message", onBroadcast);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [hydrated, applyRemote]);

  useEffect(() => {
    if (!hydrated) return;
    if (applyingRemoteRef.current) {
      applyingRemoteRef.current = false;
      return;
    }

    const payload = JSON.stringify(state);
    if (payload === lastSyncPayloadRef.current) return;

    lastSyncPayloadRef.current = payload;
    window.localStorage.setItem(KEY, payload);
    channelRef.current?.postMessage({
      type: "sync",
      payload,
      source: tabIdRef.current,
    });
  }, [state, hydrated]);

  const me = useMemo(
    () => state.accounts.find((a) => a.id === state.sessionId && a.active) ?? null,
    [state.accounts, state.sessionId],
  );

  const isSuper = me?.kind === "super";

  const activeEmployees = useMemo(
    () => state.accounts.filter((a) => a.kind === "employee" && a.active),
    [state.accounts],
  );

  const notify = (s: State, to: string[], textAr: string, textEn: string, link?: string): State => ({
    ...s,
    notifications: [
      ...to.map((id) => ({ id: uid(), to: id, textAr, textEn, at: now(), read: false, link })),
      ...s.notifications,
    ],
  });

  const patchComplaint = (
    id: string,
    fn: (c: Complaint, s: State) => { complaint: Complaint; notifyTo?: string[]; textAr?: string; textEn?: string },
  ) =>
    setState((s) => {
      const target = s.complaints.find((c) => c.id === id);
      if (!target) return s;
      const { complaint, notifyTo, textAr, textEn } = fn(target, s);
      let next: State = { ...s, complaints: s.complaints.map((c) => (c.id === id ? complaint : c)) };
      if (notifyTo?.length && textAr && textEn) {
        next = notify(next, notifyTo, textAr, textEn, "/dashboard/complaints");
      }
      return next;
    });

  const value: Ctx = {
    state,
    me,
    isSuper,
    login: (username, password) => {
      const found = state.accounts.find(
        (a) => a.username.toLowerCase() === username.trim().toLowerCase() && a.password === password,
      );
      if (!found || !found.active) return null;
      setState((s) => {
        const next = { ...s, sessionId: found.id };
        persistState(next);
        return next;
      });
      return found;
    },
    logout: () => {
      setState((s) => {
        const next = { ...s, sessionId: null };
        persistState(next);
        return next;
      });
    },
    addComplaint: (data) => {
      let newRef = "";
      setState((s) => {
        newRef = `MWQ-${1000 + s.complaints.length + 1}`;
        const complaint: Complaint = {
          ...data,
          id: uid(),
          ref: newRef,
          createdAt: now(),
          status: "new",
          assignedTo: null,
          readBy: [],
          employeeReport: null,
          resolution: null,
          resolvedBy: null,
          timeline: [
            { at: now(), by: data.createdByName, textAr: "تم تقديم الشكوى", textEn: "Complaint submitted" },
          ],
        };
        const supers = s.accounts.filter((a) => a.kind === "super" && a.active).map((a) => a.id);
        const branch = s.branches.find((b) => b.id === data.branchId);
        return notify(
          { ...s, complaints: [complaint, ...s.complaints] },
          supers,
          `شكوى جديدة ${newRef} — ${branch?.nameAr ?? ""}`,
          `New complaint ${newRef} — ${branch?.nameEn ?? ""}`,
          "/dashboard/complaints",
        );
      });
      return newRef;
    },
    markRead: (complaintId) =>
      patchComplaint(complaintId, (c) => {
        if (!me || c.readBy.includes(me.id)) return { complaint: c };
        return {
          complaint: {
            ...c,
            readBy: [...c.readBy, me.id],
            timeline: [
              ...c.timeline,
              { at: now(), by: me.name, textAr: "تم فتح الشكوى", textEn: "Complaint opened" },
            ],
          },
        };
      }),
    assignComplaint: (complaintId, employeeId) =>
      patchComplaint(complaintId, (c, s) => {
        if (c.status === "closed") return { complaint: c };
        const emp = s.accounts.find((a) => a.id === employeeId);
        const reassign = Boolean(c.assignedTo && c.assignedTo !== employeeId);
        return {
          complaint: {
            ...c,
            assignedTo: employeeId,
            status: "assigned",
            employeeReport: null,
            resolution: null,
            resolvedBy: null,
            timeline: [
              ...c.timeline,
              {
                at: now(),
                by: me?.name ?? "",
                textAr: reassign
                  ? `تم إعادة توكيل الشكوى إلى ${emp?.name ?? ""}`
                  : `تم توكيل الشكوى إلى ${emp?.name ?? ""}`,
                textEn: reassign
                  ? `Reassigned to ${emp?.name ?? ""}`
                  : `Assigned to ${emp?.name ?? ""}`,
              },
            ],
          },
          notifyTo: [employeeId],
          textAr: `تم توكيلك بالشكوى ${c.ref}`,
          textEn: `You were assigned complaint ${c.ref}`,
        };
      }),
    submitEmployeeReport: (complaintId, outcome, note, coords) =>
      patchComplaint(complaintId, (c, s) => {
        if (
          !me ||
          isSuper ||
          (c.status !== "assigned" && c.status !== "returned") ||
          c.assignedTo !== me.id
        ) {
          return { complaint: c };
        }
        const trimmed = note.trim();
        if (!trimmed) return { complaint: c };
        if (outcome === "resolved" && !coords) return { complaint: c };

        const report: EmployeeReport = {
          outcome,
          note: trimmed,
          lat: coords?.lat ?? null,
          lng: coords?.lng ?? null,
          at: now(),
          by: me.name,
          byId: me.id,
        };

        const resolution =
          outcome === "resolved" && coords
            ? { note: trimmed, lat: coords.lat, lng: coords.lng, at: now(), by: me.name }
            : null;

        const supers = s.accounts.filter((a) => a.kind === "super" && a.active).map((a) => a.id);

        return {
          complaint: {
            ...c,
            status: "pending_review",
            employeeReport: report,
            resolution,
            timeline: [
              ...c.timeline,
              {
                at: now(),
                by: me.name,
                textAr:
                  outcome === "resolved"
                    ? "أبلغ الموظف عن حل المشكلة — بانتظار المراجعة"
                    : "أبلغ الموظف بعدم حل المشكلة — بانتظار المراجعة",
                textEn:
                  outcome === "resolved"
                    ? "Employee reported resolution — pending review"
                    : "Employee reported unresolved — pending review",
              },
            ],
          },
          notifyTo: supers,
          textAr:
            outcome === "resolved"
              ? `تقرير حل — ${c.ref} — ${me.name}`
              : `تقرير عدم حل — ${c.ref} — ${me.name}`,
          textEn:
            outcome === "resolved"
              ? `Resolution report — ${c.ref} — ${me.name}`
              : `Unresolved report — ${c.ref} — ${me.name}`,
        };
      }),
    approveComplaint: (complaintId) =>
      patchComplaint(complaintId, (c) => {
        if (!isSuper || !me || c.status !== "pending_review" || !c.employeeReport) return { complaint: c };

        const report = c.employeeReport;
        const branchCoords = BRANCH_COORDS[c.branchId];
        const resolution =
          c.resolution ??
          (report.lat != null && report.lng != null
            ? { note: report.note, lat: report.lat, lng: report.lng, at: report.at, by: report.by }
            : {
                note: report.note,
                lat: branchCoords?.lat ?? 0,
                lng: branchCoords?.lng ?? 0,
                at: report.at,
                by: report.by,
              });

        return {
          complaint: {
            ...c,
            status: "closed",
            resolvedBy: me.id,
            resolution,
            timeline: [
              ...c.timeline,
              {
                at: now(),
                by: me.name,
                textAr: "تم اعتماد التقرير وإغلاق الشكوى",
                textEn: "Report approved and complaint closed",
              },
            ],
          },
          ...(c.assignedTo
            ? {
                notifyTo: [c.assignedTo],
                textAr: `تم إغلاق الشكوى ${c.ref}`,
                textEn: `Complaint ${c.ref} closed`,
              }
            : {}),
        };
      }),
    returnComplaint: (complaintId, note, employeeId) =>
      patchComplaint(complaintId, (c, s) => {
        if (!isSuper || !me || c.status !== "pending_review") return { complaint: c };
        const targetId = employeeId ?? c.assignedTo;
        if (!targetId) return { complaint: c };
        const emp = s.accounts.find((a) => a.id === targetId);
        const trimmed = note.trim();

        return {
          complaint: {
            ...c,
            status: "returned",
            assignedTo: targetId,
            employeeReport: null,
            resolution: null,
            resolvedBy: null,
            timeline: [
              ...c.timeline,
              {
                at: now(),
                by: me.name,
                textAr: trimmed
                  ? `أُعيدت الشكوى إلى ${emp?.name ?? ""}: ${trimmed}`
                  : `أُعيدت الشكوى إلى ${emp?.name ?? ""}`,
                textEn: trimmed
                  ? `Returned to ${emp?.name ?? ""}: ${trimmed}`
                  : `Returned to ${emp?.name ?? ""}`,
              },
            ],
          },
          notifyTo: [targetId],
          textAr: `أُعيدت إليك الشكوى ${c.ref}`,
          textEn: `Complaint ${c.ref} returned to you`,
        };
      }),
    deleteComplaint: (complaintId) => {
      if (!isSuper) return false;
      let ok = false;
      setState((s) => {
        if (!s.complaints.some((c) => c.id === complaintId)) return s;
        ok = true;
        return { ...s, complaints: s.complaints.filter((c) => c.id !== complaintId) };
      });
      return ok;
    },
    updateSuperProfile: (data) => {
      if (!me || me.kind !== "super") return "forbidden";
      const username = data.username.trim();
      const taken = state.accounts.some(
        (a) => a.id !== me.id && a.username.toLowerCase() === username.toLowerCase(),
      );
      if (taken) return "username_taken";
      if (data.newPassword) {
        if (!data.currentPassword || data.currentPassword !== me.password) return "wrong_password";
      }
      setState((s) => ({
        ...s,
        accounts: s.accounts.map((a) =>
          a.id === me.id
            ? {
                ...a,
                name: data.name.trim(),
                username,
                phone: data.phone,
                password: data.newPassword ?? a.password,
              }
            : a,
        ),
      }));
      return "ok";
    },
    upsertEmployee: (a) =>
      setState((s) => {
        if (a.id && s.accounts.some((x) => x.id === a.id)) {
          return {
            ...s,
            accounts: s.accounts.map((x) =>
              x.id === a.id
                ? {
                    ...x,
                    ...a,
                    kind: "employee" as const,
                    name: a.name ?? x.name,
                    username: a.username ?? x.username,
                    phone: a.phone ?? x.phone,
                    active: a.active ?? x.active,
                  }
                : x,
            ),
          };
        }
        const acc: Account = {
          id: uid(),
          username: a.username?.trim() ?? "",
          password: a.password ?? "222",
          name: a.name ?? "",
          phone: a.phone ?? null,
          kind: "employee",
          active: a.active ?? true,
          createdAt: now(),
        };
        return { ...s, accounts: [...s.accounts, acc] };
      }),
    removeEmployee: (id) => {
      let ok = false;
      setState((s) => {
        const target = s.accounts.find((a) => a.id === id);
        if (!target || target.kind !== "employee" || target.id === me?.id) return s;
        ok = true;
        return {
          ...s,
          accounts: s.accounts.filter((a) => a.id !== id),
          complaints: s.complaints.map((c) =>
            c.assignedTo === id
              ? {
                  ...c,
                  assignedTo: null,
                  employeeReport: null,
                  status:
                    c.status === "assigned" ||
                    c.status === "returned" ||
                    c.status === "pending_review"
                      ? "new"
                      : c.status,
                }
              : c,
          ),
        };
      });
      return ok;
    },
    upsertBranch: (b) =>
      setState((s) => {
        if (b.id && s.branches.some((x) => x.id === b.id)) {
          return { ...s, branches: s.branches.map((x) => (x.id === b.id ? { ...x, ...b } : x)) };
        }
        return {
          ...s,
          branches: [...s.branches, { id: uid(), nameAr: b.nameAr ?? "", nameEn: b.nameEn ?? "", city: b.city ?? "" }],
        };
      }),
    removeBranch: (id) =>
      setState((s) => ({
        ...s,
        branches: s.branches.filter((b) => b.id !== id),
        libraries: s.libraries.filter((l) => l.branchId !== id),
      })),
    upsertLibrary: (l) =>
      setState((s) => {
        if (l.id && s.libraries.some((x) => x.id === l.id)) {
          return { ...s, libraries: s.libraries.map((x) => (x.id === l.id ? { ...x, ...l } : x)) };
        }
        return {
          ...s,
          libraries: [
            ...s.libraries,
            {
              id: uid(),
              nameAr: l.nameAr ?? "",
              nameEn: l.nameEn ?? "",
              branchId: l.branchId ?? s.branches[0]?.id ?? "",
              address: l.address ?? "",
            },
          ],
        };
      }),
    removeLibrary: (id) => setState((s) => ({ ...s, libraries: s.libraries.filter((l) => l.id !== id) })),
    myNotifications: state.notifications.filter((n) => n.to === state.sessionId),
    markNotificationsRead: () =>
      setState((s) => ({
        ...s,
        notifications: s.notifications.map((n) => (n.to === s.sessionId ? { ...n, read: true } : n)),
      })),
    activeEmployees,
    hydrated,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export function visibleComplaints(ctx: Ctx): Complaint[] {
  const { state, me, isSuper } = ctx;
  if (!me) return [];
  if (isSuper) return state.complaints;
  return state.complaints.filter((c) => c.assignedTo === me.id);
}

export function assignableEmployees(ctx: Ctx): Account[] {
  return ctx.activeEmployees;
}

/** For field employees: map internal status to simplified labels. */
export function employeeDisplayStatus(
  status: ComplaintStatus,
  reportOutcome?: EmployeeReportOutcome | null,
): "assigned" | "returned" | "pending_review" | "unresolved" | "closed" {
  if (status === "closed") return "closed";
  if (status === "pending_review") {
    return reportOutcome === "unresolved" ? "unresolved" : "pending_review";
  }
  if (status === "returned") return "returned";
  return "assigned";
}

export function matchesEmployeeStatusFilter(
  complaint: Complaint,
  filter: ComplaintStatus | "all",
): boolean {
  if (filter === "all") return true;
  if (filter === "closed") return complaint.status === "closed";
  if (filter === "pending_review") return complaint.status === "pending_review";
  if (filter === "returned") return complaint.status === "returned";
  if (filter === "assigned" || filter === "new") return complaint.status === "assigned";
  return complaint.status === filter;
}

export function countEmployeeStatusFilter(
  complaints: Complaint[],
  filter: ComplaintStatus | "all",
): number {
  if (filter === "all") return complaints.length;
  return complaints.filter((c) => matchesEmployeeStatusFilter(c, filter)).length;
}
