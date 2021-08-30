// Store
import { TipModule } from '@storeModule/TipModule'

// Interfaces
import { TipStore } from '@interface'

// Test vars
const billKey = 'bill'
const billValue = 100
const personKey = 'persons'
const personValue = 2
const tipKey = 'tip'
const tipValue = 50
const defaultState: TipStore = {
  bill: 0,
  tip: 0,
  persons: 0
}

describe('TipModule', () => {
  it('should all states has to be 0 when module is imported', () => {
    expect(TipModule.getAllData).toEqual(defaultState)
  })

  it('should return zero per person for Tip and Bill', () => {
    expect(TipModule.getTipPerPerson).toBe(0)
    expect(TipModule.getBillPerPerson).toBe(0)
  })

  it('should update state', () => {
    TipModule.updateData({
      key: billKey,
      value: billValue
    })

    expect(TipModule.getAllData).toEqual({
      ...defaultState,
      bill: billValue
    })
  })

  it('should get specific state', () => {
    expect(TipModule.getData(billKey)).toBe(billValue)
  })

  describe('minimum requirements', () => {
    it('should return false when has no minimum state values', () => {
      expect(TipModule.hasTheMinimumValuesRequirement).toBeFalsy()
    })

    it('should return true when has the minimum state values', () => {
      TipModule.updateData({
        key: personKey,
        value: personValue
      })

      expect(TipModule.hasTheMinimumValuesRequirement).toBeTruthy()
    })
  })

  describe('calculated getters', () => {
    const tipResult = 25
    const billResult = 75

    beforeAll(() => {
      TipModule.updateData({
        key: tipKey,
        value: tipValue
      })
    })

    it('should return the tip per person', () => {
      expect(TipModule.getTipPerPerson).toBe(tipResult)
    })

    it('should return the total per person', () => {
      expect(TipModule.getBillPerPerson).toBe(billResult)
    })
  })

  it('should reset values to defalt', () => {
    TipModule.resetValues()

    expect(TipModule.getAllData).toEqual(defaultState)
  })
})
