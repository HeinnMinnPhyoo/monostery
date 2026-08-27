"use client";

import { useLanguage } from "@/lib/i18n/language-context";

export function SiteFooter() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>
        © {year} {t("footerText")}
      </p>
      <a href="#top">{t("backTop")}</a>
    </footer>
  );
}
