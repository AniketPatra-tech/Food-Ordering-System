import { createContext, useContext, useMemo, useState } from "react";
import { useCart } from "./CartContext";
import { useCoupon } from "./CouponContext";

const BillingContext = createContext();

const FREE_DELIVERY_THRESHOLD = 299;
const DELIVERY_FEE = 40;

export function BillingProvider({ children }) {
    const { cartItems = [] } = useCart();
    const { appliedCoupon } = useCoupon();

    const [tip, setTip] = useState(0);

    const subtotal = useMemo(() => {
        return cartItems.reduce(
            (total, item) =>
                total +
                (item.price || 0) * (item.quantity || 1),
            0
        );
    }, [cartItems]);

    const discount = useMemo(() => {
        if (!appliedCoupon) return 0;

        if (
            appliedCoupon.code === "FIRST30" &&
            subtotal >= 149
        ) {
            return Math.min(subtotal * 0.3, 100);
        }

        return 0;
    }, [subtotal, appliedCoupon]);

    const packagingFee = useMemo(() => {
        return cartItems.reduce((total, item) => {
            const qty = item.quantity || 1;
            const type = item.packagingType || "simple";

            const fee = type === "container" ? 3 : 1;

            return total + fee * qty;
        }, 0);
    }, [cartItems]);

    const deliveryFee =
        subtotal >= FREE_DELIVERY_THRESHOLD
            ? 0
            : DELIVERY_FEE;

    const freeDeliveryUnlocked =
        subtotal >= FREE_DELIVERY_THRESHOLD;

    const remainingForFreeDelivery = Math.max(
        FREE_DELIVERY_THRESHOLD - subtotal,
        0
    );

    const grandTotal =
        subtotal -
        discount +
        packagingFee +
        deliveryFee +
        tip;

    return (
        <BillingContext.Provider
            value={{
                subtotal,
                discount,
                packagingFee,
                deliveryFee,
                tip,
                setTip,
                grandTotal,
                freeDeliveryUnlocked,
                remainingForFreeDelivery,
                FREE_DELIVERY_THRESHOLD
            }}
        >
            {children}
        </BillingContext.Provider>
    );
}

export function useBilling() {
    return useContext(BillingContext);
}