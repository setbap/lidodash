import {
  IETHStakersAndStakedInfo,
  IRawETHStakersAndStakedInfo,
  IRawTotalNumberOfStakersAndStakedInfo,
  IRawTotalStakingReward,
  ITotalStakingReward,
} from "lib/types/types/home";
import moment from "moment";

export const getStakersAndStakedInfo = async () => {
  const res = await fetch(
    "https://node-api.flipsidecrypto.com/api/v2/queries/938b8fd0-675b-4423-825d-a0abe8079780/data/latest"
  );
  const lidoStakersAndStakedInfo: IRawETHStakersAndStakedInfo[] =
    await res.json();

  return lidoStakersAndStakedInfo
    .sort((a, b) => (moment(a.DATE).isAfter(moment(b.DATE)) ? 1 : -1))
    .map<IETHStakersAndStakedInfo>((txCount) => ({
      Day: txCount.DATE,
      "Number of takers": txCount.NUM_STAKERS,
      "Number of Stakers so far": txCount.TOTAL_STAKERS,
      "ETH Staked": txCount.ETH_STAKED,
      "Total ETH Staked": txCount.TOTAL_ETH_STAKED,
    }));
};

export const getDailyStakingReward = async () => {
  const res = await fetch(
    "https://node-api.flipsidecrypto.com/api/v2/queries/903eef17-67fc-4258-a4ee-724ebd052a22/data/latest"
  );
  const lidoStakersAndStakedInfo: IRawTotalStakingReward[] = await res.json();

  return lidoStakersAndStakedInfo
    .sort((a, b) => (moment(a.DATE).isAfter(moment(b.DATE)) ? 1 : -1))
    .map<ITotalStakingReward>((txCount) => ({
      Day: txCount.DATE,
      Reward: txCount.REWARDS,
    }));
};

export const getTotalETHAndStakedInfo = async () => {
  const res = await fetch(
    "https://node-api.flipsidecrypto.com/api/v2/queries/88a9e4e4-f291-4dc5-a375-b9e29168fc0d/data/latest"
  );
  const totalETHAndStakedInfo: IRawTotalNumberOfStakersAndStakedInfo = (
    await res.json()
  )[0];
  return totalETHAndStakedInfo;
};
