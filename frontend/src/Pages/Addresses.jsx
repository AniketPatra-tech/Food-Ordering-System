import { useEffect, useState } from "react";
import {
    MapPin,
    Plus,
    Pencil,
    Trash2,
    Home,
    Briefcase,
    MapPinned,
    Check,
    X
} from "lucide-react";
import axios from "axios";

const Addresses = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        type: "home",
        fullAddress: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
        isDefault: false
    });

    const fetchAddresses = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                "http://localhost:5000/api/addresses",
                {
                    withCredentials: true
                }
            );

            setAddresses(response.data.addresses || []);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load addresses"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const getAddressIcon = (type) => {
        if (type === "home") {
            return <Home size={19} />;
        }

        if (type === "work") {
            return <Briefcase size={19} />;
        }

        return <MapPinned size={19} />;
    };

    const getAddressLabel = (type) => {
        if (type === "home") {
            return "Home";
        }

        if (type === "work") {
            return "Work";
        }

        return "Other";
    };

    const resetForm = () => {
        setFormData({
            type: "home",
            fullAddress: "",
            landmark: "",
            city: "",
            state: "",
            pincode: "",
            phone: "",
            isDefault: false
        });

        setEditingAddress(null);
        setShowForm(false);
        setError("");
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleAdd = () => {
        setEditingAddress(null);

        setFormData({
            type: addresses.length === 0 ? "home" : "home",
            fullAddress: "",
            landmark: "",
            city: "",
            state: "",
            pincode: "",
            phone: "",
            isDefault: addresses.length === 0
        });

        setError("");
        setShowForm(true);
    };

    const handleEdit = (address) => {
        setEditingAddress(address);

        setFormData({
            type: address.type || "home",
            fullAddress: address.fullAddress || "",
            landmark: address.landmark || "",
            city: address.city || "",
            state: address.state || "",
            pincode: address.pincode || "",
            phone: address.phone || "",
            isDefault: address.isDefault || false
        });

        setError("");
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");

            if (editingAddress) {
                const response = await axios.put(
                    `http://localhost:5000/api/addresses/${editingAddress._id}`,
                    formData,
                    {
                        withCredentials: true
                    }
                );

                setAddresses(response.data.addresses || []);
            } else {
                const response = await axios.post(
                    "http://localhost:5000/api/addresses",
                    formData,
                    {
                        withCredentials: true
                    }
                );

                setAddresses(response.data.addresses || []);
            }

            resetForm();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to save address"
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (addressId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this address?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await axios.delete(
                `http://localhost:5000/api/addresses/${addressId}`,
                {
                    withCredentials: true
                }
            );

            setAddresses(response.data.addresses || []);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete address"
            );
        }
    };

    const handleSetDefault = async (addressId) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/addresses/${addressId}/default`,
                {},
                {
                    withCredentials: true
                }
            );

            setAddresses(response.data.addresses || []);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update current address"
            );
        }
    };

    const currentAddress = addresses.find(
        (address) => address.isDefault
    );

    return (
        <div className="
            mx-auto
            min-h-screen
            max-w-6xl
            px-4
            py-8
            md:px-6
            md:py-12
        ">
            {/* Header */}
            <div className="
                mb-8
                flex
                flex-col
                gap-5
                sm:flex-row
                sm:items-end
                sm:justify-between
            ">
                <div>
                    <p className="
                        mb-1
                        text-sm
                        font-medium
                        tracking-widest
                        text-[#D4AF37]
                    ">
                        DELIVERY ADDRESSES
                    </p>

                    <h1 className="
                        text-3xl
                        font-bold
                        text-white
                        md:text-4xl
                    ">
                        Your Addresses
                    </h1>

                    <p className="
                        mt-2
                        max-w-xl
                        text-sm
                        leading-6
                        text-gray-400
                    ">
                        Save your favourite delivery locations and
                        make ordering from Zestora faster.
                    </p>
                </div>

                <button
                    onClick={handleAdd}
                    className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-gradient-to-r
                        from-[#D4AF37]
                        to-[#FFB800]
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-black
                        shadow-lg
                        shadow-yellow-500/10
                        transition
                        hover:scale-[1.02]
                        hover:opacity-90
                    "
                >
                    <Plus size={18} />
                    Add New Address
                </button>
            </div>

            {/* Error */}
            {error && (
                <div className="
                    mb-6
                    flex
                    items-center
                    justify-between
                    gap-4
                    rounded-2xl
                    border
                    border-red-500/20
                    bg-red-500/10
                    px-4
                    py-3
                    text-sm
                    text-red-400
                ">
                    <span>{error}</span>

                    <button
                        onClick={() => setError("")}
                        className="shrink-0"
                    >
                        <X size={17} />
                    </button>
                </div>
            )}

            {/* Loading */}
            {loading ? (
                <div className="
                    flex
                    min-h-[40vh]
                    items-center
                    justify-center
                ">
                    <div className="
                        h-8
                        w-8
                        animate-spin
                        rounded-full
                        border-2
                        border-white/10
                        border-t-[#D4AF37]
                    " />
                </div>
            ) : (
                <>
                    {/* Current Address */}
                    {currentAddress && (
                        <section className="mb-8">
                            <div className="
                                mb-4
                                flex
                                items-center
                                gap-2
                            ">
                                <MapPin
                                    size={18}
                                    className="text-[#D4AF37]"
                                />

                                <h2 className="
                                    text-lg
                                    font-semibold
                                    text-white
                                ">
                                    Current Address
                                </h2>
                            </div>

                            <div className="
                                relative
                                overflow-hidden
                                rounded-3xl
                                border
                                border-[#D4AF37]/25
                                bg-gradient-to-br
                                from-[#1d1b14]
                                via-[#151515]
                                to-[#111111]
                                p-6
                                shadow-xl
                                shadow-black/20
                            ">
                                <div className="
                                    absolute
                                    right-0
                                    top-0
                                    h-32
                                    w-32
                                    rounded-full
                                    bg-[#D4AF37]/5
                                    blur-3xl
                                " />

                                <div className="
                                    relative
                                    flex
                                    flex-col
                                    gap-5
                                    md:flex-row
                                    md:items-start
                                    md:justify-between
                                ">
                                    <div className="
                                        flex
                                        gap-4
                                    ">
                                        <div className="
                                            flex
                                            h-12
                                            w-12
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            border
                                            border-[#D4AF37]/20
                                            bg-[#D4AF37]/10
                                            text-[#D4AF37]
                                        ">
                                            {getAddressIcon(
                                                currentAddress.type
                                            )}
                                        </div>

                                        <div>
                                            <div className="
                                                flex
                                                flex-wrap
                                                items-center
                                                gap-2
                                            ">
                                                <h3 className="
                                                    text-base
                                                    font-semibold
                                                    text-white
                                                ">
                                                    {getAddressLabel(
                                                        currentAddress.type
                                                    )}
                                                </h3>

                                                <span className="
                                                    rounded-full
                                                    bg-[#D4AF37]/10
                                                    px-2.5
                                                    py-1
                                                    text-[10px]
                                                    font-semibold
                                                    uppercase
                                                    tracking-wider
                                                    text-[#D4AF37]
                                                ">
                                                    Current
                                                </span>
                                            </div>

                                            <p className="
                                                mt-3
                                                max-w-2xl
                                                text-sm
                                                leading-6
                                                text-gray-300
                                            ">
                                                {currentAddress.fullAddress}
                                            </p>

                                            {currentAddress.landmark && (
                                                <p className="
                                                    mt-1
                                                    text-xs
                                                    text-gray-500
                                                ">
                                                    Near{" "}
                                                    {currentAddress.landmark}
                                                </p>
                                            )}

                                            <p className="
                                                mt-2
                                                text-sm
                                                text-gray-400
                                            ">
                                                {currentAddress.city},{" "}
                                                {currentAddress.state} -{" "}
                                                {currentAddress.pincode}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() =>
                                            handleEdit(currentAddress)
                                        }
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-xl
                                            border
                                            border-white/10
                                            px-4
                                            py-2.5
                                            text-sm
                                            text-gray-300
                                            transition
                                            hover:border-[#D4AF37]/30
                                            hover:bg-[#D4AF37]/10
                                            hover:text-[#D4AF37]
                                        "
                                    >
                                        <Pencil size={16} />
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Saved Addresses */}
                    <section>
                        <div className="
                            mb-4
                            flex
                            items-center
                            justify-between
                        ">
                            <div>
                                <h2 className="
                                    text-lg
                                    font-semibold
                                    text-white
                                ">
                                    Saved Addresses
                                </h2>

                                <p className="
                                    mt-1
                                    text-xs
                                    text-gray-500
                                ">
                                    {addresses.length}{" "}
                                    {addresses.length === 1
                                        ? "address"
                                        : "addresses"}{" "}
                                    saved
                                </p>
                            </div>
                        </div>

                        {addresses.length === 0 ? (
                            <div className="
                                flex
                                min-h-[300px]
                                flex-col
                                items-center
                                justify-center
                                rounded-3xl
                                border
                                border-dashed
                                border-white/10
                                bg-[#111111]
                                px-6
                                text-center
                            ">
                                <div className="
                                    mb-4
                                    flex
                                    h-16
                                    w-16
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-[#D4AF37]/20
                                    bg-[#D4AF37]/10
                                    text-[#D4AF37]
                                ">
                                    <MapPin size={28} />
                                </div>

                                <h3 className="
                                    text-lg
                                    font-semibold
                                    text-white
                                ">
                                    You have no saved addresses.
                                </h3>

                                <p className="
                                    mt-2
                                    max-w-sm
                                    text-sm
                                    leading-6
                                    text-gray-500
                                ">
                                    Add your first delivery address
                                    to make your next Zestora order
                                    quicker and easier.
                                </p>

                                <button
                                    onClick={handleAdd}
                                    className="
                                        mt-5
                                        flex
                                        items-center
                                        gap-2
                                        rounded-xl
                                        border
                                        border-[#D4AF37]/30
                                        px-4
                                        py-2.5
                                        text-sm
                                        font-medium
                                        text-[#D4AF37]
                                        transition
                                        hover:bg-[#D4AF37]/10
                                    "
                                >
                                    <Plus size={17} />
                                    Add New Address
                                </button>
                            </div>
                        ) : (
                            <div className="
                                grid
                                gap-4
                                md:grid-cols-2
                            ">
                                {addresses.map((address) => (
                                    <div
                                        key={address._id}
                                        className="
                                            rounded-3xl
                                            border
                                            border-white/10
                                            bg-[#111111]
                                            p-5
                                            transition
                                            hover:border-white/20
                                        "
                                    >
                                        <div className="
                                            flex
                                            items-start
                                            justify-between
                                            gap-4
                                        ">
                                            <div className="
                                                flex
                                                items-center
                                                gap-3
                                            ">
                                                <div className="
                                                    flex
                                                    h-10
                                                    w-10
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    bg-white/5
                                                    text-[#D4AF37]
                                                ">
                                                    {getAddressIcon(
                                                        address.type
                                                    )}
                                                </div>

                                                <div>
                                                    <h3 className="
                                                        text-sm
                                                        font-semibold
                                                        text-white
                                                    ">
                                                        {getAddressLabel(
                                                            address.type
                                                        )}
                                                    </h3>

                                                    {address.isDefault && (
                                                        <span className="
                                                            mt-1
                                                            inline-flex
                                                            items-center
                                                            gap-1
                                                            text-[10px]
                                                            font-medium
                                                            uppercase
                                                            tracking-wider
                                                            text-[#D4AF37]
                                                        ">
                                                            <Check size={11} />
                                                            Current
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="
                                                flex
                                                items-center
                                                gap-1
                                            ">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(address)
                                                    }
                                                    className="
                                                        rounded-lg
                                                        p-2
                                                        text-gray-500
                                                        transition
                                                        hover:bg-white/5
                                                        hover:text-[#D4AF37]
                                                    "
                                                    title="Edit address"
                                                >
                                                    <Pencil size={16} />
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            address._id
                                                        )
                                                    }
                                                    className="
                                                        rounded-lg
                                                        p-2
                                                        text-gray-500
                                                        transition
                                                        hover:bg-red-500/10
                                                        hover:text-red-400
                                                    "
                                                    title="Delete address"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="
                                            mt-5
                                            rounded-2xl
                                            border
                                            border-white/5
                                            bg-[#181818]
                                            p-4
                                        ">
                                            <p className="
                                                text-sm
                                                leading-6
                                                text-gray-300
                                            ">
                                                {address.fullAddress}
                                            </p>

                                            {address.landmark && (
                                                <p className="
                                                    mt-1
                                                    text-xs
                                                    text-gray-500
                                                ">
                                                    Near{" "}
                                                    {address.landmark}
                                                </p>
                                            )}

                                            <p className="
                                                mt-2
                                                text-xs
                                                text-gray-500
                                            ">
                                                {address.city},{" "}
                                                {address.state} -{" "}
                                                {address.pincode}
                                            </p>

                                            {address.phone && (
                                                <p className="
                                                    mt-2
                                                    text-xs
                                                    text-gray-500
                                                ">
                                                    Phone: {address.phone}
                                                </p>
                                            )}
                                        </div>

                                        {!address.isDefault && (
                                            <button
                                                onClick={() =>
                                                    handleSetDefault(
                                                        address._id
                                                    )
                                                }
                                                className="
                                                    mt-4
                                                    flex
                                                    w-full
                                                    items-center
                                                    justify-center
                                                    gap-2
                                                    rounded-xl
                                                    border
                                                    border-white/10
                                                    px-4
                                                    py-2.5
                                                    text-xs
                                                    font-medium
                                                    text-gray-400
                                                    transition
                                                    hover:border-[#D4AF37]/30
                                                    hover:bg-[#D4AF37]/10
                                                    hover:text-[#D4AF37]
                                                "
                                            >
                                                <MapPin size={14} />
                                                Set as Current Address
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </>
            )}

            {/* Address Form Modal */}
            {showForm && (
                <div className="
                    fixed
                    inset-0
                    z-50
                    flex
                    items-center
                    justify-center
                    bg-black/70
                    px-4
                    py-6
                    backdrop-blur-sm
                ">
                    <div className="
                        max-h-[90vh]
                        w-full
                        max-w-2xl
                        overflow-y-auto
                        rounded-3xl
                        border
                        border-white/10
                        bg-[#111111]
                        shadow-2xl
                    ">
                        {/* Modal Header */}
                        <div className="
                            sticky
                            top-0
                            z-10
                            flex
                            items-center
                            justify-between
                            border-b
                            border-white/10
                            bg-[#111111]
                            px-6
                            py-5
                        ">
                            <div>
                                <p className="
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-widest
                                    text-[#D4AF37]
                                ">
                                    ZESTORA DELIVERY
                                </p>

                                <h2 className="
                                    mt-1
                                    text-xl
                                    font-semibold
                                    text-white
                                ">
                                    {editingAddress
                                        ? "Edit Address"
                                        : "Add New Address"}
                                </h2>
                            </div>

                            <button
                                onClick={resetForm}
                                className="
                                    rounded-xl
                                    p-2
                                    text-gray-400
                                    transition
                                    hover:bg-white/5
                                    hover:text-white
                                "
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5 p-6"
                        >
                            {/* Address Type */}
                            <div>
                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-300
                                ">
                                    Address Type
                                </label>

                                <div className="
                                    grid
                                    grid-cols-3
                                    gap-2
                                ">
                                    {[
                                        ["home", "Home", Home],
                                        ["work", "Work", Briefcase],
                                        ["other", "Other", MapPinned]
                                    ].map(
                                        ([value, label, Icon]) => (
                                            <button
                                                key={value}
                                                type="button"
                                                onClick={() =>
                                                    setFormData(
                                                        (prev) => ({
                                                            ...prev,
                                                            type: value
                                                        })
                                                    )
                                                }
                                                className={`
                                                    flex
                                                    items-center
                                                    justify-center
                                                    gap-2
                                                    rounded-xl
                                                    border
                                                    px-3
                                                    py-3
                                                    text-sm
                                                    transition
                                                    ${
                                                        formData.type === value
                                                            ? "border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37]"
                                                            : "border-white/10 bg-[#181818] text-gray-400 hover:border-white/20"
                                                    }
                                                `}
                                            >
                                                <Icon size={16} />
                                                {label}
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Full Address */}
                            <div>
                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-300
                                ">
                                    Full Address
                                </label>

                                <textarea
                                    name="fullAddress"
                                    value={formData.fullAddress}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="House/Flat, Street, Area"
                                    className="
                                        w-full
                                        resize-none
                                        rounded-xl
                                        border
                                        border-white/10
                                        bg-[#181818]
                                        px-4
                                        py-3
                                        text-sm
                                        text-white
                                        outline-none
                                        placeholder:text-gray-600
                                        focus:border-[#D4AF37]/50
                                    "
                                    required
                                />
                            </div>

                            {/* Landmark */}
                            <div>
                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-300
                                ">
                                    Landmark
                                    <span className="
                                        ml-1
                                        text-xs
                                        font-normal
                                        text-gray-600
                                    ">
                                        Optional
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    name="landmark"
                                    value={formData.landmark}
                                    onChange={handleChange}
                                    placeholder="Nearby landmark"
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-white/10
                                        bg-[#181818]
                                        px-4
                                        py-3
                                        text-sm
                                        text-white
                                        outline-none
                                        placeholder:text-gray-600
                                        focus:border-[#D4AF37]/50
                                    "
                                />
                            </div>

                            {/* City / State */}
                            <div className="
                                grid
                                gap-4
                                sm:grid-cols-2
                            ">
                                <div>
                                    <label className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-300
                                    ">
                                        City
                                    </label>

                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="City"
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-white/10
                                            bg-[#181818]
                                            px-4
                                            py-3
                                            text-sm
                                            text-white
                                            outline-none
                                            placeholder:text-gray-600
                                            focus:border-[#D4AF37]/50
                                        "
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-300
                                    ">
                                        State
                                    </label>

                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="State"
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-white/10
                                            bg-[#181818]
                                            px-4
                                            py-3
                                            text-sm
                                            text-white
                                            outline-none
                                            placeholder:text-gray-600
                                            focus:border-[#D4AF37]/50
                                        "
                                        required
                                    />
                                </div>
                            </div>

                            {/* Pincode / Phone */}
                            <div className="
                                grid
                                gap-4
                                sm:grid-cols-2
                            ">
                                <div>
                                    <label className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-300
                                    ">
                                        Pincode
                                    </label>

                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        placeholder="6-digit pincode"
                                        maxLength={6}
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-white/10
                                            bg-[#181818]
                                            px-4
                                            py-3
                                            text-sm
                                            text-white
                                            outline-none
                                            placeholder:text-gray-600
                                            focus:border-[#D4AF37]/50
                                        "
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-300
                                    ">
                                        Delivery Phone
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Phone number"
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-white/10
                                            bg-[#181818]
                                            px-4
                                            py-3
                                            text-sm
                                            text-white
                                            outline-none
                                            placeholder:text-gray-600
                                            focus:border-[#D4AF37]/50
                                        "
                                        required
                                    />
                                </div>
                            </div>

                            {/* Default */}
                            <label className="
                                flex
                                cursor-pointer
                                items-center
                                gap-3
                                rounded-xl
                                border
                                border-white/10
                                bg-[#181818]
                                px-4
                                py-3
                            ">
                                <input
                                    type="checkbox"
                                    name="isDefault"
                                    checked={formData.isDefault}
                                    onChange={handleChange}
                                    className="
                                        h-4
                                        w-4
                                        accent-[#D4AF37]
                                    "
                                />

                                <div>
                                    <p className="
                                        text-sm
                                        font-medium
                                        text-white
                                    ">
                                        Make this my current address
                                    </p>

                                    <p className="
                                        mt-0.5
                                        text-xs
                                        text-gray-500
                                    ">
                                        This address will appear in the navbar.
                                    </p>
                                </div>
                            </label>

                            {/* Buttons */}
                            <div className="
                                flex
                                flex-col-reverse
                                gap-3
                                pt-2
                                sm:flex-row
                                sm:justify-end
                            ">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="
                                        rounded-xl
                                        border
                                        border-white/10
                                        px-5
                                        py-3
                                        text-sm
                                        font-medium
                                        text-gray-300
                                        transition
                                        hover:bg-white/5
                                    "
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="
                                        rounded-xl
                                        bg-gradient-to-r
                                        from-[#D4AF37]
                                        to-[#FFB800]
                                        px-6
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-black
                                        transition
                                        hover:opacity-90
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                    "
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingAddress
                                            ? "Save Changes"
                                            : "Add Address"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Addresses;