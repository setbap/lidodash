import {
	Box,
	Link,
	Stat,
	StatLabel,
	StatNumber,
	useColorModeValue,
} from "@chakra-ui/react";
import millify from 'millify'
import { useEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";

interface StatsCardProps {
	title: string;
	stat: number;
	status?: 'inc' | 'dec' | 'unchanged';
	link?: string
}
export const StatsCard = (props: StatsCardProps) => {
	const bgCard = useColorModeValue('white', '#191919');
	const { title, stat, status = 'unchanged' } = props;
	const defaultColor = useColorModeValue("gray.600", "gray.400")
	const incColor = useColorModeValue("green.800", "green.300")
	const decColor = useColorModeValue("red.800", "red.500")
	const [statusColor, setStatusColor] = useState<any>();
	useEffect(() => {
		if (status === 'inc' && statusColor !== incColor) {
			setStatusColor(incColor)
		}
		if (status === 'dec' && statusColor !== decColor) {
			setStatusColor(decColor)
		}

		if (status === 'unchanged' && statusColor !== defaultColor) {
			setStatusColor(defaultColor)
		}
	}, [])

	return (
		<Stat
			px={{ base: 4, md: 8 }}
			zIndex={0}
			pt="5"
			pb={'4'}
			shadow="base"
			transition={'box-shadow 0.4s'}
			_hover={{ boxShadow: 'var(--chakra-shadows-xl)' }}
			backgroundColor={bgCard}
			border="1px solid"
			borderColor={statusColor}
			rounded="lg"
		>
			{props.link === undefined ? <StatLabel fontWeight="medium" isTruncated>
				{title}
			</StatLabel> : <Link href={props.link} isExternal><StatLabel fontWeight="medium" display={'inline-flex'} isTruncated >
				{title} <Box ps={'1'}><FiExternalLink /></Box>
			</StatLabel>
			</Link>}
			<StatNumber pt={'1'} color={statusColor} fontSize="4xl" fontWeight="extrabold">
				{millify(stat, {
					precision: 2,
					decimalSeparator: "."
				})}
			</StatNumber>
		</Stat >
	);
}


