"use client";

import Image from "next/image";

import ThreeScene from "../../components/Obj3d/ThreeScene";

import { useEffect, useRef } from "react";

const PosBanner = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fadeIn");
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
      <div className="flex justify-center z-20">
        <div className="rotate relative mt-[100px] max-md:mt-[45px]">
          <div className="img-rotate">
            <Image
              src="/images/img-rotate.png"
              alt="Icon"
              className=""
              width={150}
              height={500}
              priority
            />
          </div>
          <Image
            src="/images/icon-rotate.svg"
            alt="Icon"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            width={100}
            height={100}
            priority
          />
        </div>
      </div>
      <div
        id="secao"
        className="w-full max-w-[90%] flex flex-row justify-between m-auto max-md:flex-col-reverse"
      >
        <div className="w-[20%]">
          <Image
            src="/images/arrow.svg"
            alt="Icon"
            className="max-w-[50%] mt-[160px] max-md:hidden"
            width={50}
            height={500}
            priority
          />
        </div>
        <div className="pt-20 w-[60%] max-md:pt-0 max-md:w-full">
          <p
            className="text-[45px] mt-14 font-abeezee leading-[50px] text-black text-center max-md:text-[22px] max-md:mt-3"
            ref={elementRef}
          >
            A força da Índia agora no Brasil
          </p>
        </div>
        <div className="w-[20%] flex justify-end max-md:w-full">
          <Image
            src="/images/arrows.svg"
            alt="Icon"
            className="max-w-[50%] max-md:max-w-[10%] max-md:-mt-[150px]"
            width={140}
            height={500}
            loading="lazy"
          />
        </div>
      </div>
      <div className="w-full max-w-[90%] flex justify-between container m-auto mt-10 max-md:flex-col max-md:max-w-[100%]">
        <div className="w-[70%] max-md:w-full">
          <div className="mt-[5%] max-md:hidden">
            <div className="absolute left-[71px] rotate-[352deg]">
              <Image
                src="/images/text.svg"
                alt="Icon"
                className="max-w-[25%] max-md:max-w-[10%]"
                width={140}
                height={500}
                loading="lazy"
              />
            </div>
            <div className="absolute w-[180px] h-[180px] bg-[#D9D9D9] rounded-full -left-[5.5rem] pr-7 flex justify-end items-center">
              <Image
                src="/images/box.svg"
                alt="Icon"
                className="max-w-[35%] max-md:max-w-[10%]"
                width={140}
                height={500}
                loading="lazy"
              />
            </div>
          </div>
          <ThreeScene />
        </div>
        <div className="w-[30%] max-md:w-full">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/XILgsqVxQcE?si=BBOo_thaYO4L66VR"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
      <div className="flex justify-end max-md:hidden">
        <Image
          src="/images/ornament.svg"
          alt="Icon"
          className="max-w-[40%] mt-5"
          width={500}
          height={500}
          priority
        />
      </div>
    </>
  );
};

export default PosBanner;
