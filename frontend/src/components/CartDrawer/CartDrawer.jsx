import { X } from "lucide-react";
import { useCart } from "../../context/CartContext";


function CartDrawer() {

  const {
    cartItems,
    cartOpen,
    setCartOpen,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCart();



  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );


  const delivery = subtotal > 0 ? 40 : 0;


  const total = subtotal + delivery;



  return (

    <>

      {/* BACKDROP */}

      {
        cartOpen && (

          <div
            onClick={() => setCartOpen(false)}

            className="
              fixed
              inset-0
              z-40
              bg-black/60
              backdrop-blur-sm
            "
          />

        )
      }



      {/* DRAWER */}

      <div

        className={`
          fixed
          right-0
          top-0

          z-50

          h-full
          w-full

          max-w-md

          border-l
          border-white/10

          bg-[#111111]

          shadow-2xl

          transition-transform
          duration-300

          ${
            cartOpen
              ? "translate-x-0"
              : "translate-x-full"
          }

        `}

      >


        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between

            border-b
            border-white/10

            px-5
            py-4
          "
        >


          <h2
            className="
              text-xl
              font-bold

              bg-gradient-to-r
              from-[#D4AF37]
              to-[#F5D77A]

              bg-clip-text
              text-transparent
            "
          >

            Your Cart 🛒

          </h2>



          <button

            onClick={() => setCartOpen(false)}

            className="
              rounded-full

              p-2

              text-gray-300

              transition

              hover:bg-white/10

              hover:text-white
            "

          >

            <X size={22}/>

          </button>


        </div>





        {/* CART ITEMS */}

        <div
          className="
            h-[calc(100%-220px)]

            overflow-y-auto

            space-y-4

            p-5
          "
        >


          {
            cartItems.length === 0

            ?

            (

              <div
                className="
                  mt-20

                  text-center

                  text-gray-400
                "
              >

                <p className="text-lg">
                  Your cart is empty
                </p>

                <p className="mt-2 text-sm">
                  Add your favourite dishes from Zestora
                </p>

              </div>

            )


            :

            (

              cartItems.map((item) => (

                <div

                  key={item.id}

                  className="
                    flex
                    gap-3

                    rounded-2xl

                    border
                    border-white/10

                    bg-[#181818]

                    p-3
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
                    className="flex-1"
                  >


                    <h3
                      className="
                        line-clamp-1

                        font-semibold

                        text-white
                      "
                    >

                      {item.name}

                    </h3>



                    <p
                      className="
                        mt-1

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

                        onClick={() =>
                          decreaseQuantity(item.id)
                        }

                        className="
                          flex

                          h-7
                          w-7

                          items-center
                          justify-center

                          rounded-lg

                          bg-white/10

                          hover:bg-white/20
                        "

                      >

                        -

                      </button>



                      <span
                        className="text-sm"
                      >

                        {item.quantity}

                      </span>



                      <button

                        onClick={() =>
                          increaseQuantity(item.id)
                        }

                        className="
                          flex

                          h-7
                          w-7

                          items-center
                          justify-center

                          rounded-lg

                          bg-white/10

                          hover:bg-white/20
                        "

                      >

                        +

                      </button>


                    </div>


                  </div>





                  <button

                    onClick={() =>
                      removeFromCart(item.id)
                    }

                    className="
                      text-xs

                      text-red-400

                      hover:text-red-300
                    "

                  >

                    Remove

                  </button>


                </div>


              ))

            )

          }


        </div>







        {/* BILL SECTION */}

        <div
          className="
            absolute

            bottom-0

            w-full

            border-t

            border-white/10

            bg-[#111111]

            p-5
          "
        >


          <div
            className="
              space-y-3

              text-sm

              text-gray-300
            "
          >


            <div
              className="
                flex
                justify-between
              "
            >

              <span>
                Subtotal
              </span>

              <span>
                ₹{subtotal}
              </span>

            </div>



            <div
              className="
                flex
                justify-between
              "
            >

              <span>
                Delivery
              </span>

              <span>
                ₹{delivery}
              </span>

            </div>



            <div
              className="
                flex
                justify-between

                border-t

                border-white/10

                pt-3

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
              mt-5

              h-11

              w-full

              rounded-xl

              bg-gradient-to-r

              from-[#D4AF37]

              to-[#FFB800]

              font-semibold

              text-black

              transition

              hover:scale-[1.02]
            "

          >

            Proceed Checkout

          </button>


        </div>



      </div>


    </>

  );

}


export default CartDrawer;