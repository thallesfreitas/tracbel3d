"use client";

import { useEffect, useRef } from "react";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

const Banner = () => {
  const elementRef = useRef(null);

  //   useEffect(() => {
  //     const observer = new IntersectionObserver((entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           entry.target.classList.add("slideInLeft");
  //         } else {
  //           entry.target.classList.remove("slideInLeft");
  //         }
  //       });
  //     });;

  //     if (elementRef.current) {
  //       observer.observe(elementRef.current);
  //     }

  //     return () => {
  //       if (elementRef.current) {
  //         observer.unobserve(elementRef.current);
  //       }
  //     };
  //   }, []);

  const scrollToSection = () => {
    const section = document.getElementById("secao");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const blinkAnimation = {
    initial: {
      opacity: 0,
      x: 1000,
      filter: "none",
      transition: { duration: 0.75 },
    },
    start: {
      opacity: 1,
      x: 0,
      filter: "none",
      transition: { duration: 1, ease: ["circOut"], delay: 0.75 },
    },
    visible: {
      opacity: 1,
      filter: "none",
      transition: { duration: 0.09 },
    },
    hidden: {
      opacity: 1,
      filter: "brightness(2)",
      transition: { duration: 0.09 },
    },
    final: {
      opacity: 1,
      filter: "none",
      transition: { duration: 3.0, ease: ["easeIn", "circOut"] },
    },
  };

  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start("initial");
      await controls.start("start");
      await controls.start("hidden");
      await controls.start("visible");
      await controls.start("hidden");
      await controls.start("visible");
      await controls.start("hidden");
      await controls.start("visible");
      await controls.start("final");
    };

    sequence();
  }, [controls]);
  return (
    <>
      <div className="w-full h-[84vh] bg-banner bg-cover bg-no-repeat flex items-center flex-col relative max-lg:h-[36vh] max-sm:h-[32vh]">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: ["easeIn", "circOut"] }}
          className="absolute w-full h-[84vh] bg-[#ff2e00] bg-cover bg-no-repeat flex items-center flex-col z-1 max-lg:h-[36vh] max-sm:h-[32vh]"
        ></motion.div>
        <div className="container pt-20 w-[80%] z-20 max-md:pt-8 max-md:w-full max-md:px-5 z-2">
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.75,
              ease: ["easeIn", "circOut"],
            }}
            className="text-[3vw] font-abeezee leading-[2.5rem] 2xl:leading-[3.5rem] text-white max-md:text-[6vw] max-md:leading-8 2xl:text-[3vw]"
          >
            Chegou a retroescavadeira que
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 1.0,
              ease: ["easeIn", "circOut"],
            }}
            className="text-[3vw] font-abeezee leading-[2.5rem] 2xl:leading-[3.5rem] text-white max-md:text-[6vw] max-md:leading-8 2xl:text-[3vw]"
          >
            vai somar ao crescimento do
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 1.25,
              ease: ["easeIn", "circOut"],
            }}
            className="text-[3vw] font-abeezee leading-[2.5rem] 2xl:leading-[3.5rem] text-white max-md:text-[6vw] max-md:leading-8 2xl:text-[3vw]"
          >
            seu negócio!
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 1.5,
              ease: ["easeIn", "circOut"],
            }}
            className="text-[7vw] font-abeezee leading-[4vw] mt-10 mb-10 text-white max-md:mt-5 max-md:mb-10 2xl:text-[6vw] 2xl:leading-[5vw]"
          >
            HD96 E D100 4X4
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 1.75,
              ease: ["easeIn", "circOut"],
            }}
          >
            <button className="btn" onClick={scrollToSection}>
              <span className="btn-revert font-ubuntu font-bold text-[17px] text-white">
                Conheça
              </span>
            </button>
          </motion.div>
        </div>
        <motion.div
          //   className="absolute left-0 right-0 max-md:top-auto max-lg:-bottom-[145px] max-md:-bottom-[120px] max-sm:-bottom-[60px] banner-top"
          //   ref={elementRef}
          className="absolute  max-md:top-auto max-lg:-bottom-[145px] max-md:-bottom-[120px] max-sm:-bottom-[60px] w-[100%]"
          variants={blinkAnimation}
          initial={{ opacity: 0 }}
          animate={controls}
        >
          <Image
            src="/images/trator2.webp"
            alt="Icon"
            className="w-full"
            width={150}
            height={500}
            loading="lazy"
          />
        </motion.div>
      </div>
    </>
  );
};

export default Banner;
