import { BackIconButton } from "@/components/common/BackIconButton";

interface PageHeaderProps {
  backHref: string;
  backLabel: string;
  title: string;
}

export function PageHeader({ backHref, backLabel, title }: PageHeaderProps) {
  return (
    <header className="relative flex h-10 items-center justify-center">
      <BackIconButton href={backHref} label={backLabel} className="absolute left-0 top-0" />
      <h1 className="px-12 text-center text-xl font-medium leading-10 text-foreground">{title}</h1>
    </header>
  );
}
