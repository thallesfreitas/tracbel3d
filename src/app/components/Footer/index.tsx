"use client";

import Image from "next/image";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";

const Footer = () => {
  const elementRef = useRef(null);
  const containerAnimation = useRef<HTMLDivElement>(null);

  const infos = [
    {
      img: "images/footer/icon1.svg",
      title: "+55 anos",
      subtitle: "de mercado",
    },
    {
      img: "images/footer/icon2.svg",
      title: "+30 filiais",
      subtitle: "espalhados pelo Brasil",
    },
    {
      img: "images/footer/icon4.svg",
      title: "+100.000 skus",
      subtitle: "no E-commerce",
    },
    {
      img: "images/footer/icon5.svg",
      title: "+12.000 máquinas",
      subtitle: "vendidas nos últimos 10 anos",
    },
  ];

  const infos2 = [
    {
      img: "images/footer/icon6.svg",
      title: "Assistência Técnica",
      subtitle: "e Pós Venda exclusivos Bull",
    },
    {
      img: "images/footer/icon7.svg",
      title: "Treinamentos",
      subtitle: "específicos para Mecânicos",
    },
    {
      img: "images/footer/icon8.svg",
      title: "Selo de qualidade",
      subtitle: "Tracbel",
    },
  ];

  useGSAP(
    () => {
      //seta elementos
      // setTimeout(() => {
      //   gsap.set(".imgLogoTracbel", { y: 200, opacity: 0 });
      //   gsap.set(".allIcons", { opacity: 0 });
      // }, 100);
      //   setTimeout(() => {
      //     gsap.to(".allIcons", {
      //       opacity: 1,
      //       duration: 1,
      //       ease: Power3.easeOut,
      //       scrollTrigger: {
      //         trigger: ".allIcons",
      //         // start: "top top",
      //         // end: "top 10px",
      //         scrub: true,
      //         markers: true,
      //       },
      //     });
      // }, 200)
    },
    { scope: containerAnimation }
  );

  return (
    <>
      <div className="allContact w-full bg-white py-5 z-20">
        <div className="container flex flex-row items-center justify-center m-auto w-full border-t-2 border-t-[#989898] py-10 max-md:max-w-[90%]">
          <Image
            src="images/logo-tracbel.svg"
            alt="Logo"
            className=""
            width={164}
            height={54}
            loading="lazy"
          />
        </div>
        <div className="allIcons w-full max-w-[70%] m-auto flex justify-between items-center max-md:flex-wrap max-md:justify-around max-md:max-w-[95%]">
          {infos.map((info, index) => (
            <div
              key={index}
              className="flex flex-col items-center max-md:w-[50%] max-md:text-center max-md:mb-5"
            >
              <div className="h-[90px] flex items-center">
                <Image
                  src={info.img}
                  alt="Logo"
                  className="object-contain"
                  width={65}
                  height={65}
                  loading="lazy"
                />
              </div>
              <p className="text-black font-archivo-black font-extrabold text-[22px]">
                {info.title}
              </p>
              <p className="text-black font-archivo text-[17px] -mt-[2px]">
                {info.subtitle}
              </p>
            </div>
          ))}
        </div>
        <div className="allIcons w-full max-w-[60%] m-auto mt-10 flex justify-between max-md:flex-wrap max-md:justify-around max-md:max-w-[95%] max-md:mt-0">
          {infos2.map((info, index) => (
            <div
              key={index}
              className="flex flex-col items-center max-md:w-[50%] max-md:text-center max-md:mb-5"
            >
              <div className="h-[90px] flex items-center">
                <Image
                  src={info.img}
                  alt="Logo"
                  className="object-contain"
                  width={55}
                  height={55}
                  loading="lazy"
                />
              </div>
              <p className="text-black font-archivo-black font-extrabold text-[22px]">
                {info.title}
              </p>
              <p className="text-black font-archivo text-center leading-5 w-[80%] text-[17px] -mt-[2px]">
                {info.subtitle}
              </p>
            </div>
          ))}
        </div>
        <div className="w-full max-w-[85%] m-auto flex justify-between items-center">
          <div className="box-text my-14 max-md:my-6">
            <p className="font-abeezee text-black text-[20px] leading-8 text-legend max-md:text-[13px] max-md:leading-4">
              Com uma trajetória de mais de 55 anos, o Grupo Tracbel é uma das
              empresas responsáveis pelo desenvolvimento do País, através da
              distribuição de equipamentos e soluções de transporte que aumentam
              a produtividade e melhoram a qualidade de vida da população.
            </p>
          </div>
        </div>
        <div className="container flex flex-row items-center justify-center m-auto w-full border-t-2 border-t-[#989898] max-md:max-w-[90%] max-md:mb-5"></div>
      </div>
    </>
  );
};

export default Footer;
