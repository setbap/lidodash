export interface IRawETHStakersAndStakedInfo {
  DATE: string;
  NUM_STAKERS: number;
  TOTAL_STAKERS: number;
  ETH_STAKED: number;
  TOTAL_ETH_STAKED: number;
}

export interface IETHStakersAndStakedInfo {
  Day: string;
  "Number of takers": number;
  "Number of Stakers so far": number;
  "ETH Staked": number;
  "Total ETH Staked": number;
}

export interface IRawTotalNumberOfStakersAndStakedInfo {
  TOTAL_UNIQUE_STAKERS: number;
  TOTAL_STAKING: number;
  TOTAL_ETH_STAKED: number;
}
export interface IRawTotalStakingReward {
  DATE: string;
  REWARDS: number;
}

export interface ITotalStakingReward {
  Day: string;
  Reward: number;
}
