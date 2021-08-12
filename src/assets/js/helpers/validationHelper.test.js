import { hasError } from "./validationHelper";

describe('validation', () => {
  test('return false with empty validations', () => {
    const errorResponse = hasError({
      validations: [],
      value: 0
    })
  
    expect(errorResponse).toMatchObject({
      hasError: false,
      message: ''
    })
  })
  
  describe('min', () => {
    const minValue = 1
  
    test(`return true when value is less than ${minValue}`, () => {
      const errorResponse = hasError({
        validations: [`min:${minValue}`],
        value: 0
      })
    
      expect(errorResponse).toMatchObject({
        hasError: true,
        message: `The min value is ${minValue}`
      })
    })
  
    test(`return false when value is greater than ${minValue}`, () => {
      const errorResponse = hasError({
        validations: [`min:${minValue}`],
        value: 10
      })
    
      expect(errorResponse).toMatchObject({
        hasError: false,
        message: ''
      })
    })
  })
  
  describe('max', () => {
    const max = 100
  
    test(`return true when value is greater than ${max}`, () => {
      const errorResponse = hasError({
        validations: [`max:${max}`],
        value: 101
      })
    
      expect(errorResponse).toMatchObject({
        hasError: true,
        message: `The max value is ${max}`
      })
    })
  
    test(`return false when value is less than ${max}`, () => {
      const errorResponse = hasError({
        validations: [`max:${max}`],
        value: 10
      })
    
      expect(errorResponse).toMatchObject({
        hasError: false,
        message: ''
      })
    })
  })
})
