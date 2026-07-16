import Image from "next/image";
import { Link } from "@/components/common/AppLink";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/common/AppShell";
import { Button } from "@/components/ui/button";
import { getCatById } from "@/data/cats";

interface SuccessPageProps {
  params: Promise<{ id: string }>;
}

export default async function SuccessPage({ params }: SuccessPageProps) {
  const { id } = await params;
  const cat = getCatById(id);

  if (!cat) {
    notFound();
  }

  return (
    <AppShell showNavigation={false}>
      <main className="flex min-h-screen items-start px-5 pb-8 pt-24">
        <section className="w-full rounded-[24px] border border-border bg-card px-5 py-9 text-center shadow-card">
          <Image
            src="/images/ui/success-reservation.svg"
            alt=""
            aria-hidden="true"
            width={80}
            height={80}
            className="mx-auto"
          />
          <h1 className="mt-7 text-[22px] font-semibold leading-[30px] text-foreground">
            {cat.name}已经在等你来啦~
          </h1>
          <p className="mx-auto mt-4 max-w-[230px] text-[16px] leading-6 text-muted-foreground">
            可在我的预约中查看详情
          </p>
          <div className="mt-8 space-y-4">
            <Button asChild className="w-full" aria-label="查看我的预约">
              <Link href="/reservations">查看我的预约</Link>
            </Button>
            <Button asChild variant="secondary" className="w-full" aria-label="回到首页">
              <Link href="/">回到首页</Link>
            </Button>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
