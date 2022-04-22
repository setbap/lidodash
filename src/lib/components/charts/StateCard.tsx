import {
	Box,
	IconButton,
	Link,
	Stat,
	StatLabel,
	StatNumber,
	Tooltip,
	useColorModeValue,
} from "@chakra-ui/react";
import millify from "millify";
import { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import Renderer from "chakra-ui-markdown-renderer";

interface StatsCardProps {
	title: string;
	stat: number;
	status?: "inc" | "dec" | "unchanged";
	link?: string;
	comment?: string;
	unit?: string
}
export const StatsCard = (props: StatsCardProps) => {
	const bgCard = useColorModeValue("white", "#191919");
	const { title, stat, status = "unchanged" } = props;
	const defaultColor = useColorModeValue("gray.600", "gray.400");
	const incColor = useColorModeValue("green.800", "green.300");
	const decColor = useColorModeValue("red.800", "red.500");
	const [statusColor, setStatusColor] = useState<any>();
	useEffect(() => {
		if (status === "inc" && statusColor !== incColor) {
			setStatusColor(incColor);
		}
		if (status === "dec" && statusColor !== decColor) {
			setStatusColor(decColor);
		}

		if (status === "unchanged" && statusColor !== defaultColor) {
			setStatusColor(defaultColor);
		}
	}, []);

	const tooltip = props.comment && (
		<Tooltip
			rounded={"lg"}
			px="2"
			pt={"2"}
			bg="#100e"
			boxShadow={"xl"}
			color={"white"}
			aria-label='a tooltip that add extra information like attribution for api'
			hasArrow
			label={
				<ReactMarkdown components={Renderer()}>{props.comment}</ReactMarkdown>
			}
		>
			<IconButton
				size={"xs"}
				variant="link"
				_focus={{ outline: 'none' }}
				pt={"-1"}
				px={"3"}
				icon={<AiOutlineInfoCircle />}
				aria-label={""}
			/>
		</Tooltip>
	);

	return (
		<Stat
			px={{ base: 4, md: 8 }}
			zIndex={0}
			pt="5"
			pb={"4"}
			shadow="base"
			transition={"box-shadow 0.4s"}
			_hover={{ boxShadow: "var(--chakra-shadows-xl)" }}
			backgroundColor={bgCard}
			border="1px solid"
			borderColor={statusColor}
			rounded="lg"
		>
			{props.link === undefined ? (
				<StatLabel fontWeight="medium" isTruncated display={"inline-flex"}>
					{title} {tooltip}
				</StatLabel>
			) : (
				<Link href={props.link} isExternal>
					<StatLabel fontWeight="medium" display={"inline-flex"} isTruncated>
						{title}{" "}
						<Box px={"1"}>
							<FiExternalLink />
						</Box>
						{tooltip}
					</StatLabel>
				</Link>
			)}

			<StatNumber
				pt={"1"}
				color={statusColor}
				fontSize="4xl"
				fontWeight="extrabold"
			>
				<Box display={'inline-flex'}>
					{millify(stat, {
						precision: 2,
						decimalSeparator: ".",
					})}
					<Box fontSize={'2xl'} fontWeight={'bold'}>	{props.unit ?? ''}</Box>
				</Box>
			</StatNumber>
		</Stat>
	);
};
