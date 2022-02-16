import React from "react";
import { RepositoryLink } from "../component/RepositoryLink";

export const BaseLayout: React.FC = (props) => {
  return (
    <>
      <RepositoryLink />
      {props.children}
    </>
  );
};
