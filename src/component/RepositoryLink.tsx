import { Heading, Link } from "@chakra-ui/layout";
import React, { useContext } from "react";
import { GitHubContext } from "./GitHubContextProvider";

export const RepositoryLink = () => {
  const { state } = useContext(GitHubContext);
  const { repositoryOwner, repositoryName } = state;
  return (
    <>
      <Heading as="h2" size="xl">
        <Link
          href={`https://github.com/${repositoryOwner}`}
          isExternal
        >
          {repositoryOwner}
        </Link>
        {" / "}
        <Link
          href={`https://github.com/${repositoryOwner}/${repositoryName}`}
          isExternal
        >
          {repositoryName}
        </Link>
      </Heading>
    </>
  );
};
