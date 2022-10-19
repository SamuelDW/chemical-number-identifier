import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
import { isValidKE } from '../index.js'

describe('Validating KE numbers', () => {
    describe('Throwing Errors', () => {
        describe('Passing a null value', () => {
            it('should throw an error', () => {
                expect(() => isValidKE(null)).to.throw('Input must be a string')
            })
        })
    })
    describe('Passing Valid KE Annex 2 numbers', () => {
        describe('2017-2-13', () => {
            const test = isValidKE('2017-2-13')
            it('should return true', () => {
                expect(test.success).to.equal(true)
            })
            it('should return a message stating its valid', () => {
                expect(test.message).to.equal('2017-2-13 is a valid Annex 2 KE number')
            })
        })
    })
    describe('Passing invalid KE Annex 2 numbers', () => {
        describe('K-12', () => {
            const test = isValidKE('K-12')
            it('should return false', () => {
                expect(test.success).of.equal(false)
            })
            it('should return a message stating its invalid', () => {
                expect(test.message).to.equal('K-12 is not a valid KE number for Annex 1 or Annex 2')
            })
        })
        describe('KE-12', () => {
            it('should return false', () => {
                const test = isValidKE('KE-12')
                expect(test.success).of.equal(false)
            })
        })
        describe('Ke-12', () => {
            it('should return false', () => {
                const test = isValidKE('Ke-12')
                expect(test.success).of.equal(false)
            })
        })
        describe('KE12', () => {
            it('should return false', () => {
                const test = isValidKE('KE12')
                expect(test.success).of.equal(false)
            })
        })
        describe('KE-1234X', () => {
            it('should return false', () => {
                const test = isValidKE('K-1234X')
                expect(test.success).of.equal(false)
            })
        })
        describe('KE-123456', () => {
            it('should return false', () => {
                const test = isValidKE('KE-123456')
                expect(test.success).of.equal(false)
            })
        })
    })
    describe('Passing Valid KE Annex 1 numbers', () => {
        describe('KE-12345', () => {
            const test = isValidKE('KE-12345')
            it('should return true', () => {
                expect(test.success).to.equal(true)
            })
            it('should return a message stating its valid', () => {
                expect(test.message).to.equal('KE-12345 is a valid Annex 1 KE number')
            })
        })
    })
    describe('Passing invalid KE Annex 1 numbers', () => {
        describe('K-12', () => {
            const test = isValidKE('K-12')
            it('should return false', () => {
                expect(test.success).of.equal(false)
            })
            it('should return a message stating its invalid', () => {
                expect(test.message).to.equal('K-12 is not a valid KE number for Annex 1 or Annex 2')
            })
        })
        describe('KE-12', () => {
            it('should return false', () => {
                const test = isValidKE('KE-12')
                expect(test.success).of.equal(false)
            })
        })
        describe('Ke-12', () => {
            it('should return false', () => {
                const test = isValidKE('Ke-12')
                expect(test.success).of.equal(false)
            })
        })
        describe('KE12', () => {
            it('should return false', () => {
                const test = isValidKE('KE12')
                expect(test.success).of.equal(false)
            })
        })
        describe('KE-1234X', () => {
            it('should return false', () => {
                const test = isValidKE('K-1234X')
                expect(test.success).of.equal(false)
            })
        })
        describe('KE-123456', () => {
            it('should return false', () => {
                const test = isValidKE('KE-123456')
                expect(test.success).of.equal(false)
            })
        })
    })
})
