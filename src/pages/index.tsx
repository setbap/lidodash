import Home from "lib/pages/home";
import {
  getDailyStakingReward,
  getStakersAndStakedInfo,
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

    totalETHAndStakedInfo,
  ] = await Promise.all([
    getStakersAndStakedInfo(),
    getDailyStakingReward(),
    getStEthOnDiffrentPool(),
    getStEthPrice(),
    getStEthVsEthPriceDiff(),

    getTotalETHAndStakedInfo(),
  ]);
  return {
    props: {
      stakersAndStakedInfo,
      dailyStakingReward,
      stEthOnDiffrentPool,
      stEthPrice,
      stEthVsEthPriceDiff,

      totalETHAndStakedInfo,
    },
    revalidate: 10 * 60,
  };
}
export default Home;
