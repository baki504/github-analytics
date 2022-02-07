import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Heading, Link, VStack } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useEffect, useState } from "react";
import {
  fetchComments,
  fetchPrFiles,
  fetchPulls,
} from "./service/gitHubService";
import { stringComparator } from "./utils";

type PrRecord = {
  number: string;
  title: string;
  user: string;
  state: string;
  comments: number;
  files: number;
  additions: number;
  deletions: number;
  changes: number;
  createdAt: string;
  link: string;
};

export const PullRequestTable = () => {
  const [prRecords, setPrRecords] = useState<PrRecord[]>([]);
  useEffect(() => {
    (async () => {
      const pulls = await fetchPulls();
      const idOrderedPrRecords = pulls.map((pull: any) => ({
        number: pull.number,
        title: pull.title,
        user: pull.user.login,
        state: pull.state,
        comments: 0,
        createdAt: pull.created_at,
        link: pull.html_url,
      })).sort((a: any, b: any) => stringComparator(a.number, b.number));

      setPrRecords(
        await Promise.all(
          idOrderedPrRecords.map(async (pullRequest: PrRecord) => {
            const { number: prId } = pullRequest;
            const comment = await fetchComments(prId);
            const prFiles = await fetchPrFiles(prId);
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
              ...pullRequest,
              comments: comment.length,
              files: prFiles.length,
              additions,
              deletions,
              changes,
            };
          }),
        ),
      );
    })();
  }, []);

  return (
    <>
      <Heading as="h2" marginTop="5">
        Pull Requests
      </Heading>
      <Box marginTop={5}>
        {prRecords.length
          ? (
            <Table variant="simple" size="md">
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>title</Th>
                  <Th>user</Th>
                  <Th>state</Th>
                  <Th>created at</Th>
                  <Th isNumeric>comments</Th>
                  <Th isNumeric>files</Th>
                  <Th isNumeric>additions</Th>
                  <Th isNumeric>deletions</Th>
                  <Th isNumeric>changes</Th>
                  <Th>Link</Th>
                </Tr>
              </Thead>
              <Tbody>
                {prRecords.map((record) => (
                  <Tr key={record.number}>
                    <Td>
                      <Link href={`/pulls/${record.number}`}>
                        {record.number}
                      </Link>
                    </Td>
                    <Td>{record.title}</Td>
                    <Td>{record.user}</Td>
                    <Td>{record.state}</Td>
                    <Td>{record.createdAt}</Td>
                    <Td isNumeric>{record.comments}</Td>
                    <Td isNumeric>{record.files}</Td>
                    <Td isNumeric>{record.additions}</Td>
                    <Td isNumeric>{record.deletions}</Td>
                    <Td isNumeric>{record.changes}</Td>
                    <Td>
                      <Box textAlign={"center"}>
                        <Link href={record.link} isExternal>
                          <ExternalLinkIcon mx="2px" />
                        </Link>
                      </Box>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )
          : "Connecting..."}
      </Box>
    </>
  );
};
