import { Link, Text } from "@chakra-ui/layout";
import React from "react";

type Props = {
  id: string;
  link: string;
};

export const PullRequestLink: React.FC<Props> = (props) => {
  return (
    <>
      <Link href={props.link} isExternal>
        <Text as="span" style={{ color: "gray" }}>
          #{props.id}
        </Text>
      </Link>
    </>
  );
};
