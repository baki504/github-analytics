export const FETCH_PULLS_REQUEST = "FETCH_PULLS_REQUEST";
export const FETCH_PULLS_SUCCESS = "FETCH_PULLS_SUCCESS";
export const FETCH_PULLS_FAILURE = "FETCH_PULLS_FAILURE";

export const fetchPullsRequest = (dispatch: React.Dispatch<Action>) => {
  return dispatch({ type: FETCH_PULLS_REQUEST });
};

export const fetchPullsSuccess = (
  dispatch: React.Dispatch<Action>,
  payload: any,
) => {
  return dispatch({ type: FETCH_PULLS_SUCCESS, payload });
};

export const fetchPullsFailure = (
  dispatch: React.Dispatch<Action>,
  payload: any,
) => {
  return dispatch({ type: FETCH_PULLS_FAILURE, payload });
};
