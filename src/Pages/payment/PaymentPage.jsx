import React, { useState } from 'react';
import { CreditCard, Smartphone, CheckCircle, Copy, ArrowRight, AlertCircle, Info } from 'lucide-react';
import bkash from '../../assets/payment-gateway-logos/bakash.png'
import nagad from '../../assets/payment-gateway-logos/nagad-Logo.webp'
import rocket from '../../assets/payment-gateway-logos/rocket-logo.png'
import axios from 'axios';
import { BASE_URL } from '../../utils/constants/constants';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function PaymentPage() {
    const [selectedMethod, setSelectedMethod] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [amount, setAmount] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    // const [sendMoneyPhoneNumber, setSendMoneyPhoneNumber] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [copied, setCopied] = useState(false);

    const paymentMethods = [
        {
            id: 'bkash',
            name: 'bKash',
            number: '01712-345678',
            color: '#E2136E',
            logo: bkash,
            type: 'Personal'
        },
        {
            id: 'nagad',
            name: 'Nagad',
            number: '01812-345678',
            color: '#F15D22',
            logo: nagad,
            type: 'Personal'
        },
        {
            id: 'rocket',
            name: 'Rocket',
            number: '01912-345678',
            color: '#8B3A8F',
            logo: rocket,
            type: 'Personal'
        }
    ];

    const selectedPayment = paymentMethods.find(m => m.id === selectedMethod);

    const handleCopyNumber = () => {
        if (selectedPayment) {
            navigator.clipboard.writeText(selectedPayment.number);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };
    const handleSubmit = async () => {
        const data = {
            phoneNumber: phoneNumber,
            amount: amount,
            transactionId: transactionId,
            paymentMethod: selectedMethod,
            status: 'pending'
        };

        try {
            const res = await axios.post(`${BASE_URL}/api/payment/create/`, data);
            if (res.status === 201) {
                setSubmitted(true);
                setSelectedMethod('');
                setAmount('');
            }

        }
        catch (err) {

            // Handle backend 404
            if (err.response && err.response.status === 404) {
                Swal.fire({
                    icon: "error",
                    title: "You are not registered with this number",
                    text: "Please enter the number which you used for registration",
                    confirmButtonColor: "#082567"
                });
            }
            else {
                // Other errors
                Swal.fire({
                    icon: "error",
                    title: "Something went wrong",
                    text: "Try again later",
                    confirmButtonColor: "#082567"
                });
            }
        }
    };



    return (
        <div style={{ backgroundColor: '#f8fafc' }} className="min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div style={{ background: 'linear-gradient(135deg, #082567 0%, #103B99 100%)' }} className="rounded-t-2xl p-6 md:p-8 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full -mr-24 -mt-24"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mb-16"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <CreditCard className="w-8 h-8 text-white" />
                            <h1 className="text-2xl md:text-4xl font-bold text-white">Payment Gateway</h1>
                        </div>
                        <p className="text-blue-100 text-sm md:text-base">
                            Complete your payment using mobile banking services
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-b-2xl shadow-lg p-6 md:p-10">
                    {submitted ? (
                        <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 md:p-12 text-center">
                            <div className="flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mx-auto mb-6">
                                <CheckCircle className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-3">Payment Submitted!</h2>
                            <p className="text-green-700 text-base md:text-lg mb-4">
                                Your transaction has been received successfully.
                            </p>
                            <div className="bg-white rounded-lg p-4 inline-block">
                                <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
                                <p className="text-xl font-bold text-gray-800">{transactionId}</p>
                            </div>
                            <p className="text-green-600 text-sm mt-4">
                                We will verify your payment within 24 hours and send you a confirmation.
                            </p>

                            <button className='bg-green-600 mt-12 text-white rounded-lg px-3 py-2 text-xl font-medium'>
                                <Link to={'/'}>Ok</Link>
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* Amount Input */}
                            <div className=''>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Enter your phone number: <span className="text-red-500">*</span>
                                </label>

                                <div className="relative mb-2">
                                    <input
                                        type="text"
                                        value={phoneNumber}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^[0-9]*$/.test(value)) {
                                                setPhoneNumber(value);
                                            }
                                        }}
                                        className="w-full pl-5 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-lg font-semibold"
                                        placeholder="Enter your phone number"
                                    />
                                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        Please enter the phone number which you have used for registration.
                                    </p>
                                </div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Payment Amount <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold text-lg">৳</span>
                                    <input
                                        type="text"
                                        value={amount}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^[0-9]*$/.test(value)) {
                                                setAmount(value);
                                            }
                                        }}
                                        className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-lg font-semibold"
                                        placeholder="Enter phone number which you used for registration"
                                    />
                                </div>
                            </div>

                            {/* Payment Method Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Select Payment Method <span className="text-red-500">*</span>
                                </label>
                                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                    {paymentMethods.map((method) => (
                                        <button
                                            key={method.id}
                                            onClick={() => setSelectedMethod(method.id)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all hover:scale-105 ${selectedMethod === method.id
                                                ? 'border-blue-500 shadow-lg'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div
                                                style={{ backgroundColor: method.color }}
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                                            >
                                                <img className='w-10 h-10 rounded-full' src={method.logo}></img>

                                            </div>
                                            <div className="text-left">
                                                <h3 className="font-bold text-gray-800 text-sm">{method.name}</h3>
                                                <p className="text-xs text-gray-500">{method.type}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Instructions - Shows after method selection */}
                            {selectedMethod && (
                                <div className="space-y-6 animate-fadeIn">
                                    {/* Info Alert */}
                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                        <div className="flex gap-3">
                                            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                            <div className="text-sm text-blue-800">
                                                <p className="font-semibold mb-1">Payment Instructions</p>
                                                <p>Please follow the steps below to complete your payment using {selectedPayment.name}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Number Card */}
                                    <div style={{ borderColor: selectedPayment.color }} className="border-2 rounded-xl p-6 bg-gradient-to-br from-gray-50 to-white">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    style={{ backgroundColor: selectedPayment.color }}
                                                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                                                >
                                                    <img className='w-12 h-12 rounded-full' src={selectedPayment.logo}></img>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800 text-lg">{selectedPayment.name}</h3>
                                                    <p className="text-xs text-gray-500">{selectedPayment.type} Account</p>
                                                </div>
                                            </div>
                                            <Smartphone className="w-8 h-8 text-gray-400" />
                                        </div>

                                        <div className="bg-white rounded-lg p-4 border-2 border-dashed border-gray-300">
                                            <p className="text-xs text-gray-500 mb-1">Send Money To</p>
                                            <div className="flex items-center justify-between">
                                                <p className="text-2xl md:text-3xl font-bold text-gray-800 tracking-wider">
                                                    {selectedPayment.number}
                                                </p>
                                                <button
                                                    onClick={handleCopyNumber}
                                                    className="ml-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                    title="Copy number"
                                                >
                                                    {copied ? (
                                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                                    ) : (
                                                        <Copy className="w-5 h-5 text-gray-500" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Step by Step Instructions */}
                                        <div className="mt-6 space-y-3">
                                            <div className="flex gap-3">
                                                <div style={{ backgroundColor: selectedPayment.color }} className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                                    1
                                                </div>
                                                <p className="text-sm text-gray-700">Open your {selectedPayment.name} app and select "Send Money"</p>
                                            </div>
                                            <div className="flex gap-3">
                                                <div style={{ backgroundColor: selectedPayment.color }} className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                                    2
                                                </div>
                                                <p className="text-sm text-gray-700">Enter the number: <span className="font-semibold">{selectedPayment.number}</span></p>
                                            </div>
                                            <div className="flex gap-3">
                                                <div style={{ backgroundColor: selectedPayment.color }} className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                                    3
                                                </div>
                                                <p className="text-sm text-gray-700">Enter amount: <span className="font-semibold">৳{amount || '0'}</span> and complete the transaction</p>
                                            </div>
                                            <div className="flex gap-3">
                                                <div style={{ backgroundColor: selectedPayment.color }} className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                                    4
                                                </div>
                                                <p className="text-sm text-gray-700">Copy the Transaction ID and paste it below</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Transaction ID Input */}
                                    {/* <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Enter the number which you have sent money: <span className="text-red-500">*</span>
                                    </label>

                                    <div className="relative mb-2">
                                        <input
                                            type="text"
                                            value={sendMoneyPhoneNumber}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^[0-9]*$/.test(value)) {
                                                    setSendMoneyPhoneNumber(value);
                                                }
                                            }}
                                            className="w-full pl-5 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-lg"
                                            placeholder="Enter the number which you have sent money"
                                        />
                                        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            Please enter the phone number from which yoh have sent money.
                                        </p>
                                    </div> */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Transaction ID / TrxID <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={transactionId}
                                                onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
                                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-lg"
                                                placeholder="Enter your transaction ID (e.g., 8G7H6J5K4L)"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            You will find the Transaction ID in your {selectedPayment.name} transaction history or SMS
                                        </p>
                                    </div>

                                    {/* Important Notice */}
                                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                                        <div className="flex gap-3">
                                            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                            <div className="text-sm text-yellow-800">
                                                <p className="font-semibold mb-1">Important Notice</p>
                                                <ul className="list-disc list-inside space-y-1 text-xs">
                                                    <li>Please ensure you enter the correct Transaction ID</li>
                                                    <li>Keep your transaction receipt for future reference</li>
                                                    <li>Payment verification may take up to 24 hours</li>
                                                    <li>Contact support if you face any issues</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!transactionId || !amount}
                                        style={{ backgroundColor: transactionId && amount ? '#082567' : '#9ca3af' }}
                                        className="w-full py-4 text-white rounded-lg font-semibold text-lg hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        Submit Payment
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            )}

                            {/* Initial Message - Shows when no method selected */}
                            {!selectedMethod && (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Smartphone className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <p className="text-gray-500 text-lg">Please select a payment method to continue</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Support Section */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Need help? Contact us at <span className="font-semibold text-blue-600">support@institution.edu</span> or call{' '}
                        <span className="font-semibold text-blue-600">+1 (555) 123-4567</span>
                    </p>
                </div>
            </div>
        </div>
    );
}