import { AuthShell } from "@/features/auth/components/AuthShell";
import { AuthTransition } from "./AuthTransition";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthShell>
      <AuthTransition>{children}</AuthTransition>
    </AuthShell>
  );
}
