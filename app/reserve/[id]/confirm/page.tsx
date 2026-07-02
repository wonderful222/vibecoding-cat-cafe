import { PawPrint, ReceiptText } from "lucide-react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/common/AppShell";
import { PageHeader } from "@/components/common/PageHeader";
import { ConfirmReservationButton } from "@/components/business/ConfirmReservationButton";
import { Card, CardContent } from "@/components/ui/card";
import { getCatById } from "@/data/cats";
import { formatPrice, getReservationPrice } from "@/data/reservations";

interface ConfirmPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ date?: string; time?: string }>;
}

export default async function ConfirmPage({ params, searchParams }: ConfirmPageProps) {
  const { id } = await params;
  const { date = "6月30日", time = "14:00" } = await searchParams;
  const cat = getCatById(id);

  if (!cat) {
    notFound();
  }

  const price = getReservationPrice(cat.id, time);

  return (
    <AppShell>
      <main className="space-y-5 px-6 pb-6 pt-6">
        <PageHeader title="确认预约" backHref={`/reserve/${cat.id}`} backLabel={`返回${cat.name}预约选择`} />
        <Card>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <PawPrint className="h-5 w-5 text-primary-strong" />
              <span className="text-base font-semibold text-foreground">{cat.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 border-t border-border pt-4">
              <div>
                <p className="text-sm text-muted-foreground">日期</p>
                <p className="mt-1 text-base font-semibold text-foreground">{date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">时间</p>
                <p className="mt-1 text-base font-semibold text-foreground">{time}</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-[18px] bg-accent p-4">
              <div className="flex items-center gap-3">
                <ReceiptText className="h-5 w-5 text-primary-strong" />
                <div>
                  <p className="text-sm font-semibold text-foreground">本次价格</p>
                  <p className="mt-1 text-xs text-primary-strong">含预约时段席位</p>
                </div>
              </div>
              <p className="shrink-0 text-2xl font-bold text-foreground">{formatPrice(price)}</p>
            </div>
            <p className="rounded-[16px] bg-muted p-4 text-sm leading-6 text-muted-foreground">{cat.gentleTip}</p>
          </CardContent>
        </Card>
        <ConfirmReservationButton
          catId={cat.id}
          catName={cat.name}
          date={date}
          time={time}
          price={price}
          note={cat.gentleTip}
        />
      </main>
    </AppShell>
  );
}
