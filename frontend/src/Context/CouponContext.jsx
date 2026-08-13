import {
    createContext,
    useContext,
    useState
} from "react";

import axios from "axios";

const CouponContext = createContext();


export function CouponProvider({ children }) {
    const [appliedCoupon, setAppliedCoupon] =
        useState(null);

    const [couponLoading, setCouponLoading] =
        useState(false);

    const [couponError, setCouponError] =
        useState("");


    // =====================================================
    // APPLY COUPON
    // =====================================================

    const applyCoupon = async (
        code,
        orderAmount
    ) => {
        setCouponError("");
        setCouponLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/coupons/apply",
                {
                    code,
                    orderAmount
                },
                {
                    withCredentials: true
                }
            );

            if (response.data.success) {
                const couponData = {
                    ...response.data.coupon,

                    // Actual calculated discount
                    discount:
                        response.data.discount,

                    // Amount before coupon
                    orderAmount:
                        response.data.orderAmount,

                    // Amount after coupon
                    finalAmount:
                        response.data.finalAmount
                };

                setAppliedCoupon(couponData);

                return {
                    success: true,
                    data: couponData
                };
            }

            return {
                success: false,
                message:
                    "Unable to apply coupon."
            };

        } catch (error) {
            console.error(
                "Apply coupon error:",
                error
            );

            const message =
                error.response?.data?.message ||
                "Unable to apply coupon.";

            setCouponError(message);

            setAppliedCoupon(null);

            return {
                success: false,
                message
            };

        } finally {
            setCouponLoading(false);
        }
    };


    // =====================================================
    // REMOVE COUPON
    // =====================================================

    const removeCoupon = () => {
        setAppliedCoupon(null);
        setCouponError("");
    };


    // =====================================================
    // CHECK COUPON
    // =====================================================

    const isCouponApplied = (code) => {
        return (
            appliedCoupon?.code ===
            code
        );
    };


    // =====================================================
    // CLEAR ERROR
    // =====================================================

    const clearCouponError = () => {
        setCouponError("");
    };


    return (
        <CouponContext.Provider
            value={{
                appliedCoupon,

                couponLoading,

                couponError,

                applyCoupon,

                removeCoupon,

                isCouponApplied,

                clearCouponError
            }}
        >
            {children}
        </CouponContext.Provider>
    );
}


export function useCoupon() {
    const context =
        useContext(CouponContext);

    if (!context) {
        throw new Error(
            "useCoupon must be used inside CouponProvider"
        );
    }

    return context;
}