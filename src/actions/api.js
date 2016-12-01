import fetch from 'isomorphic-fetch'
import {reset} from 'redux-form';

const API_URL = 'http://localhost:3001';

// ----------------------------------------------------------------------------
// Save Case to Database

export const REQUEST_SAVE_CASE = 'REQUEST_SAVE_CASE'

export function requestSaveCase(data) {
  return { type: REQUEST_SAVE_CASE, data }
}

export function receiveSaveCase(json) {
  return {type: 'DATA_LOADED', data: json}
}

export function saveCaseAction(data) {
  return dispatch => {
    dispatch(requestSaveCase(data));
    return fetch(API_URL + '/api/cases', {
      method: 'post',
      body: JSON.stringify({data}),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    .then(res => res.json())
    .then(json => {
      dispatch(receiveSaveCase(json));
      dispatch(fetchUserCases());
      dispatch(reset('wizard'));
    })
  }
}

// ----------------------------------------------------------------------------
// Read Case from Database

export function requestCase(case_id) {
  return { type: 'REQUEST_CASE', case_id }
}

export function receiveCase(case_id, json) {
  return {type: 'DATA_LOADED', data: json}
}

export function fetchCase(case_id) {
  return dispatch => {

    dispatch(requestCase(case_id));

    return fetch(`${API_URL}/api/cases/${case_id}`, {credentials: 'include'})
      .then(response => response.json())
      .then(json => dispatch(receiveCase(case_id, json)))
  }
}
// ----------------------------------------------------------------------------
// Read all Cases by Id from Database

export function requestUserCases() {
  return { type: 'REQUEST_USER_CASE' }
}

export function receiveUserCases(json) {
  return { type: 'USER_CASES', data: json }
}

// This function is called from index to load the first Case
export function fetchUserCases() {
  return dispatch => {
    dispatch(requestUserCases());

    return fetch(`${API_URL}/api/cases`, {credentials: 'include'})
      .then(response => response.json())
      .then(json => dispatch(receiveUserCases(json)))
  }
}

// ----------------------------------------------------------------------------
// Editing CELL

export function cellBeingEdited(cell) {
  return { type: 'CELL_TOGGLED', cell }
}

export function cellSaveAction(value, cell) {
  return {
    type: 'CELL_SAVE',
    value: value,
    cell: cell
  }
}

export function cellUpdateDatabaseAction(value, cell) {
  return dispatch => {
    return fetch(`${API_URL}/api/cases/${cell.case_id}/values`, {
      method: 'post',
      body: JSON.stringify({cells: [cell]}),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    .then(res => res.json())
    .then(json => json)
  }
}

// ----------------------------------------------------------------------------
// HIDE elements

export function requestHide(data) {
  return { type: 'REQUEST_HIDE', data }
}

export function hideAction(whatToHide, case_id, data) {
  return dispatch => {
    dispatch(requestHide(data));

    return fetch(`${API_URL}/api/cases/${case_id}/${whatToHide}/hide`, {
      method: 'post',
      body: JSON.stringify({data}),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    .then(res => res.json())
    .then(json => json)
  }
}

// ----------------------------------------------------------------------------
// Order objectives

export function requestOrder(data) {
  return { type: 'REQUEST_ORDER', data }
}

export function receiveOrder(json) {
  return { type: 'RECEIVE_ORDER', data: json }
}

export function orderAction(case_id, data) {
  return dispatch => {
    dispatch(requestOrder(data));

    return fetch(`${API_URL}/api/cases/${case_id}/objectives/order`, {
      method: 'post',
      body: JSON.stringify({data}),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    .then(res => res.json())
    .then(json => dispatch(receiveOrder(json)))
  }
}

// ----------------------------------------------------------------------------
// Delete case from Database

export function requestDeleteCase(case_id) {
  return { type: 'REQUEST_DELETE_CASE', case_id }
}

export function deleteCaseAction(case_id) {
  return dispatch => {
    dispatch(requestDeleteCase(case_id));

    return fetch(`${API_URL}/api/cases/${case_id}`, {
      credentials: 'include',
      method: 'delete'
    })
      .then(response => response.json())
      .then(json => {
        dispatch(fetchUserCases());
      });
  }
}