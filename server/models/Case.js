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
  * @param { object}   values      - all cell values data from frontend
  * @param {function} callback    - Callback function to run after aSync DB call
  * @returns {void}               - It will call Callback function aSync
  */
  function insertValue(value, callback) {
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
        callback('Case created successful');
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
  function swapFrontendIdToDatabaseId(values, callback) {
    const valuesWithDatabaseId = values.map((obj) => {
      const objBackEnd = {};
      objBackEnd.objective_id = objectivesMap[obj.objective_id_frontend];
      objBackEnd.alternative_id = alternativesMap[obj.alternative_id_frontend];
      objBackEnd.value = obj.value;
      return objBackEnd;
    });

    console.log('Swap front-end ids to backend ids');

    valuesWithDatabaseId.forEach((value) => {
      insertValue(value, callback);
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
  function insertObjective(objective, caseId, order, values, callback) {
    knex.insert({
      name: objective.objective,
      sub_name: objective.subObjective,
      case_id: parseInt(caseId, 10),
      evaluation_objective: objective.criterion,
      low_is_better: objective.low_is_better,
      order: parseInt(order, 10),
      unit_name: objective.unit_name,
      unit_prefix: objective.unit_prefix,
      unit_suffix: objective.unit_suffix,
    }, 'id')
    .into('objectives')
    .then((objectiveId) => {
      console.log('Insert Objective');

      // Maping id_front-end to the new id from database
      objectivesMap[objective.id_frontend] = objectiveId[0];

      // Insert to alternatives_objectives only if all other data is alredy
      // inserted
      if (isDoneInserting()) {
        swapFrontendIdToDatabaseId(values, callback);
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
    }, 'id')
    .into('alternatives')
    .then((alternativeId) => {
      console.log('Insert Alternative');

      // Mapping id_front-end to the new id from database
      alternativesMap[alternative.id_frontend] = alternativeId[0];

      // Insert to alternatives_objectives only if all other data is alredy
      // inserted
      if (isDoneInserting()) {
        swapFrontendIdToDatabaseId(values, callback);
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
      userId,
      name: data.name,
      description: data.description,
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
        insertObjective(objective, caseId, order, data.values, callback);
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
    let countValues = 0;

    const msg = 'Entire Case Updated';

    /**
    * Check if all database operations was done
    * @returns {boolean}
    */
    function isDoneUpdating() {
      return (countCase === 1) && (countObjectives === data.objectives.length) && (countAlternatives === data.alternatives.length) && (countValues === data.values.length);
    }

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

    // Update objectives
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

    // Update alternatives
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

    // Update values
    data.values.forEach((value) => {
      knex('alternatives_objectives')
      .where('alternative_id', parseInt(value.alternative_id, 10))
      .andWhere('objective_id', parseInt(value.objective_id, 10))
      .update(value)
      .then((n) => {
        countValues += 1;
        console.log(`Value Updated: ${n}`);
        if (isDoneUpdating()) {
          callback(msg);
        }
      });
    });
  }

  /**
  * Delivery JSON to front-end
  * @param {integer} caseId     - Getting all data from a specific caseId
  * @param {function} callback  - Callback function to run after aSync DB call
  * @returns {void}             - It will call Callback function aSync
  */
  function deliverContent(caseId, callback) {
    const data = {};

    function isDone() {
      return (
        data.objectives &&
        data.alternatives &&
        data.cases &&
        data.values
      );
    }

    knex('objectives')
      .where('case_id', caseId)
      .select()
      .then((result) => {
        data.objectives = result;
        console.log(data);
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
        console.log(data);
        if (isDone()) {
          callback(data);
        }
      });

    knex('alternatives')
      .where('case_id', caseId)
      .select()
      .then((result) => {
        data.alternatives = result;
        if (isDone()) {
          callback(data);
        }
      });

    knex.from('alternatives_objectives')
      .innerJoin('alternatives', 'alternatives_objectives.alternative_id', 'alternatives.id')
      .where('case_id', caseId)
      .then((result) => {
        data.values = result;
        if (isDone()) {
          callback(data);
        }
      });
  }

  return {
    insertCase,
    updateCase,
    deliverContent,
  };
};
