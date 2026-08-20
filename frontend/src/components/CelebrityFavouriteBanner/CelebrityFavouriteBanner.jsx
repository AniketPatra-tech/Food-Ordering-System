import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import viratBanner from "../../assets/banners/ViratKohliBanner.png";
import rohitBanner from "../../assets/banners/RohitSharmaBanner.png";
import dhoniBanner from "../../assets/banners/MSDBanner.png";
import sahaBanner from "../../assets/banners/WridhhimanSahaBanner.png";

const banners = [
    { image: viratBanner },
    { image: rohitBanner },
    { image: dhoniBanner },
    { image: sahaBanner }
];

export default function CelebrityFavouriteBanner() {
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isHovered]);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % banners.length);
    };

    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0
                ? banners.length - 1
                : prev - 1
        );
    };

    return (
        <section className="px-3 py-4 md:px-4 md:py-6">
            <div className="mx-auto max-w-7xl">

                {/* Section Header */}

                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                            Celebrity Favourites
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-white md:text-2xl">
                            Meals Loved By Icons
                        </h2>
                    </div>

                    <div className="hidden md:flex items-center gap-2">
                        <button
                            onClick={prevSlide}
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-[#D4AF37]/20
                                bg-[#151515]
                                text-gray-300
                                transition
                                hover:border-[#D4AF37]/40
                                hover:text-[#D4AF37]
                            "
                        >
                            <ChevronLeft size={18} />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-[#D4AF37]/20
                                bg-[#151515]
                                text-gray-300
                                transition
                                hover:border-[#D4AF37]/40
                                hover:text-[#D4AF37]
                            "
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Slider */}

                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-3xl
                        border
                        border-[#D4AF37]/15
                        bg-[#111111]
                        shadow-[0_25px_80px_rgba(0,0,0,0.55)]
                    "
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Premium Glow */}

                    <div className="pointer-events-none absolute inset-0 z-10 rounded-3xl ring-1 ring-white/5" />

                    <div
                        className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{
                            transform: `translateX(-${current * 100}%)`
                        }}
                    >
                        {banners.map((banner, index) => (
                            <div
                                key={index}
                                className="min-w-full"
                            >
                                <img
                                    src={banner.image}
                                    alt={`Celebrity Favourite ${index + 1}`}
                                    className="
                                        block
                                        w-full
                                        h-auto
                                        select-none
                                    "
                                    draggable={false}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Mobile Arrows */}

                    <button
                        onClick={prevSlide}
                        className="
                            absolute
                            left-3
                            top-1/2
                            z-20
                            flex
                            h-9
                            w-9
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/10
                            bg-black/40
                            text-white
                            backdrop-blur-md
                            md:hidden
                        "
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="
                            absolute
                            right-3
                            top-1/2
                            z-20
                            flex
                            h-9
                            w-9
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/10
                            bg-black/40
                            text-white
                            backdrop-blur-md
                            md:hidden
                        "
                    >
                        <ChevronRight size={16} />
                    </button>

                    {/* Indicators */}

                    <div
                        className="
                            absolute
                            bottom-4
                            left-1/2
                            z-20
                            flex
                            -translate-x-1/2
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-white/10
                            bg-black/30
                            px-3
                            py-2
                            backdrop-blur-md
                        "
                    >
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() =>
                                    setCurrent(index)
                                }
                                className={`
                                    transition-all
                                    duration-300
                                    ${
                                        current === index
                                            ? "h-2 w-8 rounded-full bg-[#D4AF37]"
                                            : "h-2 w-2 rounded-full bg-white/40 hover:bg-white/60"
                                    }
                                `}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}