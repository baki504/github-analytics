import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchComments, fetchPulls } from "./service/gitHubService";
import { stringComparator } from "./utils";

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
            const comment = await fetchComments(pullRequest.number);
            return {
              ...pullRequest,
              comments: comment.length,
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
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  );
};
