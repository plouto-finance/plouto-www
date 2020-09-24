/**
 * @format
 */
import async from "async";
import { Dispatch } from "redux";
import axios from "axios";
import {
  ChainId,
  Token,
  Fetcher,
  Route,
  Trade,
  TokenAmount,
  TradeType,
  WETH as _WETH,
} from "@uniswap/sdk";

const WETH = _WETH[ChainId.MAINNET];

let DAIcache: any;
let WETHPairCache: any;

export function getTokenPrice(tokenAddress: string, decimals: number) {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    const token = new Token(ChainId.MAINNET, tokenAddress, decimals);

    const DAI =
      DAIcache ||
      (await Fetcher.fetchTokenData(
        ChainId.MAINNET,
        "0x6B175474E89094C44Da98b954EedeAC495271d0F"
      ));
    DAIcache = DAI;

    const WETHPair = WETHPairCache || (await Fetcher.fetchPairData(WETH, DAI));

    WETHPairCache = WETHPair;

    setTimeout(() => {
      DAIcache = WETHPairCache = null;
    }, 300 * 1000);

    const TokenETHPair = await Fetcher.fetchPairData(token, WETH);

    const route = new Route([TokenETHPair], WETH);
    const route2 = new Route([WETHPair], WETH);

    return {
      token: tokenAddress,
      price: route.midPrice.invert().toSignificant(6),
      ethprice: route2.midPrice.toSignificant(6),
    };
  };
}

export function getTokenUSDPrice(tokenAddresses: string) {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    const url = "https://api.coingecko.com/api/v3/simple/token_price/ethereum";
    const response = await axios.get(url, {
      params: {
        contract_addresses: tokenAddresses,
        vs_currencies: 'usd'
      }
    });
    const priceJSON = response.data;
    if (priceJSON) {
      return priceJSON
    }
    return {}
  };
}
