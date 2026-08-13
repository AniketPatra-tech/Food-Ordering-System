import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
    const [addresses, setAddresses] = useState([]);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [loading, setLoading] = useState(false);

    const getAddresses = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                "http://localhost:5000/api/addresses",
                {
                    withCredentials: true
                }
            );

            setAddresses(response.data.addresses || []);

            const defaultAddress = response.data.addresses?.find(
                (address) => address.isDefault
            );

            setCurrentAddress(defaultAddress || null);
        } catch (error) {
            setAddresses([]);
            setCurrentAddress(null);
        } finally {
            setLoading(false);
        }
    };

    const addAddress = async (address) => {
        const response = await axios.post(
            "http://localhost:5000/api/addresses",
            address,
            {
                withCredentials: true
            }
        );

        setAddresses(response.data.addresses || []);

        const defaultAddress = response.data.addresses?.find(
            (address) => address.isDefault
        );

        setCurrentAddress(defaultAddress || null);

        return response.data;
    };

    const updateAddress = async (id, address) => {
        const response = await axios.put(
            `http://localhost:5000/api/addresses/${id}`,
            address,
            {
                withCredentials: true
            }
        );

        setAddresses(response.data.addresses || []);

        const defaultAddress = response.data.addresses?.find(
            (address) => address.isDefault
        );

        setCurrentAddress(defaultAddress || null);

        return response.data;
    };

    const deleteAddress = async (id) => {
        const response = await axios.delete(
            `http://localhost:5000/api/addresses/${id}`,
            {
                withCredentials: true
            }
        );

        setAddresses(response.data.addresses || []);

        const defaultAddress = response.data.addresses?.find(
            (address) => address.isDefault
        );

        setCurrentAddress(defaultAddress || null);

        return response.data;
    };

    const setDefaultAddress = async (id) => {
        const response = await axios.put(
            `http://localhost:5000/api/addresses/${id}/default`,
            {},
            {
                withCredentials: true
            }
        );

        setAddresses(response.data.addresses || []);

        const defaultAddress = response.data.addresses?.find(
            (address) => address.isDefault
        );

        setCurrentAddress(defaultAddress || null);

        return response.data;
    };

    useEffect(() => {
        getAddresses();
    }, []);

    return (
        <AddressContext.Provider
            value={{
                addresses,
                currentAddress,
                loading,
                getAddresses,
                addAddress,
                updateAddress,
                deleteAddress,
                setDefaultAddress
            }}
        >
            {children}
        </AddressContext.Provider>
    );
};

export const useAddress = () => useContext(AddressContext);