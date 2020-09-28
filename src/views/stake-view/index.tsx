/**
 * @format
 */
import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  makeStyles,
  Modal,
  Backdrop, Fade
} from "@material-ui/core";
import Stake from "./stake";
import { Check, Clear, Close } from "@material-ui/icons";

import Loader from "../../components/loader.compoent";
import { getRewardBalances, getBPTLPRequirements } from "src/actions/reward";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/reducers";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import colors from "src/theme/colors";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { useI18n } from "src/i18n";
import { getTokenPrice } from "src/actions/tools";
import { HashRouter, Link, Router } from "react-router-dom";
import ColorButton from "src/components/color-button.component";

const useStyles = makeStyles((theme) => ({
  warning: {
    backgroundColor: "#fff",
    padding: "12px 24px",
    margin: "12px 0",
    border: "1px solid #e0e0e0",
  },
  grey: {
    color: colors.darkGray,
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 0),
  },
  pageBox: {
    paddingTop: "70px",
    [theme.breakpoints.down("md")]: {
      paddingTop: "50px",
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: "30px",
    },
  },
  poolButton: {
    [theme.breakpoints.down("sm")]: {
      minWidth: "100px",
    },
  },
  content: {
    background: 'white',
    padding: 30,
    "&:focus": {
      outline: 'none'
    }
  },
  close: {
    textAlign: 'right',
    cursor: 'pointer',
    transform: 'translate(10px,-10px)',
    height: '20px',
    width: "100%",
    "& .MuiSvgIcon-root": {
      width: '24px',
      height: '24px'
    }
  },
  modal: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 4, 3),
    justifyContent: "center",
  },
}));

function StackView(props: any) {
  const pool = /^[123]$/.test(props.match.params.pool)
    ? parseInt(props.match.params.pool) - 1
    : 0;
  const i18n = useI18n();
  const web3React = useWeb3React();
  const dispatch = useDispatch();
  const thdispatch: ThunkDispatch<any, null, Action<string>> = useDispatch();
  let classes = useStyles();
  const { account } = web3React;
  const [balanceValid, setBalanceValid] = React.useState(false);
  const [voteLockValid, setVoteLockValid] = React.useState(false);
  const [withdrawVaild, setWithdrawValid] = React.useState(false);
  const [BPTLPRequirements, setBPTLPRequirements] = React.useState({});
  React.useEffect(() => {
    if (account) {
      dispatch(getRewardBalances(web3React, account));
      thdispatch(getBPTLPRequirements(web3React, account)).then((result) => {
        setBalanceValid(result.balanceValid);
        setVoteLockValid(result.voteLockValid);
        setWithdrawValid(result.withdrawValid);
        setBPTLPRequirements({ ...result });
      });
    }
  }, [account]);

  const PLU = { erc20address: "", decimals: 18 };

  const [PLUPrice, setPLUPrice] = React.useState(10);
  React.useEffect(() => {
    if (PLU.erc20address)
      thdispatch(getTokenPrice(PLU.erc20address, PLU.decimals))
        .then((r) => {
          if (r) {
            const p: number = +r.price * +r.ethprice;
          }
        })
        .catch((e) => {
          console.log(e);
        });
  }, []);

  const poolsList = useSelector((state: RootState) => state.reward.rewardPools);
  const [expanded, setExpanded] = React.useState("");
  const [currentPool, setCurrentPool] = React.useState(pool);
  const [loading] = React.useState(false);
  const [stakes, setStakes] = React.useState(poolsList[pool].tokens);



  React.useEffect(() => {
    setCurrentPool(pool);
    setStakes(poolsList[pool].tokens);
  });

  const handleChange = (id: any) => {
    setExpanded(id == expanded ? "" : id);
  };

  const handleChangePool = (
    event: React.MouseEvent<HTMLElement>,
    value: number | null
  ) => {
    if (value != null) {
      setCurrentPool(value);
      setStakes([...poolsList[value].tokens]);
      props.history.push(`/stake/${value + 1}`);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box className={classes.pageBox}>
        {loading && <Loader />}
        <Grid container justify="space-between" alignItems="center">
          <Grid>
            <ToggleButtonGroup
              value={currentPool}
              exclusive
              onChange={handleChangePool}
              aria-label="text alignment"
            >
              {poolsList.map((pool, index) => {
                return (
                  <ToggleButton
                    className={classes.poolButton}
                    key={index}
                    value={index}
                    aria-label="left aligned"
                  >
                    <Typography variant={"h4"} noWrap component="h4">
                      {pool.name}
                    </Typography>
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
            {/* <ColorButton
              variant="outlined"
              color="primary"
              // startIcon={<AddOutlinedIcon/>}
              disabled={loading || !account}
              onClick={handleOpen}
            > 
              {i18n.t("stake.aboutPLU")}
            </ColorButton> */}
          </Grid>
        </Grid>
        {poolsList[currentPool].name == "POOL 3" && (
          <div className={classes.warning}>
            <Typography variant={"h4"} noWrap>
              {i18n.t("stake.pluWarning")}
            </Typography>
            <Typography variant={"h5"} className={classes.grey}>
              {i18n.t("stake.pluWarning1")}{" "}
              {voteLockValid ? (
                <Check style={{ color: colors.green }} />
              ) : (
                <Clear style={{ color: colors.red }} />
              )}
            </Typography>
            <Typography variant={"h5"} className={classes.grey}>
              {i18n.t("stake.pluWarning2")}{" "}
              {balanceValid ? (
                <Check style={{ color: colors.green }} />
              ) : (
                <Clear style={{ color: colors.red }} />
              )}
            </Typography>
          </div>
        )}
        {poolsList[currentPool].name == "POOL 2" && (
          <div className={classes.warning}>
            <Typography variant={"h4"} noWrap>
              {i18n.t("stake.plubtWarning")}
            </Typography>
            <Typography variant={"h5"} className={classes.grey}>
              <a target="_blank" href="https://pools.balancer.exchange/#/pool/0x752a5b5bb4751d6c59674f6ef056d3d383a36e61/">{i18n.t("stake.plubtWarning1")} </a>
            </Typography>
            <Typography variant={"h5"} className={classes.grey}>
              {i18n.t("stake.plubtWarning2")}{" "}
            </Typography>
          </div>
        )}
        {stakes &&
          stakes.map((stake: { id: any }) => {
            return (
              <Stake
                key={stake.id}
                stake={stake}
                expanded={expanded}
                handleChange={handleChange}
                poolName={poolsList[currentPool].name}
                BPTLPRequirements={BPTLPRequirements}
                PLUPrice={PLUPrice}
              ></Stake>
            );
          })}
      </Box>
      <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.content}>
            <div className={classes.close}>
              <Close onClick={handleClose} />
            </div>
            
          </div>
        </Fade>
      </Modal>
      </div>
    </Container>
  );
}

export default StackView;
