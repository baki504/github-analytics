type PRComment = {
  id: string;
  prId: string;
  comment: string;
  user: string;
  createdAt: string;
};

type PullRequest = {
  number: string;
  title: string;
  user: string;
  state: string;
  comments: PRComment[];
  filesChanged: number;
  additions: number;
  deletions: number;
  changes: number;
  createdAt: string;
  link: string;
};

type RepositoryInfo = {
  key: string;
  owner: string;
  name: string;
  pulls: PullRequest[];
  summaryRecords: Summary[];
};

type GitHubContext = {
  selectedRepositoryInfo: RepositoryInfo;
  repositoryInfoList: RepositoryInfo[];
  isLoading: boolean;
};

type Action = { type: string; payload?: any };

type Summary = {
  user: string;
  totalPrs: number;
  totalComments: number;
  filesChanged: number;
  averageComments: number;
  averageFiles: number;
};

type Column = {
  [key: string]: string;
};
