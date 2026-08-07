import Navbar from "../components/Navbar/Navbar";
import SpecialDishCard from "../components/Specials/SpecialDishCard";
import foods from "../data/foods";

function Specials() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0F0F0F] px-5 py-10 text-white md:px-8">

        {/* Header */}

        <section className="mx-auto max-w-7xl text-center">

          <p className="text-sm font-semibold tracking-[0.25em] text-[#D4AF37]">
            CHEF'S CREATION
          </p>

          <h1
            className="
            mt-3
            text-4xl
            font-black
            md:text-5xl
            "
          >
            Today's Special Dishes
          </h1>

          <p
            className="
            mx-auto
            mt-4
            max-w-2xl
            text-gray-400
            "
          >
            Our chef has crafted these exclusive dishes
            with passion and premium ingredients,
            specially made only for you.
          </p>

        </section>


        {/* Special Dish Container */}

        <section className="mx-auto mt-12 max-w-7xl">

          <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-[#151515]
            p-8
            "
          >

            <h2 className="text-2xl font-bold text-[#D4AF37]">
              👨‍🍳 Chef Recommended
            </h2>


            <p className="mt-3 text-gray-500">
              Special dishes will appear here.
            </p>


          </div>

        </section>

        <section className="mx-auto mt-12 max-w-7xl">

        <h2
            className="
            mb-6
            text-2xl
            font-bold
            text-[#D4AF37]
            "
        >
            👨‍🍳 Chef Recommended
        </h2>


        <div
            className="
            grid
            gap-6

            sm:grid-cols-2
            lg:grid-cols-4
            "
        >

            {
            foods
            .filter(food => food.special === true)
            .map(food => (
                <SpecialDishCard
                key={food.id}
                food={food}
                />
            ))
            }

        </div>

        </section>

      </main>
    </>
  );
}

export default Specials;