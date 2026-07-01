import { Link } from "@/components/common/AppLink";
import { AppShell } from "@/components/common/AppShell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <AppShell>
      <main className="flex min-h-[calc(100vh-80px)] flex-col justify-center px-6 py-8 text-center">
        <h1 className="text-2xl font-bold text-foreground">这页暂时找不到</h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">先回到首页，重新认识今天适合陪伴你的小猫。</p>
        <Button asChild className="mt-8 w-full" aria-label="回到首页">
          <Link href="/">回到首页</Link>
        </Button>
      </main>
    </AppShell>
  );
}
