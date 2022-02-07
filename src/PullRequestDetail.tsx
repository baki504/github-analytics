import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import { fetchComments } from "./service/gitHubService";
import { stringComparator } from "./utils";
import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";

type CommentRecord = {
  id: string;
  comment: string;
  user: string;
  createdAt: string;
};

export const PullRequestDetail = () => {
  const navigate = useNavigate();
  const { pullId } = useParams();
  const [comments, setComments] = useState<CommentRecord[]>([]);

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
      <Heading as="h2" marginTop="5">
        {"title"} #{pullId}
      </Heading>
      <Box marginTop={5}>
        {comments.length && (
          <Table variant="simple" size="md">
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
      </Box>
      <Button marginTop={5} variant="outline" onClick={() => navigate(-1)}>
        Back
      </Button>
    </>
  );
};
