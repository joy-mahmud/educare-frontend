import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root/Root";
import Home from "../Pages/Home/Home";
import SingleNotice from "../Pages/Notice/SingleNotice";
import RegistrationForm from "../Pages/Admission/RegistrationForm";
import PaymentPage from "../Pages/payment/PaymentPage";
import PhotoGallery from "../Pages/Gallary/PhotoGallary";
import TeacherLogin from "../Pages/Auth/TeacherLogin";
import StudentLogin from "../Pages/Auth/StudentLogin";
import StudentPaymentDeatails from "../Pages/payment/StudentPaymentDetails";
import PrivateRoute from "../privateRoute/PrivateRoute";
import AdminHome from "../Pages/Admin/AdminHome";
import CreateTeacherForm from "../Pages/Admin/CreateTeacher";
import Dashboard from "../Layout/Dashboard/Dashboard";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AllTeacherInformation from "../Pages/Admin/AllTeacherInformation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/admission",
        element: <RegistrationForm />,
      },
      {
        path: "/make-payment",
        element: <PaymentPage />,
      },
      {
        path: "/payment-details",
        element: (
          <PrivateRoute>
            <StudentPaymentDeatails />
          </PrivateRoute>
        ),
      },
      {
        path: "/teacherLogin",
        element: <TeacherLogin />,
      },
      {
        path: "/studentLogin",
        element: <StudentLogin />,
      },
      {
        path: "/photo-gallary",
        element: <PhotoGallery />,
      },
      {
        path: "/notice/:id",
        element: <SingleNotice />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <AdminHome />,
      },
      {
        path: "add-teacher",
        element: <CreateTeacherForm />,
      },
      //   {
      //     path:'student-list',
      //     element:<StudentList/>
      //   },
      {
        path: "all-teacher-info",
        element: <AllTeacherInformation />,
      },
      //   {
      //   path:'all-payments',
      //   element:<AllPayments/>

      // },
    ],
  },
]);

export default router;
