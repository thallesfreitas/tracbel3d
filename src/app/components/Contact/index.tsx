"use client";

import Image from "next/image";

import { useRef } from "react";
import RDStationForm from "./RDStationForm";

import { useGSAP } from "@gsap/react";
import gsap, { Power3 } from "gsap";
// import { useInView } from "react-intersection-observer";
const Contact = () => {
  const elementRef = useRef(null);
  const containerAnimation = useRef<HTMLDivElement>(null);
  // const [ref, inView] = useInView();
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
      <div
        className="bg-contact bg-contact2  bg-cover mt-20 relative mb-5"
        ref={containerAnimation}
      >
        <Image
          src="images/grafismos.webp"
          alt="Icon"
          className="w-[40%] absolute bottom-0"
          width={300}
          height={500}
          loading="lazy"
        />
        <div
          className="w-full max-w-[90%] flex flex-row justify-between m-auto items-center pt-10 max-md:pt-5"
          // ref={ref}
        >
          <div className="w-[70%] max-md:w-full relative text-center max-md:flex max-md:justify-center">
            <p className="text-[45px] font-ubuntu leading-[50px] text-left text-black max-md:text-[22px] max-md:leading-7 fadeIn">
              Descubra mais sobre a Bull conversando com{" "}
              <strong className="text-bold">
                BullGPT, nossa inteligência artificial especializada
              </strong>
            </p>
          </div>
        </div>
        <div className="w-full max-w-[95%] flex flex-row justify-between items-center max-md:w-full max-md:flex-col-reverse">
          <div
            className="imgContact opacity-0 w-[70%] max-md:w-full"
            ref={elementRef}
          >
            <Image
              src="images/banner-contactv2.webp"
              alt="Icon"
              className="w-full z-10 relative"
              width={150}
              height={500}
              loading="lazy"
            />
          </div>

          <div className="w-[25%] max-md:w-[95%] max-md:my-5 -mt-[250px] max-md:mt-10">
            <p className="text-[#1A374D] text-[18px] font-ubuntu mb-5">
              <b>Cadastre-se,</b> acesse nossa IA e em breve, nossos
              especialistas entrarão em contato para mais informações.
            </p>
            <div className="box-form relative">
              <RDStationForm />
              <Image
                src="images/icon-ia.svg"
                alt="Icon"
                className="absolute bottom-[10px] left-0"
                width={45}
                height={45}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
