import { useState } from "react";
import {
    User,
    Mail,
    Phone,
    Pencil,
    X
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Account = () => {
    const { user } = useAuth();
    const [editMode, setEditMode] = useState(false);

    if (!user) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-gray-400">
                    Please login to view your account.
                </p>
            </div>
        );
    }

    const getAvatar = () => {
        if (user.gender === "female") {
            return "👩";
        }

        if (user.gender === "other") {
            return "🧑";
        }

        return "👨";
    };

    return (
        <div className="
            mx-auto
            min-h-screen
            max-w-5xl
            px-4
            py-8
            md:px-6
            md:py-12
        ">
            {/* Header */}
            <div className="mb-8">
                <p className="
                    mb-1
                    text-sm
                    font-medium
                    text-[#D4AF37]
                ">
                    MY ACCOUNT
                </p>

                <h1 className="
                    text-3xl
                    font-bold
                    text-white
                    md:text-4xl
                ">
                    Your Account
                </h1>

                <p className="
                    mt-2
                    text-sm
                    text-gray-400
                ">
                    Manage your personal information and account details.
                </p>
            </div>

            {/* Profile Card */}
            <div className="
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-[#111111]
            ">
                {/* Profile Header */}
                <div className="
                    border-b
                    border-white/10
                    bg-gradient-to-r
                    from-[#1b1b1b]
                    to-[#111111]
                    p-6
                    md:p-8
                ">
                    <div className="
                        flex
                        flex-col
                        gap-5
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    ">
                        <div className="
                            flex
                            items-center
                            gap-4
                        ">
                            <div className="
                                flex
                                h-20
                                w-20
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-[#D4AF37]/30
                                bg-[#222222]
                                text-4xl
                            ">
                                {getAvatar()}
                            </div>

                            <div>
                                <h2 className="
                                    text-xl
                                    font-semibold
                                    text-white
                                ">
                                    {user.name}
                                </h2>

                                <p className="
                                    mt-1
                                    text-sm
                                    text-gray-400
                                ">
                                    {user.email}
                                </p>

                                <span className="
                                    mt-2
                                    inline-block
                                    rounded-full
                                    bg-[#D4AF37]/10
                                    px-3
                                    py-1
                                    text-xs
                                    font-medium
                                    capitalize
                                    text-[#D4AF37]
                                ">
                                    {user.role}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => setEditMode(!editMode)}
                            className="
                                flex
                                items-center
                                justify-center
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
                            {editMode ? (
                                <>
                                    <X size={17} />
                                    Cancel
                                </>
                            ) : (
                                <>
                                    <Pencil size={17} />
                                    Edit Account
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Account Information */}
                <div className="p-6 md:p-8">
                    <h3 className="
                        mb-5
                        text-lg
                        font-semibold
                        text-white
                    ">
                        Personal Information
                    </h3>

                    {!editMode ? (
                        <div className="
                            grid
                            gap-4
                            md:grid-cols-2
                        ">
                            <div className="
                                rounded-2xl
                                border
                                border-white/10
                                bg-[#181818]
                                p-4
                            ">
                                <div className="
                                    mb-2
                                    flex
                                    items-center
                                    gap-2
                                    text-gray-400
                                ">
                                    <User size={17} />
                                    <span className="text-xs">
                                        Full Name
                                    </span>
                                </div>

                                <p className="
                                    text-sm
                                    font-medium
                                    text-white
                                ">
                                    {user.name}
                                </p>
                            </div>

                            <div className="
                                rounded-2xl
                                border
                                border-white/10
                                bg-[#181818]
                                p-4
                            ">
                                <div className="
                                    mb-2
                                    flex
                                    items-center
                                    gap-2
                                    text-gray-400
                                ">
                                    <Mail size={17} />
                                    <span className="text-xs">
                                        Email Address
                                    </span>
                                </div>

                                <p className="
                                    break-all
                                    text-sm
                                    font-medium
                                    text-white
                                ">
                                    {user.email}
                                </p>
                            </div>

                            <div className="
                                rounded-2xl
                                border
                                border-white/10
                                bg-[#181818]
                                p-4
                            ">
                                <div className="
                                    mb-2
                                    flex
                                    items-center
                                    gap-2
                                    text-gray-400
                                ">
                                    <Phone size={17} />
                                    <span className="text-xs">
                                        Phone Number
                                    </span>
                                </div>

                                <p className="
                                    text-sm
                                    font-medium
                                    text-white
                                ">
                                    {user.phone}
                                </p>
                            </div>

                            <div className="
                                rounded-2xl
                                border
                                border-white/10
                                bg-[#181818]
                                p-4
                            ">
                                <div className="
                                    mb-2
                                    flex
                                    items-center
                                    gap-2
                                    text-gray-400
                                ">
                                    <User size={17} />
                                    <span className="text-xs">
                                        Gender
                                    </span>
                                </div>

                                <p className="
                                    text-sm
                                    font-medium
                                    capitalize
                                    text-white
                                ">
                                    {user.gender}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <EditAccountForm
                            user={user}
                            onCancel={() => setEditMode(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

const EditAccountForm = ({ user, onCancel }) => {
    const { updateProfile } = useAuth();

    const [formData, setFormData] = useState({
        name: user.name || "",
        phone: user.phone || "",
        gender: user.gender || "male"
    });

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");

            await updateProfile(formData);

            onCancel();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update profile"
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            {error && (
                <div className="
                    rounded-xl
                    border
                    border-red-500/20
                    bg-red-500/10
                    px-4
                    py-3
                    text-sm
                    text-red-400
                ">
                    {error}
                </div>
            )}

            <div>
                <label className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-300
                ">
                    Full Name
                </label>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                        transition
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
                    Email Address
                </label>

                <input
                    type="email"
                    value={user.email}
                    disabled
                    className="
                        w-full
                        cursor-not-allowed
                        rounded-xl
                        border
                        border-white/10
                        bg-[#101010]
                        px-4
                        py-3
                        text-sm
                        text-gray-500
                    "
                />

                <p className="
                    mt-2
                    text-xs
                    text-gray-500
                ">
                    Email cannot be changed here.
                </p>
            </div>

            <div>
                <label className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-300
                ">
                    Phone Number
                </label>

                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
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
                        transition
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
                    Gender
                </label>

                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
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
                        focus:border-[#D4AF37]/50
                    "
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div className="
                flex
                flex-col
                gap-3
                pt-3
                sm:flex-row
            ">
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
                    {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="
                        rounded-xl
                        border
                        border-white/10
                        px-6
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
            </div>
        </form>
    );
};

export default Account;