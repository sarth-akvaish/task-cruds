import axios from 'axios';
import React, { useState } from 'react';

const initialFormData = {
    name: '',
    phoneNumber: '',
    email: '',
    hobbies: '',
};
const AddNewPopup = ({ isOpen, onClose }) => {

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name || !formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.phoneNumber || !formData.phoneNumber.trim() || !/^\d{10}$/.test(formData.phoneNumber.trim())) {
            newErrors.phoneNumber = 'Invalid Phone Number';
        }

        if (!formData.email || !formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email.trim())) {
            newErrors.email = 'Invalid Email';
        }

        if (!formData.hobbies || !formData.hobbies.trim()) {
            newErrors.hobbies = 'Hobbies are required';
        }

        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length === 0);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        validateForm();

        if (!isFormValid) {
            console.log('Not valid form')
            return;
        }
        else {
            try {
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/createNew`, formData);
                setFormData(initialFormData); // Reset form data after successful save
                setErrors({});
                setIsFormValid(false);
                onClose(); // Close the popup
            } catch (err) {
                if (err.response && err.response.status === 400) {
                    setErrors(err.response.data.errors);
                } else {
                    setErrors([{ msg: 'An unexpected error occurred' }]);
                }
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className={`fixed inset-0 w-full bg-gray-500 bg-opacity-50 flex justify-center items-center ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white p-8 w-1/2 h-3/4 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Add New Item</h2>
                <div className="">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" value={formData?.name} id="name" onChange={handleChange} name="name" className="p-4 mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm h-[40px]" />
                    {errors.name && <div className="text-red-500">{errors.name}</div>}
                </div>
                <div className="">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="text" id="phoneNumber" value={formData?.phoneNumber} onChange={handleChange} name="phoneNumber" className="p-4 mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm h-[40px]" />
                    {errors.phoneNumber && <div className="text-red-500">{errors.phoneNumber}</div>}
                </div>
                <div className="">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="text" id="email" name="email" value={formData?.email} onChange={handleChange} className="p-4 mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm h-[40px]" />
                    {errors.email && <div className="text-red-500">{errors.email}</div>}
                </div>
                <div className="mb-2">
                    <label htmlFor="hobbies" className="block text-sm font-medium text-gray-700">Hobbies</label>
                    <input type="text" id="hobbies" name="hobbies" value={formData?.hobbies} onChange={handleChange} className=" p-4 mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm h-[40px]" />
                    {errors.hobbies && <div className="text-red-500">{errors.hobbies}</div>}
                </div>
                <div className="flex justify-end">
                    <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                </div>
            </div>
        </div>
    );
};

export default AddNewPopup;
