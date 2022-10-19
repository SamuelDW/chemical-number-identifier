'use-strict'

import { calculateTotalDigitValueCAS, calculateTotalDigitValueEC, isModuloValid, isModuloValidExceptionEC, reverseString } from './util.js'

const CAS_REGEX = /^\d{2,7}-\d{2}-\d{1}$/ // does string fit XX-YY-Z up to XXXXXXX-YY-Z
const EC_REGEX = /^\d{3}-\d{3}-\d{1}$/ // does string fit XXX-YYY-Z
const KE_ANNEX_ONE_REGEX = /^KE-\d{5}$/ // does string fit KE-XXXXX
const KE_ANNEX_TWO_REGEX = /^\d{4}-\d{1}-\d{1,4}$/ // does string fit YYYY-X-X to YYYY-XX-ZZZZ where Y is year

/**
* Determines which chemical number identifier is used, and if it is valid
* @param {String} stringInput the chemical number to figure out which identifier it uses
* @returns {String}
* @throws {TypeError}
*/
const identifyChemicalNumber = (stringInput) => {
    if (typeof stringInput !== 'string') throw new TypeError('Input must be a string')

    const doesStringMatchIdentifier = Object
        .entries(identificationObject)
        .map(([, value]) =>  {return value.valid(stringInput)} )

    const isMatches = doesStringMatchIdentifier.find(value => value.success === true)
    if (isMatches !== undefined) return isMatches

    const isCloseMatch = doesStringMatchIdentifier.find(value => value.error === 'invalid')
    if (isCloseMatch !== undefined) return isCloseMatch

    return {
        success: false,
        message: 'No Chemical Identifiers were matched',
        originalInput: stringInput,
        error: 'format',
    }
}


/**
 * Identifies all the strings in array, determines their type and if they are valid
 *  If invalid states "String does not match known chemical identifier"
 * @param {String[]} stringArray
 */
const identifyChemicalNumbers = (stringArray) => {
    if (!Array.isArray(stringArray)) throw new TypeError('Input must be an array')

    if(!stringArray.every(string => typeof string === 'string')) throw new TypeError('All elements of the array must be a string')

    const results = Object
        .values(stringArray)
        .flatMap( value => { return identifyChemicalNumber(value)})

    return results
}

/**
 * Determines if a cas number is formatted correctly
 * @param {String} casString the number to check
 * @returns {{success: boolean, message: string}}
 * @throws {TypeError}
 */
const isFormattedCorrectlyCAS = (casString) => {
    if (typeof casString !== 'string') throw new TypeError('Input must be a string')

    const isValid = CAS_REGEX.test(casString)

    return {
        success: isValid,
        message: isValid ? `${casString} is formatted correctly` : `${casString} is not formatted correctly`,
        originalInput: casString,
    }
}

/**
 * Determines if a ec number is valid
 * @param {String} ecString the number to check
 * @returns {{success: boolean, message: string}}
 * @throws {TypeError}
 */
const isFormattedCorrectlyEC = (ecString) => {
    if (typeof ecString !== 'string') throw new TypeError('Input must be a string')

    const isValid =  EC_REGEX.test(ecString)

    return {
        success: isValid,
        message: isValid ? `${ecString} is formatted correctly` : `${ecString} is not formatted correctly`,
        originalInput: ecString,
    }
}

/**
 * Checks if a given string fits the format KE-XXXXX
 * @param {String} keString the ke string to check
 * @returns {{success: boolean, message: string}}
 * @throws {TypeError}
 */
const isFormattedCorrectlyAnnexOneKE = (keString) => {
    if (typeof keString !== 'string') throw new TypeError('Input must be a string')

    const isValid = KE_ANNEX_ONE_REGEX.test(keString)

    return {
        success: isValid,
        message: isValid ? `${keString} is formatted correctly` : `${keString} is not formatted correctly`,
        originalInput: keString,
    }
}

/**
 * Checks if a given string fits the format YYYY-Z-XXXX
 * @param {String} keString keString the ke string to check
 * @returns {{success: boolean, message: string}}
 * @throws {TypeError}
 */
const isFormattedCorrectlyAnnexTwoKE = (keString) => {
    if (typeof keString !== 'string') throw new TypeError('Input must be a string')

    const isValid = KE_ANNEX_TWO_REGEX.test(keString)

    return {
        success: isValid,
        message: isValid ? `${keString} is formatted correctly` : `${keString} is not formatted correctly`,
        originalInput: keString,
    }
}

/**
 * Determines which annex a ke number belongs to
 *  for true false use isFormattedCorrectlyAnnexTwoKE() or
 *  isFormattedCorrectlyAnnexOneKE()
 * @param {String} keString
 * @returns {{ success: boolean, message: string }} { success: boolean, message: string }
 * @throws { TypeError } when anything but a string is passed in
 */
const isFormattedCorrectlyKE = (keString) => {
    if (typeof keString !== 'string') throw new TypeError('Input must be a string')

    if (KE_ANNEX_ONE_REGEX.test(keString)) return {
        success: true,
        message: `${keString} matches KE Annex 1 numbers`,
        originalInput: keString,
    }

    if (KE_ANNEX_TWO_REGEX.test(keString)) return {
        success: true,
        message: `${keString} matches KE Annex 2 numbers`,
        originalInput: keString,
    }

    return {
        success: false,
        message: `${keString} did not match either Annex numbers`,
        originalInput: keString
    }
}

/**
 * Checks that a CAS Registry Number fits the formula that governs them
 *  Example:
 *  CAS Number 7732-18-5
 *  5 = (8×1 + 1×2 + 2×3 + 3×4 + 7×5 + 7×6) mod 10
 * @param {String} casString
 * @returns {{success: boolean, message: string}} { success: boolean, message: string }
 * @throws {TypeError}
 */
const isValidCAS = (casString) => {
    if (typeof casString !== 'string') throw new TypeError('Input must be a string')

    const parts = casString.split('-')
    const checkSum = parseInt(parts[2])
    const checkDigits = reverseString(parts[1]) + reverseString(parts[0])
    const total = calculateTotalDigitValueCAS(checkDigits)
    const moduloValueCAS = 10
    const isValid = isModuloValid(total, moduloValueCAS, checkSum)

    return {
        success: isValid,
        message: isValid ? `${casString} is a valid CAS number` : `${casString} is not a valid CAS number`,
        originalInput: casString,
    }
}

/**
 * Checks that a EC number (European Community Number) fits the formula that governs them
 *  R = (N1 + 2N2 + 3N3 + 4N4 + 5N5 + 6N6) mod 11
 * @param {String} ecString
 * @returns {{success: boolean, message: string}} {success: boolean, message: string}
 * @throws {TypeError}
 */
const isValidEC = (ecString) => {
    if (typeof ecString !== 'string') throw new TypeError('Input must be a string')

    const parts = ecString.split('-')
    const checkSum = parseInt(parts[2])
    const checkDigits = parts[0] + parts[1]
    const total = calculateTotalDigitValueEC(checkDigits)
    const moduloValueEC = 11
    const isValid = isModuloValid(total, moduloValueEC, checkSum)
        ? isModuloValid(total, moduloValueEC, checkSum)
        : isModuloValidExceptionEC(total, moduloValueEC, checkSum)

    return {
        success: isValid,
        message: isValid ? `${ecString} is a valid EC number` : `${ecString} is not a valid EC number`,
        originalInput: ecString,
    }
}

/**
 * Determines if a given string fits the Annex 1 KE list
 *  i.e KE-12345
 * @param {String} keString the string to test
 * @returns {{success: boolean, message: string}} {success: boolean, message: string}
 * @throws {TypeError} if you pass in a non string or an empty string
 */
const isValidAnnexOneKE = (keString) => {
    if (typeof keString !== 'string') throw new TypeError('Input must be a string')

    const isValid = keString.length === 8

    return {
        success: isValid,
        message: isValid ? `${keString} is a valid Annex 1 KE number` : `${keString} is not a valid Annex 1 KE number`,
        originalInput: keString,
    }
}

/**
 * Determines if a given string fits the Annex 2 KE list
 *  i.e KE-12345
 * @param {String} keString the string to test
 * @returns {{success: boolean, message: string}} { success: boolean, message: string }
 * @throws {TypeError} if you pass in a non string or an empty string
 */
const isValidAnnexTwoKE = (keString) => {
    if (typeof keString !== 'string') throw new TypeError('Input must be a string')

    const parts = keString.split('-') // split on first occurance of the -
    const year = parseInt(parts[0])
    const date = new Date().getFullYear()
    const AnnexTwoYearOfIntroduction = 1991
    const isValid = !(year > date || year < AnnexTwoYearOfIntroduction || isNaN(year))

    return {
        success: isValid,
        message: isValid ? `${keString} is a valid Annex 2 KE number` : `${keString} is not a valid Annex 2 KE number`,
        originalInput: keString,
    }

}

/**
 * Determines which Annex the number is from, and whether this is valid or not
 * @param {String} keString
 * @returns {{success: boolean, message: string}} {success: boolean, message: string}
 * @throws {TypeError}
 */
const isValidKE = (keString) => {
    if (typeof keString !== 'string') throw new TypeError('Input must be a string')

    const isValidAnnexOne = isValidAnnexOneKE(keString)
    if (isValidAnnexOne.success) return {
        success: true,
        message: `${keString} is a valid Annex 1 KE number`,
        originalInput: keString,
    }

    const isValidAnnexTwo = isValidAnnexTwoKE(keString)
    if (isValidAnnexTwo.success) return {
        success: true,
        message: `${keString} is a valid Annex 2 KE number`,
        originalInput: keString,
    }

    return {
        success: false,
        message: `${keString} is not a valid KE number for Annex 1 or Annex 2`,
        originalInput: keString,
    }
}

/**
 *
 * @param {String} casString
 * @returns {{success: boolean, message: string}} {success: boolean, message: string}
 * @throws {TypeError}
 */
const isFormattedCorrectlyAndIsValidCAS = (casString) => {
    const isFormattedCas = isFormattedCorrectlyCAS(casString)
    if (!isFormattedCas.success) return {
        success: isFormattedCas.success,
        message: isFormattedCas.message,
        type: 'CAS Number',
        numberFormat: 'XX-YY-Z - XXXXXXX-YY-Z',
        error: 'format',
        formatted: false,
        valid: false,
        originalInput: casString,
    }

    const isValid = isValidCAS(casString)
    if (!isValid.success) return {
        success: isValid.success,
        message: isValid.message,
        type: 'CAS Number',
        numberFormat: 'XX-YY-Z - XXXXXXX-YY-Z',
        error: 'invalid',
        formatted: true,
        valid: false,
        originalInput: casString,
    }

    return {
        success: true,
        message: `${casString} is formatted correctly and is valid`,
        type: 'CAS Number',
        numberFormat: 'XX-YY-Z - XXXXXXX-YY-Z',
        error: null,
        formatted: true,
        valid: true,
        originalInput: casString
    }
}

/**M
 *
 * @param {String} ecString
 * @returns {success: boolean, message: string} {success: boolean, message: string}
 * @throws {TypeError}
 */
const isFormattedCorrectlyAndIsValidEC = (ecString) => {
    const formattedEc = isFormattedCorrectlyEC(ecString)
    if (!formattedEc.success) return {
        success: formattedEc.success,
        message: formattedEc.message,
        type: 'EC Number',
        numberFormat: 'XXX-YYY-Z',
        error: 'format',
        formatted: false,
        valid: false,
        originalInput: ecString,
    }

    const validEc = isValidEC(ecString)
    if (!validEc.success) return {
        success: validEc.success,
        message: validEc.message,
        type: 'EC Number',
        numberFormat: 'XXX-YYY-Z',
        error: 'invalid',
        formatted: true,
        valid: false,
        originalInput: ecString,
    }

    return {
        success: true,
        message: `${ecString} is formatted correctly and is valid`,
        type: 'EC Number',
        numberFormat: 'XXX-YYY-Z',
        error: null,
        formatted: true,
        valid: true,
        originalInput: ecString,
    }
}

/**
 * Determines whether a given string is formatted correctly and is valid
 * @param {String} keString
 * @returns {{success: boolean, message: string}} {success: boolean, message: string}
 * @throws {TypeError}
 */
const isFormattedCorrectlyAndIsValidAnnexOneKE = (keString) => {

    const formattedKE = isFormattedCorrectlyAnnexOneKE(keString)
    if (!formattedKE.success) return {
        success: formattedKE.success,
        message: formattedKE.message,
        type: 'KE Annex 1',
        numberFormat: 'KE-XXXXX',
        error: 'format',
        formatted: false,
        valid: false,
        originalInput: keString,
    }

    const validKE = isValidAnnexOneKE(keString)
    if (!validKE.success) return {
        success: validKE.success,
        message: validKE.message,
        type: 'KE Annex 1',
        numberFormat: 'KE-XXXXX',
        error: 'invalid',
        formatted: true,
        valid: false,
        originalInput: keString,

    }

    return {
        success: true,
        message: `${keString} is formatted correctly and is valid`,
        type: 'KE Annex 1',
        numberFormat: 'KE-XXXXX',
        error: null,
        formatted: true,
        valid: true,
        originalInput: keString,
    }
}

/**
 * Determines whether a given string is formatted correctly
 * @param {String} keString
 * @returns {{success: boolean, message: string}} {success: boolean, message: string}
 * @throws {TypeError}
 */
const isFormattedCorrectlyAndIsValidAnnexTwoKE = (keString) => {

    const formattedKE = isFormattedCorrectlyAnnexTwoKE(keString)
    if (!formattedKE.success) return {
        success: formattedKE.success,
        message: formattedKE.message,
        type: 'KE Annex 2',
        numberFormat: 'YYYY-X-ZZZZ',
        error: 'format',
        formatted: false,
        valid: false,
        originalInput: keString,
    }

    const validKE = isValidAnnexTwoKE(keString)
    if (!validKE.success) return {
        success: validKE.success,
        message: validKE.message,
        type: 'KE Annex 2',
        numberFormat: 'YYYY-X-ZZZZ',
        error: 'invalid',
        formatted: true,
        valid: false,
        originalInput: keString,
    }

    return {
        success: true,
        message: `${keString} is formatted correctly and is valid`,
        type: 'KE Annex 2',
        numberFormat: 'YYYY-X-ZZZZ',
        error: null,
        formatted: true,
        valid: true,
        originalInput: keString,
    }
}

/**
 * Object to use for identifyChemicalNumber
 */
const identificationObject = {
    ['CAS Registry Number']: {
        valid: isFormattedCorrectlyAndIsValidCAS,
    },
    ['EC European Community Number']: {
        valid: isFormattedCorrectlyAndIsValidEC,
    },
    ['KE Annex 1']: {
        valid: isFormattedCorrectlyAndIsValidAnnexOneKE,
    },
    ['KE Annex 2']: {
        valid: isFormattedCorrectlyAndIsValidAnnexTwoKE,
    },
}

export default identifyChemicalNumber

export {
    identifyChemicalNumber,
    identifyChemicalNumbers,
    isFormattedCorrectlyAndIsValidAnnexOneKE,
    isFormattedCorrectlyAndIsValidAnnexTwoKE,
    isFormattedCorrectlyAndIsValidCAS,
    isFormattedCorrectlyAndIsValidEC,
    isFormattedCorrectlyAnnexOneKE,
    isFormattedCorrectlyAnnexTwoKE,
    isFormattedCorrectlyCAS,
    isFormattedCorrectlyEC,
    isFormattedCorrectlyKE,
    isValidAnnexOneKE,
    isValidAnnexTwoKE,
    isValidCAS,
    isValidEC,
    isValidKE
}
