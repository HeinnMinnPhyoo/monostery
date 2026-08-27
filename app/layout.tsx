import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "အောင်သုခ မြန်မာကျောင်း",
    template: "%s | အောင်သုခ မြန်မာကျောင်း"
  },
  description: "အောင်သုခ မြန်မာကျောင်း၏ သာသနာရေးလှုပ်ရှားမှုများ၊ လိပ်စာနှင့် လှူဒါန်းမှုအချက်အလက်များ",
  openGraph: {
    title: "အောင်သုခ မြန်မာကျောင်း",
    description: "ဘုရားပွဲများ၊ တရားနာပွဲများနှင့် ကျောင်းသတင်းများ",
    locale: "my_MM",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="my">
      <body>{children}</body>
    </html>
  );
}
