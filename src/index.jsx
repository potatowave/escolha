import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';  // set up logging in the console so we can see how actions are fired
import rootReducer from './reducers';
import App from './App.jsx';

// Load up the application styles
require('../styles/application.scss');

// Render the top-level React component


// Configure the Redux Store

const store = createStore(
  rootReducer,
  {},
  // apply the 'logger' middleware. this will console.log every action that is sent to the redux store.
  applyMiddleware(createLogger())
);

// Wrap the component in a <Provider>
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root')
);

// index.jsx
// $.get("./test_redux_store.jsx")
// .done(function(data){
//   console.log("Got Data!", data)
//   store.dispatch({type: 'DATA_LOADED', data: data})  // calls all your reducers
// })


const test_data = {
  users: [
    {id: 1, name: "Bob"},
  ],

  cases: [{
    name: "Choosing a Car",
    description: "FROM TEST DATA: Activated charcoal wolf locavore yuccie. Paleo pork belly readymade, chia direct trade ethical narwhal man braid post-ironic pickled iceland. Cardigan twee swag VHS." }],

  objectives:
   [ { id_frontend: 1,
       name: 'Cost',
       sub_name: 'Price',
       evaluation_objective: 'Just the car price',
       low_is_better: true,
       unit_name: '          money',
       unit_prefix: '$',
       unit_suffix: '',
       scale_type: 'this is managed on the front-end' },

     { id_frontend: 2,
       name: 'Cost',
       sub_name: 'Mainetence',
       evaluation_objective: 'Per year mainetence',
       low_is_better: true,
       unit_name: 'money',
       unit_prefix: '$',
       unit_suffix: '',
       scale_type: 'this is managed on the front-end' } ],

  alternatives:
   [ { id_frontend: 1,
       name: 'Ferrari',
       image_url: 'https://s-media-cache-ak0.pinimg.com/236x/89/5c/b1/895cb18bd918640844fdd3bc6297fddd.jpg' },
     { id_frontend: 2,
       name: 'Lamborghini',
       image_url: 'https://s-media-cache-ak0.pinimg.com/236x/c8/71/07/c871079f871b72609735e584235f1f12.jpg' },
     { id_frontend: 3,
       name: 'Lamborghini',
       image_url: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSyqYUmFsqlT5RtmrxJNGhq70lk2ePKuffpBILv1UtIfk71nE5X' } ],

  values:
   [ { objective_id_frontend: 1,
       alternative_id_frontend: 1,
       value: 150000 },
     { objective_id_frontend: 1,
       alternative_id_frontend: 2,
       value: 390888 },
     { objective_id_frontend: 1,
       alternative_id_frontend: 3,
       value: 420123 },
     { objective_id_frontend: 2,
       alternative_id_frontend: 1,
       value: 120 },
     { objective_id_frontend: 2,
       alternative_id_frontend: 2,
       value: 99 },
     { objective_id_frontend: 2,
       alternative_id_frontend: 3,
       value: 560 } ],

  uiState: {
    currentCaseId: 1,
    currentAlternativeId: 2,
  }
}

console.log("Loading data in the Store", test_data)
store.dispatch({type: 'DATA_LOADED', data: test_data})  // calls all your reducers


