# AGENTS.md

## Aturan Utama Pengembangan Website

Website ini harus dibangun menggunakan teknologi dasar web saja:

- **HTML**
- **CSS**
- **JavaScript Vanilla (JavaScript murni)**

Tidak diperbolehkan menggunakan framework, library, atau teknologi eksternal kecuali secara eksplisit diminta oleh pengguna.

---

# 1. Teknologi yang Diizinkan

Gunakan hanya:

- HTML5 untuk struktur halaman.
- CSS3 untuk desain dan layout.
- JavaScript murni untuk interaksi dan logika website.

Struktur dasar proyek:

```text
project/
│
├── index.html
├── style.css
└── script.js
```

Untuk proyek yang lebih besar, struktur dapat menggunakan:

```text
project/
│
├── index.html
├── pages/
│   ├── about.html
│   └── contact.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
└── assets/
    ├── images/
    └── icons/
```

---

# 2. Larangan Framework dan Library

Jangan menggunakan:

- React
- Vue
- Angular
- Next.js
- Nuxt.js
- Bootstrap
- Tailwind CSS
- jQuery
- Font Awesome melalui CDN
- Material UI
- Library JavaScript eksternal
- Framework CSS apa pun

Semua fitur harus dibuat menggunakan HTML, CSS, dan JavaScript murni.

---

# 3. Larangan Menggunakan SVG Online

Tidak diperbolehkan menggunakan:

- SVG dari website eksternal.
- SVG CDN.
- SVG online.
- URL SVG dari internet.
- Embed SVG dari sumber luar.
- Icon SVG yang diambil langsung melalui link online.

Contoh yang **dilarang**:

```html
<img src="https://example.com/icon.svg">
```

```css
background-image: url("https://example.com/icon.svg");
```

---

# 4. Larangan Ketergantungan Internet

Website harus dapat berjalan tanpa mengambil elemen visual atau kode dari internet.

Jangan menggunakan:

- CDN CSS.
- CDN JavaScript.
- Google-hosted library.
- External icon library.
- External SVG.
- External image URL.
- External font URL jika tidak diperlukan.

Semua aset harus disimpan secara lokal di dalam folder proyek.

---

# 5. Penggunaan Icon

Untuk icon, prioritaskan:

1. Karakter Unicode.
2. Emoji jika sesuai dengan desain.
3. Icon berbentuk CSS.
4. Gambar PNG/JPG/WebP lokal.

Jangan mengambil icon dari link eksternal.

---

# 6. Aturan HTML

Gunakan HTML yang:

- Semantik.
- Terstruktur.
- Mudah dibaca.
- Memiliki indentasi yang rapi.

Gunakan elemen semantik seperti:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

Setiap halaman harus memiliki struktur HTML5 yang valid dan meta viewport untuk tampilan mobile.

---

# 7. Aturan CSS

CSS harus:

- Responsive.
- Rapi.
- Mudah dikembangkan.
- Menggunakan class yang jelas.
- Tidak menggunakan framework.

Gunakan:

- Flexbox.
- CSS Grid.
- Media Query.
- CSS Variables jika diperlukan.

Website harus dapat digunakan dengan baik pada:

- Desktop.
- Tablet.
- Smartphone.

---

# 8. Aturan JavaScript

Gunakan JavaScript murni.

Contoh:

```javascript
const button = document.querySelector(".menu-button");

button.addEventListener("click", function () {
    document.body.classList.toggle("menu-active");
});
```

Hindari:

- Library eksternal.
- Dependency online.
- Kode yang tidak diperlukan.
- Penggunaan JavaScript jika CSS atau HTML sudah cukup.

Pisahkan logika JavaScript dari HTML jika memungkinkan.

Jangan menggunakan inline event seperti:

```html
<button onclick="doSomething()">
```

Lebih baik menggunakan:

```javascript
element.addEventListener("click", doSomething);
```

---

# 9. Responsivitas

Setiap halaman wajib responsive.

Gunakan pendekatan:

- Mobile-friendly.
- Layout fleksibel.
- Tidak memiliki horizontal scroll yang tidak diperlukan.
- Ukuran teks tetap nyaman dibaca.

Gunakan media query sesuai kebutuhan.

---

# 10. Desain Visual

Desain harus:

- Modern.
- Bersih.
- Konsisten.
- Mudah digunakan.
- Tidak terlalu banyak dekorasi.

Prioritaskan:

- Hierarki visual yang jelas.
- Spacing yang konsisten.
- Typography yang mudah dibaca.
- Kontras warna yang baik.
- Tombol yang mudah dikenali.

---

# 11. Animasi

Gunakan animasi CSS atau JavaScript sederhana.

Animasi harus:

- Ringan.
- Tidak berlebihan.
- Tidak mengganggu pengguna.

Jangan menggunakan library animasi eksternal.

---

# 12. Gambar dan Aset

Semua gambar harus berasal dari:

- Folder lokal proyek.
- File yang disediakan pengguna.
- Aset yang telah tersedia secara lokal.

Contoh:

```html
<img src="assets/images/banner.jpg" alt="Banner website">
```

Jangan menggunakan gambar dari URL eksternal.

Jika belum ada gambar yang diperlukan, gunakan:

- Placeholder berbasis CSS.
- Kotak warna.
- Gradient CSS.
- Layout tanpa gambar.

Jangan secara otomatis mengambil gambar dari internet.

---

# 13. Jangan Menggunakan Placeholder Online

Jangan menggunakan layanan seperti:

- Unsplash URL.
- Lorem Picsum.
- Placeholder.com.
- Random image API.

Gunakan placeholder CSS jika diperlukan.

---

# 14. Fitur Interaktif

Semua fitur interaktif harus dibuat menggunakan JavaScript murni.

Contoh fitur:

- Navbar mobile.
- Modal.
- Dropdown.
- Tab.
- Accordion.
- Carousel sederhana.
- Form validation.
- Dark mode.
- Search sederhana.

Pastikan fitur dapat berjalan tanpa library eksternal.

---

# 15. Penyimpanan Data

Jika website membutuhkan penyimpanan data sederhana, gunakan:

- `localStorage`
- `sessionStorage`

Jangan menggunakan database atau API eksternal kecuali diminta secara khusus.

---

# 16. Aturan Kualitas Kode

Kode harus:

- Bersih.
- Tidak duplikatif.
- Mudah dibaca.
- Memiliki nama variabel yang jelas.
- Memiliki komentar hanya jika diperlukan.

---

# 17. Sebelum Menyelesaikan Website

Lakukan pengecekan:

## HTML
- Apakah struktur HTML valid?
- Apakah semua tag ditutup?
- Apakah gambar memiliki `alt`?

## CSS
- Apakah responsive?
- Apakah layout bekerja di mobile?
- Apakah tidak ada horizontal scroll?

## JavaScript
- Apakah semua tombol berfungsi?
- Apakah tidak ada error di console?
- Apakah interaksi berjalan dengan benar?

## Dependency
Pastikan:

- Tidak ada framework.
- Tidak ada CDN.
- Tidak ada library eksternal.
- Tidak ada SVG online.
- Tidak ada gambar online.
- Tidak ada icon online.

---

# 18. Prinsip Utama

Prioritas pengembangan adalah:

1. **HTML, CSS, dan JavaScript murni.**
2. **Tidak menggunakan framework.**
3. **Tidak menggunakan SVG online atau aset eksternal.**
4. **Semua aset disimpan secara lokal.**
5. **Website harus responsive.**
6. **Kode harus bersih dan mudah dikembangkan.**
7. **Website harus tetap berfungsi tanpa ketergantungan visual dari internet.**

---

# FINAL RULE

Setiap kali membuat atau mengubah website, selalu patuhi aturan berikut:

> **Gunakan hanya HTML, CSS, dan JavaScript Vanilla. Jangan menggunakan framework, library eksternal, CDN, SVG online, gambar online, atau aset yang bergantung pada internet. Semua tampilan, interaksi, dan fungsi harus dibuat menggunakan kode dan aset lokal yang tersedia dalam proyek.**
