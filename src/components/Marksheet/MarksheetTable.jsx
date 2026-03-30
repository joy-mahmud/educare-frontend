import React from "react";

const MarksheetTable = ({ studentMarks }) => {
  console.log(studentMarks);
  const marksData = [
    {
      srl: 1,
      subject: "Bangla",
      fullMarks: 100,
      cq100: "37.00",
      cq70: "25.90",
      total: "25.90",
      highest: "85.10",
      letter: "F",
      gp: "",
    },
    {
      srl: 2,
      subject: "English",
      fullMarks: 100,
      cq100: "39.00",
      cq70: "27.30",
      total: "41.10",
      highest: "89.20",
      letter: "C",
      gp: "2.00",
    },
    {
      srl: 3,
      subject: "Mathematics",
      fullMarks: 100,
      cq100: "15.00",
      cq70: "10.50",
      total: "16.50",
      highest: "93.70",
      letter: "F",
      gp: "",
    },
    {
      srl: 4,
      subject: "Religion",
      fullMarks: 100,
      cq100: "48.00",
      cq70: "33.60",
      total: "43.80",
      highest: "88.50",
      letter: "C",
      gp: "2.00",
    },
    {
      srl: 5,
      subject: "Bangladesh and Global Studies",
      fullMarks: 100,
      cq100: "37.00",
      cq70: "25.90",
      total: "34.30",
      highest: "90.60",
      letter: "D",
      gp: "1.00",
    },
    {
      srl: 6,
      subject: "ICT",
      fullMarks: 50,
      cq100: "19.00",
      cq70: "19",
      total: "19",
      highest: "50",
      letter: "D",
      gp: "1.00",
    },
    {
      srl: 7,
      subject: "Agriculture Studies/Home Science",
      fullMarks: 50,
      cq100: "11.00",
      cq70: "11",
      total: "11",
      highest: "49",
      letter: "F",
      gp: "",
    },
    {
      srl: 8,
      subject: "General Science",
      fullMarks: 100,
      cq100: "23.00",
      cq70: "16.10",
      total: "26.30",
      highest: "91.70",
      letter: "F",
      gp: "",
    },
  ];

  return (
    <div className="w-full overflow-x-auto p-4">
      <table className="w-full border-collapse border border-black text-sm text-center">
        <thead>
          <tr className="bg-white">
            <th className="border border-black px-2 py-1" rowSpan="2">
              SL
            </th>
            <th className="border border-black px-4 py-1 text-left" rowSpan="2">
              Subjects
            </th>
            <th className="border border-black px-2 py-1" rowSpan="2">
              Full Marks
            </th>
            <th className="border border-black px-2 py-1" colSpan="2">
              Examination
            </th>
            <th className="border border-black px-2 py-1" rowSpan="2">
              Total Mark
            </th>
            <th className="border border-black px-2 py-1" rowSpan="2">
              Highest Marks
            </th>
            <th className="border border-black px-2 py-1" rowSpan="2">
              Letter Grade
            </th>
            <th className="border border-black px-2 py-1" rowSpan="2">
              Grade Point
            </th>
          </tr>
          <tr className="bg-white">
            <th className="border border-black px-2 py-1">CQ</th>
            <th className="border border-black px-2 py-1">MCQ</th>
          </tr>
        </thead>
        <tbody>
          {studentMarks?.subjects_marks?.map((row, index) => {
            // GROUPED SUBJECT (Bangla / English)
            if (row.parts) {
              return row.parts.map((part, partIndex) => (
                <tr key={`${index}-${partIndex}`} className="hover:bg-gray-50">
                  {/* Serial */}
                  <td className="border border-black px-2 py-1">
                    {partIndex === 0 ? index + 1 : ""}
                  </td>

                  {/* Subject */}
                  <td className="border border-black px-4 py-1 text-left font-medium">
                    {part.subject_name}
                  </td>

                  {/* Full Marks */}
                  <td className="border border-black px-2 py-1">
                    {part.full_marks}
                  </td>

                  {/* CQ */}
                  <td className="border border-black px-2 py-1">
                    {part.obtaining_marks?.cq ?? "-"}
                  </td>

                  {/* MCQ */}
                  <td className="border border-black px-2 py-1">
                    {part.obtaining_marks?.mcq ?? "-"}
                  </td>

                  {/* Total */}
                  <td className="border border-black px-2 py-1 font-bold">
                    {part.total_marks}
                  </td>

                  {/* Highest */}
                  <td className="border border-black px-2 py-1">
                    {part.highest_marks}
                  </td>

                  {/* Letter Grade (rowspan) */}
                  {partIndex === 0 && (
                    <td
                      rowSpan={row.parts.length}
                      className="border border-black px-2 py-1"
                    >
                      {row.combined_letter_grade}
                    </td>
                  )}

                  {/* GPA (rowspan) */}
                  {partIndex === 0 && (
                    <td
                      rowSpan={row.parts.length}
                      className="border border-black px-2 py-1 font-semibold"
                    >
                      {row.combined_grade_point}
                    </td>
                  )}
                </tr>
              ));
            }

            // NORMAL SUBJECT
            return (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-black px-2 py-1">{index + 1}</td>

                <td className="border border-black px-4 py-1 text-left font-medium">
                  {row.subject_name}
                </td>

                <td className="border border-black px-2 py-1">
                  {row.full_marks}
                </td>

                <td className="border border-black px-2 py-1">
                  {row.obtaining_marks?.cq ?? "-"}
                </td>

                <td className="border border-black px-2 py-1">
                  {row.obtaining_marks?.mcq ?? "-"}
                </td>

                <td className="border border-black px-2 py-1 font-bold">
                  {row.total_marks}
                </td>

                <td className="border border-black px-2 py-1">
                  {row.highest_marks}
                </td>

                <td className="border border-black px-2 py-1">
                  {row.letter_grade}
                </td>

                <td className="border border-black px-2 py-1 font-semibold">
                  {row.grade_point}
                </td>
              </tr>
            );
          })}

          {/* Footer */}
          <tr className="bg-gray-50 font-bold">
            <td className="border border-black px-4 py-2 text-left" colSpan="2">
              Total Marks & Total GPA
            </td>

            <td className="border border-black px-2 py-2">
              {studentMarks?.total_full_marks}
            </td>

            <td colSpan="2"></td>

            <td className="border border-black px-2 py-2">
              {studentMarks?.total_obtained_marks}
            </td>

            <td className="border border-black" colSpan="1"></td>
            <td className="border border-black" colSpan="1">
              {studentMarks?.final_grade}
            </td>

            <td className="border border-black px-2 py-2">
              {studentMarks?.final_gpa}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MarksheetTable;
