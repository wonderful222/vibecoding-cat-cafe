import Image from "next/image";
import { Link } from "@/components/common/AppLink";
import { SmoothScrollLink } from "@/components/common/SmoothScrollLink";
import { AppShell } from "@/components/common/AppShell";
import { CatCard } from "@/components/business/CatCard";
import { cats } from "@/data/cats";

const quickActions = [
  {
    href: "#available-cats",
    title: "快速预约",
    subtitle: "APPOINTMENT",
    icon: "/images/ui/quick-appointment.svg",
    iconSize: 70,
    ariaLabel: "快速查看现在有空的猫咪"
  },
  {
    href: "/cats",
    title: "认识更多",
    subtitle: "MEET MORE",
    icon: "/images/ui/quick-meet-more.svg",
    iconSize: 78,
    ariaLabel: "浏览全部陪伴猫"
  }
];

const homeCats = cats.filter((cat) => ["nuomi", "xueqiu"].includes(cat.id));

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
          <div aria-hidden="true" className="h-8 rounded-b-[24px] bg-primary" />
        </section>

        <section className="relative z-10 mx-5 -mt-12 rounded-[24px] bg-card p-5 shadow-card">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[22px] font-semibold leading-[30px] text-foreground">今天也欢迎你</p>
              <span
                aria-hidden="true"
                className="h-7 w-7 bg-primary"
                style={{
                  WebkitMask: "url(/images/ui/paw-accent.svg) center / contain no-repeat",
                  mask: "url(/images/ui/paw-accent.svg) center / contain no-repeat"
                }}
              />
            </div>
            <h1 className="mt-2 text-[16px] leading-6 text-muted-foreground">
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
                  className="flex min-h-[166px] flex-col items-center justify-center rounded-[24px] bg-primary px-3 py-5 text-center text-foreground transition duration-150 active:scale-[0.98]"
                >
                  <span className="flex h-[86px] w-[100px] items-center justify-center">
                    <Image
                      src={action.icon}
                      alt=""
                      aria-hidden="true"
                      width={action.iconSize}
                      height={action.iconSize}
                      className="max-w-none object-contain"
                    />
                  </span>
                  <span className="mt-3 text-[22px] font-semibold leading-[30px]">{action.title}</span>
                  <span className="mt-1 text-[14px] font-semibold leading-5">{action.subtitle}</span>
                </ActionLink>
              );
            })}
          </div>
        </section>

        <section id="available-cats" className="mx-5 mt-5 rounded-[24px] bg-card p-5 shadow-card scroll-mt-6">
          <div>
            <p className="text-[14px] leading-5 text-muted-foreground">陪伴猫选项卡</p>
            <h2 className="mt-1 text-[20px] font-medium leading-7 text-foreground">现在有空的猫咪</h2>
          </div>

          <div className="mt-5 space-y-4">
            {homeCats.map((cat) => (
              <CatCard key={cat.id} cat={cat} />
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
