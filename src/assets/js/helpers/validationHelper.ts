function hasError ({ validations, value }: { validations: Array<string>, value: number}) {
  const errorReturn = {
    hasError: false,
    message: ''
  }

  validations.map((rule) => {
    // Rule: Min value
    const minRule = /(^min:)(\d*)/gm.exec(rule);
    if (minRule !== null) {
      if (value < Number(minRule[2])) {
        errorReturn.hasError = true
        errorReturn.message = `The min value is ${minRule[2]}`
      }
    }

    // Rule: Max value
    const maxRule = /(^max:)(\d*)/gm.exec(rule);
    if (maxRule !== null) {
      if (value > Number(maxRule[2])) {
        errorReturn.hasError = true
        errorReturn.message = `The max value is ${maxRule[2]}`
      }
    }
  })

  return errorReturn
}

export { hasError }