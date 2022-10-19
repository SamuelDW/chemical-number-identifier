import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { isValidCAS } from '../index.js'
chai.use(chaiAsPromised)


describe('Testing CAS is valid', () => {
    describe('Testing Errors are thrown', () => {
        describe('Passing a null value', () => {
            it('should throw an error', () => {
                expect(() => isValidCAS(null)).to.throw('Input must be a string')
            })
        })
    })
    describe('Testing Valid CAS numbers', () => {
        describe('7732-18-5', () => {
            const test = isValidCAS('7732-18-5')
            it('should return true', () => {
                expect(test.success).to.equal(true)
            })
            it('should return a mesage stating valid', () => {
                expect(test.message).to.equal('7732-18-5 is a valid CAS number')
            })
        })
    })
    describe('Testing Invalid CAS numbers', () => {
        describe('7732-18-50', () => {
            const test = isValidCAS('7732-18-50')
            it('should return false', () => {
                expect(test.success).to.equal(false)
            })
            it('should return a message stating invalid', () => {
                expect(test.message).to.equal('7732-18-50 is not a valid CAS number')
            })
        })
        describe('7732-1-5', () => {
            it('should return false', () => {
                const test = isValidCAS('7732-1-5')
                expect(test.success).to.equal(false)
            })
        })
        describe('7-1-50', () => {
            it('should return false', () => {
                const test = isValidCAS('7-1-50')
                expect(test.success).to.equal(false)
            })
        })
        describe('77XX-18-50', () => {
            it('should return false', () => {
                const test = isValidCAS('7732-18-50')
                expect(test.success).to.equal(false)
            })
        })
        describe('7732-XX-50', () => {
            it('should return false', () => {
                const test = isValidCAS('7732-XX-50')
                expect(test.success).to.equal(false)
            })
        })
        describe('7732-18-XX', () => {
            it('should return false', () => {
                const test = isValidCAS('7732-18-XX')
                expect(test.success).to.equal(false)
            })
        })
    })
})
