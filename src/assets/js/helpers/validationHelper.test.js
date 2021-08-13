import { hasError } from "./validationHelper";

test('return false when received an empty validations array', () => {
  const errorResponse = hasError({
    validations: [],
    value: 0
  })

  expect(errorResponse).toMatchObject({
    hasError: false,
    message: ''
  })
})

describe('validation rules', () => {
  describe('min', () => {
    const minValue = 1
  
    test(`true when value is less than ${minValue}`, () => {
      const errorResponse = hasError({
        validations: [`min:${minValue}`],
        value: 0
      })
    
      expect(errorResponse).toMatchObject({
        hasError: true,
        message: `The min value is ${minValue}`
      })
    })
  
    test(`false when value is greater than ${minValue}`, () => {
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
  
    test(`true when value is greater than ${max}`, () => {
      const errorResponse = hasError({
        validations: [`max:${max}`],
        value: 101
      })
    
      expect(errorResponse).toMatchObject({
        hasError: true,
        message: `The max value is ${max}`
      })
    })
  
    test(`false when value is less than ${max}`, () => {
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
