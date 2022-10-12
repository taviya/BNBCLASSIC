import React from "react";
import media from '../images/media.png';
import logoWhite from '../images/logo-white.png';

export default function Footer() {

    return (
        <React.Fragment>
            <footer>
                <div class="container">
                    <div class="row">
                        <div class="col-md-5 col-12">
                            <div class="row">
                                <div class="col-md-12">
                                    <a target="_blank" rel="noreferrer" href="https://digipad.io/" class="logo d-block">
                                        <img src={logoWhite} class="w-100 lazy" alt="log0-white" />
                                    </a>
                                    <p class="caption-color fs-12 py-3 text-center">
                                        Contact us: support@digipad.io
                                    </p>
                                    <div class="social-icon d-flex gap-3">
                                        <a href="https://www.facebook.com/digipadofficial/" target="_Blank" rel="noreferrer" class="caption-color">
                                            <i class="fa-brands fa-facebook-square"></i>
                                        </a>
                                        <a href="https://twitter.com/digipadofficial" target="_Blank" rel="noreferrer" class="caption-color">
                                            <i class="fa-brands fa-twitter"></i>
                                        </a>
                                        <a href="https://www.youtube.com/channel/UCnzs9zOPCv6-M12ARayj9bA/featured" target="_Blank" rel="noreferrer" class="caption-color">
                                            <i class="fa-brands fa-youtube"></i>
                                        </a>
                                        <a href="https://t.me/digipadglobal" target="_Blank" rel="noreferrer" class="caption-color">
                                            <i class="fa-brands fa-telegram"></i>
                                        </a>
                                        <a href="https://medium.com/@digipadofficial" target="_Blank" rel="noreferrer" class="caption-color">
                                            <img class="w-100 lazy" src={media} alt="media" />
                                        </a>
                                        <a href="https://github.com/Digipad" target="_Blank" rel="noreferrer" class="caption-color">
                                            <i class="fa-brands fa-github"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-7 col-12 mt-5 mt-md-0">
                            <div class="row">
                                <div class="col-12 col-sm-4">
                                    <div class="fs-16 caption d-inline-block pe-sm-5">Product</div>
                                    <div class="align-items-center align-items-sm-start d-flex flex-column gap-2 mb-5 mb-sm-4 ">
                                        <a href="https://www.launchpad.digipad.io" target="_Blank" rel="noreferrer" class="link fs-16 text-white">Launchpad</a>
                                        <a href="#swap" class="link fs-16 text-white">Swap</a>
                                        <a href="https://stake.digipad.io" target="_Blank" rel="noreferrer" class="link fs-16 text-white">Stake & Earn</a>
                                        <a href="#locker" class="link fs-16 text-white">Locker</a>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-4">
                                    <div class="fs-16 caption d-inline-block pe-sm-5">Documents</div>
                                    <div class="align-items-center align-items-sm-start d-flex flex-column gap-2 mb-5 mb-sm-4 ">
                                        <a href="https://docs.digipad.io" target="_Blank" rel="noreferrer" class="link fs-16 text-white">White paper</a>
                                        <a href="https://digipad.io/#roadmap" target="_Blank" rel="noreferrer"  class="link fs-16 text-white">Roadmap</a>
                                        <a href="https://docs.digipad.io/documents/contract-audit-report" target="_Blank" rel="noreferrer"  class="link fs-16 text-white">Audit Report</a>
                                        <a href="https://docs.digipad.io/documents/team-kyc" target="_Blank" rel="noreferrer" class="link fs-16 text-white">Team KYC </a>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-4">
                                    <div class="fs-16 caption d-inline-block pe-sm-5">Contact</div>
                                    <div class="align-items-center align-items-sm-start d-flex flex-column gap-2 mb-5 mb-sm-4 ">
                                        <a href="https://medium.com/@digipadofficial" class="link fs-16 text-white">Blog</a>
                                        <a href="mailto:support@digipad.io" class="link fs-16 text-white">Support</a>
                                        <a href="https://t.me/DigipadAnnouncement" target="_Blank" rel="noreferrer" class="link fs-16 text-white">Announcement</a>
                                        <a href="#brand" class="link fs-16 text-white">Brand Assets</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-sm-12 col-lg-12 text-center">
                            <span class="text-white" style={{"fontSize":"14px"}}>Copyright © 2022, Digipad. All rights reserved</span>
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}
