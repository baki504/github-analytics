import {
  Box,
  Flex,
  Select,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { FormEvent, useContext } from "react";
import { switchRepository } from "../utils/dataFetcher";
import { GitHubContext } from "./GitHubContextProvider";
import { AddIconLink } from "./AddIconLink";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(GitHubContext);
  const { repositoryInfoList, selectedRepositoryInfo, isLoading } = state;

  const switchRepositoryHandler = (e: FormEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    const targetRepository = repositoryInfoList.find(
      (repo) => repo.key === value,
    );
    if (targetRepository) {
      switchRepository(dispatch, selectedRepositoryInfo, targetRepository);
    }
    navigate("/");
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            fontSize="2xl"
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            GitHub Analytics
          </Text>
        </Flex>

        <Stack
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {repositoryInfoList.length > 1 && (
            <Select
              placeholder="Select repository"
              onChange={switchRepositoryHandler}
              defaultValue={selectedRepositoryInfo.key}
              disabled={isLoading}
            >
              {repositoryInfoList.map((
                repository,
              ) => (
                <option key={repository.key} value={repository.key}>
                  {repository.key}
                </option>
              ))}
            </Select>
          )}
          <AddIconLink />
        </Stack>
      </Flex>
    </Box>
  );
};
