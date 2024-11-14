import { join } from 'node:path'
import { readFile } from 'node:fs/promises'

/**
 * @param {string} passwordList
 * @param {number} position
 * @returns {string}
 */
function getInvalidKey (passwordList, position = 1) {
  if (position === 0) throw new RangeError(`Position ${position} out of range`)

  const invalidKeys = []

  for (const password of passwordList.split('\n')) {
    if (!password) continue

    const [policy, key] = password.split(':')
    const [min, max, targetChar] = policy.split(/\s|-/)

    let count = 0

    for (const char of key) {
      if (char === targetChar) count++
    }

    if (count > max || count < min) {
      invalidKeys.push(key.trim())
    }
  }

  return invalidKeys[position - 1] ?? ''
}

const FILE_NAME = 'encryption_policies.txt'
const path = join(import.meta.dirname, FILE_NAME)

const INVALID_PASSWORD_TO_SEARCH = 42

try {
  const content = await readFile(path, { encoding: 'utf-8' })
  console.log('submit', getInvalidKey(content, INVALID_PASSWORD_TO_SEARCH))
} catch (error) {
  console.log(error.message)
  process.exit(1)
}
