import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import { fetchComments } from "./service/gitHubService";
import { stringComparator } from "./utils";

type CommentRecord = {
  id: string;
  comment: string;
  user: string;
  createdAt: string;
};

type SummaryRecord = {
  user: string;
  comments: number;
};

export const PullRequestDetail = () => {
  const navigate = useNavigate();
  const { pullId } = useParams();
  const [comments, setComments] = useState<CommentRecord[]>([]);
  const [summary, setSummary] = useState<SummaryRecord[]>([]);

  useEffect(() => {
    (async () => {
      const commentList = await fetchComments(pullId || "");
      setComments(
        commentList
          .map((comment: any) => ({
            id: comment.id,
            comment: comment.body,
            user: comment.user.login,
            createdAt: comment.created_at,
          }))
          .sort((a: any, b: any) => stringComparator(a.createdAt, b.createdAt)),
      );
    })();
  }, [pullId]);

  return (
    <>
      <h2>Pull Request: {pullId}</h2>
      <p></p>
      <p></p>
      <p></p>
      {comments.length && (
        <Table variant="simple" size="small">
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>comment</Th>
              <Th>user</Th>
              <Th>created at</Th>
            </Tr>
          </Thead>
          {(
            <Tbody>
              {comments.map((record: CommentRecord) => (
                <Tr key={record.id}>
                  <Td>
                    {record.id}
                  </Td>
                  <Td style={{ whiteSpace: "pre-line" }}>
                    <ReactMarkdown>{record.comment}</ReactMarkdown>
                  </Td>
                  <Td>{record.user}</Td>
                  <Td>{record.createdAt}</Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      )}
      <Button colorScheme="blue" onClick={() => navigate(-1)}>Back</Button>
    </>
  );
};
