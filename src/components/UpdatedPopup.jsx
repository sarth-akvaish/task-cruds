import axios from 'axios';
import React, { useState } from 'react';

const initialFormData = {
    name: '',
    phoneNumber: '',
    email: '',
    hobbies: '',
};
const UpdatedPopup = ({ isOpen, onClose, initialData }) => {
    // console.log(initialData)
    const [formData, setFormData] = useState(initialData);

    const handleSave = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/update/${formData._id}`, formData);
            setFormData(initialFormData); // Reset form data after successful save
            onClose(); // Close the popup
        } catch (error) {
            console.error('Error saving data:', error);
        }
        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className={`fixed inset-0 w-full bg-gray-500 bg-opacity-50 flex justify-center items-center ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white p-8 w-1/2 h-3/4 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Update Item</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" value={formData?.name} id="name" onChange={handleChange} name="name" className="p-4 mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm h-[40px]" />
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="text" id="phoneNumber" value={formData?.phoneNumber} onChange={handleChange} name="phoneNumber" className="p-4 mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm h-[40px]" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="text" id="email" name="email" value={formData?.email} onChange={handleChange} className="p-4 mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm h-[40px]" />
                </div>
                <div className="mb-4">
                    <label htmlFor="hobbies" className="block text-sm font-medium text-gray-700">Hobbies</label>
                    <input type="text" id="hobbies" name="hobbies" value={formData?.hobbies} onChange={handleChange} className=" p-4 mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm h-[40px]" />
                </div>
                <div className="flex justify-end">
                    <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                </div>
            </div>
        </div>
    );
};

export default UpdatedPopup;
