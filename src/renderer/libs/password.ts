const POOL = {
  numbers: '0123456789',
  symbols: '!@#$%^&*()-=_+[]{};:"|,./<>?`~',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
}

const REGEXP = {
  numbers: new RegExp(`[${POOL.numbers}]`),
  symbols: new RegExp(
    `[${POOL.symbols
      .split('')
      .map((s) => '\\' + s)
      .join('')}]`
  ),
  lowercase: new RegExp(`[${POOL.lowercase}]`),
  uppercase: new RegExp(`[${POOL.uppercase}]`)
}

export interface GenerateOptions {
  numbers?: boolean
  symbols?: boolean
  lowercase?: boolean
  uppercase?: boolean
}

export function generate (length: number, options: GenerateOptions = {}) {
  const pool = Object.keys(options).reduce((p, k: keyof typeof POOL) => {
    return options[k] ? p + POOL[k] : p
  }, '')

  const poolLength = pool.length
  if (!poolLength) return ''

  let text = ''

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * poolLength)
    text += pool[index]
  }

  return text
}

const maxLevel = 8

export function test (password: string) {
  let level = Math.min(Math.floor(password.length / 6), 4)

  if (REGEXP.numbers.test(password)) level++
  if (REGEXP.symbols.test(password)) level++
  if (REGEXP.lowercase.test(password)) level++
  if (REGEXP.uppercase.test(password)) level++

  return { level, maxLevel, percent: Math.floor((level / maxLevel) * 100) }
}
