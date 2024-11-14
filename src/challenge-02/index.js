import { join } from 'node:path'
import { readFile } from 'node:fs/promises'

class CopilerError extends Error {
  constructor (message) {
    super(message)
    this.name = 'CopilerError'
  }
}

/**
 * @param {string} code
 * @returns {string}
 */
function compile (code) {
  let value = 0
  const compiledCode = []

  const ACTIONS = {
    '#': (num) => num + 1,
    '@': (num) => num - 1,
    '*': (num) => num * num,
    '&': (num) => compiledCode.push(num)
  }

  for (const symbol of code) {
    const action = ACTIONS[symbol]
    if (!action) throw new CopilerError(`Unrecognized symbol: ${symbol}`)

    if (action === ACTIONS['&']) {
      action(value)
    } else {
      value = action(value)
    }
  }

  return compiledCode.join('')
}

const FILE_NAME = 'message_02.txt'
const path = join(import.meta.dirname, FILE_NAME)

try {
  const content = await readFile(path, { encoding: 'utf-8' })
  console.log('submit', compile(content))
} catch (error) {
  console.log(error.message)
  process.exit(1)
}
