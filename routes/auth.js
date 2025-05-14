import express from 'express';
import { users } from '../data/users.js';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/auth.js';  // Importera vår middleware
import { requireRole } from '../middleware/roles.js'; 
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// POST /login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({ message: 'Fel användarnamn eller lösenord' });
  }

  // Jämför det hashade lösenordet
  const validPassword = await bcrypt.compare(password, user.password);
  console.log("Comparing password:", password, "with hash:", user.password, "result:", validPassword);

  if (!validPassword) {
    return res.status(401).json({ message: 'Fel användarnamn eller lösenord' });
  }

  // Viktigt: inkludera rollen i payload
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: `Välkommen, ${user.name}`, token });
});


// GET /me (skyddad route)
router.get('/me', authenticateToken, (req, res) => {
  // Här har vi access till req.user eftersom middleware har dekodat token
  res.json({
    id: req.user.id,
    username: req.user.username,
  });
});

// GET /admin (skyddad route)
router.get('/admin', authenticateToken, requireRole('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin!' });
});

export default router;
