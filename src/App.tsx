import {
  ChakraProvider,
  Container,
  Grid,
  theme,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Route, Routes } from "react-router";
import { GitHubContext } from "./component/GitHubContextProvider";
import { Header } from "./component/Header";
import { AddRepository } from "./component/NewRepository";
import { PullRequestDetail } from "./component/PullRequestDetail";
import { PullRequestSummary } from "./component/PullRequestSummary";
import { PullRequestTable } from "./component/PullRequestTable";

export const App = () => {
  const { state } = useContext(GitHubContext);
  const { selectedRepositoryInfo } = state;

  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <Container maxW={".lg"}>
            <Routes>
              <Route
                path="/"
                element={selectedRepositoryInfo
                  ? <PullRequestTable />
                  : <AddRepository />}
              />
              <Route path="/add" element={<AddRepository />} />
              <Route path="/pulls" element={<PullRequestTable />} />
              <Route path="/pulls/:pullId" element={<PullRequestDetail />} />
              <Route path="/summary" element={<PullRequestSummary />} />
            </Routes>
          </Container>
        </VStack>
      </Grid>
    </ChakraProvider>
  );
};
