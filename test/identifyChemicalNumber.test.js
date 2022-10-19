import identifyChemicalNumber from '../index.js'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

describe('Identifying a single substance', () =>{
    describe('Throwing errors', () => {
        describe('Passing a null value', () => {
            it('should throw an error', () => {
                expect(() => identifyChemicalNumber(null)).to.throw("Input must be a string")
            })
        })
        describe('Passing undefined', () => {
            it('should throw an error', () => {
                expect(() => identifyChemicalNumber(null)).to.throw("Input must be a string")
            })
        })
        describe('Passing an empty array', () => {
            it('should throw an error', () => {
                expect(() => identifyChemicalNumber([])).to.throw("Input must be a string")
            })
        })
        describe('Passing empty object', () => {
            it('should throw an error', () => {
                expect(() => identifyChemicalNumber({})).to.throw("Input must be a string")
            })
        })
        describe('Passing a number', () => {
            it('should throw an error', () => {
                expect(() => identifyChemicalNumber(6)).to.throw("Input must be a string")
            })
        })
    })
    describe('Passing in valid options', () => {
        describe('String that does not match any identifier', () => {
            it('should return a string', () => {
                const test = identifyChemicalNumber('hello')
                expect(test.message).to.equal('No Chemical Identifiers were matched')
            })
        })
        describe('Valid CAS number', () => {
            const casValue = '123-45-6'
            const test = identifyChemicalNumber(casValue)
            it('should be an array', () => {
                expect(test.success).to.equal(false)
            })
        })
        describe('Valid EC number', () => {
            const ecValue = '123-456-7'
            const test = identifyChemicalNumber(ecValue)
            it('should be an array', () => {
                expect(test.success).to.equal(false)
            })
        })
        describe('Valid KE Annex 1 number', () => {
            const keValue = 'KE-12345'
            const test = identifyChemicalNumber(keValue)
            it('should be an array', () => {
                expect(test.success).to.equal(true)
            })
        })
        describe('Valid KE Annex 2 number', () => {
            const keValue = '2022-1-1290'
            const test = identifyChemicalNumber(keValue)
            it('should be an array', () => {
                expect(test.success).to.equal(true)
            })
        })
    })
    describe('Passing in invalid options', () => {
        describe('Invalid CAS number', () => {
            it('should return a string', () => {
                const casValue = '123-45-67'
                const test = identifyChemicalNumber(casValue)
                expect(test.message).to.equal('No Chemical Identifiers were matched')
            })
        })
        describe('Invalid EC number', () => {
            it('should return a string', () => {
                const ecValue = '123-456-78'
                const test = identifyChemicalNumber(ecValue)
                expect(test.success).to.equal(false)
            })
        })
        describe('Invalid KE Annex 1 number', () => {
            it('should return a string', () => {
                const keValue = 'KE-123456'
                const test = identifyChemicalNumber(keValue)
                expect(test.success).to.equal(false)
            })
        })
        describe('Invalid KE Annex 2 number', () => {
            it('should return a string', () => {
                const keValue = '2022-1-12901'
                const test = identifyChemicalNumber(keValue)
                expect(test.success).to.equal(false)
            })
        })
    })
})
