import React, { useRef, useState } from "react";
import { Printer, Download } from "lucide-react";
import { useReactToPrint } from "react-to-print";

const PaymentSlip = () => {
  const [formData, setFormData] = useState({
    schoolName: "Institute name",
    schoolAddress: "Dhaka",
    schoolMobile: "01715324151",
    studentId: "366",
    memoNo: "20328",
    studentName: "Asif Islam",
    contactNo: "01717087372",
    class: "Ten",
    shift: "Morning",
    section: "A(Hum)",
    rollNo: "17",
    items: [
      { description: "Tuition Fee Jul,Aug", amount: "30" },
      { description: "Tiffin Fee", amount: "200" },
      { description: "Exam Fee", amount: "500" },
      { description: "Tuition Fee Jul,Aug", amount: "30" },
      { description: "Tiffin Fee", amount: "200" },
      { description: "Exam Fee", amount: "500" },
    ],
  });
  const contentRef = useRef();

  const calculateTotal = () => {
    return formData.items.reduce(
      (sum, item) => sum + (parseFloat(item.amount) || 0),
      0,
    );
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

  const getCurrentDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
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
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const ampm = now.getHours() >= 12 ? "pm" : "am";

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}${ampm}`;
  };

  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `Payment_slip
    }`,
    pageStyle: `
      @page {
        size: A4 landscape;
        margin: 0mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  const total = calculateTotal();
  const dateTime = getCurrentDateTime();

  const SlipCopy = ({ title }) => (
    <div className="flex-1 border-2 border-gray-800 p-4 bg-white">
      <div className="text-center mb-4">
        <h2 className="font-bold text-lg">{formData.schoolName}</h2>
        <p className="text-sm">{formData.schoolAddress}</p>
        <p className="text-sm">Mobile : {formData.schoolMobile}</p>
      </div>

      <div className="text-center mb-3">
        <p className="font-semibold underline">{title}</p>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mb-3">
        <div>
          Student ID <span className="font-semibold">{formData.studentId}</span>
        </div>
        <div>
          Memo No <span className="font-semibold">{formData.memoNo}</span>
        </div>
        <div className="col-span-2">
          Date <span className="font-semibold">{dateTime.split(" ")[0]}</span>
        </div>
        <div className="col-span-2">
          Student Name{" "}
          <span className="font-semibold">{formData.studentName}</span>
        </div>
        <div className="col-span-2">
          Contact No <span className="font-semibold">{formData.contactNo}</span>
        </div>
        <div className="col-span-2">
          Class <span className="font-semibold">{formData.class}</span> Shift{" "}
          <span className="font-semibold">{formData.shift}</span> Section{" "}
          <span className="font-semibold">{formData.section}</span> Roll No{" "}
          <span className="font-semibold">{formData.rollNo}</span>
        </div>
      </div>

      <table className="w-full border border-gray-800 text-sm mb-3">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="text-left p-2 border-r border-gray-800">
              Main Fund Description
            </th>
            <th className="text-right p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {formData.items.map((item, index) => (
            <tr key={index} className="border-b border-gray-800">
              <td className="p-2 border-r border-gray-800">
                {item.description}
              </td>
              <td className="p-2 text-right">{item.amount}</td>
            </tr>
          ))}
          <tr className="font-bold">
            <td className="p-2 border-r border-gray-800">Total Amount</td>
            <td className="p-2 text-right">{total}/-</td>
          </tr>
        </tbody>
      </table>

      <p className="text-sm mb-3">In word : {numberToWords(total)}</p>

      <div className="border-t-2 border-dashed border-gray-400 pt-2 text-sm">
        <p>{dateTime} Received by : SSLCOMMERZ</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Payment Slip
        </h1>

        <div className="grid lg:grid-cols-1 gap-6">
          {/* Form Section */}

          {/* Preview Section */}
          <div className="print:hidden">
            <div className="flex gap-4">
              <SlipCopy title="Office Copy" />
              <SlipCopy title="Student's Copy" />
            </div>
          </div>

          {/* Print Version */}
          <div ref={contentRef} className="hidden print:block print:col-span-2">
            <div className="flex gap-4">
              <SlipCopy title="Office Copy" />
              <SlipCopy title="Student's Copy" />
            </div>
          </div>
        </div>
      </div>
      <button onClick={handlePrint}>print</button>
    </div>
  );
};

export default PaymentSlip;
