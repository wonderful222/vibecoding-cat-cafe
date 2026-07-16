import { redirect } from "next/navigation";

interface ConfirmPageProps {
  params: Promise<{ id: string }>;
}

export default async function ConfirmPage({ params }: ConfirmPageProps) {
  const { id } = await params;
  redirect(`/cats/${id}`);
}
