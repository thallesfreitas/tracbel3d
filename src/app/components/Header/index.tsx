"use client";
import { motion } from "framer-motion";
import Image from "next/image";
const Header = () => {
  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: ["easeIn", "circOut"] }}
        className="w-full h-120 bg-[#DDD] py-5 flex justify-center z-20"
      >
        <div className="container flex flex-row justify-between items-center w-full max-md:px-5">
          <Image
            src="images/logo.svg"
            alt="Logo"
            className=""
            width={164}
            height={54}
            loading="lazy"
          />
          <Image
            src="images/logo-tracbel.svg"
            alt="Logo"
            className="mr-10"
            width={164}
            height={54}
            loading="lazy"
          />
        </div>
      </motion.nav>
    </>
  );
};

export default Header;
