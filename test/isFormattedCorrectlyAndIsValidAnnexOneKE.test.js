import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
import { isFormattedCorrectlyAndIsValidAnnexOneKE } from '../index.js'

describe('Identifying Annex 1 KE numbers', () => {
    describe('Throwing Errors', () => {
        describe('Passing a null value', () => {
            it('should throw an error', () => {
                expect(() => isFormattedCorrectlyAndIsValidAnnexOneKE(null)).to.throw('Input must be a string')
            })
        })
    })
    describe('Passing Valid KE Annex 1 numbers', () => {
        describe('KE-12345', () => {
            const test = isFormattedCorrectlyAndIsValidAnnexOneKE('KE-12345')
            it('should return true', () => {
                expect(test.success).to.equal(true)
            })
            it('should return a message stating its valid', () => {
                expect(test.message).to.equal('KE-12345 is formatted correctly and is valid')
            })
        })
    })
    describe('Passing invalid KE Annex 1 numbers', () => {
        describe('K-12', () => {
            const test = isFormattedCorrectlyAndIsValidAnnexOneKE('K-12')
            it('should return false', () => {
                expect(test.success).of.equal(false)
            })
            it('should return a message stating its invalid', () => {
                expect(test.message).to.equal('K-12 is not formatted correctly')
            })
        })
        describe('KE-12', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAndIsValidAnnexOneKE('KE-12')
                expect(test.success).of.equal(false)
            })
        })
        describe('Ke-12', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAndIsValidAnnexOneKE('Ke-12')
                expect(test.success).of.equal(false)
            })
        })
        describe('KE12', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAndIsValidAnnexOneKE('KE12')
                expect(test.success).of.equal(false)
            })
        })
        describe('KE-1234X', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAndIsValidAnnexOneKE('K-1234X')
                expect(test.success).of.equal(false)
            })
        })
        describe('KE-123456', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAndIsValidAnnexOneKE('KE-123456')
                expect(test.success).of.equal(false)
            })
        })
    })
})
