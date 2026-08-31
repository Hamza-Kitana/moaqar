import { createFileRoute, Link } from "@tanstack/react-router";
import { KeyRound, Shield, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { t } = useI18n();
  const { me, isSuper, updateSuperProfile } = useStore();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!me) return;
    setName(me.name);
    setUsername(me.username);
    setPhone(me.phone ?? "");
  }, [me]);

  if (!me || !isSuper) {
    return (
      <div className="rise-in surface rounded-2xl p-10 text-center">
        <p className="text-sm text-muted-foreground">{t("superOnly")}</p>
        <Button asChild className="mt-4" variant="secondary">
          <Link to="/dashboard">{t("back")}</Link>
        </Button>
      </div>
    );
  }

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !username.trim()) {
      toast.error(t("settingsRequired"));
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      toast.error(t("passwordMismatch"));
      return;
    }
    if (newPassword && newPassword.length < 3) {
      toast.error(t("passwordTooShort"));
      return;
    }

    const result = updateSuperProfile({
      name: name.trim(),
      username: username.trim(),
      phone: phone.trim() || null,
      currentPassword: newPassword ? currentPassword : undefined,
      newPassword: newPassword || undefined,
    });

    if (result === "username_taken") {
      toast.error(t("usernameTaken"));
      return;
    }
    if (result === "wrong_password") {
      toast.error(t("wrongCurrentPassword"));
      return;
    }
    if (result === "forbidden") {
      toast.error(t("superOnly"));
      return;
    }

    toast.success(t("profileUpdated"));
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="rise-in mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">{t("settings")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("settingsPageDesc")}</p>
      </div>

      <form onSubmit={saveProfile} className="space-y-6">
        <section className="surface space-y-4 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-2 border-b border-border/60 pb-3">
            <User className="size-4 text-primary" />
            <h2 className="text-sm font-bold">{t("accountSettings")}</h2>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-primary/5 px-3 py-2.5 ring-1 ring-primary/15">
            <Shield className="size-4 shrink-0 text-primary" />
            <div>
              <p className="text-xs font-semibold">{t("superAdmin")}</p>
              <p className="text-[11px] text-muted-foreground">{me.id}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="settings-name">{t("name")}</Label>
              <Input
                id="settings-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="settings-username">{t("username")}</Label>
              <Input
                id="settings-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                dir="ltr"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="settings-phone">{t("phone")}</Label>
              <Input
                id="settings-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07XXXXXXXX"
                dir="ltr"
              />
            </div>
          </div>
        </section>

        <section className="surface space-y-4 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-2 border-b border-border/60 pb-3">
            <KeyRound className="size-4 text-primary" />
            <h2 className="text-sm font-bold">{t("changePassword")}</h2>
          </div>
          <p className="text-xs text-muted-foreground">{t("changePasswordDesc")}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="settings-current-pw">{t("currentPassword")}</Label>
              <Input
                id="settings-current-pw"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="settings-new-pw">{t("newPassword")}</Label>
              <Input
                id="settings-new-pw"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="settings-confirm-pw">{t("confirmPassword")}</Label>
              <Input
                id="settings-confirm-pw"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-2">
          <Button type="submit" size="lg">
            {t("save")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setName(me.name);
              setUsername(me.username);
              setPhone(me.phone ?? "");
              setCurrentPassword("");
              setNewPassword("");
              setConfirmPassword("");
            }}
          >
            {t("cancel")}
          </Button>
        </div>
      </form>
    </div>
  );
}
