class appStore {
  constructor () {
    this.billValue = 0;
    this.numberOfPersons = 0;
    this.tipPercentage = 0;
  }

  setValue ({ key, value }) {
    this[key] = value

    this.triggerEvent('valuesUpdated')
  }

  getValue (key) {
    return this[key]
  }

  allValues () {
    return {
      billValue: this.billValue,
      numberOfPersons: this.numberOfPersons,
      tipPercentage: this.tipPercentage,
    }
  }

  triggerEvent (eventName) {
    const event = new CustomEvent(eventName);
    window.dispatchEvent(event)
  }

  resetState () {
    this.billValue = 0;
    this.numberOfPersons = 0;
    this.tipPercentage = 0;

    this.triggerEvent('valuesReseted')
  }
}

export default appStore;