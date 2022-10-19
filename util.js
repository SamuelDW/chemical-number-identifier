/**
 * Reverses a given string
 * @param {String} s the string to reverse
 * @returns {String} the reversed string
 */
const reverseString = s => {
    if (!s.trim() || typeof s !== 'string') throw new TypeError('Input must be a string')

    return [...s].reverse().join('')
}

/**
 * Checks if a given final value is equal to a calculated total divided by a specific modulo
 * i.e 7732-18-5 CAS
 *  checksum = 5
 * checkDigit = (8×1 + 1×2 + 2×3 + 3×4 + 7×5 + 7×6) = 105
 * 105 modulo 10 = 5 this would return a true, signaling valid CAS number
 * @param {Number} checkDigit the value to calculate against
 * @param {Number} mod the divisor
 * @param {Number} checkSum what the final digit should be
 * @returns {Boolean}
 * @throws {TypeError}
 */
const isModuloValid = (checkDigit, mod, checkSum) => {
    if (typeof checkDigit !== 'number' || typeof mod !== 'number' || typeof checkSum !== 'number') throw new TypeError('Inputs must be a number')

    return (checkDigit % mod) === checkSum
}

/**
 * Checks if a given final value is equal to a calculated total divided by a specific modulo
 * i.e 7732-18-5 CAS
 *  checksum = 5
 * checkDigit = (8×1 + 1×2 + 2×3 + 3×4 + 7×5 + 7×6) = 105
 * 105 modulo 10 = 5 this would return a true, signaling valid CAS number
 * @param {Number} checkDigit the value to calculate against
 * @param {Number} mod the divisor
 * @param {Number} checkSum what the final digit should be
 * @returns {Boolean}
 * @throws {TypeError}
 */
const isModuloValidExceptionEC = (checkDigit, mod, checkSum) => {
    return ((checkDigit % mod) == 10 && checkSum == 1)
}

/**
 * Calaculates the total of a CAS digit (string format)
 * i.e 456 (4 * 1) + (5 * 2) + (6 * 3)
 * @param {String} digits
 * @returns {String}
 * @throws {TypeError}
 */
const calculateTotalDigitValueCAS = digitsAsString => {
    if (typeof digitsAsString !== 'string') throw new TypeError('Input must be a string')

    let total = 0
    for (let i = 1; i <= digitsAsString.length; i++) {
        total += digitsAsString[i -1] * i
    }

    return total
}

const calculateTotalDigitValueEC = digitsAsString => {
    if (typeof digitsAsString !== 'string') throw new TypeError('Input must be a string')

    let total = 0
    for (let i = 1; i <= digitsAsString.length; i++) {
        total += digitsAsString[i - 1] * i
    }

    return total
}

export {
    reverseString,
    isModuloValid,
    isModuloValidExceptionEC,
    calculateTotalDigitValueCAS,
    calculateTotalDigitValueEC,
}
