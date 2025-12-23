import React, { useState } from "react";
import {
  User,
  Users,
  Home,
  Calendar,
  Phone,
  Droplet,
  Book,
  Award,
  UserCheck,
  CheckCircle,
  XCircle,
  Flag,
  Mail,
  Hash,
  IdCard,
  Sigma,
  GraduationCap,
} from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants/constants";
import Swal from "sweetalert2";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    mobile: "",
    email: "",
    fatherName: "",
    motherName: "",
    guardianName: "",
    guardianMobile: "",
    presentAddress: "",
    permanentAddress: "",
    nationality: "",
    dateOfBirth: "",
    maritalStatus: "",
    gender: "",
    bloodGroup: "",
    religion: "",
    academicYear: "",
    course: "",
    honsRollNo: "",
    honsRegNo: "",
    honsPassingYear: "",
    honsObtainedMarks: "",
    honsTotalMarks: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post(
        `${BASE_URL}/api/students/registration/`,
        formData
      );
      if (res.status == 201) {
        setSubmitted(true);
      }
    } catch (error) {
      console.log(error);
      // Other errors
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Try again later",
        confirmButtonColor: "#082567",
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      studentName: "",
      mobile: "",
      email: "",
      fatherName: "",
      motherName: "",
      guardianName: "",
      guardianMobile: "",
      presentAddress: "",
      permanentAddress: "",
      nationality: "",
      dateOfBirth: "",
      maritalStatus: "",
      gender: "",
      bloodGroup: "",
      religion: "",
      academicYear: "",
      course: "",
      honsRollNo: "",
      honsRegNo: "",
      honsPassingYear: "",
      honsObtainedMarks: "",
      honsTotalMarks: "",
    });
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const religions = ["Islam", "Christianity", "Hinduism", "Buddhism", "Other"];
  const genders = ["Male", "Female", "Other"];
  const maritalStatus = ["Married", "Unmarried"];
  const academicYears = ["2025", "2026", "2027", "2028"];
  const classes = ["B Ed"];

  return (
    <div
      style={{ backgroundColor: "#f8fafc" }}
      className="min-h-screen p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-linear-to-r from-primary to-secondary rounded-t-2xl px-6 py-4 p md:px-6 md:py-4 shadow-lg">
          <div className="flex items-center gap-3">
            <UserCheck className="w-6 h-6 text-white" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Student Registration
            </h1>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-b-2xl shadow-lg p-6 md:p-10">
          {submitted ? (
            <div className="bg-green-50 border-2 border-green-500 rounded-xl p-12 text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-green-800 mb-3">
                Registration Successful!
              </h2>
              <p className="text-green-700 text-lg">
                Your registration has been submitted successfull.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Student Name - Full Width */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Student Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required={true}
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter student full name"
                  />
                </div>
              </div>

              {/* Father Name and Mother Name - Side by Side */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mobile <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required={true}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Enter mobile number"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-sm">(optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Father Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required={true}
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Enter father's name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mother Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="motherName"
                      required={true}
                      value={formData.motherName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Enter mother's name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gurdian Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required={true}
                      name="guardianName"
                      value={formData.guardianName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Enter guardian's name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Guardian Mobile No<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="guardianMobile"
                      value={formData.guardianMobile}
                      onChange={handleChange}
                      required={true}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Enter Guardian's mobile number"
                    />
                  </div>
                </div>
              </div>

              {/* Present and Permanent Address - Side by Side */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Present Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      name="presentAddress"
                      value={formData.presentAddress}
                      required={true}
                      onChange={handleChange}
                      rows="4"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      placeholder="Enter present address"
                    ></textarea>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Permanent Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      name="permanentAddress"
                      value={formData.permanentAddress}
                      required={true}
                      onChange={handleChange}
                      rows="4"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      placeholder="Enter permanent address"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Date of Birth, Mobile, Gender - Three Columns */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      required={true}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nationality <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      required={true}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Enter you nationality"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Marital status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    required={true}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">-- Select --</option>
                    {maritalStatus.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    required={true}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">-- Select --</option>
                    {genders.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Blood Group
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <div className="relative">
                    <Droplet className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="">-- Select --</option>
                      {bloodGroups.map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Religion <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="religion"
                      value={formData.religion}
                      onChange={handleChange}
                      required={true}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="">-- Select --</option>
                      {religions.map((religion) => (
                        <option key={religion} value={religion}>
                          {religion}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Blood Group, Religion, Academic Year - Three Columns */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Selct Course <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required={true}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">-- Select --</option>
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Academic Year <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="academicYear"
                      value={formData.academicYear}
                      onChange={handleChange}
                      required={true}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="">-- Select --</option>
                      {academicYears.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Class Code, Section Code, Group Code - Three Columns */}
              <h2 className="mt-8 text-xl font-semibold">
                Honours/ Diploma/ Equivalent information:
              </h2>
              <div className="grid md:grid-cols-3 gap-6 border p-3 rounded-lg border-gray-300 -mt-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Roll No: <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="honsRollNo"
                      value={formData.honsRollNo}
                      onChange={handleChange}
                      required={true}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Enter roll number"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Registration No: <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="honsRegNo"
                      value={formData.honsRegNo}
                      onChange={handleChange}
                      required={true}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Enter registration number"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Passing year: <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="honsPassingYear"
                      value={formData.honsPassingYear}
                      onChange={handleChange}
                      required={true}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Enter your passing year"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Obtained Marks/ GPA: <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="honsObtainedMarks"
                      value={formData.honsObtainedMarks}
                      onChange={handleChange}
                      required={true}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Enter obtained marks / GPA"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Marks/ GPA: <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="honsTotalMarks"
                      value={formData.honsTotalMarks}
                      onChange={handleChange}
                      required={true}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Enter total marks / GPA"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleCancel}
                  className="hover:cursor-pointer flex items-center gap-2 px-8 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: "#082567" }}
                  className="hover:cursor-pointer flex items-center gap-2 px-8 py-3 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
                >
                  <CheckCircle className="w-5 h-5" />
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
