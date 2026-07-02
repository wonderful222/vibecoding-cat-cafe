import Image from "next/image";
import { Link } from "@/components/common/AppLink";
import { ReceiptText } from "lucide-react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/common/AppShell";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { getCatById } from "@/data/cats";
import { formatPrice, getReservationPrice } from "@/data/reservations";

interface SuccessPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ date?: string; time?: string; price?: string }>;
}

export default async function SuccessPage({ params, searchParams }: SuccessPageProps) {
  const { id } = await params;
  const { date, time = "14:00", price: priceValue } = await searchParams;
  const cat = getCatById(id);

  if (!cat) {
    notFound();
  }

  const parsedPrice = Number(priceValue);
  const price = Number.isFinite(parsedPrice) && parsedPrice > 0 ? parsedPrice : getReservationPrice(cat.id, time);

  return (
    <AppShell>
      <main className="px-6 pb-6 pt-6">
        <PageHeader title="预约成功" backHref="/reservations" backLabel="返回我的预约" />
        <section className="flex min-h-[calc(100vh-136px)] flex-col justify-center text-center">
          <div className="relative mx-auto h-52 w-52 overflow-hidden rounded-[32px] bg-card shadow-card">
            <Image src={cat.image} alt={`${cat.name}正在等你`} fill sizes="208px" className="object-cover" />
          </div>
          <h1 className="mt-8 text-2xl font-bold text-foreground">{cat.name} 已经在等你啦</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            预约已经加入我的预约。到店后先保持轻一点的节奏，把第一次见面留给彼此适应。
          </p>
          <div className="mt-6 rounded-[24px] border border-border bg-card p-4 text-left shadow-card">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-accent text-primary-strong">
                  <ReceiptText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">本次预约价格</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {date ? `${date} ${time}` : `${time} 时段`}
                  </p>
                </div>
              </div>
              <p className="shrink-0 text-2xl font-bold text-foreground">{formatPrice(price)}</p>
            </div>
          </div>
          <div className="mt-8 space-y-3">
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
