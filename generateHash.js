import bcrypt from 'bcrypt';

const generateHash = async (password) => {
  const saltRounds = 10; // Samma som tidigare i din kod
  const hash = await bcrypt.hash(password, saltRounds);
  console.log('Generated hash:', hash);
};

generateHash('BoilerRoom');
