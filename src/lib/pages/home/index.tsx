import {
  Box,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import ChartBox from "lib/components/charts/LineChart";
import { IETHStakersAndStakedInfo } from "lib/types/types/home";

import { NextSeo } from "next-seo";

const colors = ["#ffc107", "#ff5722", "#03a9f4", "#4caf50", "#00bcd4", "#f44336", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#009688", "#607d8b"]

interface Props {
  stakersAndStakedInfo: IETHStakersAndStakedInfo[]
}


const Home = ({
  stakersAndStakedInfo
}: Props) => {
  const bgCard = useColorModeValue("white", "#191919");


  return (
    <>
      <NextSeo
        title='LidoDash | Business Intelligence Dashboard for Lido.Fi'
        description='Track the latest stats and trends on Terra'
        openGraph={{
          url: 'https://LidoDash.vercel.app/ust',
          title: 'LidoDash | Business Intelligence Dashboard for Lido.Fi',
          description: 'Track the latest stats and trends on Terra',
          images: [
            {
              url: 'https://ogLidoDash.vercel.app/ogLidoDash.png',
              width: 1200,
              height: 630,
              alt: 'Overview Terra Information',
              type: 'image/png',
            },
          ],
          site_name: 'LidoDash',
        }}
        twitter={{
          handle: "@flipsidecrypto",
          cardType: "summary_large_image",
        }}
      />
      <Box mx={"auto"} px={{ base: 6, sm: 2, md: 8 }}>
        <SimpleGrid
          my={"6"}
          columns={{ base: 1, md: 2, lg: 2, "2xl": 3 }}
          spacing={{ base: 5, lg: 8 }}
        >


        </SimpleGrid>
        <SimpleGrid
          position={'relative'}
          transition={'all 0.9s ease-in-out'}
          py={"6"}
          zIndex={100}
          columns={{ sm: 1, md: 1, lg: 2, "2xl": 3 }}
          spacing={{ base: 1, md: 2, lg: 4 }}
        >
          <ChartBox data={stakersAndStakedInfo}
            queryLink="https://app.flipsidecrypto.com/velocity/queries/938b8fd0-675b-4423-825d-a0abe8079780"
            showMonthly
            tooltipTitle="Daily ETH staked over time"
            modelInfo="Daily ETH staked over time"
            title="Daily ETH staked over time"
            baseSpan={3}
            areaDataKey="ETH Staked"
            xAxisDataKey="Day" />

          <ChartBox data={stakersAndStakedInfo}
            queryLink="https://app.flipsidecrypto.com/velocity/queries/938b8fd0-675b-4423-825d-a0abe8079780"

            tooltipTitle="Cumulative ETH staked over time"
            modelInfo="Cumulative ETH staked over time"
            title="Cumulative ETH staked over time"
            baseSpan={3}
            areaDataKey="Total ETH Staked"
            xAxisDataKey="Day" />
          <ChartBox data={stakersAndStakedInfo}
            queryLink="https://app.flipsidecrypto.com/velocity/queries/938b8fd0-675b-4423-825d-a0abe8079780"
            showMonthly
            tooltipTitle="Daily number of stakers over time"
            modelInfo="Daily number of stakers over time"
            title="Daily number of stakers over time"
            baseSpan={3}
            areaDataKey="Number of takers"
            xAxisDataKey="Day" />
          <ChartBox data={stakersAndStakedInfo}
            queryLink="https://app.flipsidecrypto.com/velocity/queries/938b8fd0-675b-4423-825d-a0abe8079780"

            tooltipTitle="Cumulative number of stakers over time"
            modelInfo="Cumulative number of stakers over time"
            title="Cumulative number of stakers over time"
            baseSpan={3}
            areaDataKey="Number of Stakers so far"
            xAxisDataKey="Day" />






        </SimpleGrid>
      </Box>
    </>
  );
};

export default Home;
