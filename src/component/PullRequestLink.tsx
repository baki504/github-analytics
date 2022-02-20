import { Link, Text } from "@chakra-ui/layout";
import { FC } from "react";

type Props = {
  id: string;
  link: string;
};

export const PullRequestLink: FC<Props> = (props) => {
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
