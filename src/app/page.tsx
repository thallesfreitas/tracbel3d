"use client";

import { useState } from "react";
import Banner from "./components/Banner";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import PosBanner from "./components/PosBanner";
import Video from "./components/Video";
// async function getTotalSize(urls: string[]): Promise<number> {
//   let totalSize = 0;
//   for (const url of urls) {
//     const response = await fetch(url, { method: "HEAD" });
//     totalSize += parseInt(response.headers.get("Content-Length") || "0", 10);
//   }
//   return totalSize;
// }

// async function fetchWithProgress(
//   url: string,
//   updateProgress: (loaded: number) => void
// ): Promise<void> {
//   const response = await fetch(url);
//   if (!response.body) throw new Error(`Failed to fetch ${url}`);

//   const reader = response.body.getReader();
//   let receivedLength = 0;

//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) break;
//     receivedLength += value.length;
//     updateProgress(value.length);
//   }
// }

const fileUrls = [
  "images/retroescavadeira.webp",
  "images/cabine/cabine1.webp",
  "images/cabine/cabine2.webp",
  "images/cabine/cabine3.webp",
  "images/cabine/cabine4.webp",
  "images/cabine/cabine5.webp",
  "images/cabine/cabine6.webp",
  "images/cabine/cabine7.webp",
  "images/cabine/cabine8.webp",
  "images/cabine/cabine9.webp",
  "images/cabine/cabine10.webp",
  "images/trator2.webp",
  "images/banner-contactv2.webp",
  "images/bg-banner_small.mp4",
];

function Page() {
  const [progress, setProgress] = useState(100);

  // useEffect(() => {
  //   let totalDownloaded = 0;

  //   // getTotalSize(fileUrls).then((totalSize) => {
  //   // console.log("totalSize: " + totalSize);

  //   fileUrls.forEach((url) => {
  //     fetchWithProgress(url, (loaded) => {
  //       totalDownloaded += loaded;

  //       // setProgress((totalDownloaded / totalSize) * 100);
  //       setProgress((totalDownloaded / 5484344) * 100);
  //     }).catch((error) => console.error(`Error loading ${url}:`, error));
  //   });
  //   // });
  // // }, []);
  // const router = useRouter();

  // useEffect(() => {
  //   const handleStart = () => NProgress.start();
  //   const handleStop = () => NProgress.done();

  //   router.events.on("routeChangeStart", handleStart);
  //   router.events.on("routeChangeComplete", handleStop);
  //   router.events.on("routeChangeError", handleStop);

  //   return () => {
  //     router.events.off("routeChangeStart", handleStart);
  //     router.events.off("routeChangeComplete", handleStop);
  //     router.events.off("routeChangeError", handleStop);
  //   };
  // }, [router]);
  return (
    <>
      {/* {progress < 99 ? (
        <div
          style={{
            width: "300px",
            height: "20px",
            backgroundColor: "#f2f2f2",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#f00",
            }}
          ></div>
        </div>
      ) : ( */}

      <div className="overflow-x-hidden">
        <Header />
        <Banner />
        <PosBanner />
        <Gallery />
        <Video />
        <Contact />
        <Footer />
      </div>
      {/* )} */}
    </>
  );
}

export default Page;
