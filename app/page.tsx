import Image from "next/image";
import { Link } from "@/components/common/AppLink";
import { PawPrint } from "lucide-react";
import { AppShell } from "@/components/common/AppShell";
import { CatCard } from "@/components/business/CatCard";
import { cats, todayCompanion } from "@/data/cats";

function AppointmentIcon() {
  return (
    <svg viewBox="0 0 96 96" aria-hidden="true" className="h-[62px] w-[62px]">
      <rect
        x="17"
        y="22"
        width="62"
        height="58"
        rx="13"
        fill="white"
        stroke="currentColor"
        strokeWidth="8"
      />
      <path d="M18 39h60" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="8" />
      <path d="M34 15v17M62 15v17" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="9" />
      <circle cx="36" cy="54" r="5" fill="currentColor" />
      <circle cx="60" cy="54" r="5" fill="currentColor" />
      <circle cx="36" cy="68" r="5" fill="currentColor" />
      <circle cx="60" cy="68" r="5" fill="currentColor" />
    </svg>
  );
}

function MeetMoreIcon() {
  return (
    <svg viewBox="0 0 96 96" aria-hidden="true" className="h-[62px] w-[62px]">
      <path
        d="M50 15c4 17 11 26 28 30-17 4-24 13-28 30-4-17-11-26-28-30 17-4 24-13 28-30Z"
        fill="white"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="8"
      />
      <circle cx="24" cy="72" r="7" fill="white" stroke="currentColor" strokeWidth="8" />
      <path d="M75 17v17M66.5 25.5h17" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="7" />
    </svg>
  );
}

const quickActions = [
  {
    href: `/reserve/${todayCompanion.id}`,
    title: "快速预约",
    subtitle: "APPOINTMENT",
    icon: AppointmentIcon,
    ariaLabel: "快速预约今日推荐猫咪"
  },
  {
    href: "/cats",
    title: "认识更多",
    subtitle: "MEET MORE",
    icon: MeetMoreIcon,
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
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-7 bg-[#9b6e0d]" />
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
              const Icon = action.icon;

              return (
                <Link
                  key={action.href}
                  href={action.href}
                  aria-label={action.ariaLabel}
                  className="flex min-h-[142px] flex-col items-center justify-center rounded-[24px] bg-primary px-3 py-5 text-center text-foreground shadow-[0_10px_22px_rgba(254,200,31,0.24)] transition duration-150 active:scale-[0.98]"
                >
                  <span className="flex h-16 w-16 items-center justify-center">
                    <Icon />
                  </span>
                  <span className="mt-4 text-xl font-bold leading-none">{action.title}</span>
                  <span className="mt-2 text-[12px] font-black tracking-[0.04em]">
                    {action.subtitle}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mx-5 mt-5 rounded-[24px] bg-card p-5 shadow-card">
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
