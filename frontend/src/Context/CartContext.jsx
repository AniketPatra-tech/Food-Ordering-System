import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);

    // Coupon State
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [selectedCoupon, setSelectedCoupon] = useState(null);

    const addToCart = (food) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === food.id);

            if (existing) {
                return prev.map((item) =>
                    item.id === food.id
                        ? {
                              ...item,
                              quantity: item.quantity + 1,
                          }
                        : item
                );
            }

            return [...prev, { ...food, quantity: 1 }];
        });

        setCartOpen(true);
    };

    const removeFromCart = (id) => {
        setCartItems((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    const increaseQuantity = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          quantity: item.quantity + 1,
                      }
                    : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id && item.quantity > 1
                    ? {
                          ...item,
                          quantity: item.quantity - 1,
                      }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);

        // Clear coupon after order/cart clear
        setCouponDiscount(0);
        setSelectedCoupon(null);
    };

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartSubtotal = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const deliveryCharge =
        cartSubtotal > 0 ? 40 : 0;

    const cartTotal = Math.max(
        cartSubtotal +
            deliveryCharge -
            couponDiscount,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount,
                cartSubtotal,
                deliveryCharge,
                cartTotal,

                couponDiscount,
                setCouponDiscount,
                selectedCoupon,
                setSelectedCoupon,

                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,

                cartOpen,
                setCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}