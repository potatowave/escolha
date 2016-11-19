const express   = require('express');

module.exports = (knex) => {

  const user_id       = 1;

  // Mapping id from front-end to database id in order to be able to add values
  // Format should be: [idFrontEnd: idBackEnd]

  const objectivesMap       = {};
  const alternativesMap     = {};
  let countInsertedValues   = 0;

  // To be track of numbers of aSync request and know when is done
  let totalObjectives;
  let totalAlternatives;


  /**
  * Checking if Alternatives AND objectives were ALL added
  * @return {object} objective - All informations about the objective
  */
  function isDoneInserting() {
    return (Object.keys(alternativesMap).length == totalAlternatives) && (Object.keys(objectivesMap).length == totalObjectives);
  }

  /**
  * Insert values into database
  * @param {object}   values    - all cell values data from frontend
  */

  function insertValue(value, callback) {

    // Insert values into database
    knex.insert({
      alternative_id: parseInt(value.alternative_id),
      objective_id:   parseInt(value.objective_id),
      value:          value.value
    })
    .into('alternatives_objectives')
    .then( (objective_id) => {
      console.log('Insert Value');
      countInsertedValues++;
      if(countInsertedValues == totalObjectives * totalAlternatives) {
        callback('Case created successful');
      }

    })
    .catch(function(error) { console.error(error); });
  }


  /**
  * Swap the front-end id by database id
  * @param {object}   values    - all cell values data from frontend
  */

  function swapFrontendIdToDatabaseId(values, callback) {

    let valuesWithDatabaseId = values.map((obj) => {
      const objBackEnd            = {};
      objBackEnd.objective_id     = objectivesMap[obj.objective_id];
      objBackEnd.alternative_id   = alternativesMap[obj.alternative_id];
      objBackEnd.value            = obj.value;
      return objBackEnd
    });

    console.log('Swap front-end ids to backend ids')

    valuesWithDatabaseId.forEach((value, index) => {
      insertValue(value, callback)
    });
  }

  /*
  * Insert an objetive into database
  * @param {object}   objective - All informations about the objective
  * @param {integer}  case_id   - To which course objective belongs
  * @param {object}   values    - all cell values data from frontend
  */


  function insertObjective(objective, case_id, order, values, callback) {

    knex.insert({
      name:                   objective.objective,
      sub_name:               objective.subObjective,
      case_id:                parseInt(case_id),
      evaluation_objective:   objective.criterion,
      low_is_better:          objective.low_is_better,
      order:                  parseInt(order),
      unit_name:              objective.unit_name,
      unit_prefix:            objective.unit_prefix,
      unit_suffix:            objective.unit_suffix,
    }, 'id')
    .into('objectives')
    .then( (objective_id) => {
      console.log('Insert Objective');

      // Maping id_front-end to the new id from database
      objectivesMap[objective.id_frontend] = objective_id[0];

      // Insert to alternatives_objectives only if all other data is alredy
      // inserted
      if (isDoneInserting()) {
        swapFrontendIdToDatabaseId(values, callback)
      }
    })
    .catch(function(error) { console.error(error); });
  }

  /**
  * Insert an alternative to database
  * @param {object} objective - All informations about the objective
  * @param {integer} case_id  - To which course objective belongs
  * @param {object}   values    - all cell values data from frontend
  */
  function insertAlternative(alternative, case_id, order, values, callback) {

    knex.insert({
      case_id:                parseInt(case_id),
      name:                   alternative.name,
      image_url:              alternative.image_url,
      order:                  parseInt(order),
    }, 'id')
    .into('alternatives')
    .then( (alternative_id) => {
      console.log('Insert Alternative');

      // Mapping id_front-end to the new id from database
      alternativesMap[alternative.id_frontend] = alternative_id[0];

      // Insert to alternatives_objectives only if all other data is alredy
      // inserted
      if (isDoneInserting()) {
        swapFrontendIdToDatabaseId(values, callback)
      }
    })
    .catch(function(error) { console.error(error); });
  }

  /**
  * Insert a case
  * @param {object} data      - Json data with all case data
  * @param {integer} user_id  - Which user own the case
  */
  function insertCase(data, callback) {

    knex.insert({
      user_id: user_id,
      name: data.name,
      description: data.description
    }, 'id')
    .into('cases')
    .then( (case_id) => {

      // To be track of numbers of aSync request and know when is done
      totalObjectives   = data.objectives.length;
      totalAlternatives = data.alternatives.length;

      console.log('Insert Case');

      // Add Objectives
      data.objectives.forEach((objective, index) => {
        let order = index + 1;
        insertObjective(objective, case_id, order, data.values, callback)
      });

      // Add alternatives
      data.alternatives.forEach((alternative, index) => {
        let order = index + 1;
        insertAlternative(alternative, case_id, order, data.values, callback)
      });


    })
    .catch(function(error) { console.error(error); });
  }


  return {
    insertCase
  };
};