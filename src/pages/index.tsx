import Home from "lib/pages/home";
import {
  getDailyStakingReward,
  getStakersAndStakedInfo,
  getStEthEthSwapVolume,
  getStEthOnDiffrentPool,
  getStEthPrice,
  getStEthVsEthPriceDiff,
  getTotalETHAndStakedInfo,
} from "lib/requests/home";
export async function getStaticProps() {
  const [
    stakersAndStakedInfo,
    dailyStakingReward,
    stEthOnDiffrentPool,
    stEthPrice,
    stEthVsEthPriceDiff,
    stEthEthSwapVolume,

    totalETHAndStakedInfo,
  ] = await Promise.all([
    getStakersAndStakedInfo(),
    getDailyStakingReward(),
    getStEthOnDiffrentPool(),
    getStEthPrice(),
    getStEthVsEthPriceDiff(),
    getStEthEthSwapVolume(),

    getTotalETHAndStakedInfo(),
  ]);
  return {
    props: {
      stakersAndStakedInfo,
      dailyStakingReward,
      stEthOnDiffrentPool,
      stEthPrice,
      stEthVsEthPriceDiff,
      stEthEthSwapVolume,

      totalETHAndStakedInfo,
    },
    revalidate: 10 * 60,
  };
}
export default Home;
