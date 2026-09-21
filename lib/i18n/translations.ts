import type { Lang } from "@/lib/types";

export const translations: Record<Lang, Record<string, string>> = {
  my: {
    siteName: "အောင်သုခ မြန်မာကျောင်း",
    contactBtn: "ဆက်သွယ်ရန်",
    heroTag: "သာသနာအလင်းရောင် ပြန့်ပွားရာ",
    heroTitle: "ဓမ္မ၊ ပညာ၊ သန့်ရှင်းမှုတို့ဖြင့် လူမှုအသိုင်းအဝိုင်းကို ဆောက်တည်ခြင်း",
    heroText:
      "ကျောင်းဝင်းအတွင်း ပြုလုပ်သည့် ဘုရားပွဲများ၊ တရားနာပွဲများ၊ အသိပညာဖြန့်ဝေမှုများကို မျှဝေထားပါသည်။",
    aboutTitle: "ကျောင်းအကြောင်း",
    aboutText:
      "အောင်သုခ မြန်မာကျောင်းသည် သာသနာရေးလုပ်ငန်းများ၊ ဘာသာရေးပွဲများ၊ လူငယ်ပညာပေးအစီအစဉ်များကို စဉ်ဆက်မပြတ် ဆောင်ရွက်နေသော ဘုန်းတော်ကြီးကျောင်းတစ်ခုဖြစ်ပါသည်။",
    addressTitle: "လိပ်စာ",
    addressText: "မွန်ပြည်နယ် ချောင်းဆုံမြို့နယ် ဘိုးနတ်ကျေးရွာ",
    galleryTitle: "အမှတ်တရ ပုံရိပ်များ",
    contactTitle: "ဆက်သွယ်ရန်",
    contactText:
      "ဘုန်းတော်ကြီးကျောင်း ဆိုင်ရာ ကုသိုလ်ရေးလှုပ်ရှားမှုများတွင် ပါဝင်လိုပါက ကျောင်းသို့ တိုက်ရိုက်လာရောက်မေးမြန်းနိုင်ပါသည်။",
    addressPin: "📍 မွန်ပြည်နယ် ချောင်းဆုံမြို့နယ် ဘိုးနတ်ကျေးရွာ",
    facebookLabel: "Facebook Page သို့ ဝင်ကြည့်ရန်",
    footerText: "အောင်သုခ မြန်မာကျောင်း။ သာသနာတော် အဓွန့်ရှည်ပါစေ။",
    backTop: "အပေါ်သို့",
    navHome: "ပင်မ",
    navPosts: "သတင်းများ",
    navEvents: "ပွဲတော်များ",
    navGallery: "ဓာတ်ပုံ",
    upcomingTitle: "လာမည့်ပွဲများ",
    latestPostsTitle: "နောက်ဆုံးသတင်းများ",
    viewAll: "အားလုံးကြည့်ရန်",
    emptyEvents: "လာမည့်ပွဲ မရှိသေးပါ။",
    emptyPosts: "သတင်း မရှိသေးပါ။",
    pastEventsTitle: "ပြီးသွားသော ပွဲများ",
    readMore: "ဆက်ဖတ်ရန်",
    eventWhen: "ရက်စွဲ",
    eventWhere: "နေရာ",
    publishedOn: "တင်ခဲ့သည့်ရက်"
  },
  en: {
    siteName: "Aung Thukha Myanmar Monastery",
    contactBtn: "Contact",
    heroTag: "Spreading the light of Dhamma",
    heroTitle: "Building community through Dhamma, education, and purity",
    heroText:
      "This website shares ceremonies, Dhamma talks, and social activities held at the monastery.",
    aboutTitle: "About the Monastery",
    aboutText:
      "Aung Thukha Myanmar Monastery continuously carries out religious services, community events, and youth education programs.",
    addressTitle: "Address",
    addressText: "Bone Nat Village, Chaungzon Township, Mon State",
    galleryTitle: "Photo Gallery",
    contactTitle: "Contact",
    contactText:
      "If you would like to participate in monastery merit activities, please visit and inquire directly at the monastery.",
    addressPin: "📍 Bone Nat Village, Chaungzon Township, Mon State",
    facebookLabel: "Visit our Facebook Page",
    footerText: "Aung Thukha Myanmar Monastery. May the Sasana prosper.",
    backTop: "Back to top",
    navHome: "Home",
    navPosts: "News",
    navEvents: "Events",
    navGallery: "Photos",
    upcomingTitle: "Upcoming events",
    latestPostsTitle: "Latest news",
    viewAll: "View all",
    emptyEvents: "No upcoming events yet.",
    emptyPosts: "No news posts yet.",
    pastEventsTitle: "Past events",
    readMore: "Read more",
    eventWhen: "When",
    eventWhere: "Where",
    publishedOn: "Published"
  }
};

export const GALLERY_IMAGES = Array.from({ length: 12 }, (_, index) => ({
  src: `/images/photo-${index + 1}.png`,
  altMy: `ဘုရားကျောင်းအမှတ်တရ ပုံ ${index + 1}`,
  altEn: `Monastery photo ${index + 1}`
}));
