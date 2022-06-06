import {
  Box,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import ChartBox from "lib/components/charts/LineChart";
import { StatsCard } from "lib/components/charts/StateCard";
import { StateCardRemoteData } from "lib/components/charts/StateCardRemoteData";
import { IETHStakersAndStakedInfo, IRawTotalNumberOfStakersAndStakedInfo } from "lib/types/types/home";

import { NextSeo } from "next-seo";

const colors = ["#ffc107", "#ff5722", "#03a9f4", "#4caf50", "#00bcd4", "#f44336", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#009688", "#607d8b"]

interface Props {
  stakersAndStakedInfo: IETHStakersAndStakedInfo[],
  totalETHAndStakedInfo: IRawTotalNumberOfStakersAndStakedInfo
}


const Home = ({
  stakersAndStakedInfo,
  totalETHAndStakedInfo
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
          <StateCardRemoteData
            url="https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
            link="https://www.coingecko.com/en/coins/ethereum"
            status="unchanged"
            title={"Current Ethereum Price (USD)"}
            getStat={(data) => data.ethereum.usd}
          />
          <StateCardRemoteData
            url="https://api.coingecko.com/api/v3/simple/price?ids=staked-ether&vs_currencies=usd"
            link="https://www.coingecko.com/en/coins/lido-staked-ether"
            status="unchanged"
            title={"Current stETH Price (USD)"}
            getStat={(data) => data["staked-ether"].usd}
          />
          <StateCardRemoteData
            url="https://api.coingecko.com/api/v3/simple/price?ids=lido-dao&vs_currencies=usd"
            link="https://www.coingecko.com/en/coins/lido-dao"
            status="unchanged"
            title={"Current Lido DAO (LDO) Price (USD)"}
            getStat={(data) => data['lido-dao'].usd}
          />
          <StatsCard
            link="https://app.flipsidecrypto.com/velocity/queries/88a9e4e4-f291-4dc5-a375-b9e29168fc0d"
            status="inc"
            title={"ETH staked with Lido"}
            stat={totalETHAndStakedInfo['TOTAL_ETH_STAKED']}
          />
          <StatsCard
            link="https://app.flipsidecrypto.com/velocity/queries/88a9e4e4-f291-4dc5-a375-b9e29168fc0d"
            status="inc"
            title={"# Unique Staking Wallets"}
            stat={totalETHAndStakedInfo['TOTAL_UNIQUE_STAKERS']}
          />

          <StatsCard
            link="https://app.flipsidecrypto.com/velocity/queries/88a9e4e4-f291-4dc5-a375-b9e29168fc0d"
            status="inc"
            title={"# Staking TX"}
            stat={totalETHAndStakedInfo['TOTAL_STAKING']}
          />




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
