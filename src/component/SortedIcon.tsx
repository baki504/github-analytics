import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import { FC } from "react";

type Props = {
  isSortedDesc?: boolean;
};

export const SortedIcon: FC<Props> = (
  props,
) => (
  <Box as="span" marginLeft={1}>
    {props.isSortedDesc ? <ChevronDownIcon /> : <ChevronUpIcon />}
  </Box>
);
