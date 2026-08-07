import { useMemo, useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import FoodCard from "../components/FoodCard/FoodCard";

import { foods } from "../data/foods";


function Menu() {

  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");



  const categories = [

    {
      name: "All",
      value: "all",
      icon: "🍽️"
    },

    {
      name: "Bengali",
      value: "Bengali",
      icon: "🍛"
    },

    {
      name: "Biriyani",
      value: "Biriyani",
      icon: "🍚"
    },

    {
      name: "Burger",
      value: "Burger",
      icon: "🍔"
    },

    {
      name: "Pizza",
      value: "Pizza",
      icon: "🍕"
    },

    {
      name: "Chinese",
      value: "Chinese",
      icon: "🥡"
    },

    {
      name: "Rolls",
      value: "Rolls",
      icon: "🌯"
    },

    {
      name: "Desserts",
      value: "Desserts",
      icon: "🍨"
    },

    {
      name: "Drinks",
      value: "Drinks",
      icon: "🥤"
    }

  ];





  const filteredFoods = useMemo(()=>{


    let result = [...foods];



    // Veg / Non Veg / Bestseller

    if(filter === "veg"){

      result = result.filter(
        food => food.type === "veg"
      );

    }



    if(filter === "nonveg"){

      result = result.filter(
        food => food.type === "nonveg"
      );

    }



    if(filter === "bestseller"){

      result = result.filter(
        food => food.bestseller === true
      );

    }





    // Category Filter

    if(category !== "all"){

      result = result.filter(
        food => food.category === category
      );

    }





    // Search

    if(search.trim()){

      result = result.filter(food =>

        food.name
        .toLowerCase()
        .includes(search.toLowerCase())

        ||

        food.category
        .toLowerCase()
        .includes(search.toLowerCase())

      );

    }



    return result;


  },[
    filter,
    category,
    search
  ]);







  return (

    <div
    className="
    min-h-screen
    bg-[#0F0F0F]
    text-white
    "
    >



      <Navbar />




      <main
      className="
      mx-auto
      max-w-7xl

      px-5
      py-10

      md:px-8
      "
      >




        {/* PAGE HEADER */}


        <section
        className="
        mb-10
        "
        >



          <span
          className="
          inline-flex
          items-center

          rounded-full

          border
          border-[#D4AF37]/30

          bg-[#D4AF37]/10

          px-4
          py-2

          text-sm
          font-medium

          text-[#D4AF37]
          "
          >

            🍽️ Crafted Fresh Every Day

          </span>


            <h1
                className="
                mt-5

                text-3xl
                font-bold

                tracking-tight

                bg-gradient-to-r
                from-[#D4AF37]
                via-[#F5D77A]
                to-[#B8860B]

                bg-clip-text
                text-transparent

                md:text-4xl
                "
                >
                Zestora's Signature Menu
            </h1>

          <p
          className="
          mt-3

          max-w-2xl

          leading-relaxed

          text-gray-400
          "
          >

            Authentic Bengali flavours, royal biriyani,
            handcrafted snacks, desserts and chef special
            dishes from Zestora.

          </p>



        </section>








        {/* STICKY CONTROL AREA */}


        <section
        className="

        sticky

        top-20

        z-40


        mb-10


        rounded-3xl

        border
        border-white/10


        bg-[#141414]/95


        p-4


        shadow-xl


        backdrop-blur-xl

        "
        >



          {/* FILTERS + SEARCH */}


          <div
          className="
          flex

          flex-col

          gap-4

          lg:flex-row

          lg:items-center

          lg:justify-between
          "
          >



            <div
            className="
            flex
            flex-wrap
            gap-3
            "
            >




              <button
              onClick={()=>setFilter("all")}
              className={`
              rounded-full
              px-5
              py-2

              text-sm
              font-semibold

              transition-all

              ${
                filter==="all"

                ?

                "bg-[#D4AF37] text-black"

                :

                "bg-[#1C1C1C] text-gray-300"

              }

              `}
              >

                🍽️ All

              </button>





              <button
              onClick={()=>setFilter("veg")}
              className={`
              rounded-full
              px-5
              py-2

              text-sm
              font-semibold

              transition-all

              ${
                filter==="veg"

                ?

                "bg-green-600 text-white"

                :

                "bg-[#1C1C1C] text-gray-300"

              }

              `}
              >

                🟢 Veg

              </button>





              <button
              onClick={()=>setFilter("nonveg")}
              className={`
              rounded-full
              px-5
              py-2

              text-sm
              font-semibold

              transition-all

              ${
                filter==="nonveg"

                ?

                "bg-red-600 text-white"

                :

                "bg-[#1C1C1C] text-gray-300"

              }

              `}
              >

                🔴 Non-Veg

              </button>






              <button
              onClick={()=>setFilter("bestseller")}
              className={`
              rounded-full
              px-5
              py-2

              text-sm
              font-semibold

              transition-all


              ${
                filter==="bestseller"

                ?

                "bg-[#D4AF37] text-black"

                :

                "bg-[#1C1C1C] text-gray-300"

              }

              `}
              >

                ⭐ Bestseller

              </button>



            </div>







            <div
            className="
            flex
            gap-3
            items-center
            "
            >



              <input

              type="text"

              placeholder="Search food..."

              value={search}

              onChange={(e)=>setSearch(e.target.value)}

              className="
              w-full

              rounded-xl

              border
              border-white/10


              bg-[#1C1C1C]


              px-4
              py-3


              text-sm


              outline-none


              focus:border-[#D4AF37]

              "

              />





              <div
              className="
              whitespace-nowrap

              rounded-full

              border
              border-[#D4AF37]/30


              bg-[#D4AF37]/10


              px-4
              py-2


              text-sm

              font-semibold

              text-[#D4AF37]

              "
              >

                🍽️ {filteredFoods.length}

              </div>



            </div>



          </div>








          {/* CATEGORY CHIPS */}


          <div
          className="
          mt-5

          flex

          gap-3

          overflow-x-auto

          pb-2

          "
          >


            {
              categories.map((item)=>(


                <button

                key={item.value}

                onClick={()=>setCategory(item.value)}

                className={`

                whitespace-nowrap

                rounded-full

                px-4

                py-2

                text-sm

                font-medium


                transition-all



                ${
                  category===item.value

                  ?

                  "bg-[#D4AF37] text-black"

                  :

                  "bg-[#1C1C1C] text-gray-300"

                }


                `}

                >

                  {item.icon} {item.name}

                </button>


              ))
            }



          </div>




        </section>







        {/* FOOD GRID */}



        {

        filteredFoods.length > 0

        ?

        (

        <div
        className="
        grid

        grid-cols-1

        gap-6

        sm:grid-cols-2

        lg:grid-cols-3

        xl:grid-cols-4

        "
        >

          {
            filteredFoods.map(food=>(

              <FoodCard

              key={food.id}

              food={food}

              />

            ))
          }

        </div>

        )


        :


        (

        <div
        className="
        rounded-3xl

        border

        border-white/10

        bg-[#151515]

        py-20

        text-center

        "
        >

          <h2
          className="
          text-2xl
          font-bold
          "
          >

            😔 No dishes found

          </h2>


          <p
          className="
          mt-2
          text-gray-400
          "
          >

            Try another category or search.

          </p>


        </div>

        )

        }




      </main>


    </div>

  );

}


export default Menu;