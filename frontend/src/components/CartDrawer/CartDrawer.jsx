import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

    const navigate = useNavigate();

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const delivery = subtotal > 0 ? 40 : 0;
    const total = subtotal + delivery;

    const handleCheckout = () => {
        if (cartItems.length === 0) return;

        setCartOpen(false);
        navigate("/checkout");
    };

    return (
        <>
            {/* Backdrop */}
            {cartOpen && (
                <div
                    onClick={() => setCartOpen(false)}
                    className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                />
            )}

            {/* Cart Drawer */}
            <div
                className={`fixed right-0 top-0 z-[110] flex h-screen w-full max-w-md flex-col border-l border-white/10 bg-[#111111] shadow-2xl transition-transform duration-300 ease-in-out ${
                    cartOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Header */}
                <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#111111] px-5 py-4">
                    <h2 className="bg-gradient-to-r from-[#D4AF37] to-[#F5D77A] bg-clip-text text-xl font-bold text-transparent">
                        Your Cart 🛒
                    </h2>

                    <button
                        type="button"
                        onClick={() => setCartOpen(false)}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-300 transition hover:bg-white/10 hover:text-white"
                        aria-label="Close cart"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 space-y-4 overflow-y-auto p-5">
                    {cartItems.length === 0 ? (
                        <div className="mt-20 px-5 text-center text-gray-400">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#181818] text-2xl">
                                🛒
                            </div>

                            <p className="text-lg font-medium text-gray-300">
                                Your cart is empty
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                Add your favourite dishes from Zestora
                            </p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-3 rounded-2xl border border-white/10 bg-[#181818] p-3"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                                />

                                <div className="min-w-0 flex-1">
                                    <h3 className="line-clamp-1 font-semibold text-white">
                                        {item.name}
                                    </h3>

                                    <p className="mt-1 text-[#D4AF37]">
                                        ₹{item.price}
                                    </p>

                                    <div className="mt-2 flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                decreaseQuantity(item.id)
                                            }
                                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
                                        >
                                            −
                                        </button>

                                        <span className="min-w-4 text-center text-sm font-medium text-white">
                                            {item.quantity}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                increaseQuantity(item.id)
                                            }
                                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeFromCart(item.id)
                                    }
                                    className="self-start pt-1 text-xs text-red-400 transition hover:text-red-300"
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Bill */}
                <div className="shrink-0 border-t border-white/10 bg-[#111111] p-5">
                    <div className="space-y-3 text-sm text-gray-300">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{subtotal}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Delivery</span>
                            <span>₹{delivery}</span>
                        </div>

                        <div className="flex justify-between border-t border-white/10 pt-3 text-lg font-bold text-[#D4AF37]">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleCheckout}
                        disabled={cartItems.length === 0}
                        className="mt-5 h-11 w-full rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FFB800] font-semibold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                    >
                        Proceed Checkout
                    </button>
                </div>
            </div>
        </>
    );
}

export default CartDrawer;