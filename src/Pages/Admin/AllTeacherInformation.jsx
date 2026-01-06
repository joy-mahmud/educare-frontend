import React, { useEffect, useState } from "react";
import {
  Users,
  Search,
  Eye,
  X,
  User,
  Phone,
  BookOpen,
  Calendar,
  Shield,
  ChevronLeft,
  ChevronRight,
  Hash,
  Copy,
  Check,
} from "lucide-react";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { BASE_URL } from "../../utils/constants/constants";

export default function AllTeacherInformation() {
  const axiosInstance = useAxiosInstance();
  const [searchTerm, setSearchTerm] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("all");
  const [copiedId, setCopiedId] = useState(null);
  const [totalCount, setTotalCount] = useState(0); // from API
  const [totalPages, setTotalPages] = useState(0); // derived
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const teachersPerPage = 5;
  const start = (currentPage - 1) * teachersPerPage + 1;
  const end = Math.min(currentPage * teachersPerPage, totalCount);

  // Sample teacher data - Replace with API call

  const roleColors = {
    teacher: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
    },
    admin: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      border: "border-purple-200",
    },
    staff: {
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200",
    },
  };

  const filteredTeachers = teachers
    .filter((teacher) => roleFilter === "all" || teacher.role === roleFilter)
    .filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.phone.includes(searchTerm) ||
        teacher.teacherId.includes(searchTerm) ||
        (teacher.subject &&
          teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  // Pagination calculations
  // const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);
  // const indexOfLastTeacher = currentPage * teachersPerPage;
  // const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  // const currentTeachers = filteredTeachers.slice(
  //   indexOfFirstTeacher,
  //   indexOfLastTeacher
  // );

  const fetchAllTeachers = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.get(
        `${BASE_URL}/api/teacher/all-teachers-info/?page=${page}`
      );

      setTeachers(res.data.results);
      setTotalCount(res.data.count);

      const pages = Math.ceil(res.data.count / teachersPerPage);
      setTotalPages(pages);
    } catch (err) {
      console.log(err);
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllTeachers(currentPage);
  }, [currentPage]);

  // Pagination calculations
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchAllTeachers(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openModal = (teacher) => {
    setSelectedTeacher(teacher);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTeacher(null);
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

  const copyToClipboard = (teacherId) => {
    navigator.clipboard.writeText(teacherId);
    setCopiedId(teacherId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const teacherCount = filteredTeachers.filter(
    (t) => t.role === "teacher"
  ).length;
  const adminCount = filteredTeachers.filter((t) => t.role === "admin").length;
  const staffCount = filteredTeachers.filter((t) => t.role === "staff").length;

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
                Teacher List
              </h1>
            </div>
            <p className="text-blue-100 text-xs md:text-sm">
              Manage and view all registered teachers and staff
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600">Total</span>
              <Users className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{totalCount}</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600">Teachers</span>
              <BookOpen className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{teacherCount}</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600">Admins</span>
              <Shield className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-purple-600">{adminCount}</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600">Staff</span>
              <User className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-600">{staffCount}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg p-4 shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, phone, teacher ID, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
            </div>

            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="pl-9 pr-8 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors appearance-none bg-white text-sm"
              >
                <option value="all">All Roles</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </select>
            </div>
          </div>
        </div>

        {/* Teacher Table - Desktop */}
        <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: "#082567" }}>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Teacher ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Subject
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTeachers.map((teacher) => {
                  const roleColor = roleColors[teacher.role];
                  return (
                    <tr
                      key={teacher.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4 text-gray-400" />
                          <span className="font-mono font-semibold text-gray-800">
                            {teacher.teacherId}
                          </span>
                          <button
                            onClick={() => copyToClipboard(teacher.teacherId)}
                            className="ml-1 p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Copy Teacher ID"
                          >
                            {copiedId === teacher.teacherId ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: "#082567" }}
                          >
                            {teacher.name.charAt(0)}
                          </div>
                          <span className="font-semibold text-gray-800">
                            {teacher.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{teacher.phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700">
                          {teacher.subject || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 ${roleColor.bg} ${roleColor.text} rounded-full text-xs font-semibold capitalize border ${roleColor.border}`}
                        >
                          {teacher.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => openModal(teacher)}
                          style={{ backgroundColor: "#082567" }}
                          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105 text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Desktop Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {start} to {end} of {totalCount} teachers
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

        {/* Teacher Cards - Mobile */}
        <div className="block md:hidden space-y-4">
          {filteredTeachers.map((teacher) => {
            const roleColor = roleColors[teacher.role];
            return (
              <div
                key={teacher.id}
                className="bg-white rounded-xl shadow-md p-5"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: "#082567" }}
                  >
                    {teacher.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg mb-1">
                      {teacher.name}
                    </h3>
                    <span
                      className={`inline-block px-2 py-1 ${roleColor.bg} ${roleColor.text} rounded-full text-xs font-semibold capitalize`}
                    >
                      {teacher.role}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Hash className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">ID:</span>
                    <span className="font-mono font-semibold text-gray-800">
                      {teacher.teacherId}
                    </span>
                    <button
                      onClick={() => copyToClipboard(teacher.teacherId)}
                      className="ml-1 p-1 hover:bg-gray-100 rounded transition-colors"
                      title="Copy Teacher ID"
                    >
                      {copiedId === teacher.teacherId ? (
                        <Check className="w-3 h-3 text-green-500" />
                      ) : (
                        <Copy className="w-3 h-3 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{teacher.phone}</span>
                  </div>
                  {teacher.subject && (
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{teacher.subject}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => openModal(teacher)}
                  style={{ backgroundColor: "#082567" }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            );
          })}

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
        {filteredTeachers.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No Teachers Found
            </h3>
            <p className="text-gray-600">
              No teachers match your search criteria.
            </p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {modalOpen && selectedTeacher && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
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
                  {selectedTeacher.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedTeacher.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        roleColors[selectedTeacher.role].bg
                      } ${roleColors[selectedTeacher.role].text}`}
                    >
                      {selectedTeacher.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Identification */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Hash className="w-5 h-5" style={{ color: "#082567" }} />
                  <h3 className="text-xl font-bold text-gray-800">
                    Identification
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Teacher ID</p>
                    <div className="flex items-center gap-2">
                      <p className="font-mono font-bold text-gray-800 text-lg">
                        {selectedTeacher.teacherId}
                      </p>
                      <button
                        onClick={() =>
                          copyToClipboard(selectedTeacher.teacherId)
                        }
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                        title="Copy Teacher ID"
                      >
                        {copiedId === selectedTeacher.teacherId ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Full Name</p>
                    <p className="font-semibold text-gray-800">
                      {selectedTeacher.name}
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
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                  <p className="font-semibold text-gray-800">
                    {selectedTeacher.phone}
                  </p>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5" style={{ color: "#082567" }} />
                  <h3 className="text-xl font-bold text-gray-800">
                    Professional Information
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Role</p>
                    <p className="font-semibold text-gray-800 capitalize">
                      {selectedTeacher.role}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Subject</p>
                    <p className="font-semibold text-gray-800">
                      {selectedTeacher.subject || "Not Assigned"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5" style={{ color: "#082567" }} />
                  <h3 className="text-xl font-bold text-gray-800">
                    Personal Information
                  </h3>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Date of Birth</p>
                  <p className="font-semibold text-gray-800">
                    {selectedTeacher.dateOfBirth
                      ? formatDate(selectedTeacher.dateOfBirth)
                      : "Not Provided"}
                  </p>
                </div>
              </div>

              {/* Registration Date */}
              <div
                className="bg-blue-50 p-4 rounded-lg border-l-4"
                style={{ borderColor: "#082567" }}
              >
                <p className="text-sm text-gray-600 mb-1">Registration Date</p>
                <p className="font-semibold text-gray-800">
                  {formatDate(selectedTeacher.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
