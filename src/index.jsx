// Render the top-level React component
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// Middlewares
import { Router, Route, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';  // console logging
import { combineForms } from 'react-redux-form';
// Actions
import { fetchCase, saveCase, fetchUserCases } from './actions/api'
import rootReducer from './reducers';
import App from './App.jsx';
import WizardForm from './WizardForm.jsx';
import Onboard from './Onboard.jsx';

// Load up the application styles
require('../styles/application.scss');

// 'logger' middleware: this will console.log every action that is sent to the redux store.
const loggerMiddleware = createLogger()

// Configure the Redux Store: .
const store = createStore(
  rootReducer,
  {},
  applyMiddleware(
    loggerMiddleware,
    thunkMiddleware
  )
);

export default store;

ReactDOM.render((
  <Provider store={store}>
  <Router history={hashHistory} store={store} >
    <Route path="/" component={App} />
    <Route path="/new" component={Onboard} />
    <Route path="/wizard" component={WizardForm} />
  </Router>
  </Provider>
), document.getElementById('react-root'));

// ----------------------------------------------------------------------------
// Actions using the API

// Read all Cases from current user - for the dropdown

store.dispatch(fetchUserCases()).then(() => {
  store.getState()
})

// Read a specific case
store.dispatch(fetchCase(1)).then(() =>
  store.getState()
)


var data_insert = {
  "case": {
    "name": "Car with more options",
    "description": "I want to choose some car"
  },


  "objectives": [{
      "id_frontend":          99,
      "name":                 "Cost",
      "sub_name":             "Price",
      "evaluation_objective": "Just the car price",
      "low_is_better":        true,
      "unit_name":            "money",
      "unit_prefix":          "$",
      "unit_suffix":          "",
      "scale_type":           "this is managed on the front-end"
    },

    {
      "id_frontend":          88,
      "name":                 "Cost",
      "sub_name":             "Mainetence",
      "evaluation_objective": "Per year mainetence",
      "low_is_better":        true,
      "unit_name":            "money",
      "unit_prefix":          "$",
      "unit_suffix":          "",
      "scale_type":           "this is managed on the front-end"
    },

    {
      "id_frontend":          77,
      "name":                 "Condition",
      "sub_name":             "Body",
      "evaluation_objective": "Body condition",
      "low_is_better":        false,
      "unit_name":            "",
      "unit_prefix":          "",
      "unit_suffix":          "",
      "scale_type":           "this is managed on the front-end"
    },

    {
      "id_frontend":          66,
      "name":                 "Condition",
      "sub_name":             "Milage",
      "evaluation_objective": "Total miles on the odometer",
      "low_is_better":        false,
      "unit_name":            "",
      "unit_prefix":          "",
      "unit_suffix":          "",
      "scale_type":           "this is managed on the front-end"
    },

    {
      "id_frontend":          55,
      "name":                 "Cool Factor",
      "sub_name":             "Coolness",
      "evaluation_objective": "How cool this is",
      "low_is_better":        false,
      "unit_name":            "",
      "unit_prefix":          "",
      "unit_suffix":          "",
      "scale_type":           "this is managed on the front-end"
    },

    {
      "id_frontend":          44,
      "name":                 "Cool Factor",
      "sub_name":             "Coolness",
      "evaluation_objective": "How cool this is",
      "low_is_better":        false,
      "unit_name":            "",
      "unit_prefix":          "",
      "unit_suffix":          "",
      "scale_type":           "this is managed on the front-end"
    },

    {
      "id_frontend":          33,
      "name":                 "Cool Factor",
      "sub_name":             "Coolness",
      "evaluation_objective": "How cool this is",
      "low_is_better":        false,
      "unit_name":            "",
      "unit_prefix":          "",
      "unit_suffix":          "",
      "scale_type":           "this is managed on the front-end"
    }

  ],

  "alternatives": [{
      "id_frontend": 11,
      "name":       "Ferrari",
      "image_url":  "https://s-media-cache-ak0.pinimg.com/236x/89/5c/b1/895cb18bd918640844fdd3bc6297fddd.jpg"
    },

    {
      "id_frontend": 22,
      "name":       "Lamborghini",
      "image_url":  "https://s-media-cache-ak0.pinimg.com/236x/c8/71/07/c871079f871b72609735e584235f1f12.jpg"
    },

    {
      "id_frontend": 33,
      "name":       "Lamborghini",
      "image_url":  "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSyqYUmFsqlT5RtmrxJNGhq70lk2ePKuffpBILv1UtIfk71nE5X"
    },

    {
      "id_frontend": 44,
      "name":       "Ford",
      "image_url":  "https://s-media-cache-ak0.pinimg.com/236x/89/5c/b1/895cb18bd918640844fdd3bc6297fddd.jpg"
    },

    {
      "id_frontend": 55,
      "name":       "Chrysler",
      "image_url":  "https://s-media-cache-ak0.pinimg.com/236x/c8/71/07/c871079f871b72609735e584235f1f12.jpg"
    },

    {
      "id_frontend": 66,
      "name":       "Honda",
      "image_url":  "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSyqYUmFsqlT5RtmrxJNGhq70lk2ePKuffpBILv1UtIfk71nE5X"
    }

  ],

  "values": [{
      "objective_id_frontend": 99,
      "alternative_id_frontend": 11,
      "value": 150000
    }, {
      "objective_id_frontend": 99,
      "alternative_id_frontend": 22,
      "value": 390888
    }, {
      "objective_id_frontend": 99,
      "alternative_id_frontend": 33,
      "value": 420123
    },
    {
      "objective_id_frontend": 99,
      "alternative_id_frontend": 44,
      "value": 25000
    }, {
      "objective_id_frontend": 99,
      "alternative_id_frontend": 55,
      "value": 35000
    }, {
      "objective_id_frontend": 99,
      "alternative_id_frontend": 66,
      "value": 45000
    },


    {
      "objective_id_frontend": 88,
      "alternative_id_frontend": 11,
      "value": 10000
    }, {
      "objective_id_frontend": 88,
      "alternative_id_frontend": 22,
      "value": 5000
    }, {
      "objective_id_frontend": 88,
      "alternative_id_frontend": 33,
      "value": 8000
    },
    {
      "objective_id_frontend": 88,
      "alternative_id_frontend": 44,
      "value": 500
    }, {
      "objective_id_frontend": 88,
      "alternative_id_frontend": 55,
      "value": 400
    }, {
      "objective_id_frontend": 88,
      "alternative_id_frontend": 66,
      "value": 200
    },

    {
      "objective_id_frontend": 77,
      "alternative_id_frontend": 11,
      "value": 4
    }, {
      "objective_id_frontend": 77,
      "alternative_id_frontend": 22,
      "value": 5
    }, {
      "objective_id_frontend": 77,
      "alternative_id_frontend": 33,
      "value": 4
    },
    {
      "objective_id_frontend": 77,
      "alternative_id_frontend": 44,
      "value": 3
    }, {
      "objective_id_frontend": 77,
      "alternative_id_frontend": 55,
      "value": 5
    }, {
      "objective_id_frontend": 77,
      "alternative_id_frontend": 66,
      "value": 4
    },

    {
      "objective_id_frontend": 66,
      "alternative_id_frontend": 11,
      "value": 10000
    }, {
      "objective_id_frontend": 66,
      "alternative_id_frontend": 22,
      "value": 15000
    }, {
      "objective_id_frontend": 66,
      "alternative_id_frontend": 33,
      "value": 5000
    },
    {
      "objective_id_frontend": 66,
      "alternative_id_frontend": 44,
      "value": 50000
    }, {
      "objective_id_frontend": 66,
      "alternative_id_frontend": 55,
      "value": 100
    }, {
      "objective_id_frontend": 66,
      "alternative_id_frontend": 66,
      "value": 20000
    },

    {
      "objective_id_frontend": 55,
      "alternative_id_frontend": 11,
      "value": 4
    }, {
      "objective_id_frontend": 55,
      "alternative_id_frontend": 22,
      "value": 5
    }, {
      "objective_id_frontend": 55,
      "alternative_id_frontend": 33,
      "value": 5
    },
    {
      "objective_id_frontend": 55,
      "alternative_id_frontend": 44,
      "value": 1
    }, {
      "objective_id_frontend": 55,
      "alternative_id_frontend": 55,
      "value": 1
    }, {
      "objective_id_frontend": 55,
      "alternative_id_frontend": 66,
      "value": 2
    },

      {
      "objective_id_frontend": 44,
      "alternative_id_frontend": 11,
      "value": 4
    }, {
      "objective_id_frontend": 44,
      "alternative_id_frontend": 22,
      "value": 5
    }, {
      "objective_id_frontend": 44,
      "alternative_id_frontend": 33,
      "value": 5
    },
    {
      "objective_id_frontend": 44,
      "alternative_id_frontend": 44,
      "value": 1
    }, {
      "objective_id_frontend": 44,
      "alternative_id_frontend": 55,
      "value": 1
    }, {
      "objective_id_frontend": 44,
      "alternative_id_frontend": 66,
      "value": 2
    },

      {
      "objective_id_frontend": 33,
      "alternative_id_frontend": 11,
      "value": 4
    }, {
      "objective_id_frontend": 33,
      "alternative_id_frontend": 22,
      "value": 5
    }, {
      "objective_id_frontend": 33,
      "alternative_id_frontend": 33,
      "value": 5
    },
    {
      "objective_id_frontend": 33,
      "alternative_id_frontend": 44,
      "value": 1
    }, {
      "objective_id_frontend": 33,
      "alternative_id_frontend": 55,
      "value": 1
    }, {
      "objective_id_frontend": 33,
      "alternative_id_frontend": 66,
      "value": 2
    }
  ]
};

// // Save a case
// store.dispatch(saveCase(data_insert)).then(() =>
//   store.getState()
// )


// const test_data = {
//   // "uistate": {
//   //   "selected_alt_id": null,
//   //   "highlight": false,
//   //   "draggedObjectiveId": null,
//   //   "objectivesOrder": [8, 7],
//   //   "offsetX": 0,
//   //   "offsetY": 0
//   //   },
//   "objectives": [
//     {
//       "id": 7,
//       "case_id": 1,
//       "name": "Cost",
//       "sub_name": "Salary",
//       "evaluation_objective": "Salary + benefits",
//       "low_is_better": false,
//       "order": 1,
//       "unit_name": "Money",
//       "unit_prefix": "$",
//       "unit_suffix": null,
//       "created_at": "2016-12-17T00:00:00.000Z",
//       "updated_at": null
//     },
//     {
//       "id": 8,
//       "case_id": 1,
//       "name": "Location",
//       "sub_name": "Distance",
//       "evaluation_objective": "Distance from home",
//       "low_is_better": true,
//       "order": 2,
//       "unit_name": "Meters",
//       "unit_prefix": null,
//       "unit_suffix": "m",
//       "created_at": "2016-12-17T00:00:00.000Z",
//       "updated_at": null
//     }
//   ],
//   "cases": [
//     {
//       "id": 1,
//       "user_id": 1,
//       "name": "Jobs",
//       "description": "This is a case for searching a developer job in vancouver",
//       "created_at": null,
//       "updated_at": null
//     }
//   ],
//   "alternatives": [
//     {
//       "id": 1,
//       "case_id": 1,
//       "name": "LinkedIn",
//       "image_url": "1",
//       "order": 1,
//       "created_at": null,
//       "updated_at": null
//     },
//     {
//       "id": 2,
//       "case_id": 1,
//       "name": "Google",
//       "image_url": "2",
//       "order": 2,
//       "created_at": null,
//       "updated_at": null
//     },
//     {
//       "id": 3,
//       "case_id": 1,
//       "name": "LightHouse",
//       "image_url": "3",
//       "order": 3,
//       "created_at": null,
//       "updated_at": null
//     }
//   ],
//   "cells": [
//     {
//       "alternative_id": 1,
//       "objective_id": 7,
//       "value": 120000,
//       "id": 1,
//       "case_id": 1,
//       "name": "Facebook",
//       "image_url": "1",
//       // "order": 1,
//       "created_at": null,
//       "updated_at": null
//     },
//     {
//       "alternative_id": 2,
//       "objective_id": 7,
//       "value": 150000,
//       "id": 2,
//       "case_id": 1,
//       "name": "Google",
//       "image_url": "2",
//       // "order": 2,
//       "created_at": null,
//       "updated_at": null
//     },
//     {
//       "alternative_id": 3,
//       "objective_id": 7,
//       "value": 95000,
//       "id": 3,
//       "case_id": 1,
//       "name": "LightHouse",
//       "image_url": "3",
//       // "order": 3,
//       "created_at": null,
//       "updated_at": null
//     },
//     {
//       "alternative_id": 1,
//       "objective_id": 8,
//       "value": 10,
//       "id": 1,
//       "case_id": 1,
//       "name": "Facebook",
//       "image_url": "1",
//       // "order": 4,
//       "created_at": null,
//       "updated_at": null
//     },
//     {
//       "alternative_id": 2,
//       "objective_id": 8,
//       "value": 25,
//       "id": 2,
//       "case_id": 1,
//       "name": "Google",
//       "image_url": "2",
//       // "order": 5,
//       "created_at": null,
//       "updated_at": null
//     },
//     {
//       "alternative_id": 3,
//       "objective_id": 8,
//       "value": 5,
//       "id": 3,
//       "case_id": 1,
//       "name": "LightHouse",
//       "image_url": "3",
//       // "order": 6,
//       "created_at": null,
//       "updated_at": null
//     }
//   ]
// }

// store.dispatch({type: 'DATA_LOADED', data: test_data})  // calls all your reducers
