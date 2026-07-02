import { Link } from "@/components/common/AppLink";
import { BellOff, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/common/AppShell";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <AppShell>
      <main className="space-y-5 px-6 pb-6 pt-6">
        <PageHeader title="基础设置" backHref="/profile" backLabel="返回我的页面" />
        <section>
          <h1 className="text-2xl font-bold text-foreground">保持简单就好。</h1>
        </section>
        <Card>
          <CardContent className="space-y-5">
            <div className="flex gap-3">
              <BellOff className="mt-1 h-5 w-5 text-primary-strong" />
              <div>
                <h2 className="text-base font-semibold text-foreground">暂不打扰</h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">当前版本不发送推送，只保留到店前需要看的信息。</p>
              </div>
            </div>
            <div className="flex gap-3 border-t border-border pt-5">
              <ShieldCheck className="mt-1 h-5 w-5 text-success" />
              <div>
                <h2 className="text-base font-semibold text-foreground">本地体验</h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">没有登录和支付流程，适合先完整体验预约路径。</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Button asChild className="w-full" aria-label="回到首页">
          <Link href="/">回到首页</Link>
        </Button>
      </main>
    </AppShell>
  );
}
