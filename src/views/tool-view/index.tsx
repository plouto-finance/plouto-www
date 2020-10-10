import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useI18n } from "src/i18n";
import {
  Container,
  Box,
  useTheme,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import colors from "src/theme/colors";
import { getTokenPrice, getTokenUSDPrice } from "src/actions/tools";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getVaultBalances } from "src/actions/vault";
import { useWeb3React } from "@web3-react/core";
import { RootState } from "src/reducers";
import { iteratorSymbol } from "immer/dist/internal";
import { getRewardBalances } from "src/actions/reward";

const useStyles = makeStyles((theme) => ({
  tool: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "flex-start",
    minWidth: "100%",
    marginTop: "40px",
    [theme.breakpoints.up("md")]: {
      minWidth: "900px",
    },
    "& h3": {
      marginBottom: 50,
      fontSize: 16,
      fontFamily: "PingFangSC-Regular, PingFang SC",
      fontWeight: 400,
      color: "#666666",
      lineHeight: "50px",
      "& span": {
        display: "inline-block",
        verticalAlign: "middle",
      },
      "&>span:last-child": {
        marginLeft: 12,
        fontSize: 36,
        fontFamily: "PingFangSC-Semibold, PingFang SC",
        fontWeight: 600,
        color: "#9082C3",
        lineHeight: "50px",
        background: "linear-gradient(110deg, #493889 0%, #CE380C 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },
    },
  },
  list: {
    marginTop: 42,
    "& .MuiTableCell-root": {
      border: `1px solid ${colors.borderGray}`,
      padding: 14,
      fontFamily: "PingFangSC-Regular, PingFang SC",
      fontWeight: 400,
      color: "#333333",
    },
    "& .MuiTableCell-head": {
      color: "#666",
    },
    "& .MuiTableRow-head th": {
      fontWeight: "bold",
    },
  },
  red: {
    color: "#C86B63",
  },
}));

const moneyFormat = (num: string | number) => {
  return Number(num)
    .toFixed(4)
    .replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
};

const blacklist = ['ETH/WBTC LP'];
const fixedPrice:any = {
  'ETH/DAI LP': 43.958,
  'ETH/USDC LP': 46357066.169,
  'ETH/USDT LP': 46330982.88444,
  'HBC': 2.8
}

export default function ToolView() {
  const classes = useStyles();
  const i18n = useI18n();
  const theme = useTheme();
  const dispatch: ThunkDispatch<any, null, Action<string>> = useDispatch();
  const [sort, setSort] = React.useState("totalSum");
  const web3React = useWeb3React();
  const { account } = web3React;
  const assetsList = useSelector((state: RootState) => state.vault.vaultAssets);
  const [aList, setAList] = React.useState(assetsList);
  const [loading, setLoading] = React.useState(true);
  const [totalNum, setTotalNum] = React.useState(0);
  const poolsList = useSelector((state: RootState) => state.reward.rewardPools);
  const [tokens, setTokens] = React.useState(poolsList[0].tokens);
  const [PLUPrice, setPLUPrice] = React.useState(5);
  
  React.useEffect(() => {
    if (account){
      dispatch(getVaultBalances(web3React, account));
      dispatch(getRewardBalances(web3React, account));
      setTokens(poolsList[0].tokens);
    } 
  }, [account]);

  React.useEffect(()=>{
    setTokens(poolsList[0].tokens)
  },[poolsList])

  // DAI value
  React.useEffect(() => {
    if (account) {
      if (assetsList.length) {
        let ads = [];
        let list = [] as any;
        let money = 0;
        for (let i = 0; i < assetsList.length; i++) {
          ads.push(assetsList[i].erc20address);
        }
        dispatch(getTokenUSDPrice(ads.join(",")))
          .then((prices) => {
            for (let i = 0; i < assetsList.length; i++) {
              let cur:any = {
                ...assetsList[i]
              }
              cur.price = 1.03;
              if (prices[cur.erc20address]) {
                cur.price = prices[cur.erc20address].usd;
              }
              if(fixedPrice[cur.id]){
                cur.price = fixedPrice[cur.id];
              }
              let p = cur.price;
              cur.value = (p * cur.vaultBalance).toFixed(4);
              cur.totalValue = (p * cur.total).toFixed(4);
              if(blacklist.includes(cur.id)){
                cur.value = 0;
                cur.totalValue = 0;
              }
              list.push(cur)
              money = money + Number(cur.totalValue);
            }
            setAList(list); 
            setTotalNum(money)  
            setLoading(false)   
          })
          .catch((e) => {
            // console.log(e);
          });
      }
    }
  }, [assetsList]);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newSort: string
  ) => {
    setSort(newSort);
  };

  const getText = ( data: any)=>{
    let num = Number(Number(data).toFixed(5));
    return (num && (num < Number.MAX_SAFE_INTEGER) && num > 0)?moneyFormat(num.toFixed(5).slice(0,-1)): "-"
  }

  const getApy = (index:number,num:any)=>{
    let reward = tokens[index].apy * PLUPrice;
    const apy = num + (reward || 0);
    let result = (apy && apy < Number.MAX_SAFE_INTEGER && apy > 0)? apy.toFixed(5).slice(0,-1) + " %" : "-"
    return result
  }

  return (
    <Container component="main" maxWidth="md">
      <Box>
        <div className={classes.tool}>
          <h3>
            <span>{i18n.t("tool.global value")}:</span>{" "}
            <span>
              {loading ? "Loading..." : `$ ${moneyFormat(totalNum)}`}
            </span>
          </h3>
          <div>
            <ToggleButtonGroup
              value={sort}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
              size="small"
            >
              <ToggleButton value="totalSum" aria-label="left aligned">
                {i18n.t("tool.total sum")}
              </ToggleButton>
              <ToggleButton value="personal" aria-label="centered">
                {i18n.t("tool.personal")}
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className={classes.list}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">{i18n.t("tool.asset")}</TableCell>
                    <TableCell align="center">
                      {i18n.t("tool.deposit")}
                    </TableCell>
                    <TableCell align="center">{i18n.t("tool.value")}</TableCell>
                    <TableCell align="center">{i18n.t("tool.ARY")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {aList.map((row: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">
                        {loading
                          ? "Loading..."
                          : sort === "personal"
                          ? getText(row.vaultBalance)
                          : getText(row.total)}
                      </TableCell>
                      <TableCell align="center">
                        {loading
                          ? "Loading..."
                          : sort === "personal"
                          ? (getText(row.value)==='-'?'-':`$ ${getText(row.value)}`)
                          : (getText(row.totalValue)==='-'?'-':`$ ${getText(row.totalValue)}`)}
                      </TableCell>
                      <TableCell align="center">
                        {loading ? (
                          "Loading..."
                        ) : (
                          <span className={classes.red}>
                            {getApy(index,row.apy)}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Box>
    </Container>
  );
}
