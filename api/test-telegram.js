// Telegram Bot configuration
const TELEGRAM_BOT_TOKEN = process.env.TELE_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Function to send Telegram message
async function sendTelegramNotification(bookingData) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error('Telegram credentials not configured');
  }

  const message = `🥋 *Test Sanda Class Booking!*\n\n` +
    `👤 *Name:* ${bookingData.name}\n` +
    `📱 *Telegram:* ${bookingData.telegramHandle}\n` +
    `📅 *Date:* ${new Date(bookingData.selectedDate).toLocaleDateString('en-SG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Singapore'
    })}\n` +
    `⏰ *Time:* ${bookingData.timeSlot}\n` +
    `📝 *Remarks:* ${bookingData.remarks || 'None'}\n` +
    `🕐 *Submitted:* ${new Date().toLocaleString('en-SG', { timeZone: 'Asia/Singapore' })}`;

  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const response = await fetch(telegramUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send Telegram notification: ${error}`);
  }

  return response.json();
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const testBooking = {
        name: 'Test User',
        telegramHandle: '@testuser',
        selectedDate: new Date().toISOString(),
        timeSlot: '5:30 PM - 7:00 PM',
        remarks: 'This is a test notification from Vercel'
      };
      
      await sendTelegramNotification(testBooking);
      res.status(200).json({ 
        success: true, 
        message: 'Test notification sent successfully',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Test telegram error:', error);
      res.status(500).json({ 
        error: 'Failed to send test notification',
        details: error.message 
      });
    }
  } else {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}