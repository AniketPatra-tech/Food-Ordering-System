import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import milkshakeBanner from "../../assets/milkshake-banner.png";
import burgerBanner from "../../assets/burger-banner.png";
import vegbengalithali from "../../assets/vegbengalithali-banner.png";
import fishthaliBanner from "../../assets/fishthali-banner.png";
import muttonbiriyaniBanner from "../../assets/muttonbiriyani-banner.png";
import pannertikkaBanner from "../../assets/pannertikka-banner.png";

import FoodTypeBadge from "../FoodTypeBadge/FoodTypeBadge";

const banners = [
  {
    image: milkshakeBanner,
    tag: "LIMITED OFFER",
    title: "Mixed Fruit",
    subtitle: "Dry Fruit Milkshake",
    description: "Fresh fruits blended with premium dry fruits",
    oldPrice: "₹189",
    price: "₹99",
    save: "SAVE ₹90",
    type: "veg",
    accent: {
      tag: "text-pink-400",
      title: "text-pink-500",
      button: "from-pink-500 to-purple-500",
      save: "bg-pink-500/20 text-pink-300",
    },
  },
  {
    image: burgerBanner,
    tag: "CHEF SPECIAL",
    title: "Zestora",
    subtitle: "Signature Burger",
    description: "Juicy grilled burger with premium ingredients",
    oldPrice: "₹299",
    price: "₹199",
    save: "SAVE ₹100",
    type: "nonveg",
    accent: {
      tag: "text-red-400",
      title: "text-red-500",
      button: "from-red-500 to-orange-500",
      save: "bg-red-500/20 text-red-300",
    },
  },
  {
    image: vegbengalithali,
    tag: "BENGALI CULTURE",
    title: "Pure Veg Bengali Thali",
    subtitle: "5 Authentic Dishes",
    description: "Traditional Bengali vegetarian experience",
    oldPrice: "₹349",
    price: "₹229",
    save: "SAVE ₹120",
    type: "veg",
    accent: {
      tag: "text-green-400",
      title: "text-green-500",
      button: "from-green-500 to-emerald-500",
      save: "bg-green-500/20 text-green-300",
    },
  },
  {
    image: fishthaliBanner,
    tag: "BENGALI SPECIAL",
    title: "Fish Bengali Thali",
    subtitle: "Macher Matha Special",
    description: "Authentic Bengali fish delicacy",
    oldPrice: "₹399",
    price: "₹289",
    save: "SAVE ₹110",
    type: "nonveg",
    accent: {
      tag: "text-cyan-400",
      title: "text-cyan-500",
      button: "from-cyan-500 to-blue-600",
      save: "bg-cyan-500/20 text-cyan-300",
    },
  },
  {
    image: muttonbiriyaniBanner,
    tag: "ROYAL SPECIAL",
    title: "Zestora's Special",
    subtitle: "Mutton Biriyani",
    description: "Slow cooked royal Bengali style biriyani",
    oldPrice: "₹499",
    price: "₹299",
    save: "SAVE ₹200",
    type: "nonveg",
    accent: {
      tag: "text-yellow-400",
      title: "text-yellow-500",
      button: "from-yellow-500 to-red-600",
      save: "bg-yellow-500/20 text-yellow-300",
    },
  },
  {
    image: pannertikkaBanner,
    tag: "LIMITED OFFER",
    title: "North Indian Special",
    subtitle: "Paneer Tikka",
    description: "Smoky grilled paneer with spices",
    oldPrice: "₹249",
    price: "₹189",
    save: "SAVE ₹60",
    type: "veg",
    accent: {
      tag: "text-orange-400",
      title: "text-orange-500",
      button: "from-orange-500 to-green-600",
      save: "bg-orange-500/20 text-orange-300",
    },
  },
];

function BannerSlider() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-6 pt-8">
      {/* LEFT BUTTON */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white shadow-xl backdrop-blur-xl transition hover:scale-110 hover:bg-white/40"
      >
        <ChevronLeft size={28} />
      </button>

      {/* SLIDER */}
      <div
        className="flex gap-6 transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${index * 48}%)`,
        }}
      >
        {banners.map((banner, i) => (
          <div
            key={i}
            className="group relative h-[330px] min-w-[48%] overflow-hidden rounded-3xl shadow-2xl"
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent"></div>

            {/* CONTENT */}
            <div className="absolute inset-0 flex items-center p-8">
              <div className="max-w-[65%]">
                <p className={`text-xs tracking-[0.3em] ${banner.accent.tag}`}>
                  {banner.tag}
                </p>

                <h2 className="mt-3 text-3xl font-bold leading-tight text-white">
                  {banner.title}

                  <span className={`block ${banner.accent.title}`}>
                    {banner.subtitle}
                  </span>
                </h2>

                <p className="mt-3 text-sm text-gray-300">
                  {banner.description}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-gray-400 line-through">
                    {banner.oldPrice}
                  </span>

                  <span className="text-4xl font-extrabold text-white">
                    {banner.price}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${banner.accent.save}`}
                  >
                    {banner.save}
                  </span>
                </div>

                <button
                  className={`mt-6 rounded-xl bg-gradient-to-r ${banner.accent.button} px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105`}
                >
                  Order Now
                </button>
              </div>
            </div>

            {/* FOOD TYPE */}
            <div className="absolute right-5 top-5 rounded-lg bg-white/90 px-3 py-2 text-xs font-semibold">
              <div className="absolute right-6 top-6">
                <FoodTypeBadge type={banner.type} />
              </div>
            </div>

            {/* BRAND */}
            <div className="absolute bottom-5 right-6 text-sm text-white">
              Only on
              <span className="ml-1 font-bold text-[#D4AF37]">Zestora</span>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT BUTTON */}
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white shadow-xl backdrop-blur-xl transition hover:scale-110 hover:bg-white/40"
      >
        <ChevronRight size={28} />
      </button>
    </section>
  );
}

export default BannerSlider;