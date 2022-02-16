import { IconButton } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GitHubContext } from "./GitHubContextProvider";

type Props = {};

export const AddIconLink: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { state } = useContext(GitHubContext);
  const { isLoading } = state;

  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={() => navigate(`/`)}
      disabled={isLoading}
      icon={<AddIcon />}
      aria-label={`Move to settings page`}
      {...props}
    />
  );
};
