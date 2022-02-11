import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Heading, Link as ChakraLink } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useContext, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSortBy, useTable } from "react-table";
import { fetchPulls } from "../utils/dataFetcher";
import { GitHubContext } from "./GitHubContextProvider";
import { chakra } from "@chakra-ui/react";

export const PullRequestTable = () => {
  const { state, dispatch } = useContext(GitHubContext);
  const { pulls } = state;

  const data = useMemo<Column[]>(() =>
    pulls.map((pull) => ({
      number: pull.number,
      title: pull.title,
      user: pull.user,
      state: pull.state,
      createdAt: pull.createdAt,
      comments: pull.comments.length.toString(),
      filesChanged: pull.filesChanged.toString(),
      additions: pull.additions.toString(),
      deletions: pull.deletions.toString(),
      changes: pull.changes.toString(),
      link: pull.link,
    })), [pulls]);

  const columns = useMemo(
    () => [
      {
        Header: "Number",
        accessor: "number",
        Cell: (e: any) => (
          <Link to={`/pulls/${e.value}`}>
            {e.value}
          </Link>
        ),
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "User",
        accessor: "user",
      },
      {
        Header: "State",
        accessor: "state",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
      },
      {
        Header: "Comments",
        accessor: "comments",
        // Cell: (e: any) => (Number(e.value)),
        isNumeric: true,
      },
      {
        Header: "Files Changed",
        accessor: "filesChanged",
      },
      {
        Header: "Additions",
        accessor: "additions",
      },
      {
        Header: "Deletions",
        accessor: "deletions",
      },
      {
        Header: "Changes",
        accessor: "changes",
      },
      {
        Header: "Link",
        accessor: "link",
        Cell: (e: any) => (
          <Box textAlign={"center"}>
            <ChakraLink to={e.value} isExternal>
              <ExternalLinkIcon mx="2px" />
            </ChakraLink>
          </Box>
        ),
      },
    ],
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  useEffect(() => {
    pulls.length === 0 && fetchPulls(dispatch);
  }, [dispatch, pulls]);

  const getSortedIcon = (
    isSortedDesc?: boolean,
  ) => (isSortedDesc ? " 🔽" : " 🔼");

  return (
    <>
      <Heading as="h2" marginTop="5">
        Pull Requests
      </Heading>
      <Box marginTop={5}>
        {pulls && pulls.length
          ? (
            <Table {...getTableProps()} variant="simple" size="md">
              <Thead>
                {headerGroups.map(
                  (headerGroup) => (
                    <Tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((
                        column,
                      ) => (
                        <Th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps(),
                          )}
                          isNumeric={column.isNumeric}
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? getSortedIcon(column.isSortedDesc)
                              : ""}
                          </span>
                        </Th>
                      ))}
                    </Tr>
                  ),
                )}
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <Tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <Td {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </Td>
                      ))}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          )
          : "Fetching data..."}
      </Box>
    </>
  );
};
