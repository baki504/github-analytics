import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GitHubContext } from "./GitHubContextProvider";
type Props = {};

export const AddRepository: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { state } = useContext(GitHubContext);
  const [owner, setOwner] = useState<string>("");
  const [repositoryName, setRepositoryName] = useState<string>("");

  const handleOwnerChange = (e: FormEvent<HTMLInputElement>) => {
    setOwner(e.currentTarget.value);
  };
  const handleRepositoryNameChange = (e: FormEvent<HTMLInputElement>) => {
    setRepositoryName(e.currentTarget.value);
  };

  return (
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          New repository
        </Heading>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={8}>
          <HStack>
            <Box>
              <FormControl id="ownerName" isRequired>
                <FormLabel>Owner</FormLabel>
                <Input type="text" onChange={(e) => handleOwnerChange(e)} />
              </FormControl>
            </Box>
            <Box>
              <Text marginTop={5} fontSize="2xl">
                /
              </Text>
            </Box>
            <Box>
              <FormControl id="repositoryName" isRequired>
                <FormLabel>Repository name</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => handleRepositoryNameChange(e)}
                />
              </FormControl>
            </Box>
          </HStack>
          <Stack spacing={5} pt={2}>
            <Button
              colorScheme="teal"
              size="lg"
              disabled={owner.length === 0 || repositoryName.length === 0}
            >
              Save
            </Button>
            <Button
              colorScheme="teal"
              size="lg"
              variant="outline"
              onClick={() => navigate(`/`)}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
