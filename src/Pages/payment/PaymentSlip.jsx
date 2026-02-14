import React, { useRef, useState } from "react";
import { Printer, Search, Loader } from "lucide-react";
import axiosInstance from "../../api-intercept/axiosInstance";
import { BASE_URL } from "../../utils/constants/constants";
import { useReactToPrint } from "react-to-print";

export default function PaymentSlip() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [slipData, setSlipData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const contentRef = useRef();

  const fetchPaymentSlip = async () => {
    if (!phoneNumber) {
      setError("Please enter phone number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        phoneNumber: phoneNumber,
        year: year,
      };
      // Replace with your actual API endpoint
      const response = await axiosInstance.post(
        `${BASE_URL}/api/payment/payment-slip/`,
        payload
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch payment slip");
      }

      setSlipData(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch payment slip");
    } finally {
      setLoading(false);
    }
  };

  const buildItemsList = () => {
    if (!slipData) return [];

    const items = [];
    const breakdown = slipData.breakdown;

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
        amount: breakdown.tuition_fee.amount,
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

  const SlipCopy = ({ title }) => {
    if (!slipData) return null;

    const items = buildItemsList();
    const dateTime = formatDateTime(slipData.created_at);

    return (
      <div className="flex-1 border-2 border-gray-800 p-4 bg-white">
        <div className="text-center mb-4">
          <h2 className="font-bold text-lg">Institute Name</h2>
          <p className="text-sm">Dhaka, Bangladesh</p>
          <p className="text-sm">Mobile: 01715324151</p>
        </div>

        <div className="text-center mb-3">
          <p className="font-semibold underline">{title}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mb-3">
          <div>
            Student ID:{" "}
            <span className="font-semibold">{slipData.student.id}</span>
          </div>
          <div>
            Memo No:{" "}
            <span className="font-semibold">{slipData.memo_number}</span>
          </div>
          <div className="col-span-2">
            Date:{" "}
            <span className="font-semibold">{dateTime.split(" ")[0]}</span>
          </div>
          <div className="col-span-2">
            Student Name:{" "}
            <span className="font-semibold">{slipData.student.name}</span>
          </div>
          <div className="col-span-2">
            Contact No:{" "}
            <span className="font-semibold">{slipData.student.phone}</span>
          </div>
          <div className="col-span-2">
            Academic Year:{" "}
            <span className="font-semibold">{slipData.year}</span>
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
                <td className="p-2 text-right">{item.amount.toFixed(2)}</td>
              </tr>
            ))}
            <tr className="font-bold">
              <td className="p-2 border-r border-gray-800">Total Amount</td>
              <td className="p-2 text-right">
                {slipData.total_paid.toFixed(2)}/-
              </td>
            </tr>
          </tbody>
        </table>

        {slipData.due_amount > 0 && (
          <div className="text-sm mb-3 p-2 bg-yellow-50 border border-yellow-300 rounded">
            <p className="font-semibold">
              Due Amount: ৳{slipData.due_amount.toFixed(2)}
            </p>
          </div>
        )}

        <p className="text-sm mb-3">
          In words: {numberToWords(slipData.total_paid)}
        </p>

        <div className="border-t-2 border-dashed border-gray-400 pt-2 text-sm">
          <p>{dateTime} - Payment Received</p>
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
                Payment Slip Generator
              </h1>
            </div>
            <p className="text-blue-100 text-xs md:text-sm">
              Generate and print payment slip by entering phone number and year
            </p>
          </div>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Search Payment Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Enter phone number (e.g., 01926126586)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Year <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Enter year"
                min="2020"
                max="2050"
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={fetchPaymentSlip}
            disabled={loading}
            style={{ backgroundColor: loading ? "#9ca3af" : "#082567" }}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Generate Payment Slip
              </>
            )}
          </button>
        </div>

        {/* Payment Slip Preview */}
        {slipData && (
          <>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">
                  Payment Slip Preview {"(print in landscape mode)"}
                </h2>
                <button
                  onClick={handlePrint}
                  style={{ backgroundColor: "#082567" }}
                  className="flex items-center gap-2 px-4 py-2 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <Printer className="w-4 h-4" />
                  Print Slip
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
        {!slipData && !loading && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Printer className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No Payment Slip Generated
            </h3>
            <p className="text-gray-600">
              Enter phone number and year to generate payment slip
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
