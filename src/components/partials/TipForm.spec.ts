/**
 * This test file uses the @vue/test-utils strategy
 *
 * There are a .test and .spec files, this files tests the same component,
 * but one using @testing-library/vue and another using the default @vue/test-utils
 */

// Lib
import { shallowMount } from '@vue/test-utils'
import { mocked } from 'ts-jest/utils'

// Components
import TipForm from '@/components/partials/TipForm.vue'
import InputComponent from '@/components/layout/InputComponent.vue'

// Store
import { TipModule } from '@storeModule/TipModule'

// Mock
jest.mock('@storeModule/TipModule')
const mockedTipModule = mocked(TipModule)

// Render generator
function renderGenerator (): any {
  const wrapper = shallowMount(TipForm, {
    stubs: {
      'input-element': InputComponent
    }
  })

  return wrapper
}

describe('TipForm - @vue/test-utils', () => {
  beforeEach(() => {
    mockedTipModule.getData = jest.fn()
  })

  it('should call getData twice on mount', () => {
    renderGenerator()

    expect(mockedTipModule.getData).toHaveBeenNthCalledWith(1, 'bill')
    expect(mockedTipModule.getData).toHaveBeenNthCalledWith(2, 'persons')
  })

  it('getAdjustedValue should return null or the value depending on the passed data', () => {
    const wrapper = renderGenerator()
    const testValue = 10

    const nullCall = wrapper.vm.getAdjustedValue(null)
    const valueCall = wrapper.vm.getAdjustedValue(testValue)

    expect(nullCall).toBeNull()
    expect(valueCall).toBe(testValue)
  })

  it('should update local data and reset with onStoreBillValueUpdate', async () => {
    const wrapper = renderGenerator()

    // Update a field value
    const value = 10
    const billInput = wrapper.find('[data-testid="options-block"] input')
    await billInput.setValue(value)

    // Check if the value is correct
    expect(wrapper.vm.billValue).toBe(value)

    // Trigger the update local data method
    wrapper.vm.onStoreBillValueUpdate({
      bill: 0,
      persons: 0,
      tip: 0
    })

    // Check if local data is correct
    expect(wrapper.vm.billValue).toBe(null)
  })
})
