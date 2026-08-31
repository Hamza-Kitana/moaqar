import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { useAuthDialog } from "@/components/site/AuthDialog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول | شركة الموقر التجارية" },
      { name: "description", content: "دخول السوبر أدمن والموظفين إلى لوحة تحكم شركة الموقر التجارية." },
    ],
  }),
  component: LoginRedirect,
});

function LoginRedirect() {
  const { me } = useStore();
  const { openLogin } = useAuthDialog();

  useEffect(() => {
    if (!me) openLogin();
  }, [me, openLogin]);

  if (me) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Navigate to="/" replace />;
}
