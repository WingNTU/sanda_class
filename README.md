# Sanda Class - Martial Arts Training Platform

A full-stack web application for a Sanda (Chinese kickboxing) training class with booking system and automated telegram bot integration.

## 📁 Project Structure

```
sanda_class/
├── client/                     # Frontend React Application
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── ui/            # shadcn/ui components
│   │   │   ├── About.tsx      # About section component
│   │   │   ├── BookingModal.tsx # Booking form modal
│   │   │   ├── Contact.tsx    # Contact information
│   │   │   ├── Hero.tsx       # Hero section
│   │   │   ├── Navigation.tsx # Navigation bar
│   │   │   ├── PhotoGallery.tsx # Media gallery
│   │   │   └── Services.tsx   # Training services
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utility libraries
│   │   ├── pages/             # Page components
│   │   └── assets/            # Static assets (images, videos)
│   ├── public/                # Public assets
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.ts         # Vite configuration
│   ├── tailwind.config.ts     # Tailwind CSS config
│   └── tsconfig.json          # TypeScript config
│
├── server/                     # Backend Node.js Application
│   ├── api/                   # API endpoints
│   │   └── bookings.js        # Booking CRUD operations
│   ├── server.js              # Express server setup
│   └── package.json           # Backend dependencies
│
├── package.json               # Root package.json with scripts
├── bun.lockb                  # Bun lock file
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or bun
- MongoDB database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sanda_class
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```
   Or install individually:
   ```bash
   npm install              # Root dependencies
   npm run install:client   # Frontend dependencies
   npm run install:server   # Backend dependencies
   ```

3. **Environment Setup**
   Create a `.env` file in the server directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/sanda_class
   PORT=3002
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```
   This runs both frontend (port 5173) and backend (port 3002) concurrently.

### Individual Commands

**Frontend (Client)**
```bash
npm run client:dev      # Start frontend dev server
npm run client:build    # Build for production
npm run client:preview  # Preview production build
```

**Backend (Server)**
```bash
npm run server:dev      # Start backend with watch mode
npm run server:start    # Start backend production
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **shadcn/ui** - Component library
- **React Hook Form** - Form management
- **React Router DOM** - Client-side routing
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Concurrently** - Run multiple commands

## 📱 Features

### 🎯 Core Features
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Smooth Navigation** - Smooth scrolling between sections
- **Interactive Photo Gallery** - 2-row horizontal scrolling with video support
- **Booking System** - Modal-based booking form with calendar integration
- **Form Validation** - Client-side validation with React Hook Form + Zod

### 🗓️ Booking System
- **Weekend Only Slots** - Available Saturdays & Sundays, 5:00 PM - 7:30 PM
- **MongoDB Storage** - Booking data stored for telegram bot automation
- **Form Fields:**
  - Name (required)
  - Telegram handle (required)
  - Preferred date/time (calendar picker)
  - Remarks (optional)

### 🎨 Design System
- **Font Family** - Poppins for all text elements
- **Color Scheme** - Martial arts inspired color palette
- **Components** - shadcn/ui based component system
- **Responsive Layout** - Mobile, tablet, and desktop optimized

## 🔧 Configuration Files

### Frontend Configuration
- `client/vite.config.ts` - Vite bundler configuration with video asset support
- `client/tailwind.config.ts` - Tailwind CSS customization
- `client/tsconfig.json` - TypeScript compiler options
- `client/components.json` - shadcn/ui component configuration

### Backend Configuration
- `server/server.js` - Express server setup with CORS and MongoDB connection
- `server/api/bookings.js` - Booking API endpoints (GET, POST, PUT, DELETE)

## 📡 API Endpoints

### Bookings API (`/api/bookings`)
```javascript
GET    /api/bookings     # Get all bookings
POST   /api/bookings     # Create new booking
PUT    /api/bookings/:id # Update booking
DELETE /api/bookings/:id # Delete booking
```

### Booking Data Structure
```javascript
{
  name: String,           // Customer name
  telegramHandle: String, // @username
  date: Date,            // Selected date/time
  remarks: String,       // Optional notes
  createdAt: Date,       // Auto-generated
  updatedAt: Date        // Auto-generated
}
```

## 🤖 Telegram Bot Integration

The booking system is designed to integrate with a Telegram bot for automated notifications:
1. Bookings are stored in MongoDB with structured data
2. Telegram bot can fetch booking data via API endpoints
3. Automated notifications can be sent to instructors
4. Booking confirmations can be sent to customers

## 🚀 Deployment

### Frontend Deployment
```bash
cd client
npm run build
# Deploy dist/ folder to your hosting platform
```

### Backend Deployment
```bash
cd server
npm run start
# Deploy to your Node.js hosting platform
```

### Environment Variables
Ensure these environment variables are set in production:
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 3001)

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For support or questions, please contact the development team or create an issue in the repository.
