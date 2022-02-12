export const FETCH_PULLS_REQUEST = "FETCH_PULLS_REQUEST";
export const FETCH_PULLS_SUCCESS = "FETCH_PULLS_SUCCESS";
export const FETCH_PULLS_FAILURE = "FETCH_PULLS_FAILURE";
export const UPDATE_PR_SUMMARY = "UPDATE_PR_SUMMARY";

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

export const updatePrSummary = (
  dispatch: React.Dispatch<Action>,
  payload: any,
) => {
  return dispatch({ type: UPDATE_PR_SUMMARY, payload });
};
