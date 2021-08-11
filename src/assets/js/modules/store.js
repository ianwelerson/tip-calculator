class appStore {
  constructor () {
    this.billValue = 0;
    this.numberOfPersons = 0;
    this.tipPercentage = 0;
  }

  setValue ({ key, value }) {
    this[key] = value

    this.triggerUpdateEvent()
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

  triggerUpdateEvent () {
    const event = new CustomEvent('updateCalculation');
    window.dispatchEvent(event)
  }
}

export default appStore;