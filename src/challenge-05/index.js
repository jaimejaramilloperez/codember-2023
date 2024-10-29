import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import { isAValidAge, isAValidEmail, isAValidLocation, isAlphaNumeric } from './validators.js'

/**
 * @param {string} user
 * @returns {boolean}
 */
function isAValidUser (user) {
  const [id, username, email, age, location] = user.trim().split(',', 5)

  return isAlphaNumeric(id) &&
    isAlphaNumeric(username) &&
    isAValidEmail(email) &&
    isAValidAge(age) &&
    isAValidLocation(location)
}

/**
 * @param {string} users
 * @returns {string}
 */
function getSecretMessage (users) {
  const invalidUsersFirstChar = []

  for (const user of users.split('\n')) {
    if (!user) continue

    if (!isAValidUser(user)) {
      const [, username] = user.trim().split(',', 5)
      invalidUsersFirstChar.push(username.charAt(0))
    }
  }

  return invalidUsersFirstChar.join('')
}

const FILE_NAME = 'database_attacked.txt'
const path = join(import.meta.dirname, FILE_NAME)

try {
  const content = await readFile(path, { encoding: 'utf-8' })
  console.log('submit', getSecretMessage(content))
} catch (e) {
  console.log(e.message)
  process.exit(1)
}
