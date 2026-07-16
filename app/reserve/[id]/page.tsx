import { redirect } from "next/navigation";

interface ReservePageProps {
  params: Promise<{ id: string }>;
}

export default async function ReservePage({ params }: ReservePageProps) {
  const { id } = await params;
  redirect(`/cats/${id}`);
}
