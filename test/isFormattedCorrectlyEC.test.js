import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { isFormattedCorrectlyEC } from '../index.js'
chai.use(chaiAsPromised)

describe('Testing EC', () => {
    describe('Testing Errors are thrown', () => {
        describe('Passing a null value', () => {
            it('should throw an error', () => {
                expect(() => isFormattedCorrectlyEC(null)).to.throw('Input must be a string')
            })
        })
    })
    describe('Testing Valid EC numbers', () => {
        describe('200-003-9', () => {
            it('should return true', () => {
                const test = isFormattedCorrectlyEC('200-003-9')
                expect(test.success).to.equal(true)
            })
        })
    })
    describe('Testing Invalid EC numbers', () => {
        describe('200-003-99', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyEC('200-003-99')
                expect(test.success).to.equal(false)
            })
        })
        describe('200-03-9', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyEC('200-03-9')
                expect(test.success).to.equal(false)
            })
        })
        describe('20-003-9', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyEC('20-003-9')
                expect(test.success).to.equal(false)
            })
        })
        describe('20X-003-9', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyEC('20X-003-9')
                expect(test.success).to.equal(false)
            })
        })
        describe('200-X03-9', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyEC('200-X03-9')
                expect(test.success).to.equal(false)
            })
        })
        describe('200-003-X', () => {
            it('should return false', () => {
                const test = isFormattedCorrectlyEC('200-003-X')
                expect(test.success).to.equal(false)
            })
        })
    })
})
