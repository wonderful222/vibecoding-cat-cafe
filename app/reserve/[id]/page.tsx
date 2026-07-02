import Image from "next/image";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/common/AppShell";
import { PageHeader } from "@/components/common/PageHeader";
import { ReservationPicker } from "@/components/business/ReservationPicker";
import { Tag } from "@/components/ui/tag";
import { getCatById } from "@/data/cats";

const reserveBestFor: Record<string, string> = {
  nuomi: "希望节奏轻一点的人",
  xueqiu: "希望被回应的人",
  lizi: "想安静待一会儿的人",
  naihuang: "喜欢轻快互动的人"
};

interface ReservePageProps {
  params: Promise<{ id: string }>;
}

export default async function ReservePage({ params }: ReservePageProps) {
  const { id } = await params;
  const cat = getCatById(id);

  if (!cat) {
    notFound();
  }

  return (
    <AppShell>
      <main className="space-y-5 px-6 pb-6 pt-6">
        <PageHeader title="预约陪伴" backHref={`/cats/${cat.id}`} backLabel={`返回${cat.name}详情`} />
        <section className="flex items-center gap-5">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[24px] bg-muted">
            <Image src={cat.image} alt={`${cat.name}的预约画像`} fill sizes="112px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-[30px] font-semibold leading-none text-foreground">{cat.name}</h2>
            <Tag className="mt-4 max-w-full whitespace-nowrap px-4 py-2 text-sm leading-5" tone="blue">
              {reserveBestFor[cat.id] ?? cat.bestFor}
            </Tag>
          </div>
        </section>
        <ReservationPicker catId={cat.id} catName={cat.name} />
      </main>
    </AppShell>
  );
}
