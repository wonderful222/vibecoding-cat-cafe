import { AppShell } from "@/components/common/AppShell";
import { CatListClient } from "@/components/business/CatListClient";
import { cats } from "@/data/cats";

export default function CatsPage() {
  return (
    <AppShell>
      <main className="pb-8">
        <CatListClient cats={cats} />
      </main>
    </AppShell>
  );
}
