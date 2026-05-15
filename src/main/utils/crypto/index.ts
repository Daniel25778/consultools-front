import { AES, enc } from 'crypto-js';

const cryptoConfig = import.meta.env.VITE_CRYPTO_KEY;

export const encryptUniqueData = (data: string): string =>
  AES.encrypt(data, enc.Utf8.parse(cryptoConfig), {
    iv: enc.Utf8.parse(cryptoConfig)
  }).toString();

export const encryptData = (data: string, onlyLetters?: boolean): string => {
  if (onlyLetters)
    return AES.encrypt(data, cryptoConfig)
      .toString()
      .replace(/[^a-zA-Z]/gu, '');

  return AES.encrypt(data, cryptoConfig).toString();
};

export const decryptData = (data: string): string | null => {
  try {
    return AES.decrypt(data, cryptoConfig).toString(enc.Utf8);
  } catch {
    return null;
  }
};
