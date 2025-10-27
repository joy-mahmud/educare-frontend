import {
    createBrowserRouter
} from "react-router-dom";
import Root from "../Layout/Root/Root";
import Home from "../Pages/Home/Home";

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
        ]
    }
]);

export default router