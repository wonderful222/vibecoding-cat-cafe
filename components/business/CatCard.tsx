import Image from "next/image";
import { Link } from "@/components/common/AppLink";
import type { CatProfile } from "@/types/cat";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";

interface CatCardProps {
  cat: CatProfile;
  actionLabel?: string;
}

export function CatCard({ cat, actionLabel = "立即预约" }: CatCardProps) {
  return (
    <Card className="overflow-hidden border-white/80 ring-1 ring-primary/10 shadow-card transition duration-200 ease-out active:scale-[0.99]">
      <Link href={`/cats/${cat.id}`} aria-label={`查看${cat.name}的详情`} className="block">
        <div className="relative aspect-[4/3] bg-muted">
          <Image src={cat.image} alt={`${cat.name}的照片`} fill sizes="342px" className="object-cover" />
        </div>
      </Link>
      <CardContent className="relative -mt-5 rounded-t-[24px] bg-card pt-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[20px] font-medium leading-7 text-foreground">{cat.name}</h3>
            <p className="mt-1 text-[14px] leading-5 text-muted-foreground">{cat.status}</p>
          </div>
          <Tag tone={cat.interaction === "主动" ? "orange" : "blue"}>{cat.interaction}</Tag>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {cat.tags.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <Button asChild className="mt-5 w-full" aria-label={`进入${cat.name}详情`}>
          <Link href={`/cats/${cat.id}`}>{actionLabel}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
