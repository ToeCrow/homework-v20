import express from 'express';
import authRoutes from './routes/auth.js'
import registerRoute from './routes/register.js'

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/register', registerRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;

