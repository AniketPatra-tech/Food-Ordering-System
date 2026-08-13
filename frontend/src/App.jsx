import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Specials from "./pages/Specials";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import CartDrawer from "./components/CartDrawer/CartDrawer";
import Checkout from "./pages/Checkout";

import Account from "./pages/Account";
import Orders from "./pages/Orders";
import Coupons from "./pages/Coupons";
import Addresses from "./pages/Addresses";

function App() {
    return (
        <div className="min-h-screen bg-[#0F0F0F] text-white">
            <CartDrawer />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/specials" element={<Specials />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/checkout" element={<Checkout />} />

                {/* Account Pages */}
                <Route path="/account" element={<Account />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/addresses" element={<Addresses />} />
                <Route path="/coupons" element={<Coupons />} />
            </Routes>
        </div>
    );
}

export default App;