import { useState } from "react";
import axios from "axios";
import { X, Mail, Lock, UserRound, Phone } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AuthModal = ({ closeModal }) => {
    const { setUser } = useAuth();

    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = isLogin
                ? "http://localhost:5000/api/auth/login"
                : "http://localhost:5000/api/auth/register";

            const response = await axios.post(
                url,
                formData,
                {
                    withCredentials: true
                }
            );

            if (isLogin) {
                setUser(response.data.user);
                closeModal();
            } else {
                alert("Account created successfully");
                setIsLogin(true);
            }

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    return (
        <div className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/70
            backdrop-blur-sm
        ">

            <div className="
                relative
                w-[90%]
                max-w-md
                rounded-3xl
                border
                border-[#D4AF37]/20
                bg-[#111111]
                p-8
                shadow-2xl
            ">

                <button
                    onClick={closeModal}
                    className="
                    absolute
                    right-5
                    top-5
                    text-gray-400
                    hover:text-[#D4AF37]
                    transition
                    "
                >
                    <X size={22}/>
                </button>


                <div className="text-center mb-7">

                    <div className="
                        mx-auto
                        mb-3
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-[#D4AF37]
                        to-[#FFB800]
                        text-black
                        text-2xl
                        font-black
                    ">
                        Z
                    </div>

                    <h2 className="
                        text-2xl
                        font-bold
                        text-white
                    ">
                        {isLogin
                            ? "Welcome Back"
                            : "Welcome to Zestora"
                        }
                    </h2>

                    <p className="
                        mt-2
                        text-sm
                        text-gray-400
                    ">
                        {isLogin
                            ? "Login to continue your food journey"
                            : "Create your account and enjoy delicious meals"
                        }
                    </p>

                </div>


                <form onSubmit={handleSubmit} className="space-y-4">


                    {!isLogin && (
                        <div className="relative">

                            <UserRound
                                size={18}
                                className="
                                absolute
                                left-4
                                top-3.5
                                text-gray-400
                                "
                            />

                            <input
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                bg-white/5
                                py-3
                                pl-11
                                text-white
                                outline-none
                                focus:border-[#D4AF37]
                                "
                            />

                        </div>
                    )}


                    <div className="relative">

                        <Mail
                            size={18}
                            className="
                            absolute
                            left-4
                            top-3.5
                            text-gray-400
                            "
                        />

                        <input
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="
                            w-full
                            rounded-xl
                            border
                            border-white/10
                            bg-white/5
                            py-3
                            pl-11
                            text-white
                            outline-none
                            focus:border-[#D4AF37]
                            "
                        />

                    </div>


                    {!isLogin && (
                        <div className="relative">

                            <Phone
                                size={18}
                                className="
                                absolute
                                left-4
                                top-3.5
                                text-gray-400
                                "
                            />

                            <input
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                bg-white/5
                                py-3
                                pl-11
                                text-white
                                outline-none
                                focus:border-[#D4AF37]
                                "
                            />

                        </div>
                    )}


                    <div className="relative">

                        <Lock
                            size={18}
                            className="
                            absolute
                            left-4
                            top-3.5
                            text-gray-400
                            "
                        />

                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="
                            w-full
                            rounded-xl
                            border
                            border-white/10
                            bg-white/5
                            py-3
                            pl-11
                            text-white
                            outline-none
                            focus:border-[#D4AF37]
                            "
                        />

                    </div>


                    <button
                        className="
                        w-full
                        rounded-xl
                        bg-gradient-to-r
                        from-[#D4AF37]
                        to-[#FFB800]
                        py-3
                        font-bold
                        text-black
                        transition
                        hover:scale-[1.02]
                        "
                    >
                        {isLogin ? "Login" : "Create Account"}
                    </button>

                </form>


                <div className="
                    mt-6
                    text-center
                    text-sm
                    text-gray-400
                ">

                    {isLogin
                        ? "New to Zestora?"
                        : "Already have an account?"
                    }

                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="
                        ml-2
                        font-semibold
                        text-[#D4AF37]
                        "
                    >
                        {isLogin
                            ? "Register"
                            : "Login"
                        }
                    </button>

                </div>

            </div>

        </div>
    );
};

export default AuthModal;