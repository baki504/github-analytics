import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";

type Props = {
  isSortedDesc?: boolean;
};

export const SortedIcon: React.FC<Props> = (
  props,
) => (
  <Box as="span" marginLeft={1}>
    {props.isSortedDesc ? <ChevronDownIcon /> : <ChevronUpIcon />}
  </Box>
);
