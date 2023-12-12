import Image from "next/image";

const Footer = () => {
    return (
        <>
            <nav className="w-full h-[120px] bg-[#DDD] py-5 flex justify-center z-20">
                <div className="container flex flex-row items-center justify-center w-full">
                    <Image
                        src="/images/logo-tracbel.svg"
                        alt="Logo"
                        className="mr-10"
                        width={164}
                        height={54}
                        loading="lazy"
                    />
                    <Image
                        src="/images/logo.svg"
                        alt="Logo"
                        className=""
                        width={164}
                        height={54}
                        loading="lazy"
                    />
                </div>
            </nav>
        </>
    );
}

export default Footer;