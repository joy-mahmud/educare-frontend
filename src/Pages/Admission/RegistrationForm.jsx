import React, { useState } from 'react';
import { User, Users, Home, Calendar, Phone, Droplet, Book, Award, UserCheck, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants/constants';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        studentName: '',
        fatherName: '',
        motherName: '',
        presentAddress: '',
        permanentAddress: '',
        dateOfBirth: '',
        mobile: '',
        gender: '',
        bloodGroup: '',
        religion: '',
        academicYear: '',
        classCode: '',
        sectionCode: '',
        groupCode: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        event.preventDefault()
        const res = await axios.post(`${BASE_URL}/api/students/registration/`, formData)
        if (res.status == 201) {
            setSubmitted(true)
        }

        // setTimeout(() => {
        //     setSubmitted(false);
        //     setFormData({
        //         studentName: '',
        //         fatherName: '',
        //         motherName: '',
        //         presentAddress: '',
        //         permanentAddress: '',
        //         dateOfBirth: '',
        //         mobile: '',
        //         gender: '',
        //         bloodGroup: '',
        //         religion: '',
        //         academicYear: '',
        //         classCode: '',
        //         sectionCode: '',
        //         groupCode: ''
        //     });
        // }, 3000);
    };

    const handleCancel = () => {
        setFormData({
            studentName: '',
            fatherName: '',
            motherName: '',
            presentAddress: '',
            permanentAddress: '',
            dateOfBirth: '',
            mobile: '',
            gender: '',
            bloodGroup: '',
            religion: '',
            academicYear: '',
            classCode: '',
            sectionCode: '',
            groupCode: ''
        });
    };

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const religions = ['Islam', 'Christianity', 'Hinduism', 'Buddhism', 'Other'];
    const genders = ['Male', 'Female', 'Other'];
    const academicYears = ['2024-2025', '2025-2026', '2026-2027'];
    const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
    const sections = ['Section A', 'Section B', 'Section C', 'Section D'];
    const groups = ['Science', 'Commerce', 'Arts', 'N/A'];

    return (
        <div style={{ backgroundColor: '#f8fafc' }} className="min-h-screen p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-secondary rounded-t-2xl px-6 py-4 p md:px-6 md:py-4 shadow-lg">
                    <div className="flex items-center gap-3">
                        <UserCheck className="w-6 h-6 text-white" />
                        <h1 className="text-2xl md:text-3xl font-bold text-white">Student Registration</h1>
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-b-2xl shadow-lg p-6 md:p-10">
                    {submitted ? (
                        <div className="bg-green-50 border-2 border-green-500 rounded-xl p-12 text-center">
                            <div className="flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mx-auto mb-6">
                                <CheckCircle className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-green-800 mb-3">Registration Successful!</h2>
                            <p className="text-green-700 text-lg">Your registration has been submitted successfull.</p>
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
                                        {genders.map((gender) => (
                                            <option key={gender} value={gender}>{gender}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Blood Group, Religion, Academic Year - Three Columns */}
                            <div className="grid md:grid-cols-3 gap-6">
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
                                                <option key={group} value={group}>{group}</option>
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
                                                <option key={religion} value={religion}>{religion}</option>
                                            ))}
                                        </select>
                                    </div>
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
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Class Code, Section Code, Group Code - Three Columns */}
                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Class Code <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="classCode"
                                        value={formData.classCode}
                                        onChange={handleChange}
                                        required={true}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                    >
                                        <option value="">-- Select --</option>
                                        {classes.map((cls) => (
                                            <option key={cls} value={cls}>{cls}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Section Code
                                        {/* <span className="text-red-500">*</span> */}
                                    </label>
                                    <select
                                        name="sectionCode"

                                        value={formData.sectionCode}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                    >
                                        <option value="">-- Select --</option>
                                        {sections.map((section) => (
                                            <option key={section} value={section}>{section}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Group Code <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="groupCode"
                                        value={formData.groupCode}
                                        onChange={handleChange}
                                        required={true}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                    >
                                        <option value="">-- Select --</option>
                                        {groups.map((group) => (
                                            <option key={group} value={group}>{group}</option>
                                        ))}
                                    </select>
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
                                    type='submit'
                                    style={{ backgroundColor: '#082567' }}
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
}

export default RegistrationForm