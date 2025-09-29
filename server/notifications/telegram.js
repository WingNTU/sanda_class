// server/notifications/telegram.js
import fetch from "node-fetch";

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

export async function notifyBooking(booking) {
  const msg = [
    "📅 *New Class Booking*",
    `👤 *Name:* ${escapeMd(booking.name)}`,
    `💬 *Telegram:* @${escapeMd(booking.telegramHandle)}`,
    `📆 *Date:* ${new Date(booking.selectedDate)}`,
    `⏱️ *Duration:* 90min`,
    `🧾 *Notes:* ${escapeMd(booking.remarks || "-")}`,
    `🆔 ${booking._id}`,
  ].join("\n");

  return fetch(`${TELEGRAM_API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: msg,
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true,
    }),
  }).then(r => r.json());
}

// Minimal MarkdownV2 escaping to avoid Telegram formatting errors
function escapeMd(s) {
  return String(s).replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
}
