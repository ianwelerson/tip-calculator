import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'TipModule' })

export default class TipModule extends VuexModule {
  private invoiceValue = 0

  @Mutation
  private changeInvoiceValue (value: number): void {
    this.invoiceValue = value
  }

  @Action
  public updateInvoiceValue (value: number): void {
    console.log('hit')
    this.context.commit('changeInvoiceValue', value)
  }

  // Getters
  public get getInvoiceValue (): number {
    return this.invoiceValue
  }
}
