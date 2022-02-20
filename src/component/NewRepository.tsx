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
import { FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { switchRepository } from "../utils/dataFetcher";
import { GitHubContext } from "./GitHubContextProvider";
type Props = {};

export const AddRepository: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(GitHubContext);
  const { repositoryInfoList, selectedRepositoryInfo } = state;

  const switchRepositoryHandler = (e: FormEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    const targetRepository = repositoryInfoList.find((repo) =>
      repo.key === value
    );
    if (targetRepository) {
      switchRepository(dispatch, selectedRepositoryInfo, targetRepository);
    }
  };

  return (
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Add repository
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
                <Input type="text" />
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
                <Input type="text" />
              </FormControl>
            </Box>
          </HStack>
          <Stack spacing={5} pt={2}>
            <Button
              colorScheme="teal"
              size="lg"
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
