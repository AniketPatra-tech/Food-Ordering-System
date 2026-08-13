import { useEffect, useMemo, useState } from "react";
import {
    ArrowLeft,
    Check,
    ChevronDown,
    CreditCard,
    MapPin,
    MessageSquare,
    Package,
    Plus,
    ShoppingBag,
    Smartphone,
    Truck,
    Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useCart } from "../context/CartContext";
import { useAddress } from "../context/AddressContext";
import { useAuth } from "../context/AuthContext";

function Checkout() {
    const navigate = useNavigate();

    const { cartItems } = useCart();

    const {
        addresses,
        currentAddress,
        loading: addressLoading,
    } = useAddress();

    const { user } = useAuth();

    const [selectedAddressId, setSelectedAddressId] = useState(
        currentAddress?._id || ""
    );

    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [customerNote, setCustomerNote] = useState("");
    const [showAddresses, setShowAddresses] = useState(false);
    const [placingOrder, setPlacingOrder] = useState(false);
    const [error, setError] = useState("");

    // =====================================================
    // UPDATE SELECTED ADDRESS
    // =====================================================

    useEffect(() => {
        if (currentAddress?._id) {
            setSelectedAddressId(currentAddress._id);
        }
    }, [currentAddress]);

    // =====================================================
    // SELECTED ADDRESS
    // =====================================================

    const selectedAddress = useMemo(() => {
        return (
            addresses.find(
                (address) => address._id === selectedAddressId
            ) ||
            currentAddress ||
            addresses.find((address) => address.isDefault) ||
            null
        );
    }, [addresses, selectedAddressId, currentAddress]);

    // =====================================================
    // BILL CALCULATION
    // =====================================================

    const subtotal = useMemo(() => {
        return cartItems.reduce((total, item) => {
            return (
                total +
                Number(item.price || 0) *
                    Number(item.quantity || 0)
            );
        }, 0);
    }, [cartItems]);

    const deliveryFee = subtotal > 0 ? 40 : 0;
    const discount = 0;

    const total = Math.max(
        subtotal + deliveryFee - discount,
        0
    );

    // =====================================================
    // PAYMENT OPTIONS
    // =====================================================

    const paymentOptions = [
        {
            id: "cod",
            title: "Cash on Delivery",
            description: "Pay when your food arrives",
            icon: Wallet,
            available: true,
        },
        {
            id: "upi",
            title: "UPI",
            description: "Google Pay, PhonePe, Paytm",
            icon: Smartphone,
            available: false,
        },
        {
            id: "card",
            title: "Credit / Debit Card",
            description: "Secure online payment",
            icon: CreditCard,
            available: false,
        },
    ];

    // =====================================================
    // PLACE ORDER
    // =====================================================

    const handlePlaceOrder = async () => {
        setError("");

        // Check login
        if (!user) {
            setError("Please login before placing your order.");
            return;
        }

        // Check cart
        if (cartItems.length === 0) {
            setError("Your cart is empty.");
            return;
        }

        // Check address
        if (!selectedAddress) {
            setError("Please select a delivery address.");
            return;
        }

        setPlacingOrder(true);

        try {
            // -------------------------------------------------
            // PREPARE ORDER ITEMS
            // -------------------------------------------------

            const orderItems = cartItems.map((item) => ({
                foodId: String(
                    item.foodId ||
                        item.id ||
                        item._id
                ),

                name: item.name,

                image: item.image || "",

                price: Number(item.price) || 0,

                quantity: Number(item.quantity) || 1,

                category: item.category || "",

                foodType: item.foodType || "other",
            }));

            // -------------------------------------------------
            // PREPARE DELIVERY ADDRESS
            // -------------------------------------------------

            const addressType =
                selectedAddress.type ||
                selectedAddress.label ||
                "home";

            const normalizedType = [
                "home",
                "work",
                "other",
            ].includes(addressType.toLowerCase())
                ? addressType.toLowerCase()
                : "home";

            const deliveryAddress = {
                type: normalizedType,

                fullAddress:
                    selectedAddress.fullAddress ||
                    selectedAddress.street ||
                    "",

                landmark:
                    selectedAddress.landmark || "",

                city:
                    selectedAddress.city || "",

                state:
                    selectedAddress.state || "",

                pincode:
                    String(
                        selectedAddress.pincode || ""
                    ),

                phone:
                    selectedAddress.phone ||
                    user.phone ||
                    "",
            };

            // -------------------------------------------------
            // SEND ORDER TO BACKEND
            // -------------------------------------------------

            const response = await axios.post(
                "http://localhost:5000/api/orders",
                {
                    items: orderItems,

                    deliveryAddress,

                    subtotal,

                    deliveryFee,

                    discount,

                    total,

                    paymentMethod,

                    customerNote,
                },
                {
                    withCredentials: true,
                }
            );

            // -------------------------------------------------
            // ORDER SUCCESS
            // -------------------------------------------------

            if (response.status === 201) {
                window.dispatchEvent(
                    new CustomEvent(
                        "zestora-order-placed"
                    )
                );

                navigate("/orders", {
                    state: {
                        orderSuccess: true,
                        order: response.data.order,
                    },
                });
            }
        } catch (err) {
            console.error(
                "Place order error:",
                err
            );

            setError(
                err.response?.data?.message ||
                    "Unable to place your order. Please try again."
            );
        } finally {
            setPlacingOrder(false);
        }
    };

    // =====================================================
    // EMPTY CART
    // =====================================================

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-[#0F0F0F] px-4 py-8 text-white md:px-8">
                <div className="mx-auto max-w-4xl">
                    <button
                        type="button"
                        onClick={() => navigate("/menu")}
                        className="mb-8 flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#D4AF37]"
                    >
                        <ArrowLeft size={17} />
                        Back to Menu
                    </button>

                    <div className="rounded-3xl border border-white/10 bg-[#151515] px-6 py-16 text-center">
                        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#1D1D1D]">
                            <ShoppingBag
                                size={32}
                                className="text-[#D4AF37]"
                            />
                        </div>

                        <h1 className="text-2xl font-bold">
                            Your cart is empty
                        </h1>

                        <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                            Add some delicious Bengali
                            favourites from Zestora before
                            checking out.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/menu")
                            }
                            className="mt-7 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FFB800] px-6 py-3 text-sm font-bold text-black transition hover:scale-[1.02]"
                        >
                            Explore Menu
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // =====================================================
    // MAIN CHECKOUT
    // =====================================================

    return (
        <div className="min-h-screen bg-[#0F0F0F] px-3 pb-10 pt-5 text-white md:px-6 md:pt-8">
            {/* PAGE HEADER */}

            <div className="mx-auto mb-6 max-w-6xl">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mb-4 flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#D4AF37]"
                >
                    <ArrowLeft size={17} />
                    Back
                </button>

                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#1B1B1B]">
                        <ShoppingBag
                            size={20}
                            className="text-[#D4AF37]"
                        />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold md:text-3xl">
                            Checkout
                        </h1>

                        <p className="text-xs text-gray-500 md:text-sm">
                            Complete your Zestora order
                        </p>
                    </div>
                </div>
            </div>

            {/* ERROR */}

            {error && (
                <div className="mx-auto mb-5 max-w-6xl rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
                </div>
            )}

            {/* MAIN GRID */}

            <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1fr_350px]">
                {/* LEFT */}

                <div className="space-y-5">
                    {/* ADDRESS */}

                    <section className="rounded-2xl border border-white/10 bg-[#151515]">
                        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 md:px-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D4AF37]/10">
                                    <MapPin
                                        size={18}
                                        className="text-[#D4AF37]"
                                    />
                                </div>

                                <div>
                                    <h2 className="text-sm font-semibold">
                                        Delivery Address
                                    </h2>

                                    <p className="text-[11px] text-gray-500">
                                        Where should we deliver?
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/addresses")
                                }
                                className="flex items-center gap-1 text-xs font-medium text-[#D4AF37] hover:text-[#F5D77A]"
                            >
                                Manage

                                <ChevronDown
                                    size={14}
                                    className="-rotate-90"
                                />
                            </button>
                        </div>

                        <div className="p-4 md:p-5">
                            {addressLoading ? (
                                <div className="animate-pulse rounded-xl bg-white/5 p-5">
                                    <div className="h-4 w-24 rounded bg-white/10" />

                                    <div className="mt-3 h-3 w-3/4 rounded bg-white/10" />
                                </div>
                            ) : selectedAddress ? (
                                <>
                                    <div className="rounded-xl border border-[#D4AF37]/25 bg-[#1B1B1B] p-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex min-w-0 items-start gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                                                    <MapPin size={16} />
                                                </div>

                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-semibold capitalize">
                                                            {selectedAddress.type ||
                                                                selectedAddress.label ||
                                                                "Home"}
                                                        </span>

                                                        <span className="rounded-full bg-[#D4AF37]/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#D4AF37]">
                                                            Selected
                                                        </span>
                                                    </div>

                                                    <p className="mt-2 text-sm leading-5 text-gray-300">
                                                        {selectedAddress.fullAddress ||
                                                            selectedAddress.street}
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-500">
                                                        {
                                                            selectedAddress.city
                                                        }
                                                        ,{" "}
                                                        {
                                                            selectedAddress.state
                                                        }{" "}
                                                        -{" "}
                                                        {
                                                            selectedAddress.pincode
                                                        }
                                                    </p>

                                                    {selectedAddress.landmark && (
                                                        <p className="mt-1 text-xs text-gray-500">
                                                            Near{" "}
                                                            {
                                                                selectedAddress.landmark
                                                            }
                                                        </p>
                                                    )}

                                                    <p className="mt-2 text-xs text-gray-400">
                                                        Phone:{" "}
                                                        {selectedAddress.phone ||
                                                            user?.phone}
                                                    </p>
                                                </div>
                                            </div>

                                            <Check
                                                size={18}
                                                className="shrink-0 text-[#D4AF37]"
                                            />
                                        </div>
                                    </div>

                                    {/* CHANGE ADDRESS */}

                                    {addresses.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowAddresses(
                                                    (prev) =>
                                                        !prev
                                                )
                                            }
                                            className="mt-3 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-left text-xs text-gray-300 transition hover:border-[#D4AF37]/20 hover:text-[#D4AF37]"
                                        >
                                            <span>
                                                {showAddresses
                                                    ? "Hide saved addresses"
                                                    : `Choose another address (${addresses.length})`}
                                            </span>

                                            <ChevronDown
                                                size={15}
                                                className={`transition ${
                                                    showAddresses
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            />
                                        </button>
                                    )}

                                    {showAddresses && (
                                        <div className="mt-3 space-y-2">
                                            {addresses
                                                .filter(
                                                    (address) =>
                                                        address._id !==
                                                        selectedAddress._id
                                                )
                                                .map(
                                                    (
                                                        address
                                                    ) => (
                                                        <button
                                                            key={
                                                                address._id
                                                            }
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedAddressId(
                                                                    address._id
                                                                );

                                                                setShowAddresses(
                                                                    false
                                                                );
                                                            }}
                                                            className="flex w-full items-start gap-3 rounded-xl border border-white/10 bg-[#1A1A1A] p-3 text-left transition hover:border-[#D4AF37]/30"
                                                        >
                                                            <MapPin
                                                                size={
                                                                    16
                                                                }
                                                                className="mt-0.5 shrink-0 text-gray-500"
                                                            />

                                                            <div>
                                                                <p className="text-xs font-semibold capitalize text-white">
                                                                    {address.type ||
                                                                        address.label ||
                                                                        "Address"}
                                                                </p>

                                                                <p className="mt-1 text-xs text-gray-500">
                                                                    {address.fullAddress ||
                                                                        address.street}
                                                                    ,{" "}
                                                                    {
                                                                        address.city
                                                                    }
                                                                </p>
                                                            </div>
                                                        </button>
                                                    )
                                                )}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate("/addresses")
                                    }
                                    className="flex w-full items-center gap-3 rounded-xl border border-dashed border-[#D4AF37]/30 bg-[#D4AF37]/5 p-4 text-left transition hover:bg-[#D4AF37]/10"
                                >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D4AF37]/10">
                                        <Plus
                                            size={18}
                                            className="text-[#D4AF37]"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-[#D4AF37]">
                                            Add a delivery address
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            You need an address
                                            before placing your
                                            order.
                                        </p>
                                    </div>
                                </button>
                            )}
                        </div>
                    </section>

                    {/* ORDER ITEMS */}

                    <section className="rounded-2xl border border-white/10 bg-[#151515]">
                        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4 md:px-5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D4AF37]/10">
                                <Package
                                    size={18}
                                    className="text-[#D4AF37]"
                                />
                            </div>

                            <div>
                                <h2 className="text-sm font-semibold">
                                    Your Order
                                </h2>

                                <p className="text-[11px] text-gray-500">
                                    {cartItems.length} item
                                    {cartItems.length !== 1
                                        ? "s"
                                        : ""}
                                </p>
                            </div>
                        </div>

                        <div className="divide-y divide-white/5">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-3 px-4 py-4 md:px-5"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-16 w-16 shrink-0 rounded-xl object-cover"
                                    />

                                    <div className="min-w-0 flex-1">
                                        <h3 className="line-clamp-1 text-sm font-semibold text-white">
                                            {item.name}
                                        </h3>

                                        <p className="mt-1 text-xs text-gray-500">
                                            ₹{item.price} ×{" "}
                                            {item.quantity}
                                        </p>
                                    </div>

                                    <div className="shrink-0 text-right">
                                        <p className="text-sm font-semibold text-[#D4AF37]">
                                            ₹
                                            {Number(
                                                item.price
                                            ) *
                                                Number(
                                                    item.quantity
                                                )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* PAYMENT */}

                    <section className="rounded-2xl border border-white/10 bg-[#151515]">
                        <div className="border-b border-white/10 px-4 py-4 md:px-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D4AF37]/10">
                                    <CreditCard
                                        size={18}
                                        className="text-[#D4AF37]"
                                    />
                                </div>

                                <div>
                                    <h2 className="text-sm font-semibold">
                                        Payment Method
                                    </h2>

                                    <p className="text-[11px] text-gray-500">
                                        Choose how you want to pay
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 p-4 md:p-5">
                            {paymentOptions.map(
                                (option) => {
                                    const Icon = option.icon;

                                    const isSelected =
                                        paymentMethod ===
                                        option.id;

                                    return (
                                        <button
                                            key={option.id}
                                            type="button"
                                            disabled={
                                                !option.available
                                            }
                                            onClick={() =>
                                                setPaymentMethod(
                                                    option.id
                                                )
                                            }
                                            className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                                                isSelected &&
                                                option.available
                                                    ? "border-[#D4AF37]/40 bg-[#D4AF37]/5"
                                                    : "border-white/10 bg-[#1A1A1A]"
                                            } ${
                                                !option.available
                                                    ? "cursor-not-allowed opacity-40"
                                                    : "hover:border-[#D4AF37]/30"
                                            }`}
                                        >
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5">
                                                <Icon
                                                    size={17}
                                                    className={
                                                        isSelected
                                                            ? "text-[#D4AF37]"
                                                            : "text-gray-400"
                                                    }
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <p className="text-xs font-semibold text-white">
                                                    {
                                                        option.title
                                                    }

                                                    {!option.available && (
                                                        <span className="ml-2 text-[9px] font-medium text-gray-500">
                                                            Coming soon
                                                        </span>
                                                    )}
                                                </p>

                                                <p className="mt-0.5 text-[10px] text-gray-500">
                                                    {
                                                        option.description
                                                    }
                                                </p>
                                            </div>

                                            {isSelected &&
                                                option.available && (
                                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37]">
                                                        <Check
                                                            size={
                                                                12
                                                            }
                                                            className="text-black"
                                                        />
                                                    </div>
                                                )}
                                        </button>
                                    );
                                }
                            )}
                        </div>
                    </section>

                    {/* CUSTOMER NOTE */}

                    <section className="rounded-2xl border border-white/10 bg-[#151515] p-4 md:p-5">
                        <div className="flex items-center gap-2">
                            <MessageSquare
                                size={17}
                                className="text-[#D4AF37]"
                            />

                            <h2 className="text-sm font-semibold">
                                Special Instructions
                            </h2>

                            <span className="text-[10px] text-gray-600">
                                Optional
                            </span>
                        </div>

                        <textarea
                            value={customerNote}
                            onChange={(event) =>
                                setCustomerNote(
                                    event.target.value
                                )
                            }
                            maxLength={500}
                            rows={3}
                            placeholder="Any special request for the kitchen or delivery partner?"
                            className="mt-3 w-full resize-none rounded-xl border border-white/10 bg-[#1A1A1A] px-3 py-3 text-xs text-white outline-none placeholder:text-gray-600 focus:border-[#D4AF37]/30"
                        />

                        <p className="mt-1 text-right text-[10px] text-gray-600">
                            {customerNote.length}/500
                        </p>
                    </section>
                </div>

                {/* RIGHT - ORDER SUMMARY */}

                <aside className="lg:sticky lg:top-24 lg:self-start">
                    <div className="overflow-hidden rounded-2xl border border-[#D4AF37]/15 bg-[#151515] shadow-xl shadow-black/20">
                        <div className="border-b border-white/10 bg-gradient-to-r from-[#1D1D1D] to-[#151515] px-5 py-4">
                            <div className="flex items-center gap-2">
                                <Truck
                                    size={18}
                                    className="text-[#D4AF37]"
                                />

                                <h2 className="text-sm font-semibold">
                                    Order Summary
                                </h2>
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>

                                    <span className="text-gray-200">
                                        ₹{subtotal}
                                    </span>
                                </div>

                                <div className="flex justify-between text-gray-400">
                                    <span>Delivery</span>

                                    <span className="text-gray-200">
                                        ₹{deliveryFee}
                                    </span>
                                </div>

                                {discount > 0 && (
                                    <div className="flex justify-between text-green-400">
                                        <span>
                                            Discount
                                        </span>

                                        <span>
                                            -₹{discount}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="my-4 h-px bg-white/10" />

                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-xs text-gray-500">
                                        Grand Total
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-[#D4AF37]">
                                        ₹{total}
                                    </p>
                                </div>

                                <span className="rounded-full bg-[#D4AF37]/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#D4AF37]">
                                    COD
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={
                                    handlePlaceOrder
                                }
                                disabled={
                                    placingOrder ||
                                    !selectedAddress
                                }
                                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FFB800] text-sm font-bold text-black shadow-lg shadow-[#D4AF37]/10 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                            >
                                {placingOrder ? (
                                    <>
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />

                                        Placing Order...
                                    </>
                                ) : (
                                    <>
                                        <Check size={17} />

                                        Place Order
                                    </>
                                )}
                            </button>

                            {!selectedAddress && (
                                <p className="mt-3 text-center text-[10px] text-amber-400">
                                    Select a delivery address
                                    to continue
                                </p>
                            )}

                            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-600">
                                <Truck size={12} />

                                Freshly prepared & delivered
                                by Zestora
                            </div>
                        </div>
                    </div>

                    {/* HERITAGE MESSAGE */}

                    <div className="mt-3 rounded-xl border border-white/5 bg-[#121212] px-4 py-3 text-center">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#D4AF37]/70">
                            Authentic Bengali Kitchen
                        </p>

                        <p className="mt-1 text-[10px] text-gray-600">
                            Made with tradition, served
                            with love.
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default Checkout;