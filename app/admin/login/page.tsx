import { LoginForm } from "@/components/admin/LoginForm";
import { isSupabaseConfigured } from "@/lib/utils";

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="login-wrap">
      <div className="card login-card">
        <h2>Admin ဝင်ရောက်ရန်</h2>
        <p className="muted">အောင်သုခ မြန်မာကျောင်း CMS</p>
        <LoginForm nextPath={next || "/admin"} configured={isSupabaseConfigured()} />
      </div>
    </div>
  );
}
