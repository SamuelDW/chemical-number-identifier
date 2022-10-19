import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
import { isValidAnnexTwoKE } from '../index.js'

describe('Validating Annex 2 KE numbers', () => {
    describe('Throwing Errors', () => {
        describe('Passing a null value', () => {
            it('should throw an error', () => {
                expect(() => isValidAnnexTwoKE(null)).to.throw('Input must be a string')
            })
        })
    })
    describe('Passing Valid KE Annex 2 numbers', () => {
        describe('2017-2-13', () => {
            const test = isValidAnnexTwoKE('2017-2-13')
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
            const test = isValidAnnexTwoKE('K-12')
            it('should return false', () => {
                expect(test.success).to.equal(false)
            })
            it('should return a message stating its invalid', () => {
                expect(test.message).to.equal('K-12 is not a valid Annex 2 KE number')
            })
        })
        describe('KE-12', () => {
            it('should return false', () => {
                const test = isValidAnnexTwoKE('KE-12')
                expect(test.success).to.equal(false)
            })
        })
        describe('Ke-12', () => {
            it('should return false', () => {
                const test = isValidAnnexTwoKE('Ke-12')
                expect(test.success).to.equal(false)
            })
        })
        describe('KE12', () => {
            it('should return false', () => {
                const test = isValidAnnexTwoKE('KE12')
                expect(test.success).to.equal(false)
            })
        })
        describe('KE-1234X', () => {
            it('should return false', () => {
                const test = isValidAnnexTwoKE('K-1234X')
                expect(test.success).to.equal(false)
            })
        })
        describe('KE-123456', () => {
            it('should return false', () => {
                const test = isValidAnnexTwoKE('KE-123456')
                expect(test.success).to.equal(false)
            })
        })
    })
})
