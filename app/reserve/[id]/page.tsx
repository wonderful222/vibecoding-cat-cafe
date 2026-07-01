import Image from "next/image";
import { Link } from "@/components/common/AppLink";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/common/AppShell";
import { ReservationPicker } from "@/components/business/ReservationPicker";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { getCatById } from "@/data/cats";

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
      <main className="space-y-6 px-6 pb-6 pt-6">
        <Button asChild variant="ghost" className="px-0" aria-label={`返回${cat.name}详情`}>
          <Link href={`/cats/${cat.id}`}>
            <ArrowLeft className="h-5 w-5" />
            返回详情
          </Link>
        </Button>
        <section className="flex gap-4">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[20px] bg-muted">
            <Image src={cat.image} alt={`${cat.name}的预约画像`} fill sizes="96px" className="object-cover" />
          </div>
          <div className="pt-1">
            <p className="text-sm text-muted-foreground">预约陪伴</p>
            <h1 className="mt-1 text-2xl font-bold text-foreground">{cat.name}</h1>
            <Tag className="mt-3" tone="blue">
              {cat.bestFor}
            </Tag>
          </div>
        </section>
        <ReservationPicker catId={cat.id} catName={cat.name} />
      </main>
    </AppShell>
  );
}
