export interface TipStore {
  bill: number
  tip: number
  persons: number
  [key: string]: number
}

export interface ValidationReturn {
  hasError: boolean
  message: string | null
}

export interface ValidationRule {
  rule: string
  showMessage: boolean
}
