import { Link } from "@/components/common/AppLink";
import { CalendarDays, ChevronRight, Heart, Settings } from "lucide-react";
import { AppShell } from "@/components/common/AppShell";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const profileItems = [
  { href: "/reservations", label: "我的预约", icon: CalendarDays },
  { href: "/profile/favorites", label: "我的收藏", icon: Heart },
  { href: "/profile/settings", label: "基础设置", icon: Settings }
];

const summaryItems = [
  { href: "/reservations", value: "1", label: "待见面", ariaLabel: "查看我的预约" },
  { href: "/profile/favorites", value: "2", label: "心愿猫咪", ariaLabel: "查看我的收藏" }
];

export default function ProfilePage() {
  return (
    <AppShell>
      <main className="pb-8">
        <section className="rounded-b-[28px] bg-primary px-8 pb-6 pt-9">
          <div className="flex items-center gap-5">
            <Avatar
              src="/images/cat-xueqiu.svg"
              alt="用户头像"
              size="lg"
              className="h-16 w-16 bg-card ring-0"
            />
            <div>
              <h1 className="text-[24px] font-semibold leading-tight text-foreground">新手2004</h1>
              <p className="mt-2 text-sm font-normal leading-none text-muted-foreground">ID：18926154811</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {summaryItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.ariaLabel}
                className="block rounded-[20px] bg-card px-4 py-4 shadow-[0_8px_20px_rgba(58,58,58,0.05)] transition duration-150 active:scale-[0.99]"
              >
                <p className="text-2xl font-semibold leading-none text-foreground">{item.value}</p>
                <p className="mt-2 text-sm font-normal text-muted-foreground">{item.label}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-6 pt-5">
          <Card>
            <CardContent className="divide-y divide-border p-0">
              {profileItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex min-h-16 items-center justify-between px-5 py-4 transition duration-150 active:scale-[0.99]"
                    aria-label={item.label}
                  >
                    <span className="flex items-center gap-3 text-base font-medium text-foreground">
                      <Icon className="h-5 w-5 text-primary-strong" />
                      {item.label}
                    </span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </section>
      </main>
    </AppShell>
  );
}
