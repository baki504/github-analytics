import { callComments, callPrFiles, callPulls } from "../service/gitHubService";
import {
  fetchPullsFailure,
  fetchPullsRequest,
  fetchPullsSuccess,
  updateRepositoryInfo,
} from "./action";
import { localeDateString, stringComparator } from "./utils";

export const fetchPulls = async (
  dispatch: React.Dispatch<Action>,
  repositoryKey: string,
) => {
  fetchPullsRequest(dispatch);
  try {
    const pulls = await callPulls(repositoryKey);
    const pullRequests = await Promise.all(
      (await createPullRequests(pulls)).map(
        async (pullRequest: PullRequest) => {
          const { number: prId } = pullRequest;
          return {
            ...pullRequest,
            comments: await createComments(prId, repositoryKey),
            ...await createPrFileDetails(prId, repositoryKey),
          };
        },
      ),
    );
    fetchPullsSuccess(dispatch, pullRequests);
  } catch (error) {
    fetchPullsFailure(dispatch, error);
  }
};

const createPullRequests = async (pulls: any) =>
  pulls.map((pull: any) => ({
    number: pull.number.toString(),
    title: pull.title,
    user: pull.user.login,
    state: pull.state,
    comments: 0,
    createdAt: localeDateString(pull.created_at),
    url: pull.html_url,
  })).sort((a: any, b: any) => stringComparator(a.createdAt, b.createdAt));

const createComments = async (prId: string, repositoryKey: string) =>
  (await callComments(repositoryKey, prId)).map((comment: any) => ({
    id: comment.id,
    prId,
    comment: comment.body,
    user: comment.user.login,
    createdAt: localeDateString(comment.created_at),
    url: comment.html_url,
  })).sort((a: any, b: any) => stringComparator(a.createdAt, b.createdAt));

const createPrFileDetails = async (prId: string, repositoryKey: string) => {
  const prFiles = await callPrFiles(repositoryKey, prId);
  const { additions, deletions, changes } = prFiles.reduce(
    (
      sum: { additions: number; deletions: number; changes: number },
      pr: any,
    ) => ({
      additions: sum.additions + pr.additions,
      deletions: sum.deletions + pr.deletions,
      changes: sum.changes + pr.changes,
    }),
    { additions: 0, deletions: 0, changes: 0 },
  );
  return {
    filesChanged: prFiles.length,
    additions,
    deletions,
    changes,
  };
};

export const switchRepository = (
  dispatch: React.Dispatch<Action>,
  repositoryInfoFrom: RepositoryInfo,
  repositoryInfoTo: RepositoryInfo,
) => updateRepositoryInfo(dispatch, { repositoryInfoFrom, repositoryInfoTo });
