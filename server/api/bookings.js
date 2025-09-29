import { MongoClient } from 'mongodb';
import { notifyBooking } from "../notifications/telegram.js";

// This is a Vercel API route for handling booking submissions
// MongoDB connection configuration
const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = 'sanda_coaching';

// API handler function
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      // Parse request body
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
        timeSlot: '5:00 PM - 6:30 PM',
        remarks: bookingData.remarks || '',
        submittedAt: new Date().toISOString(),
        status: 'pending'
      };

      // Insert booking into MongoDB
      const result = await bookingsCollection.insertOne(bookingDocument);

      // Close connection
      await client.close();

      // Return success response
      return res.status(201).json({ 
        success: true, 
        bookingId: result.insertedId,
        message: 'Booking request submitted successfully'
      });

    } catch (error) {
      console.error('Booking API error:', error);
      return res.status(500).json({ 
        error: 'Internal server error. Please try again later.' 
      });
    }
  }

  if (req.method === 'GET') {
    try {
      const { status = 'pending' } = req.query;
      
      // Connect to MongoDB
      const client = new MongoClient(MONGODB_URI);
      await client.connect();
      const db = client.db(DATABASE_NAME);
      const bookingsCollection = db.collection('bookings');

      // Fetch bookings with optional status filter
      const bookings = await bookingsCollection
        .find({ status })
        .sort({ submittedAt: -1 })
        .toArray();

      // Close connection
      await client.close();

      return res.status(200).json({ 
        success: true, 
        bookings,
        count: bookings.length 
      });

    } catch (error) {
      console.error('Fetch bookings API error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch bookings' 
      });
    }
  }

  router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create(req.body); // validate/sanitize in production
    // Fire-and-forget (or await + try/catch if you want to surface errors)
    notifyBooking(booking).catch(console.error);
    res.status(201).json({ ok: true, bookingId: booking._id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "Failed to create booking" });
  }
});

  // Method not allowed
  res.status(405).json({ error: 'Method not allowed' });
}




