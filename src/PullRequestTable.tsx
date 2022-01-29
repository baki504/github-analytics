import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/table";
import React, { useEffect, useState } from "react";
import { fetchComments, fetchPulls } from "./service/gitHubService";

type PrRecord = {
  number: string;
  title: string;
  user: string;
  state: string;
  comments: number;
  createdAt: string;
};

export const PullRequestTable = () => {
  const [prRecords, setPrRecords] = useState<PrRecord[]>([]);
  useEffect(() => {
    (async () => {
      const pulls = await fetchPulls();
      const records = pulls.map((pull: any) => ({
        number: pull.number,
        title: pull.title,
        user: pull.user.login,
        state: pull.state,
        comments: 0,
        createdAt: pull.created_at,
      })) as PrRecord[];

      const newPrRecords = await Promise.all(
        [...records]
          .sort((a, b) => ((a.number < b.number) ? -1 : 1))
          .map(async (pullRequest) => {
            const commentObject = await fetchComments(pullRequest.number);
            return {
              ...pullRequest,
              comments: commentObject.length,
            };
          }),
      );
      setPrRecords(newPrRecords);
    })();
  }, []);
  return (
    <>
      {prRecords.length && (
        <Table variant="simple" size="small">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>title</Th>
              <Th>user</Th>
              <Th>state</Th>
              <Th>created at</Th>
              <Th isNumeric>comments</Th>
            </Tr>
          </Thead>
          <Tbody>
            {prRecords.map((record) => (
              <Tr key={record.number}>
                <Td>{record.number}</Td>
                <Td>{record.title}</Td>
                <Td>{record.user}</Td>
                <Td>{record.state}</Td>
                <Td>{record.createdAt}</Td>
                <Td isNumeric>{record.comments}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  );
};
