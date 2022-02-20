import { Heading, Link } from "@chakra-ui/layout";
import { useContext } from "react";
import { GitHubContext } from "./GitHubContextProvider";

export const RepositoryLink = () => {
  const { state } = useContext(GitHubContext);
  const { owner, name } = state.selectedRepositoryInfo;
  return (
    <>
      <Heading as="h2" size="xl">
        <Link
          href={`https://github.com/${owner}`}
          isExternal
        >
          {owner}
        </Link>
        {" / "}
        <Link
          href={`https://github.com/${owner}/${name}`}
          isExternal
        >
          {name}
        </Link>
      </Heading>
    </>
  );
};
