import {
  Avatar,
  Badge,
  Box,
  Flex,
  IconButton,
  Stack,
  Text,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { FaEthereum } from "react-icons/fa";
import { BiDollarCircle } from "react-icons/bi";
import { ReactNode, useEffect } from "react";
import { AiOutlineCopy, AiOutlineWallet } from "react-icons/ai";
import millify from "millify";
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
  const { hasCopied, onCopy } = useClipboard(eth_from_address);
  const toast = useToast();

  useEffect(() => {
    if (hasCopied) {
      toast({
        title: "Copied",
        description: "Address copied to clipboard.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [hasCopied]);

  return (
    <Flex rounded={"md"} p={["3"]} bg="#232323" gap={"2"} boxShadow={"base"}>
      <Stack position={"relative"} direction={"column"}>
        <Avatar
          zIndex={1}
          icon={<AiOutlineWallet style={{ padding: "4px" }} size={"2em"} />}
        />
        <Badge
          position={"absolute"}
          bottom="0"
          zIndex={100}
          rounded={"md"}
          textColor="#232323"
          bg="green.200"
        >
          {count} tx
        </Badge>
      </Stack>

      <Stack direction={"column"} gap={"1"} ml="3">
        <Box display={"flex"} fontWeight="bold">
          <Box maxWidth="220px">
            <Text noOfLines={1} textOverflow="ellipsis">
              {eth_from_address}
            </Text>
          </Box>
          <IconButton
            size="xs"
            p="0"
            m="0"
            variant="outline"
            aria-label="Copy Ethereum Address"
            onClick={onCopy}
            icon={<AiOutlineCopy />}
          />
        </Box>

        <Stack justifyContent={"space-between"} direction={"row"}>
          <TxItem
            Icon={<FaEthereum color="#716b94" fontSize={"1rem"} />}
            data={millify(totalEth, {
              precision: 2,
              decimalSeparator: ".",
            })}
          />
          <TxItem
            Icon={<BiDollarCircle color="#85bb65" fontSize={"1rem"} />}
            data={millify(totalUsd, {
              precision: 2,
              decimalSeparator: ".",
            })}
          />
        </Stack>
      </Stack>
    </Flex>
  );
};

const TxItem = ({ Icon, data }: { Icon: ReactNode; data: string }) => {
  return (
    <Stack
      flex={1}
      alignItems={"center"}
      justifyContent={"start"}
      direction={"row"}
    >
      <Box w="3">{Icon}</Box>
      <Text fontSize={"large"}>{data}</Text>
    </Stack>
  );
};
