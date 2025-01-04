import React, { useState } from 'react';
import { Button, TextInputField } from '../../components/commonComponent/textInputForm';
import { useNavigate } from 'react-router-dom';

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
    name: '',
    email: '',
    phone: '',
    address: '',
    street: '',
    zip: '',
    additionalInfo: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};

    // Validate for fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof FormData]) {
        newErrors[key as keyof FormData] = `${key} is required`;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate('/cart/user-from/payment', { state: formData });
    }
  };

  const formFields = [
    { label: 'Name', name: 'name', type: 'text', error: errors.name },
    { label: 'Email', name: 'email', type: 'email', error: errors.email },
    { label: 'Phone', name: 'phone', type: 'number', error: errors.phone },
    { label: 'Address', name: 'address', type: 'text', error: errors.address },
    { label: 'Street', name: 'street', type: 'text', error: undefined },
    { label: 'ZIP Code', name: 'zip', type: 'number', error: errors.zip },
  ];

  return (
    <div className="w-full mx-auto sm:w-3/4 lg:w-3/4 max-w-screen-lg">
      <h2 className="text-2xl font-semibold mb-6">Delivery Details</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {formFields.map(({ label, name, type, error }) => (
          <div key={name} className="space-y-4">
            <TextInputField
              id={name}
              name={name}
              label={label}
              value={formData[name as keyof FormData]}
              onChange={handleChange}
              error={error}
              type={type}
            />
          </div>
        ))}

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

        {/* Submit Button */}
        <div className="sm:col-span-2 flex justify-end">
          <Button type="theme" label="Next" to="/cart/user-from/payment" />
        </div>
      </form>
    </div>
  );
};

export default DeliveryDetailsForm;
