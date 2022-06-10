import Home from "lib/pages/home";
import {
  getDailyStakingReward,
  getStakersAndStakedInfo,
  getStEthEthSwapVolume,
  getStEthOnDiffrentPool,
  getStEthPrice,
  getStEthToETHSwapVolume,
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
    stEthToETHSwapVolume,

    totalETHAndStakedInfo,
  ] = await Promise.all([
    getStakersAndStakedInfo(),
    getDailyStakingReward(),
    getStEthOnDiffrentPool(),
    getStEthPrice(),
    getStEthVsEthPriceDiff(),
    getStEthEthSwapVolume(),
    getStEthToETHSwapVolume(),

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
      stEthToETHSwapVolume,

      totalETHAndStakedInfo,
    },
    revalidate: 10 * 60,
  };
}
export default Home;
