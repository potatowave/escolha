import fetch from 'isomorphic-fetch'

// ----------------------------------------------------------------------------
// Save Case to Database

export const REQUEST_SAVE_CASE = 'REQUEST_SAVE_CASE'

export function requestSaveCase(data) {
  return {
    type: REQUEST_SAVE_CASE,
    data
  }
}

export const RECEIVE_SAVE_CASE = 'RECEIVE_SAVE_CASE'

export function receiveSaveCase(json) {
  // workaround -- adding to store!
  // json.uistate = 3
  return {type: 'DATA_LOADED', data: json}
}

export function saveCase(data) {
  return dispatch => {
    dispatch(requestSaveCase(data));
    return fetch('http://localhost:3001/api/cases', {
      method: 'post',
      body: JSON.stringify({data}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => dispatch(receiveSaveCase(json)))
  }
}
// ----------------------------------------------------------------------------
// Read Case from Database


// Trigger this action when REQUEST to fetch data from API
export const REQUEST_CASE = 'REQUEST_CASE'

export function requestCase(case_id) {
  return {
    type: REQUEST_CASE,
    case_id
  }
}

// After the aSync call to API is done this function is called
export const RECEIVE_CASE = 'RECEIVE_CASE'

export function receiveCase(case_id, json) {
  // workaround -- adding to store!
  // json.uistate = 3
  return {type: 'DATA_LOADED', data: json}
}

// This function is called from index to load the first Case
export function fetchCase(case_id) {
  return dispatch => {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestCase(case_id));

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    return fetch(`http://localhost:3001/api/cases/${case_id}`)
      .then(response => response.json())
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        dispatch(receiveCase(case_id, json))
      )
  }
}