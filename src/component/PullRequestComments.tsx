import { Button } from "@chakra-ui/button";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Heading, Link as ChakraLink, Text } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { useContext, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSortBy, useTable } from "react-table";
import { BaseLayout } from "../layout/BaseLayout";
import { CodeBlock } from "./CodeBlock";
import { GitHubContext } from "./GitHubContextProvider";
import { PullRequestLink } from "./PullRequestLink";
import { SortableHeaderColumn } from "./SortableHeaderColumn";

export const PullRequestComments = () => {
  const navigate = useNavigate();
  const { pullId } = useParams();
  const { state } = useContext(GitHubContext);
  const pr = state.selectedRepositoryInfo.pulls.find(
    (pull) => pull.number === pullId,
  );
  const comments = useMemo(() => pr?.comments || [], [pr]);

  const data = useMemo<Column[]>(
    () =>
      comments.map((comment) => ({
        id: comment.id,
        comment: comment.comment,
        user: comment.user,
        createdAt: comment.createdAt,
        link: comment.url,
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
            <ReactMarkdown
              children={e.value}
              components={{ code: CodeBlock }}
            />
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

  return (
    <BaseLayout>
      <Heading marginTop={5} as="h3" size="lg">
        Pull Request Comments{"  "}
        <PullRequestLink id={pullId || ""} link={pr?.url || ""} />
      </Heading>
      <Text marginTop={5} color={"gray"}>
        {comments.length} PR comments found.
      </Text>
      <Box marginY={5}>
        <Button variant="outline" onClick={() => navigate(-1)}>
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
                      {...column.getHeaderProps(column.getSortByToggleProps())}
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
    </BaseLayout>
  );
};
