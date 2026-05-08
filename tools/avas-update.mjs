import { copyFileSync, readFileSync, readdirSync, writeFileSync } from "node:fs";

const domain = "https://www.avasarackiralama.com";
const phoneRaw = "+905543416915";
const phoneDisplay = "0554 341 69 15";
const whatsappRaw = "905543416915";
const email = "info@avasarackiralama.com";
const address = "Aydınevler, İnönü Caddesi No:22 34854 Maltepe / İstanbul";
const brand = "AVAS Araç Kiralama";
const shortBrand = "AVAS";
const logo = "logo.svg";

const wa = (text) => `https://wa.me/${whatsappRaw}?text=${encodeURIComponent(text)}`;
const esc = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const canonical = (slug = "") => `${domain}/${slug ? `${slug}.html` : ""}`;

copyFileSync("Beyaz Minimalist Oto Kiralama Logo.svg", logo);

const htmlFiles = readdirSync(".").filter((file) => file.endsWith(".html"));
const textFiles = [...htmlFiles, "build-site.mjs", "js/main.js", "js/cars.js", "robots.txt", "sitemap.xml"].filter(Boolean);
const oldBrand = `Yolcu${"luk"}`;

for (const file of textFiles) {
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  text = text
    .replaceAll(`${oldBrand} Araç Kiralama`, brand)
    .replaceAll(`${oldBrand} AraÃ§ Kiralama`, brand)
    .replaceAll(oldBrand, shortBrand)
    .replaceAll("seyahat", "seyahat")
    .replaceAll("Aydınevler Rent A Car", `${shortBrand} Rent A Car`)
    .replaceAll("İstanbul ve Maltepe", "Türkiye Geneli")
    .replaceAll("Maltepe merkezli", "Türkiye geneli talepleri değerlendiren")
    .replaceAll("İstanbul merkezli", "Türkiye geneli talepleri değerlendiren");
  writeFileSync(file, text, "utf8");
}

const navDesktop = `<nav class="main-nav" aria-label="Ana menü"><a href="araclar.html">Araçlar</a><a href="hakkimizda.html">Hakkımızda</a><a href="arac-kiralama-sartlari.html">Araç Kiralama Şartları</a><a href="kvkk.html">KVKK</a><a href="iletisim.html">İletişim</a></nav>`;
const navMobile = `<nav class="mobile-menu" id="mobile-menu" aria-label="Mobil menü"><a href="araclar.html">Araçlar</a><a href="hakkimizda.html">Hakkımızda</a><a href="arac-kiralama-sartlari.html">Araç Kiralama Şartları</a><a href="kvkk.html">KVKK</a><a href="iletisim.html">İletişim</a><a href="tel:${phoneRaw}">Hemen Ara</a><a href="${wa("Merhaba, AVAS araç kiralama hakkında bilgi almak istiyorum.")}" target="_blank" rel="noopener">WhatsApp'tan Ulaş</a></nav>`;

function normalizeShared(html) {
  return html
    .replace(/<nav class="main-nav"[\s\S]*?<\/nav>/, navDesktop)
    .replace(/<nav class="mobile-menu"[\s\S]*?<\/nav>/, navMobile)
    .replaceAll('href="kullanim-sartlari.html"', 'href="arac-kiralama-sartlari.html"')
    .replaceAll("Kullanım Şartları", "Araç Kiralama Şartları")
    .replaceAll("KullanÄ±m ÅartlarÄ±", "Araç Kiralama Şartları")
    .replaceAll("Hızlı Rezervasyon", "Hızlı Kiralama")
    .replaceAll("HÄ±zlÄ± Rezervasyon", "Hızlı Kiralama")
    .replaceAll("Aracınızı dakikalar içinde ayırtın", "Dakikalar içinde araç kiralama talebi oluşturun")
    .replaceAll("AracÄ±nÄ±zÄ± dakikalar iÃ§inde ayÄ±rtÄ±n", "Dakikalar içinde araç kiralama talebi oluşturun")
    .replaceAll("Hızlı rezervasyon", "Hızlı kiralama")
    .replaceAll("hızlı rezervasyon", "hızlı kiralama")
    .replaceAll("WhatsApp'tan Ulaş", "WhatsApp'tan Ulaş")
    .replace(/<img src="logo\.svg" alt="AVAS Araç Kiralama logosu" width="220" height="72" fetchpriority="high">/g, `<img src="${logo}" alt="${brand} logosu" width="220" height="72" fetchpriority="high">`)
    .replace(/<meta name="theme-color" content="[^"]+">/, '<meta name="theme-color" content="#111111">');
}

for (const file of htmlFiles) {
  let html = normalizeShared(readFileSync(file, "utf8"));
  if (file === "404.html") {
    html = html.replace(/<meta name="robots" content="[^"]+">/, '<meta name="robots" content="noindex, follow">');
  }
  html = html.replace(/<button class="btn btn-primary btn-block" type="submit">WhatsApp'tan (?:Teklif Al|Gönder)<\/button>/g, (match) => {
    if (html.includes("form-consent")) return match;
    return `<p class="form-consent">Formu göndererek <a href="kvkk.html">KVKK Aydınlatma Metni</a> ve <a href="arac-kiralama-sartlari.html">Araç Kiralama Şartları</a> kapsamında talebiniz için iletişime geçilmesini kabul edersiniz.</p>${match}`;
  });
  writeFileSync(file, html, "utf8");
}

if (htmlFiles.includes("istanbul-geneli-arac-kiralama.html")) {
  let html = readFileSync("istanbul-geneli-arac-kiralama.html", "utf8");
  html = html
    .replaceAll("İstanbul Araç Kiralama | AVAS Araç Kiralama", "Türkiye Geneli Araç Kiralama | AVAS")
    .replaceAll("İstanbul Araç Kiralama | AVAS", "Türkiye Geneli Araç Kiralama | AVAS")
    .replaceAll("<h1>İstanbul Araç Kiralama</h1>", "<h1>Türkiye Geneli Araç Kiralama</h1>")
    .replaceAll("İstanbul araç kiralama talepleriniz", "Türkiye geneli araç kiralama talepleriniz");
  writeFileSync("istanbul-geneli-arac-kiralama.html", html, "utf8");
}

let index = readFileSync("index.html", "utf8");
index = index
  .replace(/<title>[\s\S]*?<\/title>/, "<title>Araç Kiralama | AVAS</title>")
  .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="AVAS Araç Kiralama ile Türkiye geneli günlük, aylık, ekonomik, VIP, şoförlü ve kurumsal araç kiralama için hızlı teklif alın.">')
  .replace(/<p class="eyebrow">Türkiye Geneli Araç Kiralama<\/p>\s*<h1>[\s\S]*?<\/h1>\s*<p class="hero-text">[\s\S]*?<\/p>/, `<p class="discount-badge">Bugüne özel %20 indirim fırsatı</p>
        <p class="eyebrow">Türkiye Geneli Araç Kiralama</p>
        <h1>AVAS ile araç kiralama, tek şehirle sınırlı olmayan planlı ulaşım çözümü</h1>
        <p class="hero-text">Günlük, aylık, ekonomik, VIP, şoförlü ve kurumsal araç kiralama talepleriniz için AVAS ekibiyle hızlıca iletişime geçin. Teslim noktası, kullanım süresi, araç grubu, depozito, sigorta ve fiyat bilgileri teklif aşamasında açık şekilde paylaşılır.</p>`)
  .replace(/<div class="hero-points"[\s\S]*?<\/div>/, '<div class="hero-points" aria-label="Öne çıkan avantajlar"><span>Türkiye geneli talep değerlendirme</span><span>WhatsApp ile hızlı teklif</span><span>Şeffaf kiralama şartları</span></div>')
  .replace(/<div class="trust-grid">[\s\S]*?<\/div>\s*<\/div>\s*<aside/, '<div class="trust-grid"><article><strong>%20</strong><span>bugüne özel fırsat</span></article><article><strong>Türkiye</strong><span>geneli talep</span></article><article><strong>Net</strong><span>şart ve teklif akışı</span></article></div></div><aside')
  .replaceAll('href="index.html#araclar"', 'href="araclar.html"')
  .replaceAll('href="#araclar"', 'href="araclar.html"')
  .replace("Araçları İncele", "Araçları İncele");
index = index.replace(/(?:\s*<p class="discount-badge">Bugüne özel %20 indirim fırsatı<\/p>){2,}/g, `
        <p class="discount-badge">Bugüne özel %20 indirim fırsatı</p>`);

if (!index.includes("AVAS araç kiralama yaklaşımı")) {
  index = index.replace("</main>", `<section class="section"><div class="container narrow content-page"><h2>AVAS araç kiralama yaklaşımı</h2><p>AVAS, ana sayfada tek bir şehri öne çıkarmak yerine Türkiye geneli araç kiralama aramalarına dengeli cevap verir. İstanbul, Ankara, İzmir, Antalya, Bursa ve diğer şehirlerden gelen talepler operasyon uygunluğuna göre ayrı ayrı değerlendirilir.</p><p>Google Ads ve SEO açısından kullanıcıya açık iletişim bilgisi, ayrı KVKK metni, araç kiralama şartları, gizlilik ve çerez politikası sunulur. Reklamdan gelen kullanıcı aradığı hizmeti kolayca bulur ve doğrudan telefon ya da WhatsApp üzerinden aksiyon alabilir.</p></div></section></main>`);
}
index = index.replace(/  <section class="section seo-section" id="seo-rehberi">[\s\S]*?  <\/div><\/section>\r?\n  <section class="section section-dark" id="neden-biz">/, `  <section class="section seo-section" id="seo-rehberi"><div class="container narrow">
    <p class="eyebrow eyebrow-dark">AVAS Yaklaşımı</p>
    <h2>Türkiye geneli araç kiralama için dengeli ve şeffaf hizmet</h2>
    <p>AVAS Araç Kiralama, araç kiralama talebini tek bir şehir algısına sıkıştırmadan değerlendirir. İstanbul, Ankara, İzmir, Antalya, Bursa ve diğer şehirlerden gelen taleplerde tarih, teslim noktası, iade planı, araç sınıfı ve kullanım süresi birlikte ele alınır.</p>
    <p>Kullanıcı için önemli olan yalnızca uygun fiyat değildir. Depozito, sigorta/kasko kapsamı, kilometre beklentisi, ek sürücü, teslim saati, iade noktası ve iptal koşulları da karar sürecinin parçasıdır. AVAS, bu bilgileri teklif aşamasında açık şekilde paylaşarak Google Ads ve SEO açısından güven veren bir landing page deneyimi sunar.</p>
    <p>Günlük araç kiralama kısa süreli ulaşım ihtiyaçları için, aylık araç kiralama düzenli kullanım ve bütçe planlaması için, VIP ve şoförlü araç kiralama ise konfor ve temsil kalitesi gerektiren programlar için tercih edilir. Kurumsal araç kiralama taleplerinde araç sayısı, kullanım amacı ve süreye göre ayrı teklif hazırlanır.</p>
    <p>AVAS ile iletişime geçerken şehir, teslim noktası, tarih, araç tipi ve kiralama süresini paylaşmanız yeterlidir. Ekip araç uygunluğunu kontrol eder, fiyat ve şartları netleştirir, uygun seçenekleri telefon veya WhatsApp üzerinden paylaşır.</p>
  </div></section>
  <section class="section section-dark" id="neden-biz">`);
index = index
  .replace("Türkiye'nin tüm şehirleri için reklam ve teklif sayfaları", "Türkiye geneli araç kiralama talepleri")
  .replace("Yerel avantaj</h3><p>Türkiye geneli talepleri değerlendiren İstanbul operasyonu.", "Türkiye geneli yaklaşım</h3><p>Farklı şehir ve teslim noktaları için talep değerlendirme.");
index = normalizeShared(index);
writeFileSync("index.html", index, "utf8");

const shell = normalizeShared(readFileSync("iletisim.html", "utf8"));
const header = shell.match(/<body>\s*([\s\S]*?<main id="icerik">)/)?.[1] ?? "";
const footer = shell.match(/<\/main>\s*([\s\S]*?<\/body>\s*<\/html>)/)?.[1] ?? "";

function page({ slug, title, description, h1, intro, body = "", extra = "" }) {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
  <meta name="author" content="${brand}">
  <meta name="theme-color" content="#111111">
  <link rel="canonical" href="${canonical(slug)}">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${brand}">
  <meta property="og:url" content="${canonical(slug)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${domain}/${logo}">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <link rel="icon" type="image/svg+xml" href="${logo}">
  <link rel="stylesheet" href="css/style.css">
  <script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", name: title, description, url: canonical(slug), publisher: { "@type": "AutoRental", name: brand, telephone: phoneRaw, email, address } })}</script>
  <script src="js/main.js" defer></script>
</head>
<body>
${header}
  <section class="page-hero"><div class="container narrow"><p class="eyebrow">AVAS</p><h1>${esc(h1)}</h1><p>${esc(intro)}</p></div></section>
  ${body}
  ${extra}
</main>
${footer}`;
}

const vehicleGrid = [...readFileSync("index.html", "utf8").matchAll(/<article class="vehicle-card">[\s\S]*?<\/article>\s*<\/div>\s*<\/div>\s*<\/section>/g)][0]?.[0]?.replace("</div></div></section>", "") ?? "";
writeFileSync("araclar.html", page({
  slug: "araclar",
  title: "Araçlar | AVAS Araç Kiralama",
  description: "AVAS araç filosunda ekonomik, sedan, SUV, van, premium ve VIP kiralık araç seçeneklerini inceleyin.",
  h1: "Araçlar",
  intro: "AVAS filosunda günlük, aylık, ekonomik, VIP ve kurumsal araç kiralama ihtiyaçlarına uygun farklı segmentlerde araçlar yer alır.",
  body: `<section class="section"><div class="container"><div class="section-heading"><p class="eyebrow eyebrow-dark">Filo</p><h2>AVAS kiralık araç seçenekleri</h2><p>Net araç uygunluğu ve fiyat bilgisi tarih, süre ve teslim planına göre verilir.</p></div><div class="vehicle-grid">${vehicleGrid}</div></div></section>`
}), "utf8");

writeFileSync("hakkimizda.html", page({
  slug: "hakkimizda",
  title: "Hakkımızda | AVAS Araç Kiralama",
  description: "AVAS Araç Kiralama hakkında kurumsal bilgiler, hizmet yaklaşımı ve Türkiye geneli araç kiralama çözümleri.",
  h1: "Hakkımızda",
  intro: "AVAS, araç kiralama sürecini hızlı, anlaşılır ve güven veren bir deneyime dönüştürmek için çalışan oto kiralama markasıdır.",
  body: `<section class="section"><div class="container narrow content-page"><p>AVAS Araç Kiralama; günlük, aylık, ekonomik, VIP, şoförlü ve kurumsal araç kiralama taleplerinde kullanıcıya net bilgi vermeyi merkeze alır.</p><p>Markanın hizmet yaklaşımı açık iletişim, hızlı geri dönüş ve doğru araç yönlendirmesi üzerine kuruludur. Kullanıcı telefon, WhatsApp veya iletişim formu üzerinden talebini ilettiğinde araç grubu, müsaitlik, teslim planı ve fiyat detayları netleştirilir.</p><p>AVAS, tek bir şehir algısına sıkışmadan Türkiye genelinde araç kiralama taleplerini değerlendiren bir yapı sunar. İstanbul, havalimanı ve bölgesel teslim talepleri operasyon uygunluğuna göre ayrıca planlanır.</p></div></section>`
}), "utf8");

writeFileSync("arac-kiralama-sartlari.html", page({
  slug: "arac-kiralama-sartlari",
  title: "Araç Kiralama Şartları | AVAS",
  description: "AVAS araç kiralama şartları: sürücü belgesi, yaş, depozito, sigorta, kilometre, ödeme, teslim ve iptal koşulları hakkında bilgiler.",
  h1: "Araç Kiralama Şartları",
  intro: "Araç kiralama şartları araç grubu, tarih, kullanım süresi, teslim noktası ve ek hizmetlere göre netleşir.",
  body: `<section class="section"><div class="container narrow content-page"><p>Araç tesliminde geçerli sürücü belgesi, kimlik veya pasaport ve ödeme bilgileri talep edilir. Yaş, ehliyet yılı ve ek sürücü koşulları seçilen araç grubuna göre değişebilir.</p><p>Fiyatlar araç segmenti, kiralama süresi, sezon yoğunluğu, teslim ve iade noktası, kilometre beklentisi, ek sürücü, çocuk koltuğu, şoförlü hizmet ve benzeri ek taleplere göre belirlenir. Günlük başlangıç fiyatları bilgilendirme amaçlıdır; kesin fiyat teklif aşamasında paylaşılır.</p><p>Depozito, sigorta/kasko kapsamı, hasar muafiyeti, yakıt politikası, kilometre sınırı, trafik cezaları, HGS/OGS geçişleri, geç iade ve iptal koşulları rezervasyon öncesinde kullanıcıyla paylaşılır.</p><p>Araç müsaitliği garanti olarak yorumlanmamalıdır. Net araç grubu, teslim saati ve teslim noktası AVAS tarafından operasyon uygunluğuna göre teyit edilir.</p></div></section>`
}), "utf8");

writeFileSync("cerez-politikasi.html", page({
  slug: "cerez-politikasi",
  title: "Çerez Politikası | AVAS",
  description: "AVAS çerez politikası, web sitesinde kullanılan zorunlu ve performans amaçlı çerezler hakkında bilgiler.",
  h1: "Çerez Politikası",
  intro: "AVAS web sitesi, temel işlevleri sağlamak ve deneyimi iyileştirmek için sınırlı teknik veriler kullanabilir.",
  body: `<section class="section"><div class="container narrow content-page"><p>Zorunlu çerezler sitenin güvenli ve doğru çalışması için kullanılabilir. Analitik veya reklam amaçlı çerezler kullanılacaksa ilgili platformların gerektirdiği bilgilendirme ve onay süreçleri ayrıca uygulanmalıdır.</p><p>Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz. Çerezleri kapatmanız bazı site özelliklerinin beklenenden farklı çalışmasına neden olabilir.</p></div></section>`
}), "utf8");

writeFileSync("kullanim-sartlari.html", `<html lang="tr"><head><meta charset="utf-8"><meta name="robots" content="noindex, follow"><meta http-equiv="refresh" content="0; url=arac-kiralama-sartlari.html"><link rel="canonical" href="${canonical("arac-kiralama-sartlari")}"><title>Araç Kiralama Şartları | AVAS</title></head><body><p><a href="arac-kiralama-sartlari.html">Araç Kiralama Şartları sayfasına gidin.</a></p></body></html>`, "utf8");

const cssAdd = `.discount-badge{display:inline-flex;margin:0 0 .8rem;padding:.68rem 1rem;border-radius:999px;background:#111;color:#fff;font-weight:900;box-shadow:0 16px 34px rgba(17,17,17,.18)}.form-consent{margin:0;color:var(--muted);font-size:.92rem;line-height:1.6}.form-consent a{color:var(--brand);font-weight:900;text-decoration:underline}.section-actions{display:flex;justify-content:center;margin-top:1.4rem}.brand{background:#fff;border-radius:18px;padding:.25rem .65rem}.brand img{object-fit:contain}.site-footer img{background:#fff;border-radius:18px;padding:.3rem}`;
let css = readFileSync("css/style.css", "utf8");
if (!css.includes(".discount-badge")) css += cssAdd;
css = css.replaceAll("--brand:#0b2a78", "--brand:#111111").replaceAll("--brand-soft:#163c95", "--brand-soft:#2e2b27").replaceAll("--accent:#42d92f", "--accent:#d6a84f").replaceAll("--accent-deep:#22b51a", "--accent-deep:#9b6d1f");
writeFileSync("css/style.css", css, "utf8");

const sitemapSlugs = ["", "araclar", "hakkimizda", "arac-kiralama-sartlari", "kvkk", "iletisim", "gizlilik-politikasi", "cerez-politikasi", ...htmlFiles.filter((f) => f.endsWith("-arac-kiralama.html")).map((f) => f.replace(".html", ""))];
const unique = [...new Set(sitemapSlugs)];
writeFileSync("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${unique.map((slug) => `  <url><loc>${canonical(slug)}</loc><changefreq>${slug ? "monthly" : "weekly"}</changefreq><priority>${slug ? "0.80" : "1.00"}</priority></url>`).join("\n")}\n</urlset>\n`, "utf8");
writeFileSync("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${domain}/sitemap.xml\n`, "utf8");

writeFileSync("vercel.json", JSON.stringify({
  cleanUrls: false,
  trailingSlash: false,
  headers: [
    { source: "/(.*)", headers: [{ key: "X-Content-Type-Options", value: "nosniff" }] },
    { source: "/images/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    { source: "/css/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    { source: "/js/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] }
  ],
  redirects: [{ source: "/kullanim-sartlari.html", destination: "/arac-kiralama-sartlari.html", permanent: true }],
  framework: null,
  buildCommand: "npm run build",
  installCommand: "npm install",
  outputDirectory: "."
}, null, 2), "utf8");
writeFileSync("package.json", JSON.stringify({
  scripts: { build: "node tools/avas-update.mjs", start: "node serve.mjs" },
  devDependencies: {}
}, null, 2), "utf8");

console.log("AVAS update completed.");
