// Backend Setup: Firebase + Node.js
// 1. Install dependencies: npm install express cors firebase-admin dotenv next react firebase

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const dotenv = require('dotenv');
const next = require('next');
const path = require('path');

dotenv.config();
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();
server.use(cors());
server.use(express.json());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
});
const db = admin.firestore();

// API: Create or Update User Profile
server.post('/api/profile', async (req, res) => {
  try {
    const { userId, name, bio, image, links, theme } = req.body;
    await db.collection('profiles').doc(userId).set({
      name,
      bio,
      image,
      links,
      theme,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    res.status(200).send({ success: true, message: 'Profile updated!' });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// API: Fetch User Profile
server.get('/api/profile/:userId', async (req, res) => {
  try {
    const doc = await db.collection('profiles').doc(req.params.userId).get();
    if (!doc.exists) return res.status(404).send({ success: false, message: 'Profile not found' });
    res.status(200).send({ success: true, data: doc.data() });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// Serve Next.js frontend
server.all('*', (req, res) => {
  return handle(req, res);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
