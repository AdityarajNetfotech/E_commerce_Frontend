import React from "react";

function BankAccountForm() {
  return (
    <div className="w-130 mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Account Details</h2>

      {/* Bank Name */}
      <div className="mb-4">
        <label className="block text-gray-700">Bank Name</label>
        <select className="w-full border rounded-md p-2 mt-1">
          <option>Select Bank</option>
          <option>HDFC</option>
          <option>SBI</option>
          <option>ICICI</option>
        </select>
      </div>

      {/* Account Holder Name */}
      <div className="mb-4">
        <label className="block text-gray-700">Account Holder Name</label>
        <input type="text" placeholder="Type Name" className="w-full border rounded-md p-2 mt-1" />
      </div>

      {/* Bank Account Number */}
      <div className="mb-4">
        <label className="block text-gray-700">Bank Account Number</label>
        <input type="text" placeholder="Kotak Bank XX44" className="w-full border rounded-md p-2 mt-1" disabled />
      </div>

      {/* IFSC Code */}
      <div className="mb-4">
        <label className="block text-gray-700">IFSC Code</label>
        <input type="text" placeholder="Text" className="w-full border rounded-md p-2 mt-1" />
      </div>

      {/* Account Type */}
      <div className="mb-4">
        <label className="block text-gray-700">Account Type</label>
        <div className="flex items-center mt-2">
          <input type="radio" id="savings" name="accountType" className="mr-2" defaultChecked />
          <label htmlFor="savings" className="mr-4">Savings</label>

          <input type="radio" id="current" name="accountType" className="mr-2" />
          <label htmlFor="current">Current</label>
        </div>
      </div>

      {/* Save Button */}
      <button className="w-full bg-orange-500 text-white p-3 rounded-md mt-4 hover:bg-orange-600">
        Save
      </button>
    </div>
  );
}

export default BankAccountForm;
