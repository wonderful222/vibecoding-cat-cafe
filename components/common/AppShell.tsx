import type { ReactNode } from "react";
import { BottomNavigation } from "@/components/common/BottomNavigation";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-dvh w-full overflow-x-hidden bg-background">
      <div className="mx-auto min-h-screen w-full max-w-[390px] bg-background pb-20">{children}</div>
      <BottomNavigation />
    </div>
  );
}
