import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type ConfirmDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  itemName?: string;
  onConfirm: () => void;
  confirmLabel?: string;
};

export function ConfirmDeleteDialog({
  open,
  onOpenChange,
  title,
  description,
  itemName,
  onConfirm,
  confirmLabel,
}: ConfirmDeleteDialogProps) {
  const { t } = useI18n();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="dialog-mobile-full gap-0 overflow-hidden p-0 sm:max-w-md sm:rounded-3xl">
        <AlertDialogHeader className="space-y-0 border-b border-border/70 bg-secondary/40 px-6 py-5 text-start">
          <div className="flex items-start gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-destructive/12 text-destructive">
              <Trash2 className="size-5" />
            </span>
            <div className="min-w-0 space-y-1">
              <AlertDialogTitle className="text-base font-bold">{title}</AlertDialogTitle>
              <AlertDialogDescription className="text-sm leading-relaxed">{description}</AlertDialogDescription>
              {itemName ? (
                <p className="mt-2 rounded-xl border border-border/60 bg-background/80 px-3 py-2 text-sm font-semibold text-foreground">
                  {itemName}
                </p>
              ) : null}
            </div>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className={cn("gap-2 border-t border-border/60 px-6 py-4 sm:justify-end")}>
          <AlertDialogCancel className="h-11 rounded-xl touch-manipulation">{t("cancel")}</AlertDialogCancel>
          <Button
            type="button"
            variant="destructive"
            className="h-11 rounded-xl touch-manipulation"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {confirmLabel ?? t("confirmDelete")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
