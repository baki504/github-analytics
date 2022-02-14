import { IconButton } from "@chakra-ui/button";
import { SettingsIcon } from "@chakra-ui/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

export const SettingsIconLink: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={() => navigate(`/`)}
      icon={<SettingsIcon />}
      aria-label={`Move to settings page`}
      {...props}
    />
  );
};
