import React, { useState } from 'react'
import Table from './components/Table'
import AddNewPopup from './components/AddNewPopup';

const App = () => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className='container flex flex-col mx-auto '>
      <div className='flex items-center justify-between '>
        <div className='text-[30px] font-bold p-8'>CRUDS</div>
        <button onClick={openPopup} className='font-semibold h-2/6 rounded-lg bg-blue-500 p-3 text-white hover:bg-blue-300'>Add New</button>
      </div>
      <Table isOpen={isPopupOpen} />
      <AddNewPopup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  )
}

export default App
