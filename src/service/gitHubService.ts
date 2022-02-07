import axios from "axios";

const hostName = process.env.REACT_APP_HOST_NAME;
const repositoryOwner = process.env.REACT_APP_REPOSITORY_OWNER;
const repositoryName = process.env.REACT_APP_REPOSITORY_NAME;
const acceptHeader = process.env.REACT_APP_ACCEPT_HEADER || "";
const gitHubToken = process.env.REACT_APP_GITHUB_TOKEN || "";

const ENDPOINT_BASE =
  `https://${hostName}/repos/${repositoryOwner}/${repositoryName}`;

export const sendRequest = async (uri: string) => {
  const headers = {
    "Accept": acceptHeader,
    "Authorization": gitHubToken,
  };

  try {
    const response = await axios.get(
      `${ENDPOINT_BASE}/${uri}`,
      { headers },
    );
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const fetchPulls = async () => sendRequest("pulls");
export const fetchComments = async (pullId: string) =>
  sendRequest(`pulls/${pullId}/comments`);
export const fetchPrFiles = async (pullId: string) =>
  sendRequest(`pulls/${pullId}/files`);
