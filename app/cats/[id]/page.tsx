import { notFound } from "next/navigation";
import { AppShell } from "@/components/common/AppShell";
import { CatDetailClient } from "@/components/business/CatDetailClient";
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
    <AppShell showNavigation={false}>
      <CatDetailClient cat={cat} />
    </AppShell>
  );
}
