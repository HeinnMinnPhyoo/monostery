import { UsersManager } from "@/components/admin/UsersManager";
import { requireSuperadmin } from "@/lib/auth";
import type { Profile } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const { supabase, profile } = await requireSuperadmin();
  const { data } = await supabase
    .from("profiles")
    .select("id, email, role, created_at")
    .order("created_at", { ascending: true });

  return (
    <>
      <div className="admin-top">
        <h2>Admin များ</h2>
      </div>
      <UsersManager profiles={(data ?? []) as Profile[]} currentId={profile.id} />
    </>
  );
}
