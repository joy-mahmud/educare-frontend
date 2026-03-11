import React from "react";

const GradeTable = () => {
  const gradeData = [
    { letter: "A+", interval: "80 - 100", point: "5" },
    { letter: "A", interval: "70 - 79", point: "4" },
    { letter: "A-", interval: "60 - 69", point: "3.50" },
    { letter: "B", interval: "50 - 59", point: "3" },
    { letter: "C", interval: "40 - 49", point: "2" },
    { letter: "D", interval: "33 - 39", point: "1" },
    { letter: "F", interval: "0 - 32", point: "0" },
  ];

  return (
    <div className="max-w-[250px] mx-auto my-8 overflow-hidden rounded-lg border border-gray-300 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="px-2 py-1 font-semibold text-gray-800 border-r border-gray-300">
              Letter Grade
            </th>
            <th className="px-2 py-1 text-lg font-semibold text-gray-800 border-r border-gray-300">
              Marks Interval
            </th>
            <th className="px-2 py-1 text-lg font-semibold text-gray-800">
              Grade Point
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {gradeData.map((row, index) => (
            <tr
              key={index}
              className="border-b border-gray-300 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <td className="px-2 py-1 text-gray-700 border-r border-gray-300 text-center">
                {row.letter}
              </td>
              <td className="px-2 py-1 text-gray-700 border-r border-gray-300 text-center">
                {row.interval}
              </td>
              <td className="px-2 py-1 text-gray-700 text-center font-medium">
                {row.point}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeTable;
