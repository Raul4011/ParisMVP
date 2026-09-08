import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-white">404</h1>

      <p className="mt-4 text-gray-500 dark:text-gray-400 text-center">
        La página que estás buscando no existe.
      </p>

      <Link
        to="/"
        className="mt-6 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Volver a Home
      </Link>
    </div>
  );
};

export default NotFound;
