import {
  ChakraProvider,
  Container,
  Grid,
  theme,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { Route, Routes } from "react-router";
import { Header } from "./component/Header";
import { PullRequestDetail } from "./component/PullRequestDetail";
import { PullRequestSummary } from "./component/PullRequestSummary";
import { PullRequestTable } from "./component/PullRequestTable";
import { RepositoryLink } from "./component/RepositoryLink";
import { Settings } from "./component/NewRepository";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Header />
    <Grid minH="100vh" p={3}>
      <VStack spacing={8}>
        <Container maxW={".lg"}>
          <Routes>
            <Route path="/" element={<Settings />} />
            <Route path="/pulls" element={<PullRequestTable />} />
            <Route path="/pulls/:pullId" element={<PullRequestDetail />} />
            <Route path="/summary" element={<PullRequestSummary />} />
          </Routes>
        </Container>
      </VStack>
    </Grid>
  </ChakraProvider>
);
