import FoodTypeBadge from "../FoodTypeBadge/FoodTypeBadge";
import { useCart } from "../../context/CartContext";

function FoodCard({ food }) {

  const { addToCart } = useCart();

  return (

    <div
      className="
      group
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-[#151515]
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-[#D4AF37]/40
      "
    >

      {/* IMAGE */}

      <div className="relative h-52 overflow-hidden">

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


        <div
          className="
          absolute
          right-4
          top-4
          "
        >

          <FoodTypeBadge type={food.type}/>

        </div>

      </div>



      {/* CONTENT */}

      <div
        className="
        flex
        min-h-[215px]
        flex-col
        p-5
        "
      >

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
          text-lg
          font-bold
          text-white
          "
        >
          {food.name}
        </h3>



        <p
          className="
          mt-2
          line-clamp-1
          text-sm
          text-gray-400
          "
        >
          {food.description}
        </p>



        <div
          className="
          mt-4
          flex
          items-center
          gap-3
          "
        >

          <span
            className="
            text-lg
            font-bold
            text-white
            "
          >
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



        <button

          onClick={() => addToCart(food)}

          className="
          mt-auto

          flex
          h-9
          items-center
          justify-center

          rounded-xl

          bg-gradient-to-r
          from-[#D4AF37]
          to-[#FFB800]

          text-sm
          font-semibold

          text-black

          transition

          hover:scale-[1.03]

          active:scale-95
          "
        >

          Add to Cart 🛒

        </button>


      </div>


    </div>

  );

}

export default FoodCard;