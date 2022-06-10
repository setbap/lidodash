import { QueryResultSet, Flipside, Query } from "@flipsidecrypto/sdk";
type AcceptableSortTypes = "Count" | "Total USD" | "Total ETH";
const acceptableSortTypesArray = ["Count", "Total USD", "Total ETH"];
const getTopStaked = async (
  acceptableSortTypes: AcceptableSortTypes = "Count",
  page: number = 1
): Promise<QueryResultSet> => {
  const pageSize = 24;
  const flipside = new Flipside(
    `${process.env.FLIPSIDE_KEY}`,
    "https://node-api.flipsidecrypto.com"
  );
  const rawQuery = `
      select eth_from_address,count(*) as "Count",sum(AMOUNT_USD) as "Total USD",sum(AMOUNT) as "Total ETH"
      from ethereum.core.ez_eth_transfers
      where eth_to_address = '0xae7ab96520de3a18e5e111b5eaab095312d7fe84' 
      group by eth_from_address
      having "Total USD"> 0
      order by "${acceptableSortTypes}" desc
      OFFSET ${pageSize * (page - 1)}
      FETCH NEXT ${pageSize} ROWS ONLY;
    `;

  const query: Query = {
    sql: rawQuery,
    ttlMinutes: 15,
    cached: true,
  };

  return await flipside.query.run(query);
};

export default async function addressHandler(req: any, res: any) {
  const { method } = req;
  const page = req.query.page || 1;
  const sortType: AcceptableSortTypes = req.query.sortType || "Count";

  switch (method) {
    case "GET":
      if (acceptableSortTypesArray.includes(sortType) === false) {
        return res.status(400).json({
          error: `Invalid sortType: ${sortType}`,
        });
      }

      if (isNaN(page)) {
        return res.status(400).json({
          error: `Invalid page: ${page}`,
        });
      }

      const data = await getTopStaked(sortType, page);
      res.status(200).json(data);
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
