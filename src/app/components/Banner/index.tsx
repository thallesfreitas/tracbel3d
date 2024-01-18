"use client";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import { Back, Power3 } from "gsap";

import gsap from "gsap";
import Image from "next/image";

const Banner = () => {
  const scrollToSection = () => {
    const section = document.getElementById("secao");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const containerAnimation = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // setTimeout(() => {
      gsap
        .timeline()
        .fromTo(
          ".whiteBG",
          { opacity: 1 },
          {
            // delay: 1,
            opacity: 0,
            duration: 1,
            ease: Power3.easeOut,
            stagger: 0.2,
          }
        )
        .fromTo(
          ".orangeBG",
          { opacity: 1 },
          {
            // delay: 0.6,
            opacity: 0,
            duration: 2,
            // ease: Power3.easeOut,
            // stagger: 0.2,
          }
        )
        .fromTo(
          ".textHeaderIntro",
          { x: 300, opacity: 0 },
          {
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: Power3.easeOut,
            stagger: 0.2,
          }
        )
        .fromTo(
          ".textHeaderCTA",
          { scale: 1.5, opacity: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: Back.easeOut,
            delay: -0.3,
          }
        )
        .fromTo(
          ".imageHeaderTrator",
          { scale: 1.5, x: 1500, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: Power3.easeOut,
            delay: -0.3,
          }
        );
      // }, 1000);
    },
    { scope: containerAnimation }
  );

  return (
    <>
      <div
        ref={containerAnimation}
        className=" z-[100] w-full h-[84vh] bg-cover bg-no-repeat flex items-center flex-col relative max-lg:h-[36vh] max-sm:h-[32vh]"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="images/bg-banner_v2.mp4" type="video/mp4" />
        </video>

        <div className="whiteBG z-[12] absolute w-full h-[84vh] bg-[#FFFFFF] bg-cover bg-no-repeat flex items-center flex-col z-1 max-lg:h-[36vh] max-sm:h-[32vh] "></div>
        <div className="orangeBG z-20 absolute w-full h-[84vh] bg-[#ff2e00] bg-cover bg-no-repeat flex items-center flex-col z-1 max-lg:h-[36vh] max-sm:h-[32vh] "></div>
        <div className="container pt-20 w-[80%] z-20 max-md:pt-8 max-md:w-full max-md:px-5 z-2">
          <p className="textHeaderIntro text-[3vw] font-abeezee leading-[2.5rem] 2xl:leading-[3.5rem] text-white max-md:text-[6vw] max-md:leading-8 2xl:text-[3vw] opacity-0">
            Chegou a retroescavadeira que
          </p>
          <p className="textHeaderIntro text-[3vw] font-abeezee leading-[2.5rem] 2xl:leading-[3.5rem] text-white max-md:text-[6vw] max-md:leading-8 2xl:text-[3vw] opacity-0">
            vai somar ao crescimento do
          </p>
          <p className="textHeaderIntro text-[3vw] font-abeezee leading-[2.5rem] 2xl:leading-[3.5rem] text-white max-md:text-[6vw] max-md:leading-8 2xl:text-[3vw] opacity-0">
            seu negócio!
          </p>
          <h1 className="textHeaderIntro text-[6vw] font-abeezee leading-[6vw] mt-5 mb-10 text-white max-md:mt-5 max-md:mb-10 2xl:text-[6vw] 2xl:leading-[5vw] opacity-0">
            HD96 E <br className="max-md:hidden"/>HD100 4X4
          </h1>
          <div className="textHeaderCTA opacity-0">
            {/* <button className="btn" onClick={scrollToSection}> */}
            <button className="btn" onClick={scrollToSection}>
              <span className="btn-revert font-ubuntu font-bold text-[17px] text-white">
                Conheça
              </span>
            </button>
          </div>
        </div>
        <div className="imageHeaderTrator absolute right-[-25px] bottom-[-85px] max-md:top-auto max-lg:-bottom-[145px] max-md:-bottom-[120px] max-sm:-bottom-[60px] w-[75%] opacity-0">
          <Image
            src="images/trator3.webp"
            alt="Icon"
            className="w-full"
            width={150}
            height={500}
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
