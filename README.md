# ♨️ Simple WhatsApp Bot

Selamat datang di **Simple WhatsApp Bot**, sebuah bot WhatsApp sederhana yang dibuat untuk merespons perintah `.ping` dengan balasan `🏓 PONG!`. Bot ini dirancang ringan, mudah digunakan, dan cocok untuk keperluan dasar atau sebagai dasar pengembangan bot WhatsApp lainnya. Dibangun menggunakan **Baileys** (`@whiskeysockets/baileys`), bot ini mendukung autentikasi aman dan konfigurasi fleksibel melalui file `.env`.

## 🚀 Fitur
- **Perintah Ping-Pong**: Kirim `.ping` dan bot akan membalas `🏓 PONG!` dengan cepat.
- **Konfigurasi Mudah**: Nomor owner disimpan di file `.env` untuk keamanan dan kemudahan pengelolaan.
- **Logging Sederhana**: Catatan log yang jelas untuk memantau aktivitas bot.
- **Koneksi Stabil**: Otomatis menyambung kembali jika koneksi terputus, kecuali saat logout.
- **QR Code Login**: Autentikasi WhatsApp menggunakan kode QR yang ditampilkan di terminal.

## 📋 Prasyarat
Sebelum memulai, pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) versi 16 atau lebih baru.
- [npm](https://www.npmjs.com/) (biasanya sudah terinstal bersama Node.js).
- Akses ke WhatsApp untuk memindai kode QR.
- Terminal atau command prompt untuk menjalankan bot.

## 🛠️ Instalasi
Ikuti langkah-langkah berikut untuk menginstal dan menjalankan bot:

1. **Kloning Repositori**
   ```bash
   git clone https://github.com/MikkuChan/Simple_wabot.git
   cd Simple_wabot
   ```

2. **Instal Dependensi**
   ```bash
   npm install
   ```

3. **Buat File `.env`**
   Buat file bernama `.env` di direktori proyek dan tambahkan nomor owner WhatsApp (dengan kode negara, misalnya `62` untuk Indonesia). Contoh:
   ```env
   OWNER_NUMBER=6285727035336
   ```

4. **Jalankan Bot**
   ```bash
   npm start
   ```
   - Bot akan menampilkan kode QR di terminal.
   - Buka WhatsApp di ponsel Anda, masuk ke **Pengaturan > Perangkat Tertaut > Tautkan Perangkat**, lalu pindai kode QR tersebut.

5. **Uji Bot**
   Kirim pesan `.ping` ke nomor yang terkait dengan bot, dan bot akan membalas `🏓 PONG!`.

## 📂 Struktur Direktori
```plaintext
Simple_wabot/
├── bot.js              # File utama bot
├── package.json        # Konfigurasi proyek dan dependensi
├── .env                # File untuk menyimpan variabel lingkungan (misalnya nomor owner)
├── baileys_auth/       # Direktori untuk menyimpan data autentikasi WhatsApp
└── README.md           # Dokumentasi proyek
```

## ⚙️ Konfigurasi
Bot ini menggunakan file `.env` untuk mengelola pengaturan. Variabel yang tersedia:
- `OWNER_NUMBER`: Nomor WhatsApp owner (contoh: `6285727035336`).

Jika file `.env` tidak ditemukan atau variabel `OWNER_NUMBER` kosong, bot akan menggunakan nomor default (`6285727035336`).

## 📦 Dependensi
- `@whiskeysockets/baileys`: Pustaka untuk koneksi WhatsApp.
- `dotenv`: Untuk memuat variabel lingkungan dari file `.env`.
- `pino`: Untuk logging aktivitas bot.
- `qrcode-terminal`: Untuk menampilkan kode QR di terminal.

Semua dependensi tercantum di `package.json` dan akan diinstal otomatis saat menjalankan `npm install`.

## 🔧 Perintah yang Tersedia
| Perintah | Deskripsi                     |
|----------|-------------------------------|
| `.ping`  | Membalas dengan `🏓 PONG!`    |

## 💡 Tips
- **Keamanan**: Jangan unggah file `.env` ke repositori publik. Tambahkan `.env` ke `.gitignore`.
- **Autentikasi**: Direktori `baileys_auth` menyimpan data autentikasi WhatsApp. Jangan hapus direktori ini agar tidak perlu memindai ulang kode QR.
- **Kustomisasi**: Anda dapat menambahkan perintah baru di fungsi `tanganiPerintah` pada file `bot.js`.

## 🐞 Pemecahan Masalah
- **Kode QR Tidak Muncul**: Pastikan koneksi internet stabil dan coba jalankan ulang bot dengan `npm start`.
- **Bot Tidak Merespons**: Periksa apakah nomor WhatsApp sudah terhubung dengan benar dan pesan dikirim ke nomor yang terkait.
- **Error Autentikasi**: Hapus direktori `baileys_auth` dan jalankan ulang bot untuk membuat ulang sesi autentikasi.

## 🤝 Kontribusi
Ingin menambahkan fitur atau memperbaiki bug? Silakan:
1. Fork repositori ini.
2. Buat branch baru: `git checkout -b fitur-baru`.
3. Lakukan perubahan dan commit: `git commit -m "Menambahkan fitur baru"`.
4. Push ke branch: `git push origin fitur-baru`.
5. Buat Pull Request di GitHub.

## 📜 Lisensi
Proyek ini dilisensikan di bawah [MIT License](LICENSE). Anda bebas menggunakan, memodifikasi, dan mendistribusikan kode ini sesuai ketentuan lisensi.

## 🙏 Terima Kasih
Dibuat dengan ❤️ oleh [MikkuChan](https://github.com/MikkuChan). Jika Anda menyukai proyek ini, beri bintang ⭐ di repositori ini atau hubungi saya melalui WhatsApp di `wa.me/6285727035336` untuk pertanyaan atau dukungan!
