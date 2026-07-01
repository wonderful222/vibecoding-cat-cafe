import { Link } from "@/components/common/AppLink";
import { CalendarDays, ChevronRight, Heart, Settings } from "lucide-react";
import { AppShell } from "@/components/common/AppShell";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const profileItems = [
  { href: "/reservations", label: "我的预约", icon: CalendarDays },
  { href: "/profile/favorites", label: "我的收藏", icon: Heart },
  { href: "/profile/settings", label: "基础设置", icon: Settings }
];

export default function ProfilePage() {
  return (
    <AppShell>
      <main className="space-y-6 px-6 pb-6 pt-8">
        <section className="flex items-center gap-4">
          <Avatar src="/images/cat-xueqiu.svg" alt="用户头像" size="lg" />
          <div>
            <p className="text-sm text-muted-foreground">我的</p>
            <h1 className="mt-1 text-2xl font-bold text-foreground">第一次来猫咖</h1>
          </div>
        </section>
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">1</p>
              <p className="mt-1 text-sm text-muted-foreground">待见面</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">2</p>
              <p className="mt-1 text-sm text-muted-foreground">心愿猫咪</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardContent className="divide-y divide-border p-0">
            {profileItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex min-h-14 items-center justify-between px-4 py-3 transition duration-150 active:scale-[0.99]"
                  aria-label={item.label}
                >
                  <span className="flex items-center gap-3 text-base font-semibold text-foreground">
                    <Icon className="h-5 w-5 text-primary-strong" />
                    {item.label}
                  </span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
              );
            })}
          </CardContent>
        </Card>
        <Button asChild className="w-full" aria-label="继续找陪伴猫">
          <Link href="/cats">继续找陪伴猫</Link>
        </Button>
      </main>
    </AppShell>
  );
}
