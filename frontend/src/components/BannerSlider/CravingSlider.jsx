import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import FoodTypeBadge from "../FoodTypeBadge/FoodTypeBadge";

import rosogollaBanner from "../../assets/rosogolla-banner.png";
import chowmeinBanner from "../../assets/eggchowmein-banner.png";
import alurChopBanner from "../../assets/alurchop-banner.png";
import pizzaBanner from "../../assets/chickenpizza-banner.png";
import paneerRollBanner from "../../assets/paneerroll-banner.png";
import amulIcecreamBanner from "../../assets/amulicecream-banner.png";


const cravings = [
  {
    image: rosogollaBanner,
    category: "Bengali Sweet",
    title: "Soft & Juicy Rosogolla",
    oldPrice: "₹149",
    price: "₹99",
    save: "SAVE ₹50",
    type: "veg",
    button: "from-yellow-500 to-orange-500",
  },
  {
    image: chowmeinBanner,
    category: "Indo Chinese",
    title: "Hot Egg Chowmein",
    oldPrice: "₹219",
    price: "₹159",
    save: "SAVE ₹60",
    type: "nonveg",
    button: "from-red-500 to-orange-500",
  },
  {
    image: alurChopBanner,
    category: "Bengali Street Special",
    title: "Crispy Alur Chop",
    oldPrice: "₹120",
    price: "₹79",
    save: "SAVE ₹41",
    type: "veg",
    button: "from-green-500 to-emerald-500",
  },
  {
    image: pizzaBanner,
    category: "Cheesy Craving",
    title: "Loaded Chicken Pizza",
    oldPrice: "₹449",
    price: "₹349",
    save: "SAVE ₹100",
    type: "nonveg",
    button: "from-red-600 to-pink-500",
  },
  {
    image: paneerRollBanner,
    category: "Street Food",
    title: "Cheese Paneer Roll",
    oldPrice: "₹229",
    price: "₹179",
    save: "SAVE ₹50",
    type: "veg",
    button: "from-orange-500 to-green-500",
  },
  {
    image: amulIcecreamBanner,
    category: "Sweet Treat",
    title: "Amul Ice Cream",
    oldPrice: "₹149",
    price: "₹99",
    save: "SAVE ₹50",
    type: "veg",
    button: "from-pink-500 to-purple-500",
  },
];


function CravingSlider() {

  const [index, setIndex] = useState(0);


  const nextSlide = () => {
    setIndex((prev) =>
      prev === cravings.length - 1 ? 0 : prev + 1
    );
  };


  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? cravings.length - 1 : prev - 1
    );
  };


  useEffect(() => {

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);


    return () => clearInterval(timer);

  }, []);



  return (

    <section className="
      relative
      w-full
      mt-8
      overflow-hidden
    ">


      {/* HEADER */}

      <div className="mb-5">

        <h2 className="
          text-3xl
          font-bold
          text-white
          md:text-4xl
        ">
          🍽️ Cravings?? Umm! Hmm!
        </h2>


        <p className="
          mt-2
          text-gray-400
        ">
          Your favourite food, just one click away
        </p>

      </div>




      {/* LEFT BUTTON */}

      <button
        onClick={prevSlide}
        className="
          absolute
          left-3
          top-1/2
          z-20
          -translate-y-1/2

          flex
          h-12
          w-12
          items-center
          justify-center

          rounded-full

          bg-white/20
          backdrop-blur-xl

          text-white

          shadow-xl

          transition

          hover:scale-110
          hover:bg-white/40
        "
      >
        <ChevronLeft size={28}/>
      </button>





      {/* SLIDER */}

      <div
        className="
          flex
          gap-4

          transition-transform
          duration-700
          ease-in-out
        "

        style={{
          transform:`translateX(-${index * 49.5}%)`
        }}

      >


        {
          cravings.map((item,i)=>(


            <div
              key={i}

              className="
                relative

                min-w-[49.5%]

                h-[330px]

                overflow-hidden

                rounded-3xl

                shadow-2xl

                group
              "
            >



              <img
                src={item.image}
                alt={item.title}

                className="
                  h-full
                  w-full

                  object-cover

                  transition
                  duration-700

                  group-hover:scale-105
                "
              />





              {/* OVERLAY */}

              <div
                className="
                  absolute
                  inset-0

                  bg-gradient-to-r

                  from-black/85
                  via-black/40
                  to-transparent
                "
              />






              {/* CONTENT */}

              <div
                className="
                  absolute
                  inset-0

                  flex
                  items-center

                  p-6
                "
              >


                <div className="max-w-[65%]">


                  <p className="
                    text-sm
                    text-gray-300
                  ">
                    {item.category}
                  </p>




                  <h3 className="
                    mt-2

                    text-3xl

                    font-bold

                    text-white
                  ">
                    {item.title}
                  </h3>





                  <div className="
                    mt-4

                    flex
                    items-center

                    gap-3
                  ">


                    <span className="
                      text-gray-400

                      line-through
                    ">
                      {item.oldPrice}
                    </span>



                    <span className="
                      text-4xl

                      font-extrabold

                      text-white
                    ">
                      {item.price}
                    </span>



                    <span className="
                      rounded-full

                      bg-green-500/20

                      px-3
                      py-1

                      text-sm

                      text-green-300
                    ">
                      {item.save}
                    </span>


                  </div>





                  <button
                    className={`
                      mt-6

                      rounded-xl

                      bg-gradient-to-r

                      ${item.button}

                      px-6
                      py-3

                      font-semibold

                      text-white

                      shadow-lg

                      transition

                      hover:scale-105
                    `}
                  >
                    Order Now
                  </button>


                </div>


              </div>






              {/* FOOD TYPE */}

              <div className="
                absolute

                right-5

                top-5
              ">

                <FoodTypeBadge type={item.type}/>

              </div>





              {/* BRAND */}

              <div className="
                absolute

                bottom-5

                right-6

                text-sm

                text-white
              ">

                Only on

                <span className="
                  ml-1

                  font-bold

                  text-[#D4AF37]
                ">
                  Zestora
                </span>

              </div>



            </div>


          ))
        }


      </div>






      {/* RIGHT BUTTON */}

      <button
        onClick={nextSlide}

        className="
          absolute

          right-3

          top-1/2

          z-20

          -translate-y-1/2


          flex

          h-12

          w-12

          items-center

          justify-center


          rounded-full


          bg-white/20


          backdrop-blur-xl


          text-white


          shadow-xl


          transition


          hover:scale-110

          hover:bg-white/40
        "
      >

        <ChevronRight size={28}/>

      </button>



    </section>

  );
}


export default CravingSlider;