import { Button } from "@chakra-ui/button";
import { Heading, Text } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useContext, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSortBy, useTable } from "react-table";
import { GitHubContext } from "./GitHubContextProvider";

export const PullRequestDetail = () => {
  const navigate = useNavigate();
  const { pullId } = useParams();
  const { state } = useContext(GitHubContext);
  const comments =
    state.pulls.find((pull) => pull.number === pullId)?.comments || [];

  const data = useMemo<Column[]>(
    () =>
      comments.map((comment) => ({
        id: comment.id,
        comment: comment.comment,
        user: comment.user,
        createdAt: comment.createdAt,
      })),
    [],
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

  const getSortedIcon = (isSortedDesc?: boolean) => isSortedDesc ? " 🔽" : " 🔼";

  return (
    <>
      <Heading marginTop={5} as="h3" size="lg">
        Pull Request Comments <span style={{ color: "gray" }}>#{pullId}</span>
      </Heading>
      {comments && comments.length
        ? (
          <>
            <Text marginY={5} color={"gray"}>
              {comments.length} PR comments found.
            </Text>
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
            This PR has no comments.
          </Text>
        )}
      <Button marginTop={5} variant="outline" onClick={() => navigate(-1)}>
        Back
      </Button>
    </>
  );
};
