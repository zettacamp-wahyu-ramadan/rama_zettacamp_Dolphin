const generatedStrings = new Set();

function generateUniqueRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  do {
    randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
  } while (generatedStrings.has(randomString));

  generatedStrings.add(randomString);
  return randomString;
}

module.exports = {
  generateUniqueRandomString,
};
