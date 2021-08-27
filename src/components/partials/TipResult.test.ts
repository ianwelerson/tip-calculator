import { render } from '@testing-library/vue'
import { mocked } from 'ts-jest/utils'
import userEvent from '@testing-library/user-event'
import TipResult from '@/components/partials/TipResult.vue'

// Store
import { TipModule } from '@storeModule/TipModule'

// Mock
jest.mock('@storeModule/TipModule')
const mockedTipModule = mocked(TipModule)

describe('result values', () => {
  it('should render the correct value on page', async () => {
    // Set getters mock
    mockedTipModule.getTipPerPerson = 10
    mockedTipModule.getBillPerPerson = 15

    const component = render(TipResult)

    const tip = await component.findByTestId('tip-per-person')
    expect(tip).toHaveTextContent(/^\$ 10$/)

    const total = await component.findByTestId('total-per-person')
    expect(total).toHaveTextContent(/^\$ 15$/)
  })
})

describe('reset action', () => {
  it('should not be possible to reset if there\'s no values', async () => {
    mockedTipModule.hasTheMinimumValuesRequirement = false
    const resetValuesAction = jest.spyOn(mockedTipModule, 'resetValues')

    const action = await render(TipResult).findByTestId('reset-action')

    userEvent.click(action)
    expect(resetValuesAction).not.toHaveBeenCalled()
  })

  it('should be possible to click on reset if has values', async () => {
    mockedTipModule.hasTheMinimumValuesRequirement = true
    const resetValuesAction = jest.spyOn(mockedTipModule, 'resetValues')

    const action = await render(TipResult).findByTestId('reset-action')
    userEvent.click(action)
    expect(resetValuesAction).toHaveBeenCalledTimes(1)
  })
})
