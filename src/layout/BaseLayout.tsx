import { FC, useEffect } from "react";
import { RepositoryLink } from "../component/RepositoryLink";

export const BaseLayout: FC = (props) => {
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
