"use client";

import React, { useEffect, useRef } from 'react';

const Video = () => {
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fadeIn');
                } else {
                    entry.target.classList.remove('fadeIn');
                }
            });
        });

        if (elementRef.current) {
        observer.observe(elementRef.current);
        }

        return () => {
        if (elementRef.current) {
            observer.unobserve(elementRef.current);
        }
        };
    }, []);
    return (
        <>
            <div className="w-full max-w-[90%] flex flex-col justify-center m-auto pt-20 max-md:max-w-[100%]" ref={elementRef}>
                <div className="mb-10 max-md:px-5 max-md:mb-5 flex justify-center">
                    <p className="text-[27px] font-abeezee leading-[40px] text-black text-center max-md:text-[20px] max-w-[69vw] max-md:max-w-[100vw]">A HD96 e a D100 4X4 Bull Machines são as novas retroescavadeiras com o selo de qualidade e confiança Tracbel. Confira a máquina em ação:</p>
                </div>
                <div className="video">
                    <iframe src="https://www.youtube.com/embed/XILgsqVxQcE?si=BBOo_thaYO4L66VR" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                </div>
            </div>
            
        </>
    );
}

export default Video;