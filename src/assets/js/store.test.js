
import Store from './store'

const defaultStore = {
  billValue: 0,
  numberOfPersons: 0,
  tipPercentage: 0
}

beforeAll(() => {
  window.store = new Store()
})

describe('storage creation', () => {
  test('create the instance', () => {
    expect(window.store).toBeInstanceOf(Store)
  })
  
  test('default value is zero', () => {
    const returnedData = window.store.allValues()

    expect(returnedData).toStrictEqual(defaultStore)
  })
})

describe('store interaction', () => {
  const key = 'billValue'
  const value = 10

  test('can set a value', () => {  
    window.store.setValue({
      key,
      value,
    })
  
    expect(window.store.getValue(key)).toBe(value)
  })

  test('the window event is triggered', () => {
    window.dispatchEvent = jest.fn();

    window.store.setValue({
      key,
      value,
    })

    expect(window.dispatchEvent).toHaveBeenCalled();
  })

  test('the data is reseted', () => {
    window.store.resetState()

    expect(window.store.allValues()).toStrictEqual(defaultStore);
  })
})
