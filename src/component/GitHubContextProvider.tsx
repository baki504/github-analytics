import { createContext, useReducer } from "react";
import {
  FETCH_PULLS_FAILURE,
  FETCH_PULLS_REQUEST,
  FETCH_PULLS_SUCCESS,
  UPDATE_PR_SUMMARY,
  UPDATE_REPOSITORY_INFO,
} from "../utils/action";

const reducer = (state: GitHubContext, action: Action) => {
  switch (action.type) {
    case FETCH_PULLS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_PULLS_SUCCESS:
      return {
        ...state,
        selectedRepositoryInfo: {
          ...state.selectedRepositoryInfo,
          pulls: action.payload,
        },
        isLoading: false,
      };
    case FETCH_PULLS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case UPDATE_PR_SUMMARY:
      return {
        ...state,
        selectedRepositoryInfo: {
          ...state.selectedRepositoryInfo,
          summaryRecords: action.payload,
        },
      };
    case UPDATE_REPOSITORY_INFO:
      return {
        ...state,
        selectedRepositoryInfo: action.payload.repositoryInfoTo,
        repositoryInfoList: updateRepositoryInfo(
          state.repositoryInfoList,
          action.payload.repositoryInfoFrom,
        ),
      };
    default:
      return state;
  }
};

const updateRepositoryInfo = (
  repositoryInfoList: RepositoryInfo[],
  repositoryInfoFrom: any,
) =>
  repositoryInfoList.map((repoInfo) =>
    repoInfo.key === repositoryInfoFrom.key ? repositoryInfoFrom : repoInfo
  );

export const GitHubContext = createContext(
  {} as {
    state: GitHubContext;
    dispatch: React.Dispatch<Action>;
  },
);

const defaultKeys = process.env.REACT_APP_REPOSITORY_KEYS?.split(",") || [];
const key = defaultKeys.length > 0 ? defaultKeys[0] : "";

const createInitialRepositoryInfo = (repositoryKey: string) => {
  const [owner, name] = repositoryKey.split("/");
  return {
    key: repositoryKey,
    owner,
    name,
    pulls: undefined,
    summaryRecords: [],
  };
};

const initialState = {
  selectedRepositoryInfo: createInitialRepositoryInfo(key),
  repositoryInfoList: defaultKeys.map((repoKey) =>
    createInitialRepositoryInfo(repoKey)
  ),
  isLoading: false,
};

export const GitHubContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GitHubContext.Provider value={{ state, dispatch }}>
      {children}
    </GitHubContext.Provider>
  );
};
