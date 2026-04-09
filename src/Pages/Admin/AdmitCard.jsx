import React from 'react';

// For the logo/photo, you would typically import your own assets.
// I am using placeholders or descriptive Alt text in this example.
// For the real implementation, replace `src` with actual image imports or URLs.

const AdmitCard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans antialiased text-gray-900">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* --- MAIN ADMIT CARD CONTAINER --- */}
        <div className="bg-white p-6 shadow-xl rounded-lg border border-gray-100 overflow-hidden">

          {/* 1. Header Section - mimic the dark green banner */}
          <div className="bg-[#052C16] text-white p-4 -m-6 mb-6 flex flex-col items-center md:flex-row md:items-start md:justify-center md:space-x-4">
            {/* The Logo (using a placeholder for reproduction) */}
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <img
                src="https://via.placeholder.com/80/FFA500/FFFFFF?text=SWF+LOGO" // Placeholder: Represents the gold/white logo
                alt="Students Welfare Foundation Logo"
                className="w-16 h-16 rounded-full border-2 border-white object-contain p-1"
              />
            </div>
            {/* Organization Names */}
            <div className="text-center md:text-left flex-grow">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">The Stdents welfare foundation</h1>
              <h2 className="text-xl md:text-2xl font-semibold -mt-1 tracking-tight">দি স্টুডেন্টস ওয়েলফেয়ার ফাউন্ডেশন</h2>
            </div>
          </div>

          {/* 2. Top Info Row (Reg No, Exam Year, Photo, Admit Card Button) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-8 border-b border-gray-100 pb-6">
            <div className="md:col-span-1 space-y-3">
              <div className="inline-block border border-gray-400 rounded-full px-4 py-1.5 text-sm font-semibold text-gray-800">
                Reg No : 25421140052
              </div>
              <div className="inline-block border border-gray-400 rounded-full px-4 py-1.5 text-sm font-semibold text-gray-800">
                Exam Roll : 4412
              </div>
            </div>

            <div className="md:col-span-2 text-center flex flex-col items-center space-y-2">
              <h3 className="text-xl font-bold text-gray-800 tracking-tight">Exam - 2025</h3>
              <div className="inline-block border border-gray-500 rounded-full px-8 py-2 text-sm font-bold text-gray-900 bg-gray-50">
                Admit Card
              </div>
            </div>

            <div className="md:col-span-1 flex justify-center md:justify-end">
              <img
                src="https://via.placeholder.com/120x150/CCCCCC/666666?text=STUDENT+PHOTO" // Placeholder: Represents the student photo
                alt="Student Profile"
                className="w-24 h-32 md:w-28 md:h-36 object-cover border-4 border-white shadow-md rounded-md"
              />
            </div>
          </div>

          {/* 3. Candidate Details Section */}
          <div className="relative mb-10 pb-8 border-b border-gray-100">
            {/* Background Watermark effect (optional, simplified) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <h1 className="text-8xl font-black text-gray-300 transform -rotate-12 select-none">SWF</h1>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5 text-sm">
              {[
                { label: "Name", value: "ASIYA FARHANA" },
                { label: "Father's Name", value: "MASIUR RAHMAN" },
                { label: "Mother's Name", value: "RIMA AKTER" },
                { label: "Institution Name", value: "TALENT CAMPUS SCHOOL & COLLEGE" },
                { label: "Exam Center", value: "Uttara High School & College" },
                { label: "Building Name", value: "Shool Building" },
                { label: "Exam Date", value: "14-11-2025 (10:00 AM)" },
              ].map((item, index) => (
                <div key={index} className="flex">
                  <span className="font-semibold text-gray-700 w-[140px] flex-shrink-0">{item.label}</span>
                  <span className="font-medium text-gray-900">: {item.value}</span>
                </div>
              ))}
              <div className="flex md:col-start-2">
                 <span className="font-semibold text-gray-700 w-[140px] flex-shrink-0">Gender</span>
                 <span className="font-medium text-gray-900">: Female</span>
              </div>
              <div className="flex">
                 <span className="font-semibold text-gray-700 w-[140px] flex-shrink-0">Class</span>
                 <span className="font-medium text-gray-900">: Class 4</span>
              </div>
              <div className="flex">
                 <span className="font-semibold text-gray-700 w-[140px] flex-shrink-0">Section</span>
                 <span className="font-medium text-gray-900">: </span>
              </div>
              <div className="flex">
                 <span className="font-semibold text-gray-700 w-[140px] flex-shrink-0">Category</span>
                 <span className="font-medium text-gray-900">: School</span>
              </div>
              <div className="flex">
                 <span className="font-semibold text-gray-700 w-[140px] flex-shrink-0">Mobile</span>
                 <span className="font-medium text-gray-900">: 01909870663</span>
              </div>
              <div className="flex md:col-start-2">
                 <span className="font-semibold text-gray-700 w-[140px] flex-shrink-0">Floor Number</span>
                 <span className="font-medium text-gray-900">: 2</span>
              </div>
               <div className="flex">
                 <span className="font-semibold text-gray-700 w-[140px] flex-shrink-0">Room Number</span>
                 <span className="font-medium text-gray-900">: 206</span>
              </div>
            </div>
          </div>


          {/* --- NEW SECTION A: EXAM ROUTINE --- */}
          <div className="mb-10 pt-4 pb-8 border-b border-gray-100">
            <h4 className="text-xl font-bold mb-5 text-[#052C16] flex items-center space-x-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span>Exam Routine - Class 4</span>
            </h4>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-800 uppercase bg-gray-50 border-b border-gray-200 font-bold">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-semibold w-[160px]">Date</th>
                    <th scope="col" className="px-6 py-3 font-semibold">Subject</th>
                    <th scope="col" className="px-6 py-3 font-semibold">Paper</th>
                    <th scope="col" className="px-6 py-3 font-semibold">Day</th>
                    <th scope="col" className="px-6 py-3 font-semibold">Exam Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {[
                        { date: '14-11-2025', subject: 'Bangla', paper: 'I', day: 'Friday', time: '10:00 AM - 12:30 PM' },
                        { date: '16-11-2025', subject: 'English', paper: 'I', day: 'Sunday', time: '10:00 AM - 12:30 PM' },
                        { date: '18-11-2025', subject: 'Mathematics', paper: '-', day: 'Tuesday', time: '10:00 AM - 1:00 PM' },
                        { date: '21-11-2025', subject: 'General Science', paper: '-', day: 'Friday', time: '10:00 AM - 12:30 PM' },
                        { date: '23-11-2025', subject: 'Bangladesh Studies', paper: '-', day: 'Sunday', time: '10:00 AM - 12:30 PM' },
                    ].map((exam, idx) => (
                        <tr key={idx} className="bg-white hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-3.5 font-medium whitespace-nowrap">{exam.date}</td>
                            <td className="px-6 py-3.5 text-gray-900">{exam.subject}</td>
                            <td className="px-6 py-3.5">{exam.paper}</td>
                            <td className="px-6 py-3.5 text-gray-600">{exam.day}</td>
                            <td className="px-6 py-3.5 text-gray-800 font-medium whitespace-nowrap">{exam.time}</td>
                        </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3">*All students are requested to be present 30 minutes before the starting time.</p>
          </div>


          {/* --- NEW SECTION B: PRINCIPAL'S SIGNATURE --- */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 pt-6 mt-6 pb-2">
              <div className="flex-1 w-full md:w-auto text-center md:text-left space-y-1.5 order-2 md:order-1">
                 <p className="text-xs text-gray-400">© 2025 SWF - Software System Solution</p>
                 <p className="text-sm font-medium text-gray-600">Issued by Students Welfare Foundation</p>
              </div>

              <div className="w-full md:w-auto flex justify-center md:justify-end md:ml-auto md:w-1/3 order-1 md:order-2">
                <div className="flex flex-col items-center p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 min-w-[240px]">
                    <div className="w-48 h-16 flex items-center justify-center border-b border-gray-900 mb-1.5 opacity-60">
                        {/* Signature Placeholder - could be an image of a real signature */}
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Signature-placeholder.svg" // Placeholder: Generic signature
                          alt="Principal's Signature Placeholder"
                          className="w-full h-full object-contain grayscale opacity-60"
                        />
                    </div>
                    <p className="text-sm font-bold text-gray-900">MR. REZAUL KARIM</p>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Principal</p>
                    <p className="text-xs text-gray-500 mt-1">Students Welfare Foundation</p>
                </div>
              </div>
          </div>


        </div> {/* --- END OF MAIN ADMIT CARD CONTAINER --- */}

        {/* --- PRINT PREVIEW ACTION (Optional but helpful) --- */}
        <div className="flex justify-center my-6 print:hidden">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-[#052C16] text-white font-semibold rounded-lg shadow-md hover:bg-[#064222] transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
              <span>Print This Admit Card</span>
            </button>
        </div>

      </div>
    </div>
  );
};

export default AdmitCard;