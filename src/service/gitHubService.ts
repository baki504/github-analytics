import axios from "axios";

const BASE_URL =
  `https://api.github.com/repos/${process.env.REACT_APP_REPOSITORY_OWNER}/${process.env.REACT_APP_REPOSITORY_NAME}`;

const headers = {
  "Accept": "application/vnd.github.v3+json",
  "Authorization": process.env.REACT_APP_GITHUB_TOKEN || "",
};

export const fetchPulls = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/pulls`,
      { headers },
    );
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const fetchComments = async (pullId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/pulls/${pullId}/comments`,
      { headers },
    );
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
