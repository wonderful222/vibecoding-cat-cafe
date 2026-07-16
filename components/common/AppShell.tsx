import type { ReactNode } from "react";
import { BottomNavigation } from "@/components/common/BottomNavigation";

interface AppShellProps {
  children: ReactNode;
  showNavigation?: boolean;
}

export function AppShell({ children, showNavigation = true }: AppShellProps) {
  return (
    <div className="min-h-dvh w-full overflow-x-hidden bg-background">
      <div
        className={
          showNavigation
            ? "mx-auto min-h-screen w-full max-w-[390px] bg-background pb-20"
            : "mx-auto min-h-screen w-full max-w-[390px] bg-background"
        }
      >
        {children}
      </div>
      {showNavigation ? <BottomNavigation /> : null}
    </div>
  );
}
