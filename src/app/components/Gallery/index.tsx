"use client";

import Image from "next/image";
import { useRef } from "react";
import Carousel from "../Carousel";

import { useGSAP } from "@gsap/react";
import gsap, { Power3 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Gallery = () => {
  const slides = [
    { img: "images/cabine/cabine1.webp" },
    { img: "images/cabine/cabine2.webp" },
    { img: "images/cabine/cabine3.webp" },
    { img: "images/cabine/cabine4.webp" },
    { img: "images/cabine/cabine5.webp" },
    { img: "images/cabine/cabine6.webp" },
    { img: "images/cabine/cabine7.webp" },
    { img: "images/cabine/cabine8.webp" },
    { img: "images/cabine/cabine9.webp" },
    { img: "images/cabine/cabine10.webp" },
  ];

  // const elementRef = useRef(null);
  const containerAnimation = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      //seta elementos
      setTimeout(() => {
        gsap.set(".imgGalleryArrow1", { x: -300, opacity: 0 });
        gsap.set(".imgGallery", { y: 100, opacity: 0 });
      }, 100);

      setTimeout(() => {
        const tl = gsap
          .timeline()
          .fromTo(
            ".textGallery1",
            { y: 100, opacity: 0 },
            { opacity: 1, y: 0, duration: 1, ease: Power3.easeOut }
          );
        //
        gsap.to(".imgGalleryArrow1", {
          opacity: 1,
          x: 0,
          duration: 2,
          ease: Power3.easeOut,
          scrollTrigger: {
            trigger: ".imgGalleryArrow1",
            start: "top 1000px",
            end: "top 200px",
            scrub: true,
          },
        });
        gsap.to(".imgGallery", {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: Power3.easeOut,
          scrollTrigger: {
            trigger: ".imgGallery",
            start: "top 1000px",
            end: "top 200px",
            scrub: true,
          },
        });
        //
        ScrollTrigger.create({
          trigger: ".imgGalleryArrow1",
          animation: tl,
        });
      }, 200);
    },
    { scope: containerAnimation }
  );

  return (
    <>
      <div
        className="w-full max-w-[90%] flex flex-row m-auto items-center pt-20 max-md:pt-4"
        // ref={elementRef}
        ref={containerAnimation}
      >
        <div className="imgGalleryArrow1 opacity-0 w-[25%] max-md:hidden">
          <Image
            src="images/arrows.svg"
            alt="Icon"
            className="max-w-[20%] -rotate-90 max-md:max-w-[100%]"
            width={100}
            height={500}
            loading="lazy"
          />
        </div>
        <div className="textGallery1 opacity-0w-[50%] max-md:w-[100%] relative">
          <p className="text-[45px] font-abeezee leading-[50px] text-black text-center max-md:text-[22px]">
            Por dentro da cabine?
          </p>
          <Image
            src="images/arrows.svg"
            alt="Icon"
            className="max-w-[20%] hidden -rotate-90 max-md:flex max-md:max-w-[44px] absolute top-0"
            width={100}
            height={500}
            loading="lazy"
          />
        </div>
        {/* <div className="w-[25%] max-md:hidden"></div> */}
      </div>
      {/* <div className="imgGallery opacity-0 w-full mt-5" ref={elementRef}> */}
      <div
        className="imgGallery opacity-0 w-full mt-5"
        ref={containerAnimation}
      >
        <Carousel slides={slides} />
      </div>
    </>
  );
};

export default Gallery;
