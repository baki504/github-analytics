import {
  fetchPullsFailure,
  fetchPullsRequest,
  fetchPullsSuccess,
} from "./action";
import { callComments, callPrFiles, callPulls } from "../service/gitHubService";
import { localeDateString, stringComparator } from "./utils";

export const fetchPulls = async (dispatch: React.Dispatch<Action>) => {
  fetchPullsRequest(dispatch);
  try {
    const pulls = await callPulls();
    const pullRequests = await Promise.all(
      (await createPullRequests(pulls)).map(
        async (pullRequest: PullRequest) => {
          const { number: prId } = pullRequest;
          return {
            ...pullRequest,
            comments: await createComments(prId),
            ...await createPrFileDetails(prId),
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
    link: pull.html_url,
  })).sort((a: any, b: any) => stringComparator(a.createdAt, b.createdAt));

const createComments = async (prId: string) =>
  (await callComments(prId)).map((comment: any) => ({
    id: comment.id,
    prId,
    comment: comment.body,
    user: comment.user.login,
    createdAt: localeDateString(comment.created_at),
  })).sort((a: any, b: any) => stringComparator(a.createdAt, b.createdAt));

const createPrFileDetails = async (prId: string) => {
  const prFiles = await callPrFiles(prId);
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
