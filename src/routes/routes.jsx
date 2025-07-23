import { createBrowserRouter } from 'react-router-dom';
import RootLayout from "../layouts/RootLayout.jsx";
import ROUTES from "./paths.js";
import {Home, Forecast, Favorites} from "../views";

export const router = createBrowserRouter([
    {
        path: ROUTES.ROOT,
        element: <RootLayout />,
        children: [
            {
                path: ROUTES.ROOT,
                element: <Home />,
            },
            {
                path: ROUTES.FORECAST,
                element: <Forecast />,
            },
            {
                path: ROUTES.FAVORITES,
                element: <Favorites />,
            },
        ],
    },
]);
