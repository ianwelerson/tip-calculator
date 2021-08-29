/**
 * This test file uses the @testing-library/vue strategy
 *
 * There are a .test and .spec files, this files tests the same component,
 * but one using @testing-library/vue and another using the default @vue/test-utils
 */

// Lib
import { render } from '@testing-library/vue'
import { mocked } from 'ts-jest/utils'
import TipResult from '@/components/partials/TipResult.vue'

// Store
import { TipModule } from '@storeModule/TipModule'

// Mock
jest.mock('@storeModule/TipModule')
const mockedTipModule = mocked(TipModule)

// Render generator
function renderGenerator () {
  return render(TipResult)
}

describe('TipResult -  @testing-library/vue', () => {
  describe('result values', () => {
    it('should render the correct value on page based on store getter', async () => {
      // Set getters mock
      mockedTipModule.getTipPerPerson = 10
      mockedTipModule.getBillPerPerson = 15

      const { findByTestId } = renderGenerator()

      const tip = await findByTestId('tip-per-person')
      expect(tip).toHaveTextContent(/^\$ 10$/)

      const total = await findByTestId('total-per-person')
      expect(total).toHaveTextContent(/^\$ 15$/)
    })
  })

  describe('reset action', () => {
    it('should not be possible to reset if there\'s no values', async () => {
      mockedTipModule.hasTheMinimumValuesRequirement = false

      const action = await renderGenerator().findByTestId('reset-action')

      expect(action).toHaveClass('button--disabled')
      expect(action).toBeDisabled()
    })

    it('should be possible to click on reset if has values', async () => {
      mockedTipModule.hasTheMinimumValuesRequirement = true

      const action = await renderGenerator().findByTestId('reset-action')

      expect(action).not.toHaveClass('button--disabled')
      expect(action).not.toBeDisabled()
    })
  })
})
