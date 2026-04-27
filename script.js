const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const translations = {
  my: {
    siteName: "အောင်သုခ မြန်မာကျောင်း",
    contactBtn: "ဆက်သွယ်ရန်",
    heroTag: "သာသနာအလင်းရောင် ပြန့်ပွားရာ",
    heroTitle: "ဓမ္မ၊ ပညာ၊ သန့်ရှင်းမှုတို့ဖြင့် လူမှုအသိုင်းအဝိုင်းကို ဆောက်တည်ခြင်း",
    heroText: "ကျောင်းဝင်းအတွင်း ပြုလုပ်သည့် ဘုရားပွဲများ၊ တရားနာပွဲများ၊ အသိပညာဖြန့်ဝေမှုများကို မျှဝေထားပါသည်။",
    aboutTitle: "ကျောင်းအကြောင်း",
    aboutText:
      "အောင်သုခ မြန်မာကျောင်းသည် သာသနာရေးလုပ်ငန်းများ၊ ဘာသာရေးပွဲများ၊ လူငယ်ပညာပေးအစီအစဉ်များကို စဉ်ဆက်မပြတ် ဆောင်ရွက်နေသော ဘုန်းတော်ကြီးကျောင်းတစ်ခုဖြစ်ပါသည်။",
    addressTitle: "လိပ်စာ",
    addressText: "မွန်ပြည်နယ် ချောင်းဆုံမြို့နယ် ဘိုးနတ်ကျေးရွာ",
    scheduleTitle: "နေ့စဉ်အစီအစဉ် (ဥပမာ)",
    schedule1: "နံနက် ၅:၃၀ - ပဌာန်းပူဇော်ခြင်း",
    schedule2: "နံနက် ၈:၀၀ - သင်တန်း/အဘိဓမ္မာ လေ့လာခြင်း",
    schedule3: "နေ့လယ် ၁:၀၀ - တရားထိုင်ခြင်း",
    schedule4: "ညနေ ၆:၃၀ - ဓမ္မသင်တန်းနှင့် ပရိတ်တရားနာ",
    galleryTitle: "အမှတ်တရ ပုံရိပ်များ",
    contactTitle: "ဆက်သွယ်ရန်",
    contactText:
      "ဘုန်းတော်ကြီးကျောင်း ဆိုင်ရာ ကုသိုလ်ရေးလှုပ်ရှားမှုများတွင် ပါဝင်လိုပါက ကျောင်းသို့ တိုက်ရိုက်လာရောက်မေးမြန်းနိုင်ပါသည်။",
    addressPin: "📍 မွန်ပြည်နယ် ချောင်းဆုံမြို့နယ် ဘိုးနတ်ကျေးရွာ",
    facebookLabel: "Facebook Page သို့ ဝင်ကြည့်ရန်",
    footerText: `© ${new Date().getFullYear()} အောင်သုခ မြန်မာကျောင်း။ သာသနာတော် အဓွန့်ရှည်ပါစေ။`,
    backTop: "အပေါ်သို့"
  },
  en: {
    siteName: "Aung Thukha Myanmar Monastery",
    contactBtn: "Contact",
    heroTag: "Spreading the light of Dhamma",
    heroTitle: "Building community through Dhamma, education, and purity",
    heroText: "This website shares ceremonies, Dhamma talks, and social activities held at the monastery.",
    aboutTitle: "About the Monastery",
    aboutText:
      "Aung Thukha Myanmar Monastery continuously carries out religious services, community events, and youth education programs.",
    addressTitle: "Address",
    addressText: "Bone Nat Village, Chaungzon Township, Mon State",
    scheduleTitle: "Daily Schedule (Sample)",
    schedule1: "5:30 AM - Morning Chanting",
    schedule2: "8:00 AM - Study Session / Abhidhamma",
    schedule3: "1:00 PM - Meditation",
    schedule4: "6:30 PM - Dhamma Class and Paritta Chanting",
    galleryTitle: "Photo Gallery",
    contactTitle: "Contact",
    contactText:
      "If you would like to participate in monastery merit activities, please visit and inquire directly at the monastery.",
    addressPin: "📍 Bone Nat Village, Chaungzon Township, Mon State",
    facebookLabel: "Visit our Facebook Page",
    footerText: `© ${new Date().getFullYear()} Aung Thukha Myanmar Monastery. May the Sasana prosper.`,
    backTop: "Back to top"
  }
};

function applyLanguage(lang) {
  const pack = translations[lang] ?? translations.my;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (!key || !pack[key]) return;
    node.textContent = pack[key];
  });

  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });
}

document.querySelectorAll(".lang-btn").forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang);
  });
});
