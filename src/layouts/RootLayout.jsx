import {Outlet, Link} from 'react-router-dom';
import ROUTES from "../routes/paths.js";

export default function RootLayout() {
    return (
        <div>
            <header className="bg-blue-600 text-white shadow-md">
                <nav className="container flex items-center justify-between py-4 px-6">
                    <ul className="flex space-x-6">
                        <li>
                            <Link
                                to={ROUTES.ROOT}
                                className="hover:text-yellow-400 transition font-medium"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={ROUTES.FAVORITES}
                                className="hover:text-yellow-400 transition font-medium"
                            >
                                Favorites
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={ROUTES.FORECAST}
                                className="hover:text-yellow-400 transition font-medium"
                            >
                                Forecast
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <main>
                <Outlet/>
            </main>
        </div>
    );
}
