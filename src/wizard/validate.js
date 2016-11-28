const validate = values => {
  const errors = {}
  if(!values.caseName) {
    errors.caseName = 'Required'
  }
  if (!values.objectives || !values.objectives.length) {
    errors.objectives = { _error: 'At least one objective must be entered' }
  } else {
    const objectivesArrayErrors = []
    values.objectives.forEach((objective, objectiveIndex) => {
      const objectiveErrors = {}
      if (!objective || !objective.name) {
        objectiveErrors.name = 'Required'
        objectivesArrayErrors[objectiveIndex] = objectiveErrors
      }
      if (!objective || !objective.sub) {
        objectiveErrors.sub = 'Required'
        objectivesArrayErrors[objectiveIndex] = objectiveErrors
      }

    })
    if(objectivesArrayErrors.length) {
      errors.objectives = objectivesArrayErrors
    }
  }
  return errors
}

export default validate