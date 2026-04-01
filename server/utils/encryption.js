const crypto = require('crypto');

// Ensure we have a consistent key derived from the secret
// scrypt is robust for key derivation
const getKey = () => {
  const secret = process.env.ENCRYPTION_KEY;
  if (!secret) {
    throw new Error('CRITICAL_SECURITY_ERROR: ENCRYPTION_KEY environment variable is not defined.');
  }

  // Use scryptSync to derive a strictly 32-byte key from any secret string.
  // This satisfies the 32-byte requirement for AES-256 regardless of secret length.
  // We use a constant salt for deterministic key derivation from the same secret.
  return crypto.scryptSync(secret, 'secure_guard_salt_v1', 32);
};

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;

/**
 * Encrypts cleartext using AES-256-GCM.
 * Output format: HEX(iv):HEX(authTag):HEX(ciphertext)
 */
function encrypt(text) {
  if (!text) return text;
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const key = getKey();
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
  } catch (error) {
    console.error('[ENCRYPTION_ENGINE_FAILURE]:', error.message);
    throw new Error('Internal Cryptographic Failure - Please check system logs.');
  }
}

/**
 * Decrypts ciphertext using AES-256-GCM.
 * Expects format: HEX(iv):HEX(authTag):HEX(ciphertext)
 */
function decrypt(ciphertext) {
  if (!ciphertext) return ciphertext;
  try {
    const parts = ciphertext.split(':');
    if (parts.length !== 3) {
      throw new Error('INVALID_CIPHERTEXT_FORMAT: Expected 3 parts (iv:tag:data)');
    }

    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encryptedText = parts[2];
    const key = getKey();

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.error('[DECRYPTION_FAILURE]:', error.message);
    // Be specific about key length errors if they propagate from crypto
    if (error.message.includes('key length')) {
      throw new Error('ENCRYPTION_KEY_MISMATCH: The system master key do not match the required 32-byte buffer.');
    }
    throw new Error('Decryption Failed: Integrity verification failed (possibly tampered or wrong key)');
  }
}

module.exports = { encrypt, decrypt };
