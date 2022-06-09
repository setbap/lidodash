import { Box, Link, Stack, Text } from "@chakra-ui/react";
import { BsClock, BsHash } from "react-icons/bs";
import moment from "moment";
import { FaEthereum } from "react-icons/fa";
import { BiDollarCircle } from "react-icons/bi";
import { ReactNode } from "react";

export interface Prop {
  data: {
    eth_from_address: string;
    count: number;
    "total usd": number;
    "total eth": number;
  };
}

export const LidoStakerBox = ({
  data: {
    "total eth": totalEth,
    "total usd": totalUsd,
    count,
    eth_from_address,
  },
}: Prop) => {
  const etherScanLink = `https://etherscan.io/address/${eth_from_address}`;
  return (
    <Stack
      spacing={["2", "6"]}
      direction={"column"}
      p={["3", "8"]}
      borderWidth="2px"
      borderColor="green.200"
      rounded={"md"}
      bg="#232323"
      boxShadow={"base"}
    >
      <Link
        href={etherScanLink}
        target="_blank"
        noOfLines={1}
        textOverflow={"ellipsis"}
        fontSize={"2xl"}
        color={"blue.300"}
      >
        {"#" + eth_from_address}
      </Link>
      <Stack
        justifyContent={"space-between"}
        direction={["column", "column", "column", "row"]}
      >
        <TxItem
          Icon={<BsClock color="#f5a334" fontSize={"1.25rem"} />}
          data={count.toString()}
        />
        <TxItem
          Icon={<FaEthereum color="#716b94" fontSize={"1.25rem"} />}
          data={totalEth.toString()}
        />
        <TxItem
          Icon={<BiDollarCircle color="#85bb65" fontSize={"1.25rem"} />}
          data={totalUsd.toString()}
        />
      </Stack>
    </Stack>
  );
};

const TxItem = ({ Icon, data }: { Icon: ReactNode; data: string }) => {
  return (
    <Stack
      flex={1}
      alignItems={"center"}
      justifyContent={{ md: "start", lg: "center" }}
      direction={"row"}
    >
      <Box w="6">{Icon}</Box>
      <Text fontSize={["large", "larger"]}>{data}</Text>
    </Stack>
  );
};
