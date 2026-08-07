import FoodTypeBadge from "../FoodTypeBadge/FoodTypeBadge";

function SpecialDishCard({ food }) {
  return (
    <div
      className="
      group
      overflow-hidden
      rounded-3xl
      border
      border-[#D4AF37]/20
      bg-[#151515]
      shadow-xl
      transition
      duration-300
      hover:-translate-y-2
      hover:border-[#D4AF37]/50
      "
    >

      {/* IMAGE */}
      <div className="relative h-56 overflow-hidden">

        <img
          src={food.image}
          alt={food.name}
          className="
          h-full
          w-full
          object-cover
          transition
          duration-500
          group-hover:scale-110
          "
        />


        {/* Chef Badge */}
        <div
          className="
          absolute
          left-4
          top-4
          rounded-full
          bg-[#D4AF37]
          px-3
          py-1
          text-xs
          font-bold
          text-black
          shadow-lg
          "
        >
          👨‍🍳 Chef Special
        </div>


        {/* Food Type */}

        <div className="absolute right-4 top-4">
          <FoodTypeBadge type={food.type}/>
        </div>

      </div>



      {/* CONTENT */}

      <div className="p-5">


        <p
          className="
          text-xs
          uppercase
          tracking-wider
          text-[#D4AF37]
          "
        >
          {food.category}
        </p>



        <h3
          className="
          mt-2
          line-clamp-1
          text-xl
          font-bold
          text-white
          "
        >
          {food.name}
        </h3>



        <p
          className="
          mt-2
          line-clamp-2
          text-sm
          text-gray-400
          "
        >
          {food.description}
        </p>



        {/* PRICE */}

        <div className="mt-4 flex items-center gap-3">

          <span className="text-2xl font-black text-white">
            ₹{food.price}
          </span>


          {
            food.oldPrice && (
              <span
                className="
                text-sm
                text-gray-500
                line-through
                "
              >
                ₹{food.oldPrice}
              </span>
            )
          }

        </div>



        {/* BUTTON */}

        <button
          className="
          mt-5
          h-10
          w-full
          rounded-xl

          bg-gradient-to-r
          from-[#D4AF37]
          to-[#FFB800]

          text-sm
          font-bold
          text-black

          transition
          hover:scale-[1.02]
          "
        >
          Order Special Dish
        </button>


      </div>

    </div>
  );
}

export default SpecialDishCard;