import { createFileRoute } from "@tanstack/react-router";

import { EmployeesPanel } from "@/components/dashboard/EmployeesPanel";

export const Route = createFileRoute("/dashboard/employees")({
  component: EmployeesPage,
});

function EmployeesPage() {
  return <EmployeesPanel />;
}
