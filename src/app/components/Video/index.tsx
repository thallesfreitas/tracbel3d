"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import ThreeScene from "../../components/Obj3d/ThreeScene";

import { useGSAP } from "@gsap/react";
import gsap, { Back, Power3 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Video = () => {
  const elementRef = useRef(null);
  const containerAnimation = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      //seta elementos
      setTimeout(() => {
        gsap.set(".txtTitleVideo", { y: 200, opacity: 0 });
        gsap.set(".vidPatrola", { x: 200, opacity: 0 });
      }, 100);

      setTimeout(() => {
      gsap.to(".txtTitleVideo", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: Power3.easeOut,
        scrollTrigger: {
          trigger: ".txtTitleVideo",
          start: "top 600px",
          end: "top 100px",
          // scrub: true,
        },
      });
      gsap.to(".vidPatrola", {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: Power3.easeOut,
        scrollTrigger: {
          trigger: ".vidPatrola",
          start: "top 400px",
          end: "top 100px",
          scrub: true,
        },
      });
    }, 200)
  },
  { scope: containerAnimation }
  );

  return (
    <>
      <div
        className="w-full max-w-[95%] flex flex-col justify-center m-auto pt-20"
        ref={elementRef}
      >
        <div className="txtTitleVideo opacity-0 mb-10 max-md:px-5 max-md:mb-5 flex justify-center">
          <p className="text-[27px] font-abeezee leading-[40px] text-black text-center max-md:text-[20px] max-w-[69vw] max-md:max-w-[100vw]">
            A HD96 e a HD100 4X4 Bull Machines são as novas retroescavadeiras com
            o selo de qualidade e confiança Tracbel. Confira a máquina em ação:
          </p>
        </div>
        <div className="vidPatrola opacity-0 video_youtube w-full">
          <iframe
            src="https://www.youtube.com/embed/hNrGZozxJW4?si=Sn0rjBDvSuu95mWg"
            title="YouTube video player"
            className="w-[100%] md:h-[800px] h-[300px]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Video;
