import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { getSessionUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const { user } = await getSessionUser();
  const nextPath = next?.startsWith("/admin") ? next : "/admin";

  if (user) {
    redirect(nextPath);
  }

  return (
    <div className="login-wrap">
      <div className="card login-card">
        <h2>Admin ဝင်ရောက်ရန်</h2>
        <p className="muted">အောင်သုခ မြန်မာကျောင်း CMS</p>
        <LoginForm nextPath={nextPath} configured={isSupabaseConfigured()} />
      </div>
    </div>
  );
}
