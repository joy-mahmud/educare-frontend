import { useNavigate } from "react-router-dom";
import { ShieldAlert, Home, LogIn } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const UnAuthorized = () => {
  const navigate = useNavigate();
  const user = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[420px] text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <ShieldAlert size={64} className="text-red-500" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          You don’t have permission to access this page.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {user ? (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <Home size={18} /> Go to Dashboard
              </button>

              <button
                onClick={() => navigate(-1)}
                className="py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Go Back
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/select-user")}
              className="flex items-center justify-center gap-2 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              <LogIn size={18} /> Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnAuthorized;
