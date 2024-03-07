import React, { useEffect, useState } from 'react';
import axios from 'axios'
import UpdatedPopup from './UpdatedPopup';
import AddNewPopup from './AddNewPopup';

const Table = ({ isOpen }) => {

  const [allData, setAllData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedDataUpdate, setSelectedDataUpdate] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, [isOpen, selectedData, selectedDataUpdate]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/getAll`);
      setAllData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleUpdate = (index) => {
    setSelectedDataUpdate(allData[index]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/delete/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleCheckboxChange = (index) => {
    const newSelectedItems = [...selectedItems];
    if (newSelectedItems.includes(index)) {
      newSelectedItems.splice(newSelectedItems.indexOf(index), 1);
    } else {
      newSelectedItems.push(index);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleSend = async () => {
    if (selectedItems.length === 0) {
      return;
    }
    const selectedItemsData = selectedItems.map(index => allData[index]);
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/sendEmail`, selectedItemsData);
      setSelectedItems([]);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto min-w-full">
        <thead className='bg-gray-500 text-white '>
          <tr>
            <th className="px-4 py-2">{" "}</th>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Hobbies</th>
            <th className="px-4 py-2">Update/Delete</th>
          </tr>
        </thead>
        <tbody>
          {allData?.map((item, index) => (
            <tr key={index}>
              <td className="border text-center px-4 py-2">
                <input type="checkbox" checked={selectedItems.includes(index)} onChange={() => handleCheckboxChange(index)} />
              </td>
              <td className="border text-center px-4 py-2">{index + 1}</td>
              <td className="border text-center px-4 py-2">{item?.name}</td>
              <td className="border text-center px-4 py-2">{item?.phoneNumber}</td>
              <td className="border text-center px-4 py-2">{item?.email}</td>
              <td className="border text-center px-4 py-2">{item?.hobbies}</td>
              <td className="border text-center px-4 py-2">
                <button onClick={() => handleUpdate(index)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Update
                </button>
                <button onClick={() => handleDelete(item._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedData && <AddNewPopup isOpen={true} onClose={() => setSelectedData(null)} initialData={selectedData} />}
      {selectedDataUpdate && <UpdatedPopup isOpen={true} onClose={() => setSelectedDataUpdate(null)} initialData={selectedDataUpdate} />}
      <button onClick={handleSend} className='m-2 px-4 py-2 hover:bg-blue-400 font-semibold bg-blue-500 rounded-lg text-white'>Send</button>
    </div>
  );
};

export default Table;
