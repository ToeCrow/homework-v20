import dotenv from 'dotenv';
import app from './app.js';

dotenv.config(); // .env kommer nu att laddas från rotmappen automatiskt

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});