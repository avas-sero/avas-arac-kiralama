# AVAS Website Project Notes

Bu dosya sonraki oturumlarda kaldığımız yerden devam etmek için referans dosyasıdır. Yeni sohbette önce bu dosyayı oku.

## Proje

- Marka: AVAS Araç Kiralama
- GitHub repo: https://github.com/avas-sero/avas-arac-kiralama
- Vercel proje adı: avas-arac-kiralama
- Production URL: https://avas-arac-kiralama.vercel.app
- Canonical/domain hedefi: https://www.avasarackiralama.com
- İletişim telefonu: 0554 341 69 15
- WhatsApp: 905543416915
- E-posta: info@avasarackiralama.com

## Teknik Yapı

- Site statik HTML/CSS/JS yapısında.
- Ana sayfa: `index.html`
- Stil dosyası: `css/style.css`
- JS: `js/main.js`
- Araç verisi: `js/cars.js`
- Vercel ayarı: `vercel.json`
- Sitemap: `sitemap.xml`
- Robots: `robots.txt`
- Logo: `logo.svg`
- Build/güncelleme yardımcı scripti: `tools/avas-update.mjs`

## Vercel Ayarları

- Framework/Application Preset: `Other`
- Root Directory: boş
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `.`
- Deployment Protection, Password Protection, Vercel Authentication ve Trusted IPs canlı sitede kapalı olmalı.

## Lokal Test

```powershell
node serve.mjs
```

Sonra:

```text
http://localhost:3000
```

Build kontrolü:

```powershell
npm.cmd run build
```

## Güncelleme Akışı

1. Dosyaları düzenle.
2. Lokal test yap.
3. Build çalıştır: `npm.cmd run build`
4. Git durumunu kontrol et.
5. Commit ve push yap.
6. Vercel otomatik deploy eder.

Komutlar:

```powershell
git status --short
git add .
git commit -m "Update AVAS website"
git push
```

Bu ortamda gerekirse Git işlemleri için şu safe directory kullanılabilir:

```powershell
git -c safe.directory="C:/Users/nurak/OneDrive/Masaüstü/CLAUDE YENİ 2" status --short
```

## Önemli Notlar

- Eski marka olan Yolculuk Araç Kiralama geri gelmemeli.
- Eski domain `yolculukarackiralama.com` kullanılmamalı.
- Canonical, sitemap ve robots AVAS domainine göre kalmalı.
- Google Ads için canlı site auth/şifre/403 olmadan gizli sekmede açılmalı.
- Reklamda production URL kullanılmalı; preview deployment URL'leri kullanılmamalı.
- Ana sayfada "Bugüne özel %20 indirim fırsatı" yer alıyor.
- Ana sayfa İstanbul algısını dengelemek için Türkiye geneli dil kullanıyor.
- Ayrı sayfalar korunmalı: `araclar.html`, `hakkimizda.html`, `kvkk.html`, `arac-kiralama-sartlari.html`, `iletisim.html`, `cerez-politikasi.html`.
- Formlarda KVKK ve araç kiralama şartları metni korunmalı.

## Son Bilinen Durum

- GitHub push çalıştı.
- Vercel deploy edildi ancak kullanıcı Vercel tarafında kısa "Authenticating..." / 403 önizleme davranışı gördü.
- Kod içinde auth/middleware/403 üreten bir yapı bulunmadı.
- Bu durum Vercel Deployment Protection / Toolbar / proje ayarı kaynaklı değerlendirildi.
- Kullanıcı gerekirse Vercel projesini silip aynı GitHub repo üzerinden sıfırdan deploy edecekti.
