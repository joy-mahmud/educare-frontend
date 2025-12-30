import React, { useState } from 'react';
import { UserPlus, User, Phone, BookOpen, Calendar, Shield, CheckCircle, XCircle } from 'lucide-react';
import useAxiosInstance from '../../hooks/useAxiosInstance';
import { BASE_URL } from '../../utils/constants/constants';

export default function CreateTeacherForm() {
    const axiosInstance =useAxiosInstance()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    role: 'teacher',
    dateOfBirth: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [teacherId,setTeacherId] = useState(null)

  const roleChoices = [
    { value: 'teacher', label: 'Teacher' },
    { value: 'admin', label: 'Admin' },
    { value: 'staff', label: 'Staff' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9-+().\s]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async() => {
    if (validateForm()) {
        const data = formData
        const res = await axiosInstance.post(`${BASE_URL}/api/teacher/create-teacher/`,data)
        if(res.status===201){
            setTeacherId(res.data.data.teacherId)
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                // Reset form
                setFormData({
                name: '',
                phone: '',
                subject: '',
                role: 'teacher',
                dateOfBirth: ''
                });
            }, 3000);
        }
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      subject: '',
      role: 'teacher',
      dateOfBirth: ''
    });
    setErrors({});
  };

  return (
    <div style={{ backgroundColor: '#f8fafc' }} className="overflow-y-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #082567 0%, #103B99 100%)' }} className="rounded-xl p-4 md:p-6 shadow-lg mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full -mr-24 -mt-24"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mb-16"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <UserPlus className="w-6 h-6 text-white" />
              <h1 className="text-xl md:text-2xl font-bold text-white">Add New Teacher</h1>
            </div>
            <p className="text-blue-100 text-xs md:text-sm">
              Fill in the details to register a new teacher
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-5">
          {submitted ? (
            <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 md:p-12 text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-3">Teacher Added Successfully!</h2>
              <p className="text-green-700 text-base md:text-lg mb-4">
                The teacher has been registered in the system.
              </p>
              <div className="bg-white rounded-lg p-4 inline-block">
                <p className="text-sm text-gray-600 mb-1">Teacher ID will be generated automatically</p>
                <p className="text-xs text-gray-500">{teacherId}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Info Banner */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Note</p>
                    <p>A unique 8-digit Teacher ID will be automatically generated upon registration.</p>
                  </div>
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Teacher Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="Enter teacher's full name"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="Enter phone number (e.g., 01712-345678)"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter subject (e.g., Mathematics, Physics)"
                  />
                </div>
              </div>

              {/* Role Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors appearance-none bg-white ${
                      errors.role ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                  >
                    {roleChoices.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    {errors.role}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Select the role for this person in the institution
                </p>
              </div>

              {/* Date of Birth Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Form Summary */}
              {formData.name && (
                <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3 text-sm">Form Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-semibold text-gray-800">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-semibold text-gray-800">{formData.phone || 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subject:</span>
                      <span className="font-semibold text-gray-800">{formData.subject || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Role:</span>
                      <span className="font-semibold text-gray-800 capitalize">{formData.role}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleReset}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                  Reset Form
                </button>
                <button
                  onClick={handleSubmit}
                  style={{ backgroundColor: '#082567' }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
                >
                  <CheckCircle className="w-5 h-5" />
                  Add Teacher
                </button>
              </div>

              {/* Required Fields Note */}
              <p className="text-xs text-gray-500 text-center">
                <span className="text-red-500">*</span> Required fields must be filled
              </p>
            </div>
          )}
        </div>

        {/* Additional Info Card */}
        {!submitted && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-gray-800 mb-2 text-sm">Teacher ID Information</h3>
            <p className="text-xs text-gray-600">
              The system will automatically generate a unique 8-digit Teacher ID upon successful registration. 
              This ID will be used for identification and login purposes throughout the system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}