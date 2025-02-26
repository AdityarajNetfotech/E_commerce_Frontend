import { useNavigate } from "react-router-dom";

function SchoolDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>School Dashboard</h1>
      <button
        onClick={() => navigate("/AccountDetail")}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        View Account Details
      </button>
    </div>
  );
}

export default SchoolDashboard;
