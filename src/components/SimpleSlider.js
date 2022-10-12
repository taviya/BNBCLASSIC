import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import slide1 from "../images/1_slide.png";
import slide2 from "../images/2_slide.png";
import slide3 from "../images/3_slide.png";
import slide4 from "../images/4_slide.png";
// import slide5 from "../images/5_slide.png";


export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div>
        <Slider {...settings}>
          <SliderCtnr>
            <img src={slide1} alt="banner" />
          </SliderCtnr>
          <SliderCtnr>
            <img src={slide2} alt="banner" />
          </SliderCtnr>
          <SliderCtnr>
            <img src={slide3} alt="banner" />
          </SliderCtnr>
          <SliderCtnr>
            <img src={slide4} alt="banner" />
          </SliderCtnr>
          {/* <SliderCtnr>
            <img src={slide5} alt="banner" />
          </SliderCtnr> */}
        </Slider>
      </div>
    );
  }
}

const SliderCtnr = styled.div`
  width:100%;
  img{
    width:100%;
    /* background-size: cover; */
    height:auto;
  }
  @media (max-width: 600px) {
    img{
    height:auto;
  }
  }
  `
