import * as Crypto from 'expo-crypto';


async function hashPassword(password) {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
}


async function comparePassword(password, hashed) {
  const hashOfInput = await hashPassword(password);
  return hashOfInput === hashed;
}

export default {
  hashPassword,
  comparePassword
};
