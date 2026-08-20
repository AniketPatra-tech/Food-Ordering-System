import { useState } from "react";
import {
Search,
ShoppingCart,
User,
Menu,
X,
ChevronDown,
UserCircle,
Package,
MapPin,
Ticket,
LogOut,
Utensils,
Navigation
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useAddress } from "../../context/AddressContext";
import AuthModal from "../AuthModal/AuthModal";

function Navbar() {
const [mobileMenu, setMobileMenu] = useState(false);
const [showAuth, setShowAuth] = useState(false);
const [showUserMenu, setShowUserMenu] = useState(false);
const [showAddressMenu, setShowAddressMenu] = useState(false);

const { cartCount, setCartOpen } = useCart();
const { user, logout } = useAuth();
const { addresses, currentAddress } = useAddress();

const navLinks = [
    ["Home", "/"],
    ["Menu", "/menu"],
    ["Specials", "/specials"],
    ["About", "/about"],
    ["Contact", "/contact"],
];

const handleLogout = async () => {
    try {
        await logout();
        setShowUserMenu(false);
        setShowAddressMenu(false);
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

const getAvatar = () => {
    if (user?.gender === "female") {
        return "👩";
    }

    if (user?.gender === "other") {
        return "🧑";
    }

    return "👨";
};

const closeMenus = () => {
    setMobileMenu(false);
    setShowUserMenu(false);
    setShowAddressMenu(false);
};

const getAddressLabel = (address) => {
    if (!address) {
        return "Add delivery address";
    }

    return address.type
        ? address.type.charAt(0).toUpperCase() + address.type.slice(1)
        : "Address";
};

const getAddressText = (address) => {
    if (!address) {
        return "Choose your delivery location";
    }

    return `${address.city || ""}${address.pincode ? ` · ${address.pincode}` : ""}`;
};

return (
    <header className="sticky top-0 z-50 px-2 pt-2 md:px-4 md:pt-3">
        <nav className="
            relative
            mx-auto
            max-w-7xl
            overflow-visible
            rounded-2xl
            border
            border-[#D4AF37]/20
            bg-[#101010]/95
            shadow-xl
            shadow-black/30
            backdrop-blur-xl
        ">

            {/* Heritage Top Line */}
            <div className="
                h-[2px]
                w-full
                bg-gradient-to-r
                from-transparent
                via-[#D4AF37]
                to-transparent
                opacity-80
            " />

            <div className="
                flex
                min-h-[64px]
                items-center
                justify-between
                px-3
                py-2
                md:px-5
            ">

                {/* Logo */}
                <Link
                    to="/"
                    onClick={closeMenus}
                    className="
                        flex
                        shrink-0
                        items-center
                        gap-2.5
                        group
                    "
                >
                    <div
                        className="
                            relative
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            overflow-hidden
                            rounded-xl
                            border
                            border-white/20
                            bg-gradient-to-br
                            from-[#FF9933]
                            via-[#FFF8E7]
                            to-[#138808]
                            text-lg
                            font-black
                            text-black
                            shadow-xl
                            shadow-[#FF9933]/20
                            transition
                            duration-300
                            group-hover:scale-105
                        "
                    >
                        <div className="absolute h-5 w-5 rounded-full border border-[#000080]/20" />
                        <span className="relative z-10">Z</span>
                    </div>

                    <div className="leading-none">
                        <h1
                            className="
                                bg-gradient-to-r
                                from-[#FF9933]
                                via-white
                                to-[#138808]
                                bg-clip-text
                                text-lg
                                font-bold
                                tracking-wide
                                text-transparent
                                drop-shadow-sm
                            "
                        >
                            Zestora
                        </h1>

                        <div className="
                            mt-1
                            flex
                            items-center
                            gap-1.5
                        ">
                            <span className="
                                h-px
                                w-4
                                bg-[#D4AF37]/50
                            " />

                            <p className="
                                text-[9px]
                                uppercase
                                tracking-[0.18em]
                                text-gray-500
                            ">
                                Bengali Kitchen
                            </p>

                            <span className="
                                h-px
                                w-4
                                bg-[#D4AF37]/50
                            " />
                        </div>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <ul className="
                    hidden
                    items-center
                    gap-1
                    md:flex
                ">
                    {navLinks.map(([name, path]) => (
                        <li key={name}>
                            <Link
                                to={path}
                                className="
                                    relative
                                    flex
                                    items-center
                                    rounded-xl
                                    px-3.5
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-gray-300
                                    transition
                                    duration-200
                                    hover:bg-[#D4AF37]/5
                                    hover:text-[#D4AF37]
                                "
                            >
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right Actions */}
                <div className="
                    flex
                    shrink-0
                    items-center
                    gap-1
                    md:gap-2
                ">

                    {/* Current Address */}
                    <div className="relative hidden lg:block">

                        <button
                            type="button"
                            onClick={() => {
                                if (user) {
                                    setShowAddressMenu((prev) => !prev);
                                    setShowUserMenu(false);
                                } else {
                                    setShowAuth(true);
                                }
                            }}
                            className="
                                flex
                                h-10
                                max-w-[190px]
                                items-center
                                gap-2
                                rounded-xl
                                border
                                border-transparent
                                px-2.5
                                text-left
                                transition
                                hover:border-[#D4AF37]/20
                                hover:bg-[#D4AF37]/5
                            "
                            aria-label="Delivery address"
                        >
                            <MapPin
                                size={18}
                                strokeWidth={1.8}
                                className="shrink-0 text-[#D4AF37]"
                            />

                            <div className="min-w-0 leading-tight">
                                <p className="
                                    text-[9px]
                                    font-medium
                                    uppercase
                                    tracking-wider
                                    text-gray-500
                                ">
                                    Deliver to
                                </p>

                                <p className="
                                    truncate
                                    text-xs
                                    font-semibold
                                    text-gray-200
                                ">
                                    {currentAddress
                                        ? getAddressLabel(currentAddress)
                                        : "Add address"}
                                </p>

                                {currentAddress && (
                                    <p className="
                                        truncate
                                        text-[10px]
                                        text-gray-500
                                    ">
                                        {getAddressText(currentAddress)}
                                    </p>
                                )}
                            </div>

                            <ChevronDown
                                size={14}
                                className={`
                                    shrink-0
                                    text-gray-500
                                    transition-transform
                                    duration-200
                                    ${
                                        showAddressMenu
                                            ? "rotate-180"
                                            : ""
                                    }
                                `}
                            />
                        </button>

                        {/* Address Dropdown */}
                        {user && showAddressMenu && (
                            <div className="
                                absolute
                                right-0
                                top-[calc(100%+10px)]
                                z-[100]
                                w-[320px]
                                overflow-hidden
                                rounded-2xl
                                border
                                border-[#D4AF37]/20
                                bg-[#151515]
                                shadow-2xl
                                shadow-black/60
                            ">

                                <div className="
                                    h-[2px]
                                    w-full
                                    bg-gradient-to-r
                                    from-transparent
                                    via-[#D4AF37]
                                    to-transparent
                                " />

                                <div className="
                                    border-b
                                    border-white/10
                                    p-4
                                ">
                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                    ">
                                        <div>
                                            <p className="
                                                text-sm
                                                font-semibold
                                                text-white
                                            ">
                                                Delivery Address
                                            </p>

                                            <p className="
                                                mt-1
                                                text-xs
                                                text-gray-500
                                            ">
                                                Choose where you'd like your food delivered.
                                            </p>
                                        </div>

                                        <Navigation
                                            size={18}
                                            className="text-[#D4AF37]"
                                        />
                                    </div>
                                </div>

                                <div className="max-h-[260px] overflow-y-auto p-2">

                                    {addresses.length === 0 ? (
                                        <div className="
                                            px-3
                                            py-5
                                            text-center
                                        ">
                                            <MapPin
                                                size={24}
                                                className="
                                                    mx-auto
                                                    mb-2
                                                    text-gray-600
                                                "
                                            />

                                            <p className="
                                                text-sm
                                                font-medium
                                                text-gray-300
                                            ">
                                                No saved addresses
                                            </p>

                                            <p className="
                                                mt-1
                                                text-xs
                                                text-gray-500
                                            ">
                                                Add an address for faster delivery.
                                            </p>
                                        </div>
                                    ) : (
                                        addresses.map((address) => (
                                            <Link
                                                key={address._id}
                                                to="/addresses"
                                                onClick={() => setShowAddressMenu(false)}
                                                className={`
                                                    mb-1
                                                    flex
                                                    items-start
                                                    gap-3
                                                    rounded-xl
                                                    border
                                                    p-3
                                                    transition
                                                    ${
                                                        address.isDefault
                                                            ? "border-[#D4AF37]/20 bg-[#D4AF37]/5"
                                                            : "border-transparent hover:bg-white/5"
                                                    }
                                                `}
                                            >
                                                <div className="
                                                    mt-0.5
                                                    flex
                                                    h-8
                                                    w-8
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-lg
                                                    bg-[#222222]
                                                ">
                                                    <MapPin
                                                        size={15}
                                                        className={
                                                            address.isDefault
                                                                ? "text-[#D4AF37]"
                                                                : "text-gray-500"
                                                        }
                                                    />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                    ">
                                                        <p className="
                                                            text-xs
                                                            font-semibold
                                                            capitalize
                                                            text-white
                                                        ">
                                                            {address.type || "Address"}
                                                        </p>

                                                        {address.isDefault && (
                                                            <span className="
                                                                rounded-full
                                                                bg-[#D4AF37]/10
                                                                px-2
                                                                py-0.5
                                                                text-[9px]
                                                                font-medium
                                                                text-[#D4AF37]
                                                            ">
                                                                Current
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="
                                                        mt-1
                                                        line-clamp-2
                                                        text-[11px]
                                                        leading-relaxed
                                                        text-gray-500
                                                    ">
                                                        {address.fullAddress}
                                                    </p>

                                                    <p className="
                                                        mt-1
                                                        text-[10px]
                                                        text-gray-600
                                                    ">
                                                        {address.city} · {address.pincode}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))
                                    )}

                                </div>

                                <div className="
                                    border-t
                                    border-white/10
                                    p-2
                                ">
                                    <Link
                                        to="/addresses"
                                        onClick={() => setShowAddressMenu(false)}
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-xl
                                            bg-[#D4AF37]/10
                                            px-3
                                            py-2.5
                                            text-xs
                                            font-semibold
                                            text-[#D4AF37]
                                            transition
                                            hover:bg-[#D4AF37]/15
                                        "
                                    >
                                        <MapPin size={15} />
                                        View All Addresses
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Search */}
                    <button
                        type="button"
                        className="
                            hidden
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            text-gray-300
                            transition
                            hover:bg-white/5
                            hover:text-[#D4AF37]
                            sm:flex
                        "
                        aria-label="Search"
                    >
                        <Search size={19} strokeWidth={1.8} />
                    </button>

                    {/* Cart */}
                    <button
                        type="button"
                        onClick={() => setCartOpen(true)}
                        className="
                            relative
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            text-gray-300
                            transition
                            hover:bg-white/5
                            hover:text-[#D4AF37]
                        "
                        aria-label="Shopping cart"
                    >
                        <ShoppingCart
                            size={20}
                            strokeWidth={1.8}
                        />

                        {cartCount > 0 && (
                            <span className="
                                absolute
                                right-0
                                top-0
                                flex
                                h-[17px]
                                min-w-[17px]
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-[#101010]
                                bg-[#D4AF37]
                                px-1
                                text-[9px]
                                font-bold
                                text-black
                            ">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* User */}
                    <div className="relative hidden sm:block">

                        <button
                            type="button"
                            onClick={() => {
                                if (user) {
                                    setShowUserMenu((prev) => !prev);
                                    setShowAddressMenu(false);
                                } else {
                                    setShowAuth(true);
                                }
                            }}
                            className="
                                flex
                                h-10
                                items-center
                                gap-1
                                rounded-xl
                                border
                                border-transparent
                                px-2
                                text-gray-300
                                transition
                                hover:border-[#D4AF37]/20
                                hover:bg-[#D4AF37]/5
                                hover:text-[#D4AF37]
                            "
                            aria-label="Account"
                        >
                            {user ? (
                                <>
                                    <span className="
                                        flex
                                        h-7
                                        w-7
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-[#D4AF37]/30
                                        bg-[#202020]
                                        text-base
                                    ">
                                        {getAvatar()}
                                    </span>

                                    <ChevronDown
                                        size={14}
                                        className={`
                                            ml-0.5
                                            transition-transform
                                            duration-200
                                            ${
                                                showUserMenu
                                                    ? "rotate-180"
                                                    : ""
                                            }
                                        `}
                                    />
                                </>
                            ) : (
                                <User
                                    size={20}
                                    strokeWidth={1.8}
                                />
                            )}
                        </button>

                        {/* User Dropdown */}
                        {user && showUserMenu && (
                            <div className="
                                absolute
                                right-0
                                top-[calc(100%+10px)]
                                z-[100]
                                w-[290px]
                                overflow-hidden
                                rounded-2xl
                                border
                                border-[#D4AF37]/20
                                bg-[#151515]
                                shadow-2xl
                                shadow-black/60
                            ">

                                <div className="
                                    h-[2px]
                                    w-full
                                    bg-gradient-to-r
                                    from-transparent
                                    via-[#D4AF37]
                                    to-transparent
                                " />

                                {/* User Header */}
                                <div className="
                                    border-b
                                    border-white/10
                                    bg-gradient-to-br
                                    from-[#202020]
                                    to-[#151515]
                                    p-4
                                ">
                                    <div className="
                                        flex
                                        items-center
                                        gap-3
                                    ">
                                        <div className="
                                            flex
                                            h-12
                                            w-12
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            border
                                            border-[#D4AF37]/30
                                            bg-[#292929]
                                            text-2xl
                                        ">
                                            {getAvatar()}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="
                                                truncate
                                                text-sm
                                                font-semibold
                                                text-white
                                            ">
                                                {user.name}
                                            </p>

                                            <p className="
                                                mt-0.5
                                                truncate
                                                text-xs
                                                text-gray-500
                                            ">
                                                {user.email}
                                            </p>

                                            <p className="
                                                mt-1.5
                                                text-[10px]
                                                font-medium
                                                uppercase
                                                tracking-wider
                                                text-[#D4AF37]
                                            ">
                                                Welcome back
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Account Options */}
                                <div className="p-2">

                                    <Link
                                        to="/account"
                                        onClick={() => setShowUserMenu(false)}
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-3
                                            py-2.5
                                            text-sm
                                            text-gray-300
                                            transition
                                            hover:bg-[#D4AF37]/5
                                            hover:text-[#D4AF37]
                                        "
                                    >
                                        <UserCircle size={18} />
                                        <span>Your Account</span>
                                    </Link>

                                    <Link
                                        to="/orders"
                                        onClick={() => setShowUserMenu(false)}
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-3
                                            py-2.5
                                            text-sm
                                            text-gray-300
                                            transition
                                            hover:bg-[#D4AF37]/5
                                            hover:text-[#D4AF37]
                                        "
                                    >
                                        <Package size={18} />
                                        <span>Your Orders</span>
                                    </Link>

                                    <Link
                                        to="/addresses"
                                        onClick={() => setShowUserMenu(false)}
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-3
                                            py-2.5
                                            text-sm
                                            text-gray-300
                                            transition
                                            hover:bg-[#D4AF37]/5
                                            hover:text-[#D4AF37]
                                        "
                                    >
                                        <MapPin size={18} />
                                        <span>Your Addresses</span>
                                    </Link>

                                    <Link
                                        to="/coupons"
                                        onClick={() => setShowUserMenu(false)}
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-3
                                            py-2.5
                                            text-sm
                                            text-gray-300
                                            transition
                                            hover:bg-[#D4AF37]/5
                                            hover:text-[#D4AF37]
                                        "
                                    >
                                        <Ticket size={18} />
                                        <span>Your Coupons</span>
                                    </Link>
                                </div>

                                <div className="
                                    mx-3
                                    h-px
                                    bg-white/10
                                " />

                                {/* Logout */}
                                <div className="p-2">
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-3
                                            py-2.5
                                            text-sm
                                            text-red-400
                                            transition
                                            hover:bg-red-500/10
                                        "
                                    >
                                        <LogOut size={18} />
                                        <span>Log Out</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() => setMobileMenu((prev) => !prev)}
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            text-gray-200
                            transition
                            hover:bg-white/5
                            hover:text-[#D4AF37]
                            md:hidden
                        "
                        aria-label="Toggle menu"
                    >
                        {mobileMenu ? (
                            <X size={23} />
                        ) : (
                            <Menu size={23} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenu && (
                <div className="
                    border-t
                    border-white/10
                    px-3
                    pb-3
                    md:hidden
                ">
                    <div className="
                        mt-2
                        rounded-2xl
                        border
                        border-white/10
                        bg-[#151515]
                        p-2
                    ">

                        {/* Mobile Address */}
                        {user && (
                            <Link
                                to="/addresses"
                                onClick={closeMenus}
                                className="
                                    mb-2
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    border
                                    border-[#D4AF37]/10
                                    bg-[#1c1c1c]
                                    p-3
                                "
                            >
                                <div className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-[#D4AF37]/10
                                ">
                                    <MapPin
                                        size={19}
                                        className="text-[#D4AF37]"
                                    />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="
                                        text-[10px]
                                        font-medium
                                        uppercase
                                        tracking-wider
                                        text-gray-500
                                    ">
                                        Deliver to
                                    </p>

                                    <p className="
                                        truncate
                                        text-sm
                                        font-semibold
                                        text-white
                                    ">
                                        {currentAddress
                                            ? getAddressLabel(currentAddress)
                                            : "Add delivery address"}
                                    </p>

                                    <p className="
                                        truncate
                                        text-xs
                                        text-gray-500
                                    ">
                                        {getAddressText(currentAddress)}
                                    </p>
                                </div>

                                <ChevronDown
                                    size={17}
                                    className="
                                        shrink-0
                                        -rotate-90
                                        text-gray-500
                                    "
                                />
                            </Link>
                        )}

                        {/* Mobile User Section */}
                        {user ? (
                            <Link
                                to="/account"
                                onClick={closeMenus}
                                className="
                                    mb-2
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    border
                                    border-[#D4AF37]/10
                                    bg-[#1c1c1c]
                                    p-3
                                "
                            >
                                <div className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-[#292929]
                                    text-xl
                                ">
                                    {getAvatar()}
                                </div>

                                <div className="min-w-0">
                                    <p className="
                                        truncate
                                        text-sm
                                        font-semibold
                                        text-white
                                    ">
                                        {user.name}
                                    </p>

                                    <p className="
                                        truncate
                                        text-xs
                                        text-gray-500
                                    ">
                                        View your account
                                    </p>
                                </div>
                            </Link>
                        ) : (
                            <button
                                type="button"
                                onClick={() => {
                                    setShowAuth(true);
                                    setMobileMenu(false);
                                }}
                                className="
                                    mb-2
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    rounded-xl
                                    bg-[#D4AF37]/10
                                    p-3
                                    text-left
                                    text-sm
                                    font-medium
                                    text-[#D4AF37]
                                "
                            >
                                <UserCircle size={19} />
                                Login / Create Account
                            </button>
                        )}

                        {/* Navigation */}
                        {navLinks.map(([name, path]) => (
                            <Link
                                key={name}
                                to={path}
                                onClick={() => setMobileMenu(false)}
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-3
                                    py-3
                                    text-sm
                                    text-gray-300
                                    transition
                                    hover:bg-[#D4AF37]/5
                                    hover:text-[#D4AF37]
                                "
                            >
                                <Utensils
                                    size={16}
                                    className="text-[#D4AF37]/70"
                                />
                                {name}
                            </Link>
                        ))}

                        {/* Mobile Account Options */}
                        {user && (
                            <>
                                <div className="
                                    my-2
                                    h-px
                                    bg-white/10
                                " />

                                <Link
                                    to="/orders"
                                    onClick={closeMenus}
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        rounded-xl
                                        px-3
                                        py-3
                                        text-sm
                                        text-gray-300
                                        hover:bg-white/5
                                        hover:text-[#D4AF37]
                                    "
                                >
                                    <Package size={17} />
                                    Your Orders
                                </Link>

                                <Link
                                    to="/addresses"
                                    onClick={closeMenus}
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        rounded-xl
                                        px-3
                                        py-3
                                        text-sm
                                        text-gray-300
                                        hover:bg-white/5
                                        hover:text-[#D4AF37]
                                    "
                                >
                                    <MapPin size={17} />
                                    Your Addresses
                                </Link>

                                <Link
                                    to="/coupons"
                                    onClick={closeMenus}
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        rounded-xl
                                        px-3
                                        py-3
                                        text-sm
                                        text-gray-300
                                        hover:bg-white/5
                                        hover:text-[#D4AF37]
                                    "
                                >
                                    <Ticket size={17} />
                                    Your Coupons
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="
                                        mt-1
                                        flex
                                        w-full
                                        items-center
                                        gap-3
                                        rounded-xl
                                        px-3
                                        py-3
                                        text-left
                                        text-sm
                                        text-red-400
                                        hover:bg-red-500/10
                                    "
                                >
                                    <LogOut size={17} />
                                    Log Out
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>

        {showAuth && (
            <AuthModal
                closeModal={() => setShowAuth(false)}
            />
        )}
    </header>
);
}

export default Navbar;
