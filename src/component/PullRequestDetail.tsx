import { Button } from "@chakra-ui/button";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useContext, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSortBy, useTable } from "react-table";
import { GitHubContext } from "./GitHubContextProvider";
import { PullRequestLink } from "./PullRequestLink";
import { SortableHeaderColumn } from "./SortableHeaderColumn";

export const PullRequestDetail = () => {
  const navigate = useNavigate();
  const { pullId } = useParams();
  const { state } = useContext(GitHubContext);
  const pr = state.pulls.find((pull) => pull.number === pullId);
  const comments = useMemo(() => (pr?.comments || []), [pr]);

  const data = useMemo<Column[]>(
    () =>
      comments.map((comment) => ({
        id: comment.id,
        comment: comment.comment,
        user: comment.user,
        createdAt: comment.createdAt,
      })),
    [comments],
  );

  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
        isNumeric: true,
      },
      {
        Header: "Comment",
        accessor: "comment",
        Cell: (e: any) => (
          <div style={{ whiteSpace: "pre-line" }}>
            <ReactMarkdown>{e.value}</ReactMarkdown>
          </div>
        ),
      },
      {
        Header: "User",
        accessor: "user",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <>
      <Heading marginTop={5} as="h3" size="lg">
        Pull Request Comments{"  "}
        <PullRequestLink id={pullId || ""} link={pr?.link || ""} />
      </Heading>
      <Text marginTop={5} color={"gray"}>
        {comments.length} PR comments found.
      </Text>
      <Box marginY={5}>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>
      {comments.length > 0 &&
        (
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
        )}
    </>
  );
};
