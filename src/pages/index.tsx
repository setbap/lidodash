import Home from "lib/pages/home";
import {
  getDailyStakingReward,
  getStakersAndStakedInfo,
  getTotalETHAndStakedInfo,
} from "lib/requests/home";
export async function getStaticProps() {
  const [stakersAndStakedInfo, dailyStakingReward, totalETHAndStakedInfo] =
    await Promise.all([
      getStakersAndStakedInfo(),
      getDailyStakingReward(),

      getTotalETHAndStakedInfo(),
    ]);
  return {
    props: {
      stakersAndStakedInfo,
      dailyStakingReward,
      totalETHAndStakedInfo,
    },
    revalidate: 10 * 60,
  };
}
export default Home;
