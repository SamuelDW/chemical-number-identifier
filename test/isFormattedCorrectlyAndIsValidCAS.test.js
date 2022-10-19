import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { isFormattedCorrectlyAndIsValidCAS } from '../index.js'
chai.use(chaiAsPromised)

describe('Testing CAS', () => {
    describe('Testing Errors are thrown', () => {
        describe('Passing a null value', () => {
            it('should throw an error', () => {
                expect(() => isFormattedCorrectlyAndIsValidCAS(null)).to.throw('Input must be a string')
            })
        })
    })
    describe('Testing Valid CAS numbers', () => {
        describe('7732-18-5', () => {
            it('should return true', () => {
                const test = isFormattedCorrectlyAndIsValidCAS('7732-18-5')
                expect(test.success).to.equal(true)
            })
        })
    })
    describe('Testing Invalid CAS numbers', () => {
        describe('7732-18-50', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAndIsValidCAS('7732-18-50')
                expect(test.success).to.equal(false)
            })
        })
        describe('7732-1-5', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAndIsValidCAS('7732-1-5')
                expect(test.success).to.equal(false)
            })
        })
        describe('7-1-50', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAndIsValidCAS('7-1-50')
                expect(test.success).to.equal(false)
            })
        })
        describe('77XX-18-50', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAndIsValidCAS('7732-18-50')
                expect(test.success).to.equal(false)
            })
        })
        describe('7732-XX-50', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAndIsValidCAS('7732-XX-50')
                expect(test.success).to.equal(false)
            })
        })
        describe('7732-18-XX', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyAndIsValidCAS('7732-18-XX')
                expect(test.success).to.equal(false)
            })
        })
    })
})
