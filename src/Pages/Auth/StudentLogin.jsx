import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, LogIn, UserPlus, CheckCircle, GraduationCap, Phone, Calendar, AlertCircle } from 'lucide-react';
import CopyRight from '../../components/common/CopyRight';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants/constants';

export default function StudentLogin() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [loginData, setLoginData] = useState({
        phone: '',
        password: ''
    });

    const [newPasswordData, setNewPasswordData] = useState({

        phone: '',
        password: '',
        confirmPassword: ''
    });

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleResetPasswordChange = (e) => {
        setNewPasswordData({
            ...newPasswordData,
            [e.target.name]: e.target.value
        });
    };

    const handleLoginSubmit = async() => {
        const data = {
            phone:loginData.phone,
            password:loginData.password
        }
        const res= await axios.post(`${BASE_URL}/api/auth/student-login/`,data)
        if(res.status===200){
            setSubmitted(true);
        }
       
        // setTimeout(() => {
        //     setSubmitted(false);
        //     setLoginData({ email: '', password: '' });
        // }, 3000);
    };

    const handlePasswordResetSubmit = async() => {
        const data={
            phone:newPasswordData.phone,
            password:newPasswordData.confirmPassword
        }
        const res = await axios.post(`${BASE_URL}/api/auth/set-password/`,data)
        if(res.status === 201){
            setSubmitted(true);
            setNewPasswordData({
                phone: '',
                password: ''
            })
        }

    };

    return (
        <div style={{ background: '' }} className="mx-20 bg-gray-300 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-3xl">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Left Side - Branding/Info */}
                    {/* <div style={{ background: 'linear-gradient(135deg, #082567 0%, #103B99 100%)' }} className="p-8 md:p-12 text-white flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>

                        <div className="relative z-10 text-center">
                            <div className="flex items-center justify-center gap-3 mb-8">
                                <GraduationCap className="w-16 h-16" />
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-4">EduCare</h1>

                            <p className="text-blue-100 text-base md:text-lg">
                                Your Gateway to Excellence
                            </p>
                        </div>
                    </div> */}

                    {/* Right Side - Login/Register Form */}
                    <div className="p-8 md:p-12 ">
                        {submitted ? (
                            <div className="text-center py-12">
                                <div className="flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mx-auto mb-6">
                                    <CheckCircle className="w-12 h-12 text-white" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                                    {isLogin ? 'Login Successful!' : 'new password set successfully'}
                                </h2>
                                <p className="text-gray-600">
                                    {isLogin
                                        ? 'Welcome back! Redirecting to dashboard...'
                                        : 'You have set a new password, you can now login with this phone number and password'}
                                </p>

                                <button onClick={()=>{
                                    setIsLogin(true)
                                    setSubmitted(false)
                                    }} className='rounded-lg bg-green-500 px-2 py-1 text-white text-xl font-medium mt-10 hover:cursor-pointer'>OK</button>
                            </div>
                        ) : (
                            <>
                                {/* Tab Switcher */}
                                <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-lg">
                                    <button
                                        onClick={() => setIsLogin(true)}
                                        style={{
                                            backgroundColor: isLogin ? '#082567' : 'transparent',
                                            color: isLogin ? 'white' : '#4b5563'
                                        }}
                                        className="flex-1 py-3 rounded-md font-semibold transition-all hover:cursor-pointer"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => setIsLogin(false)}
                                        style={{
                                            backgroundColor: !isLogin ? '#082567' : 'transparent',
                                            color: !isLogin ? 'white' : '#4b5563'
                                        }}
                                        className="flex-1 py-3 rounded-md font-semibold transition-all hover:cursor-pointer"
                                    >
                                        Set New Password
                                    </button>
                                </div>

                                {/* Login Form */}
                                {isLogin ? (
                                    <div className="space-y-5">
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
                                            <p className="text-gray-600 text-sm">Please login to your account</p>
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={loginData.phone}
                                                    onChange={handleLoginChange}
                                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                                    placeholder="Enter your phone number"
                                                />
                                            </div>
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    value={loginData.password}
                                                    onChange={handleLoginChange}
                                                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                                    placeholder="Enter your password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Remember Me & Forgot Password */}
                                        <div className="flex items-center justify-between">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" className="w-4 h-4 rounded" />
                                                <span className="text-sm text-gray-600">Remember me</span>
                                            </label>
                                            <button className="text-sm font-semibold hover:underline" style={{ color: '#082567' }}>
                                                Forgot Password?
                                            </button>
                                        </div>

                                        {/* Login Button */}
                                        <button
                                            onClick={handleLoginSubmit}
                                            style={{ backgroundColor: '#082567' }}
                                            className="w-full py-3 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                                        >
                                            <LogIn className="w-5 h-5" />
                                            Login
                                        </button>

                                        {/* Divider */}
                                        <div className="relative my-6">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-300"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-4 bg-white text-gray-500">Or continue with</span>
                                            </div>
                                        </div>

                                        {/* Social Login */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <button className="flex items-center justify-center gap-2 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                                <div className="w-5 h-5 bg-blue-600 rounded"></div>
                                                <span className="text-sm font-semibold text-gray-700">Google</span>
                                            </button>
                                            <button className="flex items-center justify-center gap-2 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                                <div className="w-5 h-5 bg-blue-800 rounded"></div>
                                                <span className="text-sm font-semibold text-gray-700">Facebook</span>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    /* Register Form */
                                    <div className="space-y-5">
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Set a new password</h2>
                                            <p className="text-gray-600 text-sm">If you didn't set a password yet you can set it from here.</p>
                                        </div>

                                        {/* Phone and Date of Birth - Side by Side */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Phone
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={newPasswordData.phone}
                                                    onChange={handleResetPasswordChange}
                                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                                    placeholder="Phone number"
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                Please enter the phone number which you have used for registration.
                                            </p>
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    value={newPasswordData.password}
                                                    onChange={handleResetPasswordChange}
                                                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                                    placeholder="Create a password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Confirm Password */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Confirm Password
                                            </label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    name="confirmPassword"
                                                    value={newPasswordData.confirmPassword}
                                                    onChange={handleResetPasswordChange}
                                                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                                    placeholder="Confirm your password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Register Button */}
                                        <button
                                            onClick={handlePasswordResetSubmit}
                                            style={{ backgroundColor: '#082567' }}
                                            className="w-full py-3 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2 hover:cursor-pointer"
                                        >
                                            <UserPlus className="w-5 h-5" />
                                            Set Password
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <CopyRight textColor={'text-primary'} />
                </div>
            </div>
        </div>
    );
}