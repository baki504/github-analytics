import { Button } from "@chakra-ui/button";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useContext, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSortBy, useTable } from "react-table";
import { GitHubContext } from "./GitHubContextProvider";
import { SortableHeaderColumn } from "./SortableHeaderColumn";

export const PullRequestSummary = () => {
  const navigate = useNavigate();
  const { state } = useContext(GitHubContext);
  const { summary } = state;

  const data = useMemo<Column[]>(
    () =>
      summary.map((e) => ({
        user: e.user,
        totalPrs: e.totalPrs.toString(),
        totalComments: e.totalComments.toString(),
        totalFilesChanged: e.filesChanged.toString(),
        averageComments: e.averageComments.toString(),
        averageFiles: e.averageFiles.toString(),
      })),
    [summary],
  );

  const columns = useMemo(
    () => [
      {
        Header: "Rank",
        accessor: (_row: any, i: number) => i + 1,
        isNumeric: true,
      },
      {
        Header: "User",
        accessor: "user",
      },
      {
        Header: "Total PRs",
        accessor: "totalPrs",
        isNumeric: true,
      },
      {
        Header: "Total Comments",
        accessor: "totalComments",
        isNumeric: true,
      },
      {
        Header: "Total Files Changed",
        accessor: "totalFilesChanged",
        isNumeric: true,
      },
      {
        Header: "Average Comments",
        accessor: "averageComments",
        isNumeric: true,
      },
      {
        Header: "Average Files",
        accessor: "averageFiles",
        isNumeric: true,
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <>
      <Heading marginTop={5} as="h3" size="lg">
        PR summary
      </Heading>
      <Text marginTop={5} color={"gray"}>
        {summary.length} users summary.
      </Text>
      <Box marginY={5}>
        <Link to="/summary">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Link>
      </Box>
      {summary.length > 0 &&
        (
          <Table {...getTableProps()} variant="simple" size="md">
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
              {rows.map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell: any, cellIndex) => (
                      <Td
                        {...cell.getCellProps()}
                        isNumeric={cell.column.isNumeric}
                      >
                        {cellIndex === 0 ? rowIndex + 1 : cell.render("Cell")}
                      </Td>
                    ))}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )}
    </>
  );
};
