import React from "react";

const PrimaryUserForm = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold mb-5">Primary User</h2>

      <label className="block text-gray-600">User Name</label>
      <input type="text" className="w-full p-2 border rounded mb-3" placeholder="Text" />

      <label className="block text-gray-600">Email</label>
      <input type="email" className="w-full p-2 border rounded mb-3" placeholder="Text" />

      <label className="block text-gray-600">Mobile Number</label>
      <input type="text" className="w-full p-2 border rounded mb-3" placeholder="Text" />

      <p className="text-blue-500 text-sm cursor-pointer">Reset Password?</p>

      <label className="block text-gray-600 mt-3">Bank Account Number</label>
      <input type="text" className="w-full p-2 border rounded mb-3 bg-gray-100" value="Kotak Bank XX44" disabled />

      <p className="text-blue-500 text-sm cursor-pointer">Change Account</p>

      <div className="flex gap-4 mt-4">
        <button className="bg-orange-500 text-white w-60 px-4 py-2 rounded">Edit</button>
        <button className="bg-black text-white w-60 px-4 py-2 rounded">Save</button>
      </div>
    </div>
  );
};

export default PrimaryUserForm;
