import { useState } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import AuthModal from "../AuthModal/AuthModal";

function Navbar() {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showAuth, setShowAuth] = useState(false);

    const { cartCount, setCartOpen } = useCart();

    const navLinks = [
        ["Home", "/"],
        ["Menu", "/menu"],
        ["Specials", "/specials"],
        ["About", "/about"],
        ["Contact", "/contact"],
    ];

    return (
        <header className="sticky top-0 z-40">

            <nav className="
                mx-auto
                flex
                max-w-7xl
                items-center
                justify-between
                px-3
                py-3
                md:px-5
                rounded-2xl
                border
                border-white/10
                bg-[#111111]/90
                backdrop-blur-xl
            ">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-2"
                >
                    <div className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-gradient-to-br
                        from-[#D4AF37]
                        to-[#FFB800]
                        text-lg
                        font-black
                        text-black
                        shadow-lg
                        shadow-yellow-500/20
                    ">
                        Z
                    </div>

                    <div className="leading-tight">
                        <h1 className="
                            bg-gradient-to-r
                            from-[#D4AF37]
                            to-[#F5D77A]
                            bg-clip-text
                            text-base
                            font-bold
                            text-transparent
                        ">
                            Zestora
                        </h1>

                        <p className="
                            text-[10px]
                            text-gray-400
                        ">
                            Restaurant
                        </p>
                    </div>
                </Link>


                {/* Desktop Menu */}
                <ul className="
                    hidden
                    items-center
                    gap-6
                    text-sm
                    font-medium
                    md:flex
                ">
                    {navLinks.map(([name, path]) => (
                        <li key={name}>
                            <Link
                                to={path}
                                className="
                                    text-gray-300
                                    transition
                                    hover:text-[#D4AF37]
                                "
                            >
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>


                {/* Actions */}
                <div className="
                    flex
                    items-center
                    gap-2
                ">

                    <button
                        className="
                        hidden
                        text-gray-300
                        transition
                        hover:text-[#D4AF37]
                        sm:block
                        "
                    >
                        <Search size={20}/>
                    </button>


                    <button
                        onClick={() => setCartOpen(true)}
                        className="
                        relative
                        text-gray-300
                        transition
                        hover:text-[#D4AF37]
                        "
                    >
                        <ShoppingCart size={21}/>

                        {cartCount > 0 && (
                            <span className="
                                absolute
                                -right-2
                                -top-2
                                flex
                                h-4
                                w-4
                                items-center
                                justify-center
                                rounded-full
                                bg-red-500
                                text-[9px]
                                font-bold
                                text-white
                            ">
                                {cartCount}
                            </span>
                        )}
                    </button>


                    <button
                        onClick={() => setShowAuth(true)}
                        className="
                        hidden
                        text-gray-300
                        transition
                        hover:text-[#D4AF37]
                        sm:block
                        "
                    >
                        <User size={21}/>
                    </button>


                    <button
                        onClick={() => setMobileMenu(!mobileMenu)}
                        className="
                        text-white
                        md:hidden
                        "
                    >
                        {mobileMenu
                            ? <X size={24}/>
                            : <Menu size={24}/>
                        }
                    </button>

                </div>

            </nav>


            {/* Mobile Menu */}
            {mobileMenu && (
                <div className="
                    mx-3
                    mt-2
                    rounded-xl
                    border
                    border-white/10
                    bg-[#111111]
                    md:hidden
                ">

                    <ul className="p-3">

                        {navLinks.map(([name, path]) => (
                            <li key={name}>
                                <Link
                                    to={path}
                                    onClick={() => setMobileMenu(false)}
                                    className="
                                    block
                                    rounded-lg
                                    px-3
                                    py-2
                                    text-sm
                                    text-gray-300
                                    hover:bg-white/5
                                    hover:text-[#D4AF37]
                                    "
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}

                    </ul>

                </div>
            )}


            {showAuth && (
                <AuthModal
                    closeModal={() => setShowAuth(false)}
                />
            )}

        </header>
    );
}

export default Navbar;