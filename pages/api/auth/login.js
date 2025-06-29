import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH; // Store bcrypt hash in env
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  try {
    // Check username
    if (username !== ADMIN_USERNAME) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    if (!ADMIN_PASSWORD_HASH) {
      // Fallback for development - use plain text (NOT RECOMMENDED FOR PRODUCTION)
      const plainPassword = process.env.ADMIN_PASSWORD || 'admin123';
      if (password !== plainPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      // Use bcrypt for production
      const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
      if (!isValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        username,
        role: 'admin',
        iat: Math.floor(Date.now() / 1000)
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      token,
      user: { username, role: 'admin' }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}