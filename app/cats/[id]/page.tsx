import Image from "next/image";
import { Link } from "@/components/common/AppLink";
import { CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/common/AppShell";
import { BackIconButton } from "@/components/common/BackIconButton";
import { FavoriteButton } from "@/components/business/FavoriteButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { getCatById } from "@/data/cats";

interface CatDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CatDetailPage({ params }: CatDetailPageProps) {
  const { id } = await params;
  const cat = getCatById(id);

  if (!cat) {
    notFound();
  }

  return (
    <AppShell>
      <main className="pb-28">
        <section className="relative h-[300px] overflow-hidden bg-background">
          <Image
            src={cat.heroImage}
            alt={`${cat.name}的详情画像`}
            fill
            priority
            sizes="390px"
            className="object-cover object-center"
          />
          <BackIconButton href="/cats" label="返回陪伴猫列表" className="absolute left-3 top-6" />
        </section>

        <section className="relative z-10 -mt-10 space-y-5 rounded-t-[30px] bg-background px-6 pt-7">
          <div className="space-y-4">
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl font-semibold leading-tight text-foreground">{cat.name}</h1>
              <p className="text-sm font-normal text-muted-foreground">
                {cat.age} · {cat.gender}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Tag tone="orange" className="max-w-full whitespace-normal py-2 leading-5">
                {cat.status}
              </Tag>
              {cat.tags.map((tag) => (
                <Tag key={tag} tone="blue">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>

          <Card>
            <CardContent>
              <h2 className="text-lg font-medium text-foreground">为什么适合你</h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">{cat.detail}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4">
              <div>
                <h2 className="text-lg font-medium text-foreground">适合的人</h2>
                <p className="mt-2 text-base leading-7 text-muted-foreground">{cat.bestFor}</p>
              </div>
              <div className="border-t border-border pt-4">
                <h2 className="text-lg font-medium text-foreground">第一次互动建议</h2>
                <p className="mt-2 text-base leading-7 text-muted-foreground">{cat.gentleTip}</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-3">
            <Button asChild className="w-full" aria-label={`预约${cat.name}`}>
              <Link href={`/reserve/${cat.id}`}>
                <CalendarDays className="h-4 w-4" />
                预约陪伴
              </Link>
            </Button>
            <FavoriteButton catId={cat.id} name={cat.name} />
          </div>
        </section>
      </main>
    </AppShell>
  );
}
