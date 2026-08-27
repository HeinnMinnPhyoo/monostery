"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/language-context";

type SiteNavProps = {
  contactHref?: string;
};

export function SiteNav({ contactHref = "/#contact" }: SiteNavProps) {
  const { t, lang, setLang } = useLanguage();
  const pathname = usePathname();

  const links = [
    { href: "/", label: t("navHome") },
    { href: "/posts", label: t("navPosts") },
    { href: "/events", label: t("navEvents") },
    { href: "/#gallery", label: t("navGallery") }
  ];

  return (
    <nav className="nav">
      <Link href="/" className="brand">
        {t("siteName")}
      </Link>
      <div className="nav-actions">
        <div className="nav-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="lang-switch" aria-label="Language switcher">
          <button
            type="button"
            className={`lang-btn${lang === "my" ? " active" : ""}`}
            onClick={() => setLang("my")}
          >
            မြန်မာ
          </button>
          <button
            type="button"
            className={`lang-btn${lang === "en" ? " active" : ""}`}
            onClick={() => setLang("en")}
          >
            English
          </button>
        </div>
        <Link href={contactHref} className="btn">
          {t("contactBtn")}
        </Link>
      </div>
    </nav>
  );
}
