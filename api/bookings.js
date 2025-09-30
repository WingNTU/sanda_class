import { MongoClient } from 'mongodb';

// MongoDB configuration
const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.DATABASE_NAME || 'sanda_class';

// Telegram Bot configuration
const TELEGRAM_BOT_TOKEN = process.env.TELE_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

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

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const bookingData = req.body;
      
      // Validate required fields
      if (!bookingData.name || !bookingData.telegramHandle || !bookingData.selectedDate) {
        return res.status(400).json({ 
          error: 'Missing required fields: name, telegramHandle, and selectedDate are required' 
        });
      }

      if (!MONGODB_URI) {
        console.error('MONGODB_URI environment variable is required');
        return res.status(500).json({ 
          error: 'Database configuration error' 
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
        error: 'Internal server error. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  } else if (req.method === 'GET') {
    try {
      const { status = 'pending' } = req.query;
      
      if (!MONGODB_URI) {
        console.error('MONGODB_URI environment variable is required');
        return res.status(500).json({ 
          error: 'Database configuration error' 
        });
      }

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
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}