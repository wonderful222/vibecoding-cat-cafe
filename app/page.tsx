import Image from "next/image";
import { Link } from "@/components/common/AppLink";
import { CalendarDays, Sparkles } from "lucide-react";
import { AppShell } from "@/components/common/AppShell";
import { CatCard } from "@/components/business/CatCard";
import { cats, todayCompanion } from "@/data/cats";

const quickActions = [
  {
    href: `/reserve/${todayCompanion.id}`,
    title: "快速预约",
    subtitle: "APPOINTMENT",
    icon: CalendarDays,
    ariaLabel: "快速预约今日推荐猫咪"
  },
  {
    href: "/cats",
    title: "认识更多",
    subtitle: "MEET MORE",
    icon: Sparkles,
    ariaLabel: "浏览全部陪伴猫"
  }
];

export default function HomePage() {
  return (
    <AppShell>
      <main className="pb-8">
        <section className="relative h-[336px] overflow-hidden bg-primary">
          <Image
            src="/images/home-cat-cafe-hero.png"
            alt="猫咖欢迎插画"
            fill
            priority
            sizes="390px"
            className="object-cover object-top"
          />
        </section>

        <section className="relative z-10 mx-5 -mt-9 rounded-[24px] bg-card p-5 shadow-card">
          <div>
            <p className="text-[22px] font-bold leading-snug text-foreground">今天也欢迎你</p>
            <h1 className="mt-2 text-base leading-7 text-muted-foreground">
              先和一只小猫建立舒服的开始
            </h1>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.href}
                  href={action.href}
                  aria-label={action.ariaLabel}
                  className="flex min-h-[132px] flex-col items-center justify-center rounded-[20px] border border-border bg-muted px-3 py-4 text-center transition duration-150 active:scale-[0.98]"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-primary text-foreground">
                    <Icon className="h-9 w-9" strokeWidth={2.2} />
                  </span>
                  <span className="mt-3 text-base font-bold leading-none text-foreground">{action.title}</span>
                  <span className="mt-2 text-[11px] font-bold tracking-[0.04em] text-muted-foreground">
                    {action.subtitle}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mx-5 mt-7 rounded-[24px] bg-card p-5 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">陪伴猫选项卡</p>
              <h2 className="mt-1 text-xl font-semibold text-foreground">今天想先认识谁</h2>
            </div>
            <Link href="/cats" className="text-sm font-semibold text-primary-strong" aria-label="查看全部猫咪">
              全部
            </Link>
          </div>

          <div className="mt-5 space-y-4">
            {cats.map((cat) => (
              <CatCard key={cat.id} cat={cat} actionLabel="查看详情" />
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
