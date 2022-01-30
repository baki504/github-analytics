import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      {prRecords.length && (
        <Table variant="simple" size="small">
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
            </Tr>
          </Thead>
          <Tbody>
            {prRecords.map((record) => (
              <Tr key={record.number}>
                <Td>
                  <Link to={`/pulls/${record.number}`}>
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
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  );
};
