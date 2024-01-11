// import { Provider } from "react-redux";
import Banner from "./components/Banner";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Gallery from "./components/Footer/Gallery";
import Header from "./components/Header";
import PosBanner from "./components/PosBanner";
import Video from "./components/Video";
// import { store } from "./store";

function Page() {
  return (
    <>
      <div className="overflow-x-hidden ">
        <Header />
        <Banner />
        <PosBanner />
        <Gallery />
        <Video />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default Page;
