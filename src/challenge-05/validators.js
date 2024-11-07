/**
 * @param {string} value
 * @returns {boolean}
 */
export function isAValidAge (value) {
  if (value === '') return true
  return !isNaN(Number(value))
}

/**
 * @param {string} value
 * @returns {boolean}
 */
export function isAValidEmail (value) {
  const emailRegex = /^[a-zA-Z\d._-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/
  return emailRegex.test(value)
}

/**
 * @param {string} value
 * @returns {boolean}
 */
export function isAValidLocation (value) {
  if (value === '') return true
  return isNaN(value)
}

/**
 * @param {string} value
 * @returns {boolean}
 */
export function isAlphaNumeric (value) {
  const alphaNumericRegex = /^[a-zA-Z\d]+$/
  return alphaNumericRegex.test(value)
}
