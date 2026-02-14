import React, { useEffect, useRef, useState } from "react";
import { Printer, Search, Loader } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants/constants";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

export default function SinglePaymentSlip() {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const contentRef = useRef();
  const { id } = useParams();

  const fetchSinglePayment = async () => {
    setLoading(true);
    setError("");

    try {
      // Replace with your actual API endpoint
      const response = await axios.get(
        `${BASE_URL}/api/payment/single-payment/${id}`
      );

      if (response.status !== 200) {
        throw new Error("Payment not found");
      }

      const data = response.data;
      setPaymentData(data);
    } catch (err) {
      setError(err.message || "Failed to fetch payment");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSinglePayment();
  }, []);

  const buildItemsList = () => {
    if (!paymentData) return [];

    const items = [];
    const breakdown = paymentData.payment_breakdown;

    // Application Fee
    if (breakdown.application_fee > 0) {
      items.push({
        description: "Application Fee",
        amount: breakdown.application_fee,
      });
    }

    // Admission Fee
    if (breakdown.admission_fee > 0) {
      items.push({
        description: "Admission Fee",
        amount: breakdown.admission_fee,
      });
    }

    // Registration Fee
    if (breakdown.registration_fee > 0) {
      items.push({
        description: "Registration Fee",
        amount: breakdown.registration_fee,
      });
    }

    // Tuition Fee
    if (breakdown.tuition_fee.amount > 0) {
      const months = breakdown.tuition_fee.months.join(", ");
      items.push({
        description: `Tuition Fee (${months})`,
        amount: parseFloat(breakdown.tuition_fee.amount),
      });
    }

    // First Semester Exam Fee
    if (breakdown.exam_fee.first_semester > 0) {
      items.push({
        description: "1st Semester Exam Fee",
        amount: breakdown.exam_fee.first_semester,
      });
    }

    // Second Semester Exam Fee
    if (breakdown.exam_fee.second_semester > 0) {
      items.push({
        description: "2nd Semester Exam Fee",
        amount: breakdown.exam_fee.second_semester,
      });
    }

    return items;
  };

  const numberToWords = (num) => {
    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    if (num === 0) return "Zero";

    const convertHundreds = (n) => {
      let str = "";
      if (n > 99) {
        str += ones[Math.floor(n / 100)] + " Hundred ";
        n %= 100;
      }
      if (n > 19) {
        str += tens[Math.floor(n / 10)] + " ";
        n %= 10;
      } else if (n > 9) {
        str += teens[n - 10] + " ";
        return str;
      }
      str += ones[n] + " ";
      return str;
    };

    let result = "";
    if (num >= 10000000) {
      result += convertHundreds(Math.floor(num / 10000000)) + "Crore ";
      num %= 10000000;
    }
    if (num >= 100000) {
      result += convertHundreds(Math.floor(num / 100000)) + "Lakh ";
      num %= 100000;
    }
    if (num >= 1000) {
      result += convertHundreds(Math.floor(num / 1000)) + "Thousand ";
      num %= 1000;
    }
    result += convertHundreds(num);

    return result.trim() + " Taka Only";
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "pm" : "am";

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}${ampm}`;
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-300",
      },
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        border: "border-yellow-300",
      },
      failed: {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-300",
      },
    };
    return colors[status] || colors.pending;
  };

  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `Payment_slip
      }`,
    pageStyle: `
        @page {
          size: A4 landscape;
          margin: 5mm;
        }
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `,
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  {
    error && (
      <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-lg text-red-700 text-sm">
        {error}
      </div>
    );
  }

  const SlipCopy = ({ title }) => {
    if (!paymentData) return null;

    const items = buildItemsList();
    const dateTime = formatDateTime(paymentData.createdAt);
    const statusColor = getStatusColor(paymentData.status);

    return (
      <div className="flex-1 border-2 border-gray-800 p-4 bg-white">
        <div className="text-center mb-4">
          <h2 className="font-bold text-lg">Institute Name</h2>
          <p className="text-sm">Dhaka, Bangladesh</p>
          <p className="text-sm">Mobile: 01715324151</p>
        </div>

        <div className="text-center mb-3">
          <p className="font-semibold underline text-base">{title}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mb-3">
          <div className="col-span-2">
            Transaction ID:{" "}
            <span className="font-semibold font-mono">
              {paymentData.transactionId}
            </span>
          </div>
          <div>
            Student ID:{" "}
            <span className="font-semibold">{paymentData.studentId}</span>
          </div>
          <div>
            Date:{" "}
            <span className="font-semibold">{dateTime.split(" ")[0]}</span>
          </div>
          <div className="col-span-2">
            Student Name:{" "}
            <span className="font-semibold">{paymentData.studentName}</span>
          </div>
          <div className="col-span-2">
            Contact No:{" "}
            <span className="font-semibold">{paymentData.phoneNumber}</span>
          </div>
          <div className="col-span-2">
            Payment Method:{" "}
            <span className="font-semibold uppercase">
              {paymentData.paymentMethod}
            </span>
          </div>
        </div>

        {/* Payment Status */}
        <div className="mb-3">
          <div
            className={`inline-block px-3 py-1 rounded ${statusColor.bg} ${statusColor.text} border ${statusColor.border} text-xs font-bold uppercase`}
          >
            Status: {paymentData.status}
          </div>
        </div>

        <table className="w-full border border-gray-800 text-sm mb-3">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left p-2 border-r border-gray-800">
                Fee Description
              </th>
              <th className="text-right p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-gray-800">
                <td className="p-2 border-r border-gray-800">
                  {item.description}
                </td>
                <td className="p-2 text-right">৳{item.amount.toFixed(2)}</td>
              </tr>
            ))}
            <tr className="font-bold bg-gray-100">
              <td className="p-2 border-r border-gray-800">
                Total Amount Paid
              </td>
              <td className="p-2 text-right">
                ৳{parseFloat(paymentData.amount).toFixed(2)}/-
              </td>
            </tr>
          </tbody>
        </table>

        <p className="text-sm mb-3">
          <span className="font-semibold">In words:</span>{" "}
          {numberToWords(paymentData.amount)}
        </p>

        <div className="border-t-2 border-dashed border-gray-400 pt-2 text-xs mb-4">
          <p>
            {dateTime} - Payment Received via{" "}
            {paymentData.paymentMethod.toUpperCase()}
          </p>
        </div>

        {/* Signature Section */}
        <div className="mt-6 pt-4 border-t border-gray-300">
          <div className="flex justify-between items-end">
            <div className="text-center" style={{ width: "45%" }}>
              <div className="mb-12"></div>
              <div className="border-t-2 border-gray-800 pt-1">
                <p className="text-xs font-semibold">Student's Signature</p>
              </div>
            </div>
            <div className="text-center" style={{ width: "45%" }}>
              <div className="mb-12"></div>
              <div className="border-t-2 border-gray-800 pt-1">
                <p className="text-xs font-semibold">Authorized Signature</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
          className="rounded-xl p-4 md:p-6 shadow-lg mb-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full -mr-24 -mt-24"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mb-16"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Printer className="w-6 h-6 text-white" />
              <h1 className="text-xl md:text-2xl font-bold text-white">
                Payment Receipt Generator
              </h1>
            </div>
            <p className="text-blue-100 text-xs md:text-sm">
              Generate payment receipt.
            </p>
          </div>
        </div>

        {/* Payment Slip Preview */}
        {paymentData && (
          <>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Payment Receipt
                  </h2>
                  <p className="text-sm text-gray-600">
                    Transaction: {paymentData.transactionId}
                  </p>
                </div>
                <button
                  onClick={handlePrint}
                  style={{ backgroundColor: "#082567" }}
                  className="flex items-center gap-2 px-4 py-2 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <Printer className="w-4 h-4" />
                  Print Receipt
                </button>
              </div>

              {/* Preview Section */}
              <div className="overflow-x-auto">
                <div className="min-w-[800px] flex gap-4">
                  <SlipCopy title="Office Copy" />
                  <SlipCopy title="Student's Copy" />
                </div>
              </div>
            </div>

            {/* Print Version (Hidden) */}
            <div ref={contentRef} className="hidden print:block">
              <div className="flex gap-4">
                <SlipCopy title="Office Copy" />
                <SlipCopy title="Student's Copy" />
              </div>
            </div>
          </>
        )}

        {/* No Data State */}
        {!paymentData && !loading && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Printer className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No Payment Receipt Generated
            </h3>
            <p className="text-gray-600">
              Something went wrong while fetching the payment information
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
