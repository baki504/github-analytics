import { Box, Heading } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSortBy, useTable } from "react-table";
import { stringComparator } from "../utils/utils";
import { GitHubContext } from "./GitHubContextProvider";

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

export const PullRequestSummary = () => {
  const { state } = useContext(GitHubContext);
  const { pulls } = state;
  const [summary, setSummary] = useState<Summary[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    !initialized && setSummary(getPrSummary(pulls));
    setInitialized(true);
  }, [summary, pulls, initialized]);

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
    [summary]
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
    []
  );

  const getSortedIcon = (isSortedDesc?: boolean) =>
    isSortedDesc ? " 🔽" : " 🔼";

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <>
      <Heading as="h2" marginTop="5">
        PR summary
      </Heading>
      <Box marginTop={5}>
        {summary && summary.length ? (
          <Table {...getTableProps()} variant="simple" size="md">
            <Thead>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any) => (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
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
        ) : (
          "No data."
        )}
      </Box>
    </>
  );
};
