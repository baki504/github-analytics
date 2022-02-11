import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Heading, Link as ChakraLink } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPulls } from "../utils/dataFetcher";
import { GitHubContext } from "./GitHubContextProvider";

export const PullRequestTable = () => {
  const { state, dispatch } = useContext(GitHubContext);
  const { pulls } = state;

  useEffect(() => {
    pulls.length === 0 && fetchPulls(dispatch);
  }, [dispatch, pulls]);

  return (
    <>
      <Heading as="h2" marginTop="5">
        Pull Requests
      </Heading>
      <Box marginTop={5}>
        {pulls && pulls.length
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
                {pulls.map((pull) => (
                  <Tr key={pull.number}>
                    <Td isNumeric>
                      <Link to={`/pulls/${pull.number}`}>
                        {pull.number}
                      </Link>
                    </Td>
                    <Td>{pull.title}</Td>
                    <Td>{pull.user}</Td>
                    <Td>{pull.state}</Td>
                    <Td>{pull.createdAt}</Td>
                    <Td isNumeric>{pull.comments.length}</Td>
                    <Td isNumeric>{pull.filesChanged}</Td>
                    <Td isNumeric>{pull.additions}</Td>
                    <Td isNumeric>{pull.deletions}</Td>
                    <Td isNumeric>{pull.changes}</Td>
                    <Td>
                      <Box textAlign={"center"}>
                        <ChakraLink to={pull.link} isExternal>
                          <ExternalLinkIcon mx="2px" />
                        </ChakraLink>
                      </Box>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )
          : "Fetching data..."}
      </Box>
    </>
  );
};
