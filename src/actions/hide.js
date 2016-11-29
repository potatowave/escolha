import fetch from 'isomorphic-fetch'

// ----------------------------------------------------------------------------
// Show - Hide elements

export const REQUEST_HIDE = 'REQUEST_HIDE'

export function requestHide(data) {
  return {
    type: REQUEST_HIDE,
    data
  }
}

export const RECEIVE_HIDE = 'RECEIVE_HIDE'

export function receiveHide(json) {
  return {type: 'DATA_LOADED', data: json}
}

export function hideAction(whatToHide, case_id, data) {

  return dispatch => {
    dispatch(requestHide(data));

    return fetch(`http://localhost:3001/api/cases/${case_id}/${whatToHide}/hide`, {
      method: 'post',
      body: JSON.stringify({data}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    //.then(json => dispatch(receiveHide(json)))
  }


}