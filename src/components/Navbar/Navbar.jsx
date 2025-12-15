import React, { useState } from "react";
import { LuMenu } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import logo1 from "../../assets/logos/educational-institute-logo-1.png";
import logo2 from "../../assets/logos/educations-institute-logo-2.webp";
import { IoIosArrowForward } from "react-icons/io";
import {
  INSTITUTE_NAME_BN,
  INSTITUTE_NAME_EN,
} from "../../utils/constants/constants";
import { IoClose } from "react-icons/io5";
const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
  const location = useLocation();
  const handleShowDropdown = (menu) => {
    setActiveMenu(menu);
  };
  const handleHideDropdown = () => {
    setActiveMenu(null);
  };

  const menus = [
    { name: "হোম", path: "/" },
    {
      name: "আমাদের কথা",
      routes: ["/institute-details", "/institute-info"],
      subMenu: [
        { name: "প্রতিষ্ঠানের ইতিহাস ", path: "/institute-info" },
        { name: "গভর্নিং বডি", path: "#" },
      ],
      dropdownWidth: "160px",
    },
    {
      name: "শিক্ষকদের তথ্য",
      subMenu: [
        { name: "প্রধান শিক্ষক ", path: "/details" },
        { name: "প্রাক্তন প্রধান শিক্ষকগণ", path: "#" },
        { name: "শিক্ষকগণ", path: "#" },
      ],
      dropdownWidth: "190px",
    },
    { name: "স্টাফদের তথ্য", path: "#" },
    {
      name: "শিক্ষার্থীদের তথ্য",
      routes: ["/student-info", "/student-summary"],
      subMenu: [
        { name: "শিক্ষার্থীদের তথ্য", path: "/student-info" },
        { name: "শিক্ষার্থীদের সারসংক্ষেপ", path: "/student-summary" },
      ],
      dropdownWidth: "190px",
    },
    {
      name: "পরীক্ষা",
      subMenu: [
        { name: "কুইজ", path: "/student-summary" },
        { name: "কুইজের ফলাফল", path: "/student-summary" },
        { name: "বহুনির্বাচনী পরীক্ষা", path: "/details" },
        { name: "বহুনির্বাচনী পরীক্ষার ফলাফল", path: "/details" },
        { name: "রচনামূলক পরীক্ষা", path: "/details" },
        { name: "রচনামূলক পরীক্ষার ফলাফল", path: "/details" },
      ],
      dropdownWidth: "225px",
    },
    {
      name: "একাডেমিক তথ্য",
      subMenu: [
        { name: "পাঠ্যক্রম", path: "#" },
        { name: "ক্লাস রুটিন", path: "#" },
        { name: "পরীক্ষার রুটিন", path: "#" },
        { name: "একাডেমিক সাবজেক্ট", path: "#" },
        { name: "সায়েন্স ক্লাব", path: "#" },
        { name: "আইসিটি ক্লাব", path: "#" },
      ],
      dropdownWidth: "180px",
    },
    {
      name: "প্রকাশনা ",
      subMenu: [
        { name: "ম্যাগাজিন", path: "#" },
        { name: "অ্যালবাম", path: "#" },
      ],
      dropdownWidth: "150px",
    },
    {
      name: "গ্যালারি",
      subMenu: [
        { name: "ফটো গ্যালারি", path: "/photo-gallary" },
        { name: "ভিডিও গ্যালারি", path: "#" },
      ],
      dropdownWidth: "150px",
    },
    { name: "সুবর্ণজয়ন্তী কর্ণার", path: "#" },
    { name: "ভর্তি ফর্ম", path: "/admission" },
    {
      name: "পেমেন্ট",
      subMenu: [
        { name: "পেমেন্ট করুন", path: "/make-payment" },
        { name: "পেমেন্টের বিবরণ", path: "/payment-details" },
      ],
      dropdownWidth: "150px",
    },

    {
      name: "লগইন",
      subMenu: [
        { name: "শিক্ষক লগইন", path: "/teacherLogin" },
        { name: "শিক্ষার্থী লগইন", path: "/studentLogin" },
      ],
    },
  ];
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveMobileSubmenu(null);
  };

  const toggleMobileSubmenu = (menuName) => {
    setActiveMobileSubmenu(activeMobileSubmenu === menuName ? null : menuName);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setActiveMobileSubmenu(null);
  };

  return (
    <div className="mx-20">
      <div className="bg-secondary h-[120px] px-5 flex justify-between items-center border-b-[0.5px] border-gray-500">
        <div className="bg-white h-[60px] sm:h-[80px] md:h-[100px] ">
          <img
            src={logo1}
            alt="logo1"
            className="h-[60px] sm:h-[80px] md:h-[100px] w-[60px] sm:w-[80px] md:w-[100px]"
          />
        </div>

        <div className="flex flex-col gap-1 md:gap-3 items-center">
          <h2 className="text-white text-[16px] sm:text-xl md:text-3xl font-semibold">
            {INSTITUTE_NAME_EN}
          </h2>
          <h2 className="text-white text-[16px] sm:text-xl md:text-2xl font-semibold">
            {INSTITUTE_NAME_BN}
          </h2>
        </div>
        <img
          src={logo2}
          alt="logo2"
          className="h-[60px] sm:h-[80px] md:h-[100px] w-[60px] sm:w-[80px] md:w-[100px]"
        />
      </div>
      {/* this menu is for laptop screen and above */}
      <div className="border-b-[1px] border-b-slate-500 h-12 bg-primary hidden lg:block">
        <div className="flex items-center h-full ">
          <div className="h-full">
            <ul className="flex items-center h-full">
              {menus.map((menu, index) =>
                menu.subMenu ? (
                  <li
                    key={index}
                    className="h-full flex items-center border-r-[0.5px] border-gray-500"
                  >
                    <div className="relative h-full">
                      <span
                        onMouseEnter={() => handleShowDropdown(menu.name)}
                        onMouseLeave={handleHideDropdown}
                        className={`px-[2px] xl:px-2 flex gap-1 items-center hover:cursor-pointer h-full hover:bg-secondary ${
                          menu.routes?.includes(location.pathname)
                            ? "bg-secondary"
                            : ""
                        }`}
                      >
                        <span className="text-white font-normal text-[12px] xl:text-[14px]">
                          {menu.name}
                        </span>
                        <MdKeyboardArrowDown
                          color="white"
                          className="font-bold mt-1 w-[16px]"
                        />
                        <ul
                          style={{ width: menu.dropdownWidth }}
                          className={`absolute left-0 top-[47px] min-w-[150px] border-[0.5px] border-gray-500 bg-primary shadow-xl transition-all duration-500 ease-in-out transform z-50 ${
                            activeMenu === menu.name
                              ? "opacity-100 visible translat-y-0"
                              : "opacity-0 invisible -translate-y-2"
                          }`}
                        >
                          {menu.subMenu.map((submenu, id) => (
                            <li
                              key={id}
                              className="border-b-[0.5px] border-gray-500"
                            >
                              <Link
                                to={submenu.path}
                                className="block w-full px-3 py-2 text-white text-[14px] font-normal  hover:bg-secondary transition-colors duration-200"
                              >
                                {submenu.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </span>
                    </div>
                  </li>
                ) : (
                  <li
                    key={index}
                    className={`h-full px-2 border-r-[0.5px] border-gray-500 flex items-center hover:bg-secondary ${
                      location.pathname === menu.path ? "bg-secondary" : ""
                    }`}
                  >
                    <Link
                      to={menu.path}
                      className="text-white font-normal text-[12px] xl:text-[14px]"
                    >
                      {menu.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
      {/* this menu is for tablet and mobile */}
      <div className="border-b-[1px] border-b-slate-500 h-10 bg-primary block lg:hidden text-white">
        <div className="flex justify-between items-center px-5 h-full">
          <p className="text-[16px] font-medium ">মেনু</p>

          <button onClick={toggleMobileMenu}>
            <LuMenu className="text-2xl hover:cursor-pointer" />
          </button>
        </div>
      </div>
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-primary shadow-2xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-500">
          <span className="text-white font-semibold text-lg">মেনু</span>
          <button
            onClick={toggleMobileMenu}
            className="text-white p-2 hover:bg-secondary rounded transition-colors hover:cursor-pointer"
          >
            <IoClose size={24} />
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-64px)]">
          <ul className="flex flex-col">
            {menus.map((menu, index) => (
              <li key={index} className="border-b border-gray-500">
                {menu.subMenu ? (
                  <div>
                    <button
                      onClick={() => toggleMobileSubmenu(menu.name)}
                      className={`w-full px-4 py-3 text-left text-white text-sm font-normal hover:bg-secondary flex gap-2 justify-between items-center hover:cursor-pointer ${
                        menu.routes?.includes(location.pathname)
                          ? "bg-secondary"
                          : ""
                      }`}
                    >
                      <span>{menu.name}</span>
                      <MdKeyboardArrowDown
                        size={20}
                        className={`trnsform transition-transform duration-300 ${
                          activeMobileSubmenu === menu.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <ul
                      className={`bg-gray-800 overflow-hidden transition-all duration-300 ${
                        activeMobileSubmenu === menu.name
                          ? "max-h-[500px]"
                          : "max-h-0"
                      }`}
                    >
                      {menu.subMenu.map((submenu, id) => (
                        <li
                          key={id}
                          className="border-b border-gray-700 last:border-b-0 hover:cursor-pointer"
                        >
                          <Link
                            to={submenu.path}
                            onClick={handleLinkClick}
                            className="block px-6 py-3 text-white text-sm hover:bg-secondary transition-colors"
                          >
                            {submenu.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    to={menu.path}
                    onClick={handleLinkClick}
                    className={`block px-4 py-3 text-white text-sm font-normal hover:bg-secondary transition-colors ${
                      location.pathname === menu.path ? "bg-secondary" : ""
                    }`}
                  >
                    {menu.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div
          onClick={toggleMobileMenu}
          className="fixed inset-0 bg-black z-40 lg:hidden"
        ></div>
      )}

      <div className="bg-primary h-[35px] flex">
        <span className="bg-gray-700 w-[135px] h-[35px] text-white flex items-center justify-center gap-2 text-[14px]">
          ব্রেকিং নিউজ{" "}
          <span>
            <IoIosArrowForward color="white" size={20} />
          </span>
        </span>
        <marquee
          behavior=""
          direction=""
          className="text-white mt-1 text-[14px]"
        >
          {" "}
          আগামী ২৫ নভেম্বর ২০২৫ থেকে বিদ্যালয়ের বার্ষিক পরীক্ষা শুরু হবে --||--
          রুটিন ওয়েবসাইটে প্রকাশ করা হয়েছে --||-- ২০২৬ শিক্ষাবর্ষের ভর্তি
          কার্যক্রম আগামী ১ ডিসেম্বর ২০২৫ থেকে শুরু হবে --||-- ২০২৫ সালের
          দ্বিতীয় টার্মের ফলাফল আগামী ২০ নভেম্বর বিদ্যালয়ের ওয়েবসাইটে প্রকাশ করা
          হবে।{" "}
        </marquee>
      </div>
    </div>
  );
};

export default Navbar;
