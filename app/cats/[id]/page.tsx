import Image from "next/image";
import { Link } from "@/components/common/AppLink";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/common/AppShell";
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
        <section className="relative h-[340px] overflow-hidden bg-background">
          <Image
            src={cat.heroImage}
            alt={`${cat.name}的详情画像`}
            fill
            priority
            sizes="390px"
            className="object-cover object-center"
          />
          <Button
            asChild
            variant="secondary"
            size="icon"
            className="absolute left-5 top-6 bg-card/90"
            aria-label="返回陪伴猫列表"
          >
            <Link href="/cats">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
        </section>

        <section className="space-y-5 bg-background px-6 pt-2">
          <div className="space-y-4">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">
                  {cat.age} · {cat.gender}
                </p>
                <h1 className="mt-1 text-2xl font-bold leading-tight text-foreground">{cat.name}</h1>
              </div>
              <div>
                <Tag tone="orange" className="max-w-full whitespace-normal py-2 leading-5">
                  {cat.status}
                </Tag>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.tags.map((tag) => (
                <Tag key={tag} tone="blue">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>

          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold text-foreground">为什么适合你</h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">{cat.detail}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">适合的人</h2>
                <p className="mt-2 text-base leading-7 text-muted-foreground">{cat.bestFor}</p>
              </div>
              <div className="border-t border-border pt-4">
                <h2 className="text-lg font-semibold text-foreground">第一次互动建议</h2>
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
