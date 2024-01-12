"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Image from "next/image";

import { useState, useEffect } from "react";

export default function Carousel({ slides }) {

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSubtitle, setSelectedSubtitle] = useState('');

  useEffect(() => {
    const gallery = document.getElementsByClassName('imgGallery');
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
      // gallery.style.transform = 'none'
    } else {
      document.body.style.overflow = '';
      // gallery.style.transform = 'initial'
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  const openLightbox = (slide) => {
    setSelectedImage(slide.img);
    setSelectedSubtitle(slide.subtitle);
    setLightboxOpen(true);
    setSliderSettings({ ...sliderSettings, autoplay: false });
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSliderSettings({ ...sliderSettings, autoplay: true });
  };

  const [sliderSettings, setSliderSettings] = useState({
    dots: false,
    infinite: true,
    lazyLoad: true,
    speed: 1000,
    autoplay: true,
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
  });

  return (
    <section
    >
      <div id="slider-container" className="w-full">
        <Slider {...sliderSettings}>
          {slides.map((slide, index) => (
            <div key={index} className={`!flex justify-center h-[34.5rem] outline-none max-md:h-[19.5rem] hover:cursor-pointer relative overflow-hidden`} onClick={() => openLightbox(slide)}>
              <img className="object-cover object-center" src={slide.img} />
              <div className="absolute bottom-[40px] left-[-30px] legend flex items-center">
                <p className="text-white text-[17px] text-legend">{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {lightboxOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-[rgb(0,0,0)]/[0.8] px-3" onClick={closeLightbox}>
          <button className="absolute top-[30px] right-[30px] max-md:top-[15px] max-md:right-[15px] bg-[#EC3237] w-[40px] h-[40px] rounded-full text-[17px]" onClick={closeLightbox}>
            X
          </button>
          <div className="relative flex justify-center h-[80vh] max-md:h-[60vh]">
            <img className="object-contain" src={selectedImage} alt="Imagem" />
            <div className="absolute bottom-[-45px] legend flex items-center !px-5">
              <p className="text-[15px] text-legend">{selectedSubtitle}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
