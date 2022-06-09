import {
  Box,
  Button,
  Container,
  Heading,
  IconButton,
  Input,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { ReactNode, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { QueryResultSet, QueryStatusFinished } from "@flipsidecrypto/sdk";
import { useInfiniteQuery, useMutation } from "react-query";
import { LidoStakeTxBox } from "lib/components/basic/LidoTxBox";
import { validateInputAddresses } from "lib/utility/ethAddressChecker";
import { useInView } from "react-intersection-observer";
import { LidoStakerBox } from "lib/components/basic/LidoStakerBox";

function TopStaker() {
  const { ref, inView } = useInView();
  const [sortType, setSortType] = React.useState("Count");

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
  } = useInfiniteQuery(
    "top_stakers",
    async ({ pageParam = 1 }) => {
      const fetchedData = await fetch(
        `/api/top_stakers?page=${pageParam}&sortType=${sortType}`
      );
      const data = await fetchedData.json();
      return data.records as {
        eth_from_address: string;
        count: number;
        "total usd": number;
        "total eth": number;
      }[];
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.length === 12) {
          return pages.length + 1;
        }
        return undefined;
      },
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <Box>
      <Container
        display={"flex"}
        justifyContent="center"
        mt={["4", "8"]}
        maxW={"container.xl"}
      >
        <Heading>Most Active Lido Stakers</Heading>
      </Container>
      <Box
        opacity={0.4}
        userSelect="none"
        textAlign={"center"}
        fontSize="small"
        my={"2px"}
      >
        All Data Come From{" "}
        <Link textDecor={"underline"} href="https://flipsidecrypto.xyz/">
          FlipSide Crypto
        </Link>{" "}
        With Help of{" "}
        <Link
          textDecor={"underline"}
          href="https://github.com/FlipsideCrypto/sdk/blob/main/js/README.md"
        >
          FlipSide SDK
        </Link>
      </Box>

      <Box>
        <Container mt={["4", "8"]} maxW={"container.xl"}>
          {data?.pages.map((stakers, i) => (
            <React.Fragment key={i}>
              {stakers?.map((staker) => (
                <Box pb={"6"}>
                  <LidoStakerBox key={staker.eth_from_address} data={staker} />
                </Box>
              ))}
            </React.Fragment>
          ))}

          {hasNextPage && <div ref={ref} />}
          {(isFetching || isFetchingNextPage) && (
            <Box py={"8"}>
              <TxItemContainer>
                <Spinner size="xl" thickness="0.5rem" />
                <Text textAlign={"center"} fontSize={["xl", "3xl"]}>
                  Loading To Geting Data From FlipSide Crypto...
                </Text>
              </TxItemContainer>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default TopStaker;
const TxItemContainer = ({ children }: { children: ReactNode }) => (
  <Stack
    spacing={["4", "6"]}
    direction={"column"}
    p={["5", "8"]}
    borderWidth="2px"
    borderColor="green.200"
    rounded={"md"}
    bg="#232323"
    boxShadow={"base"}
    alignItems="center"
  >
    {children}
  </Stack>
);
