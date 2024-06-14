import React from 'react';
import { useNavigate } from 'react-router-dom';
import arrow from "../../Images/arrow.svg";

function Table() {
  const navigate = useNavigate();

  const gotolanding = () => {
    navigate('/');
  };
  return (
    <div className="container mx-auto px-4 py-8">
     <div className="container  items-center">
      <img onClick={gotolanding} src={arrow} alt="Hero" className="w-8 h-8" />
      <h1 className="text-2xl text-center font-bold mb-4">Sample Table</h1>
    </div>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Room number</th>
            <th className="border border-gray-300 px-4 py-2">call time</th>
            <th className="border border-gray-300 px-4 py-2">priority</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">John</td>
            <td className="border border-gray-300 px-4 py-2">Doe</td>
            <td className="border border-gray-300 px-4 py-2">30</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">Jane</td>
            <td className="border border-gray-300 px-4 py-2">Smith</td>
            <td className="border border-gray-300 px-4 py-2">25</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Emily</td>
            <td className="border border-gray-300 px-4 py-2">Johnson</td>
            <td className="border border-gray-300 px-4 py-2">22</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
