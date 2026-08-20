import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import BannerSlider from "../components/BannerSlider/BannerSlider";
import CravingSlider from "../components/BannerSlider/CravingSlider";
import PromotionBanner from "../components/PromotionBanner/PromotionBanner";
import CelebrityFavouriteBanner from "../components/CelebrityFavouriteBanner/CelebrityFavouriteBanner";
import IndependenceBanner from "../assets/IndependenceBanner.png";
import IndependenceBanner2 from "../assets/IndependenceBanner2.png"
import IndependenceBanner3 from "../assets/IndependenceBanner3.png"
import IndependenceBanner4 from "../assets/IndependenceBanner4.png"

function Home() {

  return (

    <div className="min-h-screen bg-[#0F0F0F] text-white">


      <Navbar />


      <div className="mx-auto max-w-7xl px-6 pt-8">


        <span className="
            inline-flex
            items-center
            rounded-full
            border
            border-orange-500/30
            bg-orange-500/10
            px-2
            py-2
            text-sm
            font-semibold
            text-orange-400
            shadow-lg
        ">
            🔥 30% OFF On First Order
        </span>


        {/*
        <div className="mb-6 mt-6">

          <p className="
            mt-2
            text-xl
            font-semibold
            text-[#D4AF37]
          ">
            Limited Time Offers Only
          </p>
        
          <p className="
            mt-1
            text-sm
            text-gray-400
          ">
            Grab your favourite dishes before the offer ends
          </p>


        </div>
        */}

        <section className="px-3 pt-3 md:px-6 md:pt-5">
            <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[#D4AF37]/10 bg-[#151515] shadow-xl">

                <img
                    src={IndependenceBanner4}
                    alt="80th Independence Day"
                    className="
                        w-full
                        h-auto
                        object-cover
                        transition
                        duration-500
                    "
                />
            </div>
        </section>

        <PromotionBanner />

        <CelebrityFavouriteBanner/>

        <BannerSlider />

        <CravingSlider />


      </div>




      <Categories />


    </div>

  );

}


export default Home;