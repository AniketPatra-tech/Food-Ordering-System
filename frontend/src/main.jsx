import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AddressProvider } from "./context/AddressContext.jsx";
import { CouponProvider } from "./context/CouponContext";
import { BillingProvider } from "./context/BillingContext";


createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <CouponProvider>
                        <BillingProvider>
                            <AddressProvider>
                                <App />
                            </AddressProvider>
                        </BillingProvider>
                    </CouponProvider>
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);