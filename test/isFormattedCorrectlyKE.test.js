import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
import { isFormattedCorrectlyKE } from '../index.js'

describe('Testing KE format', () => {
    describe('Throwing Errors', () => {
        describe('Passing a null value', () => {
            it('should throw an error', () => {
                expect(() => isFormattedCorrectlyKE(null)).to.throw('Input must be a string')
            })
        })
        describe('Passing a number value', () => {
            it('should throw an error', () => {
                expect(() => isFormattedCorrectlyKE(1)).to.throw('Input must be a string')
            })
        })
        describe('Passing a empty array', () => {
            it('should throw an error', () => {
                expect(() => isFormattedCorrectlyKE([])).to.throw('Input must be a string')
            })
        })

        describe('Passing a empty object', () => {
            it('should throw an error', () => {
                expect(() => isFormattedCorrectlyKE({})).to.throw('Input must be a string')
            })
        })
        describe('Passing undefined', () => {
            it('should throw an error', () => {
                expect(() => isFormattedCorrectlyKE(undefined)).to.throw('Input must be a string')
            })
        })
    })
    describe('Passing Valid KE Annex 1 numbers', () => {
        describe('KE-12345', () => {
            it('should return true', () => {
                const test = isFormattedCorrectlyKE('KE-12345')
                expect(test.success).to.equal(true)
            })
        })
    })
    describe('Passing invalid KE Annex 1 numbers', () => {
        describe('K-12', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyKE('K-12')
                expect(test.success).of.equal(false)
            })
        })
        describe('KE-12', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyKE('KE-12')
                expect(test.success).of.equal(false)
            })
        })
        describe('Ke-12', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyKE('Ke-12')
                expect(test.success).of.equal(false)
            })
        })
        describe('KE12', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyKE('KE12')
                expect(test.success).of.equal(false)
            })
        })
        describe('KE-1234X', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyKE('K-1234X')
                expect(test.success).of.equal(false)
            })
        })
        describe('KE-123456', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyKE('KE-123456')
                expect(test.success).of.equal(false)
            })
        })
    })
    describe('Passing Valid KE Annex 2 numbers', () => {
        describe('2009-2-50', () => {
            it('should return true', () => {
                const test = isFormattedCorrectlyKE('2009-2-50')
                expect(test.success).to.equal(true)
            })
        })
    })
    describe('Passing invalid KE Annex 2 numbers', () => {
        describe('209-2-50', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyKE('209-2-50')
                expect(test.success).of.equal(false)
            })
        })
        describe('2009-20-50', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyKE('2009-20-50')
                expect(test.success).of.equal(false)
            })
        })
        describe('2009-2-50000', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyKE('2009-2-50000')
                expect(test.success).of.equal(false)
            })
        })
        describe('200X-2-50', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyKE('200X-2-50')
                expect(test.success).of.equal(false)
            })
        })
        describe('2009-X-50', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyKE('2009-X-50')
                expect(test.success).of.equal(false)
            })
        })
        describe('2009-2-5X', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyKE('2009-2-5X')
                expect(test.success).of.equal(false)
            })
        })
    })
})
