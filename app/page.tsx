import Image from "next/image";
import { Link } from "@/components/common/AppLink";
import { SmoothScrollLink } from "@/components/common/SmoothScrollLink";
import { PawPrint } from "lucide-react";
import { AppShell } from "@/components/common/AppShell";
import { CatCard } from "@/components/business/CatCard";
import { cats } from "@/data/cats";

const quickActions = [
  {
    href: "#available-cats",
    title: "快速预约",
    subtitle: "APPOINTMENT",
    icon: "/images/quick-appointment.svg",
    iconSize: 62,
    ariaLabel: "快速预约今日推荐猫咪"
  },
  {
    href: "/cats",
    title: "认识更多",
    subtitle: "MEET MORE",
    icon: "/images/quick-meet-more.svg",
    iconSize: 88,
    ariaLabel: "浏览全部陪伴猫"
  }
];

export default function HomePage() {
  return (
    <AppShell>
      <main className="pb-8">
        <section className="relative">
          <div className="relative h-[309px] overflow-hidden bg-primary">
          <Image
            src="/images/home-cat-cafe-hero.png"
            alt="猫咖欢迎插画"
            fill
            priority
            sizes="390px"
            className="object-cover object-top"
          />
          </div>
          <div aria-hidden="true" className="h-8 rounded-b-[28px] bg-[#fdca18]" />
        </section>

        <section className="relative z-10 mx-5 -mt-12 rounded-[24px] bg-card p-5 shadow-card">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[22px] font-bold leading-snug text-foreground">今天也欢迎你</p>
              <PawPrint className="h-6 w-6 fill-primary text-primary" strokeWidth={2.4} />
            </div>
            <h1 className="mt-2 text-base leading-7 text-muted-foreground">
              先和一只小猫建立舒服的开始
            </h1>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const ActionLink = action.href.startsWith("#") ? SmoothScrollLink : Link;

              return (
                <ActionLink
                  key={action.href}
                  href={action.href}
                  aria-label={action.ariaLabel}
                  className="flex min-h-[142px] flex-col items-center justify-center rounded-[24px] bg-primary px-3 py-5 text-center text-foreground shadow-[0_10px_22px_rgba(254,200,31,0.24)] transition duration-150 active:scale-[0.98]"
                >
                  <span className="flex h-16 w-16 items-center justify-center">
                    <Image
                      src={action.icon}
                      alt=""
                      aria-hidden="true"
                      width={action.iconSize}
                      height={action.iconSize}
                      className="max-w-none object-contain"
                    />
                  </span>
                  <span className="mt-4 text-xl font-bold leading-none">{action.title}</span>
                  <span className="mt-2 text-[12px] font-black tracking-[0.04em]">
                    {action.subtitle}
                  </span>
                </ActionLink>
              );
            })}
          </div>
        </section>

        <section id="available-cats" className="mx-5 mt-5 rounded-[24px] bg-card p-5 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">陪伴猫选项卡</p>
              <h2 className="mt-1 text-xl font-semibold text-foreground">现在有空的猫咪</h2>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {cats.map((cat) => (
              <CatCard key={cat.id} cat={cat} actionLabel="逗逗我吧" />
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
