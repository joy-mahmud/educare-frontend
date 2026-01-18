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
import AllStudentInformation from "../Pages/Admin/AllStudentInformation";
import AllPayments from "../Pages/Admin/AllPayments";
import SelectUser from "../Pages/SelectUser/SelectUser";
import UnAuthorized from "../Pages/UnAuthorized/UnAthorized";
import PaymentSlip from "../Pages/payment/PaymentSlip";

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
        path: "payment-slip",
        element: <PaymentSlip />,
      },
      {
        path: "/payment-details",
        element: (
          <PrivateRoute allowedUserTypes={["student"]}>
            <StudentPaymentDeatails />
          </PrivateRoute>
        ),
      },
      {
        path: "select-user",
        element: <SelectUser />,
      },
      {
        path: "/teacher-login",
        element: <TeacherLogin />,
      },
      {
        path: "/student-login",
        element: <StudentLogin />,
      },
      {
        path: "unauthorized",
        element: <UnAuthorized />,
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
        element: (
          <PrivateRoute allowedUserTypes={["teacher"]} allowedRoles={["admin"]}>
            <CreateTeacherForm />
          </PrivateRoute>
        ),
      },
      {
        path: "all-student-info",
        element: (
          <PrivateRoute
            allowedUserTypes={["teacher"]}
            allowedRoles={["admin", "teacher"]}
          >
            <AllStudentInformation />
          </PrivateRoute>
        ),
      },
      {
        path: "all-teacher-info",
        element: (
          <PrivateRoute allowedUserTypes={["teacher"]} allowedRoles={["admin"]}>
            {" "}
            <AllTeacherInformation />
          </PrivateRoute>
        ),
      },
      {
        path: "all-payments",
        element: (
          <PrivateRoute allowedUserTypes={["teacher"]} allowedRoles={["admin"]}>
            <AllPayments />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
