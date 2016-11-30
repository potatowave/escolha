module.exports = (knex) => {


  function parseForm(formObject) {
    console.log('Parse form data', formObject);

    const newObject = { case: {}, objectives: [], alternatives: [], values: [] };

    newObject.case.name = formObject.casename;

    newObject.case.description = formObject.case_description;

    formObject.objectives.forEach((objective, index) => {
      const id_frontend = index;
      const name = objective.name;
      const sub_name = objective.sub_name;
      const evaluation_objective = '';
      const low_is_better = objective.low_is_better;
      const unit_name = '';
      const unit_prefix = objective.unit_prefix;
      const unit_suffix = objective.unit_suffix;
      const scale_type = objective.scale_type;
      const ordinal_minimum = objective.rangemin;
      const ordinal_maximum = objective.rangemax;

      const objectives = { id_frontend,
        name,
        sub_name,
        evaluation_objective,
        low_is_better,
        unit_name,
        unit_prefix,
        unit_suffix,
        scale_type,
        ordinal_minimum,
        ordinal_maximum };

      newObject.objectives.push(objectives);
    });

    formObject.alternatives.forEach((alternative, index) => {
      const id_frontend = index;
      const name = alternative.name;
      const image_url = alternative.image_url;

      const alternatives = { id_frontend,
        name,
        image_url };

      newObject.alternatives.push(alternatives);
    });


    formObject.objectives.forEach((objective, objectiveIndex) => {
      formObject.alternatives.forEach((alternative, alternativeIndex) => {
        const value = formObject.values[objectiveIndex][alternativeIndex].value;
        const objective_id_frontend = objectiveIndex;
        const alternative_id_frontend = alternativeIndex;
        const nominal_name = formObject.values[objectiveIndex][alternativeIndex].nominal_name;

        const cells = { value,
          nominal_name,
          objective_id_frontend,
          alternative_id_frontend };

        console.log(cells);

        newObject.values.push(cells);
      });
    });

    return newObject;
  }

return {
    parseForm
  };
}