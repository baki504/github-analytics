import { Button } from "@chakra-ui/button";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Heading, Link as ChakraLink, Text } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useContext, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSortBy, useTable } from "react-table";
import { updatePrSummary } from "../utils/action";
import { fetchPulls } from "../utils/dataFetcher";
import { stringComparator } from "../utils/utils";
import { GitHubContext } from "./GitHubContextProvider";
import { SortableHeaderColumn } from "./SortableHeaderColumn";

const getPrSummary = (pulls: PullRequest[]): Summary[] =>
  pulls
    .reduce((summaryRecords: Summary[], pull: PullRequest) => {
      const pr = summaryRecords.find((element) => element.user === pull.user);
      if (pr) {
        pr.totalPrs++;
        pr.totalComments = pr.totalComments + pull.comments.length;
        pr.filesChanged = pr.filesChanged + pull.filesChanged;
        pr.averageComments = pr.totalComments / pr.totalPrs;
        pr.averageFiles = pr.filesChanged / pr.totalPrs;
        return summaryRecords;
      }
      return [
        ...summaryRecords,
        {
          user: pull.user,
          totalPrs: 1,
          totalComments: pull.comments.length,
          filesChanged: pull.filesChanged,
          averageComments: pull.comments.length,
          averageFiles: pull.filesChanged,
        },
      ];
    }, [])
    .sort((a, b) => stringComparator(a.user, b.user));

export const PullRequestTable = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(GitHubContext);
  const { pulls, repositoryOwner, repositoryName } = state;

  const data = useMemo<Column[]>(
    () =>
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
      })),
    [pulls],
  );

  const columns = useMemo(
    () => [
      {
        Header: "Number",
        accessor: "number",
        Cell: (e: any) => <Link to={`/pulls/${e.value}`}>{e.value}</Link>,
        isNumeric: true,
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
        isNumeric: true,
      },
      {
        Header: "Files Changed",
        accessor: "filesChanged",
        isNumeric: true,
      },
      {
        Header: "Additions",
        accessor: "additions",
        isNumeric: true,
      },
      {
        Header: "Deletions",
        accessor: "deletions",
        isNumeric: true,
      },
      {
        Header: "Changes",
        accessor: "changes",
        isNumeric: true,
      },
      {
        Header: "Link",
        accessor: "link",
        Cell: (e: any) => (
          <Box textAlign={"center"}>
            <ChakraLink href={e.value} isExternal>
              <ExternalLinkIcon mx="2px" />
            </ChakraLink>
          </Box>
        ),
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  useEffect(() => {
    pulls.length === 0 && fetchPulls(dispatch);
    updatePrSummary(dispatch, getPrSummary(pulls));
  }, [dispatch, pulls]);

  return (
    <>
      <Heading marginTop={5} as="h3" size="lg">
        <ChakraLink
          href={`https://github.com/${repositoryOwner}/${repositoryName}/pulls`}
          isExternal
        >
          Pull Requests
        </ChakraLink>
      </Heading>
      <Text marginTop={5} color={"gray"}>
        {pulls.length} PRs found.
      </Text>
      <Box marginY={5}>
        <Button
          colorScheme="teal"
          onClick={() => navigate("/summary")}
          disabled={pulls.length === 0}
        >
          View summary
        </Button>
      </Box>
      {pulls.length
        ? (
          <>
            <Table {...getTableProps()} variant="simple" size="sm">
              <Thead>
                {headerGroups.map((
                  headerGroup,
                ) => (
                  <Tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column: any) => (
                      <Th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps(),
                        )}
                        isNumeric={column.isNumeric}
                      >
                        <SortableHeaderColumn
                          column={column.render("Header")}
                          isSorted={column.isSorted}
                          isSortedDesc={column.isSortedDesc}
                        />
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <Tr {...row.getRowProps()}>
                      {row.cells.map((cell: any) => (
                        <Td
                          {...cell.getCellProps()}
                          isNumeric={cell.column.isNumeric}
                        >
                          {cell.render("Cell")}
                        </Td>
                      ))}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </>
        )
        : (
          <Text marginTop={5} color={"gray"}>
            Fetching data...
          </Text>
        )}
    </>
  );
};
