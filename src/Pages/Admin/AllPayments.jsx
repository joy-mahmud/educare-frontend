import {
  LayoutDashboard,
  CreditCard,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Filter,
  Calendar,
  Phone,
  Hash,
  Edit2,
  Save,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { BASE_URL } from "../../utils/constants/constants";
import Swal from "sweetalert2";

const AllPayments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingStatus, setEditingStatus] = useState(null);
  const [statusUpdateSuccess, setStatusUpdateSuccess] = useState(null);
  const [payments, setPayments] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0); // from API
  const [totalPages, setTotalPages] = useState(0); // derived
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const paymentsPerPage = 10;
  const start = (currentPage - 1) * paymentsPerPage + 1;
  const end = Math.min(currentPage * paymentsPerPage, totalCount);
  // Sample payment data

  const fetchAllPayments = async () => {
    try {
      const res = await axiosInstance.get(
        `${BASE_URL}/api/payment/all-payments/?page=${currentPage}`
      );
      if (res.status === 200) {
        setPayments(res.data.results);
        setTotalCount(res.data.count);
        const pages = Math.ceil(res.data.count / paymentsPerPage);
        setTotalPages(pages);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to laod all payments");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllPayments();
  }, []);

  const paymentMethodColors = {
    bkash: { bg: "#E2136E", name: "bKash" },
    nagad: { bg: "#F15D22", name: "Nagad" },
    rocket: { bg: "#8B3A8F", name: "Rocket" },
  };

  const getStatusConfig = (status) => {
    const configs = {
      completed: {
        icon: CheckCircle,
        color: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-200",
        label: "Completed",
      },
      pending: {
        icon: Clock,
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        label: "Pending",
      },
      failed: {
        icon: XCircle,
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-200",
        label: "Failed",
      },
    };
    return configs[status] || configs.pending;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleStatusUpdate = async (paymentId, newStatus) => {
    try {
      const res = await axiosInstance.patch(
        `${BASE_URL}/api/payment/update-status/${paymentId}`,
        { status: newStatus }
      );
      if (res.status === 200) fetchAllPayments();
      setEditingStatus(null);
      setStatusUpdateSuccess(paymentId);
      setTimeout(() => setStatusUpdateSuccess(null), 2000);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Try again later",
        confirmButtonColor: "#082567",
      });
    }
  };

  const filteredPayments = payments
    .filter(
      (payment) => statusFilter === "all" || payment.status === statusFilter
    )
    .filter(
      (payment) =>
        payment.transactionId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        payment.phoneNumber.includes(searchTerm)
    );

  const totalAmount = filteredPayments.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0
  );
  const completedPayments = filteredPayments.filter(
    (p) => p.status === "completed"
  ).length;
  const pendingPayments = filteredPayments.filter(
    (p) => p.status === "pending"
  ).length;
  // Pagination calculations
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchAllPayments(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8">
      <div>
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Payments</span>
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {filteredPayments.length}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Amount</span>
              <span className="text-lg font-bold text-gray-400">৳</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              ৳{totalAmount.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Completed</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-600">
              {completedPayments}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Pending</span>
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-yellow-600">
              {pendingPayments}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by transaction ID or phone number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payment Table - Desktop */}
        <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: "#082567" }}>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Phone Number
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Method
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPayments.map((payment) => {
                  const statusConfig = getStatusConfig(payment.status);
                  const StatusIcon = statusConfig.icon;
                  const methodConfig =
                    paymentMethodColors[payment.paymentMethod];
                  const isEditing = editingStatus === payment.id;
                  const justUpdated = statusUpdateSuccess === payment.id;

                  return (
                    <tr
                      key={payment.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold text-gray-800">
                            {payment.transactionId}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">
                            {payment.phoneNumber}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          style={{ backgroundColor: methodConfig.bg }}
                          className="inline-block px-3 py-1 rounded-full text-white text-sm font-semibold"
                        >
                          {methodConfig.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-lg font-bold text-gray-800">
                          ৳{payment.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <select
                            value={payment.status}
                            onChange={(e) =>
                              handleStatusUpdate(payment.id, e.target.value)
                            }
                            className="px-3 py-1 border-2 border-blue-500 rounded-lg focus:outline-none text-sm"
                            autoFocus
                          >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="failed">Failed</option>
                          </select>
                        ) : (
                          <div
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${
                              statusConfig.bg
                            } ${statusConfig.border} border ${
                              justUpdated ? "animate-pulse" : ""
                            }`}
                          >
                            <StatusIcon
                              className={`w-4 h-4 ${statusConfig.color}`}
                            />
                            <span
                              className={`text-sm font-semibold ${statusConfig.color}`}
                            >
                              {statusConfig.label}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {formatDate(payment.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            setEditingStatus(isEditing ? null : payment.id)
                          }
                          className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-semibold transition-colors"
                          style={{
                            backgroundColor: isEditing ? "#10b981" : "#082567",
                            color: "white",
                          }}
                        >
                          {isEditing ? (
                            <>
                              <Save className="w-4 h-4" />
                              Save
                            </>
                          ) : (
                            <>
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <p>
                  Showing {start} to {end} of {totalCount} students
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    style={{
                      backgroundColor:
                        currentPage === index + 1 ? "#082567" : "white",
                      color: currentPage === index + 1 ? "white" : "#4b5563",
                    }}
                    className="px-4 py-1 rounded-lg border-2 border-gray-300 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Payment Cards - Mobile */}
        <div className="block md:hidden space-y-4">
          {filteredPayments.map((payment) => {
            const statusConfig = getStatusConfig(payment.status);
            const StatusIcon = statusConfig.icon;
            const methodConfig = paymentMethodColors[payment.paymentMethod];
            const isEditing = editingStatus === payment.id;

            return (
              <div
                key={payment.id}
                className="bg-white rounded-xl shadow-md p-5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    style={{ backgroundColor: methodConfig.bg }}
                    className="px-3 py-1 rounded-full text-white text-sm font-semibold"
                  >
                    {methodConfig.name}
                  </div>
                  {isEditing ? (
                    <select
                      value={payment.status}
                      onChange={(e) =>
                        handleStatusUpdate(payment.id, e.target.value)
                      }
                      className="px-2 py-1 border-2 border-blue-500 rounded-lg focus:outline-none text-xs"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
                  ) : (
                    <div
                      className={`flex items-center gap-1 px-3 py-1 rounded-full ${statusConfig.bg} ${statusConfig.border} border`}
                    >
                      <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                      <span
                        className={`text-xs font-semibold ${statusConfig.color}`}
                      >
                        {statusConfig.label}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Hash className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-semibold text-gray-800">
                      {payment.transactionId}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-semibold text-gray-800">
                      {payment.phoneNumber}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {formatDate(payment.createdAt)}
                    </div>
                    <div
                      className="text-2xl font-bold"
                      style={{ color: "#082567" }}
                    >
                      ৳{payment.amount.toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setEditingStatus(isEditing ? null : payment.id)
                    }
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    style={{
                      backgroundColor: isEditing ? "#10b981" : "#082567",
                      color: "white",
                    }}
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4" />
                        Save Status
                      </>
                    ) : (
                      <>
                        <Edit2 className="w-4 h-4" />
                        Edit Status
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
          {/* Mobile Pagination */}
          {totalPages > 1 && (
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="text-sm text-gray-600 text-center mb-3">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-sm font-semibold">Previous</span>
                </button>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  <span className="text-sm font-semibold">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredPayments.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No Payments Found
            </h3>
            <p className="text-gray-600">
              No payment records match your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPayments;
