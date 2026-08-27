"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "@/lib/actions/auth";
import type { Profile } from "@/lib/types";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/posts", label: "ပို့စ်များ" },
  { href: "/admin/events", label: "ပွဲတော်များ" },
  { href: "/admin/media", label: "ပုံများ" }
];

export function AdminSidebar({ profile }: { profile: Profile }) {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div>
        <strong>Admin</strong>
        <p className="muted" style={{ color: "#d7b06c" }}>
          {profile.email}
          <br />
          {profile.role}
        </p>
      </div>
      <nav>
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href)) ? "active" : undefined}
          >
            {link.label}
          </Link>
        ))}
        {profile.role === "superadmin" ? (
          <Link href="/admin/users" className={pathname.startsWith("/admin/users") ? "active" : undefined}>
            Admin များ
          </Link>
        ) : null}
      </nav>
      <form action={logoutAdmin}>
        <button className="btn secondary" type="submit">
          ထွက်မည်
        </button>
      </form>
      <Link href="/" className="btn small">
        Public site
      </Link>
    </aside>
  );
}
