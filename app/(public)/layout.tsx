import { LanguageProvider } from "@/lib/i18n/language-context";
import { SiteFooter } from "@/components/public/SiteFooter";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      {children}
      <SiteFooter />
    </LanguageProvider>
  );
}
