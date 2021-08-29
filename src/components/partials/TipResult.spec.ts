/**
 * This test file uses the @vue/test-utils
 *
 * There are a .test and .spec files, this files tests the same component,
 * but one using @testing-library/vue and another using the default @vue/test-utils
 */
// Lib
import { shallowMount } from '@vue/test-utils'
import { mocked } from 'ts-jest/utils'

// Components
import TipResult from '@/components/partials/TipResult.vue'

// Store
import { TipModule } from '@storeModule/TipModule'

// Mock
jest.mock('@storeModule/TipModule')
const mockedTipModule = mocked(TipModule)

// Generator
function mountGenerator () {
  const element = shallowMount(TipResult)

  return element
}

describe('TipResult - @vue/test-utils', () => {
  it('should render the correct value based on store getter', () => {
    const value = 10

    mockedTipModule.getTipPerPerson = value
    mockedTipModule.getBillPerPerson = value

    const wrapper = mountGenerator()

    const tipValue = wrapper.find('[data-testid=tip-per-person]')
    expect(tipValue.text()).toMatch(String(value))
    const billValue = wrapper.find('[data-testid=total-per-person]')
    expect(billValue.text()).toMatch(String(value))
  })

  it('should not be possible to click on reset if has no minimum values', async () => {
    mockedTipModule.hasTheMinimumValuesRequirement = false

    const resetValuesSpy = jest.spyOn((TipResult as any).options.methods, 'resetValues')

    const wrapper = mountGenerator()

    const action = wrapper.find('[data-testid="reset-action"')
    await action.trigger('click')

    expect(resetValuesSpy).not.toBeCalled()
  })

  it('should be possible to click on reset if has minimum values', async () => {
    mockedTipModule.hasTheMinimumValuesRequirement = true

    const resetValuesSpy = jest.spyOn((TipResult as any).options.methods, 'resetValues')

    const wrapper = mountGenerator()

    const action = wrapper.find('[data-testid="reset-action"')
    await action.trigger('click')

    expect(resetValuesSpy).toBeCalled()
  })
})
