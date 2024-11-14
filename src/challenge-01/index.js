import { join } from 'node:path'
import { readFile } from 'node:fs/promises'

/**
 * @param {string} text
 * @returns {string}
 */
function analizeText (text) {
  const wordMap = new Map()

  for (const word of text.split(' ')) {
    const normalizedWord = word.toLowerCase()
    const count = wordMap.get(normalizedWord) ?? 0
    wordMap.set(normalizedWord, count + 1)
  }

  return [...wordMap.entries()].flatMap(([word, count]) => `${word}${count}`).join('')
}

const FILE_NAME = 'message_01.txt'
const path = join(import.meta.dirname, FILE_NAME)

try {
  const content = await readFile(path, { encoding: 'utf-8' })
  console.log('submit', analizeText(content))
} catch (error) {
  console.log(error.message)
  process.exit(1)
}
