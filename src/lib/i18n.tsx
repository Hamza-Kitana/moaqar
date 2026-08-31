import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Lang = "ar" | "en";

const dict = {
  brand: { ar: "شركة الموقر التجارية", en: "Al-Muwaqar Trading Co." },
  tagline: {
    ar: "توريد وتجهيز المؤسسات في جميع أنحاء المملكة",
    en: "Supplying and equipping institutions across Jordan",
  },
  heroTitle: {
    ar: "شركة الموقر التجارية",
    en: "Al-Muwaqar Trading Co.",
  },
  heroSubtitle: {
    ar: "شريككم في توريد وتجهيز المؤسسات",
    en: "Your partner in institution supply and fit-out",
  },
  heroBody: {
    ar: "توريد أثاث وقرطاسية وأجهزة للمؤسسات — مدارس، جامعات، مراكز، وغيرها — مع فرق ميدانية في عمان وعجلون وإربد.",
    en: "Furniture, stationery, and equipment for institutions — schools, universities, centres, and more — with field teams in Amman, Ajloun, and Irbid.",
  },
  heroStat1: { ar: "تغطية وطنية", en: "Nationwide coverage" },
  heroStat1Desc: {
    ar: "نخدم المؤسسات في جميع محافظات المملكة الأردنية",
    en: "We serve institutions across all governorates of Jordan",
  },
  heroStat2: { ar: "3 مناطق", en: "3 regions" },
  heroStat2Desc: {
    ar: "فروعنا وفرقنا في عمان وعجلون وإربد",
    en: "Our branches and teams in Amman, Ajloun, and Irbid",
  },
  heroStat3: { ar: "فريق متخصص", en: "Expert team" },
  heroStat3Desc: {
    ar: "كوادر مدربة على توريد وتجهيز المؤسسات باحتراف",
    en: "Staff trained in professional institution supply and fit-out",
  },
  servicesIntro: {
    ar: "خدماتنا للمؤسسات",
    en: "Our institution services",
  },
  servicesIntroDesc: {
    ar: "من التوريد إلى التركيب — حلول متكاملة بجودة عالية",
    en: "From supply to installation — integrated, high-quality solutions",
  },
  aboutBody: {
    ar: "شركة أردنية متخصصة بتوريد وتجهيز المؤسسات، بشبكة فروع وفرق ميدانية تضمن جودة التسليم والمتابعة.",
    en: "A Jordanian company specialised in institution supply and fit-out, with branch coverage and field teams ensuring quality delivery and follow-up.",
  },
  homeService1Title: { ar: "توريد وتجهيز", en: "Supply & fit-out" },
  homeService1Body: {
    ar: "نوفر الأثاث والقرطاسية والأجهزة بمواصفات تناسب احتياج كل مؤسسة.",
    en: "We provide furniture, stationery, and equipment tailored to each institution’s needs.",
  },
  homeService2Title: { ar: "تركيب وتسليم", en: "Install & deliver" },
  homeService2Body: {
    ar: "نركّب ونسلّم في موقع المؤسسة وفق جدول واضح — بدون تعطيل العمل.",
    en: "We install and deliver on-site on a clear schedule — without disrupting operations.",
  },
  homeService3Title: { ar: "فريق ميداني", en: "Field teams" },
  homeService3Body: {
    ar: "فرقنا في الميدان تتابع التجهيز وتضمن جودة التنفيذ في كل منطقة.",
    en: "Our field teams oversee fit-out and ensure quality execution in every region.",
  },
  homeStep1Desc: {
    ar: "نحدّد احتياج المؤسسة ونقترح الحلول المناسبة",
    en: "We assess the institution’s needs and propose the right solutions",
  },
  homeStep2Desc: {
    ar: "نوصّل ونركّب في موقع المؤسسة باحترافية",
    en: "We deliver and install on-site professionally",
  },
  homeStep3Desc: {
    ar: "نتابع بعد التسليم وندعمكم عند الحاجة",
    en: "We follow up after delivery and support you when needed",
  },
  homeAboutPoint1: {
    ar: "خبرة في توريد وتجهيز المؤسسات",
    en: "Experienced in institution supply and fit-out",
  },
  homeAboutPoint2: {
    ar: "تغطية لثلاث مناطق في المملكة",
    en: "Coverage across three regions in Jordan",
  },
  homeAboutPoint3: {
    ar: "فريق ميداني ومتابعة بعد التسليم",
    en: "Field teams and post-delivery follow-up",
  },
  submitComplaint: { ar: "تقديم شكوى", en: "Submit a complaint" },
  submitComplaintDesc: {
    ar: "بدون تسجيل دخول — أدخل معلوماتك، اختر المؤسسة، اكتب الشكوى، وارفع صوراً إن رغبت.",
    en: "No login needed — enter your details, pick the institution, describe the issue, and attach photos if you want.",
  },
  complainantInfo: { ar: "معلوماتك", en: "Your details" },
  libraryLocationHint: {
    ar: "اختر المؤسسة المعنية — موقعها يُحدَّد تلقائياً",
    en: "Pick the relevant institution — its location is set automatically",
  },
  branchInstitutionRequired: {
    ar: "يرجى اختيار المنطقة والمؤسسة",
    en: "Please select region and institution",
  },
  nameRequired: { ar: "يرجى إدخال الاسم", en: "Please enter your name" },
  phoneRequired: { ar: "يرجى إدخال رقم الهاتف", en: "Please enter your phone number" },
  complaintSentRef: {
    ar: "تم إرسال الشكوى — الرقم المرجعي:",
    en: "Complaint sent — reference:",
  },
  login: { ar: "تسجيل الدخول", en: "Sign in" },
  logout: { ar: "تسجيل الخروج", en: "Sign out" },
  username: { ar: "اسم المستخدم", en: "Username" },
  password: { ar: "كلمة المرور", en: "Password" },
  invalidLogin: { ar: "بيانات الدخول غير صحيحة", en: "Invalid credentials" },
  welcome: { ar: "مرحباً", en: "Welcome" },
  dashboard: { ar: "لوحة التحكم", en: "Dashboard" },
  more: { ar: "المزيد", en: "More" },
  overview: { ar: "نظرة عامة", en: "Overview" },
  complaints: { ar: "الشكاوى", en: "Complaints" },
  myTasks: { ar: "مهامي", en: "My tasks" },
  employees: { ar: "الموظفون", en: "Employees" },
  actions: { ar: "إجراءات", en: "Actions" },
  branches: { ar: "الفروع والمؤسسات", en: "Branches & institutions" },
  reports: { ar: "التقارير", en: "Reports" },
  monthlyReport: { ar: "تقرير الشهر", en: "Monthly report" },
  monthlyReportDesc: {
    ar: "تقرير شهري — الكل أو موظف محدد — اطبعه أو احفظه PDF",
    en: "Monthly report — all staff or one employee — print or save as PDF",
  },
  reportScope: { ar: "نطاق التقرير", en: "Report scope" },
  reportScopeAll: { ar: "الكل", en: "All" },
  reportScopeEmployee: { ar: "حسب الموظف", en: "By employee" },
  selectEmployee: { ar: "اختر الموظف", en: "Select employee" },
  reportFor: { ar: "التقرير لـ", en: "Report for" },
  printPdf: { ar: "طباعة PDF", en: "Print PDF" },
  preparedBy: { ar: "أعدّه", en: "Prepared by" },
  reportPeriod: { ar: "الفترة", en: "Period" },
  generatedAt: { ar: "تاريخ الإصدار", en: "Generated at" },
  reportSummary: { ar: "ملخص الشهر", en: "Month summary" },
  createdThisMonth: { ar: "شكاوى جديدة", en: "New complaints" },
  resolvedThisMonth: { ar: "تم حلها", en: "Resolved" },
  stillOpen: { ar: "ما زالت مفتوحة", en: "Still open" },
  statusBreakdown: { ar: "حسب الحالة", en: "By status" },
  teamPerformance: { ar: "أداء الفريق", en: "Team performance" },
  assignedCount: { ar: "موكلة", en: "Assigned" },
  complaintsInPeriod: { ar: "شكاوى الفترة", en: "Period complaints" },
  noReportData: { ar: "لا توجد شكاوى في هذا الشهر", en: "No complaints in this month" },
  reportFooter: {
    ar: "تقرير رسمي من شركة الموقر التجارية — للاستخدام الداخلي",
    en: "Official report from Al-Muwaqar Trading Co. — internal use",
  },
  reportSuperOnly: {
    ar: "التقارير متاحة للسوبر أدمن فقط",
    en: "Reports are available to super admin only",
  },
  branchesPageDesc: {
    ar: "إدارة المناطق والمؤسسات التابعة لها",
    en: "Manage regions and their client institutions",
  },
  loginDesc: {
    ar: "دخول السوبر أدمن أو الموظفين الميدانيين",
    en: "Sign in as super admin or field employee",
  },
  superAdmin: { ar: "سوبر أدمن", en: "Super admin" },
  employeeRole: { ar: "موظف ميداني", en: "Field employee" },
  superOnly: { ar: "للسوبر أدمن فقط", en: "Super admin only" },
  settings: { ar: "الإعدادات", en: "Settings" },
  settingsPageDesc: {
    ar: "إعدادات حساب السوبر أدمن — الاسم، اسم المستخدم، الهاتف، وكلمة المرور",
    en: "Super admin account settings — name, username, phone, and password",
  },
  accountSettings: { ar: "بيانات الحساب", en: "Account details" },
  changePassword: { ar: "تغيير كلمة المرور", en: "Change password" },
  changePasswordDesc: {
    ar: "اترك الحقول فارغة إذا لا تريد تغيير كلمة المرور",
    en: "Leave blank if you don't want to change your password",
  },
  currentPassword: { ar: "كلمة المرور الحالية", en: "Current password" },
  newPassword: { ar: "كلمة المرور الجديدة", en: "New password" },
  confirmPassword: { ar: "تأكيد كلمة المرور", en: "Confirm password" },
  passwordMismatch: { ar: "كلمتا المرور غير متطابقتين", en: "Passwords do not match" },
  passwordTooShort: { ar: "كلمة المرور قصيرة جداً", en: "Password is too short" },
  wrongCurrentPassword: { ar: "كلمة المرور الحالية غير صحيحة", en: "Current password is incorrect" },
  usernameTaken: { ar: "اسم المستخدم مستخدم مسبقاً", en: "Username is already taken" },
  profileUpdated: { ar: "تم تحديث الإعدادات بنجاح", en: "Settings updated successfully" },
  settingsRequired: { ar: "يرجى إكمال الحقول المطلوبة", en: "Please complete the required fields" },
  notifications: { ar: "الإشعارات", en: "Notifications" },
  noNotifications: { ar: "لا إشعارات", en: "No notifications" },
  markAllRead: { ar: "تحديد الكل كمقروء", en: "Mark all read" },
  library: { ar: "المؤسسة", en: "Institution" },
  branch: { ar: "الفرع", en: "Branch" },
  location: { ar: "الموقع", en: "Location" },
  problemLocation: { ar: "موقع المشكلة", en: "Problem location" },
  employeeLocation: { ar: "موقع الموظف", en: "Employee location" },
  noCoords: { ar: "لم يُرفق موقع بعد", en: "No location attached yet" },
  approxLocation: { ar: "تقريبي حسب الفرع", en: "Approximate by branch" },
  awaitingEmployeeVisit: {
    ar: "بانتظار زيارة الموظف وإرفاق موقعه",
    en: "Waiting for the employee visit & location",
  },
  notes: { ar: "الملاحظات / الشكوى", en: "Notes / complaint" },
  images: { ar: "الصور (اختياري)", en: "Images (optional)" },
  send: { ar: "إرسال", en: "Send" },
  save: { ar: "حفظ", en: "Save" },
  cancel: { ar: "إلغاء", en: "Cancel" },
  delete: { ar: "حذف", en: "Delete" },
  confirmDelete: { ar: "نعم، احذف", en: "Yes, delete" },
  confirmDeleteTitle: { ar: "تأكيد الحذف", en: "Confirm deletion" },
  deleteEmployeeConfirm: {
    ar: "سيتم حذف حساب هذا الموظف نهائياً. الشكاوى الموكّلة له ستُعاد كجديدة.",
    en: "This employee account will be permanently removed. Their assigned complaints will become unassigned.",
  },
  deleteBranchConfirm: {
    ar: "سيتم حذف هذه المنطقة وجميع المؤسسات التابعة لها. لا يمكن التراجع.",
    en: "This region and all its institutions will be permanently deleted. This cannot be undone.",
  },
  deleteLibraryConfirm: {
    ar: "سيتم حذف هذه المؤسسة نهائياً. لا يمكن التراجع.",
    en: "This institution will be permanently deleted. This cannot be undone.",
  },
  deleteFailed: { ar: "تعذّر الحذف", en: "Could not delete" },
  name: { ar: "الاسم", en: "Name" },
  status: { ar: "الحالة", en: "Status" },
  createdAt: { ar: "تاريخ الإنشاء", en: "Created" },
  assignedTo: { ar: "المكلّف", en: "Assigned to" },
  assignedEmployee: { ar: "الموظف المستلم", en: "Assigned employee" },
  unassigned: { ar: "غير موكلة", en: "Unassigned" },
  changeAssignee: { ar: "تغيير المكلّف", en: "Change assignee" },
  superClose: { ar: "إغلاق الشكوى", en: "Close complaint" },
  superCloseOnly: {
    ar: "إغلاق الشكوى نهائياً من السوبر أدمن فقط",
    en: "Only the super admin can fully close complaints",
  },
  assign: { ar: "توكيل", en: "Assign" },
  timeline: { ar: "سجل الإجراءات", en: "Activity log" },
  resolutionNote: { ar: "ما تم عمله لحل المشكلة", en: "What was done to resolve it" },
  attachLocation: { ar: "إرفاق موقعي الحالي", en: "Attach my current location" },
  locatingPosition: { ar: "جاري تحديد الموقع...", en: "Getting your location..." },
  locatingPositionHint: {
    ar: "قد يستغرق بضع ثوانٍ — تأكد من تفعيل GPS",
    en: "This may take a few seconds — ensure GPS is enabled",
  },
  locationCaptured: { ar: "تم تسجيل الموقع", en: "Location captured" },
  st_new: { ar: "جديدة", en: "New" },
  st_assigned: { ar: "موكلة", en: "Assigned" },
  st_resolved: { ar: "تم الحل", en: "Resolved" },
  addEmployee: { ar: "إضافة موظف", en: "Add employee" },
  addBranch: { ar: "إضافة منطقة", en: "Add region" },
  editBranch: { ar: "تعديل منطقة", en: "Edit region" },
  addBranchDesc: { ar: "أدخل اسم المنطقة بالعربي والإنجليزي والمدينة.", en: "Enter the region name in Arabic and English, plus the city." },
  editBranchDesc: { ar: "حدّث بيانات المنطقة.", en: "Update this region's details." },
  addLibrary: { ar: "إضافة مؤسسة", en: "Add institution" },
  editLibrary: { ar: "تعديل مؤسسة", en: "Edit institution" },
  addLibraryDesc: { ar: "أدخل بيانات المؤسسة واربطها بالمنطقة.", en: "Enter institution details and link it to a region." },
  editLibraryDesc: { ar: "حدّث بيانات المؤسسة.", en: "Update this institution's details." },
  nameArLabel: { ar: "الاسم (عربي)", en: "Name (AR)" },
  nameEnLabel: { ar: "الاسم (English)", en: "Name (EN)" },
  cityLabel: { ar: "المدينة", en: "City" },
  editEmployee: { ar: "تعديل موظف", en: "Edit employee" },
  editEmployeeDesc: {
    ar: "حدّث بيانات الموظف وحالة تفعيل الحساب.",
    en: "Update this employee's details and account status.",
  },
  addEmployeeDesc: {
    ar: "أدخل بيانات الموظف. يمكنك تفعيل الحساب أو تركه غير مفعّل.",
    en: "Enter employee details. You can activate the account or leave it inactive.",
  },
  employeeActiveHint: {
    ar: "عند التفعيل يمكن للموظف تسجيل الدخول",
    en: "When enabled, the employee can sign in",
  },
  employeesPageDesc: {
    ar: "الموظفون الميدانيون — أضفهم ووزّع الشكاوى عليهم حسب كل مشكلة",
    en: "Field staff — add employees and assign complaints to them per issue",
  },
  inactive: { ar: "غير مفعّل", en: "Inactive" },
  noActiveEmployees: { ar: "لا يوجد موظفون مفعّلون", en: "No active employees" },
  active: { ar: "مفعّل", en: "Active" },
  total: { ar: "الإجمالي", en: "Total" },
  language: { ar: "English", en: "العربية" },
  toggleTheme: { ar: "تغيير المظهر", en: "Toggle theme" },
  themeLight: { ar: "فاتح", en: "Light" },
  themeDark: { ar: "داكن", en: "Dark" },
  demoAccounts: { ar: "حسابات تجريبية", en: "Demo accounts" },
  noData: { ar: "لا توجد بيانات", en: "No data" },
  about: { ar: "عن الشركة", en: "About" },
  services: { ar: "خدماتنا", en: "Services" },
  contact: { ar: "اتصل بنا", en: "Contact" },
  searchComplaintsPh: {
    ar: "ابحث بالرقم، المنطقة، المؤسسة، الموقع...",
    en: "Search by ref, region, institution, location...",
  },
  visitProof: { ar: "إثبات الزيارة", en: "Visit proof" },
  employeeName: { ar: "اسم الموظف", en: "Employee" },
  homeWorkflow: { ar: "كيف نعمل", en: "How we work" },
  homeWorkflowDesc: {
    ar: "من الطلب إلى التسليم — ثلاث مراحل لخدمة المؤسسات",
    en: "From order to delivery — three stages serving institutions",
  },
  homeStep1: { ar: "الاستشارة والتوريد", en: "Consult & supply" },
  homeStep2: { ar: "التركيب والتسليم", en: "Install & deliver" },
  homeStep3: { ar: "المتابعة والدعم", en: "Follow-up & support" },
  homeContactUs: { ar: "تواصل معنا", en: "Contact us" },
  workflow: { ar: "دورة العمل", en: "Workflow" },
  workflowHint: {
    ar: "توكيل موظف → متابعة ميدانية → إغلاق من السوبر أدمن",
    en: "Assign employee → field follow-up → closed by super admin",
  },
  openTasksLabel: { ar: "مهام مفتوحة", en: "Open tasks" },
  totalAssignedLabel: { ar: "إجمالي المهام الموكلة", en: "Assigned tasks" },
  resolvedTasksLabel: { ar: "تم حلها", en: "Resolved" },
  openComplaintsTitle: { ar: "شكاوى مفتوحة", en: "Open complaints" },
  recentComplaints: { ar: "آخر الشكاوى", en: "Recent complaints" },
  filterAll: { ar: "الكل", en: "All" },
  allRegions: { ar: "كل المناطق", en: "All regions" },
  region: { ar: "المنطقة", en: "Region" },
  openComplaints: { ar: "مفتوحة", en: "Open" },
  noComplaintsInRegion: { ar: "لا شكاوى في هذه المنطقة", en: "No complaints in this region" },
  back: { ar: "رجوع", en: "Back" },
  refNo: { ar: "الرقم المرجعي", en: "Reference" },
  viewOnMap: { ar: "عرض على الخريطة", en: "View on map" },
  photos: { ar: "الصور المرفقة", en: "Attached photos" },
  selectBranch: { ar: "اختر الفرع", en: "Select branch" },
  selectLibrary: { ar: "اختر المؤسسة", en: "Select institution" },
  homeContactIntro: {
    ar: "تواصل معنا — فريقنا جاهز لخدمة مؤسستكم",
    en: "Get in touch — our team is ready to serve your institution",
  },
  imageHint: { ar: "اسحب الصور هنا أو انقر للاختيار", en: "Drag images here or click to browse" },
  notFound: { ar: "الصفحة غير موجودة", en: "Page not found" },
  notFoundDesc: { ar: "الصفحة التي تبحث عنها غير موجودة أو نُقلت.", en: "The page you're looking for doesn't exist or was moved." },
  goHome: { ar: "العودة للرئيسية", en: "Go home" },
  tryAgain: { ar: "حاول مجدداً", en: "Try again" },
  errorTitle: { ar: "تعذّر تحميل الصفحة", en: "This page didn't load" },
  errorDesc: { ar: "حدث خطأ. يمكنك التحديث أو العودة للرئيسية.", en: "Something went wrong. You can refresh or go home." },
  complainant: { ar: "المشتكي", en: "Complainant" },
  phone: { ar: "رقم الهاتف", en: "Phone" },
  noPhone: { ar: "لا يوجد رقم", en: "No phone" },
  contactPhone: { ar: "079 000 0000", en: "+962 79 000 0000" },
  contactEmail: { ar: "info@muwaqar.jo", en: "info@muwaqar.jo" },
  contactAddress: { ar: "عمان — الأردن", en: "Amman — Jordan" },
  loading: { ar: "جاري التحميل...", en: "Loading..." },
  loadingDesc: {
    ar: "توريد وتجهيز المؤسسات في جميع أنحاء المملكة",
    en: "Supplying and equipping institutions across Jordan",
  },
} as const;

export type TKey = keyof typeof dict;

type Ctx = { lang: Lang; dir: "rtl" | "ltr"; t: (k: TKey) => string; toggle: () => void };

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    const saved = window.localStorage.getItem("mwq.lang");
    if (saved === "ar" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("mwq.lang", lang);
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      t: (k) => dict[k]?.[lang] ?? String(k),
      toggle: () => setLang((l) => (l === "ar" ? "en" : "ar")),
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
