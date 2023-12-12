"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function Carousel({ slides }) {
  const settings = {
    dots: false,
    infinite: true,
    lazyLoad: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    className: "center",
    variableWidth: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section
    >
      <div id="slider-container" className="w-full">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className={`!flex justify-center h-[34.5rem] outline-none max-md:h-[19.5rem] hover:cursor-grab`}>
              <img className="object-cover object-center" src={slide.img} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
