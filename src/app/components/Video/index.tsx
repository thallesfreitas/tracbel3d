"use client";

import React, { useEffect, useRef } from 'react';

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Power3, Back } from "gsap";

const Video = () => {
    const elementRef = useRef(null);
    const containerAnimation = useRef<HTMLDivElement>(null);
  
    useGSAP(() => {
      setTimeout(() => {
        gsap.timeline()
            .fromTo('.text1', {y:100, opacity:0}, {opacity:1, y:0, duration:1, ease:Power3.easeOut})
            .fromTo('.video', {y:-100, opacity:0}, {opacity:1, y:0, duration:1, ease:Power3.easeOut, delay:-.3})
      }, 6000)
  
    },
    { scope: containerAnimation }
    );

    return (
        <>
            <div className="w-full max-w-[90%] flex flex-col justify-center m-auto pt-20 max-md:max-w-[100%]" ref={elementRef}>
                <div className="text1 opacity-0 mb-10 max-md:px-5 max-md:mb-5 flex justify-center">
                    <p className="text-[27px] font-abeezee leading-[40px] text-black text-center max-md:text-[20px] max-w-[69vw] max-md:max-w-[100vw]">A HD96 e a D100 4X4 Bull Machines são as novas retroescavadeiras com o selo de qualidade e confiança Tracbel. Confira a máquina em ação:</p>
                </div>
                <div className="video opacity-0">
                    <iframe src="https://www.youtube.com/embed/XILgsqVxQcE?si=BBOo_thaYO4L66VR" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                </div>
            </div>
            
        </>
    );
}

export default Video;