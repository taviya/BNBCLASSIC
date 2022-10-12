import React, { useState } from 'react'
import { formatPrice } from '../helper/useContracts';
import { useCommonStats, useAccountStats } from '../hooks/useStats';
// import { CopyToClipboard } from "react-copy-to-clipboard";
import { socialLinks } from '../helper/constant';
import Countdown, { zeroPad } from "react-countdown";
import Button from 'react-bootstrap-button-loader';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import { parseEther } from 'ethers/lib/utils';
import { getContract } from '../helper/contractHelper';
import stakeAbi from '../json/tokenstake.json';
import { getWeb3 } from '../helper/connectors';
import { contract } from '../helper/contract';
import slogo from '../images/s-logo.png';
// import tokenLogo from '../images/token-logo.png';
import bscImage from '../images/binance.png';
import chart from '../images/tokonomics.png';
import SimpleSlider from './SimpleSlider';
// import tokonomics from '../images/tokonomics.png';
import contractsolid from '../images/teenyicons_contract-solid.png';

export default function Home() {
    const [updater, setUpdater] = useState(1);
    const stats = useCommonStats(updater);
    const accStats = useAccountStats(updater);
    // const [refcopy, setRefcopy] = useState(false);
    const [btndisabled, setBtndisabled] = useState(false);
    // const [error_msg, setError_msg] = useState('');
    const [loading, setLoading] = useState(false);
    const { chainId, account, library } = useWeb3React();
    const [amount, setAmount] = useState(0);
    const [error_msg, setError_msg] = useState('');


    const timercountdown = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return (
                <div class="justify-content-center gap-3 mb-3" id="date-count" style={{ "display": "flex" }}>
                    <div class="d-flex flex-column">
                        <div class="fs-38" id="days">00:</div>
                        <div class="fs-13">Days</div>
                    </div>
                    <div class="d-flex flex-column">
                        <div class="fs-38" id="hours">00:</div>
                        <div class="fs-13">Hours</div>
                    </div>
                    <div class="d-flex flex-column">
                        <div class="fs-38" id="minutes">00:</div>
                        <div class="fs-13">Minutes</div>
                    </div>
                    <div class="d-flex flex-column">
                        <div class="fs-38" id="seconds">00</div>
                        <div class="fs-13">Seconds</div>
                    </div>
                </div>
            );
        } else {
            // Render a countdown
            return (
                <div class="justify-content-center gap-3 mb-3" id="date-count" style={{ "display": "flex" }}>
                    <div class="d-flex flex-column">
                        <div class="fs-38" id="days">{zeroPad(days, 2)}:</div>
                        <div class="fs-13">Days</div>
                    </div>
                    <div class="d-flex flex-column">
                        <div class="fs-38" id="hours">{zeroPad(hours, 2)}:</div>
                        <div class="fs-13">Hours</div>
                    </div>
                    <div class="d-flex flex-column">
                        <div class="fs-38" id="minutes">{zeroPad(minutes, 2)}:</div>
                        <div class="fs-13">Minutes</div>
                    </div>
                    <div class="d-flex flex-column">
                        <div class="fs-38" id="seconds">{zeroPad(seconds, 2)}</div>
                        <div class="fs-13">Seconds</div>
                    </div>
                </div>
            );
        }
    };

    const handleChangeAmount = (e) => {
        setAmount(e.target.value);
        setBtndisabled(true);

        if (isNaN(e.target.value)) {
            setError_msg('please enter valid amount');
            setBtndisabled(true);
        }

        else if (parseFloat(e.target.value) === 0 || e.target.value === '') {
            setError_msg('Amount must be greater than zero');
            setBtndisabled(true);
        }
        else if (parseFloat(e.target.value) < parseFloat(stats.minContribution) || parseFloat(e.target.value) > parseFloat(stats.maxContribution)) {
            setError_msg(`Amount must be between ${stats.minContribution} and ${stats.maxContribution}`);
            setBtndisabled(true);
        }
        else {
            if (parseInt(stats.startTime) <= Math.floor(new Date().getTime() / 1000.0) && parseInt(stats.endTime) >= Math.floor(new Date().getTime() / 1000.0)) {
                setBtndisabled(false);
            }
            setError_msg('');
        }
        return;
    }

    const handleSubmitContribution = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (amount > 0 && (parseFloat(stats.maxContribution) > parseFloat(amount) || parseFloat(stats.minContribution) < parseFloat(amount))) {
                if (account) {
                    if (chainId) {
                        // if (parseFloat(accStats.balance) >= parseFloat(amount)) {
                        let privatesaleAddress = contract[chainId] ? contract[chainId].saleAddress : contract['default'].saleAddress;

                        let poolContract = getContract(stakeAbi, privatesaleAddress, library);

                        let tx = await poolContract.contribute({
                            'from': account,
                            value: parseEther(amount)
                        });
                        const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 5000));
                        toast.promise(
                            resolveAfter3Sec,
                            {
                                pending: 'Waiting for confirmation 👌',
                            }
                        )

                        var interval = setInterval(async function () {
                            let web3 = getWeb3(chainId);
                            var response = await web3.eth.getTransactionReceipt(tx.hash);
                            if (response != null) {
                                clearInterval(interval)
                                if (response.status === true) {
                                    toast.success('success ! your last transaction is success 👍');
                                    setUpdater(new Date());
                                    setLoading(false);
                                }
                                else if (response.status === false) {
                                    toast.error('error ! Your last transaction is failed.');
                                    setUpdater(new Date());
                                    setLoading(false);
                                }
                                else {
                                    toast.error('error ! something went wrong.');
                                    setUpdater(new Date());
                                    setLoading(false);
                                }
                            }
                        }, 5000);

                        // }
                        // else {
                        //     toast.error('you don\'t have enough balance !');
                        //     setLoading(false);
                        // }

                    }
                    else {
                        toast.error('Please select Smart Chain Network !');
                        setLoading(false);
                    }
                }
                else {
                    toast.error('Please Connect Wallet!');
                    setLoading(false);
                }
            }
            else {
                toast.error('Please Enter Valid Amount !');
                setLoading(false);
            }
        }
        catch (err) {
            toast.error(err.reason ? err.reason : err.message);
            setLoading(false);
        }
    }

    const countdownComplete = () => {
        setBtndisabled(false);
        setUpdater(2);

    }

    return (
        <>
            {/* <!-- BANNER SECTION --> */}
            <div class="ido-banner-section py-4 py-sm-5">
                <div class="container">
                    <div class="row">
                        <div class="col-12 text-white">
                            <div class="ido-banner rounded-8 overflow-hidden position-relative">
                                <SimpleSlider />
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="d-flex justify-content-between flex-wrap gap-3 py-sm-3">
                                <div class="align-items-center d-flex gap-3">
                                    <a href="https://www.digipad.io/" target="_blank" rel="noreferrer" class="px-2 py-1 rounded-pill bg-primary text-white">
                                        <i class="fa-solid fa-globe mx-1"></i>
                                        Website
                                    </a>
                                    <a href="https://docs.digipad.io/" target="_blank" rel="noreferrer" class="scale">
                                        <img src={contractsolid} alt="contract-icon" />
                                    </a>
                                    {/* <a href="#coinmarketcap" target="_blank" rel="noreferrer"  class="scale">
                                        <img src={coinmarketcap} alt="contract-icon" />
                                    </a> */}

                                    <div class="align-items-center d-flex gap-2">
                                        {socialLinks && socialLinks.map((value, index) => {
                                            return (
                                                <a target="_blank" rel="noreferrer" key={index} href={value.link} class="scale">
                                                    <i class={value.image}></i>
                                                    {/* <img src={value.image} alt="icon" /> */}
                                                </a>
                                            )
                                        })
                                        }

                                    </div>
                                </div>
                                <div class={`align-items-center d-flex justify-content-center px-2 rounded-pill ${!stats.poolState ? 'text-danger' : stats.endTime < Math.floor(new Date().getTime() / 1000.0) ? 'text-danger' :
                                    stats.endTime > Math.floor(new Date().getTime() / 1000.0) && stats.startTime < Math.floor(new Date().getTime() / 1000.0) ? 'text-success' : stats.startTime > Math.floor(new Date().getTime() / 1000.0) ? 'text-warning' : 'text-danger'}`}
                                    style={{ "background": "#A6EEB6" }}>
                                    <i class="fa-solid fa-circle me-2" style={{ "fontSize": "8px" }}></i>
                                    {stats && !stats.poolState ? 'Closed' : stats.endTime < Math.floor(new Date().getTime() / 1000.0) ? 'Closed' :
                                        stats.endTime > Math.floor(new Date().getTime() / 1000.0) && stats.startTime < Math.floor(new Date().getTime() / 1000.0) ? 'Sale Live' : stats.startTime > Math.floor(new Date().getTime() / 1000.0) ? 'Upcoming' : 'None'}
                                </div>
                            </div>
                        </div>
                        {/* <!-- COUNT-DOWN-BUY-NOW--> */}
                        <div class="col-12">
                            <div class="bg-white count-down rounded-8 py-4">
                                <h2 className='text-center'>{stats.startTime > Math.floor(new Date().getTime() / 1000.0) ? 'START IN' : 'END IN'}</h2>
                                <Countdown
                                    key={Math.floor(Math.random() * 10 + 1)}
                                    date={parseInt(stats.startTime) > Math.floor(new Date().getTime() / 1000.0) ? parseInt(stats.startTime) * 1000 : parseInt(stats.endTime) * 1000}
                                    renderer={timercountdown}
                                    onComplete={countdownComplete}
                                />


                                {/* <h3 id="expired" class="text-danger text-center"></h3> */}
                                <div id="DivForHoverItem">
                                    <div style={{ "width": "100%" }} >
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ "width": `${stats.percentageRaise}%` }}>
                                                <span class="title">{stats.percentageRaise}%</span>
                                            </div>
                                        </div>
                                    </div>


                                    {/* <div class="bnb-bar mb-2" style={{"width" :`100%`}}></div> */}
                                    <div class="d-flex justify-content-between mb-3">
                                        <p>Softcap: {stats.softCap ? stats.softCap : 0} BNB</p>
                                        <p id="HiddenText">Total Raised : {stats.totalRaised} BNB</p>
                                        <p>Hardcap: {stats.hardCap ? stats.hardCap : 0} BNB</p>
                                    </div>
                                </div>
                                <span className='d-flex align-items-center justify-content-center m-auto mt-5 mb-1'>Your Balance : {accStats ? formatPrice(accStats.balance) : '0'} BNB</span>
                                <span className='d-flex align-items-center justify-content-center m-auto mb-1'>Your contribution : {accStats ? formatPrice(accStats.contributionOf) : '0'} BNB</span>
                                <input placeholder='Enter Amount' className='form-control private-input d-flex align-items-center justify-content-center m-auto mb-3 mt-1' value={amount} onChange={(e) => { handleChangeAmount(e) }} type="text" />
                                <h5 className='text-danger text-center mb-47'><small>{error_msg}</small></h5>
                                <Button variant="none" disabled={btndisabled} loading={loading} type="button" onClick={(e) => { handleSubmitContribution(e) }} className="btn btn-primary d-flex align-items-center justify-content-center m-auto rounded-8 text-center w-25 h-48">Buy Now</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- ECOSYSTEM SECTION --> */}
            <div class="ecosystem-section">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="d-flex align-items-center justify-content-between mb-sm-5 mb-4">
                                <div class="align-items-center d-flex gap-4">
                                    <img src={slogo} class="img-fluid" alt="logo" />
                                    <h3 class="fs-28 fw-bold">Digipad Ecosystem</h3>
                                </div>
                                <div class="d-flex gap-2">
                                    <h4 class="tag-btn text-uppercase text-center bg-yellow">
                                        <a href="https://docs.digipad.io/documents/contract-audit-report" target="_blank" rel="noreferrer">Audit</a>
                                    </h4>
                                    <h4 class="tag-btn text-uppercase text-center bg-purple">
                                        <a href="https://docs.digipad.io/documents/team-kyc" target="_blank" rel="noreferrer">kyc</a>
                                    </h4>
                                    <h4 class="tag-btn text-uppercase text-center bg-pink">
                                        <a href="https://docs.digipad.io/documents/pinksale-safu" target="_blank" rel="noreferrer">SAFU</a>
                                    </h4>
                                </div>
                                {/* <div class="d-flex gap-3">
                                    <button class="btn btn-secondary text-white px-3 px-sm-4 rounded-pill">KYC</button>
                                    <button class="btn text-white px-3 px-sm-4 rounded-pill" style={{ "background": "#23E44D" }}>Audit</button>
                                </div> */}
                            </div>

                            <p class="mb-4 mb-sm-5">
                                Digipad is a private investment launchpad for global crypto investors, ventures & startups. We are committed to create safer investment zone for private investors & on boarding the best crypto startups for our ecosystem users. Our ecosystem’s core product - Private Sale Launchpad & Staking platform is already Live. Digiswap & Token Locker is also ready to launch. . Digipad have complete team KYC & safe smart contract - audited by InterFi. We also achieved SAFU badge by our public sale partner Pinksale.
                            </p>


                        </div>
                        <div className='col-lg-6 col-md-12'>
                            <div class="mb-4 mb-sm-5">
                                <div class="fs-21 fw-bold mb-4">
                                    Token Information
                                </div>
                                <div class="table-grid">
                                    <div>
                                        <div>Token Name</div>
                                        <div>:</div>
                                        <div>{stats.tokenName ? stats.tokenName : 0}</div>
                                    </div>
                                    <div>
                                        <div>Token Chain</div>
                                        <div>:</div>
                                        <div>Bsc Chain<img src={bscImage} class="img-fluid ms-3" style={{ "width": "24px", "height": "24px" }} alt="" /></div>
                                    </div>
                                    <div>
                                        <div>Token Contract</div>
                                        <div>:</div>
                                        <div><a target="_blank" rel="noreferrer" href={`https://bscscan.com/token/${stats.token}`} >{stats.token ? stats.token.toString().slice(0, 8) + '....' + stats.token.toString().slice(-8) : '0x'}</a> </div>
                                        {/* <div class="token-copy d-flex align-items-center position-relative">
                                                <input id="token" type="text" class="form-control border-0 " value={stats.token ? stats.token : '0x'} />
                                                <CopyToClipboard text={stats.token} onCopy={() => {
                                                    setRefcopy(true);
                                                    setTimeout(() => {
                                                        setRefcopy(false);
                                                    }, 2000)
                                                }}>
                                                    <div type="button"
                                                        class="bg-primary p-2 rounded-8 position-absolute end-0">

                                                        <img class="img-fluid scale" src={copyImg} alt="" /><span>{refcopy && 'copied'}</span>

                                                    </div>
                                                </CopyToClipboard>

                                            </div> */}
                                        {/* </div> */}
                                    </div>
                                    <div>
                                        <div>Token Supply</div>
                                        <div>:</div>
                                        <div>{stats.tokenSupply ? formatPrice(stats.tokenSupply) : 0} {stats.tokenSymbol}</div>
                                    </div>
                                    <div>
                                        <div>Initial Market Cap</div>
                                        <div>:</div>
                                        <div>TBA</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="fs-21 fw-bold mb-4">
                                    Private Pool Details
                                </div>
                                <div class="table-grid">
                                    <div>
                                        <div>Start From</div>
                                        <div>:</div>
                                        <div>{(new Date(parseInt(stats.startTime * 1000))).toUTCString()}</div>
                                    </div>
                                    <div>
                                        <div>End Date</div>
                                        <div>:</div>
                                        <div>{(new Date(parseInt(stats.endTime * 1000))).toUTCString()}</div>
                                    </div>
                                    <div>
                                        <div>Price</div>
                                        <div>:</div>
                                        <div>Fairlaunch Price + 20% Extra</div>
                                    </div>
                                    <div>
                                        <div>Softcap</div>
                                        <div>:</div>
                                        <div>{stats.softCap} BNB</div>
                                    </div>
                                    <div>
                                        <div>Hardcap</div>
                                        <div>:</div>
                                        <div>{stats.hardCap} BNB</div>
                                    </div>
                                    <div>
                                        <div>Min Buy</div>
                                        <div>:</div>
                                        <div>{stats.minContribution} BNB</div>
                                    </div>
                                    <div>
                                        <div>Max. Buy</div>
                                        <div>:</div>
                                        <div>{stats.maxContribution} BNB</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='col-lg-6 col-md-12 '>
                            <div class="container">
                                <img src={chart} alt="tokonomic" className='chart-side' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
