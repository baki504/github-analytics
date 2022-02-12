import React, { createContext, useReducer } from "react";
import {
  FETCH_PULLS_FAILURE,
  FETCH_PULLS_REQUEST,
  FETCH_PULLS_SUCCESS,
} from "../utils/action";

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case FETCH_PULLS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_PULLS_SUCCESS:
      return {
        ...state,
        pulls: action.payload,
        isLoading: false,
      };
    case FETCH_PULLS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const GitHubContext = createContext({} as {
  state: State;
  dispatch: React.Dispatch<Action>;
});

const initialState = {
  repositoryOwner: process.env.REACT_APP_REPOSITORY_OWNER || "",
  repositoryName: process.env.REACT_APP_REPOSITORY_NAME || "",
  count: 0,
  isLoading: false,
  pulls: [],
};

export const GitHubContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GitHubContext.Provider value={{ state, dispatch }}>
      {children}
    </GitHubContext.Provider>
  );
};
