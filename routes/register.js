// routes/register.js
import express from 'express';
import bcrypt from 'bcrypt';
import { users } from '../data/users.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password, role = 'user' } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword,
      role,
    };

    users.push(newUser);
    console.log('✅ Registered user:', newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('❌ Error in /register:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
