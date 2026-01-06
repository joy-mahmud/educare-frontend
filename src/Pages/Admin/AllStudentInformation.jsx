import React, { useEffect, useState } from "react";
import {
  Users,
  Search,
  Eye,
  X,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Heart,
  BookOpen,
  Award,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BASE_URL } from "../../utils/constants/constants";
import useAxiosInstance from "../../hooks/useAxiosInstance";

export default function AllStudentInformation() {
  const axiosInstance = useAxiosInstance();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState([]); // current page students

  const [totalCount, setTotalCount] = useState(0); // from API
  const [totalPages, setTotalPages] = useState(0); // derived
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const studentsPerPage = 10;
  const start = (currentPage - 1) * studentsPerPage + 1;
  const end = Math.min(currentPage * studentsPerPage, totalCount);

  const filteredStudents = students.filter(
    (student) =>
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.mobile.includes(searchTerm) ||
      student.academicYear.includes(searchTerm)
  );

  const fetchStudents = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.get(
        `${BASE_URL}/api/students/all-student-info/?page=${page}`
      );

      setStudents(res.data.results);
      setTotalCount(res.data.count);

      const pages = Math.ceil(res.data.count / studentsPerPage);
      setTotalPages(pages);
    } catch (err) {
      console.log(err);
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  // Pagination calculations
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchStudents(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const openModal = (student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setModalOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (error) {
    return <h1>{error}</h1>;
  }

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
              <Users className="w-6 h-6 text-white" />
              <h1 className="text-xl md:text-2xl font-bold text-white">
                Student List
              </h1>
            </div>
            <p className="text-blue-100 text-xs md:text-sm">
              Manage and view all registered students
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Students</span>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{totalCount}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Academic Year</span>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-800">2024-2025</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Active Courses</span>
              <BookOpen className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-800">1</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg p-4 shadow-md mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by student name, father name, mobile, or academic year..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-sm"
            />
          </div>
        </div>

        {/* Student Table - Desktop */}
        <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: "#082567" }}>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Student Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Father Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Mobile
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Academic Year
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
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
                      <span className="text-gray-700">
                        {student.fatherName}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{student.mobile}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
                        {student.academicYear}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openModal(student)}
                        style={{ backgroundColor: "#082567" }}
                        className="flex items-center gap-2 px-4 py-2 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
                      >
                        <Eye className="w-4 h-4" />
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <p>
                  Showing {start} to {end} of {totalCount} students
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    style={{
                      backgroundColor:
                        currentPage === index + 1 ? "#082567" : "white",
                      color: currentPage === index + 1 ? "white" : "#4b5563",
                    }}
                    className="px-4 py-1 rounded-lg border-2 border-gray-300 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Student Cards - Mobile */}
        <div className="block md:hidden space-y-4">
          {filteredStudents.map((student) => (
            <div key={student.id} className="bg-white rounded-xl shadow-md p-5">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: "#082567" }}
                >
                  {student.studentName.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg mb-1">
                    {student.studentName}
                  </h3>
                  <p className="text-sm text-gray-600">{student.fatherName}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{student.mobile}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                    {student.academicYear}
                  </span>
                </div>
              </div>

              <button
                onClick={() => openModal(student)}
                style={{ backgroundColor: "#082567" }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
            </div>
          ))}

          {/* Mobile Pagination */}
          {totalPages > 1 && (
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="text-sm text-gray-600 text-center mb-3">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-sm font-semibold">Previous</span>
                </button>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  <span className="text-sm font-semibold">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No Students Found
            </h3>
            <p className="text-gray-600">
              No students match your search criteria.
            </p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {modalOpen && selectedStudent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                background: "linear-gradient(135deg, #082567 0%, #103B99 100%)",
              }}
              className="p-6 rounded-t-2xl relative"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl bg-white bg-opacity-20">
                  {selectedStudent.studentName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedStudent.studentName}
                  </h2>
                  <p className="text-blue-100">{selectedStudent.course}</p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5" style={{ color: "#082567" }} />
                  <h3 className="text-xl font-bold text-gray-800">
                    Personal Information
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Student Name</p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.studentName}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Date of Birth</p>
                    <p className="font-semibold text-gray-800">
                      {formatDate(selectedStudent.dateOfBirth)}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Gender</p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.gender}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Blood Group</p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.bloodGroup}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Religion</p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.religion}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Nationality</p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.nationality}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Marital Status</p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.maritalStatus}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="w-5 h-5" style={{ color: "#082567" }} />
                  <h3 className="text-xl font-bold text-gray-800">
                    Contact Information
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Mobile</p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.mobile}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.email || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Family Information */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-5 h-5" style={{ color: "#082567" }} />
                  <h3 className="text-xl font-bold text-gray-800">
                    Family Information
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Father's Name</p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.fatherName}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Mother's Name</p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.motherName}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Guardian Name</p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.guardianName || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">
                      Guardian Mobile
                    </p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.guardianMobile || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5" style={{ color: "#082567" }} />
                  <h3 className="text-xl font-bold text-gray-800">
                    Address Information
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">
                      Present Address
                    </p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.presentAddress}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">
                      Permanent Address
                    </p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.permanentAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5" style={{ color: "#082567" }} />
                  <h3 className="text-xl font-bold text-gray-800">
                    Academic Information
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Academic Year</p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.academicYear}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Course</p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.course || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5" style={{ color: "#082567" }} />
                  <h3 className="text-xl font-bold text-gray-800">
                    Honours/ Diploma/ Equivalent information:
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Roll No</p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.honsRollNo || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">
                      Registration No
                    </p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.honsRegNo || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Passing Year</p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.honsPassingYear || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Marks</p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.honsObtainedMarks || "N/A"} /{" "}
                      {selectedStudent.honsTotalMarks || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Registration Date */}
              <div
                className="bg-blue-50 p-4 rounded-lg border-l-4"
                style={{ borderColor: "#082567" }}
              >
                <p className="text-sm text-gray-600 mb-1">Registration Date</p>
                <p className="font-semibold text-gray-800">
                  {formatDate(selectedStudent.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
