import { Box, Center, Flex } from "@chakra-ui/layout";
import { FC } from "react";
import { SortedIcon } from "./SortedIcon";

type Props = {
  column: string;
  isSorted: boolean | undefined;
  isSortedDesc: boolean | undefined;
};

export const SortableHeaderColumn: FC<Props> = (props) => {
  const { column, isSorted, isSortedDesc } = props;
  return (
    <Flex>
      <Box>
        {column}
      </Box>
      <Center>
        {isSorted
          ? (
            <SortedIcon
              isSortedDesc={isSortedDesc as boolean}
            />
          )
          : ""}
      </Center>
    </Flex>
  );
};
