// Memuat variabel lingkungan dari file .env
require('dotenv').config();

const { default: makeWASocket, DisconnectReason, useMultiFileAuthState } = require('baileys');
const P = require('pino');
const qrcode = require('qrcode-terminal');

const config = {
  prefix: '.', // Awalan perintah
  ownerNumber: process.env.OWNER_NUMBER || '628XXXXXX', // Ambil dari .env, fallback ke nomor default
};

// Fungsi untuk mencatat log
function log(pesan, tipe = 'info') {
  console.log(`[${new Date().toISOString()}] [${tipe.toUpperCase()}] ${pesan}`);
}

// Fungsi untuk mengirim pesan
async function kirimPesan(sock, penerima, pesan) {
  try {
    await sock.sendMessage(penerima, { text: pesan });
    return true;
  } catch (error) {
    log(`Gagal mengirim pesan: ${error}`, 'error');
    return false;
  }
}

// Menangani perintah ping
async function tanganiPerintah(sock, msg, pengirim, isiPesan) {
  if (isiPesan.toLowerCase() === '.ping') {
    await kirimPesan(sock, pengirim, '🏓 PONG!');
  }
}

// Mengatur koneksi WhatsApp
async function aturKoneksi() {
  try {
    const { state, saveCreds } = await useMultiFileAuthState('./baileys_auth');
    const logger = P({ level: 'silent' });

    const sock = makeWASocket({
      auth: state,
      printQRInTerminal: true,
      logger,
    });

    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        qrcode.generate(qr, { small: true });
        log('Kode QR dibuat, silakan scan untuk login');
      }

      if (connection === 'close') {
        const harusRekonek = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
        log('Koneksi terputus: ' + lastDisconnect?.error, 'error');

        if (harusRekonek) {
          log('Menyambungkan kembali...');
          setTimeout(aturKoneksi, 3000);
        } else {
          log('Keluar dari sistem');
          process.exit(0);
        }
      } else if (connection === 'open') {
        log('Koneksi berhasil dibuka!');
      }
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async ({ messages, type }) => {
      if (type !== 'notify') return;
      const msg = messages[0];
      if (!msg.message) return;
      const pengirim = msg.key.remoteJid;
      if (!pengirim || pengirim.endsWith('@g.us')) return;

      const tipePesan = Object.keys(msg.message)[0];
      if (tipePesan === 'conversation') {
        const isiPesan = msg.message.conversation;
        if (isiPesan.trim()) {
          await tanganiPerintah(sock, msg, pengirim, isiPesan);
        }
      }
    });

    return sock;
  } catch (error) {
    log(`Kesalahan pengaturan: ${error}`, 'error');
    process.exit(1);
  }
}

// Memulai bot
async function mulaiBot() {
  log('Memulai Bot WhatsApp...');
  await aturKoneksi();

  process.on('SIGINT', async () => {
    log('Menghentikan bot...');
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    log('Menghentikan bot...');
    process.exit(0);
  });
}

mulaiBot();
