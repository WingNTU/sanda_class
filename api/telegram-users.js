const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;

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

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const client = await connectToDatabase();
    const db = client.db(DATABASE_NAME);
    const collection = db.collection('telegram_users');

    if (req.method === 'POST') {
      // Register a new telegram user
      const { telegramHandle, chatId, firstName, lastName } = req.body;

      if (!telegramHandle || !chatId) {
        return res.status(400).json({ error: 'Telegram handle and chat ID are required' });
      }

      // Upsert the user (update if exists, insert if not)
      await collection.updateOne(
        { telegramHandle: telegramHandle },
        { 
          $set: { 
            telegramHandle,
            chatId,
            firstName: firstName || '',
            lastName: lastName || '',
            registeredAt: new Date(),
            lastUpdated: new Date()
          }
        },
        { upsert: true }
      );

      res.status(200).json({ 
        success: true, 
        message: 'Telegram user registered successfully',
        telegramHandle
      });

    } else if (req.method === 'GET') {
      // Get all registered telegram users (for admin purposes)
      const users = await collection.find({}).toArray();
      res.status(200).json({ 
        success: true, 
        users: users.map(user => ({
          telegramHandle: user.telegramHandle,
          firstName: user.firstName,
          lastName: user.lastName,
          registeredAt: user.registeredAt
        }))
      });

    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Error in telegram-users API:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    });
  }
};