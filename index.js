// Load environment variables
require('dotenv').config();

const { default: makeWASocket, DisconnectReason, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const P = require('pino');
const qrcode = require('qrcode-terminal');

const config = {
  prefix: '.',
  ownerNumber: process.env.OWNER_NUMBER || '628XXXXXXXXX', // Ambil dari .env, fallback ke nomor default
};

// Logging function
function log(message, type = 'info') {
  console.log(`[${new Date().toISOString()}] [${type.toUpperCase()}] ${message}`);
}

// Send message function
async function sendMessage(sock, receiver, message) {
  try {
    await sock.sendMessage(receiver, { text: message });
    return true;
  } catch (error) {
    log(`Failed to send message: ${error}`, 'error');
    return false;
  }
}

// Handle ping command
async function handleCommand(sock, msg, sender, body) {
  if (body.toLowerCase() === '.ping') {
    await sendMessage(sock, sender, '🏓 PONG!');
  }
}

// Setup connection
async function setupConnection() {
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
        log('QR Code generated, scan to login');
      }

      if (connection === 'close') {
        const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
        log('Connection closed: ' + lastDisconnect?.error, 'error');

        if (shouldReconnect) {
          log('Reconnecting...');
          setTimeout(setupConnection, 3000);
        } else {
          log('Logged out');
          process.exit(0);
        }
      } else if (connection === 'open') {
        log('Connection opened successfully!');
      }
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async ({ messages, type }) => {
      if (type !== 'notify') return;
      const msg = messages[0];
      if (!msg.message) return;
      const sender = msg.key.remoteJid;
      if (!sender || sender.endsWith('@g.us')) return;

      const messageType = Object.keys(msg.message)[0];
      if (messageType === 'conversation') {
        const body = msg.message.conversation;
        if (body.trim()) {
          await handleCommand(sock, msg, sender, body);
        }
      }
    });

    return sock;
  } catch (error) {
    log(`Setup error: ${error}`, 'error');
    process.exit(1);
  }
}

// Start bot
async function startBot() {
  log('Starting WhatsApp Bot...');
  await setupConnection();

  process.on('SIGINT', async () => {
    log('Shutting down...');
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    log('Shutting down...');
    process.exit(0);
  });
}

startBot();
