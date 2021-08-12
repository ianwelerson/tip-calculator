
import Store from './store'

let store;
const defaultStore = {
  billValue: 0,
  numberOfPersons: 0,
  tipPercentage: 0
}

beforeAll(() => {
  store = new Store()
})

describe('storage creation', () => {
  test('create a store instance', () => {
    expect(store).toBeInstanceOf(Store)
  })
  
  test('default value is zero', () => {
    const returnedData = store.allValues()
    expect(returnedData).toStrictEqual(defaultStore)
  })
})

describe('store interaction', () => {
  const key = 'billValue'
  const value = 10
  const { dispatchEvent } = window;

  beforeAll(() => {
    delete window.dispatchEvent;
    window.dispatchEvent = jest.fn();
  });

  afterAll(() => {
    window.dispatchEvent = dispatchEvent;
  });

  test('can set a value', () => {  
    store.setValue({
      key,
      value,
    })
  
    expect(store.getValue(key)).toBe(value)
  })

  test('the event function is called', () => {
    store.triggerEvent = jest.fn();

    store.setValue({
      key,
      value,
    })

    expect(store.triggerEvent).toBeCalledWith('valuesUpdated');
  })

  test('the window event is triggered', () => {
    store.setValue({
      key,
      value,
    })

    expect(window.dispatchEvent).toHaveBeenCalled();
  })

  test('the data is reseted', () => {
    store.resetState()

    expect(store.allValues()).toStrictEqual(defaultStore);
  })
})
