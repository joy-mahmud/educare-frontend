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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
        element: <StudentPaymentDeatails />,
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
]);

export default router;
