import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Heading, HStack, Stack } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

export const Settings: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const [showToken, setShowToken] = useState(false);
  return (
    <>
      <Stack spacing={4}>
        <Heading marginTop={5} as="h3" size="lg">
          Settings
        </Heading>
        <HStack>
          <Box>
            <FormControl id="ownerName" isRequired>
              <FormLabel>Owner Name</FormLabel>
              <Input type="text" />
            </FormControl>
          </Box>
          <Box>/</Box>
          <Box>
            <FormControl id="repositoryName" isRequired>
              <FormLabel>Repository Name</FormLabel>
              <Input type="text" />
            </FormControl>
          </Box>
        </HStack>
        <FormControl id="personalAccessToken" isRequired>
          <FormLabel>Personal Access Token</FormLabel>
          <InputGroup>
            <Input type={showToken ? "text" : "password"} />
            <InputRightElement>
              <Button
                variant={"ghost"}
                onClick={() => setShowToken((token) => !token)}
              >
                {showToken ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Stack spacing={10} pt={2}>
          <Button colorScheme="teal" onClick={() => navigate("/pulls")}>
            OK
          </Button>
        </Stack>
      </Stack>
    </>
  );
};
