// Importing CSS
import "../sass/main.scss";

// Importing modules
import { bootstrapBillForm } from './modules/billForm';
import { updateTipValues } from './modules/tipCalculator';
import appStore from './modules/store'

// Create new shared store
const store = new appStore()

// Start the tip form passing the store
bootstrapBillForm(store)

window.addEventListener('updateCalculation', () => {
  updateTipValues(store)
})