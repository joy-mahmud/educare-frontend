import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Users,
  Save,
  CheckCircle,
  Award,
  Filter,
  Edit2,
  Eye,
  Trash2,
  Plus,
} from "lucide-react";
import Swal from "sweetalert2";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { BASE_URL } from "../../utils/constants/constants";

export default function ResultEntrySystem() {
  const [students, setStudents] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [results, setResults] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("entry"); // 'entry' or 'view'
  const [savedResults, setSavedResults] = useState([]);
  const [viewFilter, setViewFilter] = useState({
    class: "",
    subject: "",
    exam: "",
  });
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
    try {
      if (!selectedClass) {
        return;
      }
      fetchStudentByClass();
    } catch (error) {
      console.log(error);
    }
  }, [selectedClass]);

  // Master Data
  const classes = [
    { id: 1, name: "6" },
    { id: 2, name: "7" },
    { id: 3, name: "8" },
    { id: 4, name: "9" },
    { id: 5, name: "10" },
  ];

  const groups = [
    { id: 1, name: "Science" },
    { id: 2, name: "Commerce" },
    { id: 3, name: "Arts" },
  ];

  const subjects = {
    compulsory: [
      { id: 1, name: "Bangla", type: "COMPULSORY" },
      { id: 2, name: "English", type: "COMPULSORY" },
      { id: 3, name: "Mathematics", type: "COMPULSORY" },
      { id: 4, name: "Bangladesh and Global Studies", type: "COMPULSORY" },
      { id: 5, name: "Religion", type: "COMPULSORY" },
      { id: 6, name: "ICT", type: "COMPULSORY" },
    ],
    science: [
      { id: 7, name: "Physics", type: "GROUP_COMPULSORY", group: "Science" },
      { id: 8, name: "Chemistry", type: "GROUP_COMPULSORY", group: "Science" },
      { id: 9, name: "Biology", type: "GROUP_COMPULSORY", group: "Science" },
      {
        id: 10,
        name: "Higher Mathematics",
        type: "GROUP_COMPULSORY",
        group: "Science",
      },
    ],
    commerce: [
      {
        id: 11,
        name: "Accounting",
        type: "GROUP_COMPULSORY",
        group: "Commerce",
      },
      {
        id: 12,
        name: "Business Entrepreneurship",
        type: "GROUP_COMPULSORY",
        group: "Commerce",
      },
      {
        id: 13,
        name: "Finance and Banking",
        type: "GROUP_COMPULSORY",
        group: "Commerce",
      },
    ],
    arts: [
      { id: 14, name: "History", type: "GROUP_COMPULSORY", group: "Arts" },
      { id: 15, name: "Geography", type: "GROUP_COMPULSORY", group: "Arts" },
      { id: 16, name: "Civics", type: "GROUP_COMPULSORY", group: "Arts" },
      { id: 17, name: "Economics", type: "GROUP_COMPULSORY", group: "Arts" },
    ],
  };

  const allSubjects = [
    ...subjects.compulsory,
    ...subjects.science,
    ...subjects.commerce,
    ...subjects.arts,
  ];

  const exams = [
    { id: 1, name: "First Terminal Exam" },
    { id: 2, name: "Half Yearly Exam" },
    { id: 3, name: "Second Terminal Exam" },
    { id: 4, name: "Annual Exam" },
  ];

  // Mock Students Data
  const allStudents = [
    // Class 6
    { id: 1, name: "Aisha Rahman", rollNo: "001", class: "6", group: null },
    { id: 2, name: "Mahmud Hasan", rollNo: "002", class: "6", group: null },
    { id: 3, name: "Fatima Begum", rollNo: "003", class: "6", group: null },

    // Class 7
    { id: 4, name: "Karim Ahmed", rollNo: "001", class: "7", group: null },
    { id: 5, name: "Nusrat Jahan", rollNo: "002", class: "7", group: null },

    // Class 8
    { id: 6, name: "Rafiq Islam", rollNo: "001", class: "8", group: null },
    { id: 7, name: "Sadia Akter", rollNo: "002", class: "8", group: null },
    { id: 8, name: "Tanvir Hossain", rollNo: "003", class: "8", group: null },

    // Class 9 - Science
    { id: 9, name: "Rahim Uddin", rollNo: "001", class: "9", group: "Science" },
    {
      id: 10,
      name: "Ayesha Siddiqua",
      rollNo: "002",
      class: "9",
      group: "Science",
    },
    {
      id: 11,
      name: "Farhan Ahmed",
      rollNo: "003",
      class: "9",
      group: "Science",
    },

    // Class 9 - Commerce
    {
      id: 12,
      name: "Momena Khatun",
      rollNo: "004",
      class: "9",
      group: "Commerce",
    },
    {
      id: 13,
      name: "Jahangir Alam",
      rollNo: "005",
      class: "9",
      group: "Commerce",
    },

    // Class 9 - Arts
    { id: 14, name: "Sultana Razia", rollNo: "006", class: "9", group: "Arts" },
    { id: 15, name: "Habib Rahman", rollNo: "007", class: "9", group: "Arts" },

    // Class 10 - Science
    {
      id: 16,
      name: "Sakib Al Hasan",
      rollNo: "001",
      class: "10",
      group: "Science",
    },
    {
      id: 17,
      name: "Tamim Iqbal",
      rollNo: "002",
      class: "10",
      group: "Science",
    },
    {
      id: 18,
      name: "Mushfiqur Rahim",
      rollNo: "003",
      class: "10",
      group: "Science",
    },
    {
      id: 19,
      name: "Rumana Ahmed",
      rollNo: "004",
      class: "10",
      group: "Science",
    },

    // Class 10 - Commerce
    {
      id: 20,
      name: "Jahanara Alam",
      rollNo: "005",
      class: "10",
      group: "Commerce",
    },
    {
      id: 21,
      name: "Mashrafe Mortaza",
      rollNo: "006",
      class: "10",
      group: "Commerce",
    },

    // Class 10 - Arts
    { id: 22, name: "Shakib Khan", rollNo: "007", class: "10", group: "Arts" },
    {
      id: 23,
      name: "Nusrat Imrose",
      rollNo: "008",
      class: "10",
      group: "Arts",
    },
  ];

  // const students = allStudents.filter((s) =>
  //   selectedClass ? s.class === selectedClass : true
  // );

  const calculateGrade = (marks) => {
    if (marks >= 80) return "A+";
    if (marks >= 70) return "A";
    if (marks >= 60) return "A-";
    if (marks >= 50) return "B";
    if (marks >= 40) return "C";
    if (marks >= 33) return "D";
    return "F";
  };

  const handleMarksChange = (studentId, value) => {
    const marks = parseFloat(value) || 0;
    const grade = calculateGrade(marks);

    setResults({
      ...results,
      [studentId]: {
        marks: marks,
        grade: grade,
      },
    });
  };

  const handleSubmit = () => {
    if (!selectedClass || !selectedSubject || !selectedExam) {
      Swal.fire({
        icon: "error",
        text: "Please select class, subject, and exam",
      });

      return;
    }

    if (Object.keys(results).length === 0) {
      Swal.fire({
        icon: "error",
        text: "Please enter marks for at least one student",
      });
      return;
    }

    const selectedSubjectData = allSubjects.find(
      (s) => s.id === parseInt(selectedSubject)
    );
    const selectedExamData = exams.find((e) => e.name === selectedExam);

    const newResults = Object.entries(results).map(([studentId, data]) => {
      const student = allStudents.find((s) => s.id === parseInt(studentId));
      return {
        id: Date.now() + parseInt(studentId),
        studentId: parseInt(studentId),
        studentName: student.name,
        rollNo: student.rollNo,
        class: selectedClass,
        group: student.group,
        subjectId: parseInt(selectedSubject),
        subjectName: selectedSubjectData.name,
        exam: selectedExam,
        marks: data.marks,
        grade: data.grade,
        date: new Date().toISOString(),
      };
    });

    setSavedResults([...savedResults, ...newResults]);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setResults({});
      setSelectedClass("");
      setSelectedSubject("");
      setSelectedExam("");
    }, 2000);
  };
  console.log(savedResults);

  const deleteResult = (id) => {
    if (confirm("Are you sure you want to delete this result?")) {
      setSavedResults(savedResults.filter((r) => r.id !== id));
    }
  };

  const filteredSavedResults = savedResults.filter((r) => {
    if (viewFilter.class && r.class !== viewFilter.class) return false;
    if (viewFilter.subject && r.subjectId !== parseInt(viewFilter.subject))
      return false;
    if (viewFilter.exam && r.exam !== viewFilter.exam) return false;
    return true;
  });
  console.log(selectedClass);

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
                Student Result Management System
              </h1>
            </div>
            <p className="text-blue-100 text-xs md:text-sm">
              Complete result entry and viewing system - Bangladesh National
              Curriculum
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setActiveTab("entry")}
              style={{
                backgroundColor:
                  activeTab === "entry" ? "#082567" : "transparent",
                color: activeTab === "entry" ? "white" : "#4b5563",
              }}
              className="flex-1 py-4 px-6 font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Entry Results
            </button>
            <button
              onClick={() => setActiveTab("view")}
              style={{
                backgroundColor:
                  activeTab === "view" ? "#082567" : "transparent",
                color: activeTab === "view" ? "white" : "#4b5563",
              }}
              className="flex-1 py-4 px-6 font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5" />
              View Results ({savedResults.length})
            </button>
          </div>
        </div>

        {/* Entry Tab */}
        {activeTab === "entry" && (
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
                    Select Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">-- Select Subject --</option>
                    <optgroup label="Compulsory Subjects">
                      {subjects.compulsory.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Science Group">
                      {subjects.science.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Commerce Group">
                      {subjects.commerce.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Arts Group">
                      {subjects.arts.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                    </optgroup>
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

              {selectedClass && selectedSubject && selectedExam && (
                <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Selected:</span> Class{" "}
                    {selectedClass} -{" "}
                    {
                      allSubjects.find(
                        (s) => s.id === parseInt(selectedSubject)
                      )?.name
                    }{" "}
                    - {selectedExam}
                  </p>
                </div>
              )}
            </div>

            {/* Success Message */}
            {submitted && (
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 mb-6 text-center animate-fadeIn">
                <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-xl font-bold text-green-800 mb-2">
                  Results Saved Successfully!
                </h2>
                <p className="text-green-700">
                  All marks have been recorded in the system.
                </p>
              </div>
            )}

            {/* Students List */}
            {selectedClass && selectedSubject && selectedExam && !submitted && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div
                  className="p-6 border-b border-gray-200"
                  style={{ backgroundColor: "#082567" }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-white" />
                      <h2 className="text-lg font-bold text-white">
                        Students - Class {selectedClass} ({students.length}{" "}
                        students)
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
                          Marks (Out of 100)
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                          Grade
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {students.map((student) => {
                        const studentResult = results[student.id] || {
                          marks: "",
                          grade: "-",
                        };
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
                            <td className="px-6 py-4">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                                value={studentResult.marks}
                                onChange={(e) =>
                                  handleMarksChange(student.id, e.target.value)
                                }
                                className="w-32 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-center font-semibold"
                                placeholder="0.00"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-4 py-2 rounded-lg font-bold text-sm ${
                                  studentResult.grade === "A+"
                                    ? "bg-green-100 text-green-800"
                                    : studentResult.grade === "A"
                                      ? "bg-green-50 text-green-700"
                                      : studentResult.grade === "A-"
                                        ? "bg-blue-100 text-blue-700"
                                        : studentResult.grade === "B"
                                          ? "bg-blue-50 text-blue-600"
                                          : studentResult.grade === "C"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : studentResult.grade === "D"
                                              ? "bg-orange-100 text-orange-700"
                                              : studentResult.grade === "F"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-gray-100 text-gray-500"
                                }`}
                              >
                                {studentResult.grade}
                              </span>
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
                        <span className="font-semibold">{students.length}</span>
                      </p>
                      <p>
                        Marks Entered:{" "}
                        <span className="font-semibold">
                          {Object.keys(results).length}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={handleSubmit}
                      style={{ backgroundColor: "#082567" }}
                      className="flex items-center gap-2 px-6 py-3 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
                    >
                      <Save className="w-5 h-5" />
                      Save All Results
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!selectedClass && (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Select Class, Subject & Exam
                </h3>
                <p className="text-gray-600">
                  Choose the class, subject, and exam type to start entering
                  marks
                </p>
              </div>
            )}
          </>
        )}

        {/* View Tab */}
        {activeTab === "view" && (
          <>
            {/* View Filters */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Filter Results
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <select
                  value={viewFilter.class}
                  onChange={(e) =>
                    setViewFilter({ ...viewFilter, class: e.target.value })
                  }
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">All Classes</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.name}>
                      Class {cls.name}
                    </option>
                  ))}
                </select>

                <select
                  value={viewFilter.subject}
                  onChange={(e) =>
                    setViewFilter({ ...viewFilter, subject: e.target.value })
                  }
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">All Subjects</option>
                  {allSubjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>

                <select
                  value={viewFilter.exam}
                  onChange={(e) =>
                    setViewFilter({ ...viewFilter, exam: e.target.value })
                  }
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">All Exams</option>
                  {exams.map((exam) => (
                    <option key={exam.id} value={exam.name}>
                      {exam.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Saved Results Table */}
            {filteredSavedResults.length > 0 ? (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead style={{ backgroundColor: "#082567" }}>
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                          Roll No
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                          Student Name
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                          Class
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                          Group
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                          Subject
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                          Exam
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                          Marks
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                          Grade
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredSavedResults.map((result) => (
                        <tr key={result.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-mono font-semibold">
                            {result.rollNo}
                          </td>
                          <td className="px-6 py-4 font-semibold">
                            {result.studentName}
                          </td>
                          <td className="px-6 py-4">Class {result.class}</td>
                          <td className="px-6 py-4">
                            {result.group ? (
                              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">
                                {result.group}
                              </span>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="px-6 py-4">{result.subjectName}</td>
                          <td className="px-6 py-4 text-sm">{result.exam}</td>
                          <td className="px-6 py-4 font-bold">
                            {result.marks}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-lg font-bold text-sm ${
                                result.grade === "A+"
                                  ? "bg-green-100 text-green-800"
                                  : result.grade === "A"
                                    ? "bg-green-50 text-green-700"
                                    : result.grade === "A-"
                                      ? "bg-blue-100 text-blue-700"
                                      : result.grade === "B"
                                        ? "bg-blue-50 text-blue-600"
                                        : result.grade === "C"
                                          ? "bg-yellow-100 text-yellow-700"
                                          : result.grade === "D"
                                            ? "bg-orange-100 text-orange-700"
                                            : "bg-red-100 text-red-700"
                              }`}
                            >
                              {result.grade}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => deleteResult(result.id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  No Results Found
                </h3>
                <p className="text-gray-600">
                  No saved results match your filter criteria
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
