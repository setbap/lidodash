import {
  IETHStakersAndStakedInfo,
  IRawETHStakersAndStakedInfo,
  IRawTotalNumberOfStakersAndStakedInfo,
  IRawTotalStakingReward,
  IStEthEthSwapVolume,
  IstEthOnDiffrentPool,
  IStEthPrice,
  IStEthToETHSwapVolume,
  IStEthVsEthPriceDiff,
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

export const getStEthPrice = async () => {
  const res = await fetch(
    "https://node-api.flipsidecrypto.com/api/v2/queries/ab2f7d70-1375-44cc-9877-3d65644b032c/data/latest"
  );
  const stEthPrice: IStEthPrice[] = await res.json();
  return stEthPrice;
};

export const getStEthVsEthPriceDiff = async () => {
  const res = await fetch(
    "https://node-api.flipsidecrypto.com/api/v2/queries/eb91d563-1728-48d3-9183-fbadf7173766/data/latest"
  );
  const stEthVsEthPriceDiff: IStEthVsEthPriceDiff[] = await res.json();
  return stEthVsEthPriceDiff;
};

export const getStEthEthSwapVolume: () => Promise<
  IStEthEthSwapVolume[]
> = async () => {
  const res = await fetch(
    "https://node-api.flipsidecrypto.com/api/v2/queries/8b24bf96-7758-4b64-a79d-2b3de5974fcb/data/latest"
  );
  const fetchedData: IStEthEthSwapVolume[] = await res.json();
  return fetchedData;
};

export const getStEthToETHSwapVolume: () => Promise<any> = async () => {
  const res = await fetch(
    "https://node-api.flipsidecrypto.com/api/v2/queries/430ee876-119d-4175-998d-a6ac5d92ff38/data/latest"
  );
  const fetchedData: IStEthToETHSwapVolume[] = await res.json();
  const tokenNames = Array.from(
    new Set(
      fetchedData.map((item) => {
        return item["PLATFORM"];
      })
    )
  );
  const dailyTVLUSD = calculateDailyBridgeValue(
    "MM/DD/YYYY",
    fetchedData,
    "Day",
    "PLATFORM",
    "Volume",
    tokenNames,
    0
  );

  return {
    dailyTVLUSD,
    tokenNames,
    dailyTxCount: fetchedData.map((data) => ({
      Day: data.Day,
      "Tx Count": data["TX Count"],
    })),
  };
};

export const getStEthOnDiffrentPool: () => Promise<any> = async () => {
  const res = await fetch(
    "https://node-api.flipsidecrypto.com/api/v2/queries/f025beb0-6d71-4eab-9ad2-8569dfc4727f/data/latest"
  );
  const fetchedData: IstEthOnDiffrentPool[] = await res.json();
  const tokenNames = Array.from(
    new Set(
      fetchedData.map((item) => {
        return item["Pool Name"];
      })
    )
  );
  const dailyTVLUSD = calculateDailyBridgeValue(
    "MM/DD/YYYY",
    fetchedData,
    "Day",
    "Pool Name",
    "Balance",
    tokenNames,
    0
  );

  return {
    dailyTVLUSD,
    tokenNames,
  };
};

function calculateDailyBridgeValue(
  dateFormat: string,
  USTBridgeValue: any[],
  dateKey: string,
  nameKey: string,
  valueKey: string,
  bridges: string[],
  minValue: number = 0
) {
  const dailyEachBridgeSum: { [key: string]: { [key: string]: number } } = {};
  USTBridgeValue.forEach((item) => {
    const date = moment(item[dateKey]).format(dateFormat);
    if (!Boolean(item[valueKey]) || item[valueKey] < minValue) {
    } else if (dailyEachBridgeSum[date] === undefined) {
      dailyEachBridgeSum[date] = {};
      dailyEachBridgeSum[date][item[nameKey]] = item[valueKey];
    } else if (dailyEachBridgeSum[date][item[nameKey]] === undefined) {
      dailyEachBridgeSum[date][item[nameKey]] = item[valueKey];
    } else {
      dailyEachBridgeSum[date][item[nameKey]] += item[valueKey];
    }
  });
  const dailyBridgeValue = Object.entries(dailyEachBridgeSum)
    .map((bc) => {
      const finalObject = { date: bc[0] };
      bridges.forEach((bridge) => {
        if (bc[1][bridge]) {
          // @ts-ignore
          finalObject[bridge] = bc[1][bridge];
        }
      });
      return finalObject;
    })
    .sort((a, b) => {
      return moment(a.date).isAfter(moment(b.date)) ? 1 : -1;
    });
  return dailyBridgeValue;
}
