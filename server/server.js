import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB configuration
const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.DATABASE_NAME || 'sanda_class';

if (!MONGODB_URI) {
  console.error('MONGODB_URI environment variable is required');
  process.exit(1);
}

// Telegram Bot configuration
const TELEGRAM_BOT_TOKEN = process.env.TELE_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.warn('⚠️ Telegram bot credentials not found. Notifications will be disabled.');
}

// Function to send Telegram message
async function sendTelegramNotification(bookingData) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('📱 Telegram notification skipped - credentials not configured');
    return;
  }

  try {
    const message = `🥋 *New Sanda Class Booking!*\n\n` +
      `👤 *Name:* ${bookingData.name}\n` +
      `📱 *Telegram:* ${bookingData.telegramHandle}\n` +
      `📅 *Date:* ${new Date(bookingData.selectedDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}\n` +
      `⏰ *Time:* ${bookingData.timeSlot}\n` +
      `📝 *Remarks:* ${bookingData.remarks || 'None'}\n` +
      `🕐 *Submitted:* ${new Date().toLocaleString()}`;

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

    if (response.ok) {
      console.log('📱 Telegram notification sent successfully');
    } else {
      const error = await response.text();
      console.error('❌ Failed to send Telegram notification:', error);
    }
  } catch (error) {
    console.error('❌ Telegram notification error:', error.message);
  }
}

// Test MongoDB connection on startup
async function testConnection() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Successfully connected to MongoDB Atlas');
    console.log(`📊 Database: ${DATABASE_NAME}`);
    await client.close();
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}

// Booking API endpoint
app.post('/api/bookings', async (req, res) => {
  try {
    const bookingData = req.body;
    
    // Validate required fields
    if (!bookingData.name || !bookingData.telegramHandle || !bookingData.selectedDate) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, telegramHandle, and selectedDate are required' 
      });
    }

    // Connect to MongoDB
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const bookingsCollection = db.collection('bookings');

    // Prepare booking document
    const bookingDocument = {
      name: bookingData.name.trim(),
      telegramHandle: bookingData.telegramHandle.trim(),
      selectedDate: new Date(bookingData.selectedDate).toISOString(),
      timeSlot: bookingData.timeSlot || '5:00 PM - 7:30 PM',
      remarks: bookingData.remarks || '',
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };

    // Insert booking into MongoDB
    const result = await bookingsCollection.insertOne(bookingDocument);
    await client.close();

    console.log('New booking received:', bookingDocument);

    // Send Telegram notification
    await sendTelegramNotification(bookingDocument);

    res.status(201).json({ 
      success: true, 
      bookingId: result.insertedId,
      message: 'Booking request submitted successfully'
    });

  } catch (error) {
    console.error('Booking API error:', error);
    res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
});

// Get bookings endpoint (for telegram bot automation)
app.get('/api/bookings', async (req, res) => {
  try {
    const { status = 'pending' } = req.query;
    
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const bookingsCollection = db.collection('bookings');

    const bookings = await bookingsCollection
      .find({ status })
      .sort({ submittedAt: -1 })
      .toArray();

    await client.close();

    res.status(200).json({ 
      success: true, 
      bookings,
      count: bookings.length 
    });

  } catch (error) {
    console.error('Fetch bookings API error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch bookings' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Sanda Coaching API is running' });
});

// Test Telegram notification endpoint
app.post('/api/test-telegram', async (req, res) => {
  try {
    const testBooking = {
      name: 'Test User',
      telegramHandle: '@testuser',
      selectedDate: new Date().toISOString(),
      timeSlot: '5:00 PM - 7:30 PM',
      remarks: 'This is a test notification'
    };
    
    await sendTelegramNotification(testBooking);
    res.json({ success: true, message: 'Test notification sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send test notification' });
  }
});

// Start server with MongoDB connection test
async function startServer() {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`🚀 Sanda Class API server running on port ${PORT}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  });
}

startServer().catch(console.error);

export default app;