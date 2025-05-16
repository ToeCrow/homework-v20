// test-hash.js

import bcrypt from 'bcrypt';

const password = 'hemligt123';

// Hasha samma lösenord två gånger
const hash1 = bcrypt.hashSync(password, 10);
const hash2 = bcrypt.hashSync(password, 10);

console.log('Hash 1:', hash1);
console.log('Hash 2:', hash2);

// Verifiera att båda hasharna fortfarande matchar lösenordet
const isMatch1 = bcrypt.compareSync(password, hash1);
const isMatch2 = bcrypt.compareSync(password, hash2);

console.log('\nMatchar hash1:', isMatch1); // true
console.log('Matchar hash2:', isMatch2);   // true
