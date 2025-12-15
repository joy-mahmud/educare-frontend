import React, { useEffect, useState } from "react";
import {
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Filter,
  Calendar,
  Phone,
  Hash,
} from "lucide-react";
import { Navigate } from "react-router-dom";

export default function StudentPaymentDeatails() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Sample data - Replace this with actual API call
  const payments = [
    {
      id: 1,
      phoneNumber: "01712-345678",
      amount: 5000,
      status: "completed",
      transactionId: "TRX123456789",
      paymentMethod: "bkash",
      createdAt: "2024-12-10T10:30:00",
    },
    {
      id: 2,
      phoneNumber: "01812-345678",
      amount: 3500,
      status: "pending",
      transactionId: "TRX987654321",
      paymentMethod: "nagad",
      createdAt: "2024-12-09T14:20:00",
    },
    {
      id: 3,
      phoneNumber: "01912-345678",
      amount: 7500,
      status: "completed",
      transactionId: "TRX456789123",
      paymentMethod: "rocket",
      createdAt: "2024-12-08T09:15:00",
    },
    {
      id: 4,
      phoneNumber: "01712-987654",
      amount: 4200,
      status: "failed",
      transactionId: "TRX321654987",
      paymentMethod: "bkash",
      createdAt: "2024-12-07T16:45:00",
    },
    {
      id: 5,
      phoneNumber: "01812-765432",
      amount: 6000,
      status: "completed",
      transactionId: "TRX789123456",
      paymentMethod: "nagad",
      createdAt: "2024-12-06T11:30:00",
    },
    {
      id: 6,
      phoneNumber: "01912-876543",
      amount: 2800,
      status: "pending",
      transactionId: "TRX654321789",
      paymentMethod: "rocket",
      createdAt: "2024-12-05T13:20:00",
    },
  ];

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
    (sum, payment) => sum + payment.amount,
    0
  );
  const completedPayments = filteredPayments.filter(
    (p) => p.status === "completed"
  ).length;
  const pendingPayments = filteredPayments.filter(
    (p) => p.status === "pending"
  ).length;

  return (
    <div
      style={{ backgroundColor: "#f8fafc" }}
      className="min-h-screen p-4 md:p-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #082567 0%, #103B99 100%)",
          }}
          className="rounded-2xl p-6 md:p-8 shadow-lg mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <CreditCard className="w-8 h-8 text-white" />
              <h1 className="text-2xl md:text-4xl font-bold text-white">
                Payment History
              </h1>
            </div>
            <p className="text-blue-100 text-sm md:text-base">
              View and track all your payment transactions
            </p>
          </div>
        </div>

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
            {/* Search */}
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

            {/* Status Filter */}
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

        {/* Payment Cards - Mobile View */}
        <div className="block md:hidden space-y-4 mb-8">
          {filteredPayments.map((payment) => {
            const statusConfig = getStatusConfig(payment.status);
            const StatusIcon = statusConfig.icon;
            const methodConfig = paymentMethodColors[payment.paymentMethod];

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
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment Table - Desktop View */}
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
                    Payment Method
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPayments.map((payment) => {
                  const statusConfig = getStatusConfig(payment.status);
                  const StatusIcon = statusConfig.icon;
                  const methodConfig =
                    paymentMethodColors[payment.paymentMethod];

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
                        <div
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${statusConfig.bg} ${statusConfig.border} border`}
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
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {formatDate(payment.createdAt)}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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
}
