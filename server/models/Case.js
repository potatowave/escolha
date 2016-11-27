"use strict";

module.exports = (knex) => {
  const userId = 1;

  // Mapping id from front-end to database id in order to be able to add values
  // Format should be: [idFrontEnd: idBackEnd]

  const objectivesMap = {};
  const alternativesMap = {};
  let countInsertedValues = 0;

  // To be track of numbers of aSync request and know when is done
  let totalObjectives;
  let totalAlternatives;


  /**
  * Checking if Alternatives AND objectives were ALL added
  * @returns {boolean}
  */
  function isDoneInserting() {
    return (Object.keys(alternativesMap).length === totalAlternatives) && (Object.keys(objectivesMap).length === totalObjectives);
  }

  /**
  * Insert values into database
  * @param {object}   values      - all cell values data from frontend
  * @param {function} callback    - Callback function to run after aSync DB call
  * @returns {void}               - It will call Callback function aSync
  */
  function insertValue(value, caseId, callback) {
    // Insert values into database
    knex.insert({
      alternative_id: parseInt(value.alternative_id, 10),
      objective_id: parseInt(value.objective_id, 10),
      value: value.value,
    })
    .into('alternatives_objectives')
    .then(() => {
      console.log('Insert Value');
      countInsertedValues += 1;
      if (countInsertedValues === totalObjectives * totalAlternatives) {
        deliverContent(parseInt(caseId,10), callback)
      }
    })
    .catch((error) => { console.error(error); });
  }

  /**
  * Swap the front-end id by database id
  * @param {object}   values      - all cell values data from frontend
  * @param {function} callback    - Callback function to run after aSync DB call
  * @returns {void}               - It will call Callback function aSync
  */
  function swapFrontendIdToDatabaseId(values, caseId, callback) {
    const valuesWithDatabaseId = values.map((obj) => {
      const objBackEnd = {};
      objBackEnd.objective_id = objectivesMap[obj.objective_id_frontend];
      objBackEnd.alternative_id = alternativesMap[obj.alternative_id_frontend];
      objBackEnd.value = obj.value;
      return objBackEnd;
    });

    console.log('Swap front-end ids to backend ids');

    valuesWithDatabaseId.forEach((value) => {
      insertValue(value, caseId, callback);
    });
  }

  /**
  * Insert an objective to database
  * @param {object}   objective   - All informations about the objective
  * @param {integer}  case_id     - To which case alternatives belongs
  * @param {integer}  order       - Alternative's order
  * @param {object}   values      - all cell values data from frontend
  * @param {function} callback    - Callback function to run after aSync DB call
  * @returns {void}               - It will call Callback function aSync
  */
  function insertObjective({objective, caseId, order, values, callback}) {
    knex.insert({
      name: objective.name,
      sub_name: objective.sub_name,
      case_id: parseInt(caseId, 10),
      evaluation_objective: objective.evaluation_objective,
      low_is_better: objective.low_is_better,
      order: parseInt(order, 10),
      unit_name: objective.unit_name,
      unit_prefix: objective.unit_prefix,
      unit_suffix: objective.unit_suffix,
      created_at: new Date().toLocaleString()
    }, 'id')
    .into('objectives')
    .then((objectiveId) => {
      console.log('Insert Objective');

      // Maping id_front-end to the new id from database
      objectivesMap[objective.id_frontend] = objectiveId[0];

      // Insert to alternatives_objectives only if all other data is alredy
      // inserted
      if (isDoneInserting()) {
        swapFrontendIdToDatabaseId(values, caseId, callback);
      }
    })
    .catch((error) => { console.error(error); });
  }

  /**
  * Insert an alternative to database
  * @param {object}   alternative - All informations about the alternative
  * @param {integer}  case_id     - To which case alternatives belongs
  * @param {integer}  order       - Alternative's order
  * @param {object}   values      - all cell values data from frontend
  * @param {function} callback    - Callback function to run after aSync DB call
  * @returns {void}               - It will call Callback function aSync
  */
  function insertAlternative(alternative, caseId, order, values, callback) {
    knex.insert({
      case_id: parseInt(caseId, 10),
      name: alternative.name,
      image_url: alternative.image_url,
      order: parseInt(order, 10),
      created_at: new Date().toLocaleString()
    }, 'id')
    .into('alternatives')
    .then((alternativeId) => {
      console.log('Insert Alternative');

      // Mapping id_front-end to the new id from database
      alternativesMap[alternative.id_frontend] = alternativeId[0];

      // Insert to alternatives_objectives only if all other data is alredy
      // inserted
      if (isDoneInserting()) {
        swapFrontendIdToDatabaseId(values, caseId, callback);
      }
    })
    .catch((error) => { console.error(error); });
  }

  /**
  * Insert a case
  * @param {object} data        - Json data with all case data
  * @param {function} callback  - Callback function to run after aSync DB call
  * @returns {void}             - It will call Callback function aSync
  */
  function insertCase(data, callback) {
    knex.insert({
      user_id: userId,
      name: data.case.name,
      description: data.case.description,
      created_at: new Date().toLocaleString()
    }, 'id')
    .into('cases')
    .then((caseId) => {
      // To be track of numbers of aSync request and know when is done
      totalObjectives = data.objectives.length;
      totalAlternatives = data.alternatives.length;

      console.log('Insert Case');

      // Add Objectives
      data.objectives.forEach((objective, index) => {
        const order = index + 1;
        insertObjective({objective, caseId, order, values: data.values, callback});
      });

      // Add alternatives
      data.alternatives.forEach((alternative, index) => {
        const order = index + 1;
        insertAlternative(alternative, caseId, order, data.values, callback);
      });
    })
    .catch((error) => { console.error(error); });
  }

  /**
  * Update entire case. Since all data is already in database is it possible
  * to call all queries at same time.
  * @param {integer} case_id    - Which Case to update
  * @param {object} data        - Json data with all case data
  * @param {function} callback  - Callback function to run after aSync DB call
  * @returns {void} - It will call Callback function aSync
  */
  function updateCase(caseId, data, callback) {
    // Keep track on database operations
    let countCase = 0;
    let countObjectives = 0;
    let countAlternatives = 0;
    let countCells = 0;

    const msg = 'Entire Case Updated';

    const caseLength = data.case || 0;
    const objectivesLength = data.objectives || 0;
    const alternativesLength = data.alternatives || 0;
    const cellsLength = data.cells || 0;


    /**
    * Check if all database operations was done
    * @returns {boolean}
    */
    function isDoneUpdating() {
      return (countCase === caseLength) && (countObjectives === objectivesLength) && (countAlternatives === alternativesLength) && (countCells === cellsLength);
    }

    if(data.case) {
      // Update case
      knex('cases')
      .where('id', parseInt(caseId, 10))
      .andWhere('user_id', parseInt(userId, 10))
      .update(data.case)
      .then((n) => {
        countCase += 1;
        console.log(`Case Updated: ${n}`);
        if (isDoneUpdating()) {
          callback(msg);
        }
      });
    }

    // Update objectives
    if(data.objectives) {
      data.objectives.forEach((objective) => {
        knex('objectives')
        .where('id', parseInt(objective.id, 10))
        .andWhere('case_id', parseInt(caseId, 10))
        .update(objective)
        .then((n) => {
          countObjectives += 1;
          console.log(`Objective Updated: ${n}`);
          if (isDoneUpdating()) {
            callback(msg);
          }
        });
      });
    }

    // Update alternatives
    if(data.objectives) {
      data.alternatives.forEach((alternative) => {
        knex('alternatives')
        .where('id', parseInt(alternative.id, 10))
        .andWhere('case_id', parseInt(caseId, 10))
        .update(alternative)
        .then((n) => {
          countAlternatives += 1;
          console.log(`Alternative Updated: ${n}`);
          if (isDoneUpdating()) {
            callback(msg);
          }
        });
      });
    }

    // Update values
    if(data.cells) {
      data.cells.forEach((cell) => {
        knex('alternatives_objectives')
        .where('alternative_id', parseInt(cell.alternative_id, 10))
        .andWhere('objective_id', parseInt(cell.objective_id, 10))
        .update({value: cell.value})
        .then((n) => {
          countCells += 1;
          console.log(`Cell Updated: ${n}`);
          if (isDoneUpdating()) {
            callback(msg);
          }
        });
      });
    }
  }

  /**
  * Delivery JSON to front-end
  * @param {integer} caseId     - Getting all data from a specific caseId
  * @param {function} callback  - Callback function to run after aSync DB call
  * @returns {void}             - It will call Callback function aSync
  */
  function deliverContent(caseId, callback) {
    const data = {};
    console.log("Delivering content",caseId);

    function isDone() {
      return (
        data.objectives &&
        data.alternatives &&
        data.cases &&
        data.cells
      );
    }

    knex('objectives')
      .where('case_id', caseId)
      .select()
      .orderBy('objectives.order', 'ASC')
      .then((result) => {
        data.objectives = result;
        if (isDone()) {
          callback(data);
        }
      });

    knex('cases')
      .where('user_id', userId)
      .andWhere('id', caseId)
      .select()
      .then((result) => {
        data.cases = result;
        //console.log(data);
        if (isDone()) {
          callback(data);
        }
      });

    knex('alternatives')
      .where('case_id', caseId)
      .select()
      .orderBy('alternatives.order', 'ASC')
      .then((result) => {
        data.alternatives = result;
        if (isDone()) {
          callback(data);
        }
      });

    knex.from('alternatives_objectives')
      .innerJoin('alternatives', 'alternatives_objectives.alternative_id', 'alternatives.id')
      .where('case_id', caseId)
      .orderByRaw('alternative_id, objective_id ASC')
      .then((result) => {
        data.cells = result;
        if (isDone()) {
          callback(data);
        }
      });
  }

  /**
  * Return all cases by user
  * @param {function} callback  - Callback function to run after aSync DB call
  */
  function casesByUser(callback) {
    const data = {};
    console.log("Cases for user",userId);

    knex('cases')
      .where('user_id', userId)
      .select()
      .then((result) => {
        data.cases = result;
        callback(data);
      });
  }

  return {
    insertCase,
    updateCase,
    deliverContent,
    casesByUser
  };
};
