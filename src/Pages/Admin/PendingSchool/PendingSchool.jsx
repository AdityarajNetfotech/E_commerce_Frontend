import React from "react";

function PendingSchool() {
  const sampleData = [
    {
      _id: "1",
      name: "ABC School",
      email: "abc@example.com",
      password: "********",
      mobile: "9876543210",
      address: "123 Street, City",
      affiliationNumber: "AFF12345",
      affiliationCertificate: "cert123.pdf",
    },
    {
      _id: "2",
      name: "XYZ School",
      email: "xyz@example.com",
      password: "********",
      mobile: "9123456780",
      address: "456 Avenue, Town",
      affiliationNumber: "AFF67890",
      affiliationCertificate: "cert456.pdf",
    },
  ];

  return (
    <div>
      <h2>Pending Schools</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Affiliation Number</th>
            <th>Affiliation Certificate</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((school) => (
            <tr key={school._id}>
              <td>{school.name}</td>
              <td>{school.email}</td>
              <td>{school.password}</td>
              <td>{school.mobile}</td>
              <td>{school.address}</td>
              <td>{school.affiliationNumber}</td>
              <td>{school.affiliationCertificate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PendingSchool;