import React, { useEffect, useState } from "react";
import SingleStudentAdmitCard from "../../components/AdmitCard/SingleStudetnAdmitCard";
import { ExamEnums } from "../../enums/exam-enum";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { BASE_URL } from "../../utils/constants/constants";
import { Award, BookOpen, Filter, Sheet, Users } from "lucide-react";

const StudentAdmitCard = () => {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [currentStudent, setCurrentStudent] = useState(null);
  const [viewStudentAdmitCard, setViewStudentAdmitCard] = useState(false);

  const axiosInstance = useAxiosInstance();
  const fetchStudentByClass = async () => {
    const res = await axiosInstance.get(
      `${BASE_URL}/api/students/student-by-class/${selectedClass}/`
    );
    if (res.status === 200) {
      setStudents(res.data);
    }
  };

  useEffect(() => {
    if (!selectedClass && !selectedExam) {
      return;
    }
    fetchStudentByClass();
  }, [selectedClass, selectedExam]);

  // Master Data
  const classes = [
    { id: 1, name: "6" },
    { id: 2, name: "7" },
    { id: 3, name: "8" },
    { id: 4, name: "9" },
    { id: 5, name: "10" },
  ];

  const exams = [
    { id: 1, name: ExamEnums.FIRST_TERM_EXAM },
    { id: 2, name: ExamEnums.SECOND_TERM_EXAM },
    { id: 3, name: ExamEnums.HALF_YEARLY_EXAM },
    { id: 4, name: ExamEnums.ANNUAL_EXAM },
  ];

  const viewSingleStudentMarksheet = (id) => {
    setCurrentStudent(id);
    setViewStudentAdmitCard(true);
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
              <Award className="w-6 h-6 text-white" />
              <h1 className="text-xl md:text-2xl font-bold text-white">
                Student Admit Card Generator
              </h1>
            </div>
          </div>
        </div>

        {/* Entry Tab */}
        {viewStudentAdmitCard ? (
          <SingleStudentAdmitCard
            currentStudent={currentStudent}
            exam={selectedExam}
            setViewStudentAdmitCard={setViewStudentAdmitCard}
          />
        ) : (
          <>
            {/* Filter Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5" style={{ color: "#082567" }} />
                <h2 className="text-lg font-bold text-gray-800">
                  Selection Criteria
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Class <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">-- Select Class --</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        Class {cls.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Exam <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">-- Select Exam --</option>
                    {exams.map((exam) => (
                      <option key={exam.id} value={exam.name}>
                        {exam.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Students List */}
            {selectedClass && selectedExam && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div
                  className="p-6 border-b border-gray-200"
                  style={{ backgroundColor: "#082567" }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-white" />
                      <h2 className="text-lg font-bold text-white">
                        Students - Class{" "}
                        {classes[parseInt(selectedClass) - 1].name} (
                        {students?.length} students)
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                          Roll No
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                          Student Name
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                          Group
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                          Admit Card
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {students?.map((student) => {
                        return (
                          <tr
                            key={student.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <span className="font-mono font-semibold text-gray-800">
                                {student.rollNo}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                                  style={{ backgroundColor: "#082567" }}
                                >
                                  {student.studentName.charAt(0)}
                                </div>
                                <span className="font-semibold text-gray-800">
                                  {student.studentName}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {student.group ? (
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                                  {student.group}
                                </span>
                              ) : (
                                <span className="text-gray-400 text-xs">-</span>
                              )}
                            </td>
                            <td className="px-1 py-1">
                              <button
                                onClick={() =>
                                  viewSingleStudentMarksheet(student)
                                }
                                style={{ backgroundColor: "#082567" }}
                                className="hover:cursor-pointer flex items-center gap-2 px-6 py-3 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
                              >
                                <Sheet className="w-5 h-5" />
                                View AdmitCard
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <p>
                        Total Students:{" "}
                        <span className="font-semibold">
                          {students?.length}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!selectedClass && (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Select Class & Exam
                </h3>
                <p className="text-gray-600">Choose the class and exam type</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentAdmitCard;
