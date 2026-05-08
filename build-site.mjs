import { writeFileSync } from "node:fs";

const site = {
  name: "AVAS Araç Kiralama",
  domain: "https://www.avasarackiralama.com",
  phoneRaw: "+905543416915",
  phoneDisplay: "0554 341 69 15",
  whatsappRaw: "905543416915",
  email: "info@avasarackiralama.com",
  address: "Mesrutiyet Caddesi No:113 Tepebasi, Kat:4 No:16",
  logo: "logo.svg"
};

const cars = [
  ["BMW 520i", "Premium", 2300, "Benzin / Dizel", "Otomatik", 5, "images/BMW 520i.jpg", "VIP araç kiralama ve kurumsal kullanım için prestijli sedan."],
  ["Citroen C4", "SUV / Crossover", 1800, "Benzin / Dizel", "Otomatik / Manuel", 5, "images/Citroen C4.jpg", "Konforlu şehir içi ve şehir dışı kullanım için modern crossover."],
  ["Fiat Doblo", "Van / MPV", 1500, "Benzin / Dizel", "Otomatik / Manuel", 5, "images/Fiat Doblo.jpg", "Aile, ekip ve bagaj ihtiyacı yüksek günlük araç kiralama talepleri için pratik seçenek."],
  ["Fiat Egea Cross", "SUV / Crossover", 1600, "Benzin / Dizel", "Otomatik / Manuel", 5, "images/Fiat egea cross.jpg", "Yüksek sürüş pozisyonu isteyen kullanıcılar için dengeli crossover."],
  ["Ford Focus", "Ekonomi", 1500, "Dizel", "Otomatik", 5, "images/Ford Focus.jpg", "Ekonomik araç kiralama arayanlar için konforlu ve dengeli hatchback."],
  ["Ford Tourneo", "Van / MPV", 1900, "Benzin / Dizel", "Otomatik / Manuel", 8, "images/Ford Tourneo.jpg", "Kalabalık gruplar ve kurumsal ekipler için geniş iç hacimli alternatif."],
  ["Hyundai i20", "Ekonomi", 1500, "Benzin / Dizel", "Otomatik / Manuel", 5, "images/Hyundai i20.jpg", "Günlük şehir kullanımı için bütçe dostu kompakt araç."],
  ["Mercedes Vito", "VIP / Van", 2700, "Dizel", "Otomatik / Manuel", 8, "images/Mercedes Vito.jpg", "VIP araç kiralama, transfer ve şoförlü araç kiralama talepleri için konforlu van."],
  ["Peugeot 408", "Premium Fastback", 2200, "Benzin / Dizel", "Otomatik / Manuel", 5, "images/Peugeot 408.jpg", "Tasarım ve konforu birlikte isteyenler için yeni nesil fastback."],
  ["Renault Clio", "Ekonomi", 1500, "Dizel", "Otomatik / Manuel", 5, "images/Renault clio.jpg", "Ekonomik günlük araç kiralama ihtiyaçları için pratik hatchback."],
  ["Renault Duster", "SUV", 1700, "Benzin / Dizel", "Otomatik / Manuel", 5, "images/Renault Duster.jpg", "Geniş bagaj ve güçlü gövde isteyenler için SUV seçeneği."],
  ["Renault Megane", "Sedan", 1900, "Dizel", "Otomatik / Manuel", 5, "images/Renault Megane.jpg", "İstanbul araç kiralama ve iş seyahatleri için konforlu sedan."]
].map(([name, category, price, fuel, transmission, seats, image, description]) => ({
  name,
  category,
  price: Math.max(price, 1500),
  fuel,
  transmission,
  seats,
  image,
  description
}));

const landingPages = [
  {
    slug: "istanbul-arac-kiralama",
    keyword: "İstanbul araç kiralama",
    title: "İstanbul Araç Kiralama | AVAS Araç Kiralama",
    description: "İstanbul araç kiralama için Türkiye geneli talepleri değerlendiren hızlı rezervasyon, günlük, aylık, ekonomik ve VIP araç seçenekleri. Hemen arayın veya WhatsApp'tan yazın.",
    h1: "İstanbul Araç Kiralama",
    place: "İstanbul",
    intent: "şehir içi ulaşım, iş seyahati, aile gezisi ve havalimanı bağlantıları"
  },
  {
    slug: "maltepe-arac-kiralama",
    keyword: "Maltepe araç kiralama",
    title: "Maltepe Araç Kiralama | AVAS Rent A Car",
    description: "Maltepe araç kiralama hizmeti için Mesrutiyet Caddesi ofisinden hızlı teslim, ekonomik, sedan, SUV, VIP ve aylık kiralama seçenekleri.",
    h1: "Maltepe Araç Kiralama",
    place: "Maltepe",
    intent: "Mesrutiyet Caddesi ve çevre teslim noktaları için pratik planlama"
  },
  {
    slug: "sabiha-gokcen-arac-kiralama",
    keyword: "Sabiha Gökçen araç kiralama",
    title: "Sabiha Gökçen Araç Kiralama | Hızlı Teslim",
    description: "Sabiha Gökçen araç kiralama talepleriniz için uçuş saatine göre planlı teslim, ekonomik ve VIP araç seçenekleri.",
    h1: "Sabiha Gökçen Araç Kiralama",
    place: "Sabiha Gökçen Havalimanı",
    intent: "uçuş sonrası hızlı teslim, Anadolu Yakası bağlantıları ve iş seyahatleri"
  },
  {
    slug: "istanbul-havalimani-arac-kiralama",
    keyword: "İstanbul Havalimanı araç kiralama",
    title: "İstanbul Havalimanı Araç Kiralama | AVAS",
    description: "İstanbul Havalimanı araç kiralama için uçuş planınıza uygun teslim, günlük, aylık, kurumsal ve VIP araç kiralama hizmetleri.",
    h1: "İstanbul Havalimanı Araç Kiralama",
    place: "İstanbul Havalimanı",
    intent: "Avrupa Yakası başlangıçlı seyahatler, otel transferleri ve şehirler arası planlar"
  },
  {
    slug: "gunluk-arac-kiralama",
    keyword: "günlük araç kiralama",
    title: "Günlük Araç Kiralama | Türkiye Geneli",
    description: "Günlük araç kiralama için ekonomik, sedan, SUV ve VIP araç seçenekleri. Türkiye Geneli merkezli hızlı rezervasyon.",
    h1: "Günlük Araç Kiralama",
    place: "İstanbul",
    intent: "kısa süreli ihtiyaçlar, hafta sonu planları, toplantılar ve şehir içi ulaşım"
  },
  {
    slug: "aylik-arac-kiralama",
    keyword: "aylık araç kiralama",
    title: "Aylık Araç Kiralama | Uzun Dönem Çözümler",
    description: "Aylık araç kiralama ile bireysel ve kurumsal müşteriler için düzenli kullanım, net teklif ve esnek araç seçenekleri.",
    h1: "Aylık Araç Kiralama",
    place: "İstanbul",
    intent: "uzun süreli kullanım, proje araçları, geçici filo ihtiyacı ve bütçe planlaması"
  },
  {
    slug: "vip-arac-kiralama",
    keyword: "VIP araç kiralama",
    title: "VIP Araç Kiralama | Mercedes Vito ve Premium Araçlar",
    description: "VIP araç kiralama için Mercedes Vito, premium sedan ve konfor odaklı araç seçenekleri. Türkiye Geneli merkezli rezervasyon.",
    h1: "VIP Araç Kiralama",
    place: "İstanbul",
    intent: "özel davetler, yönetici ulaşımı, transfer ve prestijli seyahatler"
  },
  {
    slug: "soforlu-arac-kiralama",
    keyword: "şoförlü araç kiralama",
    title: "Şoförlü Araç Kiralama | İstanbul Transfer",
    description: "Şoförlü araç kiralama hizmeti ile İstanbul içinde planlı transfer, kurumsal ulaşım ve VIP seyahat çözümleri.",
    h1: "Şoförlü Araç Kiralama",
    place: "İstanbul",
    intent: "misafir karşılama, toplantı programları, transfer ve konforlu şehir içi ulaşım"
  },
  {
    slug: "ekonomik-arac-kiralama",
    keyword: "ekonomik araç kiralama",
    title: "Ekonomik Araç Kiralama | Uygun Fiyatlı Rent A Car",
    description: "Ekonomik araç kiralama için Clio, i20, Focus ve benzeri pratik seçenekler. 1500 TL'den başlayan günlük fiyatlar.",
    h1: "Ekonomik Araç Kiralama",
    place: "Maltepe",
    intent: "bütçe kontrollü şehir içi kullanım, günlük işler ve kısa seyahatler"
  },
  {
    slug: "kurumsal-arac-kiralama",
    keyword: "kurumsal araç kiralama",
    title: "Kurumsal Araç Kiralama | Şirketlere Filo Çözümleri",
    description: "Kurumsal araç kiralama için aylık, günlük, şoförlü ve VIP seçenekler. Şirketlere net teklif ve düzenli operasyon desteği.",
    h1: "Kurumsal Araç Kiralama",
    place: "İstanbul",
    intent: "şirket ekipleri, proje bazlı saha kullanımı, yönetici ulaşımı ve geçici filo ihtiyacı"
  }
];

const cityPages = [
  ["Adana", "adana-arac-kiralama", "Akdeniz"],
  ["Adıyaman", "adiyaman-arac-kiralama", "Güneydoğu Anadolu"],
  ["Afyonkarahisar", "afyonkarahisar-arac-kiralama", "Ege"],
  ["Ağrı", "agri-arac-kiralama", "Doğu Anadolu"],
  ["Aksaray", "aksaray-arac-kiralama", "İç Anadolu"],
  ["Amasya", "amasya-arac-kiralama", "Karadeniz"],
  ["Ankara", "ankara-arac-kiralama", "İç Anadolu"],
  ["Antalya", "antalya-arac-kiralama", "Akdeniz"],
  ["Ardahan", "ardahan-arac-kiralama", "Doğu Anadolu"],
  ["Artvin", "artvin-arac-kiralama", "Karadeniz"],
  ["Aydın", "aydin-arac-kiralama", "Ege"],
  ["Balıkesir", "balikesir-arac-kiralama", "Marmara"],
  ["Bartın", "bartin-arac-kiralama", "Karadeniz"],
  ["Batman", "batman-arac-kiralama", "Güneydoğu Anadolu"],
  ["Bayburt", "bayburt-arac-kiralama", "Karadeniz"],
  ["Bilecik", "bilecik-arac-kiralama", "Marmara"],
  ["Bingöl", "bingol-arac-kiralama", "Doğu Anadolu"],
  ["Bitlis", "bitlis-arac-kiralama", "Doğu Anadolu"],
  ["Bolu", "bolu-arac-kiralama", "Karadeniz"],
  ["Burdur", "burdur-arac-kiralama", "Akdeniz"],
  ["Bursa", "bursa-arac-kiralama", "Marmara"],
  ["Çanakkale", "canakkale-arac-kiralama", "Marmara"],
  ["Çankırı", "cankiri-arac-kiralama", "İç Anadolu"],
  ["Çorum", "corum-arac-kiralama", "Karadeniz"],
  ["Denizli", "denizli-arac-kiralama", "Ege"],
  ["Diyarbakır", "diyarbakir-arac-kiralama", "Güneydoğu Anadolu"],
  ["Düzce", "duzce-arac-kiralama", "Karadeniz"],
  ["Edirne", "edirne-arac-kiralama", "Marmara"],
  ["Elazığ", "elazig-arac-kiralama", "Doğu Anadolu"],
  ["Erzincan", "erzincan-arac-kiralama", "Doğu Anadolu"],
  ["Erzurum", "erzurum-arac-kiralama", "Doğu Anadolu"],
  ["Eskişehir", "eskisehir-arac-kiralama", "İç Anadolu"],
  ["Gaziantep", "gaziantep-arac-kiralama", "Güneydoğu Anadolu"],
  ["Giresun", "giresun-arac-kiralama", "Karadeniz"],
  ["Gümüşhane", "gumushane-arac-kiralama", "Karadeniz"],
  ["Hakkari", "hakkari-arac-kiralama", "Doğu Anadolu"],
  ["Hatay", "hatay-arac-kiralama", "Akdeniz"],
  ["Iğdır", "igdir-arac-kiralama", "Doğu Anadolu"],
  ["Isparta", "isparta-arac-kiralama", "Akdeniz"],
  ["İstanbul", "istanbul-geneli-arac-kiralama", "Marmara"],
  ["İzmir", "izmir-arac-kiralama", "Ege"],
  ["Kahramanmaraş", "kahramanmaras-arac-kiralama", "Akdeniz"],
  ["Karabük", "karabuk-arac-kiralama", "Karadeniz"],
  ["Karaman", "karaman-arac-kiralama", "İç Anadolu"],
  ["Kars", "kars-arac-kiralama", "Doğu Anadolu"],
  ["Kastamonu", "kastamonu-arac-kiralama", "Karadeniz"],
  ["Kayseri", "kayseri-arac-kiralama", "İç Anadolu"],
  ["Kırıkkale", "kirikkale-arac-kiralama", "İç Anadolu"],
  ["Kırklareli", "kirklareli-arac-kiralama", "Marmara"],
  ["Kırşehir", "kirsehir-arac-kiralama", "İç Anadolu"],
  ["Kilis", "kilis-arac-kiralama", "Güneydoğu Anadolu"],
  ["Kocaeli", "kocaeli-arac-kiralama", "Marmara"],
  ["Konya", "konya-arac-kiralama", "İç Anadolu"],
  ["Kütahya", "kutahya-arac-kiralama", "Ege"],
  ["Malatya", "malatya-arac-kiralama", "Doğu Anadolu"],
  ["Manisa", "manisa-arac-kiralama", "Ege"],
  ["Mardin", "mardin-arac-kiralama", "Güneydoğu Anadolu"],
  ["Mersin", "mersin-arac-kiralama", "Akdeniz"],
  ["Muğla", "mugla-arac-kiralama", "Ege"],
  ["Muş", "mus-arac-kiralama", "Doğu Anadolu"],
  ["Nevşehir", "nevsehir-arac-kiralama", "İç Anadolu"],
  ["Niğde", "nigde-arac-kiralama", "İç Anadolu"],
  ["Ordu", "ordu-arac-kiralama", "Karadeniz"],
  ["Osmaniye", "osmaniye-arac-kiralama", "Akdeniz"],
  ["Rize", "rize-arac-kiralama", "Karadeniz"],
  ["Sakarya", "sakarya-arac-kiralama", "Marmara"],
  ["Samsun", "samsun-arac-kiralama", "Karadeniz"],
  ["Siirt", "siirt-arac-kiralama", "Güneydoğu Anadolu"],
  ["Sinop", "sinop-arac-kiralama", "Karadeniz"],
  ["Sivas", "sivas-arac-kiralama", "İç Anadolu"],
  ["Şanlıurfa", "sanliurfa-arac-kiralama", "Güneydoğu Anadolu"],
  ["Şırnak", "sirnak-arac-kiralama", "Güneydoğu Anadolu"],
  ["Tekirdağ", "tekirdag-arac-kiralama", "Marmara"],
  ["Tokat", "tokat-arac-kiralama", "Karadeniz"],
  ["Trabzon", "trabzon-arac-kiralama", "Karadeniz"],
  ["Tunceli", "tunceli-arac-kiralama", "Doğu Anadolu"],
  ["Uşak", "usak-arac-kiralama", "Ege"],
  ["Van", "van-arac-kiralama", "Doğu Anadolu"],
  ["Yalova", "yalova-arac-kiralama", "Marmara"],
  ["Yozgat", "yozgat-arac-kiralama", "İç Anadolu"],
  ["Zonguldak", "zonguldak-arac-kiralama", "Karadeniz"]
].map(([city, slug, region]) => ({
  city,
  slug,
  region,
  keyword: `${city} araç kiralama`,
  title: `${city} Araç Kiralama | AVAS Araç Kiralama`,
  description: `${city} araç kiralama talepleriniz için günlük, aylık, ekonomik, VIP ve kurumsal araç seçenekleri. Türkiye geneli hizmet ağıyla hızlı teklif alın.`,
  h1: `${city} Araç Kiralama`
}));

const legalPages = [
  {
    slug: "iletisim",
    title: "İletişim | AVAS Araç Kiralama",
    description: "AVAS Araç Kiralama iletişim bilgileri, telefon, WhatsApp, e-posta ve Maltepe adres bilgisi.",
    h1: "İletişim",
    body: [
      "Araç kiralama talebiniz, fiyat bilgisi, teslim planı veya filo seçenekleri için AVAS Araç Kiralama ekibiyle telefon ve WhatsApp üzerinden hızlıca iletişime geçebilirsiniz.",
      `Telefon: ${site.phoneDisplay}. WhatsApp: ${site.phoneDisplay}. E-posta: ${site.email}. Adres: ${site.address}.`
    ]
  },
  {
    slug: "kvkk",
    title: "KVKK Aydınlatma Metni | AVAS Araç Kiralama",
    description: "AVAS Araç Kiralama KVKK aydınlatma metni ve kişisel verilerin işlenmesine ilişkin genel bilgiler.",
    h1: "KVKK Aydınlatma Metni",
    body: [
      "AVAS Araç Kiralama, iletişim formları ve rezervasyon süreçlerinde paylaşılan kişisel verileri yalnızca talebin yanıtlanması, rezervasyonun planlanması, sözleşme süreçlerinin yürütülmesi ve yasal yükümlülüklerin yerine getirilmesi amacıyla işler.",
      "Ad, soyad, telefon, e-posta, sürücü belgesi ve rezervasyon bilgileri hizmetin gerektirdiği ölçüde saklanır. Kişisel veriler hukuka uygun şekilde korunur; yetkisiz erişim, kayıp veya kötüye kullanım risklerine karşı gerekli idari ve teknik önlemler alınır.",
      "KVKK kapsamındaki başvuru, düzeltme, silme veya bilgi alma talepleriniz için iletişim bilgilerimiz üzerinden bize ulaşabilirsiniz."
    ]
  },
  {
    slug: "gizlilik-politikasi",
    title: "Gizlilik Politikası | AVAS Araç Kiralama",
    description: "AVAS Araç Kiralama gizlilik politikası, web sitesi kullanımı ve kişisel verilerin korunması hakkında bilgiler.",
    h1: "Gizlilik Politikası",
    body: [
      "Web sitemizde paylaştığınız bilgiler, araç kiralama talebinizin değerlendirilmesi ve size doğru teklif sunulması için kullanılır. Bilgileriniz üçüncü kişilerle ticari amaçla paylaşılmaz.",
      "Site performansını iyileştirmek, kullanıcı deneyimini geliştirmek ve güvenli iletişim sağlamak amacıyla teknik veriler işlenebilir. Rezervasyon ve iletişim taleplerinde yalnızca hizmet için gerekli bilgiler istenir.",
      "Gizlilik politikamız, mevzuat ve hizmet süreçlerindeki değişikliklere göre güncellenebilir."
    ]
  },
  {
    slug: "kullanim-sartlari",
    title: "Kullanım Şartları | AVAS Araç Kiralama",
    description: "AVAS Araç Kiralama web sitesi kullanım şartları, rezervasyon ve bilgi doğruluğu koşulları.",
    h1: "Kullanım Şartları",
    body: [
      "Bu web sitesinde yer alan araç, fiyat ve hizmet bilgileri bilgilendirme amacı taşır. Net fiyat ve uygunluk bilgisi rezervasyon detayları, tarih, teslim noktası, süre ve araç grubuna göre kesinleştirilir.",
      "Kullanıcı, iletişim ve rezervasyon formlarında doğru bilgi paylaşmakla sorumludur. Araç tesliminde sürücü belgesi, kimlik ve ödeme bilgileri gibi belgeler talep edilebilir.",
      "AVAS Araç Kiralama, operasyon koşullarına göre araç grubu, teslim planı ve hizmet şartlarında makul değişiklik yapma hakkını saklı tutar."
    ]
  }
];

const esc = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const wa = (text) => `https://wa.me/${site.whatsappRaw}?text=${encodeURIComponent(text)}`;
const canonical = (slug = "") => `${site.domain}/${slug ? `${slug}.html` : ""}`;

function head({ title, description, slug = "", faq = [], breadcrumb = [] }) {
  const url = canonical(slug);
  const graph = [
    organizationSchema(),
    breadcrumbSchema(breadcrumb.length ? breadcrumb : [{ name: "Ana Sayfa", url: site.domain }])
  ];
  if (faq.length) graph.push(faqSchema(faq));
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
  <meta name="author" content="${esc(site.name)}">
  <meta name="theme-color" content="#0b2a78">
  <link rel="canonical" href="${url}">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(site.name)}">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${site.domain}/favicon-192.png">
  <meta property="og:image:alt" content="${esc(site.name)} logosu">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${site.domain}/favicon-192.png">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap"></noscript>
  <link rel="stylesheet" href="css/style.css">
  <script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>
  <script src="js/main.js" defer></script>
</head>`;
}

function organizationSchema() {
  return {
    "@type": ["AutoRental", "LocalBusiness"],
    "@id": `${site.domain}/#business`,
    name: site.name,
    url: site.domain,
    telephone: site.phoneRaw,
    email: site.email,
    image: `${site.domain}/favicon-192.png`,
    logo: `${site.domain}/favicon-192.png`,
    description: "Türkiye genelinde günlük araç kiralama, aylık araç kiralama, VIP araç kiralama ve kurumsal araç kiralama hizmetleri.",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Tepebasi",
      addressCountry: "TR"
    },
      areaServed: ["Türkiye", "İstanbul", "Maltepe", "Sabiha Gökçen Havalimanı", "İstanbul Havalimanı"],
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "₺₺",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phoneRaw,
      contactType: "customer service",
      availableLanguage: "Turkish"
    }
  };
}

function faqSchema(faq) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a }
    }))
  };
}

function breadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

function header() {
  const links = [
    ["Araçlar", "index.html#araclar"],
    ["Hizmetler", "index.html#hizmetler"],
    ["Şehirler", "index.html#sehirler"],
    ["İletişim", "iletisim.html"],
    ["KVKK", "kvkk.html"]
  ];
  return `<a class="skip-link" href="#icerik">İçeriğe geç</a>
<header class="site-header" id="top">
  <div class="container header-shell">
    <a class="brand" href="index.html" aria-label="${esc(site.name)} ana sayfa">
      <img src="${site.logo}" alt="${esc(site.name)} logosu" width="220" height="72" fetchpriority="high">
    </a>
    <nav class="main-nav" aria-label="Ana menü">${links.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}</nav>
    <div class="header-cta">
      <a class="btn btn-soft" href="tel:${site.phoneRaw}">${site.phoneDisplay}</a>
      <a class="btn btn-primary" href="${wa("Merhaba, araç kiralama hakkında bilgi almak istiyorum.")}" target="_blank" rel="noopener">WhatsApp</a>
    </div>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Menüyü aç veya kapat"><span></span><span></span><span></span></button>
  </div>
  <nav class="mobile-menu" id="mobile-menu" aria-label="Mobil menü">${links.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}<a href="tel:${site.phoneRaw}">Hemen Ara</a><a href="${wa("Merhaba, araç kiralama hakkında bilgi almak istiyorum.")}" target="_blank" rel="noopener">WhatsApp'tan Ulaş</a></nav>
</header>`;
}

function footer() {
  const landingLinks = landingPages.map((p) => `<a href="${p.slug}.html">${p.h1}</a>`).join("");
  return `<a class="sticky-whatsapp" href="${wa("Merhaba, araç kiralama hakkında bilgi almak istiyorum.")}" target="_blank" rel="noopener" aria-label="WhatsApp üzerinden iletişime geçin">WhatsApp'tan Ulaş</a>
<footer class="site-footer">
  <div class="container footer-shell">
    <div>
      <img src="${site.logo}" alt="${esc(site.name)} logosu" width="180" height="60" loading="lazy">
      <p>Türkiye geneli araç kiralama, günlük, aylık, VIP, şoförlü ve kurumsal araç kiralama çözümleri.</p>
    </div>
    <div>
      <h3>Hizmetler</h3>
      ${landingLinks}
    </div>
    <div>
      <h3>İletişim</h3>
      <address>
        <a href="tel:${site.phoneRaw}">${site.phoneDisplay}</a>
        <a href="${wa("Merhaba, araç kiralama hakkında bilgi almak istiyorum.")}" target="_blank" rel="noopener">WhatsApp: ${site.phoneDisplay}</a>
        <a href="mailto:${site.email}">${site.email}</a>
        <span>${site.address}</span>
      </address>
      <h3>Kurumsal</h3>
      <a href="iletisim.html">İletişim</a>
      <a href="kvkk.html">KVKK</a>
      <a href="gizlilik-politikasi.html">Gizlilik Politikası</a>
      <a href="kullanim-sartlari.html">Kullanım Şartları</a>
    </div>
  </div>
  <div class="footer-bottom"><p>© <span id="footer-year"></span> ${site.name}. Tüm hakları saklıdır.</p></div>
</footer>`;
}

const homeFaq = [
  ["Araç kiralama için hangi belgeler gereklidir?", "Geçerli sürücü belgesi, kimlik veya pasaport ve ödeme bilgileri gerekir. Araç grubu, yaş ve sürücü deneyimi koşulları rezervasyon sırasında netleştirilir."],
  ["Araç kiralama hizmetiniz hangi bölgeleri kapsar?", "Türkiye geneli hizmet anlayışıyla çalışıyor, İstanbul başta olmak üzere farklı şehir ve teslim noktaları için planlı seçenekler sunuyoruz. Havalimanı ve özel teslim talepleri ayrıca organize edilir."],
  ["Günlük araç kiralama ile aylık araç kiralama arasında fark nedir?", "Günlük araç kiralama kısa süreli ihtiyaçlara, aylık araç kiralama ise düzenli kullanım ve bütçe planlamasına uygundur. Uzun süreli taleplerde özel teklif hazırlanır."],
  ["VIP araç kiralama ve şoförlü araç kiralama yapıyor musunuz?", "Evet. Mercedes Vito ve premium segment araçlarla VIP araç kiralama ve talebe göre şoförlü araç kiralama çözümleri sunulur."],
  ["Fiyatlar neye göre değişir?", "Fiyatlar araç grubu, tarih, kullanım süresi, teslim noktası, ek hizmetler ve sezon yoğunluğuna göre netleşir. 1500 TL altındaki günlük başlangıç fiyatları sitede 1500 TL olarak güncellenmiştir."]
].map(([q, a]) => ({ q, a }));

function faqBlock(faq) {
  return `<div class="faq-list">${faq.map((item) => `<details class="faq-item"><summary><h3>${esc(item.q)}</h3></summary><p>${esc(item.a)}</p></details>`).join("")}</div>`;
}

function vehicleCards() {
  return cars.map((car, index) => `<article class="vehicle-card">
    <div class="vehicle-visual">
      <div class="vehicle-price">₺${car.price} / gün</div>
      <img src="${car.image}" alt="${esc(car.name)} ${esc(car.category)} araç kiralama aracı" width="640" height="420" ${index < 3 ? 'fetchpriority="high"' : 'loading="lazy"'}>
    </div>
    <div class="vehicle-body">
      <div class="vehicle-topline"><span>${esc(car.category)}</span></div>
      <h3>${esc(car.name)}</h3>
      <p>${esc(car.description)}</p>
      <div class="vehicle-specs">
        <article><strong>Yakıt</strong><span>${esc(car.fuel)}</span></article>
        <article><strong>Vites</strong><span>${esc(car.transmission)}</span></article>
        <article><strong>Koltuk</strong><span>${car.seats}</span></article>
      </div>
      <div class="vehicle-actions">
        <a class="btn btn-soft" href="tel:${site.phoneRaw}">Hemen Ara</a>
        <a class="btn btn-whatsapp" href="${wa(`Merhaba, ${car.name} için araç kiralama teklifi almak istiyorum.`)}" target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </div>
  </article>`).join("");
}

function homeContent() {
  const seoParagraphs = [
    "AVAS Araç Kiralama, İstanbul araç kiralama ihtiyaçlarını Türkiye geneli talepleri değerlendiren, hızlı iletişim kuran ve kullanıcıya net bilgi veren bir hizmet anlayışıyla karşılar. Araç kiralama sürecinde en çok aranan şey yalnızca uygun fiyat değildir; doğru aracın doğru zamanda hazırlanması, teslim planının açık olması, sözleşme koşullarının anlaşılır şekilde paylaşılması ve seyahat başlamadan önce güven hissinin oluşması gerekir. Bu nedenle ekibimiz günlük araç kiralama, aylık araç kiralama, VIP araç kiralama ve kurumsal araç kiralama taleplerinde her kullanıcıya ihtiyacına göre yönlendirme yapar.",
    "İstanbul gibi yoğun trafiğe, farklı ulaşım noktalarına ve değişken seyahat planlarına sahip bir şehirde araç kiralama kararı çoğu zaman zaman yönetimiyle ilgilidir. Maltepe araç kiralama arayan bir kullanıcı ofise yakın teslim isterken, Sabiha Gökçen araç kiralama talebi olan bir yolcu uçuş saatine göre hızlı organizasyon bekler. Avrupa Yakası'ndan gelen kullanıcılar için İstanbul Havalimanı araç kiralama planı, otel veya iş merkezi transferiyle birlikte düşünülebilir. AVAS Araç Kiralama bu farklı senaryoları tek bir iletişim akışı içinde toplar.",
    "Filomuzda ekonomik araç kiralama için kompakt ve yakıt tasarruflu modeller, aile ve ekip kullanımı için geniş iç hacimli van seçenekleri, şehir içi ve şehir dışı dengeli kullanım için sedan ve SUV araçlar, daha özel beklentiler için premium ve VIP araç kiralama alternatifleri yer alır. Fiyatlandırma araç grubu, kiralama süresi, teslim noktası, tarih yoğunluğu ve ek hizmetlere göre netleştirilir. Sitedeki günlük başlangıç fiyatları güncel eşiklere göre düzenlenmiş, 1500 TL altında kalan tüm fiyatlar 1500 TL seviyesine yükseltilmiştir.",
    "Günlük araç kiralama, kısa süreli plan yapan kullanıcılar için pratik bir çözümdür. Hafta sonu programı, iş toplantısı, şehir dışından gelen misafir, bakımda olan kişisel araç veya acil ulaşım ihtiyacı gibi durumlarda günlük kiralama esnekliği yüksek bir seçenektir. Aylık araç kiralama ise daha düzenli kullanım isteyen bireyler ve şirketler için bütçe planlamasını kolaylaştırır. Özellikle geçici proje ekipleri, saha çalışanları, yönetici araç ihtiyacı veya kısa dönem filo desteği isteyen firmalar aylık kiralamadan yararlanabilir.",
    "VIP araç kiralama ve şoförlü araç kiralama hizmetleri, konfor, zaman ve temsil kalitesini öncelik haline getiren kullanıcılar için geliştirilmiştir. Mercedes Vito gibi geniş ve rahat araçlar; davet, toplantı, havalimanı karşılama, yönetici ulaşımı ve özel gün programlarında tercih edilir. Şoförlü seçeneklerde güzergah, saat, bekleme planı ve yolcu sayısı baştan değerlendirilir. Böylece kullanıcı yalnızca araca değil, planlı bir ulaşım deneyimine sahip olur.",
    "AVAS Araç Kiralama'nın kurumsal yaklaşımı, açık iletişim ve hızlı geri dönüş üzerine kuruludur. Telefon ve WhatsApp hattından gelen talepler ekip tarafından değerlendirilir, araç uygunluğu kontrol edilir ve kullanıcıya net teklif sunulur. Belgeler, teslim saati, teslim noktası, ödeme yöntemi ve kullanım koşulları önceden konuşulduğu için sürprizlerle karşılaşma ihtimali azalır. Bu yaklaşım özellikle İstanbul araç kiralama pazarında güven arayan kullanıcılar için önemli bir avantaj sağlar.",
    `Ofis adresimiz ${site.address}. İletişim sayfasından telefon, WhatsApp ve e-posta bilgilerimize ulaşabilir, hızlı rezervasyon formuyla talebinizi iletebilirsiniz. Amacımız, araç kiralama sürecini karmaşık bir işlem olmaktan çıkarıp net, erişilebilir ve güven veren bir hizmet deneyimine dönüştürmektir.`,
    "Araç kiralama kararı verirken yalnızca araç modeline bakmak çoğu zaman yeterli olmaz. Kiralama süresinin kaç gün olduğu, aracın hangi bölgede teslim alınacağı, dönüş noktasının farklı olup olmayacağı, yolcu sayısı, bagaj ihtiyacı, şehir dışı kullanım planı ve ek sürücü talebi gibi bilgiler doğru fiyatlandırma için önemlidir. İstanbul araç kiralama taleplerinde bu detaylar yoğun trafik, köprü geçişleri, havalimanı saatleri ve semtler arası mesafeler nedeniyle daha da belirleyici hale gelir.",
    "AVAS Araç Kiralama, kullanıcıya uygun araç grubunu önerirken kullanım amacını merkeze alır. Tek kişi şehir içi kullanımda ekonomik araç kiralama daha mantıklı olabilirken, aile seyahatlarında sedan veya SUV seçenekleri daha konforlu sonuç verir. Kurumsal misafir ağırlama, özel etkinlik veya transfer planlarında VIP araç kiralama daha doğru bir tercih olabilir. Bu yönlendirme, kullanıcının gereksiz maliyet üstlenmesini engeller ve seyahat deneyimini daha verimli hale getirir.",
    "İstanbul'da günlük araç kiralama çoğu zaman ani gelişen ihtiyaçlar için tercih edilir. Kişisel aracın serviste olması, şehir dışından gelen bir misafirin karşılanması, kısa süreli iş programı veya hafta sonu kaçamağı gibi senaryolarda hızlı rezervasyon büyük kolaylık sağlar. Maltepe araç kiralama tarafında ise yerel erişim avantajı öne çıkar; Anadolu Yakası'nda yaşayan kullanıcılar için ofis konumu ve WhatsApp destek hattı karar sürecini hızlandırır.",
    "Aylık araç kiralama hizmetinde kullanıcıların beklentisi daha çok süreklilik, maliyet kontrolü ve operasyon kolaylığıdır. Bir işletmenin geçici proje için araca ihtiyaç duyması, yeni personel için deneme süreci planlaması veya bireysel kullanıcının uzun dönem araç ihtiyacını satın alma maliyetine girmeden çözmek istemesi aylık kiralamayı cazip hale getirir. Bu modelde teklif hazırlanırken kullanım süresi, araç sınıfı ve teslim koşulları birlikte değerlendirilir.",
    "Güven veren kurumsal açıklık, hizmetin her aşamasında önemlidir. AVAS Araç Kiralama; fiyat, belge, teslim, iade, yakıt ve ek hizmet koşullarını kullanıcıyla önceden paylaşmaya özen gösterir. Böylece araç teslim anında belirsizlik yaşanmaz. Telefonla arayan veya WhatsApp üzerinden yazan kullanıcı, hangi bilgileri paylaşması gerektiğini kolayca öğrenir ve rezervasyon adımları sade biçimde ilerler.",
    "SEO açısından da kullanıcı deneyimi açısından da bu sayfa, yalnızca anahtar kelime tekrarından ibaret değildir. Araç kiralama, İstanbul araç kiralama, Maltepe araç kiralama, günlük araç kiralama, aylık araç kiralama ve VIP araç kiralama konularını doğal bağlam içinde ele alır. Kullanıcı aradığı hizmeti, fiyat yaklaşımını, iletişim kanalını, adres bilgisini ve sık sorulan soruların yanıtlarını aynı sayfada bulabildiği için karar verme süreci daha hızlı ve daha güvenli olur.",
    "Havalimanı başlangıçlı kiralamalarda zamanlama ayrıca önemlidir. Sabiha Gökçen araç kiralama veya İstanbul Havalimanı araç kiralama talebinde uçuş saati, bagaj teslim süresi, yolcu sayısı ve gidilecek bölge önceden bilindiğinde ekip daha doğru planlama yapabilir. Böylece yolcu uçaktan indikten sonra araç aramakla zaman kaybetmez; şehir içi toplantı, otel geçişi veya şehirler arası devam rotası daha düzenli ilerler.",
    "AVAS Araç Kiralama, hem bireysel hem kurumsal müşteriler için sürdürülebilir memnuniyet üretmeyi hedefler. Bunun için araçların görsel durumu, teknik hazırlığı, iletişim kalitesi ve teklif şeffaflığı birlikte ele alınır. Bir kullanıcı ekonomik araç kiralama için aradığında da, VIP araç kiralama için yazdığında da aynı özenli bilgi akışıyla karşılaşır. Bu standart, markanın İstanbul araç kiralama pazarında güvenilir ve hatırlanabilir olmasını sağlar.",
    "Talebiniz hazır olduğunda tek yapmanız gereken tarih, bölge ve araç beklentinizi paylaşmaktır. Ekibimiz uygun araçları kontrol eder, fiyat bilgisini iletir ve rezervasyon adımlarını anlaşılır biçimde açıklar."
  ];
  return `<section class="section seo-section" id="seo-rehberi"><div class="container narrow">
    <p class="eyebrow eyebrow-dark">SEO Rehberi</p>
    <h2>Türkiye Geneli'de güvenilir araç kiralama deneyimi</h2>
    ${seoParagraphs.map((p) => `<p>${p}</p>`).join("")}
  </div></section>`;
}

function cityLinksSection() {
  return `<section class="section section-tint" id="sehirler"><div class="container">
    <div class="section-heading">
      <p class="eyebrow eyebrow-dark">Şehirlere Göre Araç Kiralama</p>
      <h2>Türkiye'nin tüm şehirleri için reklam ve teklif sayfaları</h2>
      <p>Şehir bazlı aramalarda kullanıcıyı ilgili hizmet sayfasına yönlendirmek için tüm iller için ayrı araç kiralama sayfaları hazırlanmıştır.</p>
    </div>
    <div class="city-link-grid">${cityPages.map((page) => `<a href="${page.slug}.html">${page.city} Araç Kiralama</a>`).join("")}</div>
  </div></section>`;
}

function indexPage() {
  const description = "Türkiye geneli araç kiralama, günlük, aylık, VIP, şoförlü, ekonomik ve kurumsal araç kiralama için hızlı rezervasyon.";
  return `${head({ title: "Araç Kiralama | AVAS Araç Kiralama", description, faq: homeFaq, breadcrumb: [{ name: "Ana Sayfa", url: site.domain }] })}
<body>
${header()}
<main id="icerik">
  <section class="hero-section">
    <div class="hero-orb hero-orb-one"></div>
    <div class="hero-orb hero-orb-two"></div>
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">Türkiye Geneli Araç Kiralama</p>
        <h1>Türkiye Geneli Araç Kiralama ve Rent A Car Hizmeti</h1>
        <p class="hero-text">AVAS Araç Kiralama ile araç kiralama sürecini hızlı, şeffaf ve güven veren bir deneyime dönüştürün. Günlük araç kiralama, aylık araç kiralama, VIP araç kiralama, ekonomik araç kiralama ve kurumsal araç kiralama talepleriniz için Türkiye genelinde çözüm sunuyoruz.</p>
        <div class="hero-points" aria-label="Öne çıkan avantajlar"><span>Türkiye geneli hizmet</span><span>WhatsApp ile hızlı teklif</span><span>1500 TL'den başlayan fiyatlar</span></div>
        <div class="hero-actions">
          <a class="btn btn-primary" href="tel:${site.phoneRaw}">${site.phoneDisplay}</a>
          <a class="btn btn-whatsapp" href="${wa("Merhaba, araç kiralama hakkında bilgi almak istiyorum.")}" target="_blank" rel="noopener">WhatsApp'tan Ulaş</a>
          <a class="btn btn-outline" href="#araclar">Araçları İncele</a>
        </div>
        <div class="trust-grid"><article><strong>7/24</strong><span>iletişim ve teklif</span></article><article><strong>Ofis</strong><span>Mesrutiyet Caddesi</span></article><article><strong>VIP</strong><span>ve ekonomik seçenekler</span></article></div>
      </div>
      <aside class="hero-panel" aria-label="Hızlı rezervasyon formu">
        <div class="reservation-card" id="rezervasyon">
          <div class="card-head"><p class="eyebrow eyebrow-dark">Hızlı Rezervasyon</p><h2>Aracınızı dakikalar içinde ayırtın</h2><p>Talebinizi gönderin, ekibimiz araç uygunluğu ve fiyat bilgisiyle dönüş yapsın.</p></div>
          <form class="reservation-form" id="reservation-form">
            <label><span>Alış noktası</span><input id="pickup-location" name="pickup-location" type="text" placeholder="Örn. Maltepe, Sabiha Gökçen" required></label>
            <label><span>Teslim noktası</span><input id="dropoff-location" name="dropoff-location" type="text" placeholder="Örn. Kadıköy, İstanbul Havalimanı" required></label>
            <div class="form-split"><label><span>Alış tarihi</span><input id="pickup-date" name="pickup-date" type="date" required></label><label><span>Teslim tarihi</span><input id="dropoff-date" name="dropoff-date" type="date" required></label></div>
            <label><span>Araç tipi</span><select id="car-type" name="car-type" required><option value="">Araç tipi seçin</option><option>Ekonomi</option><option>Sedan</option><option>SUV</option><option>VIP / Van</option><option>Kurumsal</option></select></label>
            <button class="btn btn-primary btn-block" type="submit">WhatsApp'tan Teklif Al</button>
            <p class="form-note">Form gönderimi WhatsApp üzerinden hızlı teklif akışı başlatır.</p>
          </form>
        </div>
      </aside>
    </div>
  </section>
  <section class="service-strip" aria-label="Öne çıkan hizmetler"><div class="container service-strip-grid">${landingPages.slice(0, 4).map((p) => `<a href="${p.slug}.html">${p.h1}</a>`).join("")}</div></section>
  <section class="section" id="araclar"><div class="container"><div class="section-heading"><p class="eyebrow eyebrow-dark">Araç Filosu</p><h2>Günlük, aylık, ekonomik ve VIP araç seçenekleri</h2><p>Fiyatlar günlük başlangıç bilgisidir. 1500 TL altında kalan fiyatlar güncellenmiştir; net teklif tarih, süre ve teslim planına göre verilir.</p></div><div class="vehicle-grid">${vehicleCards()}</div></div></section>
  <section class="section section-tint" id="hizmetler"><div class="container"><div class="section-heading"><p class="eyebrow eyebrow-dark">Hizmetler</p><h2>Araç kiralama ihtiyaçlarınıza uygun çözümler</h2></div><div class="advantage-grid">
    ${landingPages.slice(4).map((p) => `<article class="info-card"><h3>${p.h1}</h3><p>${p.intent} için ${p.keyword} hizmeti sunuyoruz.</p><a href="${p.slug}.html">Detaylı incele</a></article>`).join("")}
  </div></div></section>
  ${cityLinksSection()}
  ${homeContent()}
  <section class="section section-dark" id="neden-biz"><div class="container"><div class="section-heading section-heading-light"><p class="eyebrow">Neden Biz?</p><h2>Kurumsal, şeffaf ve ulaşılabilir hizmet</h2></div><div class="reasons-grid"><article class="reason-card"><h3>Net fiyat bilgisi</h3><p>Talep detayına göre sürpriz oluşturmayan teklif yaklaşımı.</p></article><article class="reason-card"><h3>Hızlı iletişim</h3><p>Telefon ve WhatsApp üzerinden kısa sürede geri dönüş.</p></article><article class="reason-card"><h3>Geniş seçenek</h3><p>Ekonomi, sedan, SUV, van, premium ve VIP araçlar.</p></article><article class="reason-card"><h3>Yerel avantaj</h3><p>Türkiye geneli talepleri değerlendiren İstanbul operasyonu.</p></article><article class="reason-card"><h3>Kurumsal süreç</h3><p>Belge, teslim ve sözleşme adımlarında açık bilgilendirme.</p></article><article class="reason-card"><h3>Mobil uyum</h3><p>Her cihazda hızlı teklif ve kolay iletişim deneyimi.</p></article></div></div></section>
  <section class="section section-tint" id="sss"><div class="container"><div class="section-heading"><p class="eyebrow eyebrow-dark">Sık Sorulan Sorular</p><h2>Araç kiralama hakkında merak edilenler</h2></div>${faqBlock(homeFaq)}</div></section>
  ${contactSection()}
</main>
${footer()}
</body>
</html>`;
}

function contactSection() {
  return `<section class="section" id="iletisim"><div class="container contact-grid"><div><div class="section-heading section-heading-left"><p class="eyebrow eyebrow-dark">İletişim</p><h2>Hemen iletişime geçin, aracınızı ayırtın</h2><p>Telefon, WhatsApp veya form üzerinden araç kiralama talebinizi iletin.</p></div><div class="contact-list"><article><h3>Telefon</h3><a href="tel:${site.phoneRaw}">${site.phoneDisplay}</a></article><article><h3>WhatsApp</h3><a href="${wa("Merhaba, araç kiralama hakkında bilgi almak istiyorum.")}" target="_blank" rel="noopener">${site.phoneDisplay}</a></article><article><h3>E-posta</h3><a href="mailto:${site.email}">${site.email}</a></article><article><h3>Adres</h3><p>${site.address}</p></article></div></div><div class="contact-panel"><form id="contact-form" class="contact-form"><label><span>Ad Soyad</span><input id="contact-name" name="contact-name" type="text" placeholder="Ad Soyad" required></label><label><span>Telefon</span><input id="contact-phone" name="contact-phone" type="tel" placeholder="05xx xxx xx xx" required></label><label><span>E-posta</span><input id="contact-email" name="contact-email" type="email" placeholder="ornek@mail.com"></label><label><span>Mesajınız</span><textarea id="contact-message" name="contact-message" rows="5" placeholder="Talebinizi kısaca yazın"></textarea></label><button class="btn btn-primary btn-block" type="submit">WhatsApp'tan Gönder</button></form></div></div></section>`;
}

function landingFaq(page) {
  return [
    { q: `${page.h1} için nasıl rezervasyon yapabilirim?`, a: `${page.h1} talebiniz için ${site.phoneDisplay} numarasını arayabilir veya WhatsApp üzerinden tarih, teslim noktası ve araç grubu bilgisini paylaşabilirsiniz.` },
    { q: `${page.keyword} fiyatları nasıl belirlenir?`, a: "Fiyatlar araç grubu, kiralama süresi, teslim noktası, tarih yoğunluğu ve ek hizmetlere göre belirlenir. Günlük başlangıç fiyatlarında 1500 TL alt sınırı uygulanır." },
    { q: "Araç tesliminde hangi belgeler gerekir?", a: "Geçerli sürücü belgesi, kimlik veya pasaport ve ödeme bilgileri gerekir. Ek koşullar araç grubuna göre rezervasyon sırasında paylaşılır." },
    { q: "WhatsApp ile hızlı teklif alabilir miyim?", a: `Evet. WhatsApp hattımız ${site.phoneDisplay} üzerinden araç uygunluğu ve fiyat teklifi için hızlıca destek alabilirsiniz.` }
  ];
}

function landingText(page) {
  const common = [
    `${page.h1} hizmeti, ${page.intent} için hızlı, güvenilir ve planlı bir çözüm arayan kullanıcılar için hazırlanmıştır. AVAS Araç Kiralama, Türkiye geneli talepleri değerlendiren yapısıyla İstanbul genelinde araç kiralama taleplerini açık iletişim, net fiyatlandırma ve pratik rezervasyon akışıyla karşılar. İster kısa süreli bir ziyaret, ister yoğun bir iş programı, ister aile planı, ister kurumsal filo ihtiyacı olsun; doğru araç grubunu belirlemek ve teslim sürecini baştan netleştirmek konforlu bir deneyimin temelidir.`,
    `${page.keyword} arayan kullanıcılar genellikle aynı anda birkaç beklentiye sahiptir: aracın temiz ve bakımlı olması, teslim saatinin programa uygun ilerlemesi, fiyat bilgisinin sürpriz yaratmaması ve ihtiyaç duyulduğunda hızlı iletişim kurulabilmesi. Bu nedenle rezervasyon öncesinde tarih, süre, alış noktası, teslim noktası, yolcu sayısı, bagaj ihtiyacı ve tercih edilen araç grubu birlikte değerlendirilir. Ekonomi, sedan, SUV, van, premium ve VIP araç kiralama seçenekleri arasından ihtiyaca uygun öneri sunulur.`,
    `Günlük araç kiralama, ${page.place} bölgesinde kısa süreli hareket özgürlüğü isteyen kullanıcılar için idealdir. Toplantı, şehir gezisi, aile ziyareti, bakımda olan kişisel araç veya acil ulaşım ihtiyacı gibi durumlarda günlük kiralama pratiklik sağlar. Aylık araç kiralama ise daha uzun süreli kullanım isteyen bireyler ve şirketler için bütçe planlamasını kolaylaştırır. Uzun dönemli kullanımda araç grubu, kilometre beklentisi ve teslim planı baştan konuşulduğu için süreç daha öngörülebilir ilerler.`,
    `VIP araç kiralama ve şoförlü araç kiralama taleplerinde konfor, temsil kalitesi ve zaman yönetimi öne çıkar. Misafir karşılama, havalimanı transferi, yönetici ulaşımı, özel davet veya yoğun toplantı günü gibi planlarda geniş ve konforlu araçlar tercih edilebilir. Şoförlü kullanım talep edildiğinde güzergah, bekleme süresi ve program akışı ayrıca değerlendirilir. Böylece yalnızca araç değil, bütün ulaşım deneyimi planlanmış olur.`,
    `Ekonomik araç kiralama seçenekleri, bütçesini kontrol etmek isteyen kullanıcılar için önemli avantaj sağlar. Yakıt tüketimi düşük, şehir içinde kullanımı kolay ve günlük ihtiyaçlara uygun modeller özellikle İstanbul trafiğinde pratik bir tercihtir. Sitede yer alan araç fiyatları günlük başlangıç bilgisidir; 1500 TL altında kalan tüm fiyatlar 1500 TL seviyesine yükseltilmiştir. Net fiyat; tarih, süre, teslim noktası, araç grubu ve ek hizmetlere göre teklif aşamasında kesinleştirilir.`,
    `Kurumsal araç kiralama tarafında firmaların beklentisi genellikle düzenli iletişim, belgeli süreç, zamanında teslim ve esnek çözüm üretimidir. AVAS Araç Kiralama; proje ekipleri, saha çalışanları, yönetici ulaşımı ve geçici filo ihtiyaçları için günlük veya aylık araç kiralama alternatifleri sunar. Şirketler için teklif akışı sade tutulur; kullanım amacı, araç sayısı, süre ve lokasyon bilgileri alındıktan sonra uygun araç grubu önerilir.`,
    `Ofis adresimiz ${site.address}. ${page.h1} talebiniz için telefonla arayabilir, WhatsApp üzerinden hızlı teklif alabilir veya iletişim formunu doldurabilirsiniz. Ekibimiz, araç uygunluğunu kontrol ederek size en kısa sürede dönüş yapar ve kiralama adımlarını açık şekilde paylaşır.`,
    `AVAS Araç Kiralama'nın amacı, araç kiralama sürecini yorucu bir araştırma olmaktan çıkarıp güven veren bir hizmet deneyimine dönüştürmektir. ${page.keyword}, İstanbul araç kiralama, Maltepe araç kiralama, günlük araç kiralama, aylık araç kiralama ve VIP araç kiralama gibi farklı aramalarda kullanıcıların ihtiyacı aynı noktada birleşir: doğru araç, doğru zaman, net fiyat ve ulaşılabilir destek. Bu yaklaşım sayesinde rezervasyonun ilk temasından aracın teslimine kadar daha sakin ve kontrollü bir süreç yaşanır.`,
    `${page.h1} sayfasında yer alan bilgiler, kullanıcıya yalnızca genel tanıtım sunmak için değil, doğru karar vermesine yardımcı olmak için hazırlanmıştır. Araç kiralama sürecinde teslim noktası, iade saati, araç sınıfı, yolcu sayısı, bagaj durumu ve ek hizmet beklentisi baştan paylaşıldığında teklif daha isabetli olur. Ekibimiz bu bilgileri aldıktan sonra uygun araçları kontrol eder ve talebe göre ekonomik, sedan, SUV, van, premium veya VIP araç kiralama seçeneklerini karşılaştırmalı şekilde sunabilir.`,
    `Rezervasyon aşamasında telefon ve WhatsApp iletişimi özellikle zaman kazandırır. Kullanıcı uzun formlar arasında kaybolmadan, ${site.phoneDisplay} numarasından arayarak veya ${site.phoneDisplay} WhatsApp hattına yazarak hızlı dönüş alabilir. Adres, tarih ve araç grubu netleştikçe kiralama koşulları da açık hale gelir. Bu şeffaf akış, ${page.keyword} arayan kullanıcıların güvenli, pratik ve planlı bir hizmet almasına yardımcı olur.`
  ];
  return common;
}

function landingPage(page) {
  const faq = landingFaq(page);
  return `${head({ title: page.title, description: page.description, slug: page.slug, faq, breadcrumb: [{ name: "Ana Sayfa", url: site.domain }, { name: page.h1, url: canonical(page.slug) }] })}
<body>
${header()}
<main id="icerik">
  <section class="page-hero">
    <div class="container narrow">
      <p class="eyebrow">${esc(page.keyword)}</p>
      <h1>${esc(page.h1)}</h1>
      <p>${esc(page.description)}</p>
      <div class="hero-actions"><a class="btn btn-primary" href="tel:${site.phoneRaw}">${site.phoneDisplay}</a><a class="btn btn-whatsapp" href="${wa(`Merhaba, ${page.h1} hakkında bilgi almak istiyorum.`)}" target="_blank" rel="noopener">WhatsApp'tan Teklif Al</a></div>
    </div>
  </section>
  <section class="section"><div class="container narrow content-page">${landingText(page).map((p, i) => i === 1 ? `<h2>${esc(page.keyword)} hizmetinde doğru araç seçimi</h2><p>${p}</p>` : i === 3 ? `<h2>Günlük, aylık, VIP ve kurumsal seçenekler</h2><p>${p}</p>` : i === 6 ? `<h2>Telefon, adres ve hızlı iletişim</h2><p>${p}</p>` : `<p>${p}</p>`).join("")}</div></section>
  <section class="section section-tint"><div class="container"><div class="section-heading"><p class="eyebrow eyebrow-dark">Araç Seçenekleri</p><h2>${esc(page.h1)} için öne çıkan araçlar</h2></div><div class="vehicle-grid">${vehicleCards()}</div></div></section>
  <section class="section section-tint"><div class="container"><div class="section-heading"><p class="eyebrow eyebrow-dark">SSS</p><h2>${esc(page.h1)} hakkında sık sorulan sorular</h2></div>${faqBlock(faq)}</div></section>
  ${contactSection()}
</main>
${footer()}
</body>
</html>`;
}

function cityFaq(page) {
  return [
    { q: `${page.city} araç kiralama için nasıl teklif alabilirim?`, a: `${page.city} araç kiralama talebiniz için tarih, teslim noktası, kiralama süresi ve araç grubu bilgisini WhatsApp ya da telefon üzerinden paylaşmanız yeterlidir.` },
    { q: `${page.city} araç kiralama fiyatları nasıl belirlenir?`, a: "Fiyatlar araç grubu, kiralama süresi, dönem yoğunluğu, teslim noktası, iade planı ve ek hizmetlere göre netleştirilir." },
    { q: `${page.city} için günlük ve aylık araç kiralama yapılır mı?`, a: `Evet. ${page.city} için günlük, aylık, ekonomik, VIP, şoförlü ve kurumsal araç kiralama talepleri ayrı ayrı değerlendirilir.` },
    { q: "Tüm şehirlerde teslim garantisi var mı?", a: "Teslim planı araç uygunluğu, tarih, şehir ve operasyon koşullarına göre teyit edilir. Net teslim bilgisi teklif aşamasında paylaşılır." }
  ];
}

function cityLandingText(page) {
  return [
    `${page.h1} sayfası, ${page.city} ve çevresinde araç kiralama arayan kullanıcıların hızlı teklif alabilmesi için hazırlanmıştır. AVAS Araç Kiralama, Türkiye geneli hizmet yaklaşımıyla günlük araç kiralama, aylık araç kiralama, ekonomik araç kiralama, VIP araç kiralama ve kurumsal araç kiralama taleplerini tek bir iletişim akışında değerlendirir.`,
    `${page.region} bölgesinde yer alan ${page.city} için araç kiralama planı yapılırken teslim noktası, kullanım süresi, yolcu sayısı, bagaj ihtiyacı, şehir dışı kullanım ve iade saati gibi bilgiler fiyatı doğrudan etkiler. Bu detaylar baştan paylaşıldığında ekip uygun araç grubunu daha doğru önerir ve kullanıcıya net teklif sunar.`,
    `${page.keyword} arayan kullanıcılar çoğu zaman hızlı iletişim, açık fiyat bilgisi ve uygun araç sınıfı görmek ister. Filoda ekonomik sınıf araçlar, sedan ve SUV seçenekleri, geniş iç hacimli van modeller, premium araçlar ve VIP taleplere uygun alternatifler bulunur. Net uygunluk, tarih ve teslim planına göre kontrol edilir.`,
    `${page.city} için reklamdan gelen kullanıcıların ana sayfa yerine bu şehir sayfasına yönlendirilmesi, reklam metni ile landing page arasındaki uyumu güçlendirir. Böylece kullanıcı aradığı şehir adını sayfada görür, teklif akışını daha kolay anlar ve WhatsApp ya da telefon üzerinden doğrudan aksiyon alabilir.`,
    `Rezervasyon için ${site.phoneDisplay} numarasını arayabilir veya WhatsApp hattına tarih, şehir, teslim noktası ve araç tipi bilgisini yazabilirsiniz. Ekibimiz ${page.city} araç kiralama talebinizi değerlendirir, müsait araçları kontrol eder ve günlük ya da aylık kullanım için uygun seçenekleri paylaşır.`
  ];
}

function cityLandingPage(page) {
  const faq = cityFaq(page);
  return `${head({ title: page.title, description: page.description, slug: page.slug, faq, breadcrumb: [{ name: "Ana Sayfa", url: site.domain }, { name: "Şehirler", url: `${site.domain}/#sehirler` }, { name: page.h1, url: canonical(page.slug) }] })}
<body>
${header()}
<main id="icerik">
  <section class="page-hero">
    <div class="container narrow">
      <p class="eyebrow">${esc(page.region)} Bölgesi</p>
      <h1>${esc(page.h1)}</h1>
      <p>${esc(page.description)}</p>
      <div class="hero-actions"><a class="btn btn-primary" href="tel:${site.phoneRaw}">${site.phoneDisplay}</a><a class="btn btn-whatsapp" href="${wa(`Merhaba, ${page.city} araç kiralama için teklif almak istiyorum.`)}" target="_blank" rel="noopener">WhatsApp'tan Teklif Al</a></div>
    </div>
  </section>
  <section class="section"><div class="container narrow content-page">${cityLandingText(page).map((p, i) => i === 1 ? `<h2>${esc(page.city)} için araç teslim ve rezervasyon planı</h2><p>${p}</p>` : i === 3 ? `<h2>${esc(page.city)} reklamları için doğru landing page</h2><p>${p}</p>` : `<p>${p}</p>`).join("")}</div></section>
  <section class="section section-tint"><div class="container"><div class="section-heading"><p class="eyebrow eyebrow-dark">Araç Seçenekleri</p><h2>${esc(page.city)} için öne çıkan kiralık araçlar</h2><p>Net araç uygunluğu ve fiyat bilgisi tarih, süre ve teslim planına göre verilir.</p></div><div class="vehicle-grid">${vehicleCards()}</div></div></section>
  <section class="section section-tint"><div class="container"><div class="section-heading"><p class="eyebrow eyebrow-dark">SSS</p><h2>${esc(page.h1)} hakkında sık sorulan sorular</h2></div>${faqBlock(faq)}</div></section>
  ${contactSection()}
</main>
${footer()}
</body>
</html>`;
}

function legalPage(page) {
  return `${head({ title: page.title, description: page.description, slug: page.slug, breadcrumb: [{ name: "Ana Sayfa", url: site.domain }, { name: page.h1, url: canonical(page.slug) }] })}
<body>
${header()}
<main id="icerik">
  <section class="page-hero"><div class="container narrow"><p class="eyebrow">Kurumsal Bilgi</p><h1>${esc(page.h1)}</h1><p>${esc(page.description)}</p></div></section>
  <section class="section"><div class="container narrow content-page">${page.body.map((p) => `<p>${p}</p>`).join("")}<div class="contact-list legal-contact"><article><h3>Telefon</h3><a href="tel:${site.phoneRaw}">${site.phoneDisplay}</a></article><article><h3>WhatsApp</h3><a href="${wa("Merhaba, araç kiralama hakkında bilgi almak istiyorum.")}" target="_blank" rel="noopener">${site.phoneDisplay}</a></article><article><h3>Adres</h3><p>${site.address}</p></article></div></div></section>
</main>
${footer()}
</body>
</html>`;
}

function notFoundPage() {
  return `${head({ title: "404 Sayfa Bulunamadı | AVAS Araç Kiralama", description: "Aradığınız sayfa bulunamadı. AVAS Araç Kiralama ana sayfasına dönün veya iletişime geçin.", slug: "404" })}
<body>${header()}<main id="icerik"><section class="page-hero"><div class="container narrow"><p class="eyebrow">404</p><h1>Sayfa bulunamadı</h1><p>Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Araç kiralama talebiniz için ana sayfaya dönebilir ya da WhatsApp üzerinden bize ulaşabilirsiniz.</p><div class="hero-actions"><a class="btn btn-primary" href="index.html">Ana Sayfaya Dön</a><a class="btn btn-whatsapp" href="${wa("Merhaba, araç kiralama hakkında bilgi almak istiyorum.")}" target="_blank" rel="noopener">WhatsApp</a></div></div></section></main>${footer()}</body></html>`;
}

const css = `:root{--bg:#f5f8ff;--surface:rgba(255,255,255,.86);--surface-strong:#fff;--text:#10224f;--muted:#5f6f95;--brand:#0b2a78;--brand-soft:#163c95;--accent:#42d92f;--accent-deep:#22b51a;--shadow-lg:0 28px 60px rgba(8,28,77,.14);--shadow-sm:0 10px 20px rgba(8,28,77,.08);--radius-xl:28px;--radius-lg:22px;--radius-md:16px;--container:1200px}*,*::before,*::after{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:"Manrope",system-ui,-apple-system,sans-serif;color:var(--text);background:radial-gradient(circle at top left,rgba(66,217,47,.12),transparent 28%),radial-gradient(circle at top right,rgba(11,42,120,.12),transparent 30%),linear-gradient(180deg,#f8fbff 0%,#eef4ff 100%)}img{display:block;max-width:100%;height:auto}a{color:inherit;text-decoration:none}button,input,select,textarea{font:inherit}.skip-link{position:absolute;left:-999px;top:0}.skip-link:focus{left:1rem;top:1rem;z-index:100;background:#fff;padding:.75rem 1rem;border-radius:999px}.container{width:min(calc(100% - 2rem),var(--container));margin:0 auto}.narrow{max-width:920px}.eyebrow{margin:0 0 .75rem;font-size:.82rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--accent)}.eyebrow-dark{color:var(--brand)}.site-header{position:sticky;top:0;z-index:30;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);background:rgba(248,251,255,.78);border-bottom:1px solid rgba(16,34,79,.08);transition:background 180ms ease,box-shadow 180ms ease}.site-header.is-scrolled{background:rgba(255,255,255,.96);box-shadow:0 4px 24px rgba(8,28,77,.1)}.header-shell{display:flex;align-items:center;justify-content:space-between;gap:1rem;min-height:82px}.brand img{width:clamp(150px,18vw,210px)}.main-nav,.header-cta{display:flex;align-items:center;gap:.75rem}.main-nav a{color:var(--muted);font-weight:800}.main-nav a:hover,.main-nav a:focus-visible{color:var(--brand)}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:.86rem 1.25rem;border:1px solid transparent;border-radius:999px;font-weight:850;transition:transform 180ms ease,box-shadow 180ms ease,background-color 180ms ease,border-color 180ms ease}.btn:hover,.btn:focus-visible{transform:translateY(-2px)}.btn-primary{color:#fff;background:linear-gradient(135deg,var(--brand) 0%,var(--brand-soft) 100%);box-shadow:0 16px 28px rgba(11,42,120,.22)}.btn-soft{color:var(--brand);background:rgba(11,42,120,.08)}.btn-whatsapp{color:#062b03;background:linear-gradient(135deg,#77ef63 0%,var(--accent) 100%);box-shadow:0 16px 28px rgba(66,217,47,.24)}.btn-outline{color:var(--brand);border-color:rgba(11,42,120,.18);background:rgba(255,255,255,.66)}.btn-block{width:100%}.menu-toggle{display:none;width:48px;height:48px;padding:0;border:0;border-radius:16px;background:rgba(11,42,120,.08)}.menu-toggle span{display:block;width:22px;height:2px;margin:5px auto;background:var(--brand);transition:transform 180ms ease,opacity 180ms ease}.mobile-menu{display:none;padding:0 1rem 1rem;background:rgba(248,251,255,.98)}.mobile-menu a{display:block;padding:.85rem 0;color:var(--brand);font-weight:800;border-top:1px solid rgba(16,34,79,.08)}.hero-section,.page-hero{position:relative;overflow:clip;padding:2.4rem 0}.page-hero{padding:5rem 0 4rem;color:#fff;background:linear-gradient(135deg,#071a49 0%,#0b2a78 100%)}.page-hero p{max-width:760px;color:rgba(255,255,255,.82);line-height:1.8}.hero-orb{position:absolute;border-radius:50%;filter:blur(10px);pointer-events:none}.hero-orb-one{top:3rem;left:-8rem;width:20rem;height:20rem;background:rgba(66,217,47,.15)}.hero-orb-two{right:-8rem;top:-4rem;width:24rem;height:24rem;background:rgba(11,42,120,.13)}.hero-grid{position:relative;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(320px,.9fr);gap:2rem;align-items:center}h1,h2,h3,.hero-copy h1,.section-heading h2,.section-heading-left h2,.card-head h2{font-family:"Sora","Manrope",system-ui,sans-serif;letter-spacing:0;margin-top:0}.hero-copy h1{max-width:780px;font-size:clamp(2.35rem,5vw,4.4rem);line-height:1.02}.page-hero h1{font-size:clamp(2.2rem,5vw,4rem);line-height:1.05}.hero-text,.section-heading p,.content-page p,.info-card p,.reason-card p,.contact-list p,.vehicle-body p{color:var(--muted);line-height:1.82}.hero-text{max-width:68ch;margin:.75rem 0 1.1rem;font-size:1rem}.hero-points,.trust-grid,.service-strip-grid,.advantage-grid,.reasons-grid,.contact-list{display:grid;gap:1rem}.hero-points{grid-template-columns:repeat(3,minmax(0,1fr));margin-bottom:1rem}.hero-points span,.service-strip-grid a{padding:1rem 1.1rem;border:1px solid rgba(16,34,79,.09);border-radius:var(--radius-md);background:rgba(255,255,255,.7);box-shadow:var(--shadow-sm);font-weight:800}.hero-actions{display:flex;flex-wrap:wrap;gap:.85rem}.trust-grid{grid-template-columns:repeat(3,minmax(0,1fr));margin-top:1rem}.trust-grid article,.reservation-card,.info-card,.contact-panel,.reason-card,.vehicle-card{background:var(--surface);border:1px solid rgba(255,255,255,.58);box-shadow:var(--shadow-lg);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}.trust-grid article{padding:1.2rem;border-radius:var(--radius-lg)}.trust-grid strong{display:block;margin-bottom:.35rem;font-size:1.25rem;color:var(--brand)}.trust-grid span{color:var(--muted);font-weight:800}.reservation-card{padding:1.55rem;border-radius:var(--radius-xl)}.reservation-form,.contact-form{display:grid;gap:1rem;margin-top:1.4rem}.reservation-form label,.contact-form label{display:grid;gap:.45rem;color:var(--brand);font-weight:800}.reservation-form input,.reservation-form select,.contact-form input,.contact-form textarea{width:100%;min-height:54px;padding:.95rem 1rem;border:1px solid rgba(16,34,79,.14);border-radius:14px;background:rgba(255,255,255,.95);color:var(--text)}.contact-form textarea{min-height:140px;resize:vertical}.form-split{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.form-note{margin:0;color:var(--muted);font-size:.92rem}.service-strip{padding-bottom:2rem}.service-strip-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.section{padding:5rem 0}.section-tint{background:linear-gradient(180deg,rgba(255,255,255,.72),rgba(234,241,255,.88))}.section-dark{color:#fff;background:linear-gradient(135deg,#08173f 0%,#0b2a78 100%)}.section-heading{max-width:760px;margin:0 auto 2.25rem;text-align:center}.section-heading-left{text-align:left;margin-bottom:1.5rem}.section-heading h2{font-size:clamp(2rem,5vw,3.15rem)}.section-heading-light h2,.section-heading-light p,.section-heading-light .eyebrow,.reason-card h3,.reason-card p{color:#fff}.vehicle-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.25rem}.vehicle-card{overflow:hidden;border-radius:24px}.vehicle-visual{position:relative;aspect-ratio:16/10;overflow:hidden;background:#eaf1ff}.vehicle-visual img{width:100%;height:100%;object-fit:cover}.vehicle-visual::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(245,248,255,.9) 0%,rgba(245,248,255,0) 20%,rgba(245,248,255,.86) 100%)}.vehicle-price{position:absolute;top:1rem;left:1rem;z-index:1;padding:.65rem .9rem;border-radius:999px;background:rgba(7,26,73,.9);color:#fff;font-weight:900}.vehicle-body{display:grid;gap:1rem;padding:1.4rem}.vehicle-topline span{color:var(--accent-deep);font-weight:900;font-size:.82rem;text-transform:uppercase;letter-spacing:.06em}.vehicle-body h3{font-size:1.25rem}.vehicle-specs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.7rem}.vehicle-specs article{padding:.75rem .5rem;border-radius:14px;background:rgba(11,42,120,.05);text-align:center}.vehicle-specs strong{display:block;color:var(--brand);font-size:.78rem}.vehicle-specs span{display:block;margin-top:.3rem;color:var(--muted);font-size:.82rem;font-weight:800}.vehicle-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.8rem}.advantage-grid,.reasons-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.info-card,.reason-card{padding:1.45rem;border-radius:22px}.info-card a{display:inline-block;margin-top:.5rem;color:var(--brand);font-weight:900}.seo-section h2,.content-page h2{font-size:clamp(1.8rem,4vw,2.6rem)}.content-page p,.seo-section p{font-size:1.02rem}.contact-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:2rem;align-items:start}.contact-list article{padding:1.15rem 1.2rem;border:1px solid rgba(16,34,79,.08);border-radius:18px;background:rgba(255,255,255,.66)}.contact-list a{color:var(--brand);font-weight:900}.contact-panel{padding:1.5rem;border-radius:24px}.faq-list{display:grid;gap:.85rem;max-width:900px;margin:0 auto}.faq-item{border:1px solid rgba(16,34,79,.1);border-radius:18px;background:#fff;box-shadow:var(--shadow-sm);overflow:hidden}.faq-item summary{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.15rem 1.35rem;cursor:pointer;list-style:none}.faq-item summary::-webkit-details-marker{display:none}.faq-item summary::after{content:"+";flex-shrink:0;font-size:1.5rem;color:var(--brand);transition:transform 180ms ease}.faq-item[open] summary::after{transform:rotate(45deg)}.faq-item summary h3{margin:0;font-size:1rem}.faq-item>p{margin:0;padding:0 1.35rem 1.25rem;color:var(--muted);line-height:1.8}.sticky-whatsapp{position:fixed;right:1rem;bottom:1rem;z-index:25;padding:.92rem 1.18rem;border-radius:999px;color:#062b03;font-weight:900;background:linear-gradient(135deg,#7af467 0%,var(--accent) 100%);box-shadow:0 18px 30px rgba(66,217,47,.28)}.site-footer{padding:2.4rem 0 3rem;background:rgba(7,26,73,.96);color:rgba(255,255,255,.84)}.footer-shell{display:grid;grid-template-columns:1.2fr 1fr 1.1fr;gap:1.5rem}.site-footer p,.site-footer a,.site-footer span{display:block;color:rgba(255,255,255,.72);margin-bottom:.55rem}.site-footer h3{margin:1rem 0 .65rem}.footer-bottom{margin-top:2rem;padding-top:1.25rem;border-top:1px solid rgba(255,255,255,.1);text-align:center}.footer-bottom p{margin:0;color:rgba(255,255,255,.52)}address{font-style:normal}.legal-contact{margin-top:2rem}#hizmetler,#neden-biz,#sss,#iletisim{content-visibility:auto;contain-intrinsic-size:0 600px}@media (max-width:1024px){.hero-grid,.contact-grid{grid-template-columns:1fr}.advantage-grid,.reasons-grid,.vehicle-grid,.service-strip-grid,.footer-shell{grid-template-columns:repeat(2,minmax(0,1fr))}.hero-points,.trust-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.main-nav,.header-cta{display:none}.menu-toggle{display:block}.mobile-menu.is-open{display:block}.menu-toggle[aria-expanded=true] span:nth-child(1){transform:translateY(7px) rotate(45deg)}.menu-toggle[aria-expanded=true] span:nth-child(2){opacity:0}.menu-toggle[aria-expanded=true] span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}}@media (max-width:720px){.hero-section{padding-top:1.3rem}.page-hero{padding:3.5rem 0}.hero-points,.trust-grid,.service-strip-grid,.advantage-grid,.reasons-grid,.vehicle-grid,.footer-shell,.vehicle-actions,.form-split,.vehicle-specs{grid-template-columns:1fr}.section{padding:4rem 0}.hero-actions{flex-direction:column}.hero-actions .btn,.sticky-whatsapp{width:100%;justify-content:center}.sticky-whatsapp{left:1rem}.trust-grid article,.info-card,.reason-card{backdrop-filter:none;-webkit-backdrop-filter:none;background:#fff}.reason-card{background:rgba(255,255,255,.1)}}@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}html{scroll-behavior:auto}}`;

const cityCss = `.city-link-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1rem}.city-link-grid a{padding:1rem 1.1rem;border:1px solid rgba(16,34,79,.09);border-radius:var(--radius-md);background:rgba(255,255,255,.7);box-shadow:var(--shadow-sm);font-weight:800;color:var(--brand)}@media (max-width:1024px){.city-link-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (max-width:720px){.city-link-grid{grid-template-columns:1fr}}`;

const js = `document.addEventListener("DOMContentLoaded",()=>{const site={phone:"${site.phoneRaw}",phoneText:"${site.phoneDisplay}",whatsapp:"${site.whatsappRaw}"};const year=document.getElementById("footer-year");if(year)year.textContent=new Date().getFullYear();const menuToggle=document.querySelector(".menu-toggle");const mobileMenu=document.getElementById("mobile-menu");if(menuToggle&&mobileMenu){menuToggle.addEventListener("click",()=>{const open=menuToggle.getAttribute("aria-expanded")==="true";menuToggle.setAttribute("aria-expanded",String(!open));mobileMenu.classList.toggle("is-open",!open)});mobileMenu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{menuToggle.setAttribute("aria-expanded","false");mobileMenu.classList.remove("is-open")}))}const header=document.querySelector(".site-header");if(header){let ticking=false;const onScroll=()=>{if(!ticking){requestAnimationFrame(()=>{header.classList.toggle("is-scrolled",window.scrollY>60);ticking=false});ticking=true}};window.addEventListener("scroll",onScroll,{passive:true});onScroll()}const today=new Date().toISOString().split("T")[0];document.querySelectorAll('input[type="date"]').forEach(input=>input.min=today);const makeWa=message=>"https://wa.me/"+site.whatsapp+"?text="+encodeURIComponent(message);const reservation=document.getElementById("reservation-form");reservation?.addEventListener("submit",event=>{event.preventDefault();const message=["Merhaba, hızlı rezervasyon talebi oluşturmak istiyorum.","Alış noktası: "+(document.getElementById("pickup-location")?.value||""),"Teslim noktası: "+(document.getElementById("dropoff-location")?.value||""),"Alış tarihi: "+(document.getElementById("pickup-date")?.value||""),"Teslim tarihi: "+(document.getElementById("dropoff-date")?.value||""),"Araç tipi: "+(document.getElementById("car-type")?.value||"")].join("\\n");window.open(makeWa(message),"_blank","noopener")});const contact=document.getElementById("contact-form");contact?.addEventListener("submit",event=>{event.preventDefault();const message=["Merhaba, iletişim formu üzerinden ulaşıyorum.","Ad Soyad: "+(document.getElementById("contact-name")?.value||""),"Telefon: "+(document.getElementById("contact-phone")?.value||""),(document.getElementById("contact-email")?.value?"E-posta: "+document.getElementById("contact-email").value:""),(document.getElementById("contact-message")?.value?"Mesaj: "+document.getElementById("contact-message").value:"")].filter(Boolean).join("\\n");window.open(makeWa(message),"_blank","noopener")})});`;

function sitemap() {
  const urls = ["", ...landingPages.map((p) => p.slug), ...cityPages.map((p) => p.slug), ...legalPages.map((p) => p.slug)].map((slug) => `  <url><loc>${canonical(slug)}</loc><changefreq>${slug ? "monthly" : "weekly"}</changefreq><priority>${slug ? "0.80" : "1.00"}</priority></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

writeFileSync("index.html", indexPage(), "utf8");
for (const page of landingPages) writeFileSync(`${page.slug}.html`, landingPage(page), "utf8");
for (const page of cityPages) writeFileSync(`${page.slug}.html`, cityLandingPage(page), "utf8");
for (const page of legalPages) writeFileSync(`${page.slug}.html`, legalPage(page), "utf8");
writeFileSync("404.html", notFoundPage(), "utf8");
writeFileSync("css/style.css", `${css}${cityCss}`, "utf8");
writeFileSync("js/main.js", js, "utf8");
writeFileSync("js/cars.js", `const CARS = ${JSON.stringify(cars, null, 2)};\n`, "utf8");
writeFileSync("sitemap.xml", sitemap(), "utf8");
writeFileSync("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${site.domain}/sitemap.xml\n`, "utf8");

console.log(`Generated ${1 + landingPages.length + cityPages.length + legalPages.length + 1} HTML pages, sitemap.xml, robots.txt, css/style.css, js/main.js and js/cars.js.`);
