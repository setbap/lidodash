import { QueryResultSet, Flipside, Query } from "@flipsidecrypto/sdk";

const getData = async (
  address: string = "0x7c36eb1ef5b94fadbd38fc35df4f3e25f724e43c"
): Promise<QueryResultSet> => {
  const flipside = new Flipside(
    `${process.env.FLIPSIDE_KEY}`,
    "https://node-api.flipsidecrypto.com"
  );
  const rawQuery = `
    select tx_hash,  block_timestamp,amount,AMOUNT_USD
    from ethereum.core.ez_eth_transfers
    where eth_to_address = '0xae7ab96520de3a18e5e111b5eaab095312d7fe84' and eth_from_address = '${address.toLowerCase()}'
    order by block_timestamp desc
    `;

  const query: Query = {
    sql: rawQuery,
    ttlMinutes: 10,
  };

  return await flipside.query.run(query);
};

export default async function addressHandler(req: any, res: any) {
  const {
    query: { address },
    method,
  } = req;

  switch (method) {
    case "GET":
      const data = await getData(address);
      res.status(200).json(data);
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
