import React, { useState } from 'react';
import { Button, TextInputField } from '../../components/commonComponent/textInputForm';

type FormData = {
    name: string;
    email: string;
    phone: string;
    address: string;
    street: string;
    zip: string;
    additionalInfo: string;
};

const DeliveryDetailsForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        address: "",
        street: "",
        zip: "",
        additionalInfo: "",
    });

    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const newErrors: Partial<FormData> = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.phone) newErrors.phone = "Phone is required";
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.zip) newErrors.zip = "ZIP Code is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log(formData);
            alert("Form Submitted Successfully!");
        }
    };

    return (
        <div className="w-full mx-auto sm:w-3/4 lg:w-3/4 max-w-screen-lg">
            <h2 className="text-2xl font-semibold mb-6">Delivery Details</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <TextInputField
                        id="name"
                        name="name"
                        label="Name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                    <TextInputField
                        id="email"
                        name="email"
                        label="Email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <TextInputField
                        id="phone"
                        name="phone"
                        label="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                    />
                </div>

                <div className="space-y-4">
                    <TextInputField
                        id="address"
                        name="address"
                        label="Address"
                        value={formData.address}
                        onChange={handleChange}
                        error={errors.address}
                    />
                    <TextInputField
                        id="street"
                        name="street"
                        label="Street"
                        value={formData.street}
                        onChange={handleChange}
                    />
                    <TextInputField
                        id="zip"
                        name="zip"
                        label="ZIP Code"
                        value={formData.zip}
                        onChange={handleChange}
                        error={errors.zip}
                    />
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="additionalInfo" className="block text-sm font-medium">
                        Additional Info
                    </label>
                    <textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={(e) =>
                            setFormData({ ...formData, additionalInfo: e.target.value })
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-xl"
                    ></textarea>
                </div>

                <div className="sm:col-span-2 flex justify-end">
                    <Button type="theme" label="Next" to='/cart/user-from/checkout'/>
                </div>
            </form>
        </div>
    );
};

export default DeliveryDetailsForm;
