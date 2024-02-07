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

  const handleClick = () => {
    window.open("https://bullgpt.tracbel.com.br/", "_blank");
  };

  useGSAP(
    () => {
      //seta elementos
      setTimeout(() => {
        gsap.set(".txtTitleContact", { y: 200, opacity: 0 });
        gsap.set(".imgContact", { x: -200, opacity: 0 });
        // gsap.set(".imgBGContact", { x: -200, opacity: 0 });
        gsap.set(".txtTitleForm", { x: 200, opacity: 0 });
        gsap.set(".allForm", { y: 200, opacity: 0 });
      }, 100);

      setTimeout(() => {
        gsap.to(".txtTitleContact", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: Power3.easeOut,
          scrollTrigger: {
            trigger: ".txtTitleContact",
            start: "top 700px",
            end: "top 100px",
            // scrub: true,
          },
        });
        gsap.to(".imgContact", {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: Power3.easeOut,
          scrollTrigger: {
            trigger: ".imgContact",
            start: "top 500px",
            end: "top 100px",
            scrub: true,
          },
        });
        gsap.to(".txtTitleForm", {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: Power3.easeOut,
          scrollTrigger: {
            trigger: ".txtTitleForm",
            start: "top 900px",
            end: "top 100px",
          },
        });
        gsap.to(".allForm", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: Power3.easeOut,
          scrollTrigger: {
            trigger: ".txtTitleContact",
            start: "top 800px",
            end: "top 100px",
            scrub: true,
          },
        });
        // gsap.to(".imgBGContact", {
        //   opacity: 1,
        //   x: 0,
        //   duration: 1,
        //   ease: Power3.easeOut,
        //   scrollTrigger: {
        //     trigger: ".imgBGContact",
        //     start: "top 500px",
        //     end: "top 100px",
        //     markers: true,
        //     scrub: true,
        //   },
        // });
      }, 200);
    },
    { scope: containerAnimation }
  );

  return (
    <>
      <div
        className="bg-contact bg-contact2  bg-cover relative mb-5"
        ref={containerAnimation}
      >
        {/* <Image
          src="images/grafismos.webp"
          alt="Icon"
          className="imgBGContact w-[40%] absolute bottom-0"
          width={300}
          height={500}
          loading="lazy"
        /> */}
        <div
          className="w-full max-w-[95%] flex flex-row justify-between m-auto items-center pt-10 max-md:pt-5 max-md:flex-col"
          // ref={ref}
        >
          {/* <div className="txtTitleContact bg-contactIa bg-cover bg-right flex justify-center items-center opacity-0 w-[60%] min-h-[805px] max-md:w-full relative text-center max-md:flex max-md:justify-center max-md:min-h-[400px]"> */}
          <div className="txtTitleContact  bg-[url('/projetos/tracbel/lp/images/fundo-ia.jpg')] bg-cover bg-right flex justify-center items-center opacity-0 w-[60%] min-h-[805px] max-md:w-full relative text-center max-md:flex max-md:justify-center max-md:min-h-[400px]">
            <div>
              <p className="text-shadow text-[45px] font-ubuntu leading-[50px] text-left text-white max-md:text-[30px] max-md:leading-8 fadeIn">
                Descubra mais sobre
                <br /> a Bull conversando
                <br /> com{" "}
                <strong className="text-bold">
                  BullGPT, nossa
                  <br /> inteligência artificial
                  <br /> especializada
                </strong>
              </p>
              <button className="btn btn-gpt mt-8" onClick={handleClick}>
                <span className="btn-revert font-ubuntu font-bold text-[17px] text-white">
                  Acessar bullgpt
                </span>
              </button>
            </div>
          </div>
          <div className="w-[38%] min-h-[800px] py-8 bg-gradient-to-b from-[#FFC000] to-[#FF9900] flex flex-col justify-center items-center max-md:w-[100%] max-md:my-5 max-md:mt-5 relative">
            <Image
              src="images/grafismo-white.svg"
              alt="Icon"
              className="imgBGContact w-[95%] absolute top-1 right-1"
              width={300}
              height={500}
              loading="lazy"
            />
            <p className="txtTitleForm opacity-0 text-black font-bold text-[28px] text-center font-ubuntu mb-3 leading-7">
              Fale com
              <br /> o nosso consultor!
            </p>
            <p className="txtTitleForm opacity-0 text-black text-[20px] text-center font-ubuntu mb-4 leading-7">
              Preencha os dados abaixo
              <br /> que entraremos em contato
            </p>
            <div className="allForm opacity-0 box-form relative">
              <RDStationForm />
            </div>
          </div>
        </div>
        <div className="w-full max-w-[95%] flex flex-row justify-between items-center max-md:w-full max-md:flex-col-reverse">
          {/* <div
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
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Contact;
