import { useLocation, useNavigate } from "react-router-dom";

const SelectUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from || "/";

  const handleSelect = (type) => {
    if (type === "student") {
      navigate("/student-login", { state: { from: redirectPath } });
    } else {
      navigate("/teacher-login", { state: { from: redirectPath } });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[360px] text-center">
        <h2 className="text-2xl font-semibold mb-6">Continue as</h2>

        <button
          onClick={() => handleSelect("student")}
          className="w-full py-3 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          🎓 Student
        </button>

        <button
          onClick={() => handleSelect("teacher")}
          className="w-full py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          🧑‍🏫 Teacher
        </button>
      </div>
    </div>
  );
};

export default SelectUser;
