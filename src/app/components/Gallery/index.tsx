"use client";

import Image from "next/image";
import Carousel from '../Carousel';
import React, { useEffect, useRef } from 'react';

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
            <div className="w-full max-w-[90%] flex flex-row justify-between m-auto items-center pt-20 max-md:pt-4" ref={elementRef}>
                <div className="w-[25%] max-md:hidden">
                    <Image
                        src="/images/arrows.svg"
                        alt="Icon"
                        className="max-w-[20%] -rotate-90 max-md:max-w-[100%]"
                        width={100}
                        height={500}
                        loading="lazy"
                    />
                </div>
                <div className="w-[50%] max-md:w-[100%] relative">
                    <p className="text-[45px] font-abeezee leading-[50px] text-black text-center max-md:text-[22px]">Por dentro da cabine</p>
                    <Image
                        src="/images/arrows.svg"
                        alt="Icon"
                        className="max-w-[20%] hidden -rotate-90 max-md:flex max-md:max-w-[44px] absolute top-0"
                        width={100}
                        height={500}
                        loading="lazy"
                    />
                </div>
                <div className="w-[25%] max-md:hidden"></div>
            </div>
            <div className="w-full mt-5" ref={elementRef}>
                <Carousel slides={slides} />
            </div>
        </>
    );
}

export default Gallery;