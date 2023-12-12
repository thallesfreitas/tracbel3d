import Image from "next/image";

const Header = () => {
    return (
        <>
            <nav className="w-full h-120 bg-[#DDD] py-5 flex justify-center z-20">
                <div className="container flex flex-row items-center w-full max-md:px-5">
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

export default Header;