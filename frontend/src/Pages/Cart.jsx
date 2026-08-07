import { useCart } from "../context/CartContext";


function Cart(){

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCart();



  const subtotal = cartItems.reduce(
    (total,item)=>
    total + item.price * item.quantity,
    0
  );


  const delivery = subtotal > 0 ? 40 : 0;


  const total = subtotal + delivery;



  return (

    <div
    className="
    min-h-screen
    bg-[#0F0F0F]
    px-5
    py-10
    text-white
    md:px-10
    "
    >


      <h1
      className="
      mb-8
      text-3xl
      font-bold

      bg-gradient-to-r
      from-[#D4AF37]
      to-[#F5D77A]

      bg-clip-text
      text-transparent
      "
      >

        Your Cart 🛒

      </h1>




      {
      cartItems.length === 0

      ?

      (

        <div
        className="
        rounded-3xl
        border
        border-white/10
        bg-[#151515]
        p-10
        text-center
        "
        >

          <h2
          className="
          text-xl
          font-semibold
          "
          >

            Your cart is empty

          </h2>

          <p
          className="
          mt-2
          text-gray-400
          "
          >

            Add your favourite dishes from Zestora

          </p>

        </div>

      )


      :

      (

      <div
      className="
      grid
      gap-8
      lg:grid-cols-3
      "
      >



        {/* ITEMS */}

        <div
        className="
        space-y-4
        lg:col-span-2
        "
        >

        {
        cartItems.map(item=>(

          <div
          key={item.id}

          className="
          flex
          items-center
          gap-4

          rounded-2xl

          border
          border-white/10

          bg-[#151515]

          p-4
          "
          >

            <img
            src={item.image}
            alt={item.name}

            className="
            h-20
            w-20
            rounded-xl
            object-cover
            "
            />



            <div
            className="
            flex-1
            "
            >

              <h3
              className="
              font-semibold
              "
              >

                {item.name}

              </h3>


              <p
              className="
              text-[#D4AF37]
              "
              >

                ₹{item.price}

              </p>


              <div
              className="
              mt-2
              flex
              items-center
              gap-3
              "
              >

                <button
                onClick={()=>decreaseQuantity(item.id)}

                className="
                h-7
                w-7
                rounded-lg
                bg-white/10
                "
                >
                  -
                </button>


                <span>
                  {item.quantity}
                </span>


                <button
                onClick={()=>increaseQuantity(item.id)}

                className="
                h-7
                w-7
                rounded-lg
                bg-white/10
                "
                >
                  +
                </button>


              </div>


            </div>



            <button

            onClick={()=>removeFromCart(item.id)}

            className="
            text-sm
            text-red-400
            "
            >

              Remove

            </button>



          </div>

        ))
        }

        </div>





        {/* SUMMARY */}


        <div
        className="
        h-fit

        rounded-3xl

        border

        border-white/10

        bg-[#151515]

        p-6
        "
        >

          <h2
          className="
          text-xl
          font-bold
          "
          >

            Bill Summary

          </h2>



          <div
          className="
          mt-5
          space-y-3
          text-gray-300
          "
          >

            <div className="flex justify-between">

              <span>
                Subtotal
              </span>

              <span>
                ₹{subtotal}
              </span>

            </div>



            <div className="flex justify-between">

              <span>
                Delivery
              </span>

              <span>
                ₹{delivery}
              </span>

            </div>



            <hr className="border-white/10"/>



            <div
            className="
            flex
            justify-between
            text-lg
            font-bold
            text-[#D4AF37]
            "
            >

              <span>
                Total
              </span>

              <span>
                ₹{total}
              </span>

            </div>


          </div>




          <button
          className="
          mt-6
          h-11
          w-full

          rounded-xl

          bg-gradient-to-r
          from-[#D4AF37]
          to-[#FFB800]

          font-semibold

          text-black
          "
          >

            Proceed Checkout

          </button>


        </div>



      </div>

      )

      }



    </div>

  );

}


export default Cart;