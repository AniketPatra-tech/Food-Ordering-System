import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Copy,
    Check,
    Sparkles,
    Tag
} from "lucide-react";

import welcomeCoupon from "../assets/coupons/welcome-coupon.png";
import { useCoupon } from "../context/CouponContext";

const Coupons = () => {
    const [copied, setCopied] = useState(false);

    const navigate = useNavigate();

    const {
        selectedCoupon,
        setSelectedCoupon
    } = useCoupon();

    const couponCode = "FIRST30";

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(
                couponCode
            );

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error(
                "Copy failed:",
                error
            );
        }
    };

    const handleApplyCoupon = () => {
        const coupon = {
            code: "FIRST30",
            discountType: "percentage",
            discountValue: 30,
            minOrder: 149
        };

        setSelectedCoupon(coupon);

        setTimeout(() => {
            navigate("/menu");
        }, 500);
    };

    return (
        <div className="min-h-screen bg-[#0F0F0F] px-4 py-8 text-white md:px-6">
            <div className="mx-auto max-w-5xl">

                {/* HEADER */}

                <div className="mb-7">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                        Zestora Offers
                    </p>

                    <h1 className="text-2xl font-bold tracking-tight">
                        Coupons & Rewards
                    </h1>

                    <p className="mt-1 text-xs text-gray-500">
                        Exclusive savings for your
                        Zestora orders.
                    </p>
                </div>

                {/* SELECTED COUPON */}

                {selectedCoupon && (
                    <div className="mb-5 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3">
                        <p className="text-sm font-medium text-green-400">
                            Selected Coupon:
                            <span className="ml-1 font-bold">
                                {selectedCoupon.code}
                            </span>
                        </p>

                        <p className="mt-1 text-xs text-green-300">
                            Add food to your cart and
                            the discount will be applied
                            automatically if the minimum
                            order value is met.
                        </p>
                    </div>
                )}

                {/* COUPONS */}

                <div className="grid gap-4 md:grid-cols-2">

                    {/* WELCOME COUPON */}

                    <div className="group overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-[#151515] transition duration-300 hover:border-[#D4AF37]/40 hover:shadow-xl hover:shadow-black/30">

                        {/* IMAGE */}

                        <div className="aspect-video overflow-hidden bg-[#181818]">
                            <img
                                src={welcomeCoupon}
                                alt="Zestora Welcome Offer"
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                            />
                        </div>

                        {/* DETAILS */}

                        <div className="p-4">

                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <Sparkles
                                            size={13}
                                            className="text-[#D4AF37]"
                                        />

                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37]">
                                            Welcome Offer
                                        </span>
                                    </div>

                                    <h2 className="mt-1 text-base font-bold text-white">
                                        30% OFF
                                    </h2>

                                    <p className="mt-0.5 text-[11px] text-gray-500">
                                        Get 30% OFF on your first
                                        order • Minimum cart value ₹149
                                    </p>
                                </div>

                                <span className="rounded-full bg-[#D4AF37]/10 px-2 py-1 text-[9px] font-bold text-[#D4AF37]">
                                    NEW USER
                                </span>
                            </div>

                            {/* CODE */}

                            <div className="mt-3 flex items-center gap-2">

                                <div className="flex-1 rounded-lg border border-dashed border-[#D4AF37]/25 bg-black/20 px-3 py-2">
                                    <span className="font-mono text-xs font-bold tracking-wider text-[#F5D77A]">
                                        {couponCode}
                                    </span>
                                </div>

                                {/* COPY BUTTON */}

                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    className="flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-[10px] font-bold text-white transition hover:border-[#D4AF37]/30"
                                >
                                    {copied ? (
                                        <>
                                            <Check size={13} />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={13} />
                                            Copy
                                        </>
                                    )}
                                </button>

                                {/* USE COUPON BUTTON */}

                                <button
                                    type="button"
                                    onClick={handleApplyCoupon}
                                    disabled={
                                        selectedCoupon?.code ===
                                        "FIRST30"
                                    }
                                    className={
                                        selectedCoupon?.code ===
                                        "FIRST30"
                                            ? "flex h-9 items-center rounded-lg bg-green-500 px-3 text-[10px] font-bold text-white"
                                            : "flex h-9 items-center rounded-lg bg-[#D4AF37] px-3 text-[10px] font-bold text-black transition hover:bg-[#F5D77A]"
                                    }
                                >
                                    {selectedCoupon?.code ===
                                    "FIRST30"
                                        ? "Selected ✓"
                                        : "Use Coupon"}
                                </button>
                            </div>

                            <div className="mt-3 flex items-center gap-1.5 border-t border-white/5 pt-3 text-[9px] text-gray-600">
                                <Tag
                                    size={11}
                                    className="text-[#D4AF37]"
                                />

                                One use per user •
                                New users only
                            </div>
                        </div>
                    </div>

                    {/* COMING SOON */}

                    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-[#151515] transition duration-300 hover:border-white/20">

                        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#1c1a15] via-[#151515] to-[#101010]">

                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#D4AF37]">
                                    <Sparkles size={19} />
                                </div>

                                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                                    Coming Soon
                                </p>

                                <p className="mt-1 text-sm font-semibold text-white">
                                    More rewards are on the way
                                </p>
                            </div>

                            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#D4AF37]/5 blur-2xl" />
                            <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-[#D4AF37]/5 blur-2xl" />
                        </div>

                        <div className="p-4">
                            <div className="flex items-start gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                                    <Tag size={16} />
                                </div>

                                <div>
                                    <h2 className="text-base font-bold text-white">
                                        More offers coming soon
                                    </h2>

                                    <p className="mt-1 text-[11px] leading-relaxed text-gray-500">
                                        We're preparing exclusive deals
                                        for our Zestora family.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Coupons;