//Checking the crypto module
import crypto from 'node:crypto';
const algorithm = 'aes-256-cbc'; //Using AES encryption
const SECRET = process.env.SECRET;
if(!SECRET){
    throw new Error('Missing SECRET env var!');
}
const key = Buffer.from(SECRET);

type textObject = {
    iv: string,
    encryptedData: string
}

/**
 * Encrypting text
 * @param text
 * @return {iv: string, encryptedData: string}
 */
function encrypt(text: string): {iv: string, encryptedData: string} {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

/**
 * Decrypting text
 * @param secret {textObject}
 * @return string
 */
function decrypt(secret: textObject) {
    let iv = Buffer.from(secret.iv, 'hex');
    let encryptedText = Buffer.from(secret.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

export {
    encrypt,
    decrypt
}