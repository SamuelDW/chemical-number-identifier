import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
import { isFormattedCorrectlyAnnexOneKE } from '../index.js'

describe('Testing Annex 1 KE format', () => {
    describe('Throwing Errors', () => {
        describe('Passing a null value', () => {
            it('should throw an error', () => {
                expect(() => isFormattedCorrectlyAnnexOneKE(null)).to.throw('Input must be a string')
            })
        })
        describe('Passing a number value', () => {
            it('should throw an error', () => {
                expect(() => isFormattedCorrectlyAnnexOneKE(1)).to.throw('Input must be a string')
            })
        })
        describe('Passing a empty array', () => {
            it('should throw an error', () => {
                expect(() => isFormattedCorrectlyAnnexOneKE([])).to.throw('Input must be a string')
            })
        })

        describe('Passing a empty object', () => {
            it('should throw an error', () => {
                expect(() => isFormattedCorrectlyAnnexOneKE({})).to.throw('Input must be a string')
            })
        })
        describe('Passing undefined', () => {
            it('should throw an error', () => {
                expect(() => isFormattedCorrectlyAnnexOneKE(undefined)).to.throw('Input must be a string')
            })
        })
    })
    describe('Passing Valid KE Annex 1 numbers', () => {
        describe('KE-12345', () => {
            it('should return true', () => {
                const test = isFormattedCorrectlyAnnexOneKE('KE-12345')
                expect(test.success).to.equal(true)
            })
        })
    })
    describe('Passing invalid KE Annex 1', () => {
        describe('K-12', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAnnexOneKE('K-12')
                expect(test.success).to.equal(false)
            })
        })
        describe('KE-12', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAnnexOneKE('KE-12')
                expect(test.success).of.equal(false)
            })
        })
        describe('Ke-12', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAnnexOneKE('Ke-12')
                expect(test.success).of.equal(false)
            })
        })
        describe('KE12', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAnnexOneKE('KE12')
                expect(test.success).of.equal(false)
            })
        })
        describe('KE-1234X', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAnnexOneKE('K-1234X')
                expect(test.success).of.equal(false)
            })
        })
        describe('KE-123456', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAnnexOneKE('KE-123456')
                expect(test.success).of.equal(false)
            })
        })
    })
})
