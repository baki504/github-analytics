import {
  ChakraProvider,
  Container,
  Grid,
  theme,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { Route, Routes } from "react-router";
import { About } from "./About";
import { Header } from "./Header";
import { PullRequestDetail } from "./PullRequestDetail";
import { PullRequestSummary } from "./PullRequestSummary";
import { PullRequestTable } from "./PullRequestTable";
import { Top } from "./Top";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Header />
    <Grid minH="100vh" p={3}>
      <VStack spacing={8}>
        <Container maxW={"7xl"}>
          <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/summary" element={<PullRequestSummary />} />
            <Route path="/pulls" element={<PullRequestTable />} />
            <Route path="/pulls/:pullId" element={<PullRequestDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
      </VStack>
    </Grid>
  </ChakraProvider>
);
