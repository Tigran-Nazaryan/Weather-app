import {createBrowserRouter} from 'react-router-dom';
import RootLayout from "../layouts/RootLayout.jsx";
import ROUTES from "./paths.js";
import {Favorites, Forecast, Home} from "../views";
import {UnitProvider} from "../store/UnitContext.jsx";
import {FavoritesProvider} from "../store/FavoritesContext.jsx";

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <RootLayout/>,
    children: [
      {
        path: ROUTES.ROOT,
        element: (
          <FavoritesProvider>
            <UnitProvider>
              <Home/>
            </UnitProvider>
          </FavoritesProvider>
        ),
      },
      {
        path: ROUTES.FORECAST,
        element: (
          <UnitProvider>
            <Forecast/>
          </UnitProvider>
        ),
      },
      {
        path: ROUTES.FAVORITES,
        element: (
          <FavoritesProvider>
            <UnitProvider>
              <Favorites/>
            </UnitProvider>
          </FavoritesProvider>
        ),
      },
    ],
  },
]);
