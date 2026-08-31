import { useNavigate } from "@tanstack/react-router";

import { ChevronDown, Lock } from "lucide-react";

import {

  createContext,

  useCallback,

  useContext,

  useMemo,

  useState,

  type ReactNode,

} from "react";

import { toast } from "sonner";



import { Button } from "@/components/ui/button";

import {

  Dialog,

  DialogContent,

  DialogDescription,

  DialogHeader,

  DialogTitle,

} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { useI18n } from "@/lib/i18n";

import { useStore } from "@/lib/store";

import { cn } from "@/lib/utils";



type AuthDialogCtx = {

  open: boolean;

  openLogin: () => void;

  closeLogin: () => void;

};



const AuthDialogContext = createContext<AuthDialogCtx | null>(null);



export function AuthDialogProvider({ children }: { children: ReactNode }) {

  const [open, setOpen] = useState(false);



  const openLogin = useCallback(() => setOpen(true), []);

  const closeLogin = useCallback(() => setOpen(false), []);



  const value = useMemo(

    () => ({ open, openLogin, closeLogin }),

    [open, openLogin, closeLogin],

  );



  return (

    <AuthDialogContext.Provider value={value}>

      {children}

      <AuthDialog open={open} onOpenChange={setOpen} />

    </AuthDialogContext.Provider>

  );

}



export function useAuthDialog() {

  const ctx = useContext(AuthDialogContext);

  if (!ctx) throw new Error("useAuthDialog must be used inside AuthDialogProvider");

  return ctx;

}



function AuthDialog({

  open,

  onOpenChange,

}: {

  open: boolean;

  onOpenChange: (open: boolean) => void;

}) {

  const { t } = useI18n();

  const { login } = useStore();

  const navigate = useNavigate();

  const [u, setU] = useState("");

  const [p, setP] = useState("");

  const [showDemo, setShowDemo] = useState(false);



  const reset = () => {

    setU("");

    setP("");

    setShowDemo(false);

  };



  return (

    <Dialog

      open={open}

      onOpenChange={(next) => {

        if (!next) reset();

        onOpenChange(next);

      }}

    >

      <DialogContent className="dialog-mobile-full flex max-h-[100dvh] max-w-md flex-col gap-0 overflow-hidden p-0 sm:max-w-md sm:rounded-3xl">

        <DialogHeader className="shrink-0 border-b border-border/70 bg-secondary/40 px-5 py-4 pe-14 sm:px-6 sm:py-5 sm:pe-12">

          <div className="flex items-center gap-3">

            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground">

              الم

            </span>

            <div className="min-w-0 space-y-1">

              <DialogTitle>{t("login")}</DialogTitle>

              <DialogDescription>{t("loginDesc")}</DialogDescription>

            </div>

          </div>

        </DialogHeader>



        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">

          <form

            className="space-y-4"

            onSubmit={(e) => {

              e.preventDefault();

              const acc = login(u, p);

              if (!acc) {

                toast.error(t("invalidLogin"));

                return;

              }

              toast.success(`${t("welcome")} ${acc.name}`);

              reset();

              onOpenChange(false);

              void navigate({ to: "/dashboard" });

            }}

          >

            <div className="space-y-1.5">

              <Label htmlFor="auth-u">{t("username")}</Label>

              <Input

                id="auth-u"

                value={u}

                onChange={(e) => setU(e.target.value)}

                autoComplete="username"

                className="h-11"

                required

              />

            </div>

            <div className="space-y-1.5">

              <Label htmlFor="auth-p">{t("password")}</Label>

              <Input

                id="auth-p"

                type="password"

                value={p}

                onChange={(e) => setP(e.target.value)}

                autoComplete="current-password"

                className="h-11"

                required

              />

            </div>

            <Button type="submit" className="h-11 w-full gap-2 touch-manipulation" size="lg">

              <Lock className="size-4" />

              {t("login")}

            </Button>

          </form>



          <div className="mt-5 rounded-2xl border border-border/70 bg-secondary/20">

            <button

              type="button"

              onClick={() => setShowDemo((v) => !v)}

              className="flex w-full items-center justify-between gap-2 px-4 py-3 text-start text-sm font-semibold touch-manipulation"

            >

              {t("demoAccounts")}

              <ChevronDown className={cn("size-4 shrink-0 transition-transform", showDemo && "rotate-180")} />

            </button>

            {showDemo && (

              <div className="border-t border-border/60 px-4 pb-4 pt-2 text-[11px] leading-relaxed text-muted-foreground">

                <div className="grid gap-1.5 sm:grid-cols-2">

                  <p>Sadmin / 222</p>

                  <p>s.momani / 222</p>

                  <p>k.maidani / 222</p>

                  <p>z.kurdi / 222</p>

                  <p>o.faouri / 222</p>

                  <p>l.hammoud / 222</p>

                  <p>y.nablusi / 222</p>

                  <p>n.din / 222</p>

                  <p>k.sarhan / 222</p>

                </div>

              </div>

            )}

          </div>

        </div>

      </DialogContent>

    </Dialog>

  );

}

