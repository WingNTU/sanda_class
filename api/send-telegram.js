const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;
const TELE_BOT_TOKEN = process.env.TELE_BOT_TOKEN;

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

// Function to get chat ID from telegram handle
async function getChatIdFromHandle(telegramHandle) {
  try {
    // For now, we'll need to store chat IDs when users first interact with the bot
    // This is a simplified version - in practice, you'd need users to start a conversation with your bot first
    const client = await connectToDatabase();
    const db = client.db(DATABASE_NAME);
    const collection = db.collection('telegram_users');
    
    const user = await collection.findOne({ telegramHandle: telegramHandle });
    return user?.chatId;
  } catch (error) {
    console.error('Error getting chat ID:', error);
    return null;
  }
}

// Function to send Telegram message
async function sendTelegramMessage(chatId, message) {
  try {
    const telegramApiUrl = `https://api.telegram.org/bot${TELE_BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      }),
    });

    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return { success: false, error: error.message };
  }
}

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { telegramHandle, message } = req.body;

    if (!telegramHandle || !message) {
      return res.status(400).json({ error: 'Telegram handle and message are required' });
    }

    if (!TELE_BOT_TOKEN) {
      console.error('TELE_BOT_TOKEN not configured');
      return res.status(500).json({ error: 'Telegram bot not configured' });
    }

    // Try to get chat ID from telegram handle
    let chatId = await getChatIdFromHandle(telegramHandle);

    if (!chatId) {
      // If we don't have the chat ID stored, we can't send a direct message
      // The user would need to start a conversation with the bot first
      console.log(`Chat ID not found for ${telegramHandle}. User needs to start bot conversation first.`);
      return res.status(404).json({ 
        error: 'Chat ID not found. User needs to start a conversation with the bot first.',
        telegramHandle 
      });
    }

    // Send the message
    const result = await sendTelegramMessage(chatId, message);

    if (result.success) {
      res.status(200).json({ 
        success: true, 
        message: 'Telegram message sent successfully',
        telegramHandle
      });
    } else {
      console.error('Failed to send Telegram message:', result.error);
      res.status(500).json({ 
        error: 'Failed to send Telegram message',
        details: result.data || result.error
      });
    }

  } catch (error) {
    console.error('Error in send-telegram API:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    });
  }
};