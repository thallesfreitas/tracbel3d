"use client";

import Image from "next/image";

import { useEffect, useRef } from "react";
import RDStationForm from "./RDStationForm";

const Contact = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("slideInRight");
        } else {
          entry.target.classList.remove("slideInRight");
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
      <div className="w-full max-w-[90%] flex flex-row justify-between m-auto items-center pt-20 max-md:pt-5">
        <div className="w-[15%] max-md:hidden"></div>
        <div className="w-[70%] max-md:w-full relative text-center max-md:flex max-md:justify-center">
          <p className="text-[45px] font-abeezee leading-[50px] text-black text-center max-md:text-[22px] max-md:leading-7 max-md:max-w-[50%] max-sm:max-w-[60%] fadeIn">
            Fale agora com nossos especialistas
          </p>
          <Image
            src="/images/arrows.svg"
            alt="Icon"
            className="max-lg:max-w-[44px] rotate-90 hidden max-md:block absolute top-2 right-0 max-sm:top-0"
            width={150}
            height={500}
            loading="lazy"
          />
        </div>
        <div className="w-[15%] flex justify-end pr-10 max-md:hidden">
          <Image
            src="/images/arrows.svg"
            alt="Icon"
            className="max-w-[40%] rotate-90"
            width={150}
            height={500}
            loading="lazy"
          />
        </div>
      </div>
      <div className="w-full max-w-[95%] flex flex-row justify-between items-center max-md:w-full max-md:flex-col-reverse">
        <div className="w-[70%] max-md:w-full" ref={elementRef}>
          <Image
            src="/images/banner-contact.webp"
            alt="Icon"
            className="w-full"
            width={150}
            height={500}
            loading="lazy"
          />
        </div>
        <div className="w-[25%] max-md:w-[80%] max-md:my-5">
          <p className="text-[#1A374D] text-[16px]">
            Gostou? Entre em contato e saiba mais.
          </p>
          <RDStationForm />
        </div>
      </div>
    </>
  );
};

export default Contact;
