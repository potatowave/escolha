import fetch from 'isomorphic-fetch'

// ----------------------------------------------------------------------------
// Delete objective

export const REQUEST_DELETE_OBJECTIVE = 'REQUEST_DELETE_OBJECTIVE'

export function requestDeleteObjective(data) {
  return {
    type: REQUEST_DELETE_OBJECTIVE,
    data
  }
}

export const RECEIVE_DELETE_OBJECTIVE = 'RECEIVE_DELETE_OBJECTIVE'

export function receiveDeleteObjective(json) {
  return {type: 'DATA_LOADED', data: json}
}

export function deleteObjective(data) {
  return dispatch => {
    dispatch(requestDeleteObjective(data));
    return fetch(`http://localhost:3001/api/cases/${data.case_id}/objectives/${data.id}`, {
      method: 'delete',
      body: JSON.stringify({data}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => dispatch(receiveDeleteObjective(json)))
  }
}

// ----------------------------------------------------------------------------
// Delete alternative

export const REQUEST_DELETE_ALTERNATIVE = 'REQUEST_DELETE_ALTERNATIVE'

export function requestDeleteAlternative(data) {
  return {
    type: REQUEST_DELETE_ALTERNATIVE,
    data
  }
}

export const RECEIVE_DELETE_ALTERNATIVE = 'RECEIVE_DELETE_ALTERNATIVE'

export function receiveDeleteAlternative(json) {
  return {type: 'DATA_LOADED', data: json}
}

export function deleteAlternative(data) {
  console.log(data);
  return dispatch => {
    dispatch(requestDeleteAlternative(data));
    return fetch(`http://localhost:3001/api/cases/${data.case_id}/alternatives/${data.id}`, {
      method: 'delete',
      body: JSON.stringify({data}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => dispatch(receiveDeleteAlternative(json)))
  }
}