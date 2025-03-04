import React from "react";

const SecondaryUserForm = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold mb-5">Secondary User</h2>

      <label className="block text-gray-600">Secondary User Name</label>
      <input type="text" className="w-full p-2 border rounded mb-3" placeholder="Text" />

      <label className="block text-gray-600">Email</label>
      <input type="email" className="w-full p-2 border rounded mb-3" placeholder="Text" />

      <label className="block text-gray-600">Mobile Number</label>
      <input type="text" className="w-full p-2 border rounded mb-3" placeholder="Text" />

      <p className="text-blue-500 text-sm cursor-pointer">Reset Password?</p>

      <label className="block text-gray-600 mt-3">Bank Account Number</label>
      <input type="text" className="w-full p-2 border rounded mb-3" placeholder="Add Bank Account" />

      <div className="mt-3">
        <label className="block text-gray-600">Allow access</label>
        <div className="flex gap-4">
          <label>
            <input type="radio" name="access" className="mr-2" checked /> Full access
          </label>
          <label>
            <input type="radio" name="access" className="mr-2" /> Limited Access
          </label>
        </div>
      </div>

      <div className="mt-4">
        <button className="bg-orange-500 text-white px-4 py-2 rounded">Add User +</button>
      </div>
    </div>
  );
};

export default SecondaryUserForm;
