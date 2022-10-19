import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { isValidEC } from '../index.js'
chai.use(chaiAsPromised)

describe('Testing EC is valid', () => {
    describe('Testing Errors are thrown', () => {
        describe('Passing a null value', () => {
            it('should throw an error', () => {
                expect(() => isValidEC(null)).to.throw('Input must be a string')
            })
        })
    })
    describe('Testing Valid EC numbers', () => {
        describe('200-003-9', () => {
            const test = isValidEC('200-003-9')
            it('should return true', () => {
                expect(test.success).to.equal(true)
            })
            it('should return a mesage stating valid', () => {
                expect(test.message).to.equal('200-003-9 is a valid EC number')
            })
        })
    })
    describe('Testing Invalid EC numbers', () => {
        describe('200-003-99', () => {
            const test = isValidEC('200-003-99')
            it('should return false', () => {
                expect(test.success).to.equal(false)
            })
            it('should return a message stating invalid', () => {
                expect(test.message).to.equal('200-003-99 is not a valid EC number')
            })
        })
        describe('200-03-9', () => {
            it('should return false', () => {
                const test = isValidEC('200-03-9')
                expect(test.success).to.equal(false)
            })
        })
        describe('20-003-9', () => {
            it('should return false', () => {
                const test = isValidEC('20-003-9')
                expect(test.success).to.equal(false)
            })
        })
        describe('20X-003-9', () => {
            it('should return false', () => {
                const test = isValidEC('20X-003-9')
                expect(test.success).to.equal(false)
            })
        })
        describe('200-X03-9', () => {
            it('should return false', () => {
                const test = isValidEC('200-X03-9')
                expect(test.success).to.equal(false)
            })
        })
        describe('200-003-X', () => {
            it('should return false', () => {
                const test = isValidEC('200-003-X')
                expect(test.success).to.equal(false)
            })
        })
    })
})
