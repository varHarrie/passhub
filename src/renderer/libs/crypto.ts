import * as crypto from 'crypto'

/**
 * @reference
 * Node.js - AES Encryption/Decryption with AES-256-GCM using random Initialization Vector + Salt
 * https://gist.github.com/AndiDittrich/4629e7db04819244e843
 */

const iterations = 2333
const keylen = 32

export function encrypt (text: string, masterKey: string) {
  const iv = crypto.randomBytes(16)
  const salt = crypto.randomBytes(64)

  const key = crypto.pbkdf2Sync(masterKey, salt, iterations, keylen, 'sha512')
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)

  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()

  return Buffer.concat([salt, iv, tag, encrypted]).toString('base64')
}

export function decrypt (data: string, masterKey: string) {
  const buffer = Buffer.from(data, 'base64')

  const salt = buffer.slice(0, 64)
  const iv = buffer.slice(64, 80)
  const tag = buffer.slice(80, 96)
  const text = buffer.slice(96)

  const key = crypto.pbkdf2Sync(masterKey, salt, iterations, keylen, 'sha512')
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)

  decipher.setAuthTag(tag)

  return decipher.update(text, undefined, 'utf8') + decipher.final('utf8')
}

export function md5 (data: string) {
  return crypto
    .createHash('md5')
    .update(data)
    .digest('hex')
}
