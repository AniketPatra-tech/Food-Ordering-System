import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Package,
    ShoppingBag,
    CheckCircle2,
    Clock3,
    ArrowRight,
    Sparkles,
    ChefHat,
    Flame,
    Utensils,
    XCircle,
    Truck
} from "lucide-react";
import axios from "axios";

import foodData from "../data/foods";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
    const { user } = useAuth();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =====================================================
    // FOOD DATA
    // =====================================================

    const foods = Array.isArray(foodData)
        ? foodData
        : foodData?.foods || [];

    const getFoodImage = (food) =>
        food.image ||
        food.img ||
        food.photo ||
        food.imageUrl ||
        "";

    const getFoodName = (food) =>
        food.name ||
        food.title ||
        "Delicious Dish";

    const getFoodPrice = (food) =>
        food.price || 0;

    const getFoodId = (food, index) =>
        food.id ||
        food._id ||
        index;

    // =====================================================
    // FETCH ORDERS
    // =====================================================

    const fetchOrders = async () => {
        if (!user) {
            setOrders([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await axios.get(
                "http://localhost:5000/api/orders/my-orders",
                {
                    withCredentials: true
                }
            );

            setOrders(response.data.orders || []);
        } catch (err) {
            console.error("Fetch orders error:", err);

            setError(
                err.response?.data?.message ||
                "Unable to load your orders."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [user]);

    // =====================================================
    // AUTO REFRESH AFTER ORDER
    // =====================================================

    useEffect(() => {
        const handleOrderPlaced = () => {
            fetchOrders();
        };

        window.addEventListener(
            "zestora-order-placed",
            handleOrderPlaced
        );

        return () => {
            window.removeEventListener(
                "zestora-order-placed",
                handleOrderPlaced
            );
        };
    }, [user]);

    // =====================================================
    // ORDER COUNTS
    // =====================================================

    const totalOrders = orders.length;

    const deliveredOrders = orders.filter(
        (order) => order.status === "delivered"
    ).length;

    const activeOrders = orders.filter(
        (order) =>
            ![
                "delivered",
                "cancelled"
            ].includes(order.status)
    ).length;

    // =====================================================
    // RECOMMENDATIONS
    // =====================================================

    const recommended = foods.slice(0, 4);
    const chefPicks = foods.slice(4, 8);
    const mostLoved = foods.slice(8, 12);

    // =====================================================
    // FOOD RECOMMENDATION CARD
    // =====================================================

    const FoodRecommendationCard = ({
        food,
        badge
    }) => {
        return (
            <div
                className="
                    group
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#151515]
                    transition
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#D4AF37]/30
                    hover:shadow-xl
                    hover:shadow-black/30
                "
            >
                <div
                    className="
                        relative
                        h-36
                        overflow-hidden
                        bg-[#202020]
                        sm:h-40
                    "
                >
                    {getFoodImage(food) ? (
                        <img
                            src={getFoodImage(food)}
                            alt={getFoodName(food)}
                            className="
                                h-full
                                w-full
                                object-cover
                                transition
                                duration-500
                                group-hover:scale-105
                            "
                        />
                    ) : (
                        <div
                            className="
                                flex
                                h-full
                                items-center
                                justify-center
                                text-gray-600
                            "
                        >
                            <Utensils size={32} />
                        </div>
                    )}

                    <div
                        className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/60
                            via-transparent
                            to-transparent
                        "
                    />

                    {badge && (
                        <div
                            className="
                                absolute
                                left-2.5
                                top-2.5
                                flex
                                items-center
                                gap-1
                                rounded-full
                                border
                                border-white/10
                                bg-black/65
                                px-2.5
                                py-1
                                text-[10px]
                                font-semibold
                                text-[#F5D77A]
                                backdrop-blur-md
                            "
                        >
                            <Sparkles size={11} />
                            {badge}
                        </div>
                    )}
                </div>

                <div className="p-3.5">
                    <h3
                        className="
                            line-clamp-1
                            text-sm
                            font-semibold
                            text-white
                        "
                    >
                        {getFoodName(food)}
                    </h3>

                    <div
                        className="
                            mt-2
                            flex
                            items-center
                            justify-between
                        "
                    >
                        <span
                            className="
                                text-sm
                                font-bold
                                text-[#D4AF37]
                            "
                        >
                            ₹{getFoodPrice(food)}
                        </span>

                        <Link
                            to="/menu"
                            className="
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-lg
                                bg-[#D4AF37]/10
                                text-[#D4AF37]
                                transition
                                hover:bg-[#D4AF37]
                                hover:text-black
                            "
                            title="View menu"
                        >
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    // =====================================================
    // STATUS HELPERS
    // =====================================================

    const getStatusLabel = (status) => {
        return status
            ?.replaceAll("_", " ")
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            );
    };

    const getStatusIcon = (status) => {
        if (status === "delivered") {
            return (
                <CheckCircle2
                    size={15}
                    className="text-emerald-400"
                />
            );
        }

        if (status === "cancelled") {
            return (
                <XCircle
                    size={15}
                    className="text-red-400"
                />
            );
        }

        if (status === "out_for_delivery") {
            return (
                <Truck
                    size={15}
                    className="text-blue-400"
                />
            );
        }

        return (
            <Clock3
                size={15}
                className="text-orange-400"
            />
        );
    };

    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (date) => {
        if (!date) return "";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );
    };

    // =====================================================
    // RENDER
    // =====================================================

    return (
        <div
            className="
                min-h-screen
                bg-[#0F0F0F]
                px-4
                pb-16
                pt-8
                text-white
                md:px-6
                md:pt-10
            "
        >
            <div className="mx-auto max-w-6xl">

                {/* HEADER */}

                <div
                    className="
                        mb-7
                        flex
                        flex-col
                        gap-4
                        sm:flex-row
                        sm:items-end
                        sm:justify-between
                    "
                >
                    <div>
                        <div
                            className="
                                mb-2
                                flex
                                items-center
                                gap-2
                                text-[#D4AF37]
                            "
                        >
                            <Package size={16} />

                            <span
                                className="
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-[0.18em]
                                "
                            >
                                My Orders
                            </span>
                        </div>

                        <h1
                            className="
                                text-2xl
                                font-bold
                                tracking-tight
                                md:text-3xl
                            "
                        >
                            Your Food Journey
                        </h1>

                        <p
                            className="
                                mt-1.5
                                max-w-xl
                                text-sm
                                text-gray-500
                            "
                        >
                            Your orders, favourites and delicious
                            recommendations — all in one place.
                        </p>
                    </div>

                    <Link
                        to="/menu"
                        className="
                            inline-flex
                            w-fit
                            items-center
                            gap-2
                            rounded-xl
                            bg-gradient-to-r
                            from-[#D4AF37]
                            to-[#FFB800]
                            px-4
                            py-2.5
                            text-xs
                            font-bold
                            text-black
                            transition
                            hover:scale-[1.02]
                        "
                    >
                        <ShoppingBag size={15} />
                        Explore Menu
                    </Link>
                </div>

                {/* ERROR */}

                {error && (
                    <div
                        className="
                            mb-5
                            rounded-xl
                            border
                            border-red-500/20
                            bg-red-500/10
                            px-4
                            py-3
                            text-sm
                            text-red-300
                        "
                    >
                        {error}
                    </div>
                )}

                {/* ORDER SUMMARY */}

                <div
                    className="
                        mb-9
                        grid
                        grid-cols-3
                        gap-2
                        sm:gap-3
                    "
                >
                    <div
                        className="
                            rounded-2xl
                            border
                            border-white/10
                            bg-[#151515]
                            p-3
                            sm:p-4
                        "
                    >
                        <div
                            className="
                                mb-2
                                flex
                                items-center
                                gap-2
                                text-gray-500
                            "
                        >
                            <Package size={15} />

                            <span
                                className="
                                    text-[10px]
                                    uppercase
                                    tracking-wider
                                    sm:text-xs
                                "
                            >
                                Orders
                            </span>
                        </div>

                        <p
                            className="
                                text-xl
                                font-bold
                                text-white
                                sm:text-2xl
                            "
                        >
                            {loading ? "..." : totalOrders}
                        </p>

                        <p
                            className="
                                mt-0.5
                                hidden
                                text-[11px]
                                text-gray-600
                                sm:block
                            "
                        >
                            Total orders
                        </p>
                    </div>

                    <div
                        className="
                            rounded-2xl
                            border
                            border-emerald-500/10
                            bg-[#151515]
                            p-3
                            sm:p-4
                        "
                    >
                        <div
                            className="
                                mb-2
                                flex
                                items-center
                                gap-2
                                text-gray-500
                            "
                        >
                            <CheckCircle2
                                size={15}
                                className="text-emerald-400"
                            />

                            <span
                                className="
                                    text-[10px]
                                    uppercase
                                    tracking-wider
                                    sm:text-xs
                                "
                            >
                                Delivered
                            </span>
                        </div>

                        <p
                            className="
                                text-xl
                                font-bold
                                text-white
                                sm:text-2xl
                            "
                        >
                            {loading ? "..." : deliveredOrders}
                        </p>

                        <p
                            className="
                                mt-0.5
                                hidden
                                text-[11px]
                                text-gray-600
                                sm:block
                            "
                        >
                            Completed orders
                        </p>
                    </div>

                    <div
                        className="
                            rounded-2xl
                            border
                            border-orange-500/10
                            bg-[#151515]
                            p-3
                            sm:p-4
                        "
                    >
                        <div
                            className="
                                mb-2
                                flex
                                items-center
                                gap-2
                                text-gray-500
                            "
                        >
                            <Clock3
                                size={15}
                                className="text-orange-400"
                            />

                            <span
                                className="
                                    text-[10px]
                                    uppercase
                                    tracking-wider
                                    sm:text-xs
                                "
                            >
                                Active
                            </span>
                        </div>

                        <p
                            className="
                                text-xl
                                font-bold
                                text-white
                                sm:text-2xl
                            "
                        >
                            {loading ? "..." : activeOrders}
                        </p>

                        <p
                            className="
                                mt-0.5
                                hidden
                                text-[11px]
                                text-gray-600
                                sm:block
                            "
                        >
                            Active orders
                        </p>
                    </div>
                </div>

                {/* ORDERS */}

                {loading ? (
                    <div
                        className="
                            mb-10
                            rounded-2xl
                            border
                            border-white/10
                            bg-[#151515]
                            p-8
                            text-center
                        "
                    >
                        <div
                            className="
                                mx-auto
                                h-7
                                w-7
                                animate-spin
                                rounded-full
                                border-2
                                border-white/10
                                border-t-[#D4AF37]
                            "
                        />

                        <p
                            className="
                                mt-3
                                text-xs
                                text-gray-500
                            "
                        >
                            Loading your orders...
                        </p>
                    </div>
                ) : orders.length === 0 ? (
                    <div
                        className="
                            mb-10
                            overflow-hidden
                            rounded-2xl
                            border
                            border-[#D4AF37]/10
                            bg-gradient-to-br
                            from-[#1B1A16]
                            via-[#151515]
                            to-[#111111]
                            p-5
                            sm:p-6
                        "
                    >
                        <div
                            className="
                                flex
                                flex-col
                                gap-5
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                            "
                        >
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-4
                                "
                            >
                                <div
                                    className="
                                        flex
                                        h-14
                                        w-14
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        border
                                        border-[#D4AF37]/20
                                        bg-[#D4AF37]/10
                                        text-2xl
                                    "
                                >
                                    🍽️
                                </div>

                                <div>
                                    <h2
                                        className="
                                            text-base
                                            font-semibold
                                            text-white
                                        "
                                    >
                                        No orders yet
                                    </h2>

                                    <p
                                        className="
                                            mt-1
                                            text-xs
                                            leading-relaxed
                                            text-gray-500
                                        "
                                    >
                                        Your first Zestora feast is
                                        waiting for you.
                                    </p>
                                </div>
                            </div>

                            <Link
                                to="/menu"
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-[#D4AF37]/25
                                    px-4
                                    py-2.5
                                    text-xs
                                    font-semibold
                                    text-[#D4AF37]
                                    transition
                                    hover:bg-[#D4AF37]/10
                                "
                            >
                                Browse Food
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                ) : (
                    <section className="mb-10">
                        <div
                            className="
                                mb-4
                                flex
                                items-center
                                justify-between
                            "
                        >
                            <div>
                                <p
                                    className="
                                        text-[10px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.15em]
                                        text-[#D4AF37]
                                    "
                                >
                                    Order history
                                </p>

                                <h2
                                    className="
                                        mt-1
                                        text-lg
                                        font-bold
                                    "
                                >
                                    Your Orders
                                </h2>
                            </div>

                            <span
                                className="
                                    text-xs
                                    text-gray-500
                                "
                            >
                                {orders.length} order
                                {orders.length !== 1 ? "s" : ""}
                            </span>
                        </div>

                        <div className="space-y-3">
                            {orders.map((order) => (
                                <div
                                    key={order._id}
                                    className="
                                        rounded-2xl
                                        border
                                        border-white/10
                                        bg-[#151515]
                                        p-4
                                        transition
                                        hover:border-[#D4AF37]/20
                                        md:p-5
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            flex-col
                                            gap-4
                                            md:flex-row
                                            md:items-center
                                            md:justify-between
                                        "
                                    >
                                        <div>
                                            <div
                                                className="
                                                    flex
                                                    flex-wrap
                                                    items-center
                                                    gap-2
                                                "
                                            >
                                                <span
                                                    className="
                                                        text-sm
                                                        font-bold
                                                        text-white
                                                    "
                                                >
                                                    Order #
                                                    {order._id
                                                        ?.slice(-8)
                                                        .toUpperCase()}
                                                </span>

                                                <span
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        gap-1.5
                                                        rounded-full
                                                        bg-white/5
                                                        px-2.5
                                                        py-1
                                                        text-[10px]
                                                        font-medium
                                                        text-gray-300
                                                    "
                                                >
                                                    {getStatusIcon(
                                                        order.status
                                                    )}

                                                    {getStatusLabel(
                                                        order.status
                                                    )}
                                                </span>
                                            </div>

                                            <p
                                                className="
                                                    mt-1.5
                                                    text-[11px]
                                                    text-gray-500
                                                "
                                            >
                                                {formatDate(
                                                    order.createdAt
                                                )}
                                            </p>
                                        </div>

                                        <div
                                            className="
                                                flex
                                                items-center
                                                justify-between
                                                gap-5
                                                md:justify-end
                                            "
                                        >
                                            <div>
                                                <p
                                                    className="
                                                        text-[10px]
                                                        text-gray-600
                                                    "
                                                >
                                                    Total
                                                </p>

                                                <p
                                                    className="
                                                        text-lg
                                                        font-bold
                                                        text-[#D4AF37]
                                                    "
                                                >
                                                    ₹{order.total}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="
                                            mt-4
                                            border-t
                                            border-white/5
                                            pt-4
                                        "
                                    >
                                        <div
                                            className="
                                                flex
                                                flex-wrap
                                                gap-2
                                            "
                                        >
                                            {order.items?.map(
                                                (item, index) => (
                                                    <div
                                                        key={`${order._id}-${index}`}
                                                        className="
                                                            flex
                                                            items-center
                                                            gap-2
                                                            rounded-xl
                                                            bg-[#1B1B1B]
                                                            px-2.5
                                                            py-2
                                                        "
                                                    >
                                                        {item.image && (
                                                            <img
                                                                src={
                                                                    item.image
                                                                }
                                                                alt={
                                                                    item.name
                                                                }
                                                                className="
                                                                    h-8
                                                                    w-8
                                                                    rounded-lg
                                                                    object-cover
                                                                "
                                                            />
                                                        )}

                                                        <div>
                                                            <p
                                                                className="
                                                                    max-w-32
                                                                    truncate
                                                                    text-[11px]
                                                                    font-medium
                                                                    text-gray-300
                                                                "
                                                            >
                                                                {
                                                                    item.name
                                                                }
                                                            </p>

                                                            <p
                                                                className="
                                                                    text-[9px]
                                                                    text-gray-600
                                                                "
                                                            >
                                                                Qty:{" "}
                                                                {
                                                                    item.quantity
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* RECOMMENDED */}

                <section className="mb-10">
                    <div
                        className="
                            mb-4
                            flex
                            items-end
                            justify-between
                        "
                    >
                        <div>
                            <div
                                className="
                                    mb-1
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                <Flame
                                    size={17}
                                    className="text-orange-400"
                                />

                                <span
                                    className="
                                        text-[10px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.15em]
                                        text-orange-400
                                    "
                                >
                                    Just for you
                                </span>
                            </div>

                            <h2
                                className="
                                    text-lg
                                    font-bold
                                    text-white
                                "
                            >
                                Recommended For You
                            </h2>
                        </div>

                        <Link
                            to="/menu"
                            className="
                                hidden
                                items-center
                                gap-1
                                text-xs
                                text-gray-500
                                transition
                                hover:text-[#D4AF37]
                                sm:flex
                            "
                        >
                            View all
                            <ArrowRight size={13} />
                        </Link>
                    </div>

                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-3
                            md:grid-cols-4
                        "
                    >
                        {recommended.map(
                            (food, index) => (
                                <FoodRecommendationCard
                                    key={getFoodId(food, index)}
                                    food={food}
                                    badge="Recommended"
                                />
                            )
                        )}
                    </div>
                </section>

                {/* CHEF PICKS */}

                <section className="mb-10">
                    <div
                        className="
                            mb-4
                            flex
                            items-end
                            justify-between
                        "
                    >
                        <div>
                            <div
                                className="
                                    mb-1
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                <ChefHat
                                    size={17}
                                    className="text-[#D4AF37]"
                                />

                                <span
                                    className="
                                        text-[10px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.15em]
                                        text-[#D4AF37]
                                    "
                                >
                                    From our kitchen
                                </span>
                            </div>

                            <h2
                                className="
                                    text-lg
                                    font-bold
                                    text-white
                                "
                            >
                                Chef's Picks
                            </h2>
                        </div>
                    </div>

                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-3
                            md:grid-cols-4
                        "
                    >
                        {chefPicks.map(
                            (food, index) => (
                                <FoodRecommendationCard
                                    key={getFoodId(food, index)}
                                    food={food}
                                    badge="Chef's Pick"
                                />
                            )
                        )}
                    </div>
                </section>

                {/* MOST LOVED */}

                <section className="mb-10">
                    <div className="mb-4">
                        <div
                            className="
                                mb-1
                                flex
                                items-center
                                gap-2
                            "
                        >
                            <Sparkles
                                size={16}
                                className="text-[#F5D77A]"
                            />

                            <span
                                className="
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.15em]
                                    text-[#F5D77A]
                                "
                            >
                                Zestora favourites
                            </span>
                        </div>

                        <h2
                            className="
                                text-lg
                                font-bold
                                text-white
                            "
                        >
                            Most Loved
                        </h2>
                    </div>

                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-3
                            md:grid-cols-4
                        "
                    >
                        {mostLoved.map(
                            (food, index) => (
                                <FoodRecommendationCard
                                    key={getFoodId(food, index)}
                                    food={food}
                                    badge="Most Loved"
                                />
                            )
                        )}
                    </div>
                </section>

                {/* FINAL CTA */}

                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-2xl
                        border
                        border-[#D4AF37]/15
                        bg-gradient-to-r
                        from-[#211E14]
                        via-[#171717]
                        to-[#211E14]
                        p-6
                        text-center
                    "
                >
                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-10
                            -top-10
                            h-32
                            w-32
                            rounded-full
                            bg-[#D4AF37]/5
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -bottom-16
                            -left-10
                            h-40
                            w-40
                            rounded-full
                            bg-[#D4AF37]/5
                        "
                    />

                    <div className="relative z-10">
                        <div
                            className="
                                mx-auto
                                mb-3
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-full
                                bg-[#D4AF37]/10
                                text-[#D4AF37]
                            "
                        >
                            <Utensils size={20} />
                        </div>

                        <h2
                            className="
                                text-lg
                                font-bold
                                text-white
                            "
                        >
                            Hungry already?
                        </h2>

                        <p
                            className="
                                mx-auto
                                mt-1
                                max-w-md
                                text-xs
                                text-gray-500
                            "
                        >
                            Discover authentic flavours from
                            the heart of Bengal, prepared fresh
                            for your table.
                        </p>

                        <Link
                            to="/menu"
                            className="
                                mt-4
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                bg-gradient-to-r
                                from-[#D4AF37]
                                to-[#FFB800]
                                px-5
                                py-2.5
                                text-xs
                                font-bold
                                text-black
                                transition
                                hover:scale-[1.02]
                            "
                        >
                            Order Something Delicious
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;