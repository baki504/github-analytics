import axios from "axios";

const hostName = process.env.REACT_APP_HOST_NAME;
const acceptHeader = process.env.REACT_APP_ACCEPT_HEADER || "";
const gitHubToken = process.env.REACT_APP_GITHUB_TOKEN || "";

export const sendRequest = async (repositoryKey: string, uri: string) => {
  const headers = {
    "Accept": acceptHeader,
    "Authorization": gitHubToken,
  };

  try {
    const response = await axios.get(
      `https://${hostName}/repos/${repositoryKey}/${uri}`,
      { headers },
    );
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const callPulls = async (repositoryKey: string) =>
  sendRequest(repositoryKey, "pulls?state=all&direction=desc&per_page=100");
export const callComments = async (repositoryKey: string, pullId: string) =>
  sendRequest(repositoryKey, `pulls/${pullId}/comments?per_page=100`);
export const callPrFiles = async (repositoryKey: string, pullId: string) =>
  sendRequest(repositoryKey, `pulls/${pullId}/files?per_page=100`);
