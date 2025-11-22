import {
    createBrowserRouter
} from "react-router-dom";
import Root from "../Layout/Root/Root";
import Home from "../Pages/Home/Home";
import SingleNotice from "../Pages/Notice/SingleNotice";
import RegistrationForm from "../Pages/Admission/RegistrationForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/admission',
                element: <RegistrationForm />
            },
            {
                path: 'institute-info',
                element: <div>institute info</div>
            }, {
                path: 'institute-details',
                element: <div>institute details</div>

            },
            {
                path: 'student-info',
                element: <div>student-info</div>
            }, {
                path: 'student-summary',
                element: <div>student-summary</div>

            },
            {
                path: '/notice/:id',
                element: <SingleNotice />
            }
        ]
    }
]);

export default router