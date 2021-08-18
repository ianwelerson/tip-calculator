// Importing CSS
import "../sass/main.scss";

// Importing modules
import {
  bootstrap as bootstrapBillForm,
  resetForm as resetBillForm
} from './modules/billForm';
import {
  bootstrap as bootstrapTipCalculator,
  update as updateTipValues
} from './modules/tipCalculator';
import Store from './store'

declare global {
  interface Window { store: any; }
}

// Create new store in window object
window.store = new Store()

// Start the app
bootstrapBillForm()
bootstrapTipCalculator()

// Events
window.addEventListener('valuesUpdated', () => {
  updateTipValues()
})

window.addEventListener('valuesReseted', () => {
  resetBillForm()
  updateTipValues()
})