import { Box, ChakraProvider, Grid, theme, VStack } from "@chakra-ui/react";
import * as React from "react";
import { Route, Routes } from "react-router";
import { About } from "./About";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { PullRequestTable } from "./PullRequestTable";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Routes>
            <Route path="/" element={<PullRequestTable />} />
            <Route path="about" element={<About />} />
          </Routes>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
);
