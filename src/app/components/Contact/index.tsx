"use client";

import Image from "next/image";

import { useRef } from "react";
import RDStationForm from "./RDStationForm";

import { useGSAP } from "@gsap/react";
import gsap, { Power3 } from "gsap";

const Contact = () => {
  const elementRef = useRef(null);
  const containerAnimation = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      setTimeout(() => {
        gsap
          .timeline()
          .fromTo(
            ".text1",
            { y: 100, opacity: 0 },
            { opacity: 1, y: 0, duration: 1, ease: Power3.easeOut }
          )
          .fromTo(
            ".imgArrow1",
            { x: 300, opacity: 0 },
            { opacity: 1, x: 0, duration: 1, ease: Power3.easeOut, delay: -0.3 }
          )
          .fromTo(
            ".imgArrow2",
            { x: 300, opacity: 0 },
            { opacity: 1, x: 0, duration: 1, ease: Power3.easeOut, delay: -0.3 }
          )
          .fromTo(
            ".imgContact",
            { x: -150, opacity: 0 },
            {
              opacity: 1,
              x: -40,
              duration: 1,
              ease: Power3.easeOut,
              delay: -0.3,
            }
          )
          .fromTo(
            ".text2",
            { y: 100, opacity: 0 },
            { opacity: 1, y: 0, duration: 1, ease: Power3.easeOut }
          )
          .fromTo(
            ".form1",
            { x: 150, opacity: 0 },
            { opacity: 1, x: 0, duration: 1, ease: Power3.easeOut, delay: -0.3 }
          );
      }, 500);
    },
    { scope: containerAnimation }
  );

  return (
    <>
      <div className="w-full max-w-[90%] flex flex-row justify-between m-auto items-center pt-20 max-md:pt-5">
        <div className="w-[15%] max-md:hidden"></div>
        <div className="w-[70%] max-md:w-full relative text-center max-md:flex max-md:justify-center">
          <p className="text1 opacity-0 text-[45px] font-abeezee leading-[50px] text-black text-center max-md:text-[22px] max-md:leading-7 max-md:max-w-[50%] max-sm:max-w-[60%]">
            Fale agora com nossos especialistas
          </p>
          <Image
            src="/images/arrows.svg"
            alt="Icon"
            className="imgArrow1 opacity-0 max-lg:max-w-[44px] rotate-90 hidden max-md:block absolute top-2 right-0 max-sm:top-0"
            width={150}
            height={500}
            loading="lazy"
          />
        </div>
        <div className="w-[15%] flex justify-end pr-10 max-md:hidden">
          <Image
            src="/images/arrows.svg"
            alt="Icon"
            className="imgArrow2 opacity-0 max-w-[40%] rotate-90"
            width={150}
            height={500}
            loading="lazy"
          />
        </div>
      </div>
      <div className="w-full max-w-[95%] flex flex-row justify-between items-center max-md:w-full max-md:flex-col-reverse">
        <div
          className="imgContact opacity-0 w-[70%] max-md:w-full"
          ref={elementRef}
        >
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
          <p className="text2 opacity-0 text-[#1A374D] text-[16px]">
            Gostou? Entre em contato e saiba mais.
          </p>
          <div className="form1 opacity-0">
            <RDStationForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
