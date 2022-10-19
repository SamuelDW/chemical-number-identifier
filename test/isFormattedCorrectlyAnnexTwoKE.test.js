import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
import { isFormattedCorrectlyAnnexTwoKE } from '../index.js'

describe('Testing Annex 2 KE format', () => {
    describe('Throwing Errors', () => {
        describe('Passing a null value', () => {
            it('should throw an error', () => {
                expect(() => isFormattedCorrectlyAnnexTwoKE(null)).to.throw('Input must be a string')
            })
        })
        describe('Passing a number value', () => {
            it('should throw an error', () => {
                expect(() => isFormattedCorrectlyAnnexTwoKE(1)).to.throw('Input must be a string')
            })
        })
        describe('Passing a empty array', () => {
            it('should throw an error', () => {
                expect(() => isFormattedCorrectlyAnnexTwoKE([])).to.throw('Input must be a string')
            })
        })

        describe('Passing a empty object', () => {
            it('should throw an error', () => {
                expect(() => isFormattedCorrectlyAnnexTwoKE({})).to.throw('Input must be a string')
            })
        })
        describe('Passing undefined', () => {
            it('should throw an error', () => {
                expect(() => isFormattedCorrectlyAnnexTwoKE(undefined)).to.throw('Input must be a string')
            })
        })
    })
    describe('Passing Valid KE Annex 2 numbers', () => {
        describe('2009-2-50', () => {
            it('should return true', () => {
                const test = isFormattedCorrectlyAnnexTwoKE('2009-2-50')
                expect(test.success).to.equal(true)
            })
        })
    })
    describe('Passing invalid KE Annex 2 numbers', () => {
        describe('209-2-50', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAnnexTwoKE('209-2-50')
                expect(test.success).of.equal(false)
            })
        })
        describe('2009-20-50', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAnnexTwoKE('2009-20-50')
                expect(test.success).of.equal(false)
            })
        })
        describe('2009-2-50000', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAnnexTwoKE('2009-2-50000')
                expect(test.success).of.equal(false)
            })
        })
        describe('200X-2-50', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAnnexTwoKE('200X-2-50')
                expect(test.success).of.equal(false)
            })
        })
        describe('2009-X-50', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAnnexTwoKE('2009-X-50')
                expect(test.success).of.equal(false)
            })
        })
        describe('2009-2-5X', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAnnexTwoKE('2009-2-5X')
                expect(test.success).to.equal(false)
            })
        })
    })
})
