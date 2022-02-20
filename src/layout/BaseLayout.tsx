import React, { useEffect } from "react";
import { RepositoryLink } from "../component/RepositoryLink";

export const BaseLayout: React.FC = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <RepositoryLink />
      {props.children}
    </>
  );
};
