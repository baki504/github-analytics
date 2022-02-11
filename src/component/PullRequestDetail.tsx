import { Button } from "@chakra-ui/button";
import { Box, Heading } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { GitHubContext } from "./GitHubContextProvider";

export const PullRequestDetail = () => {
  const navigate = useNavigate();
  const { pullId } = useParams();
  const { state } = useContext(GitHubContext);
  const comments = state.pulls.find((pull) => pull.number === pullId)?.comments;

  return (
    <>
      <Heading as="h2" marginTop="5">
        {"title"} #{pullId}
      </Heading>
      <Box marginTop={5}>
        {comments && comments.length
          ? (
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
                  {comments.map((comment) => (
                    <Tr key={comment.id}>
                      <Td>
                        {comment.id}
                      </Td>
                      <Td style={{ whiteSpace: "pre-line" }}>
                        <ReactMarkdown>{comment.comment}</ReactMarkdown>
                      </Td>
                      <Td>{comment.user}</Td>
                      <Td>{comment.createdAt}</Td>
                    </Tr>
                  ))}
                </Tbody>
              )}
            </Table>
          )
          : "This PR has no comments."}
      </Box>
      <Button marginTop={5} variant="outline" onClick={() => navigate(-1)}>
        Back
      </Button>
    </>
  );
};
