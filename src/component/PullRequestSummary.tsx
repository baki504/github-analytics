import { Box, Heading } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useContext, useEffect, useState } from "react";
import { GitHubContext } from "./GitHubContextProvider";

const getPrSummary = (pulls: PullRequest[]): Summary[] =>
  pulls.reduce(
    (summaryRecords: Summary[], pull: PullRequest) => {
      const pr = summaryRecords.find((element) => element.user === pull.user);
      if (pr) {
        pr.prs++;
        pr.comments = pr.comments + pull.comments.length;
        pr.filesChanged = pr.filesChanged + pull.filesChanged;
        pr.averageCommentsPerPr = pr.comments / pr.prs;
        pr.averageFilesPerPr = pr.filesChanged / pr.prs;
        return summaryRecords;
      }
      return [...summaryRecords, {
        user: pull.user,
        prs: 1,
        comments: pull.comments.length,
        filesChanged: pull.filesChanged,
        averageCommentsPerPr: pull.comments.length,
        averageFilesPerPr: pull.filesChanged,
      }];
    },
    [],
  );

export const PullRequestSummary = () => {
  const { state } = useContext(GitHubContext);
  const { pulls } = state;
  const [summary, setSummary] = useState<Summary[]>();

  useEffect(() => {
    !summary && setSummary(getPrSummary(pulls));
  }, [pulls, summary]);

  return (
    <>
      <Heading as="h2" marginTop="5">
        PR summary
      </Heading>
      <Box marginTop={5}>
        {summary && summary.length
          ? (
            <Table variant="simple" size="md">
              <Thead>
                <Tr>
                  <Th>rank</Th>
                  <Th>user</Th>
                  <Th isNumeric>total PRs</Th>
                  <Th isNumeric>total comments</Th>
                  <Th isNumeric>total files changed</Th>
                  <Th isNumeric>average comments</Th>
                  <Th isNumeric>average files</Th>
                </Tr>
              </Thead>
              <Tbody>
                {summary.map((element, i) => (
                  <Tr key={i}>
                    <Td isNumeric>{i + 1}</Td>
                    <Td>{element.user}</Td>
                    <Td isNumeric>{element.prs}</Td>
                    <Td isNumeric>{element.comments}</Td>
                    <Td isNumeric>{element.filesChanged}</Td>
                    <Td isNumeric>{element.averageCommentsPerPr}</Td>
                    <Td isNumeric>{element.averageFilesPerPr}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )
          : "No data."}
      </Box>
    </>
  );
};
