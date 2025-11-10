import React from 'react'
import { FaRegMessage } from 'react-icons/fa6'
import { GrLocation } from 'react-icons/gr'
import { IoCallOutline, IoMailUnreadOutline } from 'react-icons/io5'

const ContactUs = () => {
    return (
        <div className="container mx-auto px-4">
            {/* ===== Header Section ===== */}
            <div className="relative bg-gradient-to-r from-primary to-secondary rounded-lg mb-8 py-5 overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute rounded-full w-24 h-24 top-[-3rem] right-[-3rem] bg-tersiary opacity-80"></div>
                <div className="absolute rounded-full w-24 h-24 bottom-[-3rem] left-[-3rem] bg-secondary opacity-80"></div>

                {/* Title */}
                <div className="flex gap-2 items-center justify-center text-white">
                    <FaRegMessage className="h-6 w-6 mt-2" />
                    <h1 className="text-2xl font-semibold">Contact Us</h1>
                </div>
            </div>

            {/* ===== Contact Info Section ===== */}
            <div className="shadow-xl rounded-lg border border-gray-300 py-10 px-4">
                <h2 className="text-center font-bold text-3xl text-gray-800 mb-10">Get In Touch</h2>

                <div className="flex flex-col md:flex-row justify-around items-center gap-10">
                    {/* Visit Us */}
                    <div className="flex flex-col gap-2 items-center text-center">
                        <div className="bg-primary h-[100px] w-[100px] rounded-full flex justify-center items-center">
                            <GrLocation className="text-white h-[40px] w-[40px]" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mt-3">Visit Us</h2>
                        <div className="text-gray-700">
                            <p>12/50 Section B</p>
                            <p>Mirpur 10</p>
                            <p>Dhaka-1216</p>
                        </div>
                    </div>

                    {/* Call Us */}
                    <div className="flex flex-col gap-2 items-center text-center">
                        <div className="bg-secondary h-[100px] w-[100px] rounded-full flex justify-center items-center">
                            <IoCallOutline className="text-white h-[40px] w-[40px]" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mt-3">Call Us</h2>
                        <div className="text-gray-700">
                            <p>+88015622662</p>
                            <p>+88036373535</p>
                            <p>Sun–Thu: 9:00 AM – 5:00 PM</p>
                        </div>
                    </div>

                    {/* Email Us */}
                    <div className="flex flex-col gap-2 items-center text-center">
                        <div className="bg-primary h-[100px] w-[100px] rounded-full flex justify-center items-center">
                            <IoMailUnreadOutline className="text-white h-[40px] w-[40px]" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mt-3">Email Us</h2>
                        <div className="text-gray-700">
                            <p>info@institute.com</p>
                            <p>admission@institute.com</p>
                            <p>support@institute.com</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== Map Section ===== */}
            <div className="mt-10 mb-16">
                <div className="relative bg-gradient-to-r from-primary to-secondary rounded-lg mb-8 py-5 overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute rounded-full w-24 h-24 top-[-3rem] right-[-3rem] bg-tersiary opacity-80"></div>
                    <div className="absolute rounded-full w-24 h-24 bottom-[-3rem] left-[-3rem] bg-secondary opacity-80"></div>

                    {/* Title */}
                    <div className="flex gap-2 items-center justify-center text-white">
                        <FaRegMessage className="h-6 w-6 mt-2" />
                        <h1 className="text-2xl font-semibold">Contact Us</h1>
                    </div>
                </div>

                <div className="rounded-lg overflow-hidden shadow-xl border border-gray-300">
                    <iframe
                        title="Google Map Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.690637479571!2d90.36542037511222!3d23.759358288386747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf53b2a1e2fb%3A0xf48f78e01a6f5321!2sMirpur%2010%2C%20Dhaka%201216!5e0!3m2!1sen!2sbd!4v1707068447471!5m2!1sen!2sbd"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    )
}

export default ContactUs
