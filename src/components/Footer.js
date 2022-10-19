import React from "react";
// import media from '../images/media.png';
import logoBlack from '../images/logo-black.png';

export default function Footer() {

    return (
        <React.Fragment>
            <footer>
                <div class="container">
                    <div class="row">
                        <div class="col-md-5 col-12">
                            <div class="row">
                                <div class="col-md-12">
                                    <a target="_blank" rel="noreferrer" href="https://bnbclassic.io/" class="logo d-block text-center">
                                        <img src={logoBlack} class="w-70 lazy" alt="log0-white" />
                                    </a>
                                    <p class="caption-color fs-12 py-3">
                                        Contact us: support@bnbclassic.io
                                    </p>
                                    <div class="social-icon d-flex gap-3">
                                        <a href="https://twitter.com/bnbclassicofficial" target="_Blank" rel="noreferrer" class="caption-color">
                                            <i class="fa-brands fa-twitter"></i>
                                        </a>
                                        <a href="https://t.me/+zKJVcSMDnMpmNjE0" target="_Blank" rel="noreferrer" class="caption-color">
                                            <i class="fa-brands fa-telegram"></i>
                                        </a>
                                        <a href="https://t.me/+bmG_6lF_nL83YTg8" target="_Blank" rel="noreferrer" class="caption-color">
                                            <i class="fa-brands fa-telegram"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-7 col-12 mt-5 mt-md-0">
                            <div class="row">
                                {/* <div class="col-12 col-sm-4">
                                    <div class="fs-16 caption d-inline-block pe-sm-5">Product</div>
                                    <div class="align-items-center align-items-sm-start d-flex flex-column gap-2 mb-5 mb-sm-4 ">
                                        <a href="https://www.launchpad.bnbclassic.io" target="_Blank" rel="noreferrer" class="link fs-16 text-white">Launchpad</a>
                                        <a href="#swap" class="link fs-16 text-white">Swap</a>
                                        <a href="https://stake.bnbclassic.io" target="_Blank" rel="noreferrer" class="link fs-16 text-white">Stake & Earn</a>
                                        <a href="#locker" class="link fs-16 text-white">Locker</a>
                                    </div>
                                </div> */}
                                <div class="col-12 col-sm-4">
                                    <div class="fs-16 caption d-inline-block pe-sm-5">Documents</div>
                                    <div class="align-items-center align-items-sm-start d-flex flex-column gap-2 mb-5 mb-sm-4 ">
                                        <a href="https://docs.bnbclassic.io" target="_Blank" rel="noreferrer" class="link fs-16 text-white">White paper</a>
                                        <a href="https://bnbclassic.io/#roadmap" target="_Blank" rel="noreferrer"  class="link fs-16 text-white">Roadmap</a>
                                        <a href="https://docs.bnbclassic.io/documents/contract-audit-report" target="_Blank" rel="noreferrer"  class="link fs-16 text-white">Audit Report</a>
                                        <a href="https://docs.bnbclassic.io/documents/team-kyc" target="_Blank" rel="noreferrer" class="link fs-16 text-white">Team KYC </a>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-4">
                                    <div class="fs-16 caption d-inline-block pe-sm-5">Contact</div>
                                    <div class="align-items-center align-items-sm-start d-flex flex-column gap-2 mb-5 mb-sm-4 ">
                                        <a href="https://medium.com/@bnbclassicofficial" class="link fs-16 text-white">Blog</a>
                                        <a href="mailto:support@bnbclassic.io" class="link fs-16 text-white">Support</a>
                                        <a href="https://t.me/BnbclassicAnnouncement" target="_Blank" rel="noreferrer" class="link fs-16 text-white">Announcement</a>
                                        <a href="#brand" class="link fs-16 text-white">Brand Assets</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-sm-12 col-lg-12 text-center">
                            <span class="text-white" style={{"fontSize":"14px"}}>Copyright © 2022, Bnbclassic. All rights reserved</span>
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}
