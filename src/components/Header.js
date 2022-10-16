import React from 'react'
import Connect from './Connect';
import logoBlack from '../images/logo-black.png';
import logoMobile from '../images/logo-black.png';
import bscImage from '../images/binance-coin.svg';
import flag from '../images/flag.png';




export default function Header() {


    return (
        <header id="navbar">
            {/* <!--HEADER SECTION--> */}
            <div class="container-fluid">
                <div class="row d-flex justify-content-center">
                    <div class="col-12">
                        <nav class="navbar navbar-expand-lg navbar-light p-0">
                            <div class="container-fluid">
                                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <a class="flex-shrink-0 navbar-brand p-0" target="_blank" rel="noreferrer" href="https://bnbclassic.io/">
                                    {/* <!--<img class="w-100 lazy" src="assets/images/logo-black.png" alt="">--> */}
                                    <img class="w-100 mob-none lazy" src={logoBlack} alt="logoblack" />
                                    <img class="mob-logo desk-none" src={logoMobile} alt="logoblack" />
                                </a>

                                <div class="navbar-collapse d-none d-lg-block" id="navbarSupportedContent">
                                    {/* <!--MENU ITEMS--> */}
                                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                                        <li class="nav-item">
                                            <a class="nav-link p-0 text-dark" aria-current="page" target="_blank" rel="noreferrer"
                                                href="https://bnbclassic.io/">Home</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link p-0 text-dark active" target="_blank" rel="noreferrer" href="https://www.launchpad.bnbclassic.io/">Presale</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link p-0 text-dark" target="_blank" rel="noreferrer" href="https://docs.bnbclassic.io/">Docs</a>
                                        </li>
                                        {/* <li class="nav-item">
                                            <a class="nav-link p-0 text-dark" rel="noreferrer"  target="_blank" href="https://stake.bnbclassic.io/">Stake</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link p-0 text-dark" href="#sec">Swap</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link p-0 text-dark" href="#sec">Locker</a>
                                        </li> */}
                                    </ul>

                                    {/* <!--LANG-SECTION--> */}
                                    {/* <div class="dropdown lang-section">
                                        <a class="dropdown-toggle" href="#sec" id="navbarDropdown" role="button"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src={flag} class="lazy me-2" alt="" />En
                                        </a>
                                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><a class="dropdown-item " href="#sec">
                                                <img src={flag} class="lazy me-2" alt="" />En
                                            </a></li>
                                        </ul>
                                    </div> */}
                                </div>
                                <div class="network on-mobile mr-3">
                                    <img src={bscImage} width="18" class="mx-2" alt="" />
                                    <span class="ml-2 hide-on-mobile">BSC MAINNET</span>
                                </div>
                                <Connect/>
                            </div>
                        </nav>

                        {/* <!--MOBILE MENU--> */}
                        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                            <div class="offcanvas-header">
                                <a class="navbar-brand p-0" href="https://bnbclassic.io" target="_blank" rel="noreferrer">
                                    <img src={logoBlack} class="lazy" alt="logo-blkc" />
                                </a>
                                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body">
                                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <a class="nav-link p-0 text-dark active" aria-current="page" target="_blank" rel="noreferrer" href="https://bnbclassic.io">Home</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link p-0 text-dark" target="_blank" rel="noreferrer" href="https://www.launchpad.bnbclassic.io/">Launchpad</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link p-0 text-dark" target="_blank" rel="noreferrer" href="https://stake.bnbclassic.io">Stake</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link p-0 text-dark" href="#sec">Swap</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link p-0 text-dark" target="_blank" rel="noreferrer" href="https://docs.bnbclassic.io">Docs</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link p-0 text-dark" href="#sec">Locker</a>
                                    </li>
                                </ul>
                                <div class="dropdown lang-section">
                                    <a class="dropdown-toggle " href="#sec" id="navbarDropdown2" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={flag} class="lazy me-2" alt="" />En
                                    </a>
                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown2">
                                        <li><a class="dropdown-item " href="#sec">
                                            <img src={flag} class="lazy me-2" alt="" />En
                                        </a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}




