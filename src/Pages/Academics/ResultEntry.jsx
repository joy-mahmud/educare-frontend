import React, { useState } from "react";
import {
  BookOpen,
  Users,
  Save,
  CheckCircle,
  Award,
  Filter,
} from "lucide-react";

export default function ResultEntrySystem() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [results, setResults] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Master Data - Bangladesh National Curriculum (Class 6-10)
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

  // Bangladesh National Curriculum Subjects
  const subjects = {
    compulsory: [
      { id: 1, name: "Bangla", type: "COMPULSORY" },
      { id: 2, name: "English", type: "COMPULSORY" },
      { id: 3, name: "Mathematics", type: "COMPULSORY" },
      { id: 4, name: "Bangladesh and Global Studies", type: "COMPULSORY" },
      {
        id: 5,
        name: "Religion (Islam/Hindu/Christian/Buddhist)",
        type: "COMPULSORY",
      },
      {
        id: 6,
        name: "ICT (Information and Communication Technology)",
        type: "COMPULSORY",
      },
      { id: 7, name: "Physical Education", type: "COMPULSORY" },
      { id: 8, name: "Arts and Crafts", type: "COMPULSORY" },
    ],
    science: [
      { id: 9, name: "Physics", type: "GROUP_COMPULSORY", group: "Science" },
      { id: 10, name: "Chemistry", type: "GROUP_COMPULSORY", group: "Science" },
      { id: 11, name: "Biology", type: "GROUP_COMPULSORY", group: "Science" },
      {
        id: 12,
        name: "Higher Mathematics",
        type: "GROUP_COMPULSORY",
        group: "Science",
      },
    ],
    commerce: [
      {
        id: 13,
        name: "Accounting",
        type: "GROUP_COMPULSORY",
        group: "Commerce",
      },
      {
        id: 14,
        name: "Business Entrepreneurship",
        type: "GROUP_COMPULSORY",
        group: "Commerce",
      },
      {
        id: 15,
        name: "Finance and Banking",
        type: "GROUP_COMPULSORY",
        group: "Commerce",
      },
    ],
    arts: [
      { id: 16, name: "History", type: "GROUP_COMPULSORY", group: "Arts" },
      { id: 17, name: "Geography", type: "GROUP_COMPULSORY", group: "Arts" },
      { id: 18, name: "Civics", type: "GROUP_COMPULSORY", group: "Arts" },
      { id: 19, name: "Economics", type: "GROUP_COMPULSORY", group: "Arts" },
    ],
    elective: [
      { id: 20, name: "Agriculture Studies", type: "ELECTIVE" },
      { id: 21, name: "Home Science", type: "ELECTIVE" },
      { id: 22, name: "Music", type: "ELECTIVE" },
      { id: 23, name: "Arabic", type: "ELECTIVE" },
      { id: 24, name: "Sanskrit", type: "ELECTIVE" },
    ],
  };

  const allSubjects = [
    ...subjects.compulsory,
    ...subjects.science,
    ...subjects.commerce,
    ...subjects.arts,
    ...subjects.elective,
  ];

  const exams = [
    { id: 1, name: "First Terminal Exam" },
    { id: 2, name: "Half Yearly Exam" },
    { id: 3, name: "Second Terminal Exam" },
    { id: 4, name: "Annual Exam" },
    { id: 5, name: "Pre-Test Exam" },
    { id: 6, name: "Test Exam" },
  ];

  // Sample students - Replace with API call
  const students = [
    {
      id: 1,
      name: "Aisha Rahman",
      rollNo: "001",
      class: "9",
      group: "Science",
    },
    {
      id: 2,
      name: "Mahmud Hasan",
      rollNo: "002",
      class: "9",
      group: "Science",
    },
    {
      id: 3,
      name: "Fatima Begum",
      rollNo: "003",
      class: "9",
      group: "Commerce",
    },
    { id: 4, name: "Karim Ahmed", rollNo: "004", class: "9", group: "Science" },
    { id: 5, name: "Nusrat Jahan", rollNo: "005", class: "9", group: "Arts" },
    { id: 6, name: "Rafiq Islam", rollNo: "006", class: "9", group: "Science" },
    {
      id: 7,
      name: "Sadia Akter",
      rollNo: "007",
      class: "9",
      group: "Commerce",
    },
  ];

  const filteredStudents = students.filter((s) =>
    selectedClass ? s.class === selectedClass : true
  );

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

  const handleSubmit = async () => {
    if (!selectedClass || !selectedSubject || !selectedExam) {
      alert("Please select class, subject, and exam");
      return;
    }

    // Prepare data for API
    const resultsData = Object.entries(results).map(([studentId, data]) => ({
      student_id: parseInt(studentId),
      subject_id: parseInt(selectedSubject),
      exam: selectedExam,
      marks_obtained: data.marks,
      grade: data.grade,
    }));

    try {
      // Replace with actual API call
      const response = await fetch("YOUR_API_ENDPOINT/student-results/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ results: resultsData }),
      });

      console.log("Submitting results:", resultsData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setResults({});
      }, 3000);
    } catch (error) {
      console.error("Error submitting results:", error);
    }
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
                Student Result Entry System
              </h1>
            </div>
            <p className="text-blue-100 text-xs md:text-sm">
              Enter marks for students - Bangladesh National Curriculum
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5" style={{ color: "#082567" }} />
            <h2 className="text-lg font-bold text-gray-800">
              Selection Criteria
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Class Selection */}
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
                  <option key={cls.id} value={cls.name}>
                    Class {cls.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Selection */}
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
                <optgroup label="Elective Subjects">
                  {subjects.elective.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Exam Selection */}
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
                  allSubjects.find((s) => s.id === parseInt(selectedSubject))
                    ?.name
                }{" "}
                - {selectedExam}
              </p>
            </div>
          )}
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 mb-6 text-center">
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
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-white" />
                <h2 className="text-lg font-bold text-white">
                  Students - Class {selectedClass} ({filteredStudents.length}{" "}
                  students)
                </h2>
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
                  {filteredStudents.map((student) => {
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
                              {student.name.charAt(0)}
                            </div>
                            <span className="font-semibold text-gray-800">
                              {student.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                            {student.group}
                          </span>
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

            {/* Submit Button */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <p>
                    Total Students:{" "}
                    <span className="font-semibold">
                      {filteredStudents.length}
                    </span>
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

        {/* Initial State */}
        {!selectedClass && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Select Class, Subject & Exam
            </h3>
            <p className="text-gray-600">
              Choose the class, subject, and exam type to start entering marks
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
