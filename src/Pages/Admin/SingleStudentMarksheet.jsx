import { ArrowBigLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { BASE_URL, INSTITUTE_NAME_EN } from "../../utils/constants/constants";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import instituteLogo from "../../assets/logos/educational-institute-logo-1.png";
import GradeTable from "../../components/Marksheet/GradeTable";
import MarksheetTable from "../../components/Marksheet/MarksheetTable";

const SingleStudentMarksheet = ({
  currentStudent,
  exam,
  setViewStudentMarksheet,
}) => {
  const [studentMarks, setStudentMarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxiosInstance();

  const fetchStudentMarks = async () => {
    try {
      setLoading(true);
      const data = { student_id: currentStudent.id, exam };
      const res = await axiosInstance.post(
        `${BASE_URL}/api/academics/student-exam-marks/`,
        data
      );
      setStudentMarks(res.data);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentStudent.id && exam) {
      fetchStudentMarks();
    }
  }, [currentStudent.id, exam]);
  const classes = [
    { id: 1, name: "6" },
    { id: 2, name: "7" },
    { id: 3, name: "8" },
    { id: 4, name: "9" },
    { id: 5, name: "10" },
  ];
  if (loading) {
    return <LoadingSpinner size={10} />;
  }
  return (
    <div>
      <div>
        <button
          onClick={() => setViewStudentMarksheet(false)}
          className=" bg-primary hover:cursor-pointer flex items-center gap-2 px-6 py-3 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
        >
          <ArrowBigLeft className="w-5 h-5" />
          Back
        </button>
      </div>
      <div className="border-4 p-2 mt-5 relative">
        <div className="flex flex-col justify-center items-center gap-4 text-gray-800">
          <h2 className="text-4xl font-semibold">{INSTITUTE_NAME_EN}</h2>
          <img
            src={instituteLogo}
            alt="institute logo"
            className="h-[80px] w-[80px]"
          />
          <h2 className="border-b-2 pb-1 text-xl font-semibold">
            Academic Transcript
          </h2>
        </div>
        <div className="ml-5 text-[18px] flex justify-between items-end">
          <div>
            <p>Name: {currentStudent.studentName}</p>
            <p>Student Id: N/A</p>
            <p>Mother's Name: {currentStudent?.motherName}</p>
            <p>Father's Name: {currentStudent?.FatherName}</p>
            <p>Roll No: {currentStudent?.rollNo}</p>
            <p>
              Class:
              {classes.map((cls) => {
                if (cls.id === currentStudent.studentClass) {
                  return cls.name;
                }
              })}
            </p>
          </div>
          <div>
            <p>Exam:{exam}</p>
            <p>Year/Session:{currentStudent.academicYear}</p>
            <p>Group:{currentStudent.group}</p>
          </div>
          <div></div>
        </div>
        <div className="absolute top-0 right-5">
          <GradeTable />
        </div>
        <div>
          <MarksheetTable studentMarks={studentMarks} />
        </div>
      </div>
    </div>
  );
};

export default SingleStudentMarksheet;
