"use client";

import Image from "next/image";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap, { Power3 } from "gsap";

const Footer = () => {
  const elementRef = useRef(null);
  const containerAnimation = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      setTimeout(() => {
        gsap
          .timeline()
          .fromTo(
            ".allFooter",
            { y: 150, opacity: 0 },
            { opacity: 1, y: 0, duration: 1, ease: Power3.easeOut }
          )
          .fromTo(
            ".logo1",
            { y: 150, opacity: 0 },
            { opacity: 1, y: 0, duration: 1, ease: Power3.easeOut, delay: -0.3 }
          )
          .fromTo(
            ".logo2",
            { y: 150, opacity: 0 },
            { opacity: 1, y: 0, duration: 1, ease: Power3.easeOut, delay: -0.3 }
          );
      }, 100);
    },
    { scope: containerAnimation }
  );

  return (
    <>
      <nav className="allFooter opacity-0 w-full h-[120px] bg-[#DDD] py-5 flex justify-center z-20">
        <div className="container flex flex-row items-center justify-center w-full">
          <Image
            src="images/logo-tracbel.svg"
            alt="Logo"
            className="logo1 opacity-0 mr-10"
            width={164}
            height={54}
            loading="lazy"
          />
          <Image
            src="images/logo.svg"
            alt="Logo"
            className="logo2 opacity-0"
            width={164}
            height={54}
            loading="lazy"
          />
        </div>
      </nav>
    </>
  );
};

export default Footer;
