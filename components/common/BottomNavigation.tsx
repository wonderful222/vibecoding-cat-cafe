"use client";

import { Link } from "@/components/common/AppLink";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigationItems = [
  { href: "/", label: "首页", icon: "/images/ui/nav-home.svg" },
  { href: "/cats", label: "选猫", icon: "/images/ui/nav-cats.svg" },
  { href: "/reservations", label: "预约", icon: "/images/ui/nav-reservations.svg" },
  { href: "/profile", label: "我的", icon: "/images/ui/nav-profile.svg" }
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 bg-card/95 backdrop-blur">
      <div className="mx-auto grid h-16 w-full max-w-[390px] grid-cols-4 px-2 pb-[env(safe-area-inset-bottom)]">
        {navigationItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : item.href === "/reservations"
                ? pathname.startsWith("/reservations")
                : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={cn(
                "flex min-h-11 flex-col items-center justify-center gap-1 rounded-[16px] text-xs transition duration-150 active:scale-[0.98]",
                isActive ? "text-primary-strong" : "text-muted-foreground"
              )}
            >
              <span
                aria-hidden="true"
                className={cn("h-5 w-5 bg-current transition duration-150", isActive && "scale-[1.08]")}
                style={{
                  WebkitMask: `url(${item.icon}) center / contain no-repeat`,
                  mask: `url(${item.icon}) center / contain no-repeat`
                }}
              />
              <span className={cn(isActive ? "opacity-100" : "opacity-60")}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
