import { StoreStructure } from '../../../ts/interfaces'

class Store {
  localData: StoreStructure

  constructor () {
    this.setDefaultState()
  }

  setValue ({ key, value }: { key: string, value: number}) {
    this.localData[key] = value

    this.triggerEvent('valuesUpdated')
  }

  getValue (key: string): number {
    return this.localData[key]
  }

  allValues () : StoreStructure {
    return { ...this.localData }
  }

  resetState () {
    this.setDefaultState()

    this.triggerEvent('valuesReseted')
  }

  private triggerEvent (eventName: string) {
    const event = new CustomEvent(eventName);
    window.dispatchEvent(event)
  }

  private setDefaultState () {
    this.localData = {
      billValue: 0,
      numberOfPersons: 0,
      tipPercentage: 0,
    }
  }
}

export default Store;