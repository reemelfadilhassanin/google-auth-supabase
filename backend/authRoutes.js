// backend/authRoutes.js

import express from 'express';
import { supabase } from './supabaseClient.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Route to handle Google OAuth login
router.get('/google', async (req, res) => {
  const redirectTo = 'http://localhost:5173/auth/callback'; // URL for the callback page after login

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });

    if (error) {
      console.error('Error during OAuth sign-in:', error);
      return res.status(500).json({ error: error.message });
    }

    // Redirect the user to the OAuth provider's URL
    res.redirect(data.url);
  } catch (error) {
    console.error('Error during Google OAuth:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add other routes as necessary for your backend
export default router;
