import {
  Button,
  Container,
  FormControl,
  Heading,
  Select,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { switchRepository } from "../utils/dataFetcher";
import { GitHubContext } from "./GitHubContextProvider";

type Props = {};

export const Settings: React.FC<Props> = (props) => {
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
    <Container
      maxW={"lg"}
      bg={useColorModeValue("white", "whiteAlpha.100")}
      boxShadow={"xl"}
      rounded={"lg"}
      p={6}
      direction={"column"}
    >
      <Heading
        as={"h2"}
        fontSize={{ base: "xl", sm: "2xl" }}
        textAlign={"center"}
        mb={5}
      >
        New repository
      </Heading>
      <Stack
        direction={{ base: "column", md: "row" }}
        as={"form"}
        spacing={"12px"}
      >
        <FormControl>
          <Select
            placeholder="Select repository"
            onChange={switchRepositoryHandler}
            defaultValue={selectedRepositoryInfo.key}
          >
            {repositoryInfoList.map((
              repository,
            ) => (
              <option
                key={repository.key}
                value={repository.key}
              >
                {repository.key}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl w={{ base: "100%", md: "40%" }}>
          <Button
            colorScheme="teal"
            onClick={() => navigate("/pulls")}
            w="100%"
          >
            OK
          </Button>
        </FormControl>
      </Stack>
    </Container>
  );
};
