import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Heading,
  Link,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { ReactNode, useEffect } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useInView } from "react-intersection-observer";
import { LidoStakerBox } from "lib/components/basic/LidoStakerBox";

function TopStaker() {
  const { ref, inView } = useInView();
  const [sortType, setSortType] = React.useState("Count");
  const queryClient = useQueryClient();
  var qKey = ["top_stakers", sortType];

  const reload = () => {
    queryClient.invalidateQueries(qKey);
  };
  const {
    data,
    isError,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(
    qKey,
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
        if (lastPage?.length === 24) {
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
  const isLoading = isFetching || isFetchingNextPage;
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
      <Center bg={"black"} zIndex={101} p="4" position={"sticky"} top="0">
        <ButtonGroup size="sm" gap="1">
          <Button disabled={true} variant="unstyled" color={"white"}>
            Sort By:
          </Button>
          {["Count", "Total ETH", "Total USD"].map((type) => (
            <Button
              textColor={"white"}
              onClick={() => {
                reload();
                setSortType(type);
                refetch();
              }}
              colorScheme={sortType === type ? "green" : "blackAlpha"}
            >
              {type}
            </Button>
          ))}
        </ButtonGroup>
      </Center>
      <Box pb={"8"}>
        <Container mt={["4", "8"]} maxW={"container.xl"}>
          {data?.pages.map((stakers, i) => (
            <SimpleGrid minChildWidth="320px" mt={"24px"} spacing="24px">
              {stakers?.map((staker) => (
                <LidoStakerBox key={staker.eth_from_address} data={staker} />
              ))}
            </SimpleGrid>
          ))}

          {hasNextPage && <div ref={ref} />}
          {isLoading && (
            <Box py={"8"}>
              <TxItemContainer>
                <Spinner size="xl" thickness="0.5rem" />
                <Text textAlign={"center"} fontSize={["xl", "3xl"]}>
                  Loading To Geting Data From FlipSide Crypto...
                </Text>
              </TxItemContainer>
            </Box>
          )}
          {isError && (
            <Box py={"8"}>
              <TxItemContainer>
                <Text textAlign={"center"} fontSize={["xl", "3xl"]}>
                  Error Occured While Getting Data From FlipSide Crypto...
                </Text>
                <Text textAlign={"center"} fontSize={"sm"}>
                  Please Reload Page or Try Again Later
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
