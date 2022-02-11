type State = {
  count: number;
  isLoading: boolean;
  pulls: PullRequest[];
};

type Action = { type: string; payload?: any };

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

type PRComment = {
  id: string;
  prId: string;
  comment: string;
  user: string;
  createdAt: string;
};

type Summary = {
  user: string;
  prs: number;
  comments: number;
  filesChanged: number;
  averageCommentsPerPr: number;
  averageFilesPerPr: number;
};

type Column = {
  [key: string]: string;
};
