import { join } from 'node:path'
import { readFile } from 'node:fs/promises'

/**
 * @param {string} fileName
 * @returns {boolean}
 */
function isAValidFileName (fileName) {
  const [alphanumericString, checksum] = fileName.trim().split('-')
  if (alphanumericString === checksum) return true

  const charsMap = new Map()

  for (const char of alphanumericString) {
    const count = charsMap.get(char) ?? 0
    charsMap.set(char, count + 1)
  }

  const uniqueChars = []

  for (const [key, value] of charsMap) {
    if (value === 1) uniqueChars.push(key)
  }

  return uniqueChars.join('') === checksum
}

/**
 * @param {string} files
 * @param {number} position
 * @returns {string}
 */
function getValidChecksumFile (files, position = 1) {
  if (position === 0) throw new RangeError(`Position ${position} out of range`)

  const validChecksumFiles = []

  for (const file of files.split('\n')) {
    if (!file) continue

    if (isAValidFileName(file)) {
      const [, checksum] = file.trim().split('-')
      validChecksumFiles.push(checksum)
    }
  }

  return validChecksumFiles[position - 1] ?? ''
}

const FILE_NAME = 'files_quarantine.txt'
const path = join(import.meta.dirname, FILE_NAME)

const REAL_FILE_TO_SEARCH = 33

try {
  const content = await readFile(path, { encoding: 'utf-8' })
  console.log('submit', getValidChecksumFile(content, REAL_FILE_TO_SEARCH))
} catch (error) {
  console.log(error.message)
  process.exit(1)
}
