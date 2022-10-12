import { useEffect, useState } from "react"
import { MulticallContract, getSaleContract , getMultiCallContractConnect} from "../helper/useContracts";
import { useWeb3React } from "@web3-react/core";
import tokenAbi from '../json/token.json';
import { getWeb3 } from "../helper/connectors";


export const useCommonStats = (update) => {
  const context = useWeb3React();
  const { chainId } = context;

  const [stats, setStats] = useState({
    startTime: 0,
    endTime: 0,
    softCap: 0,
    hardCap: 0,
    minContribution: 0,
    maxContribution: 0,
    poolState: false,
    rate: 0,
    remainingContribution: 0,
    token: 0,
    totalRaised: 0,
    totalVolumePurchased: 0,
    tokenName: '',
    tokenDecimal: 0,
    tokenSymbol: 0,
    tokenSupply: 0,
    percentageRaise : 0
  });

  const mc = MulticallContract(chainId);
  const sc = getSaleContract(chainId)

  useEffect(() => {
    const fetch = async () => {

      const data = await mc.aggregate([
        sc.methods.startTime(),
        sc.methods.endTime(),
        sc.methods.softCap(),
        sc.methods.hardCap(),
        sc.methods.minContribution(),
        sc.methods.maxContribution(),
        sc.methods.poolState(),
        sc.methods.rate(),
        sc.methods.remainingContribution(),
        sc.methods.token(),
        sc.methods.totalRaised(),
        sc.methods.totalVolumePurchased()
      ]);
      
      let web3 = getWeb3(chainId);
      let tokenContract = new web3.eth.Contract(tokenAbi, data[9]);

      const tokendata = await mc.aggregate([
        tokenContract.methods.name(),
        tokenContract.methods.decimals(),
        tokenContract.methods.symbol(),
        tokenContract.methods.totalSupply(),
      ]);

      setStats({
        startTime: data[0],
        endTime: data[1],
        softCap: data[2] / Math.pow(10, 18),
        hardCap: data[3] / Math.pow(10, 18),
        minContribution: data[4] / Math.pow(10, 18),
        maxContribution: data[5] / Math.pow(10, 18),
        poolState: data[6],
        rate: data[7] / Math.pow(10, 18),
        remainingContribution: data[8] / Math.pow(10, 18),
        token: data[9],
        totalRaised: data[10] / Math.pow(10, 18),
        totalVolumePurchased: data[11] / Math.pow(10, tokendata[1]),
        tokenName: tokendata[0],
        tokenDecimal: tokendata[1],
        tokenSymbol: tokendata[2],
        tokenSupply: tokendata[3] / Math.pow(10, tokendata[1]),
        percentageRaise: ((data[10] / Math.pow(10, 18)) / (data[3] / Math.pow(10, 18))) * 100
      });
    }

    if (mc) {
      fetch();
    }
    else {
      setStats({
        startTime: 0,
        endTime: 0,
        softCap: 0,
        hardCap: 0,
        minContribution: 0,
        maxContribution: 0,
        poolState: false,
        rate: 0,
        remainingContribution: 0,
        token: 0,
        totalRaised: 0,
        totalVolumePurchased: 0,
        tokenName: '',
        tokenDecimal: 0,
        tokenSymbol: 0,
        tokenSupply: 0,
        percentageRaise : 0

      })
    }
    // eslint-disable-next-line
  }, [update, chainId]);

  return stats;
}

export const useAccountStats = (updater) => {
  const context = useWeb3React();
  const { chainId, account } = context;
  const [stats, setStats] = useState({
    balance: 0,
    contributionOf : 0
  });

  const mc = MulticallContract(chainId);
  const sc = getSaleContract(chainId);
  const mcc = getMultiCallContractConnect(chainId);
  


  useEffect(() => {
    const fetch = async () => {
      const data = await mc.aggregate([
        mcc.methods.getEthBalance(account),
        sc.methods.contributionOf(account)
      ]);

      
      setStats({
        balance: data[0] / Math.pow(10, 18),
        contributionOf : data[1] / Math.pow(10, 18)
        
      })
    }

    if (mc && account) {
      fetch();
    }
    else {
      setStats({
        balance: 0,
        contributionOf : 0
      })
    }
    // eslint-disable-next-line
  }, [account, updater, chainId]);

  return stats;
}
