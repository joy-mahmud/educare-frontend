import React, { useRef, useState } from "react";
import { Printer, User } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import {
  INSTITUTE_NAME_BN,
  INSTITUTE_NAME_EN,
} from "../../utils/constants/constants";

export default function StudentAdmitCard() {
  const printRef = useRef();

  const [admitData] = useState({
    regNo: "25421140052",
    examRoll: "4412",
    exam: "2025",
    name: "ASIYA FARHANA",
    fatherName: "MASIUR RAHMAN",
    motherName: "RIMA AKTER",
    institutionName: "TALENT CAMPUS SCHOOL & COLLEGE",
    examCenter: "Uttara High School & College",
    buildingName: "School Building",
    examDate: "14-11-2025 (10:00 AM)",
    gender: "Female",
    class: "Class 4",
    section: "",
    category: "School",
    mobile: "01909870663",
    floorNumber: "2",
    roomNumber: "206",
    photo: null,
  });

  const examRoutine = [
    {
      date: "14-11-2025",
      day: "Thursday",
      time: "10:00 AM - 12:00 PM",
      subject: "Bangla",
      marks: "100",
    },
    {
      date: "16-11-2025",
      day: "Saturday",
      time: "10:00 AM - 12:00 PM",
      subject: "English",
      marks: "100",
    },
    {
      date: "18-11-2025",
      day: "Monday",
      time: "10:00 AM - 12:00 PM",
      subject: "Mathematics",
      marks: "100",
    },
    {
      date: "20-11-2025",
      day: "Wednesday",
      time: "10:00 AM - 12:00 PM",
      subject: "Science",
      marks: "100",
    },
    {
      date: "22-11-2025",
      day: "Friday",
      time: "10:00 AM - 12:00 PM",
      subject: "Social Studies",
      marks: "100",
    },
    {
      date: "24-11-2025",
      day: "Sunday",
      time: "10:00 AM - 12:00 PM",
      subject: "Religion",
      marks: "100",
    },
  ];

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "student_admit_card",
  });

  return (
    <div className="bg-gray-100 min-h-screen p-4 print:p-0">
      <div className="mx-auto">

        {/* Print Button */}
        <div className="mb-4 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3 text-white rounded-lg font-semibold hover:shadow-lg"
            style={{ backgroundColor: "#082567" }}
          >
            <Printer className="w-5 h-5" />
            Print Admit Card
          </button>
        </div>

        {/* A4 Container */}
        <div
          ref={printRef}
          className="bg-white admit-card shadow-lg"
          style={{
            width: "210mm",
            minHeight: "297mm",
            padding: "12mm",
            margin: "auto",
            boxSizing: "border-box",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 bg-blue-900 text-white p-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-gray-400" />
            </div>

            <div className="flex-1 text-center">
              <h1 className="text-2xl font-bold">{INSTITUTE_NAME_EN}</h1>
              <h2 className="text-xl">{INSTITUTE_NAME_BN}</h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-3">

            {/* Top Section */}
            <div className="flex justify-between mb-6">

              <div className="flex gap-4 h-[45px]">
                <div className="border-2 border-gray-800 px-4 py-2">
                  <strong>Reg No:</strong> {admitData.regNo}
                </div>

                <div className="border-2 border-gray-800 px-4 py-2 h-[45px]">
                  <strong>Exam Roll:</strong> {admitData.examRoll}
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold">Exam - {admitData.exam}</h2>
                <div className="border px-6 py-1 mt-1 inline-block font-bold">
                  Admit Card
                </div>
              </div>

              <div className="w-28 h-32 border-2 border-gray-800 flex items-center justify-center">
                {admitData.photo ? (
                  <img src={admitData.photo} alt="Student" />
                ) : (
                  <User className="w-12 h-12 text-gray-400" />
                )}
              </div>
            </div>

            {/* Student Info */}
            <div className="grid grid-cols-2 gap-y-2 text-sm mb-6">

              <p><strong>Name:</strong> {admitData.name}</p>
              <p><strong>Gender:</strong> {admitData.gender}</p>

              <p><strong>Father:</strong> {admitData.fatherName}</p>
              <p><strong>Class:</strong> {admitData.class}</p>

              <p><strong>Mother:</strong> {admitData.motherName}</p>
              <p><strong>Section:</strong> {admitData.section || "-"}</p>

              <p><strong>Institution:</strong> {admitData.institutionName}</p>
              <p><strong>Category:</strong> {admitData.category}</p>

              <p><strong>Exam Center:</strong> {admitData.examCenter}</p>
              <p><strong>Mobile:</strong> {admitData.mobile}</p>

              <p><strong>Building:</strong> {admitData.buildingName}</p>
              <p><strong>Floor:</strong> {admitData.floorNumber}</p>

              <p><strong>Exam Date:</strong> {admitData.examDate}</p>
              <p><strong>Room:</strong> {admitData.roomNumber}</p>

            </div>

            {/* Exam Routine */}
            <div className="mb-6">

              <h3 className="font-bold text-lg mb-2 border-b pb-1">
                Exam Routine
              </h3>

              <table className="w-full border border-gray-800 text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-2 py-1">Date</th>
                    <th className="border px-2 py-1">Day</th>
                    <th className="border px-2 py-1">Time</th>
                    <th className="border px-2 py-1">Subject</th>
                    <th className="border px-2 py-1">Marks</th>
                  </tr>
                </thead>

                <tbody>
                  {examRoutine.map((exam, i) => (
                    <tr key={i}>
                      <td className="border px-2 py-1">{exam.date}</td>
                      <td className="border px-2 py-1">{exam.day}</td>
                      <td className="border px-2 py-1">{exam.time}</td>
                      <td className="border px-2 py-1">{exam.subject}</td>
                      <td className="border px-2 py-1 text-center">
                        {exam.marks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Signatures */}
            <div className="flex justify-between mt-16 signature-section">

              <div className="text-center">
                <div className="h-16"></div>
                <div className="border-t border-black px-8 pt-1">
                  Student Signature
                </div>
              </div>

              <div className="text-center">
                <div className="h-16"></div>
                <div className="border-t border-black px-8 pt-1">
                  Principal Signature
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Print CSS */}
      <style>
        {`
        @media print {

          body{
            background:white;
            -webkit-print-color-adjust:exact;
            print-color-adjust:exact;
          }

          .print\\:hidden{
            display:none;
          }

          .admit-card{
            width:210mm;
            min-height:297mm;
            margin:0;
            box-shadow:none;
          }

          table{
            page-break-inside:avoid;
          }

          .signature-section{
            page-break-inside:avoid;
          }

        }
        `}
      </style>
    </div>
  );
}