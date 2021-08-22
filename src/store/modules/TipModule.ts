import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

interface TipData {
  bill: number
  tip: number
  persons: number
  [key: string]: number
}

const defaultStore: TipData = {
  bill: 0,
  tip: 0,
  persons: 0
}

type KeysAllowed = 'bill' | 'tip' | 'persons'

@Module({ dynamic: true, namespaced: true, name: 'tipModule', store })
export default class TipState extends VuexModule {
  private data = Object.assign({}, defaultStore)

  @Mutation
  private mutateData ({ key, value }: { key: KeysAllowed, value: number }): void {
    this.data[key] = value
  }

  @Mutation
  private mutateToDefault () {
    this.data = Object.assign({}, defaultStore)
  }

  /**
   * Update the value for received key
   * @param  {KeysAllowed} key
   * @param  {number} value
   * @returns void
   */
  @Action
  public updateData ({ key, value }: { key: KeysAllowed, value: number }): void {
    this.context.commit('mutateData', { key, value })
  }

  /**
   * Reset all the store to default
   * @returns void
   */
  @Action
  public resetValues (): void {
    this.context.commit('mutateToDefault')
  }

  /**
   * Get the bill value
   * @param  {KeysAllowed} key the data that you need
   * @returns number
   */
  public get getData () {
    return (key: KeysAllowed): number => this.data[key] || 0
  }

  public get hasTheMinimumValuesRequirement (): boolean {
    return !!(this.data.bill && this.data.persons)
  }

  /**
   * Return the tip value per person
   * @returns number
   */
  public get getTipPerPerson (): number {
    let total = 0

    if (this.hasTheMinimumValuesRequirement) {
      total = (this.data.bill * (this.data.tip / 100)) / this.data.persons
    }

    return Math.round(total * 100) / 100
  }

  /**
   * Return the bill value per person
   * @returns number
   */
  public get getBillPerPerson (): number {
    let total = 0

    if (this.hasTheMinimumValuesRequirement) {
      total = (this.data.bill / this.data.persons) + this.getTipPerPerson
    }

    return Math.round(total * 100) / 100
  }
}

export const TipModule = getModule(TipState)
