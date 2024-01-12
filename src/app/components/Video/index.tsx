"use client";

import { useRef } from "react";

const Video = () => {
  const elementRef = useRef(null);
  const containerAnimation = useRef<HTMLDivElement>(null);

  // useGSAP(() => {
  //   setTimeout(() => {
  //     gsap.timeline()
  //         .fromTo('.text1', {y:100, opacity:0}, {opacity:1, y:0, duration:1, ease:Power3.easeOut})
  //         .fromTo('.video', {y:-100, opacity:0}, {opacity:1, y:0, duration:1, ease:Power3.easeOut, delay:-.3})
  //   }, 6000)

  // },
  // { scope: containerAnimation }
  // );

  return (
    <>
      <div
        className="w-full max-w-[90%] flex flex-col justify-center m-auto pt-20 max-md:max-w-[100%]"
        ref={elementRef}
      >
        <div className="text1 opacity-0 mb-10 max-md:px-5 max-md:mb-5 flex justify-center">
          <p className="text-[27px] font-abeezee leading-[40px] text-black text-center max-md:text-[20px] max-w-[69vw] max-md:max-w-[100vw]">
            A HD96 e a D100 4X4 Bull Machines são as novas retroescavadeiras com
            o selo de qualidade e confiança Tracbel. Confira a máquina em ação:
          </p>
        </div>
        <div className="video_youtube w-full">
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
